// pages/zuoyetijiao/zuoyetijiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },





  uploadimg: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {
        //console.log(res)
        //前台显示
        that.setData({
          source: res.tempFilePaths
        })

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://www.xxxxx.com/index.php/wxxcx/xxxx/uploadimg',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            //打印
            console.log(res.data)
          }
        })

      }
    })
  },


  // 后端控制器
  //   图片上传
  // public function uploadimg()
  // {
  //     $file = request()->file('file');
  //     if ($file) {
  //         $info = $file->move('uploads/weixin/');
  //         if ($info) {
  //             $file = $info->getSaveName();
  //             //入库时应将完整的路径入库 方便展示用
  //             $file="E:."/".xxxx."/".public."/".uploads."/".weixin"."/".$file;
  //             $data= \app\wxxcx\model\Pyg::create(['image'=>$file],true)->toArray();
  //             //将商品id存入缓存
  //             cache('gid',$data['gid']);
  //             print_r( $data);
  //             $res = ['errCode'=>0,'errMsg'=>'图片上传成功','file'=>$file];
  //             return json($res);
  //         }
  //     }

  // }







  formSubmit(e) {
    //接受表单提交的数据
    let goodsname = e.detail.value.goodsname
    let price = e.detail.value.price
    //发送请求
    wx.request({
      url: 'http://www.xxxx.com/index.php/wxxcx/xxx/index', //的接口地址
      data: {
        goodsname: goodsname,
        price: price
      },
      dataType: "json",
      method: "POST",
      responseType: "text",
      header: {
        'content-type': 'application/json' // 默认值
      },

     success(res) {
        let gid = res.data.data.gid
        console.log(res.data.data.gid)
        //判断是否添加成功
        if (res.data.code == 200) {
          //将商品id存入缓存 （可不写）
          wx.setStorage({
            key: "gid",
            data: gid
          })
        }
        //添加完页面跳转到展示页面
        wx.switchTab({
          url: '/pages/demo2/demo2'
        })
      }
    })

    console.log(e.detail.value)
    console.log(goodsname)
 },

  //图片上传部分
  uploadimg: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

      success: function (res) {
        //console.log(res)
        //前台显示
        that.setData({
          source: res.tempFilePaths
        })

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://www.xxx.com/index.php/wxxcx/xxx/uploadimg',
          filePath: tempFilePaths[0],
         name: 'file',
         success: function (res) {
            //打印
           console.log(res.data)
          }
        })

      }
    })
  },


//后端控制器
//保存数据  添加
// public function index()
// {
//    $data = input();
//    //从缓存中获取商品id
//    $gid = cache('gid');
//    \app\wxxcx\model\xxx::update($data,['gid'=>$gid],true)->toArray();
//    $data = \app\wxxcx\model\xxx::get($gid);
//    if ($data){
//        return json(['code'=>200,'msg'=>'success','data'=>$data]);
//    }
// }







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