// pages/main/More/More.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    contentUrls: [],
    disabled: false,
    update_time:'', //时间
    // length:'',
    popular_value:'' ,//人气值
    add:'',
    deleted:'',
    kfhidden: '分享好友'
  },
  // 跳转到精选界面
  onMoreTap: function () {
    wx.switchTab({
      url: '../main'
    })
  },
  // 收藏文章
  onCollectionTap: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var txt = e.currentTarget.dataset.txt; //标题
   
    var img = e.currentTarget.dataset.img;
    var cid = e.currentTarget.dataset.cid; //页面cid
    
    var index = e.currentTarget.dataset.index;
    var time = util.formatTime(new Date());
    console.log(889);
    console.log(time); 
    var value = e.currentTarget.dataset.value; //人气值
    
    // var timeing = e.curretTarget.dataset.timeing;
    // wx.setStorageSync('tu', img);
    // wx.setStorageSync('biaoti', txt);
    // var arrs = (app.data.arr).push(cont);
    console.log(value,"8888");
    // console.log(timeing,"555");
    wx.request({
      url: 'https://295u.cn/api/XcxTitleDo.html',
      data:{
        openid:openid,
        name:txt,
        img:img,
        cid:cid,
        time:time,
        dom:'save',
        value:value,
      },
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        console.log(990);
        console.log(res.data.msg);
        if(res.data.msg === '收藏成功'){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000
          })
        } else if (res.data.msg === '你已经收藏了'){
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false
          })
        }
        
      }
    })
    // wx.setStorageSync('time', time);
    // if (app.data.arr.length) {
    //   for (let i = 0; i < app.data.arr.length; i++) {
    //     console.log(2333);
    //     // 如果循环一遍后数组中有数据
    //     if (app.data.arr[i].cid == cont.cid) {
    //       console.log(45435);
    //       console.log(app.data.arr[i].cid, cont.cid);
    //       wx.showModal({
    //         content: '您已经收藏过',
    //         showCancel: false
    //       })
    //     } else {
    //       var arrs = (app.data.arr).push(cont);
    //       console.log(3844);
    //       wx.setStorageSync('cont', app.data.arr);
    //       wx.showToast({
    //         title: '收藏成功',
    //         icon: 'success',
    //         duration: 1000
    //       });
    //     }
    //   }
    // }
    // else {
    //   console.log(838784);
    //   var arrs = (app.data.arr).push(cont);
    //   wx.setStorageSync('cont', app.data.arr);
    //   wx.showToast({
    //     title: '收藏成功',
    //     icon: 'success',
    //     duration: 1000
    //   })
    // }
  },
  //预览图片
  onPreviewTap:function(e){
    console.log(e);
    let arr = [];
    var arrs = e.target.dataset.src;
    console.log(arrs, "999");
    var img = e.target.dataset.src;
    console.log(img)
    // arr.push(img);
    // console.log(arr,"234");
    // var img = this.data.contentUrls['img'];
    // console.log(img);
    // wx.previewImage({
    //   // urls: [img],
    // })
    
  },
  // 打赏功能
  onExpectTap:function(e){
    var cid = e.currentTarget.dataset.cid;
    var txt = e.currentTarget.dataset.txt;
    var value = e.currentTarget.dataset.value;
    var time = e.currentTarget.dataset.time;
    console.log(998);
    console.log(time);
    wx.navigateTo({
      url: '../expect/expect?cid=' + cid + '&txt=' + txt + '&value=' + value + '&time=' + time
    })
    // console.log('../expect/expect ? cid = ' + cid + ' & txt=' + txt + ' & value=' + value + ' & time=' + time);
  },
  // 点赞功能
  bindLikeTap:function(e){
    var that = this;
    wx.request({
      // url: 'https://295u.cn/api/XcxGetTitleOne.html',
      url: 'https://295u.cn/api/XcxGetTitleOne.html',
      data: {
        cid: that.data.cid,
        numbers: that.data.popular_value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var openid = wx.getStorageSync('openid');
        console.log(openid,"68797");
        var time = res.data;
        console.log(time,"9999");
        var numbers = time['ctimes'];
        // console.log(numbers,"898248");
        // console.log(that.data.popular_value,"66666");
        if (numbers === that.data.popular_value){
          that.setData({
            popular_value: parseFloat(numbers) + 1
          });
          that.showToast();
        console.log(that.data.popular_value, "222");
        } else if (numbers + 1 != that.data.popular_value){
          wx.showModal({
            title: '提示',
            content: '亲已经点过👍了',
            showCancel: false
          })
        }
      }
    })
    // this.setData({
    //   // popular_value: cc + 1
    // })

    // console.log(this.data.popular_value);
  },
  // 交互模板
  showToast:function(){
    wx.showToast({
      title: '谢谢亲点赞',
      icon:'success',
      duration:1000
    })
  },
  // 分享好友
  onShareTap:function(res){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // content.replace('<img', '<img style="max-width:100%;height:auto" ')
    var txt = options.id;
    console.log(txt);
    var cid = options.cid;
    this.setData({
      txt: txt,
      cid: cid
    });
    // wx.setNavigationBarTitle({
    //   title: this.data.txt  //动态设置标题
    // });
    var uptime = util.formatTime(new Date());
    // var dataBase_time = util.formatTime2(sjc, 'Y/M/D h:m:s')
    // console.log(uptime,"928384");
    this.setData({
      update_time: uptime
    })
    var that = this;
    wx.request({
      url: 'https://295u.cn/api/XcxKeysGet.html',
      data: {
        openid: wx.getStorageSync('openid'),
        appid: 'wx1156b60f7bba1f91'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data != '') {
          // var aa = res.data.split('oaHTaGaVmmhlnmg=');
          var arrs = res.data;
          console.log(arrs, "23472");
          console.log(arrs['key6'], "8889");
          if (arrs['key6'] === that.data.kfhidden) {
            that.setData({
              kfhidden: true
            })
          } else {
            that.setData({
              kfhidden: false
            })
          }
        }
      }

    })
    this.requestTap(); //传递参数到数据库
    // this.bindLikeTap();
  },
  // 传递参数到数据库
  requestTap: function (res) {
    let that = this;
    wx.request({
      url: 'https://295u.cn/api/XcxGetTitleOne.html',
      data: {
        cid: that.data.cid,
        numbers: that.data.popular_value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let aa = res.data;
         console.log(aa);
        if (aa['cid'] === that.data.cid) {
          that.setData({
            contentUrls: aa
          })
          let txt = res.data.txt;
          console.log(txt,"983");
          wx.setNavigationBarTitle({
            title: txt
          })
          var sjc = that.data.contentUrls['update_time'];
          var dataBase_time = util.formatTime2(sjc, 'Y/M/D h:m:s');
          that.setData({
            update_time: dataBase_time
          })
          var numbers = aa['ctimes'];
          that.setData({
            popular_value: numbers
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    
    // console.log(time.formatTime(sjc, 'Y/M/D h:m:s'));
    // console.log(time.formatTime(sjc, 'h:m'));
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(this.data.contentUrls,"8888");
    let arr = this.data.contentUrls;
    let img = arr.img;
    let txt = arr.txt;
    let cid = arr.cid;
    let ctimes = arr.ctimes;
    let update_time = arr.update_time;
    console.log(update_time,"9090");
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(998);
      console.log(res.target);
    }
    return {
      title: txt,
      imageUrl:img,
      path: 'pages/main/More/More?cid=' + cid + '&ctimes' + ctimes + '&update_time' + update_time,
      // imageUrl:'../../images/myCode1.png',
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})