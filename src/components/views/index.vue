<template>
  <div class="body">
    <el-container>
        <!-- 页面头部 -->
        <el-header>
           <span> </span>
           <span>ds系统</span>
           <el-button type="info" @click="logout" size="small">退出</el-button> 
        </el-header>
        <!-- 页面主内容 -->
        <el-main>
            <el-row :gutter="20">
                <!-- 页面左侧 -->
                <el-col :span="6">
                    <!-- 卡片一 -->
                    <el-card>
                        <div>
                            <one></one>
                        </div>
                    </el-card>
                    <!-- 卡片二 -->
                    <el-card>
                        <div>
                            <two></two>
                        </div>
                    </el-card>
                    <!-- 卡片三 -->
                    <el-card>
                        <div>
                            <div id="three" style="width: 100%;height:200px"></div>
                        </div>
                    </el-card>
                </el-col>
                <!-- 页面中间 -->
                <el-col :span="12">
                        <el-card style="height:87vh">
                            <div id="china-map" style="width:100%;height:85vh" ref="map"></div>
                        </el-card>
                </el-col>
                <!-- 页面右侧 -->
                <el-col :span="6">
                    <!-- 卡片4 -->
                    <el-card>
                        <div>
                            <div id="four" style="width: 100%;height:200px"></div>
                        </div>
                    </el-card>
                    <!-- 卡片5 -->
                    <el-card>
                        <div>
                            <div id="five" style="width: 100%;height:200px"></div>
                        </div>
                    </el-card>
                    <!-- 卡片6 -->
                    <el-card>
                        <div>
                            <div id="six" style="width: 100%;height:200px"></div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import One from './Main/one.vue'
