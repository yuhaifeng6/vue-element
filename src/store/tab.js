import Cookie from "js-cookie"
import router from '@/router'

export default {
    state: {
        menu: [],
        isClollapse: false,
        currentMenu: null,
        tabsList: [
            {
                path: "/",
                label: "首页",
                name: "home",
                icon: "s-home"
            },
        ]
    },
    mutations: {
        setMenu(state, val) {
            state.menu = val
            Cookie.set("menu", val)
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove("menu")
        }, 
        addMenu(state, routers) {
            if (!Cookie.get("menu")) {
                return
            }
            let menu = JSON.parse(Cookie.get("menu"))
            state.menu = menu
            let currentMenu = [
                {
                    path: "/",
                    component: () => import(`@/views/vMain`),
                    children: []
                }
            ]
            // 循环添加路由，判断后端返回的路由是否有children路由
            // 做成路由需要的格式，将url作为component属性
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(val => {
                        val.component = () => import(`@/views/${val.url}`)
                        return val
                    })
                    currentMenu[0].children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            routers.addRoutes(currentMenu)
        },
        selectMenu(state, val) {
            if (val.name !== "home") {
                state.currentMenu = val
                // 判断tabsList中是否有重复的
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ""
            } else {
                state.currentMenu = null
            }
        },
        closeTab(state, val) {
            console.log('输出', state.currentMenu)
            // 关闭的时候  找到这个数组的下标值  将其删除掉 并且跳转到相应页面
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
            let last = state.tabsList.slice(state.tabsList.length - 1, state.tabsList.length)
            router.replace({name: last[0].name})
            state.currentMenu = last[0]
        },
        collapseMenu(state){
            state.isClollapse = !state.isClollapse
        }
    },
    actions: {

    }
}