<template>
  <div>
    <el-card style="margin: 0 auto;max-width:1000px; background-color: rgb(251,251,251);">
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
    </el-card>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
        name: "Article",
        created() {
          this.pageId = this.$route.params.id
          this.getArticle()
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
            pageId: null,
            htmlMD: null,
          }
        }
    }
</script>

<style scoped>

</style>
