<template>
 <div>
   <el-card>
     <div >
       <el-button type="primary" style="background-color: #42b983">新建文件夹</el-button>
       <el-button>上传</el-button>
       <el-button type="danger">删除</el-button>
       <el-button type="primary">全部下载</el-button>
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

    export default {
      name: "File",
      created() {
        let that = this
        that.getFileList(that.path)
      },
      methods: {
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
              console.log(that.path)
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
            }).then(function (response) {
              that.tableData = response.data.data
            })
          }
        },
        data() {
          return {
            selectFilePath: [
              {
                id: 0,
                pathName:"主页"
              },
            ],
            path: 'resources',
            selectionList: [],
            tableData: []
          }
        }
    }
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
