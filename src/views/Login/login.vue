<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.userpwd" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        userpwd: ''
      }
    }
  },
  methods: {
    login() {
      if (!this.form.username || !this.form.userpwd) {
        this.$message({
          message: '请输入用户名和密码！',
          type: 'warning'
        })
        return
      }
      this.api.postAPI('/api/login', this.form).then(res => {
        console.log('返回', res)
        let data = res.data
        let code = data.code
        let msg = data.msg
        let userinfo = {uid: data.uid, username: data.username, avatar: data.avatar, identifyname: data.identifyname}
        if (code < 0) {
          this.$message({
            type: 'warning',
            message: msg
          })
        } else {
          this.$message({
            type: 'success',
            message: msg
          })
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', data.routecon)
          this.$store.commit('setUserInfo', userinfo)
          this.$store.commit('setToken', data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  margin: auto;
  padding: 45px;
  height: 450px;
  background-color: #fff;
}
</style>
