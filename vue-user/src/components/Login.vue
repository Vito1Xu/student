<template>
  <div class="">
    <div v-show="!isLogin">
      <div style="margin: 80px;"></div>

    <el-col span="10" offset="7" class="border-secondary border border-5 bg-light" >
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" class="mt-5">

  <el-form-item label="用户名:">
    <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" class="w-75"></el-input>
  </el-form-item>

  <el-form-item label="密码:">
    <!-- type="password" 输入密码时 密码变成 小圆点 -->
    <el-input type="password" v-model="formLabelAlign.password" placeholder="请输入密码" class="w-75"></el-input>
  </el-form-item>

  <el-button type="warning" icon="" @click="login">登录</el-button>
  <el-button type="primary" @click="register">注册</el-button>
  <div class="m-5"></div>

</el-form>
    </el-col>
    </div>

    <div v-show="isLogin">
      <el-col class="text-center" >
        <h3>
          亲爱的<span class="text-warning h2">{{ formLabelAlign.username }}</span>!欢迎来到高校学生作业管理系统!
        </h3>
        
        <!-- <video src="../../public/guidance.mp4" width="700px" controls autoplay loop muted></video> -->
      </el-col>
  </div>
  </div>
</template>

<script>
import md5 from "js-md5"
import axios from 'axios'
 export default {
   name:"Login",
   data() {
      return {
        labelPosition: 'right',
        //用户信息
        formLabelAlign: { 
          username:"", 
          password:"",
        },

        isLogin:false
      };
    },
    methods:{
     async login(){
        await axios({  
              url: "http://localhost:8080/login",
              method: "POST",
              data:{
                username:this.formLabelAlign.username,
                password:md5(this.formLabelAlign.password)
              }
            }).then(res=>{
              if (res.data=="error") {
                this.$alert("用户名或密码错误!","温馨提示",{
                   confirmButtonText: '知道啦'
                });
              }
              else{
                //登录成功将用户信息存入浏览器
                // sessionStorage 存入会话存储空间 同localStorage

                // 给其他所有接口写上判断其是否登录
                // sessionStorage.setItem("token",res.data.token)如果是res.data.token的话 说明它登录过


                // 全部注销同理 用clear（）方法 将session里存的 所有 键都删掉
                // 即可指定删除一条：removeItem（“”）传入 键名 即可指定删除一条
                sessionStorage.setItem("username",res.data.username)
                sessionStorage.setItem("token",res.data.token);
                this.$alert("登录成功！  尊敬的"+sessionStorage.getItem("username")+"欢迎您！","温馨提示",{
                   confirmButtonText: '知道啦'
                });
                this.isLogin=true;
              }
            })
      },
      register(){
        this.$router.push({
          name:"register",
        })
      },
    },
    mounted() {
      this.$bus.$on("logout",()=>{
        this.isLogin=false
      })
    },
  }
</script>

<style>

</style>