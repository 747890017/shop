<template>
  <div>
      <!-- 电站信息按钮 -->
      <div class="btn">
        <el-button 
        type="primary" 
        icon="el-icon-menu" 
        plain size="mini"
        @click="xiugai">电站信息</el-button>
      </div>
        <!-- 时间轴 -->
        <div class="time">
            <span>{{ nowDate }}</span>
            <span>{{ nowTime }}</span>
        </div>

        <el-row :gutter="10">
            <!-- 卡片1 -->
            <el-col :span="10">
                <el-card class="card1">
                    <span style="font-size:30px">{{newtime}}天</span>
                </el-card>
            </el-col>
            <!-- 卡片2 -->
            <el-col :span="14">
                <el-card class="card1">
                    <span>站名:{{ formText.name }}</span><br>
                    <span>站长:{{ formText.username }}</span><br>
                    <span>应急电话:{{ formText.number }}</span>
                </el-card>
            </el-col>
        </el-row>
        <!-- 电站信息对话框 -->
        <el-dialog
        title="站信息"
        :visible.sync="dialogVisible"
        width="30%">
        <!-- 表单 -->
            <el-form label-width="100px" label-position="left">
                <el-form-item label="站名">
                    <el-input v-model="formText.name"></el-input>
                </el-form-item>
                <el-form-item label="站长">
                    <el-input v-model="formText.username"></el-input>
                </el-form-item>
                <el-form-item label="应急电话">
                    <el-input v-model="formText.number"></el-input>
                </el-form-item>
                <el-form-item label="开始运行时间">
                    <el-input v-model="formText.time"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="correct">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 时间的值
            timer:null,
            nowDate:'',
            nowTime:'',
            // 电站信息
            formText:{
                name:'重机变电站',
                username:'admin',
                number:'18888888888',
                time:'2018-10-30'
            },
            newtime:'',
            dialogVisible : false,
        }
    },
    mounted(){
        // 时间
        var _this = this
        this.timer = setInterval(() => {
            this.setNowTimes()
        },1000)
    },
    methods:{
        //时间
        setNowTimes(){
            let myDate = new Date()
            // console.log(myDate)
            let yy = String(myDate.getFullYear())
            let mm = myDate.getMonth() + 1
            let dd = String(
                myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate()
            )
            let hou = String(
                myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours()
            )
            let min = String(
                myDate.getMinutes() < 10
                ? "0" + myDate.getMinutes()
                : myDate.getMinutes()
            );
            let sec = String(
                myDate.getSeconds() < 10
                ? "0" + myDate.getSeconds()
                : myDate.getSeconds()
            );
            this.nowDate = yy + "-" + mm + "-" + dd + " "
            this.nowTime = hou + ":" + min + ":" + sec;


            //获取已工作时间（天）
            var startDate =this.formText.time//获取输入的时间
            startDate= startDate.replace(new RegExp("-","gm"),"/")//转化格式
            var startDateM = (new Date(startDate)).getTime() //得到毫秒数
            var a = new Date().getTime() //获取当前时间（毫秒）
            var newtime = (a - startDateM) / '86400000' //总毫秒除一天的毫秒得到已工作的毫秒
            this.newtime = Math.trunc(newtime) //取整
        },
        //修改电站信息
        xiugai(){
            this.dialogVisible = true
        },
        //
        correct(){
            this.$message.success('修改成功')
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="less" scoped>
.el-card{
    background-color: #041e38;
    border: 1px solid #125f74;
}
.card1{
    height: 90px;
    border-radius: 5px;
    color: #c0c0c0;
    font-size: 13px;
}
.time{
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
}
.btn{
    text-align: center;
    margin-top: -20px;
}
.el-card{
    box-shadow: 2px 2px 5px #125f74 !important;
}
</style>