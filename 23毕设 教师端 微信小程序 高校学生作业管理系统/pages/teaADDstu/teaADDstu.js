
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[], //班课list
    msg:'',//没有此学生
    stulist:[],//学生数据进行渲染前 需要先声明一个list数组 放入搜索到的学生数据 再给予展示
  },  
  /* 添加学生 */
  addstu: function (e) {
    console.log("点击邀请后的当前学生list：");
    console.log(this.data.stulist[e.currentTarget.dataset.id]);
    console.log("点击邀请后的当前学生姓名：" +this.data.stulist[e.currentTarget.dataset.id].sname);
    console.log("点击邀请后的当前学生id：" +this.data.stulist[e.currentTarget.dataset.id].id);
    var bankeid = this.data.id;
    var studentid = this.data.stulist[e.currentTarget.dataset.id].id;
    var index = this.data.index

    wx.showModal({
      title: '提示',
      content: '确定邀请加入嘛',
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
                          wx.navigateTo({// relaunch可以跳转到tabBar页面  navigateTo 跳转同级页面
                            url: '../searchstu/searchstu?index=' + index,
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
          wx.showToast({
            title: '取消成功',
            icon:"none"
          })
        }
      }
    })
  },
  
// 获取所有的学生list信息
getStuList:function(){
  wx.request({
    url: 'http://localhost:8080/allstu',
    method:"post", 
    success:res=>{
      console.log(res.data);
      console.log(res.data[0]);
      if(res.statusCode=="200"){       
        var stulist = res.data
        this.setData({
          stulist:stulist
        })
        console.log(this.data.stulist);
      }else{
        console.log('学生为空')
      }
    }
  })
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
        url: 'http://localhost:8080/searchstu',
        method:"post",
        data:{
          sname:name,
        },
        success:res=>{
          console.log(res.data);// res.data 是固定的返回值
          if(res.statusCode=="200"){
            console.log(res.data);
            this.setData({
              msg:'所搜索的学生：',
              stulist:res.data
            })
          }else{ //输入数据为空 
            console.log('没有此学生')
            this.setData({
              stulist:[],
              msg:'没有此学生'
            })
          }
        }   
      })
    }else{//无name数据时 去清空list数据 保证页面不显示上一条搜索页面 
      this.setData({
        stulist:[],
        msg:'请输入学生姓名'
      })
    }  
    console.log(this.data.stulist);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 //查看传递数据 是否成功
    console.log(options);
    var index = options.index
    console.log(index);
    console.log(app.globalData.bankeInfo[index]);
    this.setData({
      index:index,
      list:app.globalData.bankeInfo[index],
      id:app.globalData.bankeInfo[index].id,
      bname:app.globalData.bankeInfo[index].bname,
      tname:app.globalData.userInfo.tname,
    })
    console.log(this.data.list)
    console.log(this.data.id)
    this.getStuList();//拿这个方法加载页面 不然不调用 不执行
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