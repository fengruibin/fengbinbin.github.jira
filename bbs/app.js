const express = require('express')
// 签名
const cookieParser = require('cookie-parser')
const fs = require('fs')
const Database = require('better-sqlite3')
const multer = require('multer')
const path = require('path')
const svgCaptcha = require('svg-captcha')
const md5 = val => val

const db = new Database(__dirname + '/bbs.sqlite3')
// xss攻击
//const escape = require('lodash/escape')
const port = 8008
const app = express()

// 模板默认拓展名。render时可以不写
// app.set('view engine', 'pug')

app.set('views', __dirname + '/templates')
// 让pug输出格式化过的html
app.locals.pretty = true

// 上传头像
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// function loadfile(file) {
//   try {
//     var content = fs.readFileSync(file)
//     return JSON.parse(content)
//   } catch (e) {
//     return []
//   }
// }

app.use((req, res, next) => {
  console.log(req.method, req.url, req.headers.cookie)
  next()
})

// cookie签名的密码
app.use(cookieParser('cookie sign secert'))
// 静态文件
app.use(express.static(__dirname + '/static'))
// 解析头像用于响应上传
app.use('/uploads', express.static(__dirname + '/uploads'))
// 解析json请求体的中间件
app.use(express.json())
// 解析url编码请求体的中间件
app.use(express.urlencoded())

const sessions = {}

// session中间件
app.use(function session(req, res, next) {
  if (!req.cookies.sessionId) {
    var sessionId = Math.random().toString(16).slice(2)
    res.cookie('sessionId', sessionId)
    sessions[sessionId] = {}
    req.session = sessions[sessionId]
  } else {
    if (!sessions[req.cookies.sessionId]) {
      sessions[req.cookies.sessionId] = {}
    }
    req.session = sessions[req.cookies.sessionId]
  }
  next()
})

// 将用户是否登录放到req的isLogin的中间件
app.use((req, res, next) => {
  if (req.signedCookies.loginUser) {
    var name = req.signedCookies.loginUser
    req.isLogin = true
    req.loginUser = db.prepare('SELECT * FROM users WHERE name = ?').get(name)
  } else {
    req.isLogin = false
    req.loginUser = null
  }
  next()
})

// 上传头像
app.post('/upload', upload.any(), (req, res, next) => {
  var files = req.files
  console.log(files)
  var urls = files.map(file => `http://localhost:8008/uploads/` + file.filename)
  res.json(urls)
})

// 删除帖子
app.delete('/post/:id', (req, res, next) => {
  db.prepare('DELETE FROM posts WHERE postId = ?').run(req.params.id)
  db.prepare('DELETE FROM comments WHERE postId = ?').run(req.params.id)
  res.json({
    code: 0,
    msg: 'delete success'
  })
})

// 删除评论
app.delete('/comment/:id', (req, res, next) => {
  db.prepare('DELETE FROM comments WHERE commentId = ?').run(req.params.id)
  res.json({
    code: 0,
    msg: 'delete success'
  })
})

// 帖子评论
app.post('/comment/post/:id', (req, res, next) => {
  if (req.isLogin) {
    var comment = req.body
    // 已登录用户
    var user = req.loginUser
    comment.timestamp = new Date().toISOString()
    comment.postId = req.params.id
    comment.userId = user.userId

    var result = db.prepare('INSERT INTO comments (content, postId, userId, timestamp) VALUES (@content, @postId, @userId, @timestamp)').run(comment)
    res.redirect(req.headers.referer || '/')
  } else {
    res.render('not-Login.pug')
  }
})

// 首页
app.get('/', (req, res, next) => {
  // 翻页器
  var page = Number(req.query.page || 1)
  var pageSize = 10
  // 总页码
  var totalPost = db.prepare('SELECT count(*) AS total FROM posts').get().total
  var totalPage = Math.ceil(totalPost / pageSize)
  var offset = (page - 1) * pageSize

  var pagePosts = db.prepare('SELECT * FROM posts JOIN users ON posts.userId = users.userId LIMIT ? OFFSET ?').all(pageSize, offset)

  if (pagePosts.length == 0) {
    res.render('404.pug')
    return
  }
  res.set('Content-Type', 'text/html; charset=UTF-8')

  res.render('home.pug', {
    isLogin: req.isLogin,
    loginUser: req.loginUser,
    posts: pagePosts,
    page: page,
    totalPage: totalPage
  })
})

// 登出
app.get('/logout', (req, res, next) => {
  res.clearCookie('loginUser')
  res.redirect(req.headers.referer || '/')
})

