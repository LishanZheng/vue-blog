<template>
 <div>
   <el-card body-style="padding: 5px;" >
     <el-button type="primary" style="background-color: #42b983">新建文件夹</el-button>
     <el-button>上传</el-button>
     <el-button type="danger">删除</el-button>
     <el-button type="primary">全部下载</el-button>
   </el-card>
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
       width="400"
       >
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
       <el-button round type="primary" size="mini">下载</el-button>
       <el-button round type="danger" size="mini">删除</el-button>
     </el-table-column>
   </el-table>
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
          handleSelectionChange(val) {
            let selection = []
            for (let i = 0; i < val.length; i++) {
              selection.push(val[i].id)
            }
            this.selectionList = selection
            console.log(selection)
          }
        },
        data() {
          return {
            selectionList: [],
            tableData: [{
              id: 1,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
            }, {
              id: 2,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
            }, {
              id: 3,
              uploadDate: '2016-05-03',
              fileName: '图片',
              size: '10.2G',
              type: 'png',
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
