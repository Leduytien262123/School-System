import { md5 } from "js-md5";
import axios from "axios";
import lscache from "lscache";

const CancelToken = axios.CancelToken;

class LargeUploadFile {
  constructor(options) {
    this.md5s = []; // Danh sách md5 của tất cả các file
    this.files = {}; // Tất cả các file
    this.chunkFiles = {}; // Tất cả các file đã cắt nhỏ
    this.progress = []; // Tiến trình upload
    this.locaFileSuccess = {}; // File đã upload thành công tại local
    this.cancel = [];
    this.options = Object.assign(
      {
        // Tiến trình upload
        handleProgress() {},
        // Xử lý sau khi merge hoàn tất
        handleMerge() {},
      },
      options
    );
  }

  reset() {
    this.md5s = []; // Danh sách md5 của tất cả các file
    this.files = {}; // Tất cả các file
    this.chunkFiles = {}; // Tất cả các file đã cắt nhỏ
    this.progress = []; // Tiến trình upload
    this.cancel = [];
  }

  // Chuyển file sang base64
  fileToBase(file) {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (ev) => {
        resolve(ev.target.result);
      };
    });
  }

  // Chuyển buffer sang file
  bufToFile(buf, filename) {
    return new File([buf], filename);
  }

  // Lấy danh sách các file đã cắt nhỏ
  async getFileChunkList(files, chunkSize) {
    let fileChunkList = [];
    let cur = 0;
    let index = 0;
    while (cur < files.size) {
      const blob = files.slice(cur, cur + chunkSize);
      const file = this.bufToFile(blob, files.name);
      const base64 = await this.fileToBase(blob);
      fileChunkList.push({
        blob,
        file,
        name: files.name,
        number: index,
        fileMD5: md5(base64),
      });
      index++;
      cur += chunkSize;
    }
    return fileChunkList;
  }

  // Upload file
  uploadFile(allHtpp, evt) {
    // Ở đây cần đợi tất cả các file upload xong rồi mới merge, nếu không sẽ dẫn đến upload không hoàn chỉnh, không thể chỉ dựa vào zoneNowIndex để xác định, vì dữ liệu truyền tải là bất đồng bộ
    const allPromise = Promise.all(allHtpp);
    allPromise
      .then((values) => {
        values.forEach((res) => {
          if (res && res.data) {
            if (res.data.data.zoneNowIndex === res.params.blockCnt - 1) {
              this.httpMergeFile({ fileMd5: res.params.fileMd5 });
            }
          }
        });
      })
      .finally(() => {
        evt ? (evt.target.value = "") : null;
      });
  }

  // Sự kiện upload
  async handleChangeFile(evt) {
    this.reset();
    lscache.set("locaFiles", []);
    for (let i = 0; i < evt.target.files.length; i++) {
      const file = evt.target.files[i];
      const base64 = await this.fileToBase(file);
      const fileMD5 = md5(base64);
      this.files[fileMD5] = file;
      this.chunkFiles[fileMD5] = await this.getFileChunkList(file, 1024 * 3000);
      this.md5s.push(fileMD5);
    }
    const allHtpp = [];
    for (const eKey in this.chunkFiles) {
      const fileMd5 = eKey;
      this.progress.push({ number: 0, fileMd5 });
      await this.httpClearCaches({ fileMd5 });
      const itemChunkFiles = this.chunkFiles[eKey];
      for (const item of itemChunkFiles) {
        allHtpp.push(
          this.httpUploadFile({
            fileMd5: fileMd5,
            md5: fileMd5,
            blockCnt: itemChunkFiles.length,
            bmd5: item.fileMD5,
            idx: item.number,
            file: item.file,
          })
        );
      }
    }
    this.uploadFile(allHtpp, evt);
  }

  // Xóa cache
  async httpClearCaches(params) {
    return await axios.get("/clearCaches", {
      params,
      baseURL: "/bigfile",
    });
  }

  // Upload qua mạng
  httpUploadFile(params) {
    return axios
      .post("/upload", params, {
        baseURL: "/bigfile",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        cancelToken: new CancelToken((c) => {
          this.cancel.push(c);
        }),
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded / total) * 100);
          const number =
            ((progress + params.idx * 100) / (params.blockCnt * 100)) * 100;
          const findData = this.progress.find(
            (item) => item.fileMd5 === params.fileMd5
          );
          findData.number = number;
        },
      })
      .then((res) => {
        const data = res.data;
        if (data.code === "1") {
          if (!this.locaFileSuccess[params.fileMd5]) {
            this.locaFileSuccess[params.fileMd5] = [];
          }
          this.locaFileSuccess[params.fileMd5].push(params.bmd5);
          lscache.set("locaFiles", this.locaFileSuccess);
        }
        return { data, params };
      })
      .catch((err) => {})
      .finally(() => {
        this.options.handleProgress({ progress: this.progress });
      });
  }

  // Merge file
  httpMergeFile(params) {
    axios
      .post(`/merge?fmd5=${params.fileMd5}`, ["bigFile"], {
        baseURL: "/bigfile",
      })
      .then((res) => {
        const locaFiles = lscache.get("locaFiles");
        locaFiles[params.fileMd5] = [];
        lscache.set("locaFiles", locaFiles);
        this.options.handleMerge(res);
      });
  }

  // Tạm dừng upload
  handlePauseUpload() {
    this.cancel.forEach((val) => {
      val();
    });
  }

  // Tiếp tục upload
  handleKeepUpload() {
    const locaFiles = lscache.get("locaFiles");
    const allHtpp = [];
    for (const fileKey in this.chunkFiles) {
      const itemChunkFiles = this.chunkFiles[fileKey];
      this.chunkFiles[fileKey].forEach((chunkFile) => {
        if (locaFiles[fileKey] && locaFiles[fileKey].length) {
          const findData = locaFiles[fileKey].find(
            (locaFile) => locaFile === chunkFile.fileMD5
          );
          if (!findData) {
            allHtpp.push(
              this.httpUploadFile({
                fileMd5: fileKey,
                md5: fileKey,
                blockCnt: itemChunkFiles.length,
                bmd5: chunkFile.fileMD5,
                idx: chunkFile.number,
                file: chunkFile.file,
              })
            );
          }
        }
      });
    }
    this.uploadFile(allHtpp);
  }
}

export default LargeUploadFile;
