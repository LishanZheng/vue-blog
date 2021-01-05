<template>
 <div>
   <el-card style="width: 1320px">
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
             :limit="5"
             :on-exceed="handleExceed"
             :file-list="fileList">
             <el-button type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">文件大小不超过50MB</div>
           </el-upload>
         </el-col>
         <el-col :span="2" :offset="1">
           <el-button type="danger">全部删除</el-button>
         </el-col>
         <el-col :span="2">
           <el-button type="primary">全部下载</el-button>
         </el-col>
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
         width="360"
       >
         <template slot-scope="scope">
           <el-link @click="handleSelectionPath(scope)" :underline="false" target="_blank" class="buttonText">{{scope.row.filename}}</el-link>
         </template>
       </el-table-column>
       <el-table-column
         prop="uploadTime"
         label="上传时间"
         width="270">
       </el-table-column>
       <el-table-column
         prop="type"
         label="类型"
         width="180">
       </el-table-column>
       <el-table-column
         prop="size"
         label="大小"
         width="110">
       </el-table-column>
       <el-table-column
         prop="operation"
         label="操作"
         width="300">
         <el-button round type="danger" size="mini">删除</el-button>
       </el-table-column>
     </el-table>
   </el-card>
 </div>
</template>

<script>
    import axios from "axios";
    import ResponseCode from "../constant/ResponseCode";

    export default {
      name: "File",
      created() {
        let that = this
        that.getFileList(that.path)
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
          fileList: []
        }
      },
      methods: {
          fileMkdir() {
            this.$prompt('请输入文件夹名称', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,}$/,
              inputErrorMessage: '格式不正确'
            }).then(({ value }) => {
                axios.post('/file/mkdir', {
                  path: this.path,
                  filename: value
                }).then((response) => {
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
            if(this.selectionList.includes(key.row.id))
              return 'success-row';
            else
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
              selection.push(val[i].id)
            }
            this.selectionList = selection
          },
          getFileList(path) {
            let that = this
            axios.post('/file/get', {
              path: path
            }).then((response) => {
              if(response.data.code === this.RESPONCE_CODE.SUCCESS)
              that.tableData = response.data.data
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
                this.$message.error(response.msg)
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
