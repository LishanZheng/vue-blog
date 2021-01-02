<template>
  <div id="homeWrap">
    <el-container>
      <el-container>
        <el-aside width="160px">
          <el-menu
            style="height: 1030px"
            default-active="1-1"
            @open="handleOpen"
            @close="handleClose"
            background-color="#304156"
            text-color="#BECBD8"
            active-text-color="#4192E9">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="padding: 0">
            <el-card style="width: 100%;height: 60px">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
            <el-card style="height: 1000px">

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
    name: 'SidebarItem',
    data() {
      return {
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>

  #homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #footer{
    text-align: center;
    font-size: 10px;
    background-color: cornsilk;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
