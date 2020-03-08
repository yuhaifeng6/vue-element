import { constantRouterMap, defaultRouterMap } from "@/router";
import { asyncRouterMap } from "@/router/modules/asyncRouterMap";

// const ASYNC_ROUTER_KEY = "async_router";
// let serialize = require("serialize-javascript");

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
var resourceTypes = ["menu", "menu_item"];
var three = 0;
function generateAsyncRouter(currentResource, resources) {
  if (!resources || resources.length == 0) {
    return [];
  }
  
  var result = [];
  var component = null;
  var h = "";
  if (currentResource == null) {
    component = () => import("@/胜利iews/layout/Layout");
    h = "/";
  }else{  // 外围不为空三级路由父级
    // component = () => import('@/胜利iews/comCenter')
    // h = "";
    // console.log(currentResource)
  }
  //拿到子集路由
  var childResources = getResourceChildren(currentResource, resources);
 //判断子集
  if (childResources != null) {
    //不为空遍历
    childResources.forEach(resource => {
      //遍历每一个子集    
      if (resource && resourceTypes.includes(resource.resourceTypeCode)) {
      
        var children = null;  // 设定子集的子集为空
        var defaultRouterRoot = null;  //默认根路由为空
        var  FQing = false;
         //是菜单栏目  而且外面有包围
        if(resource.resourceTypeCode == "menu" && currentResource != null){
            
            children = generateAsyncRouter(resource, resources);
            FQing = true
        }
        else if (resource.resourceTypeCode == "menu" && currentResource == null) {  // 如果路由类型为菜单组  递归
          children = generateAsyncRouter(resource, resources);
          //三级路由纠正二级路由状态
          // children.forEach(item => {
          //   if(item.component==null){
          //     item.component = () => import('@/胜利iews/comCenter')
          //   }
          // })
          // console.log(children)
        } else if (
          resource.resourceTypeCode == "menu_item" &&
          currentResource == null)   // 如果是功能页面 且没有父级
        {
          defaultRouterRoot = {
            name: "p-" + resource.resourceCode,
            path: "/" + resource.resourceCode,
            component: () => import("@/胜利iews/layout/Layout"),
            children: []
        };
        } else if (resource.resourceTypeCode == "menu_item" ) { // 有父级
          if (asyncRouterMap && asyncRouterMap[resource.path]) {
              component = asyncRouterMap[resource.path];
          }
        }
        const tmp = {
          path: h + resource.path,
          component: component,
          name: resource.resourceCode,
          meta: {
            title: resource.resourceName,
            icon: resource.icon
          },
          children: children
        };
        if(FQing){
          tmp.component =  () => import('@/胜利iews/comCenter')
        }
        if(defaultRouterRoot) {
          if (asyncRouterMap && asyncRouterMap[resource.path]) {
            tmp.component = asyncRouterMap[resource.path];
          }

          defaultRouterRoot.children.push(tmp);
          result.push(defaultRouterRoot);
        } else{
          result.push(tmp);
        }
      }
    });
    
  }
 
  return result;
}
//判断子集
function getResourceChildren(resource, resources) {
  if (resources) {
    var parentCode =
      resource == null || resource == "" ? "0" : resource.resourceCode;
    return resources.filter(res => parentCode == res.parentCode);
  }
  return null;
}