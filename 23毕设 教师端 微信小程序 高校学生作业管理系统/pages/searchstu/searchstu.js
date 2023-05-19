
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
getName(e){
  console.log(e.detail.value)
  this.setData({
    newsname:e.detail.value,
  })
  console.log(this.data.newsname)
},
  isEdited:function (e) {
    //获取当前操作元素
    var id = e.currentTarget.dataset.id;
    console.log("点击修改后的班课index下标：" +id);
    var stulist = this.data.stulist;
    //获取原来的状态 
     stulist[id].isEdited=!stulist[id].isEdited,
    //  
     this.getName(e)
     //同步页面修改
     this.setData({
      stulist:stulist
     })
  },
  //动态控制 选取点击
  editList:function(e,newsname){
    console.log("点击保存后的学生id：" +this.data.stulist[e.currentTarget.dataset.id].id);
  //1.获取当前 操作的元素 的标识e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id;
    var stulist = this.data.stulist;
    stulist[id].isEdited=!stulist[id].isEdited,
    // 修改班课名
    console.log(this.data.newsname);
    stulist[id].sname=this.data.newsname

    if(this.data.newsname==null){
      wx.showToast({
        title: '学生名不可为空',
        icon:"none"
      })
      //调用get的方法 更新
      this.getStuList()
    }else{
      //3.页面数据同步修改
    this.setData({
      stulist:stulist
    })
    }
    console.log(stulist)
    //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
    this.updateStu(stulist[id].studentid,stulist[id].sname)
   //调用get的方法 更新
    // this.getStuList()
  },

  updateStu(studentid,sname) {
  
    //4.把修改的数据存到后台sql接口----给后台修改数据库---再次进入页面数据已经被修改
  wx.request({
    url: 'http://localhost:8080/updatestu',
    method:"post",
    data:{
      id:studentid,//当前的list数组对应的 对象id 获取传递  list[index].id
      sname:sname
    },
    success:res=>{
      if(res.data.success){
       console.log("updata success");
      }
    }
  })

  },
  
// 获取当前班课的学生list信息
getStuList:function(){
  var id = this.data.id;
  console.log(id);
  wx.request({
    url: 'http://localhost:8080/searchsbid',
    method:"post",
    data:{
      bankeid:id,
    },  
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
/* 删除学生 删除的其实是sb数据表 即获取sb.id*/
delbanke: function (e) {
  console.log(this.data.stulist[e.currentTarget.dataset.id]);
console.log(this.data.stulist[e.currentTarget.dataset.id].id);
  wx.request({
    url: 'http://localhost:8080/deletesb/',
    method:"post",
    data:{
      id:this.data.stulist[e.currentTarget.dataset.id].id
    },  
    success:res=>{
      console.log(res.data);
      if(res.statusCode=="200"){       
       this.getStuList(),
        console.log(this.data.stulist);
      }else{
        console.log('删除失败')
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
    var bankeid = this.data.id
    console.log(name);
    console.log(bankeid);
    if(name){ //输入框 输入内容存在  查询结果 有数据或无数据
      //网络请求数据
      this.setData({
        msg:'所搜索的学生：',  
      })
    //根据班课id与学生姓名sname模糊查询
      wx.request({
        url: 'http://localhost:8080/searchsbidsname',
        method:"post",
        data:{
          sname:name,
          bankeid:bankeid
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
 //添加学生
 btn(){
  setTimeout(()=>{   // 延迟800ms 的定时器 与 跳转页面
    var index = this.data.index
    wx.navigateTo({// relaunch可以跳转到tabBar页面  navigateTo 跳转同级页面
      url: '../teaADDstu/teaADDstu?index=' + index,
    })
  },100)
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