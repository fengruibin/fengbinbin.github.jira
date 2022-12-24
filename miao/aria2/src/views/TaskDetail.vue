<template>
  <div>
    <dl v-if="task">
      <dt>任务名称</dt>
      <dd>{{ getFilename(task) }}</dd>
      <dt>任务大小</dt>
      <dd></dd>
      <dt>任务状态</dt>
      <dd></dd>
      <dt>进度</dt>
      <dd></dd>
      <dt>下载</dt>
      <dd></dd>
      <dt>下载地址</dt>
      <dd></dd>
      <dt>下载路径</dt>
      <dd></dd>
      <dt>区块信息</dt>
      <dd>
        <span
          v-for="i of Number(task.numPieces)"
          :key="i"
          class="piece"
          :class="{ complete: bitfield[i - 1] == '1' }"
        ></span>
        <div>
          <span class="done"></span><span>已完成</span>
          <span class="undone"></span><span>未完成</span>
        </div>
      </dd>
      <dt>文件列表</dt>
      <dd>
        <ul>
          <li v-for="file of task.files" :key="file.path">
            {{ getFilename(task) }}
          </li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: "TaskDetail",
  data() {
    return {
      task: null,
      bitfield: [],
    };
  },
  async mounted() {
    this.task = await window.aria2.tellStatus(this.$route.params.gid);
    this.bitfield = this.task.bitfield
      .split("")
      .map((it) => parseInt(it, 16).toString(2).padStart(4, "0"))
      .join("")
      .split("");
  },
  methods: {
    getFilename(task) {
      if (task.files?.[0].path) {
        return task.files[0].path.split("/").at(-1);
      } else {
        return task.files?.uris?.[0]?.uri.split("/").at(-1) ?? "未知";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.piece {
  width: 20px;
  height: 20px;
  margin: 4px;
  background-color: grey;
  display: inline-block;
  &.complete {
    background-color: green;
  }
}

.done {
  width: 20px;
  height: 20px;
  background-color: green;
  display: inline-block;
}

.undone {
  width: 20px;
  height: 20px;
  background-color: grey;
  display: inline-block;
}
</style>
