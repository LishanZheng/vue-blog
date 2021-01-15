<template>
 <el-card class="file_card">
   <el-row>
     <el-col :span="3"><el-button type="primary" class="mkdir_button" @click="fileMkdir">新建文件夹</el-button></el-col>
     <el-col :span="3">
       <el-upload
         action="action"
         :http-request="uploadFile"
         :before-upload="handleFileUploadPreview"
         multiple
         :show-file-list=false
         :limit="20"
         :on-exceed="handleFileUploadExceed"
         :file-list="fileList">
         <el-button type="primary">点击上传</el-button>
         <div slot="tip" class="el-upload__tip">大小不超过50MB</div>
       </el-upload>
     </el-col>
     <el-col :span="2" :offset="1">
       <el-button type="danger" @click="filesDelete">选中删除</el-button>
     </el-col>
   </el-row>

   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
     <el-breadcrumb-item v-for="item in selectFilePath" :key=item.id>
         <el-link @click="redirectByBread(item)" :underline="false" target="_blank">{{item.pathName}}</el-link>
     </el-breadcrumb-item>
   </el-breadcrumb>

   <el-table
     :data="dataList"
     ref="multipleTable"
     @selection-change="handleTableSelectionChange"
     :header-cell-style="{background:'#eef1f6',color:'#606266'}"
     :row-class-name="tableRowClass">
     <el-table-column
       fixed
       prop="id"
       label="序号"
       width="50"
       type="selection">
     </el-table-column>
     <el-table-column
       fixed
       prop="filename"
       label="名称"
       width="250">
       <template slot-scope="scope">
         <el-link @click="handleSelectionFileName(scope)"
                  :underline="false"
                  target="_blank"
                  class="buttonText">{{scope.row.filename}}</el-link>
       </template>
     </el-table-column>
     <el-table-column
       prop="uploadTime"
       label="上传时间"
       width="200">
     </el-table-column>
     <el-table-column
       prop="type"
       label="类型"
       width="160">
     </el-table-column>
     <el-table-column
       prop="size"
       label="大小"
       width="100">
     </el-table-column>
     <el-table-column
       prop="operation"
       label="操作"
       width="240">
       <template slot-scope="scope">
        <el-button type="danger" size="mini" @click="fileDelete(scope)">删除</el-button>
         <el-button type="primary" v-if="showDownload(scope)" size="mini" @click="fileDownload(scope)">下载</el-button>
       </template>
     </el-table-column>
   </el-table>
 </el-card>
</template>

