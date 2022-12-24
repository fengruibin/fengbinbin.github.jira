<template>
  <div>
    <h2>管理服务器</h2>
    <button @click="showAddServerModal">添加</button>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <ul>
      <li v-for="(server, idx) of servers" :key="idx">
        Host: {{ server.host }} Port: {{ server.port }} Secret:
        <input type="password" :value="server.secret" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    var servers = JSON.parse(localStorage.getItem("aria2Servers")) || [];
    return {
      servers,
    };
  },
  methods: {
    showAddServerModal() {},
  },
};
</script>
