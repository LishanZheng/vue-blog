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
                :index=index>
              <i class="el-icon-location"></i>
              <span>{{item}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="padding: 0">
            <el-card style="width: 100%;height: 60px">
              <el-row>
                <el-col :span="23">
                  <el-breadcrumb separator="/" style="margin-left: 12px">
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
            <el-card shadow="always">
              <router-view></router-view>
            </el-card>
          </el-header>
        </el-container>
      </el-container>
      <el-footer id="footer" style="height: 20px">
        © 2021 🦉design by across
      </el-footer>
      <el-dialog
        title="请登录"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="account"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin">登 录</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: 'MainPage',
    created() {
      this.pickedIndex = this.menuMap['/blog']
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
      handleLogin() {
        console.log("login")
        this.dialogVisible = false
        this.$notify.success({
          title: '登录成功',
          message: '你来啦',
          showClose: true
        });
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
