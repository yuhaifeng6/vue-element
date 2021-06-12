<template>
  <div class='commonHeader'>
    <div class="l_con">
      <el-button plain type="primary" icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{current.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r_con">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userinfo.avatar" alt="" class="user_ava">
        </span>
        <el-dropdown-menu slot="dropdown" size="mini">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
name: 'commonHeader',
  data(){
    return {
    };
  },

  computed: {
    ...mapState({
      current: state => state.tab.currentMenu,
      userinfo: state => JSON.parse(state.user.userinfo)
    })
  },
  created() {},

  mounted() {},

  methods: {
    collapseMenu(){
      this.$store.commit("collapseMenu")
    },
    logout() {
      var func_arr = [ "clearToken", "clearMenu", "clearUserInfo" ]
      func_arr.forEach(item => {
        this.$store.commit(item)
      })
      location.reload()
    }
  },
}

</script>
<style lang='scss' scoped>
.commonHeader{
  display: flex;
  align-items: center;
  height: 100%;
  background: #545c64;
  padding: 0 20px;
  color: #ffffff;
  justify-content: space-between;
}
.l_con{
  align-items: center;
  display: flex;
  .el-button{
    margin-right: 20px;
  }
}
.r_con{
  .user_ava{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.el-dropdown{
  color: #ffffff;
}
</style>
<style lang="scss">
.el-breadcrumb__item{
  .el-breadcrumb__inner{
    color: #666666;
  }
  &:last-child{
    .el-breadcrumb__inner{
      color: #f4f4f4;
    }
  }
}
</style>