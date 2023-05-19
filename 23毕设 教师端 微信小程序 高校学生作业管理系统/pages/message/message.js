// pages/message/message.js
const util = require("../../utils/util")

const app = getApp()// 拿到全局变量的方法

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    index:'',
  },
  liaotian(){
    var index = this.data.index
    wx.navigateTo({
      url: '../liaotian/liaotian?index=' + index,
    })
  },
  searchstu(){
    var index = this.data.index
    wx.navigateTo({
      url: '../searchstu/searchstu?index=' + index,
    })
  },
  zuoyefabu(){
    // 带着班课index下标跳转
    var index = this.data.index
    wx.navigateTo({
      url: '../zuoyefabu/zuoyefabu?index=' + index,
    })
  },
  zuoye(){
    // 带着班课index下标跳转
    var index = this.data.index
    wx.navigateTo({
      url: '../zuoye/zuoye?index=' + index,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {//上一个页面传递过来的数据都会在options里
    //查看传递数据 是否成功
    console.log(options);
    var index = options.index
 
    console.log(index);
    console.log(app.globalData.bankeInfo[index]);
    this.setData({
      //标记当前打开的班课 在全局变量中的index下标
      index:index,
      // 
      list:app.globalData.bankeInfo[index],
      bname:app.globalData.bankeInfo[index].bname,
      tname:app.globalData.userInfo.tname,
    })
    console.log(this.data.list)
    console.log(this.data.list.id)
    console.log(this.data.list.bname)
    console.log(this.data.list.teacherid)
    console.log(this.data.list.tname)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  
})
