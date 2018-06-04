Page({
  data: {

    catalogs: [
      {
        "catalogName": "卡其卡其",
        "select": 1
      },
      {
        "catalogName": "其卡其卡卡其卡其",
        "select": 2
      },
      {
        "catalogName": "鲤鱼鲤鱼",
        "select": 3
      },
      {
        "catalogName": "神迹神迹卡其卡其",
        "select": 4
      },

    ],
    catalogSelect: 0,//判断是否选中
  },

  chooseCatalog: function (data) {
    var that = this;
    that.setData({//把选中值放入判断值
      catalogSelect: data.currentTarget.dataset.select
    })


  }
})