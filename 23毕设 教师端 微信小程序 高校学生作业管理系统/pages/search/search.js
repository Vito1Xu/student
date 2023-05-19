// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//学生数据进行渲染前 需要先声明一个list数组 放入搜索到的学生数据 再给予展示
    msg:''//没有此学生
  },  


  //获取搜索框输入内容
  inputName:function(e){
    console.log(e.detail);
    //获取 用户搜索内容 ----查询学生
    var name= e.detail.value;
    if(name){ //输入框 输入内容存在  查询结果 有数据或无数据
      //网络请求数据
      this.setData({
        msg:'所搜索的学生：',
        
      })
      wx.request({
        url: 'url',
        data:{
          name:'',
          bankeming:''
        },
        success:res=>{
          console.log(res.data);// res.data 是固定的返回值
          if(res.data==200){
            console.log(res.data.data);
            this.setData({
              msg:'所搜索的学生：',
              list:res.data.data
            })
          }else{ //输入数据为空 
            console.log('没有此学生')
            this.setData({
              list:[],
              msg:'没有此学生'
            })
          }
        }   
      })
    }else{//无name数据时 去清空list数据 保证页面不显示上一条搜索页面 
      this.setData({
        list:[],
        msg:'请输入学生姓名'
      })
    }  
    console.log(this.data.msg);

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