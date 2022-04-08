<template>
  <div>
    <div id="main" style="width: 60%;height:400px;"></div>
  </div>
</template>

<script>
//导入 echarts
const echarts = require("echarts")
export default {
    data(){
        return{
            
        }
    },
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'))
        // 展示数据
        var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

option = {
  backgroundColor: '#000',
  globe: {
    baseTexture: ROOT_PATH + '/data-gl/asset/earth.jpg',
    shading: 'lambert',
    environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
    atmosphere: {
      show: true
    },
    light: {
      ambient: {
        intensity: 0.1
      },
      main: {
        intensity: 1.0
      }
    }
  },
  series: []
}
        option && myChart.setOption(option);
    }
}

</script>

<style>

</style>