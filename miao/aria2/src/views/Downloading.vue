<template>
  <div class="downloading">
    <h2>正在下载</h2>
    <div>
      <button @click="execSelected('pause')">暂停</button>
      <button @click="execSelected('unpause')">开始</button>
      <button @click="execSelected('remove')">删除</button>
      <button @click="SelectAll">全选</button>
      搜索:<input type="text" v-model="searchText" />
    </div>
    <ul>
      <li
        v-for="task of visibleTasks"
        :key="task.id"
        @click="toggleSelect(task)"
        :class="{ selected: selected.includes(task.gid) }"
      >
        <input type="checkbox" :checked="selected.includes(task.gid)" />
        <span>{{ getFilename(task) }}</span> |
        <span>{{ getPercent(task) | fixed }}%</span> |
        <span>{{ (task.downloadSpeed / 1024) | fixed }}k/s</span> |
        <span>{{ task.status }}</span> |
        <!-- <span><button @click.stop="goDetail(task)">详情</button></span> -->
        <span
          ><router-link
            @click.native.stop
            :to="{ name: 'TaskDetail', params: { gid: task.gid } }"
            >详情</router-link
          ></span
        >
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Downloading",
  data() {
    return {
      tasks: [],
      selected: [],
      searchText: "",
    };
  },
  async mounted() {
    this.updateList();
    this.intervalId = setInterval(() => {
      this.updateList();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  computed: {
    visibleTasks() {
      if (this.searchText == "") {
        return this.tasks;
      } else {
        return this.tasks.filter((it) => {
          return it.files[0].path
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      }
    },
  },
  methods: {
    // goDetail(task) {
    //   this.$router.push("/task" + task.gid);
    // },
    //暂停，恢复，删除功能
    async execSelected(action) {
      if (action == "remove") {
        try {
          await this.$confirm("确定删除吗？");
        } catch (e) {
          return;
        }
      }
      for (let gid of this.selected) {
        try {
          await window.aria2[action](gid);
        } catch (e) {
          this.$alert(e.message);
        }
      }
      this.updateList();
    },
    //刷新
    async updateList() {
      this.tasks = [
        ...(await window.aria2.tellActive()),
        ...(await window.aria2.tellWaiting(0, 1000)),
      ];
    },
    //暂停下载
    // pauseSelected() {
    //   for (let gid of this.selected) {
    //     window.aria2.pause(gid);
    //   }
    // },
    //恢复下载
    // unpauseSelected() {
    //   for (let gid of this.selected) {
    //     window.aria2.unpause(gid);
    //   }
    // },
    //删除下载
    // removeSelected() {
    //   for (let gid of this.selected) {
    //     window.aria2.remove(gid);
    //   }
    // },
    //全选
    SelectAll() {
      if (this.selected.length == this.tasks.length) {
        this.selected = [];
      } else {
        this.selected = this.tasks.map((it) => it.gid);
      }
    },
    //获取文件名
    getFilename(task) {
      if (task.files?.[0].path) {
        return task.files[0].path.split("/").at(-1);
      } else {
        return task.files?.uris?.[0]?.uri.split("/").at(-1) ?? "未知";
      }
    },
    //获取下载进度
    getPercent(task) {
      if (task.completedLength == 0) {
        return 0;
      } else {
        return (task.completedLength / task.totalLength) * 100;
      }
    },
    toggleSelect(task) {
      var idx = this.selected.indexOf(task.gid);
      if (idx == -1) {
        this.selected.push(task.gid);
      } else {
        this.selected.splice(idx, 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
ul {
  list-style: none;
}

li {
  /* display: flex; */
  /* 悬浮于连接上时，通常为手 */
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  &.selected {
    background-color: #ddd;
  }
}
</style>
