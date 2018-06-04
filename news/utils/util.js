const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 获取模板data数据
 */
const categorysJson = require('../utils/category.js');
wx.setStorageSync('USER_COLLECT', [])
function getCategorys(){
  return new Promise((resolve,reject) =>{
    var liked = wx.getStorageSync('USER_COLLECT') || [];
    var categorys = categorysJson.data;
    categorys.forEach(category => {
      if(!liked.length){
        category.selected = true
      }else{
        category.selected = false
        liked.forEach(like =>
          category.lanmu_id === like.id && (category.selected = true)
        )
      }
    })
    resolve(categorys)
  })
}

module.exports = {
  formatTime: formatTime,
  getCategorys: getCategorys
}
