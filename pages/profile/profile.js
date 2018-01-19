const { Toast, extend } = require('../../libs/zanui/index.js');
const profile = require('../../api/profile.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const app = getApp();

Page(extend({}, Toast, {
  data: {
    userInfo: null
  },
  onLoad(options) {
    util.pageInit(this, app);
  },
  menuTap(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
  },
  onPullDownRefresh() {
    profile.getUserInfo({
      id: app.globalData.userInfo.objectId
    }, (err, data) => {
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 1000);
      this.setData({
        userInfo: data
      });
    });
  }
}));