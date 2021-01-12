<template>
  <div>
    <el-card style="margin: 0 auto;max-width:1000px; background-color: rgb(251,251,251);">
      <div>
        <p style="text-align: center;margin-top: 30px;font-size: 35px;font-family: 'PingFang SC',serif">人脸检测</p>
        <p style="text-align: center; margin: 10px 0 35px 0;font-size: 17px;color: steelblue">「 发表时间：*time* 」 「 类别：*type* 」 </p>
      </div>
      <mavon-editor
        style="max-width: 800px;border: 0;margin: 0 auto;"
        :value="htmlMD"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :boxShadow = "false"
        :editable="false"
        :scrollStyle="true"
        :ishljs = "true"
      ></mavon-editor>
      <el-card style="background-color: rgb(251,251,251);margin: 40px 40px;border-left: 4px solid steelblue;padding-left:40px;" shadow="never">
        <div>
          <p class="explanation"><b>· 本文作者：</b> *across*</p>
          <p class="explanation"><b>· 发表时间：</b> *across*</p>
          <p class="explanation"><b>· 版权声明：</b> 本博客所有文章除特别声明外，均采用 BY-NC-SA 许可协议。转载请注明出处！</p>
        </div>
      </el-card>
      <el-card style="background-color: rgb(251,251,251);">
        *留言*
      </el-card>
    </el-card>
  </div>
</template>

<script>
  import axios from "axios";
  import config from "../constant/PageConfig";

  export default {
        name: "Article",
        created() {
          this.getArticle()
          this.$emit('pageUrl', [
            {
              name: config.NAV_LIST[0].name,
              path: config.NAV_LIST[0].path,
            },
            {
              name: this.$route.params.id,
              path: this.$route.path
            }])
        },
        methods: {
          getArticle() {
            const url = 'http://121.196.174.189:8080/static/resources/3.md'
            axios.get(url).then((response) => {
              this.htmlMD = response.data;
            });
          }
        },
        data() {
          return {
            htmlMD: null,
          }
        }
    }
</script>

<style scoped>
  .explanation {
    font-size: 16px;
    margin: 0;
    color: #72767b
  }

</style>
