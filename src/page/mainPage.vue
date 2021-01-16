<template>
    <el-container class="page_container">
    <el-container>
      <el-aside style="width: 160px">
        <el-menu
          active-text-color="#538CFF"
          text-color="#000000"
          :default-active="this.$route.path"
          router>
          <el-menu-item v-for="(item) in navList"
                        :key="item.name"
                        :index=item.path
                        class="aside_menu">
            <i :class=item.icon></i> <span> {{item.name}} </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="right_container">
          <el-card class="header" shadow="never" >
            <el-breadcrumb separator=">" >
              <el-breadcrumb-item :to="{path: '/'}">主页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item, index) in breadCrumbList"
                                  :key="index"
                                  :to="{path: item.path}">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
<!--            头像-->
          </el-card>
          <el-card class="body"><router-view @pageUrl="redirectMainPage"></router-view></el-card>
        </el-header>
      </el-container>
    </el-container>
    <el-footer class="footer">© 2021 🦉  Across<a href="http://beian.miit.gov.cn/"> 闽ICP备2021000449号</a></el-footer>
<!--    <login :dialogVisibleProps = "dialogVisible" @dialogChange="handleDialog"></login>-->
  </el-container>
</template>

<script>

  import Login from "./login";
  import config from "../constant/config";

  export default {
    name: 'MainPage',
    components: {Login},
    created() {
      this.getNavList()
    },
    data() {
      return {
        navList:[],
        breadCrumbList: [],
        // account: null,
        // password: null,
        // dialogVisible: false,
      }
    },
    methods: {
      getNavList() {
        // 获取导航菜单的列表 以数组形式[[*name*, *path*, *icon*], [……]]
        let navList = [];
        for (let i = 0; i < config.nav_list.length; i++)
          navList.push({
            name: config.nav_list[i].name,
            path: config.nav_list[i].path,
            icon: config.nav_list[i].icon})
        this.navList = navList
      },
      redirectMainPage(data) {
        let List = []
        for (let i = 0; i < data.length; i++)
          List.push({
            name: data[i].name,
            path: data[i].path
          })
        this.breadCrumbList = List
      },
    }
  }
</script>
<style scoped>
  .page_container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .aside_menu {
    font-size: 15px;
    height:65px;
    width: 160px;
  }
  .right_container {
    padding: 0;
    margin-left: -1px;
    height: 60px;
  }
  .header {
    padding-left:13px;
    background-color: rgba(235,243,255,0.45);
  }
  .body {
    min-width:1000px;
    width:86vw;
    background-color: rgba(241,247,254,0.2);
  }
  .footer {
    text-align: center;
    font-size: 10px;
    background-color: rgba(241,247,254,0.8);
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 20px !important;
  }
</style>
