<template>
 <div>
   <el-card style="min-width: 910px;max-width: 1040px;margin: 0 auto">
     <div>
       <el-row>
         <el-col :span="3">
           <el-button type="primary" style="background-color: #42b983" @click="fileMkdir">新建文件夹</el-button>
         </el-col>
         <el-col :span="3">
           <el-upload
             action="action"
             :http-request="uploadFile"
             :before-upload="handlePreview"
             multiple
             :show-file-list=false
             :limit="20"
             :on-exceed="handleExceed"
             :file-list="fileList">
             <el-button type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">大小不超过50MB</div>
           </el-upload>
         </el-col>
         <el-col :span="2" :offset="1">
           <el-button type="danger" @click="filesDelete">选中删除</el-button>
         </el-col>
<!--         <el-col :span="2">-->
<!--           <el-button type="primary" @click="filesDownload">选中下载</el-button>-->
<!--         </el-col>-->
       </el-row>
       <el-breadcrumb separator-class="el-icon-arrow-right"  style="margin: 10px">
         <el-breadcrumb-item v-for="item in selectFilePath" :key=item.id>
             <el-link @click="redirectSelectionPath(item)" :underline="false" target="_blank">{{item.pathName}}</el-link>
         </el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <el-table
       :data="tableData"
       ref="multipleTable"
       @selection-change="handleSelectionChange"
       :header-cell-style="{background:'#eef1f6',color:'#606266'}"
       style="width: 100%;margin: 10px 0 0 2px;"
       :row-class-name="tableRowClassName">
       <el-table-column
         fixed
         prop="id"
         label="序号"
         width="50"
         type="selection"
       >
       </el-table-column>
       <el-table-column
         fixed
         prop="filename"
         label="名称"
         width="250"
       >
         <template slot-scope="scope">
           <el-link @click="handleSelectionPath(scope)" :underline="false" target="_blank" class="buttonText">{{scope.row.filename}}</el-link>
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
 </div>
</template>

<script>
    import axios from "axios";
    import ResponseCode from "../constant/ResponseCode";
    import config from "../constant/PageConfig";

    export default {
      name: "File",
      created() {
        this.getFileList(this.path)
        this.$emit('pageUrl', [
          {
            name: config.NAV_LIST[2].name,
            path: config.NAV_LIST[2].path
          }])
      },
      data() {
        return {
          drawer: false,
          selectFilePath: [
            {
              id: 0,
              pathName:"主页"
            },
          ],
          path: 'resources',
          selectionList: [],
          tableData: [],
          fileList: [],
          visible: false,
        }
      },
      methods: {
        showDownload(key) {
          if(key.row.type === "文件夹")
            return false
          return true
        },
        fileDownload(key) {
          axios.post('file/download', this.$qs.stringify({
            paths:[key.row.path]
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS){
              let eleLink = document.createElement('a')
              eleLink.href = axios.defaults.baseURL + '/' + key.row.url
              document.body.appendChild(eleLink)
              eleLink.click()
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        },
        filesDownload() {
          let paths = []
          if(this.selectionList.length === 0){
            this.$message({
              type: 'error',
              message: '还未选中文件'
            })
            return;
          }
          for(let i = 0;i < this.selectionList.length;i++){
            if(this.selectionList[i].type !== '文件夹')
              paths.push(this.selectionList[i].path)
          }
          axios.post('file/download', this.$qs.stringify({
            paths:paths
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS){
              for(let i = 0;i < paths.length;i++){
                console.log(paths[i])
                let eleLink = document.createElement('a')
                eleLink.href = axios.defaults.baseURL + '/' + paths[i]
                document.body.appendChild(eleLink)
                eleLink.click()
                eleLink.removeAll()
              }
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        },
        fileDelete(key) {
          axios.post('file/delete', this.$qs.stringify({
            paths:[key.row.path]
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS){
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getFileList(this.path)
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        },
        filesDelete() {
          let paths = []
          if(this.selectionList.length === 0){
            this.$message({
              type: 'error',
              message: '还未选中文件'
            })
            return;
          }
          for(let i = 0;i < this.selectionList.length;i++){
            paths.push(this.selectionList[i].path)
          }
          axios.post('file/delete', this.$qs.stringify({
            paths:paths
          })).then((response) => {
            if(response.data.code === ResponseCode.SUCCESS){
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getFileList(this.path)
            } else {
              this.$message({
                type: 'error',
                message: response.data.msg
              })
            }
          })
        },
        fileMkdir() {
          this.$prompt('请输入文件夹名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,}$/,
            inputErrorMessage: '格式不正确'
          }).then(({ value }) => {
              axios.post('/file/mkdir', this.$qs.stringify({
                path: this.path,
                filename: value
              })).then((response) => {
                  if (response.data.code === ResponseCode.SUCCESS) {
                    this.$message({
                      type: 'success',
                      message: '创建成功'
                    })
                    this.getFileList(this.path)
                  } else {
                    this.$message({
                      type: 'error',
                      message: response.data.msg
                    })
                  }
                })
              }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消创建'
                    });
                  });
        },
        tableRowClassName(key) {
          for (let i = 0;i < this.selectionList.length;i++){
            if(this.selectionList[i].id === key.row.id)
              return 'success-row';
          }
            return ' '
        },
        handleSelectionPath(key) {
          let type = key.row.type
          let that = this
          if(type === "文件夹") {
            that.selectFilePath.push({
              id: that.selectFilePath.length,
              pathName: key.row.filename
            })
            that.path = that.path + '/' + key.row.filename
            that.tableData = that.getFileList(that.path)
          } else {
            let eleLink = document.createElement('a')
            eleLink.href = axios.defaults.baseURL + '/' + key.row.url
            document.body.appendChild(eleLink)
            eleLink.click()
          }
        },
        redirectSelectionPath(key) {
          if(key.id !== (this.selectFilePath.length-1)) {
            for (let i = this.selectFilePath.length - 1; i > key.id; i--) {
              this.selectFilePath.splice(i)
            }
            let newPath = this.path.split('/', key.id + 1).join('/')
            this.path = newPath
            this.tableData = this.getFileList(newPath)
          }
        },
        handleSelectionChange(val) {
          let selection = []
          for (let i = 0; i < val.length; i++) {
            selection.push({
              id: val[i].id,
              path: val[i].path,
              type: val[i].type
            })
          }
          this.selectionList = selection
        },
        getFileList(path) {
          axios.post('/file/get', this.$qs.stringify({
            path: path
          })).then((response) => {
            if(response.data.code === this.RESPONCE_CODE.SUCCESS)
            {
              let list = response.data.data
              for (let i = 0; i < list.length; i++) {
                list[i].size = (list[i].size / 1024.0).toFixed(2) + "KB";
              }
              this.tableData = list
            }

          })
        },
        handlePreview(file) {
          let size = file.size / 1024 / 1024
          if(size > 50){
            this.$message.error('上传文件大小不能超过 50MB!')
            return false
          }
          return true
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
</style>
