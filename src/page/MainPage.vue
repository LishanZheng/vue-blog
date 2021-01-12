<template>
  <div id="homeWrap">
    <el-container>
      <el-container>
        <el-aside style="width: 160px;">
          <el-menu
            @select="handleClick"
            active-text-color="#538CFF"
            text-color="#000000"
            style="height: auto;"
            :default-active="this.$route.path"
            router>
            <el-menu-item v-for="(item, index) in menuMap" :key="index"
                          style="font-size: 15px;height:65px"
                :index=index>
              <i :class=getClass(index)></i>
              <span>{{item}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="padding: 0;margin-left: -1px">
            <el-card style="height: 60px;padding-left:13px;background-color: rgba(235,243,255,0.45);" shadow="never" >
              <el-breadcrumb separator=">" style="  width:90vh;font-size: 16px;">
                <el-breadcrumb-item :to="{path: '/'}">主页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="pickedIndex != null">{{ pickedIndex }}</el-breadcrumb-item>
              </el-breadcrumb>
              <el-row>
                <el-col >
                </el-col>
                <!--                <el-col :span="1" >-->
                <!--                  <el-dropdown >-->
                <!--                    <el-avatar id="avatar" size="large" >admin</el-avatar>-->
                <!--                    <el-dropdown-menu slot="dropdown" split-button=true >-->
                <!--                      <el-dropdown-item icon="el-icon-circle-plus" @click.native="dialogVisible = true">登录-->
                <!--                      </el-dropdown-item>-->
                <!--                      <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>-->
                <!--                    </el-dropdown-menu>-->
                <!--                  </el-dropdown>-->
                <!--                </el-col>-->
              </el-row>
            </el-card>
            <el-card shadow="never" style="min-width:1000px;width:86vw;background-color: rgba(241,247,254,0.2);" >
              <router-view @pageUrl="redirectMainPage"></router-view>
            </el-card>
          </el-header>
        </el-container>
      </el-container>
      <el-footer id="footer" style="height: 20px">
        © 2021 🦉 design by across
        <a href="http://beian.miit.gov.cn/"> 闽ICP备2021000449号</a>
      </el-footer>
      <login :dialogVisibleProps = "dialogVisible" @dialogChange="handleDialog"></login>
    </el-container>
  </div>
</template>

<script>

  import Login from "./Login";
  export default {
    name: 'MainPage',
    components: {Login},
    created() {
      this.pickedIndex = this.menuMap[this.$route.path]
    },
    data() {
      return {
        menuMap:{
          "/blog":"博客",
          "/file":"文件",
        },
        iconMap:{
          "/blog":"el-icon-user",
          "/file":"el-icon-cloudy"
        },
        pickedIndex: null,
        dialogVisible: false,
        labelPosition: 'right',
        account: null,
        password: null
        }
    },
    methods: {
      getClass(index) {
        return this.iconMap[index]
      },
      handleTest() {
        console.log("test")
      },
      handleClick(key, keyPath) {
        this.pickedIndex = this.menuMap[key]
      },
      handleDialog(key) {
        this.dialogVisible = key
      },
      redirectMainPage(data) {
        this.pickedIndex = this.menuMap[data]
      },
    }
  }
</script>
<style scoped>
  #homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }


  #footer {
    text-align: center;
    font-size: 10px;
    background-color: rgba(241,247,254,0.8);
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  #avatar {
    position: relative;
    bottom: 10px;
  }

</style>
