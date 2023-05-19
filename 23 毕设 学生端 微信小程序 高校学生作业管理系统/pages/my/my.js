const  app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    username:"",
    userpwd:"",
    img:"../../images/my-active.png",
  },
  isEdited:function (e) {
    this.setData({
      isEdited:true
    })
  },
  getName(e){
    console.log(e.detail.value)
    this.setData({
      newtname:e.detail.value,
    })
    console.log(this.data.newtname)
  },
  getPwd(e){
    console.log(e.detail.value)
    this.setData({
      newpwd:e.detail.value,
    })
    console.log(this.data.newpwd)
  },

  //动态控制 选取点击
  editList:function(e){
     console.log(this.data.username)
     console.log(this.data.userpwd)
    console.log("点击保存后的教师姓名：" +this.data.newtname);
    console.log("点击保存后的教师密码：" +this.data.newpwd);
  
    this.setData({
      isEdited:false
    })
   
    if(this.data.newtname==null||this.data.newpwd==null){
      wx.showToast({
        title: '姓名与密码不可为空',
        icon:"none"
      })
      //调用get的方法 更新
      this.onLoad()
    }else{
      //3.页面数据同步修改
    // this.setData({
    //   username:list
    // })

     // 修改name
     this.setData({
       username:this.data.newtname,
       userpwd:this.data.newpwd
     })
     console.log("点击保存后：" +app.globalData.userInfo.id);
      console.log("点击保存后：" +this.data.username);
      console.log("点击保存后：" +this.data.userpwd);
      this.updateUser(this.data.username,this.data.userpwd)
    }
  },
  
  
    
    updateUser(username,userpwd) {
      //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
    wx.request({
      url: 'http://localhost:8080/updatestu',
      method:"post",
      data:{
        id:app.globalData.userInfo.id,//当前的list数组对应的 对象id 获取传递  list[index].id
        sname:username,
        // bname:app.globalData.bankeInfo.bname,
        password:userpwd,
      },
      success:res=>{
        if(res.data.success){
         console.log("updata success");
        }
      }
    })
  
    },


denglu(){
  wx.navigateTo({
    url: '../denglu/denglu',
  })
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
  //每次页面刷新都会执行这个函数
  onShow() {

    console.log(app.globalData.userInfo.id)
    console.log(app.globalData.userInfo.sname)
    console.log(app.globalData.userInfo.password)
    this.setData({
      place:app.globalData.userInfo.place,
      id:app.globalData.userInfo.id,
      img:app.globalData.userInfo.img,
      username:app.globalData.userInfo.sname,
      userpwd:app.globalData.userInfo.password
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