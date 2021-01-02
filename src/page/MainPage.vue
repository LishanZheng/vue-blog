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
            :default-active="this.$router.path"
            router>
            <el-menu-item index="/blog">
                <i class="el-icon-location"></i>
                <span>{{menuMap["/blog"]}}</span>
            </el-menu-item>
            <el-menu-item index="/file">
              <i class="el-icon-menu"></i>
              <span>{{menuMap["/file"]}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="padding: 0">
            <el-card style="width: 100%;height: 60px">
              <el-row>
                <el-col :span="23">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-if="pickedList != null">{{pickedList}}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <el-col :span="1">
                  <el-dropdown placement="top">
                    <el-avatar id="avatar" size="large">admin</el-avatar>
                    <el-dropdown-menu slot="dropdown">
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
      <el-footer id="footer" style="height: 30px">
        © 2021 🦉design by across
      </el-footer>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: 'MainPage',
    data() {
      return {
        menuMap:{
          "/blog":"博客",
          "/file":"文件",
        },
        pickedList: null,
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      handleClick(key, keyPath) {
        this.pickedList = this.menuMap[key]
      },
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
    position: fixed;
    top: 10px;
  }
</style>
