<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>  
    <!-- 卡片区域 -->
    <el-card>
        <div id="main" style="width: 60%;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
//导入 echarts
const echarts = require("echarts")
import _ from 'lodash'
export default {
    data(){
        return{
        options: {
            grid:{
                
            },
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
        }
    },
    async mounted(){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'))
      
      const { data:res } = await this.$http.get('reports/type/1')
      if(res.meta.status !==200 ){
          return this.$message.error('获取数据失败')
      }
      //准备数据和配置项
      const result = _.merge(res.data, this.options)

      // 展示数据
      myChart.setOption(result);
      //表格宽度自适应
      window.onresize = function() {
        myChart.resize();
      };
    }
    
}
</script>

<style lang="less" scoped>

</style>