import Two from './Main/two.vue'
// 引用echarts
const echarts = require("echarts")
import "../views/china"
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/chart/pie");
require("echarts/lib/component/markLine");
require("echarts/lib/component/geo");
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/map");
export default {
    components: { One , Two },
    data(){
        return{
            
        }
    },
    mounted(){
        this.drawCharts()
        // 第1个图表声明
        // var Chart1 = echarts.init(document.getElementById('one'))
        // 第2个图表声明
        // var Chart2 = echarts.init(document.getElementById('two'))
        // 第3个图表声明
        var Chart3 = echarts.init(document.getElementById('three'))
        // 第4个图表声明
        var Chart4 = echarts.init(document.getElementById('four'))
        // 第5个图表声明
        var Chart5 = echarts.init(document.getElementById('five'))
        // 第6个图表声明
        var Chart6 = echarts.init(document.getElementById('six'))
        // 第1个图表数据
        // var option1 = {
        // title: {
        //     text: 'one ',
        //     textStyle:{color:'#fff'}
        // },
        // tooltip: {},
        // legend: {
        //     data: ['销量'],
        //     textStyle:{
        //         color:'#fff'
        //     }
        // },
        // xAxis: {
        //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        // },
        // yAxis: {},
        // series: [
        //     {
        //     name: '销量',
        //     type: 'bar',
        //     data: [5, 20, 36, 10, 10, 20]
        //     }
        // ]
        // }
        // 第2个图表数据
        // var option2 = {
        //     title: {
        //         text: 'Referer of a Website',
        //         subtext: 'Fake Data',
        //         left: 'center',
        //         textStyle:{color:'#fff'}
        //     },
        //     tooltip: {
        //         trigger: 'item'
        //     },
        //     series: [
        //         {
        //         name: 'Access From',
        //         type: 'pie',
        //         top:'40px',
        //         radius: '70%',
        //         data: [
        //             { value: 1048, name: 'Search Engine' },
        //             { value: 735, name: 'Direct' },
        //             { value: 580, name: 'Email' },
        //             { value: 484, name: 'Union Ads' },
        //             { value: 300, name: 'Video Ads' }
        //         ],
        //         emphasis: {
        //             itemStyle: {
        //             shadowBlur: 10,
        //             shadowOffsetX: 0,
        //             shadowColor: 'rgba(0, 0, 0, 0.5)'
        //             }
        //         }
        //         }
        //     ]
        // }
        // 第3个图表数据
        var option3 = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center',
            textStyle:{color:'#fff'}
        },
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
        // 第4个图表数据
        var option4 = {
             tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        title: {
                text: 'Referer of a Website',
                left: 'center',
                textStyle:{color:'#fff'}
            },
        series: [
            {
            name: 'Pressure',
            type: 'gauge',
            progress: {
                show: true
            },
            detail: {
                valueAnimation: true,
                color:'#fff',
                formatter: '{value}'
            },
            data: [
                {
                value: 40,
                name: 'SCORE',
                color:'#fff'
                }
            ]
            }
        ]
        }
        // 第5个图表数据
        var option5 = {
            title: {
                text: 'Referer of a Website',
                subtext: 'Fake Data',
                left: 'center',
                textStyle:{color:'#fff'}
            },
            graphic: {
            elements: [
            {
                type: 'group',
                left: 'center',
                top: 'center',
                children: new Array(7).fill(0).map((val, i) => ({
                type: 'rect',
                x: i * 20,
                shape: {
                    x: 0,
                    y: -40,
                    width: 10,
                    height: 80
                },
                style: {
                    fill: '#5470c6'
                },
                keyframeAnimation: {
                    duration: 1000,
                    delay: i * 200,
                    loop: true,
                    keyframes: [
                    {
                        percent: 0.5,
                        scaleY: 0.3,
                        easing: 'cubicIn'
                    },
                    {
                        percent: 1,
                        scaleY: 1,
                        easing: 'cubicOut'
                    }
                    ]
                }
                }))
            }
            ]
        }
        }
        // 第6个图表数据
        var option6 = {
             title: [
                {
                    text: 'Tangential',
                    textStyle:{color:'#fff'}
                }
            ],
            polar: {
                radius: [30, '80%']
            },
            angleAxis: {
                max: 4,
                startAngle: 75
            },
            radiusAxis: {
                type: 'category',
                data: ['a', 'b', 'c', 'd']
            },
            tooltip: {},
            series: {
                type: 'bar',
                data: [2, 1.2, 2.4, 3.6],
                coordinateSystem: 'polar',
                label: {
                show: true,
                position: 'middle',
                formatter: '{b}: {c}'
                }
  }
        }
      // 第1图表
    //   Chart1.setOption(option1);
      // 第2个图表
    //   Chart2.setOption(option2);
      // 第1图表
      Chart3.setOption(option3);
      // 第2个图表
      Chart4.setOption(option4);
      // 第1图表
      Chart5.setOption(option5);
      // 第2个图表
      Chart6.setOption(option6);
      // 表格宽度自适应
      window.onresize = function() {
        // Chart2.resize();
        Chart3.resize();
        Chart4.resize();
        Chart5.resize();
        Chart6.resize();
      }
    },
    methods:{
        //退出事件
        logout(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        //中国地图
        drawCharts() {
      // 基于准备好的dom，初始化echarts实例
      var chinaMap = echarts.init(document.getElementById("china-map"));
      window.onresize = chinaMap.resize; // 窗口或框架被调整大小时执行chinaMap.resize
      chinaMap.setOption({
        // 进行相关配置
        tooltip: {
          show: true //鼠标经过显示地区名称
        },
        geo: {
          map: "china",
          roam: false,// 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 34], // 调整地图位置
          label: {
            normal: {
              show: false, //关闭省份名展示
              fontSize: "10",
              color: "rgba(0,0,0,0.7)"
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#0d0059", // 地图背景颜色
              borderColor: "#389dff", // 地图边框颜色
              borderWidth: 1, // 设置外层边框
              shadowBlur: 5,
              shadowOffsetY: 8,
              shadowOffsetX: 0,
              shadowColor: "#01012a"
            },
            emphasis: {
              areaColor: "#184cff", // 鼠标经过颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        
      });
        },
        
    }
}
</script>

<style lang="less" scoped>
.body{
    width: 100%;
    height: 100vh;
    background-color: #010f29;
    color: #c0c0c0;
    display: flex;
}
.el-header{
    // border: 1px solid #125f74;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
}
.el-card{
    width: 100%;
    border-radius: 0;
    height: 28vh;
    margin-bottom: 3%;
    // display: flex;
    background-color: #041e38;
    border: 1px solid #125f74;
}
.el-row {
    height: 100%;
    .el-col {
      height: 100%;
      position: relative;
      #china-map {
        height: 100%;
      }
    }
}
</style>