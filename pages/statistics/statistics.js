const { Toast, extend } = require('../../libs/zanui/index.js');
const profile = require('../../api/profile.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const app = getApp();

Page(extend({}, Toast, {
  data: {
    type: '',
    page: 1,
    items: [],
    loadEnd: false,
    nodata: false
  },
  
  onShow() {
    let options = util.getOptions();
    this.getData({ refresh: true });
    this.setData({
      type: options.type
    }, () => {
      if (options.type === 'story'){
        wx.setNavigationBarTitle({title: '我的故事'});
      } else if (options.type === 'round') {
        wx.setNavigationBarTitle({ title: '我的回合' });
      } else if (options.type === 'collect') {
        wx.setNavigationBarTitle({ title: '我的收藏' });
      }
    });
  },

  getData({ refresh }) {
    let options = util.getOptions();
    profile.getState({
      id: app.globalData.userInfo.objectId,
      type: options.type,
      page: this.data.page
    }, (err, data) => {
      if (err) {
        this.showZanToast('获取出错了！');
        util.errHandle(err);
      } else {
        let items = this.data.items;
        let newData = refresh ? data : items.concat(data);
        data.forEach(item => {
          item.updatedAt = util.formatTime(item.updatedAt, true);
        });
        setTimeout(() => {
          wx.stopPullDownRefresh();
          this.setData({
            items: newData,
            page: data.length === 0 ? this.data.page - 1 : this.data.page,
            nodata: this.data.page === 1 && data.length === 0,
            loadEnd: data.length <= config.pageSize
          });
        }, 500);
      }
    });
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getData({ refresh: true });
    });
  },

  onReachBottom() {
    this.setData({
      page: this.data.page + 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getData({ refresh: false });
    });
  }
}));