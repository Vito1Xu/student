const app=getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {

   
  },
isEdited:function (e) {
  //获取当前操作元素
  var id = e.currentTarget.dataset.id;
  console.log("点击修改后的班课index下标：" +id);
  var list = this.data.list;
  //获取原来的状态 
   list[id].isEdited=!list[id].isEdited,
  //  
   this.getName(e)
   //同步页面修改
   this.setData({
     list:list
   })
   console.log(this.data.list)
},
getName(e){
  console.log(e.detail.value)
  this.setData({
    newbname:e.detail.value,
  })
  console.log(this.data.newbname)
},
//动态控制 选取点击
editList:function(e,newbname){
  console.log("点击保存后的班课id：" +this.data.list[e.currentTarget.dataset.id].id);
//1.获取当前 操作的元素 的标识e.currentTarget.dataset.index
  var id = e.currentTarget.dataset.id;
  var list = this.data.list;
  
  list[id].isEdited=!list[id].isEdited,
  // 修改班课名
  console.log(this.data.newbname);
  list[id].bname=this.data.newbname

  if(this.data.newbname==null){
    wx.showToast({
      title: '班课名不可为空',
      icon:"none"
    })
    //调用get的方法 更新
    this.getBankeData()
  }else{
    //3.页面数据同步修改
  this.setData({
    list:list
  })
  }
  console.log(list)
  //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
  this.updateBanke(list[id].id,list[id].bname)
 //调用get的方法 更新
  // this.getBankeData()
},


  
  updateBanke(id,bname) {
  
    //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
  wx.request({
    url: 'http://localhost:8080/updatebanke',
    method:"post",
    data:{
      id:id,//当前的list数组对应的 对象id 获取传递  list[index].id
      teacherid:app.globalData.userInfo.id,
      // bname:app.globalData.bankeInfo.bname,
      bname:bname
    },
    success:res=>{
      if(res.data.success){
       console.log("updata success");
      }
    }
  })

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBankeData();//拿这个方法 不然不调用 不执行
  },
  getBankeData:function(){  
   wx.request({
    url: 'http://localhost:8080/searchbankestuid',
    method:"post",
    data:{
      studentid:app.globalData.userInfo.id
    },  
    success:res=>{
      console.log(res.data[0]);
      if(res.statusCode=="200"){       
        var list = res.data
        this.setData({
          list:list
        })
        console.log("全局变量赋值前："+app.globalData.bankeInfo)// 赋值前  "全局变量赋值前："+加上变成了[object，object]
        app.globalData.bankeInfo = res.data//将获取到的 data值 赋值给 全局变量userinfo   data下标 为0的数据
        console.log(app.globalData.bankeInfo)// 赋值后
        console.log(this.data.list);
      }else{
        console.log('班课为空')
      }
    }
  })
  console.log(this.data.list)
},
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /* 删除item */
  delbanke: function (e) {
    console.log("点击退出后的全局变量班课名：")
    console.log(app.globalData.bankeInfo);
    console.log("点击退出后的班课名：" +this.data.list[e.currentTarget.dataset.id].bname);
    console.log("点击退出后的sb_id：")
    console.log(this.data.list[e.currentTarget.dataset.id].id);

    wx.showModal({
      title: '提示',
      content: '是否确定退出此班课',
      success:res=> {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
          wx.request({
            url: 'http://localhost:8080/deletesb/',
            method:"post",
            data:{
              id:this.data.list[e.currentTarget.dataset.id].id
            },  
            success:res=>{
              console.log(res.data);
              if(res.statusCode=="200"){       
               this.getBankeData()
               console.log(this.data.list);
              }else{
                console.log('退出失败')
              }
            }
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })

   

  },



  //创建班课
  btn(){
   setTimeout(()=>{   // 延迟800ms 的定时器 与 跳转页面
     wx.navigateTo({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
       url: '../searchbanke/searchbanke'
     })
   },100)
 },
 
 message:function(e){
  console.log(e.currentTarget.dataset.id);
  /* 全局变量的bankeInfo的index 与bankemy的list的index相同 
    因此 如下直接 传 点击班课后获取的 data-id 即可
  */
  var index = e.currentTarget.dataset.id
  console.log("点击后的班课名：" +this.data.list[index].bname);
  wx.navigateTo({
    // url: '../message/message?inputValue=' + this.data.inputValue   //此处注意中文符号与引文符号的？
    url: '../message/message?index=' + index,

  })
},


})