// 展示对应帖子
app.get('/post/:id', (req, res, next) => {
  var postId = req.params.id
  var post = db.prepare('SELECT * FROM posts JOIN users ON posts.userId = users.userId WHERE postId = ?').get(postId)
  if (post) {
    var comments = db.prepare('SELECT * FROM comments JOIN users ON comments.userId = users.userId WHERE postId = ?').all(postId)
    res.render('post.pug', {
      isLogin: req.isLogin,
      loginUser: req.loginUser,
      post: post,
      comments: comments
    })
  } else {
    res.render('404.pug')
  }
})

// 发帖
app.route('/post')
  .get((req, res, next) => {
    res.render('issue-post.pug', {
      isLogin: req.isLogin,
      loginUser: req.loginUser
    })
  })
  .post((req, res, next) => {
    var postInfo = req.body

    // 读取签名cookie
    var userName = req.signedCookies.loginUser

    if (userName) {
      var user = db.prepare('SELECT * FROM users WHERE name = ?').get(userName)
      postInfo.timestamp = new Date().toISOString()
      postInfo.userId = user.userId

      var result = db.prepare('INSERT INTO posts (title, content, userId, timestamp) VALUES (?, ?, ?, ?)').run(postInfo.title, postInfo.content, postInfo.userId, postInfo.timestamp)
      res.redirect('/post/' + result.lastInsertRowid)
    } else {
      res.end('401 not login')
    }
  })

// 验证码
app.get('/captcha-img', (req, res, next) => {
  var captcha = svgCaptcha.create()
  req.session.captcha = captcha.text

  // 响应体格式
  res.type('svg')
  res.status(200).send(captcha.data)
})

//密码重置
var changePassMap = {}
//打开忘记密码页面
app.route('/forget-password')
  .get((req, res, next) => {
    res.render('forget-password.pug')
  })
  //提交电子邮箱
  .post((req, res, next) => {
    var email = req.body.email
    var id = Math.random().toString(16).slice(2)
    changePassMap[id] = email

    // 20分钟后删除，链接失效
    setTimeout(() => {
      delete changePassMap[id]
    }, 20 * 60 * 1000)

    var link = 'http://localhost:8008/forget-password/' + id
    console.log(link)
    res.end('ok')
  })

// 在邮箱打开修改密码的页面
app.route('/forget-password/:id')
  .get((req, res, next) => {
    var email = changePassMap[req.params.id]
    if (!email) {
      res.end('链接失效')
      return
    }
    res.render('change-password.pug', {
      email: email
    })
  })
  // 提交修改密码
  .post((req, res, next) => {
    var email = changePassMap[req.params.id]
    if (!email) {
      res.end('链接失效')
      return
    }
    if (req.body.password == req.body.password2) {
      db.prepare('UPDATE users SET password = ? WHERE email = ?').run(md5(req.body.password), email)
      res.end('ok')
    } else {
      res.end('密码不一致重新修改')
    }
  })

// 登录
app.route('/login')
  .get((req, res, next) => {
    res.render('login.pug', {
      referer: req.headers.referer
    })
  })
  .post((req, res, next) => {
    var loginInfo = req.body

    if (loginInfo.captcha !== req.session.captcha) {
      res.end('验证码错误')
      return
    }

    var userStmt = db.prepare('SELECT * FROM users WHERE name = ? AND password = ?')
    // 登录是否成功,并添加cookie
    var user = userStmt.get(loginInfo.name, md5(loginInfo.password))

    if (user) {
      res.cookie('loginUser', user.name, {
        signed: true
      })
      res.redirect(loginInfo.return_to)
    } else {
      res.end('username of password incorrect')
    }
  })

// 注册
app.route('/register')
  .get((req, res, next) => {
    res.render('register.pug')
  })
  .post((req, res, next) => {
    var regInfo = req.body
    // 用户名由0-9a-z组成
    var USERNAME_RE = /^[0-9a-z_]+$/i

    if (!USERNAME_RE.test(regInfo.name)) {
      res.status(400).end('username invalid,can only contain digit and letter and _')
    } else if (regInfo.password == 0) {
      res.status(400).end('password may not be empty')
    } else {
      // 新用户
      var addUser = db.prepare('INSERT INTO users (name, password, email, avatar) VALUES (?, ?, ?, ?)')
      var result = addUser.run(regInfo.name, md5(regInfo.password), regInfo.email, fegInfo.avatar)
      console.log(result)
      res.render("register-success.pug")
    }
  })

app.listen(port, () => {
  console.log('listening on port', port)
})