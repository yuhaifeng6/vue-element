import Cookie from "js-cookie"
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
        setMenu(state, val){
            state.menu = val
            Cookie.set("menu", JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove("menu")
        },
        addMenu(state, router){
            let menu = JSON.parse(Cookie.get("menu"))
            if(!menu){
                return
            }
            state.menu = menu
            let currentMenu = [
                {
                    path: "/",
                    component: () => import(`@/views/vMain`),
                    children: []
                }
            ]
            // 循环添加路由，判断后端返回的路由是否有children路由
            menu.forEach(item => {
                console.log("遍历", item);
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
            // console.log("结果", currentMenu);
            // state.menu = currentMenu[0].children
            router.addRoutes(currentMenu)
        },
        selectMenu(state, val){
            console.log("点击", val);
            if(val.name !== "home"){
                state.currentMenu = val
                // 判断tabsList中是否有重复的
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ""
            } else {
                state.currentMenu = null
            }
        },
        closeTab(state, val) {
            // 关闭的时候  找到这个数组的下标值  将其删除掉
            let result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        collapseMenu(state){
            state.isClollapse = !state.isClollapse
        }
    },
    actions: {

    }
}