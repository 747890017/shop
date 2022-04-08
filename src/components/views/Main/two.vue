<template>
  <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item>
            <div id="two" style="width: 350px;height:200px"></div>
        </el-carousel-item>
        <el-carousel-item>
            <div id="two2" style="width: 350px;height:200px"></div>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
import { color } from 'echarts'
// 引用echarts
const echarts = require("echarts")
export default {
    data(){
        return{

        }
    },
    mounted(){
        var Chart2 = echarts.init(document.getElementById('two'))
        var Chart3 = echarts.init(document.getElementById('two2'))
        var option2 = {
            title: {
                text: '温度',
                textStyle:{
                    color:'#c0c0c0'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Email']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['早', '中', '晚']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [10, 25, 30,]
                }
            ]
        }
        var option3 = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
                }
            ]
        }
        Chart2.setOption(option2)
        Chart3.setOption(option3)
        window.onresize = function() {
        Chart2.resize();
        Chart3.resize();
      }
    }
}
</script>

<style>

</style>