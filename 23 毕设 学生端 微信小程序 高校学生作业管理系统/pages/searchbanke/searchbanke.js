const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// 传bankeid与stuname获取搜索结果
  //获取搜索框输入内容
  inputName:function(e){
    console.log(e.detail);
    //获取 用户搜索内容 ----查询学生
    var name= e.detail.value;
    console.log(name);
    
    if(name){ //输入框 输入内容存在  查询结果 有数据或无数据
      //网络请求数据
      this.setData({
        msg:'所搜索的学生：',  
      })
    //根据班课id与学生姓名sname模糊查询
      wx.request({
        url: 'http://localhost:8080/searchbankeandtname',
        method:"post",
        data:{
          bname:name,
        },
        success:res=>{
          console.log(res.data);// res.data 是固定的返回值
          if(res.statusCode=="200"){
            console.log(res.data);
            this.setData({
              msg:'所搜索的班课：',
              bankelist:res.data
            })
          }else{ //输入数据为空 
            console.log('没有此学生')
            this.setData({
              bankelist:[],
              msg:'没有此学生'
            })
          }
        }   
      })
    }else{//无name数据时 去清空list数据 保证页面不显示上一条搜索页面 
      this.setData({
        bankelist:[],
        msg:'请输入班课名'
      })
    }  
    console.log(this.data.bankelist);

  },

  // 获取系统全部的班课list信息
getBankeList:function(){
  wx.request({
    url: 'http://localhost:8080/banke46',
    method:"post", 
    success:res=>{
      console.log(res.data);
      console.log(res.data[0]);
      if(app.globalData.userInfo){       
        var bankelist = res.data
        this.setData({
          bankelist:bankelist
        })
        console.log("全局变量赋值前："+app.globalData.bankeInfo)// 赋值前  "全局变量赋值前："+加上变成了[object，object]
        app.globalData.bankeInfo = res.data//将获取到的 data值 赋值给 全局变量userinfo   data下标 为0的数据
        console.log(app.globalData.bankeInfo)// 赋值后的 系统全部班课     
        console.log(this.data.bankelist) // 赋值后的 当前页面班课  
      }else{
        console.log('班课为空')
      }
    }
  })
},
  /* 加入班课 */
  intobanke: function (e) {
    console.log("点击加入后的当前班课list：");
    console.log(this.data.bankelist[e.currentTarget.dataset.id]);
    console.log("点击加入后的当前班课名：" +this.data.bankelist[e.currentTarget.dataset.id].bname);
    console.log("点击加入后的当前班课id：" +this.data.bankelist[e.currentTarget.dataset.id].id);
    var bankeid = this.data.bankelist[e.currentTarget.dataset.id].id;
    var studentid = app.globalData.userInfo.id;

    wx.showModal({
      title: '提示',
      content: '确定加入嘛',
      success:res=> { 
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
          wx.request({
            url: 'http://localhost:8080/searchsbstudentid=sid/',
            method:"post",
            data:{
              bankeid:bankeid,
              studentid:studentid
            },  
            success:res=>{
              console.log(res.data);
              if(res.data=="no student"){
                wx.request({
            url: 'http://localhost:8080/addsb/',
            method:"post",
            data:{
              bankeid:bankeid,
              studentid:studentid
            },  
            success:res=>{
              console.log(res.data);
              if(res.statusCode=="200"){                 
                  wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
                    url: '../bankemy/bankemy'
                  })
              }else{
                console.log('加入失败')
              }
            }
          })
        }else{
          console.log('该学生已在当前班课')
          wx.showToast({
            title: '该学生已在当前班课',
            icon:"none"
          })
        }
      }
    })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBankeList();//拿这个方法加载页面 不然不调用 不执行
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
    this.onLoad();
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