<template>
  <div class='commonAside'>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isClollapse"
      active-text-color="#ffd04b">
      <h3 v-show="!isClollapse">于叔后台管理系统</h3>
      <h3 v-show="isClollapse">于叔</h3>
      <el-menu-item :index="item.path" @click="clickMenu(item)" v-for="(item, index) in noChildren" :key="index">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="item.label">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" @click="clickMenu(subItem)" :key="subIndex">
            <i :class="'el-icon-' + subItem.icon"></i>
            <span slot="title">{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
name: 'commonAside',
  data(){
    return {
    };
  },

    computed: {
      noChildren() {
        return this.menu.filter(item => !item.children)
      },
      hasChildren(){
        return this.menu.filter(item => item.children)
      },
      isClollapse(){
        return this.$store.state.tab.isClollapse
      },
      menu() {
        return this.$store.state.tab.menu
      }
    },
  created() {},

  mounted() {
    // console.log('侧边栏输出', this.$store.state.tab.menu);
  },

  methods: {
    clickMenu(val){
      this.$router.push({name: val.name})
      this.$store.commit("selectMenu", val)
    }
  },
}

</script>
<style lang='scss' scoped>
.commonAside{
    height: 100%;
}
.el-menu{
    height: 100%;
    border: none;
    h3{
      color: #ffffff;
      text-align: center;
      line-height: 60px;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>