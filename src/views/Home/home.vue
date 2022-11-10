<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" style="height: 290px;">
        <div class="user">
          <img :src="userinfo.avatar" />
          <div class="userinfo">
            <p class="name">{{userinfo.username}}</p>
            <p class="access">{{userinfo.identifyname}}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2019-10-20</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px;margin-top: 20px;">
        <el-table :data="tableData">
          <el-table-column show-overflow-tooltip v-for="item, index in tableLabel" :key="index" :prop="index" :label="item">

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥ {{item.value}}</p>
            <p class="text">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echarts style="height: 280px" :chartData="echartData.order">

        </echarts>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echarts style="height: 260px" :chartData="echartData.user">

          </echarts>
        </el-card>
        <el-card shadow="hover">
          <echarts style="height: 260px" :chartData="echartData.video">

          </echarts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import echarts from "../../components/echarts";

export default {
name: 'home',
  data(){
    return {
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      tableData: [],
      tableLabel: {
        name: "课程名",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  components: {
    echarts,
  },
  computed: {
    userinfo () {
      return JSON.parse(this.$store.state.user.userinfo)
    }
  },
  created() {
    this.getTableData()
  },

  mounted() {
  },

  methods: {
    getTableData(){
      this.$http.get("/home/getData")
      .then(res=>{
        this.tableData = res.data.data.tableData
        const order = res.data.data.orderData // 订单折线图
        const user = res.data.data.userData
        this.echartData.order.xData = order.date
        let keyArr = Object.keys(order.data[0]) // 取出order.data中的键名
        // 遍历数组拼成echarts规定的对象
        keyArr.forEach(key => {
          this.echartData.order.series.push({
            name: key,
            type: "line",
            data: order.data.map(val => val[key])
          })
        })
        // 用户图表
        this.echartData.user.xData = user.map(item => item.date)
        this.echartData.user.series.push({
          name: "新增用户",
          data: user.map(item => item.new),
          type: "bar"
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: user.map(item => item.active),
          type: 'bar',
          barGap: 0
        })
        // 视频饼图
        this.echartData.video.series.push({
          data: res.data.data.videoData,
          type: 'pie'
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
}

</script>
<style lang='scss' scoped>
@import '~@/assets/scss/home';
</style>