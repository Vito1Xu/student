// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [] //Sync表示同步请求 不带则表示异步存储 存完会有个success 异步函数 说明存储数据的过程是异步的
    // 异步不需要等待 存完后有个回调的success函数 同步存在需要坐别的事 
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  // 全局变量 传递参数   a:把数据存储到全局app.js   b:其他页面获取getApp()
  globalData: {  //写入  globalData方法
    //teacherInfo
    userInfo:"1" ,//定义了一个 userinfo
    bankeInfo:"1",
    zuoyeInfo:"1" ,
    stuInfo:"1" ,
  }
})
