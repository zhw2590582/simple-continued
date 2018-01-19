const AV = require('../../libs/av-weapp-min.js');
const util = require('../../utils/util.js');
const profile = require('../../api/profile.js');
const app = getApp();

Page({
  /**
   * ================================== 响应数据 ==================================
   */

  data: {
    userInfo: null
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
  onLoad(options) {
    util.pageInit(this, app);
    options.id && profile.openByShare({ id: options.id });
  },

  // 页面展示
  onShow() {
    let options = util.getOptions();
    console.log("onShow")
  },

  // 渲染完成
  onReady(){
    console.log("onReady")
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

  // 上拉触底
  onReachBottom(){
    console.log("onReachBottom")
  },

  // 转发
  onShareAppMessage(){
    return {
      title: '用你简洁的文字来续写故事吧',
      path: '/pages/index/index?id=' + app.globalData.userInfo.objectId
    }
  }
})
