import Mock from "mockjs"

export default {
    getHomeData: ()=>{
        return {
            code: 200,
            data: {
                homeData: [
                    {
                        name: "springBoot",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "Vue",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "小程序",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "ES6",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "Java",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                ]
            }
        }
    },
    getHomeOtherData: ()=>{
        return {
            code: 200,
            data: {
                otherData: [
                    {
                        name: "孙悟空",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "猪八戒",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "唐僧",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: "沙和尚",
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                ]
            }
        }
    }
}