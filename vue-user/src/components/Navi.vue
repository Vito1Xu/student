<template>
  <div>
      <el-col >
    <el-menu
      :default-active="activatedItem"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="user" @click="toUser" id="login">
        <i class="el-icon-user-solid" ></i>
        <span slot="title">登录/注册</span>
      </el-menu-item>



      <el-menu-item index="students" @click="toStudentsList">
        <i class="el-icon-alarm-clock" ></i>
        <img class="bi bi-person-lines-fill"/>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item index="teachers" @click="toTeachersList">
        <!-- <i src="../../public/img/教师.png" ></i> -->
        <i class="el-icon-hot-water" ></i>
        <i class="bi bi-person-lines-fill"></i>
        <span slot="title">教师管理</span>
      </el-menu-item>
      <el-menu-item index="bankes" @click="toBankesList">
        <i class="el-icon-table-lamp" ></i>
        <i class="bi bi-person-lines-fill"></i>
        <span slot="title">班课教师管理</span>
      </el-menu-item>

      <el-menu-item index="sbs" @click="toSbsList">
        <i class="el-icon-table-lamp" ></i>
        <i class="bi bi-person-lines-fill"></i>
        <span slot="title">班课学生管理</span>
      </el-menu-item>

     
     


      <el-menu-item   @click="show">
        <i v-if="isShow==true" class="el-icon-arrow-down" ></i>
        <i v-if="isShow==false" class="el-icon-arrow-up" ></i>
        <i class="bi bi-person-lines-fill"></i>
        <span slot="title">作业管理</span>
      </el-menu-item>

      <el-menu-item v-if="isShow==true" index="zuoyefabus" @click="toZuoyefabusList">
        <i class="el-icon-notebook-2" ></i>
        <i class="bi bi-person-lines-fill"></i>
        <span slot="title">教师作业发布管理</span>
      </el-menu-item>
      <el-menu-item  v-if="isShow==true" index="zuoyetijiaos" @click="toZuoyetijiaosList">
        <i class="el-icon-edit-outline" ></i>
        <i class="bi bi-person-lines-fill"></i>
        <span slot="title">学生作业提交管理</span>
      </el-menu-item>
      



      <el-menu-item index="analysis" @click="toAnalysis">
        <i class="el-icon-s-management"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <el-menu-item index="logout" @click="toLogout">
        <i class="el-icon-setting"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
      <br><br><br><br><br>
      <br><br><br><br><br>
      <br>
    </el-menu>
  </el-col>
  </div>
</template>

<script>
export default {
    name:'Navi',
    data(){
      return {
        activatedItem:this.$route.name,
        isShow:false
      }
    },
    methods:{

       show(){
            this.isShow=!this.isShow;
            console.log(this.$route.params);
        },

     toUser(){
        
        this.$router.push({
          // path:"/user"
          name:"login"
        })
      },
      // 学生页面点击获取事件
     async toStudentsList(){
        var token=await sessionStorage.getItem("token");
        if (token===null) {
          await this.$alert('您还没有登录哦,请先登录!', '温馨提示', {
                 confirmButtonText: '知道啦',
                });
          // this.$refs["login"].click()
        document.getElementById("login").click();
        }else{
          this.$router.push({
            name:"students"
            // path:"/students"
          })
        }
      },
      // 教师页面点击获取事件
      async toTeachersList(){
        var token=await sessionStorage.getItem("token");
        if (token===null) {
          await this.$alert('您还没有登录哦,请先登录!', '温馨提示', {
                 confirmButtonText: '知道啦',
                })
        document.getElementById("login").click();
        }else{
          this.$router.push({
            name:"teachers"
          })
        }
      },
      // 班课教师页面点击获取事件
      async toBankesList(){
        var token=await sessionStorage.getItem("token");
        if (token===null) {
          await this.$alert('您还没有登录哦,请先登录!', '温馨提示', {
                 confirmButtonText: '知道啦',
                })
        document.getElementById("login").click();
        }else{
          this.$router.push({
            name:"bankes"
          })
        }
      },
      // 班课学生页面点击获取事件
      async toSbsList(){
        var token=await sessionStorage.getItem("token");
        if (token===null) {
          await this.$alert('您还没有登录哦,请先登录!', '温馨提示', {
                 confirmButtonText: '知道啦',
                })
        document.getElementById("login").click();
        }else{
          this.$router.push({
            name:"sbs"
          })
        }
      },
      // 教师作业发布页面点击获取事件
      async toZuoyefabusList(){
        var token=await sessionStorage.getItem("token");
        if (token===null) {
          await this.$alert('您还没有登录哦,请先登录!', '温馨提示', {
                 confirmButtonText: '知道啦',
                })
        document.getElementById("login").click();
        }else{
          this.$router.push({
            name:"zuoyefabus"
          })
        }
      },
      // 学生作业提交页面点击获取事件
      async toZuoyetijiaosList(){
        var token=await sessionStorage.getItem("token");
        if (token===null) {
          await this.$alert('您还没有登录哦,请先登录!', '温馨提示', {
                 confirmButtonText: '知道啦',
                })
        document.getElementById("login").click();
        }else{
          this.$router.push({
            name:"zuoyetijiaos"
          })
        }
      },

      toLogout(){
        sessionStorage.clear();
        this.$router.push({
          name:"logout"
        })
        this.$bus.$emit('logout');
      },
      toAnalysis() {
        this.$router.push({
          name:"analysis"
        })
      }
    },
    mounted() {
        if(this.$route.name=="register"||this.$route.name=="login"){
          this.activatedItem="user"
        }
        else if(this.$route.name=="logout"){
          this.activatedItem="logout"
        }
        else if(this.$route.name=="analysis"){
          this.activatedItem="analysis"
        }
    },
    
}
</script>

<style scoped>
  div{
    width: 200px
  }
</style>