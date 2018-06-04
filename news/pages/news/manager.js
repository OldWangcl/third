// pages/news/manager.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    if (app.globalData.categoryChanged) {
      app.utils.getCategorys().then(res => this.setData({
        categorys: res
      }))
      app.globalData.categoryChanged = false
    }
  },
  // 删除频道
  delecteCategory:function(e){
    this._setCategorySelected(e);
    // var arrs = this.data.categorys;
    // var key = e.currentTarget.dataset.key;
    // arrs.splice(key,1);
    // this.setData({
    //   categorys:arrs
    // })
    // console.log(key,"777");

  },
  _setCategorySelected:function(e,isSelect){
    var key = e.currentTarget.dataset.key
    console.log(key);
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
  onShareAppMessage: function () {
  
  }
})