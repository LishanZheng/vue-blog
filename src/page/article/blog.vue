<template>
  <div>
    <el-row>
      <el-col :span="14" :offset="2">
        <el-card v-for="item in articleList" v-bind:key="item.id" class="blog_card">
          <router-link to="/blog" @click.native="articleDetail(item)" class="blog_title">{{item.title}}</router-link>
          <div class="blog_label">「 发表时间：{{item.time}} 」 「 类别：{{item.sort}} 」 </div>
          <mavon-editor
            class="blog_markdown"
            :value="item.text"
            :subfield = "false"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "false"
            :boxShadow = "false"
            :editable="false"
            :scrollStyle="true"
            :ishljs = "true"
          ></mavon-editor>
          <div class="blog_button_div">
            <el-button size="small" @click="articleDetail(item)" class="blog_button">阅读全文 ></el-button>
          </div>
          <el-divider content-position="right" class="divider">{{item.author}}</el-divider>
        </el-card>
        <div class="pagination">
          <el-divider></el-divider>
          <el-pagination
            layout="prev, pager, next"
            :page-size=limit
            @current-change="currentChange"
            :hide-on-single-page="true"
            :total="totalPage">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="5" :offset="1" :show-overflow-tooltip="true">
        <el-card class="avatar_card">
            <el-avatar class="avatar" src="http://121.196.174.189:8080/static/resources/7.png"></el-avatar>
            <p class="avatar_name"><a style="color: #ff4d51">A</a>cross</p>
            <p>神秘的帽子君，果然什么介绍也没有. 但还是留下了一些奇怪的地址。</p>
            <div><a href="https://github.com/LishanZheng" class="link">Github</a></div>
            <div><a href="https://blog.xuewen.me/blog.vue" class="link">@搞学问</a></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import config from "../../constant/config";
  import axios from "axios";

  export default {

      name: "Blog",
      created() {
        this.$emit('pageUrl', [
          {
            name: config.nav_list[0].name,
            path: config.nav_list[0].path,
          }])
        this.getArticleList()
        this.limit = config.article_settings.limit
      },
      methods: {
        currentChange(currentPage) {
          this.currentPage = currentPage
          this.getArticleList()
        },
        getArticleList() {
          axios.post('/article/get', this.$qs.stringify({
            currentPage: this.currentPage,
            limit: config.article_settings.limit,
            state: config.article_settings.state
          })).then((response) => {
            this.articleList = response.data.data.articleList
            this.totalPage = response.data.data.totalPage
          })
        },
        articleDetail(data) {
          let newPath = config.nav_list[0].children[0].path + '/' + data.id
          this.$router.push ({ path: newPath });
          this.$emit('pageUrl', [
            {
              name: config.nav_list[0].name,
              path: config.nav_list[0].path
            },
            {
              name: data.title,
              path: newPath
            },
          ])
        }
      },
      data() {
          return {
            articleList:[],
            totalPage: null,
            currentPage: 1,
            limit: 5,
          }
      },
    }

</script>

<style scoped>

  a {
    text-decoration: none;
  }
  .blog_card {
    min-width: 430px;
    margin-bottom: 35px;
    border: 1px solid #c6e2ff;
    padding: 30px 0 20px 0;
    text-align: center;
  }
  .blog_title {
    font-size: 32px;
    color: black;
    font-family:"华文细黑",monospace;
    border-bottom:2px solid #f5f7fa;
    width: 0;
    height: 0;
  }
  .blog_title:hover {
    border-bottom-color: #606266;
  }
  .blog_label {
    margin: 10px 0 35px 0;
    font-size: 12px;
    color: steelblue;
  }
  .blog_markdown {
    max-width: 800px;
    border: 0;
    margin: 0 auto;
  }
  .blog_button_div {
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .blog_button {
    color: #409eff;
    background-color: #f0f7ff;
    border: 1px solid #c6e2ff
  }
  .blog_button:hover {
    background-color: #409eff;
    color: white;
  }
  .divider {
    margin: 8px 0;
    background: 0 0;
    border-top: 1px dashed #e8eaec;
  }
  .pagination {
    margin-top: 80px;
    text-align: center;
  }
  .avatar_card {
    background-color: rgba(195,220,255,0.35);
    border: 1px solid #72767b;
    max-width: 260px;
    text-align: center;
  }
  .avatar {
    height: 100px;
    width: 100px;
    background-color: white;
    border: 3px solid #82848a;
    font-size: 13px;
  }
  .avatar_name {
    font-family: monospace;
    margin: 10px 0 10px 0;
    font-size: 20px;
  }
  .link {
    font-family: monospace;
    color: #72767b;
    font-size: 14px;
  }
  .link:hover {
    color: black;
  }
</style>
