var date = require('../../utils/util.js');//导入utils模块
//formatTime函数运行时需要传参数
var times=date.formatTime(new Date()) //函数运行完有返回结果 需要一个times变量来接收
console.log(times);
const app = getApp()// 拿到全局变量的方法
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    image: "https://tse4-mm.cn.bing.net/th/id/OIP-C.ddvNqUpzA38POQDh1o3GqAHaCi?w=350&h=120&c=7&r=0&o=5&dpr=2.5&pid=1.7",
    addimage: '../../images/puls.png',
    delimage: '../../images/jian.png',
    bj: '软件工程（可以是bankeInfo.bname）',
    date1: times,
    list:'',

   
  },
  changeDate1(e) {
    var that = this;
    that.setData({
      times: e.detail.value
    });
    console.log('输出时间:', e.detail.value); //输出该文本 
  },
  // addList: function() {
   
  //   var lists = this.data.lists;
  //   var newData = {};
  //   lists.push(newData); //实质是添加lists数组内容，使for循环多一次
  //   this.setData({
      
  //     lists: lists,
  //   })
    
  // },
  // delList: function() {
  //   var lists = this.data.lists;
  //   lists.pop(); //实质是删除lists数组内容，使for循环少一次
  //   this.setData({
  //     lists: lists,
  //   })
  // },







// //班课名  bindKeyInput
// // input输入框的bindinput事件
// bindKeyInput(e){
//   this.setData({
//       inputValue: e.detail.value
//   })
//   console.log(this.data.inputValue);

// },
// //作业内容 bindKeyInput 1
// // input输入框的bindinput事件
// bindKeyInput1(e){
//   this.setData({
//       inputValue2: e.detail.value
//   })
//   console.log(this.data.inputValue2);

// },

zuoyefabu: function(e) {
  var zuoyeneirong = e.detail.value.zuoyeneirong;
  var fabudate = this.data.date1
  var id = this.data.id
  var teacherid = app.globalData.userInfo.id
  console.log( zuoyeneirong ); //输出该文本 
  console.log( id );
  console.log( teacherid );
  wx.request({
    url: 'http://localhost:8080/addzuoyefabu',
    method:'POST',
    data:{
      bankeid:id,
      zuoyeneirong:zuoyeneirong,
      fabudate:fabudate,

    },
    success(res){   //成功的话 进行如下操作
      if(res.statusCode=="200"){ //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
        wx.showToast({
          title: '作业发布成功',
          icon:"none"
        })
        setTimeout(()=>{   // 延迟500ms 的定时器 与 跳转页面
          wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
            url: '../bankemy/bankemy'
          })
        },500)
      }else{
        wx.showToast({
          title: '作业发布失败',
          icon:"none"
        })
      }
    }
  })

},
// 发布作业的bindtap点击事件
//发布作业按钮 点击后的事件
// btn(){
// // 这里就可以使用输入框输入的值啦，通常我们在这里发起ajax请求会用到


//    wx.showToast({
//     title: '发布成功!',
//     icon:"none"
//   })
//   setTimeout(()=>{   // 延迟800ms 的定时器 与 跳转页面
//     wx.reLaunch({// relaunch可以跳转到tabBar页面  navigateTo跳转同级页面
//       // url: '../zuoye/zuoye'
//       url: '../message/message'
//       // ?bankeming= + this.data.bankeming  + "&zuoyeneirong=" + this.data.zuoyeneirong+ "&beizhu=" + this.data.beizhu //此处注意中文符号与引文符号的？

//     })
//   },100)
// },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var index = options.index
    console.log(index);
    console.log(app.globalData.bankeInfo[index]);
    this.setData({
      index:index,
      list:app.globalData.bankeInfo[index],
      bj:app.globalData.bankeInfo[index].bname,
      id:app.globalData.bankeInfo[index].id,
    })
    console.log(this.data.list)
    console.log(this.data.id)

  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;

    setInterval(function(){
      that.setData({
      date1: date.formatTime(new Date())
    });
    },1000);
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 
  },



})