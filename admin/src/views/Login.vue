<template>
  <div class="login-container">
    <el-card header="请先登陆" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('login',this.model)
      localStorage.setItem('token',res.data.token)
      sessionStorage.setItem('token',res.data.token)
      this.$router.push('/')
      this.$message.success('登陆成功')
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  overflow: hidden;
  .login-card {
    width: 30vw;
    margin: 18vh auto;
  }
}
@media (max-width: 1200px) {
  .login-container {
    .login-card {
      width: 60vw;
    }
  }
}
@media (max-width: 768px) {
  .login-container {
    .login-card {
      width: 80vw;
    }
  }
}
</style>