<template>
  <div class='v-main'>
    <el-container style="height: 100%;">
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <commonAside></commonAside>
      </el-aside>
      <el-container>
        <el-header>
          <commonHeader></commonHeader>
        </el-header>
        <commonTab></commonTab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import commonHeader from '../components/commonHeader'
import commonAside from '../components/commonAside'
import commonTab from '../components/commonTab'
export default {
name: 'main',
  data(){
    return {
    };
  },
  components: {
      commonHeader,
      commonAside,
      commonTab
  },

  created() {},

  mounted() {},

  methods: {},
}

</script>
<style lang='scss' scoped>
.v-main{
  height: 100%;
  .el-header{
    padding: 0;
  }
}
</style>