<template>
  <div class="simple-upload-container">
    <div class="total-progress">
      <div class="btns">
        <el-button-group>
          <el-button type="primary"><i class="el-icon-upload2 el-icon--left"
               size="mini"></i>选择文件
            <input type="file"
                   class="select-file-input"
                   @change="handleFileChange" />
          </el-button>
          <el-button :disabled="uploadDisabled"
                     @click="handleUpload"><i class="el-icon-upload el-icon--left"
               size="mini"></i>上传文件</el-button>
          <el-button :disabled="pauseDisabled"
                     @click="handlePause"><i class="el-icon-video-pause el-icon--left"
               size="mini"></i>暂停上传</el-button>
          <el-button :disabled="resumeDisabled"
                     @click="handleResume"><i class="el-icon-video-play el-icon--left"
               size="mini"></i>继续上传</el-button>
        </el-button-group>
      </div>
      <div class="file-list">
        <el-collapse v-if="uploadFiles.length"
                     accordion>
          <el-collapse-item v-for="(item, index) in uploadFiles"
                            :key="index">
            <template slot="title">
              <div class="progress-box">
                <div class="list-item">
                  <div class="item-name">
                    <span>{{ index + 1 }}：名称：{{ item.name }}</span>
                  </div>
                  <div class="item-size">
                    大小：{{ item.size | transformByte }}
                  </div>
                  <div v-if="item.hashProgress !== 100"
                       class="item-progress">
                    <span>{{
                        status === "wait" ? "准备读取文件" : "正在读取文件"
                      }}：</span>
                    <el-progress :percentage="item.hashProgress" />
                  </div>
                  <div v-else
                       class="item-progress">
                    <span>文件进度：</span>
                    <el-progress :percentage="item.uploadProgress" />
                  </div>
                  <div class="item-status">
                    <i :class="fileStatuIcon(item.status)"></i>
                    {{ item.status | fileStatus }}
                  </div>
                </div>
              </div>
            </template>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { saveObjArr, getObjArr, clearLocalStorage } from "@/utils/localstorage";
import axios, { CancelToken } from "axios";
var chunkSize = 10 * 1024 * 1024; // 切片大小
var fileIndex = 0; // 当前正在被遍历的文件下标
var instance = axios.create({});
// 所有文件状态
const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading",
  hash: "hash",
  error: "error",
  done: "done",
};

// 单个文件的状态
const fileStatus = {
  wait: "wait",
  uploading: "uploading",
  success: "success",
  error: "error",
  secondPass: "secondPass",
  pause: "pause",
  resume: "resume",
};

