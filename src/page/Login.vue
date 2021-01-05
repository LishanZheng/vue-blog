<template>
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
        <el-button @click="handleLogin">取 消</el-button>
        <el-button type="primary" @click="handleLogin">登 录</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      labelPosition: 'right',
      account: null,
      password: null,
      dialogVisible: this.dialogVisibleProps
    }
  },
  props: {
    dialogVisibleProps: null
  },
  methods: {
    handleLogin() {
      this.dialogVisible = false
      this.$emit("dialogChange", this.dialogVisible)
      this.$notify.success({
        title: '登录成功',
        message: '你来啦',
        showClose: true
      });
    }
  },
  watch: {
    dialogVisibleProps: {
      immediate: true,
      handler(val) {
        this.dialogVisible = val
      },
    },
  }
}
</script>

<style scoped>

</style>
