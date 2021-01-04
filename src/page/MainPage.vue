<template>
  <div id="homeWrap">
    <el-container>
      <el-container>
        <el-aside width="10%">
          <el-menu
            @select="handleClick"
            background-color="#304156"
            text-color="#BECBD8"
            active-text-color="#4192E9"
            style="height: 100vh;width:160px;position: fixed"
            :default-active="this.$route.path"
            router>
            <el-menu-item v-for="(item, index) in menuMap" :key="index"
                          style="font-size: 15px;"
                :index=index>
              <i class="el-icon-location"></i>
              <span>{{item}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="padding: 0">
            <el-card style="width: 100%;height: 60px;position: fixed;left: 160px">
              <el-row>
                <el-col :span="23" >
                  <el-breadcrumb separator="/" style="margin-left: 12px;font-size: 16px;">
                    <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="pickedIndex != null">{{ pickedIndex }}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <el-col :span="1">
                  <el-dropdown>
                    <el-avatar id="avatar" size="large">admin</el-avatar>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-circle-plus" @click.native="dialogVisible = true">登录
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-circle-plus">退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-card>
            <el-card shadow="always" style="position: fixed;left: 160px;top: 60px">
              <router-view></router-view>
            </el-card>
          </el-header>
        </el-container>
      </el-container>
      <el-footer id="footer" style="height: 20px">
        © 2021 🦉design by across
      </el-footer>
      <Login :dialogVisibleProps="dialogVisible" @dialogChange="handleDialog"></Login>
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
      pickedIndex: null,
      dialogVisible: false,
      labelPosition: 'right',
      account: null,
      password: null
      }
    },
    methods: {
      handleTest() {
        console.log("test")
      },
      handleClick(key, keyPath) {
        this.pickedIndex = this.menuMap[key]
      },
      handleDialog(key) {
        this.dialogVisible = key
      }
    }
  }
</script>
<style scoped>
  #homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 99%;
    height: 100%;
  }


  #footer {
    text-align: center;
    font-size: 10px;
    background-color: cornsilk;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  #avatar {
    position: relative;
    bottom: 10px;
  }

</style>
