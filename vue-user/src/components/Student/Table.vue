<template>
<!-- 添加 搜索 对话框弹窗 -->
  <div>
      <!-- table-hover鼠标悬浮出现表格颜色加深 -->
     <table class="table caption-top  table-hover">

      <!-- top栏  搜索按钮 与 添加按钮（添加弹窗默认隐藏）-->
  <caption>
      <span class="h5 text-dark">学生列表</span>
      <!-- 搜索按钮 -->
       <span class="col-4 offset-3">
           <el-input class="w-25" placeholder="请输入学生姓名" v-model="searchName"></el-input>
           <el-button type="primary" icon="el-icon-search" circle class="m-1" @click="searchStudent" v-show="!isSearched"></el-button>
           <el-button type="info" icon="el-icon-refresh-right" circle class="m-1" @click="backBeforeSearch" v-show="isSearched"></el-button>
       </span>
     <!-- 添加按钮  -->
      <span class="col-1">
          <el-button type="warning" icon="el-icon-plus" circle @click="centerDialogVisible = true"></el-button>
          <!-- <el-button type="text" >点击打开 Dialog</el-button> -->

            <el-dialog
            title="添加学生"
            :visible.sync="centerDialogVisible"
            width="35%"
            center><!-- 弹窗显示格式与内容 -->     
                  
            <div class="text-center">
                学生学号:
               <el-input v-model="newStudent.number" class="w-50" placeholder="请输入学号"></el-input>
            </div>
            <div class="mt-1 text-center">
                学生姓名:
               <el-input v-model="newStudent.sname" class="w-50" placeholder="请输入姓名"></el-input>
            </div>
            <div class="mt-1 text-center">
                学生密码:
               <el-input v-model.number="newStudent.password" class="w-50" placeholder="请输入密码" type="text"></el-input>
            </div>
            <div class="mt-1 text-center">
                学生班级:
               <el-input v-model="newStudent.place" class="w-50" placeholder="请输入学生班级"></el-input>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStudent">添加</el-button>
            </span>
            </el-dialog>
        <!-- <el-button type="warning" icon="el-icon-plus" circle @click="addStudent"></el-button> -->
      </span>
      
  </caption>
  <!-- 修改 删除  -->
  <thead>
    <tr>
      <th scope="col">学生ID</th>
      <th scope="col">学号</th>
      <th scope="col">姓名</th>
      <th scope="col">密码</th>
      <th scope="col">班级</th>

      <th scope="col">操作</th>
    </tr>
  </thead>
  <!-- Item组件传参到此Table组件 并进行信息遍历 -->
  <!-- 此次的students等于视频里的 students_for_page -->
  <tbody>
      <Item  v-for="student in students" :key="student.id" :student="student" v-on:reloadTable="updateTable"/>
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
            students:[],
            page:1,         //调用slice对列表进行切片 ：return this.students.slice(“起始位置：”this.page*5-5,"取到5页："this.page*5)
            count: 0,
            number_per_page:5, //通过对学生列表的切片 来造成分页
            newStudent:{
                number:"", sname:"", password:"", place:"",
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
              url: "http://localhost:8080/students",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
            }).then(res => {
            this.students=res.data
           })
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          axios({
              url: "http://localhost:8080/students",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
          }).then(res => {
            this.students=res.data
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
                axios.get('http://localhost:8080/students/'+this.page).then(
                    response => {
                        this.students=response.data;
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
                axios.get('http://localhost:8080/students/'+this.page).then(
                response => {
                    this.students=response.data;
                },
                error =>{
                    console.log(error.massage);
                }
            )
            }
        },
        // 添加学生
      async  addStudent(){
            if (this.newStudent.number==""||this.newStudent.sname==""||this.newStudent.password===""||this.newStudent.place==="") {
                this.$alert('所有内容均不可为空哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            }
            else if(this.newStudent.password.length<6 || this.newStudent.length>20){
                this.$alert('密码必须6~20位之间哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            } 
            else{
               await axios({
                    url:"http://localhost:8080/addstu/",
                    method:"POST",
                    data:this.newStudent
                });
                this.$message({
                type: 'success',
                message: '添加成功!'
            });
                this.centerDialogVisible=false;
             await  axios.get('http://localhost:8080/get_students_count/').then(
             response => {
                    this.count=parseInt(response.data);
                },
                error =>{
                    console.log(error.massage);
                })
               await this.updateTable();
            }
        },
        searchStudent(){
            
            // alert('http://localhost:8080/search?name='+this.searchName+"&")
            if (this.searchName==="") {
                this.$alert("查询内容不能为空！","温馨提示",{
                    confirmButtonText: '知道啦'
                })
            }
            else{
                axios({
                    url:"http://localhost:8080/searchstu",
                    method:"POST",
                    data:{
                        sname:this.searchName,
                    }
                }).then( //期望拿到一个列表
                    response => {
                        console.log(response.data);
                        // this.students=response.data.students;
                        this.students=response.data;
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
            // axios.get('http://localhost:8080/students/'+this.page).then(
            //     response => {
            //         console.log(response.data);
            //         // this.students=response.data.students;
            //         this.students=response.data;
            //     },
            //     error =>{
            //         console.log(error.massage);
            //     }
            // );
            this.updateTable()
            this.isSearched=false;
        },
      async  updateTable() {
            // alert("表格更新")
          axios({
              url: "http://localhost:8080/students",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.students=res.data;
           })
        axios.get('http://localhost:8080/get_students_count/').then(
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
              url: "http://localhost:8080/students",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.students=res.data;
           })
        axios.get('http://localhost:8080/get_students_count/').then(
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