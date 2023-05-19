var date = require('../../utils/util.js');
const  app=getApp()
var times=date.formatTime(new Date()) //函数运行完有返回结果 需要一个times变量来接收

var bankemyList = null;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    date1:times,
  },
 
  changeDate1(e) {
    var that = this;
    that.setData({
      date1: e.detail.value
    });
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    
  },


  bankecreate: function(e) {
    console.log(e.detail.value.bankeming)
    console.log(e.detail.value.img)
    this.setData({
      bname:e.detail.value.bankeming,
      img:e.detail.value.img,
    })
    console.log(this.data.bname)
    var bname = this.data.bname;
    var img = this.data.img;
    var teacherid = app.globalData.userInfo.id

    console.log(teacherid ); //输出该文本 
    console.log(bname ); //输出该文本 

    wx.request({
      url: 'http://localhost:8080/addbanke',
      method:'POST',
      data:{
        bname:bname,
        img:img,
        teacherid:teacherid,
      },
      success(res){   //成功的话 进行如下操作
        if(res.statusCode=="200"){ //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
          wx.showToast({
            title: '创建班课成功',
            icon:"none"
          })
  
  
          setTimeout(()=>{   // 延迟500ms 的定时器 与 跳转页面
            wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
              url: '../bankemy/bankemy',
            })
          },1)
        }else{
          wx.showToast({
            title: '创建班课失败',
            icon:"none"
          })
        }
      }
    })

  },

  btn(){
    wx.showToast({
     title: '发布成功!',
     icon:"none"
   })
   setTimeout(()=>{   // 延迟800ms 的定时器 与 跳转页面
     wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
       url: '../bankemy/bankemy'
     })
   },1)
 },
 
})