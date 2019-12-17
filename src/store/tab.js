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
        selectMenu(state, val){
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