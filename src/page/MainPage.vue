<template>
<!--  <el-container >-->
<!--    <el-header  id="header">-->
<!--      <span>Hello, Gangster</span>-->
<!--      <el-divider id="line"></el-divider>-->
<!--    </el-header>-->
<!--    <el-container>-->
<!--      <el-aside width="150px">-->
<!--        <el-menu-->
<!--          text-color="#555"-->
<!--          default-active="1"-->
<!--          active-text-color="#690">-->
<!--          <el-menu-item index="1">-->
<!--            <template>-->
<!--              <i class="el-icon-menu"></i>-->
<!--              <span slot="title">导航一</span>-->
<!--            </template>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="2">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span slot="title">导航二</span>-->
<!--          </el-menu-item>-->
<!--        </el-menu>-->
<!--        <el-main id="main-page">-->
<!--          <article v-html="value" >-->
<!--          </article>-->
<!--        </el-main>-->
<!--      </el-aside>-->

<!--    </el-container>-->

<!--  </el-container>-->
  <el-container>
    <el-header  id="header">
      <span>Hello, Gangster</span>
      <el-divider id="line"></el-divider>
    </el-header>
    <el-container>
      <el-aside width="150px">
      <el-menu
        text-color="#555"
        default-active="1"
        active-text-color="#690">
        <el-menu-item index="1">
          <template>
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main id="main-page">
      <article v-html="'<h1>hh</h1>'" >
      </article>
    </el-main>
    </el-container>
    <el-footer id="footer">
      © 2021 Design by across
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
    background-color: #E9EEF3;
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
    margin-left: 10%;
  }
  #footer{
    text-align: center;
    font-size: 10px;
  }
  #main-page{
    height: 1100px;
  }

</style>
