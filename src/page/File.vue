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
         prop="fileName"
         label="名称"
         width="360"
       >
         <template slot-scope="scope">
           <el-link @click="handleSelectionPath(scope)" :underline="false" target="_blank" class="buttonText">{{scope.row.fileName}}</el-link>
         </template>
       </el-table-column>
       <el-table-column
         prop="uploadDate"
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
    export default {
        name: "File",
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
            if(type === "文件夹"){
              that.selectFilePath.push({
                id: that.selectFilePath.length,
                pathName: key.row.fileName
            })
              this.tableData = this.tableData = [{
                id: 1,
                uploadDate: '2016-05-03',
                fileName: '文件夹',
                size: '10.2G',
                type: '文件夹',
                url: '',
              }, {
                id: 2,
                uploadDate: '2016-05-03',
                fileName: '图片',
                size: '10.2G',
                type: 'png',
                url: 'www.baidu.com',
              }]
            }
          },
          redirectSelectionPath(key) {
            for (let i = this.selectFilePath.length-1; i > key.id; i--) {
               this.selectFilePath.splice(i)
            }
            console.log(this.selectFilePath)
            this.tableData = [{
              id: 1,
              uploadDate: '2016-05-03',
              fileName: '文件夹',
              size: '10.2G',
              type: '文件夹',
              url: '',
            }, {
              id: 2,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
              url: 'www.baidu.com',
            }, {
              id: 3,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
              url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306555661,2157420471&fm=26&gp=0.jpg',
            }]
          },
          handleSelectionChange(val) {
            let selection = []
            for (let i = 0; i < val.length; i++) {
              selection.push(val[i].id)
            }
            this.selectionList = selection
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
            selectionList: [],
            tableData: [{
              id: 1,
              uploadDate: '2016-05-03',
              fileName: '文件夹',
              size: '10.2G',
              type: '文件夹',
              url: '',
            }, {
              id: 2,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
              url: 'www.baidu.com',
            }, {
              id: 3,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
              url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3306555661,2157420471&fm=26&gp=0.jpg',
            }]
          }
        }
    }
</script>

<style>
  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
