<template>
<!-- 添加 搜索 对话框弹窗 -->
  <div>
      <!-- table-hover鼠标悬浮出现表格颜色加深 -->
     <table class="table caption-top  table-hover">

      <!-- top栏  搜索按钮 与 添加按钮（添加弹窗默认隐藏）-->
  <caption>
      <span class="h5 text-dark">学生作业提交列表</span>
      <!-- 搜索按钮 -->
       <span class="col-4 offset-3">
           <el-input class="w-25" placeholder="请输入学生ID" v-model="searchStudentid"></el-input>
           <el-button type="primary" icon="el-icon-search" circle class="m-1" @click="searchZuoyetijiao" v-show="!isSearched"></el-button>
           <el-button type="info" icon="el-icon-refresh-right" circle class="m-1" @click="backBeforeSearch" v-show="isSearched"></el-button>
       </span>
     <!-- 添加按钮  -->
      <span class="col-1">
          <el-button type="warning" icon="el-icon-plus" circle @click="centerDialogVisible = true"></el-button>
          <!-- <el-button type="text" >点击打开 Dialog</el-button> -->

            <el-dialog
            title="提交作业"
            :visible.sync="centerDialogVisible"
            width="35%"
            center><!-- 弹窗显示格式与内容 -->     
                  
            <div class="text-center">
                答案:
               <el-input v-model="newZuoyetijiao.daan" class="w-50" placeholder="请输入答案"></el-input>
            </div>
            <div class="mt-1 text-center">
                成绩:
               <el-input v-model="newZuoyetijiao.grade" class="w-50" placeholder="请输入成绩"></el-input>
            </div>
            <div class="mt-1 text-center">
                作业发布ID:
               <el-input v-model="newZuoyetijiao.fabuid" class="w-50" placeholder="请输入作业内容" type="text"></el-input>
            </div>
            <div class="mt-1 text-center">
                提交学生ID:
               <el-input v-model="newZuoyetijiao.studentid" class="w-50" placeholder="请输入学生姓名" type="text"></el-input>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addZuoyetijiao">添加</el-button>
            </span>
            </el-dialog>
      </span>
      
  </caption>
  <!-- 修改 删除  -->
  <thead>
    <tr>
      <th scope="col">发布作业ID</th>
      <th scope="col">提交作业ID</th>
      <th scope="col">学生提交的答案</th>
      <th scope="col">成绩</th>
      <th scope="col">作业内容</th>
      <th scope="col">提交学生</th>
      <th scope="col">操作</th>

    </tr>
  </thead>
  <!-- Item组件传参到此Table组件 并进行信息遍历 -->
  <!-- 此次的zuoyetijiaos等于视频里的 zuoyetijiaos_for_page -->
  <tbody>
      <Item  v-for="zuoyetijiao in zuoyetijiaos" :key="zuoyetijiao.id" :zuoyetijiao="zuoyetijiao" v-on:reloadTable="updateTable"/>
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
            zuoyetijiaos:[],
            page:1,         //调用slice对列表进行切片 ：return this.zuoyetijiaos.slice(“起始位置：”this.page*5-5,"取到5页："this.page*5)
            count: 0,
            number_per_page:5, //通过对学生列表的切片 来造成分页
            newZuoyetijiao:{
                daan:"", grade:"", fabuid:"",studentid:"",
            },
            searchStudentid: "",
            
            isSearched:false,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.number_per_page = val;
            axios({
              url: "http://localhost:8080/zuoyetijiaos",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
            }).then(res => {
            this.zuoyetijiaos=res.data
           })
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          axios({
              url: "http://localhost:8080/zuoyetijiaos",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
          }).then(res => {
            this.zuoyetijiaos=res.data
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
                axios.get('http://localhost:8080/zuoyetijiaos/'+this.page).then(
                    response => {
                        this.zuoyetijiaos=response.data;
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
                axios.get('http://localhost:8080/zuoyetijiaos/'+this.page).then(
                response => {
                    this.zuoyetijiaos=response.data;
                },
                error =>{
                    console.log(error.massage);
                }
            )
            }
        },
        // 添加
      async  addZuoyetijiao(){
            if (this.newZuoyetijiao.grade<0||this.newZuoyetijiao.grade>100) {
                this.$alert('所输入成绩不符合标准,必须0~100之间哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            }else{
               await axios({
                    url:"http://localhost:8080/addzuoyetijiao/",
                    method:"POST",
                    data:this.newZuoyetijiao
                });
            //     .then(res=>{
            //         console.log(res)
            //   if (res.AxiosError.response.status==500) {
            //     this.$alert("添加失败!查无此人或作业",{
            //        confirmButtonText: '知道啦'
            //     });
            //   }
            //   else{
                        this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });

                // }
            // })
     
            
                this.centerDialogVisible=false;
                // 再次请求后端数据 刷新页面
             await  axios.get('http://localhost:8080/get_zuoyetijiaos_count/').then(
             response => {
                    this.count=parseInt(response.data);
                },
                error =>{
                    console.log(error.massage);
                })
                // 赋值给当前数据页面 完成页面刷新
               await this.updateTable();
            }
        },

        searchZuoyetijiao(){

            if (this.searchStudentid==="") {
                this.$alert("查询内容不能为空！","温馨提示",{
                    confirmButtonText: '知道啦'
                })
            }
            else{
                axios({
                    url:"http://localhost:8080/searchzuoyetijiao",
                    method:"POST",
                    data:{
                        studentid:this.searchStudentid,
                    }
                }).then( //期望拿到一个列表
                    response => {
                        console.log(response.data);
                        // this.zuoyetijiaos=response.data.zuoyetijiaos;
                        this.zuoyetijiaos=response.data;
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
            this.searchStudentid=""
            this.updateTable()
            this.isSearched=false;
        },
        // 页面刷新使用到的方法
      async  updateTable() {
            // alert("表格更新")
          axios({
              url: "http://localhost:8080/zuoyetijiaos",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.zuoyetijiaos=res.data;
           })
        axios.get('http://localhost:8080/get_zuoyetijiaos_count/').then(
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
              url: "http://localhost:8080/zuoyetijiaos",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.zuoyetijiaos=res.data;
           })
        axios.get('http://localhost:8080/get_zuoyetijiaos_count/').then(
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


