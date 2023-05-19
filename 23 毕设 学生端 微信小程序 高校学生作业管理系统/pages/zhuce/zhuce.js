const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Img:"/images/my-active.png",
    nickName:"昵称"
  },
getUserProfile(){
 //var that =this 这个声明 , c此时that指代Page({})整个对象，这样可以使用that访问或者重新设置Page({})里data的变量
  var that= this       // this关键字指代Page({})整个对象
  
  wx.getUserProfile({
    desc: '展示用户信息',
    success:(res=>{
      console.log(res)
      that.setData({
        Img:res.userInfo.avatarUrl,
        nickName:res.userInfo.nickName
      })
    })
  })
},

//wxml 里的 <form bindsubmit="formSubmit"> 中的五个（三个input 两个button）  
// form表单的逻辑事件

formSubmit(e){
  let xinxi  //定义一个自变量xinxi
  let that=this
  console.log(e.detail.value)                       // console.log(e)  【其中 e 是 对象 detail 实现了value】=> console.log(e.detail.value)
  xinxi=e.detail.value   

   
 if(xinxi.username!=''&&xinxi.userpwd!=''&&xinxi.userpwd2!=''&&xinxi.userpwd==xinxi.userpwd2){
  console.log(xinxi.username+" "+xinxi.userpwd+" "+xinxi.userpwd2);
    wx.request({
      url: 'http://localhost:8080/addstu',
      method:'POST',//与后端定义的 @PostMapping("/register") post有关
      data:{
        sname:xinxi.username,
        password:xinxi.userpwd,
        img:that.data.Img,     //微信头像
      },
      success(res){                     //get是获取表中的_id
      // wx.cloud.database().collection('chat_USERS').doc(res._id).get({    //doc是筛选条件  res是chat_users数据表中所有的数据   
        // success(res){
          console.log(res),
          // 将res里的data值 赋给全局变量 app.globalData.userInfo
          app.globalData.userInfo = res.data[0]
          wx.showToast({
            title: '注册成功! 快去登录吧！',
            icon:"none"
          })
        } 
      // })//注册后自动登录end
    // }
  })

  setTimeout(()=>{

    wx.reLaunch({
      url: '../denglu/denglu?'
    })
  },1)
 }else{
   wx.showToast({
     title: 'error! 请重新输入！',
     icon:"none"
   })
 }



},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})