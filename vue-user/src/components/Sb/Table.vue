<template>
<!-- 添加 搜索 对话框弹窗 -->
  <div>
      <!-- table-hover鼠标悬浮出现表格颜色加深 -->
     <table class="table caption-top  table-hover">

      <!-- top栏  搜索按钮 与 添加按钮（添加弹窗默认隐藏）-->
  <caption>
      <span class="h5 text-dark">班课学生列表</span>
      <!-- 搜索按钮 -->
       <span class="col-4 offset-3">
           <el-input class="w-25" placeholder="请输入班课名" v-model="searchName"></el-input>
           <el-button type="primary" icon="el-icon-search" circle class="m-1" @click="searchSb" v-show="!isSearched"></el-button>
           <el-button type="info" icon="el-icon-refresh-right" circle class="m-1" @click="backBeforeSearch" v-show="isSearched"></el-button>
       </span>
     <!-- 添加按钮  -->
      <span class="col-1">
          <el-button type="warning" icon="el-icon-plus" circle @click="centerDialogVisible = true"></el-button>
          <!-- <el-button type="text" >点击打开 Dialog</el-button> -->

            <el-dialog
            title="添加班课学生"
            :visible.sync="centerDialogVisible"
            width="35%"
            center><!-- 弹窗显示格式与内容 -->     
                  

            <div class="text-center">
                班课ID:
               <el-input v-model.number="newSb.bankeid" class="w-50" placeholder="请输入想加入的班课ID"></el-input>
            </div>
            <div class="mt-1 text-center">
                学生ID:
               <el-input v-model.number="newSb.studentid" class="w-50" placeholder="请输入想加入的学生ID"></el-input>
            </div>

            
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSb">添加</el-button>
            </span>
            </el-dialog>
        <!-- <el-button type="warning" icon="el-icon-plus" circle @click="addSb"></el-button> -->
      </span>
      
  </caption>
  <!-- 修改 删除  -->
  <thead>
    <tr>
      <th scope="col">SB学生班课ID</th>
      <th scope="col">班课名</th>
      <th scope="col">任课教师姓名</th>
      <th scope="col">上课学生姓名</th>
      <th scope="col">学生所属班级</th>


      <th scope="col">操作</th>
    </tr>
  </thead>
  <!-- Item组件传参到此Table组件 并进行信息遍历 -->
  <!-- 此次的sbs等于视频里的 sbs_for_page -->
  <tbody>
      <Item  v-for="sb in sbs" :key="sb.id" :sb="sb" v-on:reloadTable="updateTable"/>
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
            sbs:[],
            page:1,         //调用slice对列表进行切片 ：return this.sbs.slice(“起始位置：”this.page*5-5,"取到5页："this.page*5)
            count: 0,
            number_per_page:5, //通过对学生列表的切片 来造成分页
            newSb:{
                  bankeid:"",studentid:"",
            },
            searchName: "",
            isEdited:false,
            isSearched:false,
        }
    },
    methods: {
        handleSizeChange(val) { 
            console.log(`每页 ${val} 条`);
            this.number_per_page = val;
            axios({
              url: "http://localhost:8080/sbs",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
            }).then(res => {
            this.sbs=res.data
           })
      },
      handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.page = val
          axios({
              url: "http://localhost:8080/sbs",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
          }).then(res => {
            this.sbs=res.data
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
                axios.get('http://localhost:8080/sbs/'+this.page).then(
                    response => {
                        this.sbs=response.data;
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
                axios.get('http://localhost:8080/sbs/'+this.page).then(
                response => {
                    this.sbs=response.data;
                },
                error =>{
                    console.log(error.massage);
                }
            )
            }
        },
        // 添加学生
      async  addSb(){
        //   ||this.newSb.chi===""   教师姓名
            if (this.newSb.bankeid==""||this.newSb.studentid=="") {
                this.$alert('所有内容均不可为空哦！', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
            }
            
            else{
               await axios({
                    url:"http://localhost:8080/addsb/",
                    method:"POST",
                    data:this.newSb
                });
                this.$message({
                type: 'success',
                message: '添加成功!'
            });
                this.centerDialogVisible=false;
             await  axios.get('http://localhost:8080/get_sbs_count/').then(
             response => {
                    this.count=parseInt(response.data);
                },
                error =>{
                    console.log(error.massage);
                })
               await this.updateTable();
            }
        },
        searchSb(){
            
            // alert('http://localhost:8080/search?name='+this.searchName+"&")
            if (this.searchName==="") {
                this.$alert("查询内容不能为空！","温馨提示",{
                    confirmButtonText: '知道啦'
                })
            }
            else{
                axios({
                    url:"http://localhost:8080/searchsb",
                    method:"POST",
                    data:{
                        bname:this.searchName,
                    }
                }).then( //期望拿到一个列表
                    response => {
                        console.log(response.data);
                        // this.sbs=response.data.sbs;
                        this.sbs=response.data;
                        // alert(this.count);
                    },
                    error =>{
                        console.log(error.massage);
                    }
                )
                this.isEdited=true;
                this.isSearched=true;
            }
        },
       backBeforeSearch(){
            this.searchName=""
            this.updateTable()
            this.isSearched=false;
            this.isEdited=false;
        },
 /*************很重要*******************很重要***************很重要********************很重要********************很重要******************很重要************很重要****************************** */
      async  updateTable() {
            // alert("表格更新")
          axios({
              url: "http://localhost:8080/sbs",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.sbs=res.data;
           })
        axios.get('http://localhost:8080/get_sbs_count/').then(
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
              url: "http://localhost:8080/sbs",
              method: "POST", 
              data: {
                  page: this.page,
                  number_per_page: this.number_per_page
              }
        }).then(res => {
            this.sbs=res.data;
           })
        axios.get('http://localhost:8080/get_sbs_count/').then(
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


