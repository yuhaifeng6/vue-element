<template>
  <div class='commonTab'>
    <el-tag
      :key="index"
      v-for="(tag, index) in tags"
      :closable="tag.name != 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="handleClick(tag)"
      :effect="$route.name == tag.name ? 'dark' : 'plain'">
      {{tag.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
name: 'commonTab',
  data() {
    return {
      inputVisible: false,
      inputValue: '',
    };
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    }),

  },
  methods: {
    ...mapMutations({
      close: "closeTab"
    }),
    handleClose(tag) {
      this.close(tag)
    },
    handleClick(val){
      this.$router.push({name: val.name})
      this.$store.commit("selectMenu", val)
    }
  },

  created() {},

  mounted() {},

}

</script>
<style lang='scss' scoped>
.commonTab{
  padding: 20px;
}
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
    cursor: pointer;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>