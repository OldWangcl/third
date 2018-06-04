// pages/news/index.js
// var category = require('../../utils/category.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTabs:[],
    currentTab:0,
    color:'#000'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * data 数据
     */
    // var categorys = category.data;
    // console.log(categorys);
    // this.setData({
    //   categoryTabs: category.data
    // })
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
      if(app.globalData.categoryChanged){
        app.utils.getCategorys().then(res => this.setData({
          categoryTabs:res
        }))
        app.globalData.categoryChanged = false
      }
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
  
  },
  // 点击header选中
  changeCategory:function(e){
    console.log(this.data.currentTab,"ee");
    var chid = e.currentTarget.dataset.id;
    this.setData({
      currentTab: chid
    })
  
  
    
  }
})