Page({
  data: {
      cardNumber: 7, 
      indexArr: [-3, -2, -1, 0, 1, 2, 3], 
      list: [], 
      listArr: [],
      startPageX: 0,
      cardWidth: 0, 
      screenWidth: 0, 
      isTouch: false, 



   
        new: 'top-hoverd-btn',
        good: '',
        child: '',
        mom: '',
        girl: '',
        shoe: '',
        home: '',
        beauti: '',
        food: '',
        hidden: false,





        latitude:'',
        longitude:'',


  




  },



//top start
toNew: function(){
    console.log('new');
     this.updateBtnStatus('new');
},
toGood: function(){
    console.log('good');
     this.updateBtnStatus('good');
},
toChild: function(){
    console.log('child');
     this.updateBtnStatus('child');
},
toMom: function(){
    console.log('mom');
     this.updateBtnStatus('mom');
},
toGirl: function(){
    console.log('girl');
     this.updateBtnStatus('girl');
},
toShoe: function(){
    console.log('shoe');
     this.updateBtnStatus('shoe');
},
toHome: function(){
    console.log('home');
     this.updateBtnStatus('home');
},
toBeauti: function(){
    console.log('beauti');
     this.updateBtnStatus('beauti');
},
toFood: function(){
    console.log('food');
     this.updateBtnStatus('food');
},
onLaunch: function () {
  console.log('bb Launching ...');
},
onShow: function(){
   var that = this;
   setTimeout(function(){
      that.setData({
          hidden: true
      });
   }, 1500);
},
updateBtnStatus: function(k){
  this.setData({
      new: this.getHoverd('new', k),
      good: this.getHoverd('good', k),
      child: this.getHoverd('child', k),
      mom: this.getHoverd('mom', k),
      girl: this.getHoverd('girl', k),
      shoe: this.getHoverd('shoe', k),
      home: this.getHoverd('home', k),
      beauti: this.getHoverd('beauti', k),
      food: this.getHoverd('food', k)
  });
},
getHoverd: function(src, dest){
  return (src === dest ?  'top-hoverd-btn' : '');
},
// top end






  onLoad() {
      let _this = this;
      _this.init();

  },
  /*层叠轮播图初始化*/
  init: function () {
      let _this = this;
      wx.getSystemInfo({
          success(res) {
              //获取屏幕的宽成功
              let arr = [];
              let len = _this.data.cardNumber;
              let cardWidth = res.screenWidth / 900 * 200;

              for (let i = 0; i < len; i++) {
                  let item = {
                      option: 0, //自定义选项
                      left: (i * (cardWidth / 2)),
                      scale: (3 - Math.abs(_this.data.indexArr[i])) * 0.4,
                      zIndex: 3 - Math.abs(_this.data.indexArr[i]),
                      style: {
                          left: (i * (cardWidth / 2)),
                          transition: 0,
                          zIndex: 3 - Math.abs(_this.data.indexArr[i]),
                          transform: "scale(" + ((3 - Math.abs(_this.data.indexArr[i])) * 0.4) + ")",
                          opacity: (3 - Math.abs(_this.data.indexArr[i]) != 0) ? 1 : 0
                      },
                      backimage:"",
                  }
                  item.option = i;
                  arr.push(item);
              }
              arr[0].backimage="/images/schoolmap.jpg"
              arr[1].backimage="/images/fall.jpg"
              arr[2].backimage="/images/xiaoli.jpg"
              arr[3].backimage="/images/xiaoli.jpg"
              arr[4].backimage="/images/xiaoli.jpg"
              arr[5].backimage="/images/xiaoli.jpg"
              arr[6].backimage="/images/xiaoli.jpg"

              console.log(arr);

              _this.setData({
                  screenWidth: res.screenWidth,
                  cardWidth,
                  list: arr,
                  listArr: arr
              })
          }
      })
  },
  /*触摸开始*/
  touchstart(e) {

      //console.log(e.changedTouches[0].pageX);
      this.setData({
          startPageX: e.changedTouches[0].pageX,
          isTouch: true //开始触摸
      });

  },
  /*触摸移动*/
  touchmove(e) {
      let _this = this;
      let pageX = e.changedTouches[0].pageX;
      let move = pageX - _this.data.startPageX; //正数，向右滑动；负数，向左滑动
      let list = JSON.parse(JSON.stringify(_this.data.list));

      let len = list.length;
      //console.log(move);
      if (move > 0) { //向右滑

          for (let i = 0; i < len; i++) {
              list[i].style.left = list[i].left + ((move) * 0.52);
              if (_this.data.indexArr[i] < 0) {
                 
                  list[i].style.transform = "scale(" + (list[i].scale + (move * 0.005)) + ")";
                  list[i].style.zIndex = list[i].zIndex + 1;
                  if (_this.data.indexArr[i] >= -3) {
                      list[i].style.opacity = 1; 
                  }
              } else {
                 
                  list[i].style.transform = "scale(" + (list[i].scale - (move * 0.005)) + ")";
                  list[i].style.zIndex = list[i].zIndex - 1;
                  if (_this.data.indexArr[i] >= 2) {
                      list[i].style.opacity = 0;
                  }
              }
          }
          //检查是否，向右
          if (list[2].style.left >= list[3].left) {
              let newArr = [];
              for (let i = 0; i < len; i++) {
                  let index = i; //当前将要变成哪一个坐标元素的位置
                  if (i + 1 != len) {
                      index = i + 1;
                  } else {
                      //最后一个元素到第一个元素的位置
                      index = 0;
                  }
                  let current_option = list[i].option;
                  // console.log('current_option',current_option);
                  // console.log('list[i].option',list[i].option);
                  let item = _this.data.listArr[index];
                  item.option = current_option;
                  item.backimage=list[i].backimage
                  newArr[index] = item;
              }
              // console.log('old', list);
              // console.log('new', newArr);
              list = newArr;
              _this.setData({
                  startPageX: pageX
              });
          }
          _this.setData({
              list
          })

      } else { //向左滑
          for (let i = 0; i < len; i++) {
              list[i].style.left = list[i].left + ((move) * 0.52);
              if (_this.data.indexArr[i] <= 0) {
                  list[i].style.transform = "scale(" + (list[i].scale - Math.abs(move * 0.005)) + ")";
                  list[i].style.zIndex = list[i].zIndex - 1;
                  if (_this.data.indexArr[i] <= -2) {
                      list[i].style.opacity = 0; 
                  }

              } else {
                  list[i].style.transform = "scale(" + (list[i].scale + Math.abs(move * 0.005)) + ")";
                  list[i].style.zIndex = list[i].zIndex + 1;
                  if (_this.data.indexArr[i] >= 2) {
                      list[i].style.opacity = 1;
                  }
              }
          }

          //检查，向左
          if (list[3].style.left <= list[2].left) {
               let newArr = [];
              for (let i = 0; i < len; i++) {
                  let index = i;
                  if (i == 0) {
                      index = len - 1;
                  } else {
                       index = i - 1;
                  }

                  let current_option = list[i].option;
                  // console.log('current_option',current_option);
                  // console.log('list[i].option',list[i].option);
                  let item = _this.data.listArr[index];
                  item.option = current_option;
                  item.backimage=list[i].backimage
                  newArr[index] = item;
              }
              // console.log('old', list);
              // console.log('new', newArr);
              list = newArr;
              _this.setData({
                  startPageX: pageX
              });
          }

          _this.setData({
              list
          })

      }
  },
  /*触摸结束*/
  touchend(e) {

      console.log('触摸结束');
      let _this = this;
      let list = JSON.parse(JSON.stringify(_this.data.list));
      let len = list.length;
      _this.setData({
          isTouch: false //关闭触摸
      })
      if (list[2].style.left >= list[3].left||list[3].style.left <= list[2].left) {
          //console.log('翻牌了');
          
      } else {
          //移动的距离不够
          for (let i = 0; i < len; i++) {
              list[i].style.left = list[i].left;
              list[i].style.zIndex = list[i].zIndex;
              list[i].style.transform = "scale(" + list[i].scale + ")";
              list[i].style.opacity = (3 - Math.abs(_this.data.indexArr[i]) != 0) ? 1 : 0
          }
          _this.setData({
              list
          })
      }
  },




  zuoyefabu(){
    wx.navigateTo({
      url: '../zuoyefabu/zuoyefabu',
    })
  },
  zuoyetijiao(){
    wx.navigateTo({
      url: '../zuoyetijiao/zuoyetijiao',
    })
  },
  zuoyechakan(){
    wx.navigateTo({
      url: '../zuoyechakan/zuoyechakan',
    })
  },
  zuoyepigai(){
    wx.navigateTo({
      url: '../zuoyepigai/zuoyepigai',
    })
  },
 bankecreate(){
    wx.navigateTo({
      url: '../bankecreate/bankecreate',
    })
  },
  





  // 1.定位 获取当前位置
  // 2.获取当前位置的经纬度
  // 3.根据经纬度 获取当前位置
  getLocation:function(){
    wx.getLocation({
      success:res=>{
        console.log(res)
        this.setData({
          latitude : res.latitude,
          longitude : res.longitude,
        })
        //根据经纬度获取城市名称
      },
      fail:function (){
        console.log('获取失败')
      }
    })
  },



})
