<template>
<!-- 添加 搜索 对话框弹窗 -->
  <div>
      <!-- table-hover鼠标悬浮出现表格颜色加深 -->
     <table class="table caption-top  table-hover">

      <!-- top栏  搜索按钮 与 添加按钮（添加弹窗默认隐藏）-->
  <caption>
      <span class="h5 text-dark">教师列表</span>
      <!-- 搜索按钮 -->
       <span class="col-4 offset-3">
           <el-input class="w-25" placeholder="请输入教师姓名" v-model="searchName"></el-input>
           <el-button type="primary" icon="el-icon-search" circle class="m-1" @click="searchTeacher" v-show="!isSearched"></el-button>
           <el-button type="info" icon="el-icon-refresh-right" circle class="m-1" @click="backBeforeSearch" v-show="isSearched"></el-button>
       </span>
     <!-- 添加按钮  -->
      <span class="col-1">
          <el-button type="warning" icon="el-icon-plus" circle @click="centerDialogVisible = true"></el-button>
          <!-- <el-button type="text" >点击打开 Dialog</el-button> -->

            <el-dialog
            title="添加教师"
            :visible.sync="centerDialogVisible"
            width="35%"
            center><!-- 弹窗显示格式与内容 -->     
                  
            <div class="text-center">
                教师工号:
               <el-input v-model="newTeacher.number" class="w-50" placeholder="请输入工号"></el-input>
            </div>
            <div class="mt-1 text-center">
                教师姓名:
               <el-input v-model="newTeacher.tname" class="w-50" placeholder="请输入姓名"></el-input>
            </div>
            <div class="mt-1 text-center">
                教师密码:
               <el-input v-model.number="newTeacher.password" class="w-50" placeholder="请输入密码" type="text"></el-input>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTeacher">添加</el-button>
            </span>
            </el-dialog>
        <!-- <el-button type="warning" icon="el-icon-plus" circle @click="addTeacher"></el-button> -->
      </span>
      
  </caption>
  <!-- 修改 删除  -->
  <thead>
    <tr>
      <th scope="col">工号</th>
      <th scope="col">姓名</th>
      <th scope="col">密码</th>
      <th scope="col">操作</th>

    </tr>
  </thead>
  <!-- Item组件传参到此Table组件 并进行信息遍历 -->
  <!-- 此次的teachers等于视频里的 teachers_for_page -->
  <tbody>
      <Item  v-for="teacher in teachers" :key="teacher.id" :teacher="teacher" v-on:reloadTable="updateTable"/>
  </tbody>
</table>
    <el-pagination
      v-show="!isSearched"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[4,5,6]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
        <!-- <el-button-group v-show="!isSearched">
            <el-button type="primary" icon="el-icon-arrow-left" @click="lastPage">上一页</el-button>
            <el-input placeholder="页数"></el-input>
            <el-button type="primary" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group> -->
    <VNode/>
  </div>
</template>

<script>
import axios from 'axios'
import Item from "./Item"
// import VNode from "./VNode"
export default {
    name:'table',
    data() {
        return {
            centerDialogVisible: false,   //添加学生弹窗隐藏
            teachers:[],
            page:1,         //调用slice对列表进行切片 ：return this.teachers.slice(“起始位置：”this.page*5-5,"取到5页："this.page*5)
            count: 0,
            number_per_page:5, //通过对学生列表的切片 来造成分页
            newTeacher:{
                number:"", tname:"", password:"",
            },
            searchName: "",
            
            isSearched:false,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.number_per_page = val;
            axios({
              url: "http://localhost:8080/teachers",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
            }).then(res => {
            this.teachers=res.data
           })
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          axios({
              url: "http://localhost:8080/teachers",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
          }).then(res => {
            this.teachers=res.data
           })

      },
      //下一页
        nextPage() {
            if(this.page*5>=this.count){
                 this.$alert('没有下一页啦', '温馨提示', {
                confirmButtonText: '知道啦',
                });
            }
            else{
                this.page+=1;
                axios.get('http://localhost:8080/teachers/'+this.page).then(
                    response => {
                        this.teachers=response.data;
                    },
                    error =>{
                        console.log(error.massage);
                    }
                )
            }
            
        },
        //上一页方法
        lastPage(){
            if(this.page===1){
                this.$alert('这已经是第一页啦', '温馨提示', {
                confirmButtonText: '知道啦',
                });
            }
            else{
                this.page-=1;
                axios.get('http://localhost:8080/teachers/'+this.page).then(
                response => {
                    this.teachers=response.data;
                },
                error =>{
                    console.log(error.massage);
                }
            )
            }
        },
        // 添加学生
      async  addTeacher(){
            if (this.newTeacher.number==""||this.newTeacher.name==""||this.newTeacher.password==="") {
                this.$alert('所有内容均不可为空哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            }
            else if (this.newTeacher.password.length<=11 || this.newTeacher.age>150) {
                 this.$alert('密码长度太大或太小本班级不收哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            }
           
            else{
               await axios({
                    url:"http://localhost:8080/addteacher/",
                    method:"POST",
                    data:this.newTeacher
                });
                this.$message({
                type: 'success',
                message: '添加成功!'
            });
                this.centerDialogVisible=false;
             await  axios.get('http://localhost:8080/get_teachers_count/').then(
             response => {
                    this.count=parseInt(response.data);
                },
                error =>{
                    console.log(error.massage);
                })
               await this.updateTable();
            }
        },
        searchTeacher(){

            if (this.searchName==="") {
                this.$alert("查询内容不能为空！","温馨提示",{
                    confirmButtonText: '知道啦'
                })
            }
            else{
                axios({
                    url:"http://localhost:8080/searchteacher",
                    method:"POST",
                    data:{
                        tname:this.searchName,
                    }
                }).then( //期望拿到一个列表
                    response => {
                        console.log(response.data);
                        // this.teachers=response.data.teachers;
                        this.teachers=response.data;
                        // alert(this.count);
                    },
                    error =>{
                        console.log(error.massage);
                    }
                )
                
                this.isSearched=true;
            }
        },
       backBeforeSearch(){
            this.searchName=""
            this.updateTable()
            this.isSearched=false;
        },
      async  updateTable() {
            // alert("表格更新")
          axios({
              url: "http://localhost:8080/teachers",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.teachers=res.data;
           })
        axios.get('http://localhost:8080/get_teachers_count/').then(
             response => {
                    this.count=parseInt(response.data);
                },
                error =>{
                    console.log(error.massage);
                }
        )
        },

    },
    components:{
        Item
    },
    mounted() {
        axios({
              url: "http://localhost:8080/teachers",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.teachers=res.data;
           })
        axios.get('http://localhost:8080/get_teachers_count/').then(
             response => {
                    this.count=parseInt(response.data);
                },
                error =>{
                    console.log(error.massage);
                }
        )
    },
   async beforeRouteEnter (to, from, next) {
       if(sessionStorage.getItem('token')==null){
            alert("您还没有登录，请先登录！")
       }else{
            await axios({
                url: "http://localhost:8080/checkToken",
                method: "POST",
                data: {
                    username: sessionStorage.getItem('username'),
                    token: sessionStorage.getItem('token')
                }
            }).then(res => {
                if (res.data=="1") {
                    next()
                }
                else{
                    alert("登录信息已过期！请重新登录")
                    location.reload();
                }
            })
       }
       
        // next()
    }
    

}
</script>

<style scoped>

</style>

