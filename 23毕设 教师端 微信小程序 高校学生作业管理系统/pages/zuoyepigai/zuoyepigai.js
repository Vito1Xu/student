// pages/zuoyepigai/zuoyepigai.js
const app = getApp()// 拿到全局变量的方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zuoyetijiaolist:[],//放置 作业提交数据
  },
 /* 删除作业 */
 del: function (e) {
  console.log("点击后de作业提交全部Info：")
  console.log(this.data.zuoyetijiaolist[e.currentTarget.dataset.id]);
  console.log("点击后的this.data作业提交的学生：" +this.data.zuoyetijiaolist[e.currentTarget.dataset.id].sname);
  wx.request({
    url: 'http://localhost:8080/deletezuoyetijiao/',
    method:"post",
    data:{
      id:this.data.zuoyetijiaolist[e.currentTarget.dataset.id].id
    },  
    success:res=>{
      console.log(res.data);
      if(res.statusCode=="200"){       
       this.getZuoyetijiaolist()
      }else{
        console.log('删除失败')
      }
    }
  })
},
// -----------------------------获取作业提交列表-----------------------------------------
getZuoyetijiaolist(){
    var fabuid = this.data.fabuid
    console.log( fabuid );
    wx.request({
      url: 'http://localhost:8080/searchZuoyefabuTIjiaoid',
      method:'POST',
      data:{
        fabuid:fabuid,
      },
      // 此处要用箭头函数 不然会setdata报错----TypeError: Cannot read property 'setData' of undefined
      success:res=>{   //成功的话 进行如下操作
        if(res.statusCode=="200"){ //   res.data.length>0  表示找到了 一般res.data.length=1（一条账号 密码 数据）
          console.log( res.data );
          var zuoyetijiaolist = res.data
          this.setData({
            zuoyetijiaolist:zuoyetijiaolist
          })
          console.log( this.data.zuoyetijiaolist );
        }else{
          console.log('没有学生提交作业')
            this.setData({
              zuoyetijiaolist:['没有学生提交作业'],
            })
        }
      }
    })
    console.log( this.data.zuoyetijiaolist );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收跳转过来的index
    console.log(options);
    var id = options.id
    //前一个页面的作业发布list的id === 作业提交的fabuid
    console.log(id);
    this.setData({
      fabuid:id,
    })
    // 打印此班课信息
    console.log(this.data.fabuid)

    this.getZuoyetijiaolist();//拿这个方法加载页面 不然不调用 不执行
  },
// ---------------UPDATE------------------------------------------------//
  isEdited:function (e) {
    //获取当前操作元素
    var id = e.currentTarget.dataset.id;
    console.log("点击 打分后的 当前打分zuoyetijiao的index下标：" +id);
    var zuoyetijiaolist = this.data.zuoyetijiaolist;
    //获取原来的状态 
    zuoyetijiaolist[id].isEdited=!zuoyetijiaolist[id].isEdited,
    //  
    console.log("当前打分 zuoyetijiao的学生：" +zuoyetijiaolist[id].sname);
     this.getGrade(e)
     //同步页面修改
     this.setData({
      zuoyetijiaolist:zuoyetijiaolist
     })
  },
  getGrade(e){
    console.log(e.detail.value)
    this.setData({
      newgrade:e.detail.value,
    })
    console.log(this.data.newgrade)
  },
    
  //动态控制 选取点击
  editList:function(e,newgrade){
    console.log("点击保存后的 zuoyetijiao的id：" +this.data.zuoyetijiaolist[e.currentTarget.dataset.id].id);
  //1.获取当前 操作的元素 的标识e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id;
    var zuoyetijiaolist = this.data.zuoyetijiaolist;
    
    zuoyetijiaolist[id].isEdited=!zuoyetijiaolist[id].isEdited,
    // 打分(给grade赋值)
    console.log(this.data.newgrade);
    zuoyetijiaolist[id].grade=this.data.newgrade
  
    if(this.data.newgrade==null){
      wx.showToast({
        title: '分数不可为空',
        icon:"none"
      })
      //调用get的方法 更新
      this.getZuoyetijiaolist()
    }else{
      //3.页面数据同步修改
    this.setData({
      zuoyetijiaolist:zuoyetijiaolist
    })
    }
    console.log(zuoyetijiaolist)
    //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
    this.updateBanke(zuoyetijiaolist[id].id,zuoyetijiaolist[id].grade,zuoyetijiaolist[id].fabuid,zuoyetijiaolist[id].studentid,)
   //调用get的方法 更新
    // this.getBankeData()
  },
  
  
    updateBanke(id,grade,fabuid,studentid) {
    
      //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
    wx.request({
      url: 'http://localhost:8080/updatezuoyetijiao',
      method:"post",
      data:{
        id:id,//当前的list数组对应的 对象id 获取传递  list[index].id
        grade:grade,
        fabuid:fabuid,
        studentid:studentid,
      },
      success:res=>{
        if(res.data.success){
         console.log("updata success");
        }
      }
    })

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