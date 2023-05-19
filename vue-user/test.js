//引入axios 其本身就是个函数
const axios=require('axios')

//它的参数是接收一个对象作为参数
axios({
    url:'http://local',
    method:'get'
})//因为基于promise 所以有them方法
.them(res =>{
    console.log(res.data);
})//方法中接收两个回调函数一个成功一个失败


axios({
    url:'http://local',
    method:'post',
    //post请求需要传一个请求体data,data是一个对象
    data:{
        number:'1',
        name:'小黑'
    }
})//post方法没有返回的函数