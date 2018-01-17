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
   * ================================== 自定义事件 ==================================
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

  // 页面展示
  onShow(){
    console.log("onShow")
  },

  // 下拉动作
  onPullDownRefresh(){
    console.log("onPullDownRefresh")
  },

  onReachBottom(){
    console.log("onReachBottom")
  },

  onShareAppMessage(){
    console.log("onShareAppMessage")
  }
})
