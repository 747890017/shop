<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>  
     <!-- 卡片区域 -->
     <el-card>
         <!-- 添加角色按钮区域 -->
         <el-row>
             <el-col>
                    <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
             </el-col>
         </el-row>
         <!-- 角色列表区域 -->
         <el-table :data="roleslist" border stripe>
             <!-- 展开列 -->
             <el-table-column type="expand">
                 <template slot-scope="scope">
                     <el-row 
                     :class="['bdbottom',i1 === 0 ? 'bdtop' : 'venter']"
                     v-for="(item1, i1) in scope.row.children" 
                     :key="item1.id">
                         <!-- 渲染一级权限 -->
                         <el-col :span="5">
                             <el-tag 
                             closable
                             @close="removeUserById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                             <i class="el-icon-caret-right"></i>
                         </el-col>
                         <!-- 渲染二级权限 -->
                         <el-col :span="19">
                             <!-- 通过 for循环 嵌套渲染二级权限 -->
                             <el-row
                             :class="['bdbottom',i2 === 0 ? 'venter' : 'bdtop']"
                             v-for="(item2,i2) in item1.children" :key="item2.id">
                                 <el-col :span="6">
                                     <el-tag type="success" closable
                                     @close="removeUserById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                     <i class="el-icon-caret-right"></i>
                                 </el-col>
                                 <el-col :span="18">
                                     <el-tag 
                                     type="warning"
                                     v-for="(item3) in item2.children"
                                     :key="item3.id"
                                     closable
                                     @close="removeUserById(scope.row,item3.id)">
                                        {{item3.authName}}
                                     </el-tag>
                                 </el-col>
                             </el-row>
                         </el-col>
                     </el-row>
                 </template>
             </el-table-column>
             <!-- 索引列 -->
             <el-table-column type="index" label="#"></el-table-column>
             <el-table-column label="角色名称" prop="roleName"></el-table-column>
             <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
             <el-table-column label="操作" width="300px">
                 <template slot-scope="scope">
                    <!--修改按钮-->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
                    <!--删除按钮-->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById2(scope.row.id)">删除</el-button>
                    <!--分配角色按钮-->
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配角色</el-button>
                </template>
             </el-table-column>
         </el-table>
     </el-card>
     <!-- 添加用户对话框内容区 -->
    <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    @close="addDialogClosed"
    width="50%">
    <el-form status-icon :model="addForm" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名称" prop="roleName" >
            <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
    </el-dialog>
    <!-- 修改用户对话框内容区 -->
    <el-dialog
    title="编辑用户"
    :visible.sync="editDialogVisble"
    width="50%"
    @close="editDialogClosed">
        <!-- 修改用户表单 -->
        <el-form 
        status-icon 
        :model="editForm" 
        ref="editFormRef" 
        label-width="70px"
        >
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="editForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="editForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
    title="提示"
    :visible.sync="setRightDialogVisible"
    width="50%" @close="setRightDialogClosed">
    <!-- 树形控件 -->
    <el-tree 
    :data="rightslist" 
    :props="treeProps"
    show-checkbox
    node-key="id"
    default-expand-all
    ref="treeRef"
    :default-checked-keys="defKeys"></el-tree>
    <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            //控制添加用户对话框的显示
            dialogVisible:false,
            //控制修改用户对话框的显示
            editDialogVisble:false,
            //控制权限分配对话框
            setRightDialogVisible:false,
            //所有角色列表
            roleslist:[],
            //添加用户列表信息
            addForm:{
                roleName:'',
                roleDesc:''
            },
            //查询到的用户信息
            editForm:[],
            //所有权限的数据
            rightslist:[],
            //树形控件的属性绑定对象
            treeProps:{
                label:'authName',
                childrenL:'children'
            },
            //默认选中的节点Id值数组
            defKeys:[],
            //当前即将分配权限的角色id
            roleIdL:''
        }
    },
    created(){
        this.getRolesList()
    },
    methods:{
        //获取数据信息
        async getRolesList(){
            const {data:res} = await this.$http.get('roles')
            if(res.meta.status !== 200){
                return this.$message.error('信息获取失败')
            }
            this.roleslist = res.data
        },
        //添加用户信息
        addUser(){
            if(this.addForm.roleName === ''){
                this.$message.error('用户名不能为空')
            }else{
                this.$refs.addFormRef.validate(async valid =>{
                if(!valid) return
                //可以发起添加用户网络请求    
                const { data:res } = await this.$http.post
                ('roles',this.addForm)
                if(res.meta.status != 201){
                    this.$message.error('添加用户失败')
                }
                this.$message.success('添加用户成功')
                // 隐藏对话框
                this.dialogVisible = false
                // 重新获取用户列表数据
                this.getRolesList()
            })
            }
        },
        //监听添加用户对话框的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },

        //展示编辑用户的对话框
        async showEditDialog(id){
            const { data:res } = await this.$http.get('roles/' + id)
            if(res.meta.status !== 200){
                return this.$message.error('查询信息用户失败！')
            }
            this.editForm = res.data
            this.editDialogVisble = true
        },
        //修改用户信息并提交
        editUserInfo(){
            this.$refs.editFormRef.validate(async valid =>{
                if (!valid) return 
                //发起修改用户信息的数据请求    
                const { data:res } = await this.$http.put('roles/' + this.editForm.roleId,{
                    roleName:this.editForm.roleName,
                    roleDesc:this.editForm.roleDesc
                })
                console.log(res);
                if(res.meta.status !== 200){
                    return this.$message.error('更新用户信息失败')
                }
                //关闭对话框
                this.editDialogVisble = false
                // 刷新数据列表
                this.getRolesList()
                // 提示修改成功
                this.$message.success('更新用户信息成功')
            })
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
        this.$refs.editFormRef.resetFields()
        },
        //删除用户信息
        async removeUserById2(id){
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

            const { data:res } = await this.$http.delete('roles/' + id)
            if(res.meta.status !== 200){
                return this.$message.error('删除用户失败')
            }
            this.$message.success('删除用户成功')
            this.getRolesList()
        },
        //根据ID删除对应权限
        async removeUserById(role,rightId){
            //弹窗提示用户是否要删除
            const confirmResult = await
            this.$confirm(
                '此操作将永久删除改文件,是否继续?',
                '提示',
                {
                    type:'warning'
                }
            ).catch(err => err)
            if( confirmResult !== 'confirm'){
                    return this.$message.info('取消了删除!')
            }
            const {data:res} =await  this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if(res.meta.status !==200){
                return this.$message.error('删除权限失败!')
            }
            role.children = res.data
        },
        //展示分配权限的对话框
        async showSetRightDialog(role){
            this.roleId = role.id
            //获取所有的权限处理
            const {data:res} = await this.$http.get('rights/tree')
            if(res.meta.status !== 200){
                return this.$message.error('获取权限数据失败!')
            }
            //把获取到的权限数据保存到data中
            this.rightslist = res.data
            console.log(this.rightslist);

            //递归获取三级节点
            this.getLeafKeys(role,this.defKeys)
            this.setRightDialogVisible = true
        },
        //通过递归的形式,获取角色下所有三级权限的id,并保存到 defKeys 数组中
        getLeafKeys(node,arr){
            if(!node.children){
                return arr.push(node.id)
            }
            node.children.forEach(item =>
            this.getLeafKeys(item,arr))
        },
        //监听分配权限对话框的关闭事件
        setRightDialogClosed(){
            this.defKeys = []
        },
        //点击为角色分配权限
        async allotRights(){
           const Keys=[
            ...this.$refs.treeRef.
            getCheckedKeys(),
            ...this.$refs.treeRef.
            getHalfCheckedKeys()
           ] 
           
           const idStr = Keys.join(',')
           const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idStr})
           if(res.meta.status !==200){
               return this.$message.error('分配权限失败')
           }else{
               this.$message.success('分配权限成功')
               this.getRolesList()
               this.setRightDialogVisible = false
           }
        }
    }
}
</script>

<style lang="less" scoped>
.el-tag{
    margin: 7px;
}
.bdtop{
    border-top: 1px solid #eee;
}
.bdbottom{
    border-bottom: 1px solid #eee ;
}
.venter{
    display: flex;
    align-items: center;
}
</style>