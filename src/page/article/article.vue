<template>
  <div v-loading="loading">
    <el-card class="article_card">
      <div>
        <p class="article_title">{{article.title}}</p>
        <p class="article_label" >「 发表时间：{{article.time}} 」 「 类别：{{article.sort}} 」 </p>
      </div>
      <mavon-editor
        class="article"
        :value="htmlMD"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :boxShadow = "false"
        :editable="false"
        :scrollStyle="true"
        :ishljs = "true"
      ></mavon-editor>
        <div class="copyright">
          <p class="explanation"><b>· 本文作者：</b> {{article.author}}</p>
          <p class="explanation"><b>· 发表时间：</b> {{article.time}}</p>
          <p class="explanation"><b>· 版权声明：</b> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！</p>
        </div>
        *留言*
    </el-card>
  </div>
</template>

<script>
  import axios from "axios";
  import config from "../../constant/config";

  export default {
        name: "Article",
        created() {
          this.getArticle()
        },
        methods: {
          getArticle() {
            axios.post('/article/getById', this.$qs.stringify({
              id: this.$route.params.id,
            })).then((response) => {
              this.article = response.data.data
              let url = this.article.url
              axios.get(url).then((response) => {
                this.htmlMD = response.data;
              });
              this.$emit('pageUrl', [
                {
                  name: config.nav_list[0].name,
                  path: config.nav_list[0].path,
                },
                {
                  name: this.article.title,
                  path: this.$route.path
                }])
              this.loading = false
            })
          }
        },
        data() {
          return {
            htmlMD: null,
            article: {
              id: 1, title: "xxxx", time: "xxxx-xx-xx", sort: "xxxx", author: "across", text: "## "
            },
            loading: true
          }
        }
    }
</script>

<style>
  .explanation {
    font-size: 16px;
    margin: 0;
    color: #72767b
  }
  .article_card {
    margin: 0 auto;
    max-width:1000px;
    background-color: rgb(251,251,251);
  }
  .article_title {
    text-align: center;
    margin-top: 30px;
    font-size: 35px;
    font-family: 'PingFang SC',serif;
  }
  .article_label {
    text-align: center;
    margin: 10px 0 35px 0;
    font-size: 17px;
    color: steelblue;
  }
  .article {
    max-width: 800px;
    border: 0;
    margin: 0 auto;
  }
  .copyright {
    background-color: rgb(251,251,251);
    margin: 40px 0 40px 80px;
    border-left: 3px solid steelblue;
    padding-left: 20px;
  }

</style>
