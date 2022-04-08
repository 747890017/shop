<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>   

    <!--卡片视图区域-->
    <el-card>
        <!--搜索与添加区域-->
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable  @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple">
                    <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>    
            </div></el-col>
        </el-row>
        <!--用户列表区域-->
        <el-table 
        :data="userlist"
        border
        stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <!--修改按钮-->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <!--删除按钮-->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    <!--分配角色按钮-->
                    <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--分页区域-->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-card> 
    <!-- 添加用户对话框内容区 -->
    <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="50%"
    @close="addDialogClosed">
    
    <el-form status-icon :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username" >
            <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 修改用户对话框内容区 -->
    <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisble"
    width="50%"
    @close="editDialogClosed">
        <!-- 修改用户表单 -->
        <el-form status-icon :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item label="用户名">
                <el-input
                v-model="editForm.username"
                :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog
    title="分配角色"
    :visible.sync="setRoleDialogVisible"
    width="50%"
    @close="setRoleDialogClosed">
    <div>
        <p>当前的用户: {{userInfo.username}}</p>
        <p>当前的角色: {{userInfo.role_name}}</p>
        <p>分配新角色: 
            <el-select v-model="selectedRoleId" placeholder="请选择" size="mini">
                <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
                </el-option>
            </el-select>
        </p>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
    </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data(){
        // 验证邮箱的规则
        var checkEmail = (rule, value, cb) =>{
            //验证邮箱的正则表达式
            const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(regEmail.test(value)) {
                // 合法的邮箱
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }
        //验证手机号
        var checkMobile = (rule, value, cb) =>{
            //验证手机号的正则表达式
            const regEmail = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if(regEmail.test(value)) {
                // 合法的手机号
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
        return{
            //获取用户列表的参数对象
            queryInfo:{
                query:'',
                //当前页数
                pagenum: 1 ,
                //当前每页显示多少条数据
                pagesize: 2
            },
            //需要被分配角色的用户信息
            userInfo:{},
            //所有角色的数据列表
            rolesList:[],
            userlist:[],
            total: 0,
            // 控制添加用户对话框显示
            dialogVisible:false,
            // 控制修改用户对话框显示
            editDialogVisble:false,
            // 控制分配角色对话框的显示与隐藏
            setRoleDialogVisible:false,
            //查询到的用户信息对象
            editForm:{},
            //已选中的下拉菜单值
            selectedRoleId:{},
            // 添加用户表单数据
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:''
            },
            //添加表单的验证规则对象
            addFormRules:{
                username: [
                    {
                        required: true, message:'请输入用户名',trigger:'blur'
                    },
                    {
                        min:3,
                        max:10,
                        message:'用户名的长度在3~10个字符之间',
                        trigger:'blur'
                    }
                ],
                password: [
                    {
                        required: true, message:'请输入密码',trigger:'blur'
                    },
                    {
                        min:6,
                        max:15,
                        message:'用户名的长度在6~15个字符之间',
                        trigger:'blur'
                    }
                ],
                email:[
                    {
                        required: true, message:'请输入邮箱',trigger:'blur'
                    },
                    {
                        validator: checkEmail, trigger:'blur'
                    }
                ],
                mobile:[
                    {
                        required: true, message:'请输入手机',trigger:'blur'
                    },
                    {
                        validator: checkMobile, trigger:'blur'
                    }
                ]
            },
            editFormRules:{
                email:[
                    {
                        required:true, message:'请输入用户邮箱',trigger:'blur'
                    },
                    {   
                        validator:checkEmail,trigger:'blur'
                    }
                ],
                mobile:[
                    {
                        required:true, message:'请输入用户手机',trigger:'blur'
                    },
                    {   
                        validator:checkMobile,trigger:'blur'
                    }
                ],
                
            }
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            const { data: res } = await this.$http.get('users',{
                params : this.queryInfo
            })
            if(res.meta.status !== 200){
                return this.$message.error('获取列表失败！')
            }
            this.userlist = res.data.users
            this.total = res.data.total
            console.log(res);
        },
        //监听 pagesize 改变事件
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            //重新获取数据
            this.getUserList()
        },
        //监听 页码值 改变的事件
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        //监听 switch 开关状态的改变
        async userStateChanged(userinfo){
            console.log(userinfo)
            const { data: res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if(res.meta.status !== 200){
                userinfo.mg_state = !userinfo.mg_state
                return this.$message.error('更新用户状态失败！')
            }
            this.$message.success('更新用户状态成功')
        },
        //点击按钮，添加新用户
        addUser(){
            this.$refs.addFormRef.validate(async valid =>{
                if(!valid) return
                //可以发起添加用户网络请求    
                const { data:res } = await this.$http.post
                ('users',this.addForm)
                if(res.meta.status != 201){
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                // 隐藏对话框
                this.dialogVisible = false
                // 重新获取用户列表数据
                this.getUserList()
            })
            
        },
        //监听添加用户对话框的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        //展示编辑用户的对话框
        async showEditDialog(id){
            // console.log(id);
            const { data:res } = await this.$http.get('users/' + id)

            if(res.meta.status !== 200){
                return this.$message.error('查询信息用户失败！')
            }

            this.editForm = res.data
            this.editDialogVisble = true
        },
        //修改用户信息并提交
        editUserInfo(){
            this.$refs.editFormRef.validate(async valid =>{
                if (!valid)return  
                //发起修改用户信息的数据请求    
                const {data:res} = await this.$http.put('users/' + this.editForm.id,{
                    email:this.editForm.email,
                    mobile:this.editForm.mobile
                })
                console.log(this.editForm.id);
                if(res.meta.status !== 200){
                    return this.$message.error('更新用户信息失败')
                }
                //关闭对话框
                this.editDialogVisble = false
                // 刷新数据列表
                this.getUserList()
                // 提示修改成功
                this.$message.success('更新用户信息成功')
            })
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
        this.$refs.editFormRef.resetFields()
        },
        //删除用户信息
        async removeUserById(id){
            //弹窗提示是否删除数据
            const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(err => err)
            //如果用户确认删除，则返回值为字符串 confirm
            //入股用户取消删除则返回值为字符串 cencel
            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }

            const { data:res } = await this.$http.delete('users/' + id)
            if(res.meta.status !== 200){
                return this.$message.error('删除用户失败')
            }
            this.$message.success('删除用户成功')
            this.getUserList()
        },
        //分配角色的的对话框
        async setRole(userInfo){
            this.userInfo = userInfo
            const { data:res } = await this.$http.get('roles')
            if(res.meta.status !== 200){
                return this.$message.error('获取角色列表失败')
            }
            this.rolesList = res.data
            this.setRoleDialogVisible = true
            
        },
        //点击按钮,分配角色
        async saveRoleInfo(){
            if(!this.selectedRoleId){
                return this.$message.error('请选择要分配的角色!')
            }

            const {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`,{
                rid:this.selectedRoleId
            })
            if(res.meta.status !== 200){
                return this.$message.error('更新角色失败!')
            }
            this.$message.success('更新角色成功')
            this.getUserList()
            this.setRoleDialogVisible = false
        },
        //监听分配角色对话框的关闭事件
        setRoleDialogClosed(){
            this.selectedRoleId = ''
            this.userInfo = {}
        }
    }
}
</script>

<style lang="scss" scoped>

</style>