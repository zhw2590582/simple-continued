const { Toast, Tab, extend } = require('../../libs/zanui/index.js');
const util = require('../../utils/util.js');
const app = getApp();

Page(extend({}, Toast, Tab, {
  data: {
    userInfo: null,
    tab: {
      selectedId: 'continued',
      height: 45,
      list: [{
        id: 'continued',
        title: '待续'
      }, {
        id: 'popular',
        title: '热门'
      }, {
        id: 'latest',
        title: '最新'
      }, {
        id: 'discover',
        title: '发现'
      }]
    }
  },

  handleZanTabChange(e) {
    let selectedId = e.selectedId;
    this.setData({
      'tab.selectedId': selectedId
    })
  },

  onLoad(options) {
    util.pageInit(this, app);
    options.id && profile.openByShare({ id: options.id });
  },

  onShow() {
    let options = util.getOptions();
    console.log("onShow")
  },

  onPullDownRefresh() {
    console.log("onPullDownRefresh")
  },

  onReachBottom() {
    console.log("onReachBottom")
  },

  onShareAppMessage() {
    return {
      title: '用你简洁的文字来续写故事吧',
      path: '/pages/index/index?id=' + app.globalData.userInfo.objectId
    }
  }
}));
