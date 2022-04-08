<template>
  <div>
    <el-container class="Home-container">
        <!--头部-->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>电商后台管理</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--页面主体-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!--侧边栏菜单区域-->
                <div class="toggle-buttom" @click="toggleCollapse"><i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i></div>
                <el-menu
                router
                :collapse = "isCollapse"
                :collapse-transition = "false"
                unique-opened
                background-color="#333744"
                text-color="#fff"
                active-text-color="#409EFF"
                :default-active="activePath"
                >
                <!--一级菜单-->
                <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
                    <!--一级菜单的模板区域-->
                    <template slot="title">
                        <!--图标-->
                        <i :class="iconObj[item.id]"></i>
                        <!--文本-->
                        <span>{{item.authName}}</span>
                    </template>

                    <!--二级菜单--> 
                    <el-menu-item 
                    :index="'/' + subItem.path +''" 
                    v-for="subItem in item.children" :key="subItem.id"
                    @click="saveNavState('/' + subItem.path )"
                    >
                        <template slot="title">
                            <!--图标-->
                            <i class="el-icon-menu"></i>
                            <!--文本-->
                            <span>{{ subItem.authName }}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧内容-->
            <el-main>
                <!--路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
  
</template>

<script>
export default {
    data(){
        return{
            //左侧菜单数据
            menulist:[],
            //是否折叠 
            isCollapse:false,
            //被激活的链接地址
            activePath:'',
            iconObj:{
                '125' : 'el-icon-user-solid',
                '103' : 'el-icon-s-help',
                '101' : 'el-icon-s-goods',
                '102' : 'el-icon-s-claim',
                '145' : 'el-icon-s-data',
            }
        }
    },
    created(){
        this.getMenuList()
        this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push("/login")
        },
        //获取所有的菜单
        async getMenuList(){
            const { data:res } =  await this.$http.get('menus')
            if (res.meta.status != 200) return this.$message.error(res.meta.msg)
            this.menulist = res.data
            console.log(res);
        },
        //点击按钮，切换菜单折叠
        toggleCollapse(){
            this.isCollapse = !this.isCollapse 
        },
        //保存链接的激活状态
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
.Home-container{
    height: 100vh;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
    img{
        width: 60px;
    }
}
.el-aside{
    background-color: #333744;
    .el-menu{
        border-right:none ;
    }
    .toggle-buttom{
        background-color: #4a5064;
        text-align: center;
        font-size: 20px;
        color: #c0c0c0;
        cursor: pointer;
    }
}
.el-main{
    background-color: #eaedf1;
}

</style>