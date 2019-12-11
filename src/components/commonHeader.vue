<template>
  <div class='commonHeader'>
    <div class="l_con">
      <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
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
          <img :src="user_ava" alt="" class="user_ava">
        </span>
        <el-dropdown-menu slot="dropdown" size="mini">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
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
      user_ava: require("../assets/img/user.png")
    };
  },

  computed: {
    ...mapState({
      current: state => state.tab.currentMenu      
    })
  },
  created() {},

  mounted() {},

  methods: {
    
  },
}

</script>
<style lang='scss' scoped>
.commonHeader{
  display: flex;
  align-items: center;
  height: 100%;
  background: #000000;
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
    color: #ffffff;
  }
  &:last-child{
    .el-breadcrumb__inner{
      color: #f4f4f4;
    }
  }
}
</style>