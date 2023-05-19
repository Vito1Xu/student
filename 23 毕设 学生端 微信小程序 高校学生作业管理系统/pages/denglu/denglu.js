const app=getApp()  //定义一个常量app  将getapp方法赋值给app 使app获取到成员变量
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  zhuce(){
    wx.navigateTo({
      url: '../zhuce/zhuce',
    })
  },
  getName(e){
    this.setData({
      username:e.detail.value
    })
  },
  getPwd(e){
    this.setData({
      userpwd:e.detail.value
    })
    console.log(this.data.userpwd)
  },
// formSubmit(e){
  //111 bug let that = this
  //  chat_user 是 数据表的表名
  // wx.cloud.database().collection('chat_user').Where({//去数据库里找   账号 密码

  //   //
  //   //111 bug zhanghao:that.data.zhanghao,
  //   //111 bug mima1:that.data.mima1
  //   zhanghao:e.detail.value.zhanghao,
  //   mima1:e.detail.value.mima1
// })
  // .get({  // 存入 成功时的返回记录
  //   success(res){   //成功的话 进行如下操作
  //     console.log(res)
  //     if(res.data.length>0){ //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
  //       wx.showToast({
  //         title: '登录成功',
  //         icon:"none"
  //       })

  //       // app.globalDatawx.userInfo=res.data[0]//将获取到的 data值 赋值给 全局变量userinfo   data下标 为0的数据


  //       setTimeout(()=>{   // 延迟800ms 的定时器 与 跳转页面
  //         wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
  //           url: '../my/my',
  //         })
  //       },800)
  //     }else{
  //       wx.showToast({
  //         title: '您还未注册 请返回注册后登录',
  //       })
  //     }
  //   }
  // })


// },
login(){
  var that = this;
  console.log(this.data.username+" "+this.data.userpwd);
  wx.request({
    url: 'http://localhost:8080/loginstudent',
    method:'POST',//与后端定义的 @PostMapping("/login") post有关
    data:{
      sname:this.data.username,
      password:this.data.userpwd
    },
    success(res){   //成功的话 进行如下操作
      console.log(res)//拿到 用户姓名密码 对象
      // console.log(res)
      console.log(res.data.length)
      if(res.data=="no student"){
        wx.showToast({
          title: 'no student',
          icon:"none"
        })
      }else if(res.data=="pwd error"){
        wx.showToast({
          title: 'pwd error',
          icon:"none"
        })
      }
      else if(res.data=="known error1"){
        wx.showToast({
          title: 'known error1',
          icon:"none"
        })
      }
      else if(res.data=="known error2"){
        wx.showToast({
          title: 'known error2',
          icon:"none"
        })
      }
      else { //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
        wx.showToast({
          title: '登录成功',
          icon:"none"
        })

        console.log(app.globalData.userInfo)// 赋值前
        app.globalData.userInfo = res.data[0]//将获取到的 data值 赋值给 全局变量userinfo   data下标 为0的数据
        console.log(app.globalData.userInfo)// 赋值后


        setTimeout(()=>{   // 延迟500ms 的定时器 与 跳转页面
          wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
            url: '../my/my',
          })
        },1)
      }
    }
  })
  // .get({  // 存入 成功时的返回记录
    
  // })
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