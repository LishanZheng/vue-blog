<template>
  <el-card style="margin: 0 100px;padding:40px 60px">
    <el-collapse @change="handleChange" style="background-color: royalblue">
      <el-collapse-item v-for="(item, index) in sortList"
                        :key="index"
                        >
        <template slot="title">
          <span style="font-size: 25px;color: steelblue;">{{item.name}}</span>
<!--          <i class="header-icon el-icon-info"></i>-->
        </template>
        <el-timeline>
          <el-timeline-item v-for="(articleItem) in item.articleList"
                            hide-timestamp=true
                            :key="articleItem.title">
              <h4>{{articleItem.title}}</h4>
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
  import config from "../../constant/PageConfig";

  export default {
        name: "Sort",
        created() {
          this.$emit('pageUrl', [
            {
              name: config.NAV_LIST[1].name,
              path: config.NAV_LIST[1].path
            }])
        },
        data() {
          return {
            sortList: [{
                name: "人工智能",
                articleList : [{
                    title: "article1",
                    time: "2021-07-21"
                  },
                  {
                    title: "article2",
                    time: "2021-07-21"
                }]
              },
              {
                name: "机器学习",
                articleList : [{
                    title: "article1",
                    time: "2021-07-21"
                  },
                  {
                    title: "article2",
                    time: "2021-07-21"
                  }]
              }]
          }
        }
    }
</script>

<style scoped>

</style>
