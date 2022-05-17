<template>
  <div class="completed">
    <h2>已完成</h2>
    <ul>
      <li v-for="task of tasks" :key="task.id">
        <span>{{ getFilename(task) }}</span> /
        <span>{{ getPercent(task) | fixed }}%</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Completed",
  data() {
    return {
      tasks: [],
    };
  },
  async mounted() {
    this.tasks = await window.aria2.tellStopped(0, 1000);
    this.intervalId = setInterval(async () => {
      this.tasks = await window.aria2.tellStopped(0, 1000);
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
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
  },
};
</script>

<style scope>
ul {
  list-style: none;
}

li {
  display: flex;
}
</style>
