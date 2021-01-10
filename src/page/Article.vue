<template>
  <p>{{pageId}}</p>
</template>

<script>
    export default {
        name: "Article",
        created() {
          this.pageId = this.$route.params.id
        },
        data() {
          return {
            pageId: null
          }
        }
    }
</script>

<style scoped>

</style>
