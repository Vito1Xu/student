const util =  require("../../utils/util")
const app = getApp()
var times=util.formatTime(new Date()) //函数运行完有返回结果 需要一个times变量来接收
console.log(times);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TS:"发送点什么吧~",
    date1: times,
  },
// 获取与当前点击对象的聊天记录
  getLiaotianlist(){
    let that = this
    var bankeid = this.data.bankeid
    wx.request({
      url: 'http://localhost:8080/qunliaoce',
      method:"post",
    data:{
      bankeid:bankeid,
    },  
    success:res=>{
      console.log(res.data[0]);
      if(res.statusCode=="200"){       
        var liaotianlist = res.data
        this.setData({
          liaotianlist:liaotianlist
        })
        console.log(this.data.liaotianlist);
      }else{
        console.log('暂无聊天内容')
      }
    }
    })
    console.log(this.data.liaotianlist)
  },
  formSubmit(e){
    // 拿到一个e  传递 name="text" 内的内容
    console.log(e.detail.value.text)  //打印输入的内容
    var text = e.detail.value.text
    // var sendid = app.globalData.userInfo.id 
    var sendtime = this.data.date1
    var bankeid = this.data.bankeid
    if(e.detail.value.text == ""){
      wx.showToast({
        title: '请输入内容后发送！',
        icon:"none"
      }) 
      //return 返回后 下面代码不在执行
      return
    }
    else{
      wx.request({
        url: 'http://localhost:8080/addchat',
        method:"post",
      data:{
        bankeid:bankeid,
        text:text,
        // sendid:sendid,
        sendtime:sendtime
      },  
      success:res=>{
        if(res.statusCode=="200"){       
         this.getLiaotianlist()
         this.setData({
           text:""
         })
         console.log('发送成功')
        }else{
          console.log('发送失败')
        }
      }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收跳转过来的index
    console.log(options);
    var index = options.index
    console.log(index);
    console.log(app.globalData.bankeInfo[index]);
    this.setData({
      index:index,
      list:app.globalData.bankeInfo[index],
      bankeid:app.globalData.bankeInfo[index].id,
      bname:app.globalData.bankeInfo[index].bname
    })
    // 打印此班课信息
    console.log(this.data.list)
    console.log(this.data.bankeid)
    this.getLiaotianlist();//拿这个方法加载页面 不然不调用 不执行
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

    //  每秒刷新页面聊天信息
     var that = this;
     setInterval(function(){
       that.setData({
       liaotianlist: that.getLiaotianlist()
     });
     },1000);
    this.setData({
      userInfo: app.globalData.userInfo
    })
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