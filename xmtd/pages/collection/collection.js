// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishidden: true,
    collect: '暂无收藏',
    collectionUrls: [],
    update_time: '',
    kfhidden:'分享好友'

  },
  // 删除数据
  onRemoveTap: function (e) {
    // console.log(e);
    var that = this;
    var cid = e.currentTarget.dataset.cid;
    // console.log(cid,"0877");
    var openid = wx.getStorageSync('openid');
    // var arr = this.data.collectionUrls;
    var index = e.currentTarget.dataset.index;
    // console.log(openid); 
    wx.showModal({
      title: '提示',
      content: '是否删除该收藏',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://295u.cn/api/XcxTitleDo.html',
            data: {
              openid: openid,
              cid: cid,
              dom: 'del'
            }
          })
          var arr = that.data.collectionUrls;
          arr.splice(index, 1);
          // console.log(arr,"234");
          that.setData({
            collectionUrls: arr
          });
          if (arr.length === 0) {
            that.setData({
              ishidden: !that.data.ishidden
            })
          }
          // wx.removeStorageSync('cont');
        }
      }
    })
  },
  // 跳转到详情界面
  onMoreTap: function (e) {
    var txt = e.currentTarget.dataset.name;
    var cid = e.currentTarget.dataset.cid;
    // console.log(cid);
    this.setData({
      moreTxt: txt,
      moreCid: cid
    })
    // console.log(this.data.moreTxt);
    wx.navigateTo({
      url: '../main/More/More?cid=' + cid + '&id' + txt
    })
    wx.showToast({
      title: '加载中',
      duration: 1000,
      icon: 'loading',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.onShareTap();
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
          console.log(arrs,"23472");
          console.log(arrs['key6'],"8889");
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    console.log(this.data.collectionUrls, "898989");
    var openid = wx.getStorageSync('openid');
    // console.log(openid);
    wx.request({
      url: 'https://295u.cn/api/XcxTitleDo.html',
      data: {
        openid: openid,
        dom: 'huoqu'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        let reverse = res.data.reverse();
        that.setData({
          collectionUrls: reverse
        })
        if (res.data.length > 0) {
          that.setData({
            ishidden: false
          })
        }
      }
    });
    // this.onShareAppMessage(res);
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
    if (res.from === 'button') {
      console.log(996);
      console.log(res.target);
    }
    return {
      title: res.target.dataset.name,
      imageUrl: res.target.dataset.src,
      path: 'pages/main/main',
      // imageUrl:'../../images/myCode1.png',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})