<template>
  <div class="new">
    <h2>下载链接:</h2>
    <input
      type="file"
      accept=".torrent"
      hidden
      multiple
      @change="parseBtFile"
      id="bt-file-select"
    />
    <label for="bt-file-select">选择BT种子</label>
    <input type="file" hidden id="meta-file-select" />
    <label for="meta-file-select">选择Metalink种子</label>
    <div v-if="type == 'bt'">
      <div>请选择要下载的文件(Ctrl键多选):</div>
      <select multiple v-model="selectedBtFile">
        <option v-for="(file, idx) of btInfo.files" :value="idx" :key="idx">
          {{ file.name }}
        </option>
      </select>
      <button @click="startBtDownload">下载</button>
    </div>
    <div v-if="type == 'url'">
      <div>
        <textarea
          v-model="uris"
          cols="50"
          rows="8"
          placeholder="支持多个 URL 地址, 每个地址占一行."
        ></textarea>
      </div>
      <button @click="start">确定</button>
    </div>
    <div v-if="type == 'meta'"></div>
  </div>
</template>

<script>
import parseTorrent from "parse-torrent";

function getFileContent(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = function () {
      var commaPos = fr.result.indexOf(",");
      resolve(fr.result.slice(commaPos + 1));
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

export default {
  data() {
    return {
      type: "url",
      btBase64: null,
      btInfo: null,
      selectedBtFile: [],
      uris: "",
    };
  },
  methods: {
    async parseBtFile(e) {
      var file = e.target.files[0];
      var btFileBase64 = await getFileContent(file);
      var btFileBuffer = Buffer.from(btFileBase64, "base64");
      var parsedTorrent = parseTorrent(btFileBuffer);
      this.btBase64 = btFileBase64;
      this.btInfo = parsedTorrent;
      this.type = "bt";
    },
    async startBtDownload() {
      await window.aria2.addTorrent(this.btBase64, [], {
        selectFile: this.selectedBtFile.join(","),
      });
      this.$router.push("/downloading");
    },
    async start() {
      var uris = this.uris.split("\n").map((it) => it.trim());
      await window.aria2.addUri(uris);
      this.$router.push("/downloading");
    },
  },
};
</script>

<style scoped>
label {
  border: 1px solid;
  border-radius: 3px;
}
</style>
