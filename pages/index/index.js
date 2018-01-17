const AV = require('../../libs/av-weapp-min.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  /**
   * ================================== 响应数据 ==================================
   */

  data: {
    userInfo: null,
    query: {}
  },

  /**
   * ================================== 事件绑定 ==================================
   */

  // 事件处理
  bindViewTap() {
    console.log(app.globalData)
  },

  /**
   * ================================== 内置事件 ==================================
   */

  // 页面加载
  onLoad(query) {
    util.pageInit(this, app, query);
  },

  // 渲染完成
  onReady(){
    console.log(this)
    console.log("onReady")
  },

  // 页面展示
  onShow(){
    console.log("onShow")
  },

  // 页面隐藏
  onHide(){
    console.log("onHide")
  },

  // 页面卸载 
  onUnload(){
    console.log("onUnload")
  },

  // 下拉动作
  onPullDownRefresh(){
    console.log("onPullDownRefresh")
  },

  onReachBottom(){
    console.log("onReachBottom")
  },

  onShareAppMessage(){
    return {
      title: '简续',
      path: '/pages/index/index?openId=' + app.globalData.openId
    }
  }
})
