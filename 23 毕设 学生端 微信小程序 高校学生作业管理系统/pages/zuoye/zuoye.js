// pages/zuoyepigai/zuoyepigai.js
const app = getApp()// 拿到全局变量的方法
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  btn(){
    // 带着班课index下标跳转
    var index = this.data.index
    wx.navigateTo({
      url: '../zuoyefabu/zuoyefabu?index=' + index,
    })
  },
   /* 作业答题 */
 huida: function (e) {
  console.log("点击答题后de作业发布Info：")
  console.log(this.data.zuoyefabulist[e.currentTarget.dataset.id]);
     // 带着作业发布list的id跳转
     var id = this.data.zuoyefabulist[e.currentTarget.dataset.id].id
     console.log(id);
     wx.navigateTo({
       url: '../zuoyehuida/zuoyehuida?id=' + id,
     })

},
  /* 作业成绩查看 */
  check: function (e) {
    console.log("点击查看后de作业发布Info：")
    console.log(this.data.zuoyefabulist[e.currentTarget.dataset.id]);
       // 带着作业发布list的id跳转
       var id = this.data.zuoyefabulist[e.currentTarget.dataset.id].id
       console.log(id);
       wx.navigateTo({
         url: '../checkgrade/checkgrade?id=' + id,
       })
  
  },

  getZuoyefabulist(){
    var bankeid = this.data.bankeid
    console.log( bankeid );
    wx.request({
      url: 'http://localhost:8080/searchZuoyefabuBankeid',
      method:'POST',
      data:{
        bankeid:bankeid,
      },
      // 此处要用箭头函数 不然会setdata报错----TypeError: Cannot read property 'setData' of undefined
      success:res=>{   //成功的话 进行如下操作
        if(res.statusCode=="200"){ //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
          console.log( res.data );
          var zuoyefabulist = res.data
          this.setData({
            zuoyefabulist:zuoyefabulist
          })
          console.log( this.data.zuoyefabulist );
        }else{
          console.log('还未发布作业')
            this.setData({
              zuoyefabulist:['还未发布作业'],
            })
        }
      }
    })
    console.log( this.data.zuoyefabulist );
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
      bankeid:app.globalData.bankeInfo[index].bankeid,
    })
    // 打印此班课信息
    console.log(this.data.list)
    console.log(this.data.bankeid)
    this.getZuoyefabulist();//拿这个方法加载页面 不然不调用 不执行
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