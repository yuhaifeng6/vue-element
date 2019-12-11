<template>
  <div class='commonAside'>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#33aef0"
      text-color="#fff"
      active-text-color="#ffd04b">
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
export default {
name: 'commonAside',
  data(){
    return {
        asideMenu: [
            {
                path: "/",
                label: "首页",
                name: "home",
                icon: "s-home"
            },
            {
                path: "/video",
                label: "视频管理",
                name: "video",
                icon: "video-play"
            },
            {
                path: "/user",
                label: "用户管理",
                icon: "user",
                name: "user"
            },
            {
                path: "/",
                label: "其他",
                children: [
                    {
                        path: "/page1",
                        label: "页面1",
                        icon: "setting",
                        name: "page1"
                    },
                    {   
                        path: "/page2",
                        label: "页面2",
                        icon: "document",
                        name: "page2"
                    }
                ]
            }
        ]
    };
  },

    computed: {
        noChildren() {
            return this.asideMenu.filter(item => !item.children)
        },
        hasChildren(){
            return this.asideMenu.filter(item => item.children)
        }
    },
  created() {},

  mounted() {},

  methods: {
    clickMenu(val){
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
}
</style>