<script>
    import axios from "axios";
    import ResponseCode from "../constant/responseCode";
    import config from "../constant/config";

    export default {
      name: "File",
      created() {
        this.$emit('pageUrl', [{
            name: config.nav_list[2].name,
            path: config.nav_list[2].path
          }])
        this.getFileList(this.path)
        this.limit = config.file_settings.limit
      },
      data() {
        return {
          drawer: false,
          selectFilePath: [
            {
              id: 0,
              pathName:"主页"
            }],
          path: 'resources', // 默认文件夹路径
          selectionList: [], // 选中文件的列表
          dataList: [], // 服务器文件的列表
          fileList: [], // 上传文件的列表
          visible: false,
        }
      },
      methods: {
        showDownload(key) {
          return key.row.type !== "文件夹";
        },
        tableRowClass(key) {
          for (let i = 0;i < this.selectionList.length;i++)
            if(this.selectionList[i].id === key.row.id)
              return 'success-row';
          return ' '
        },
        fileDownload(key) {
          axios.post('file/download', this.$qs.stringify({
            paths:[key.row.path]
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS) {
              let eleLink = document.createElement('a')
              eleLink.href = axios.defaults.baseURL + '/' + key.row.url
              document.body.appendChild(eleLink)
              eleLink.click()
            } else
              this.$message.error(response.data.msg)
          })
        },
        fileDelete(key) {
          axios.post('file/delete', this.$qs.stringify({
            paths:[key.row.path]
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS){
              this.$message.success('删除成功')
              this.getFileList(this.path)
            } else
              this.$message.error(response.data.msg)
          })
        },
        filesDelete() {
          if(this.selectionList.length === 0){
            this.$message.error('还未选中文件')
            return;
          }
          // 获取选中的文件路径列表
          let paths = []
          for(let i = 0;i < this.selectionList.length;i++){
            paths.push(this.selectionList[i].path)
          }
          axios.post('file/delete', this.$qs.stringify({
            paths:paths
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS){
              this.$message.success('删除成功')
              this.getFileList(this.path)
            } else
              this.$message.error(response.data.msg)
          })
        },
        fileMkdir() {
          this.$prompt('请输入文件夹名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,}$/,
            inputErrorMessage: '格式不正确'
          }).then(( {value} ) => {
              axios.post('/file/mkdir', this.$qs.stringify({
                path: this.path,
                filename: value
              })).then((response) => {
                if (response.data.code === ResponseCode.SUCCESS) {
                  this.$message.success('创建成功')
                  this.getFileList(this.path)
                } else
                  this.$message.error(response.data.msg)
              })
          }).catch(() => {
            this.$message.info('取消创建')
          });
        },
        handleSelectionFileName(key) {
          let type = key.row.type
          if(type === "文件夹") {
            this.selectFilePath.push({
              id: this.selectFilePath.length,
              pathName: key.row.filename
            })
            this.path = this.path + '/' + key.row.filename
            this.dataList = this.getFileList(this.path)
          } else {
            let eleLink = document.createElement('a')
            eleLink.href = axios.defaults.baseURL + '/' + key.row.url
            document.body.appendChild(eleLink)
            eleLink.click()
          }
        },
        redirectByBread(key) {
          if(key.id !== (this.selectFilePath.length-1)) {
            for (let i = this.selectFilePath.length - 1; i > key.id; i--)
              this.selectFilePath.splice(i)
            // 拼接点击面包屑后的新地址
            let newPath = this.path.split('/', key.id + 1).join('/')
            this.path = newPath
            this.dataList = this.getFileList(newPath)
          }
        },
        handleTableSelectionChange(val) {
          let selection = []
          for (let i = 0; i < val.length; i++)
            selection.push({
              id: val[i].id,
              path: val[i].path,
              type: val[i].type
            })
          this.selectionList = selection
        },
        getFileList(path) {
          axios.post('/file/get', this.$qs.stringify({
            path: path
          })).then((response) => {
            if(response.data.code === this.RESPONCE_CODE.SUCCESS) {
              let list = response.data.data
              for (let i = 0; i < list.length; i++) {
                if(list[i].size !== '')
                  list[i].size = (list[i].size / 1024.0).toFixed(2) + "KB";
              }
              this.dataList = list
            } else
              this.$message.warning('网络连接不佳')
          })
        },
        handleFileUploadPreview(file) {
          let size = file.size / 1024 / 1024
          if(size > config.file_settings.size){
            this.$message.error('上传文件大小不能超过' + config.file_settings.size +  'MB!')
            return false
          }
          return true
        },
        handleFileUploadExceed(files, fileList) {
          this.$message.warning(`当前限制选择 ${config.file_settings.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        uploadFile(param) {
          let params = new FormData()
          params.append('files', param.file)
          params.append('path', this.path)
          axios.post('/file/upload', params).then((response) => {
            if(response.data.code === this.RESPONCE_CODE.FAILED){
              this.$message.error(response.data.msg)
            } else {
              this.$message.success("上传成功")
              this.getFileList(this.path)
             }
          })
        }
      }
    }
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
  .file_card {
    min-width: 910px;
    max-width: 1040px;
    margin: 0 auto;
  }
  .mkdir_button {
    background-color: #42b983;
  }
  .mkdir_button:hover, .mkdir_button:focus{
    background-color: rgba(101,182,135, 0.96);
  }

  .breadcrumb {
    margin: 10px
  }
</style>