// 单个文件的状态 对应描述
const fileStatusStr = {
  wait: "待上传",
  uploading: "上传中",
  success: "成功",
  error: "失败",
  secondPass: "已秒传",
  pause: "暂停",
  resume: "恢复",
};
export default {
  filters: {
    transformByte(size) {
      if (!size) {
        return "0B";
      }
      var num = 1024.0; // byte
      if (size < num) {
        return size + "B";
      }
      if (size < Math.pow(num, 2)) {
        return (size / num).toFixed(2) + "K";
      } // kb
      if (size < Math.pow(num, 3)) {
        return (size / Math.pow(num, 2)).toFixed(2) + "M";
      } // M
      if (size < Math.pow(num, 4)) {
        return (size / Math.pow(num, 3)).toFixed(2) + "G";
      } // G
      return (size / Math.pow(num, 4)).toFixed(2) + "T"; // T
    },
    // 单个文件状态格式化
    fileStatus(status) {
      return fileStatusStr[fileStatus[status]];
    },
  },
  data: () => ({
    uploadFiles: [],
    status: Status.wait,
    tempThreads: 3,
    cancels: [], // 存储要取消的请求
  }),
  created() {
    this.setAxios();
    this.tempThreads = this.threads;
  },
  props: {
    limit: {
      type: Number,
      default: 10,
    },
    // 文件超出个数限制时的钩子
    onExceed: {
      type: Function,
      default: () => {},
    },
    beforeUpload: {
      type: Function,
      default: null,
    },
    // 上传并发数
    threads: {
      type: Number,
      default: 3,
    },
    // 上传文件时携带的参数
    uploadArguments: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // axios baseUrl
    baseUrl: {
      type: String,
      default: "",
    },
    headers: {
      type: Object,
      default: null,
    },
  },
  computed: {
    fileStatuIcon(status) {
      return function () {
        var className = "";
        switch (status) {
          case "uploading":
            className = "el-icon-loading";
            break;
          case "success":
          case "secondPass":
            className = "el-icon-circle-check";
            break;
          case "error":
            className = "el-icon-circle-close";
            break;
        }
        return className + " el-icon--left";
      };
    },
    uploadDisabled() {
      return (
        !this.uploadFiles.length ||
        [Status.pause, Status.done, Status.uploading, Status.hash].includes(
          this.status
        )
      );
    },
    pauseDisabled() {
      return [Status.hash, Status.wait, Status.done, Status.pause].includes(
        this.status
      );
    },
    resumeDisabled() {
      return ![Status.pause].includes(this.status);
    },
  },
  methods: {
    handleFileChange(e) {
      const files = e.target.files;
      if (!files) return;
      fileIndex = 0;

      if (files.length > this.limit) {
        this.onExceed && this.onExceed(files);
        return;
      }

      const postFiles = Array.prototype.slice.call(files);
      console.log(postFiles);
      postFiles.forEach((element) => {
        this.handleStart(element);
      });
    },
    handleStart(rawFile) {
      rawFile.statas = fileStatus.wait;
      rawFile.chunkList = [];
      rawFile.uploadProgress = 0;
      rawFile.fakeUploadProgress = 0;
      rawFile.hashProgress = 0;
      if (this.beforeUpload) {
        const before = this.beforeUpload(rawFile);
        if (before && before.then) {
          before.then(() => {
            this.uploadFiles.push(rawFile);
          });
        }
      }
      if (!this.beforeUpload) {
        this.uploadFiles.push(rawFile);
      }
    },
    async handleUpload() {
      if (!this.uploadFiles) return;
      this.status = Status.uploading;
      const filesArr = this.uploadFiles;
      for (let i = 0; i < filesArr.length; i++) {
        fileIndex = i;
        if (["secondPass", "success", "error"].includes(filesArr[i].status)) {
          console.log("跳过已上传成功或已秒传的或失败的");
          continue;
        }
        const fileChunkList = this.createFileChunk(filesArr[i]);
        //不是resume,则生成hash
        if (filesArr[i].status != fileStatus.resume) {
          this.status = Status.hash;
          // hash校验，是否为秒传
          filesArr[i].hash = await this.calculateHash(fileChunkList);
          // 若清空或者状态为等待，则跳出循环
          if (this.status === Status.wait) {
            console.log("若清空或者状态为等待，则跳出循环");
            break;
          }
        }

        this.status = Status.uploading;
        const verifyRes = await this.verifyUpload(
          filesArr[i].name,
          filesArr[i].hash
        );
        if (verifyRes.data.presence) {
          filesArr[i].status = fileStatus.secondPass;
          filesArr[i].uploadProgress = 100;
          this.isAllStatus();
        } else {
          console.log("开始上传文件----》", filesArr[i].name);
          filesArr[i].status = fileStatus.uploading;

          const getChunkStorage = await this.getChunkStorage(filesArr[i].name);
          filesArr[i].fileHash = filesArr[i].hash;
          filesArr[i].chunkList = fileChunkList.map(({ file }, index) => ({
            fileHash: filesArr[i].hash,
            fileName: filesArr[i].name,
            index,
            hash: filesArr[i].hash + "-" + index,
            chunk: file,
            size: file.size,
            uploaded: getChunkStorage && getChunkStorage.includes(index), // 标识：是否已完成上传
            progress:
              getChunkStorage && getChunkStorage.includes(index) ? 100 : 0,
            status:
              getChunkStorage && getChunkStorage.includes(index)
                ? "success"
                : "wait", // 上传状态，用作进度状态显示
          }));
          this.$set(filesArr, i, filesArr[i]);
          await this.uploadChunks(filesArr[i]);
        }
      }
    },
    async uploadChunks(data) {
      var chunkData = data.chunkList;
      //   return new Promise(async (resolve, reject) => {
      const requestDataList = chunkData
        .filter(({ uploaded }) => !uploaded)
        .map(({ fileHash, chunk, fileName, index }) => {
          const formData = new FormData();
          formData.append("md5", fileHash);
          index;
          formData.append("file", chunk);
          formData.append("fileName", index); // 文件名使用切片的下标
          return { formData, index, fileName };
        });
      console.log("uploadChunks -> requestDataList", requestDataList);
      try {
        await this.sendRequest(requestDataList, chunkData);
      } catch (error) {
        // 上传有被reject的
        this.$message.error("亲 上传失败了,考虑重试下呦" + error);
        return;
      }

      // 合并切片
      const isUpload = chunkData.some((item) => item.uploaded === false);
      console.log("created -> isUpload", isUpload);
      if (isUpload) {
        alert("存在失败的切片");
      } else {
        // 执行合并
        try {
          await this.mergeRequest(data);
          // resolve();
        } catch (error) {
          // reject();
        }
      }
      //   });
    },

    //处理并发
    async sendRequest(forms, chunkData) {
      var finished = 0;
      const total = forms.length;
      const that = this;
      const retryArr = []; // 数组存储每个文件hash请求的重试次数，做累加 比如[1,0,2],就是第0个文件切片报错1次，第2个报错2次
      return new Promise((resolve, reject) => {
        const handler = () => {
          if (forms.length) {
            const formInfo = forms.shift();
            const { formData, index } = formInfo;
            instance
              .post("fileChunk", formData, {
                onUploadProgress: that.createProgresshandler(chunkData[index]),
                cancelToken: new CancelToken((c) => this.cancels.push(c)),
                timeout: 0,
              })
              .then(() => {
                chunkData[index].uploaded = true;
                chunkData[index].status = fileStatus.success;
                // 存储已上传的切片下标
                this.addChunkStorage(chunkData[index].fileHash, index);
                finished++;
                handler();
              })
              .catch(() => {
                if ([Status.pause, Status.wait].includes(this.status)) return;
                if (typeof retryArr[index] !== "number") {
                  retryArr[index] = 0;
                }
                // 更新状态
                chunkData[index].status = "warning";

                // 累加错误次数
                retryArr[index]++;

                // 重试3次
                if (retryArr[index] >= this.chunkRetry) {
                  console.warn(
                    " 重试失败--- > handler -> retryArr",
                    retryArr,
                    chunkData[index].hash
                  );
                  return reject("重试失败", retryArr);
                }

                this.tempThreads++; // 释放当前占用的通道

                // 将失败的重新加入队列
                forms.push(formInfo);
                handler();
              });
          }
          if (finished >= total) {
            resolve("done");
          }
        };

        for (let i = 0; i < this.tempThreads; i++) {
          handler();
        }
      });
    },
    mergeRequest(data) {
      return new Promise((resolve, reject) => {
        const obj = {
          md5: data.fileHash,
          fileName: data.name,
          fileChunkNum: chunkSize,
          ...this.uploadArguments,
        };
        instance
          .post("fileChunk/merge", obj, {
            timeout: 0,
          })
          .then((res) => {
            if (res.data.code === 2000) {
              data.status = fileStatus.success;
              clearLocalStorage(data.fileHash);
              // this.$message.success('上传成功');
              // 判断是否所有都成功上传
              this.isAllStatus();
              resolve();
            } else {
              // 文件块数量不对，清除缓存
              clearLocalStorage(data.fileHash);
              data.status = fileStatus.error;
              this.status = Status.wait;
              resolve();
            }
          })
          .catch(() => {
            data.status = fileStatus.error;
            reject();
          });
      });
    },
    // 生成文件 hash（web-worker）
    calculateHash(fileChunkList) {
      console.log("calculateHash -> fileChunkList", fileChunkList);
      return new Promise((resolve) => {
        this.worker = new Worker("./hash.js");
        this.worker.postMessage({ fileChunkList });
        this.worker.onmessage = (e) => {
          const { percentage, hash } = e.data;
          if (this.uploadFiles[fileIndex]) {
            this.uploadFiles[fileIndex].hashProgress = Number(
              percentage.toFixed(0)
            );
            this.$set(this.uploadFiles, fileIndex, this.uploadFiles[fileIndex]);
          }

          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    isAllStatus() {
      const isAllSuccess = this.uploadFiles.every((item) => {
        ["success", "secondPass", "error"].includes(item.status);
      });
      if (isAllSuccess) {
        this.status = Status.done;
        this.$emit("success");
      }
    },
    createFileChunk(file, size = chunkSize) {
      const fileChunkList = [];
      var count = 0;
      while (count < file.size) {
        fileChunkList.push({
          file: file.slice(count, count + size),
        });
        count = count + size;
      }
      return fileChunkList;
    },
    // 获取已上传完成的切片下标
    getChunkStorage(name) {
      return getObjArr(name);
    },
    verifyUpload(fileName, fileHash) {
      return new Promise((resolve, reject) => {
        const obj = {
          md5: fileHash,
          fileName,
          ...this.uploadArguments,
        };
        instance
          .get("fileChunk/presence", { params: obj })
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    createProgresshandler(item) {
      return (p) => {
        //正在上传的切片的进度，调用axios 钩子，拿到loaded和total
        item.progress = parseInt(String(p.loaded / p.total) * 100);
        this.fileProgress();
      };
    },
    fileProgress() {
      const currentFile = this.uploadFiles[fileIndex];
      if (currentFile) {
        //当前文件上传大小
        const uploadProgress = currentFile.chunkList
          .map((item) => item.size * item.progress)
          .reduce((acc, cur) => acc + cur);
        //当前文件上传进度
        const currentFileProgress = parseInt(
          (uploadProgress / currentFile.size).toFixed(2)
        );
        if (!currentFile.fakeUploadProgress) {
          currentFile.uploadProgress = currentFileProgress;
          this.$set(this.uploadFiles, fileIndex, currentFile);
        } else if (currentFileProgress > currentFile.fakeUploadProgress) {
          currentFile.uploadProgress = currentFileProgress;
          this.$set(this.uploadFiles, fileIndex, currentFile);
        }
      }
    },
    // 存储已上传完成的切片下标
    addChunkStorage(name, index) {
      const data = [index];
      const arr = getObjArr(name);
      if (arr) {
        saveObjArr(name, [...arr, ...data]);
      } else {
        saveObjArr(name, data);
      }
    },
    setAxios() {
      if (!this.headers) return;
      for (const i in this.headers) {
        instance.defaults.headers.common[i] = this.headers[i];
      }
      console.log("我是baseURL" + this.baseUrl);
      if (this.baseUrl) {
        instance.defaults.baseURL = this.baseUrl;
      }
    },
    handlePause() {
      this.status = Status.pause;
      if (this.uploadFiles.length) {
        const currentFile = this.uploadFiles[fileIndex];
        currentFile.status = fileStatus.pause;
        currentFile.fakeUploadProgress = currentFile.uploadProgress;
      }

      while (this.cancels.length > 0) {
        this.cancels.pop()("取消请求");
      }
    },
    handleResume() {
      this.status = Status.uploading;
      this.uploadFiles[fileIndex].status = fileStatus.resume;
      this.handleUpload();
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-upload-container {
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  background-color: #fff;
  padding-bottom: 15px;
  padding: 10px;
  .progress-box {
    width: 100%;
  }
  .total-progress {
    margin-bottom: 15px;
    .btns {
      position: relative;
      .select-file-input {
        position: absolute;
        display: inline-block;
        left: 0;
        top: 0;
        border: none;
        opacity: 0;
        width: 96px;
        height: 28px;
      }
    }
  }

  .file-list {
    .list-item {
      padding: 8px 10px;
      display: flex;
      justify-content: center;
      justify-items: center;
      line-height: 25px;
      position: relative;
      &:hover .item-chunk-box {
        display: block;
      }
      div {
        flex: 1;
        margin-top: 6px;
      }
      .item-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 6px;
        .svg-icon {
          font-size: 22px;
          vertical-align: sub;
        }
      }
      .item-status {
        flex: 0 0 10%;
        text-align: center;
        text-align: left;
        .el-icon-circle-check {
          color: #67c23a;
        }
        .el-icon-circle-close {
          color: #f00;
        }
      }
      .item-chunk-box {
        display: none;
        transition: all 3s;
        position: absolute;
        top: 0;
        left: 40px;
        z-index: 10;
      }
      .item-progress {
        flex: 0 0 60%;
      }
    }
  }

  .upload-tip {
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }

  .el-progress {
    width: 80%;
    display: inline-block;
  }

  >>> .el-collapse-item__header {
    height: auto;
  }
}
</style>
