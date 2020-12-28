<template>
  <el-container>
    <el-header  id="header">
      <span>Hello, Gangster</span>
      <el-divider id="line"></el-divider>
    </el-header>
    <el-container>
      <el-aside width="150px">
      <el-menu
        text-color="#555"
        default-active="1" default-route="/file"
        active-text-color="#690" router>
        <el-menu-item index="1" route="/article">
          <template>
            <i class="el-icon-menu"></i>
            <span slot="title">博客</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2" route="/file">
          <i class="el-icon-menu"></i>
          <span slot="title">文件</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main id="main-page">
      <router-view></router-view>
    </el-main>
    </el-container>
    <el-footer id="footer">
      © 2021 🦉design by across
    </el-footer>
  </el-container>
</template>


<script>

  export default {
    name: "MainPage",
  }
</script>

<style scoped>


  .el-main {
    /*background-color: #E9EEF3;*/
    text-align: center;
  }
  #header{
    text-align:center;
    font-size: 35px;
    width: 100%;
    margin-top: 2%;
    margin-bottom: 2%;

  }
  #line{
    width: 80%;
    margin-left: 150px;
  }
  #footer{
    text-align: center;
    font-size: 10px;
    background-color: cornsilk;

  }
  #main-page{
    height: 1100px;
  }

</style>
