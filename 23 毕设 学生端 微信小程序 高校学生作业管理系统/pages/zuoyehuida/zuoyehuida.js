const app = getApp()// 拿到全局变量的方法
var date = require('../../utils/util.js');//导入utils模块
//formatTime函数运行时需要传参数
var times=date.formatTime(new Date()) //函数运行完有返回结果 需要一个times变量来接收
Page({
  /**
   * 页面的初始数据
   */
  data: {
    image: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ddvNqUpzA38POQDh1o3GqAHaCi?w=350&h=120&c=7&r=0&o=5&dpr=2.5&pid=1.7",
    bj: '',
    date1: times,

  },
  changeDate1(e) {
    var that = this;
    that.setData({
      date1: e.detail.value
    });
  },

// -----------------------------获取作业提交列表-----------------------------------------
zuoyetijiao: function(e){
  let that = this
  var id = this.data.fabuid
  console.log(e.detail.value.daan)
  this.setData({
    daan:e.detail.value.daan,
  })
    var tijiaodate = this.data.date1
    var daan = this.data.daan
    var fabuid = this.data.fabuid
    var studentid = app.globalData.userInfo.id
    console.log( daan ); //输出文本 
    console.log( fabuid );
    console.log( studentid );
    wx.request({
      url: 'http://localhost:8080/addzuoyetijiao',
      method:'POST',
      data:{
        daan:daan,
        fabuid:fabuid,
        studentid:studentid,
        tijiaodate:tijiaodate,
      },
      success(res){   //成功的话 进行如下操作
        if(res.statusCode=="200"){ //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
          wx.showToast({
            title: '作业提交成功',
            icon:"none"
          })
          that.setData({
            text:""
          })
            wx.navigateTo({
              url: '../checkgrade/checkgrade?id=' + id,
            })
        }else{
          wx.showToast({
            title: '作业提交失败',
            icon:"none"
          })
        }
      }
    })
    console.log( "提交成功" );
  },


 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收跳转过来的index
    console.log(options);
    var id = options.id
    //前一个页面的作业发布list的id === 作业提交的fabuid
    console.log(id);
    this.setData({
      fabuid:id,
    })
    // 打印此班课信息
    console.log(this.data.fabuid)
  },

})