<template>
  <div class='main'>
    <el-container style="height: 100%;">
        <el-aside width="200px">
            <commonAside></commonAside>
        </el-aside>
        <el-container>
            <el-header>
                <commonHeader></commonHeader>
            </el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import commonHeader from '../components/commonHeader'
import commonAside from '../components/commonAside'
export default {
name: 'main',
  data(){
    return {
    };
  },
  components: {
      commonHeader,
      commonAside
  },

  created() {},

  mounted() {},

  methods: {},
}

</script>
<style lang='scss' scoped>
.main{
  height: 100%;
  .el-header{
    padding: 0;
  }
}
</style>