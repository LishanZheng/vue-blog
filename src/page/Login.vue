<template>
  <el-form>
    <el-form-item label="活动名称" prop="name">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group>
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group>
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
name: "Login"
}
</script>

<style scoped>

</style>
