const { Toast, extend } = require('../../libs/zanui/index.js');
const profile = require('../../api/profile.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const app = getApp();

Page(extend({}, Toast, {
  data: {
    type: '',
    page: 1,
    items: []
  },
  onShow() {
    console.log('1');
    let options = util.getOptions();

    profile.getState({
      id: app.globalData.userInfo.objectId,
      type: options.type,
      page: 1
    }, (err, data) => {
      console.log(data)
      if (err) {
        this.showZanToast('获取出错了！');
        util.errHandle(err);
      } else {
        this.setData({
          items: data
        });
      }
    });

    this.setData({
      type: options.type
    }, () => {
      if (options.type === 'story'){
        wx.setNavigationBarTitle({title: '我的故事'});
      }

      if (options.type === 'round') {
        wx.setNavigationBarTitle({ title: '我的回合' });
      }

      if (options.type === 'collect') {
        wx.setNavigationBarTitle({ title: '我的收藏' });
      }

      if (options.type === 'comment') {
        wx.setNavigationBarTitle({ title: '我的评论' });
      }
    });
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh');
    profile.getState({
      id: app.globalData.userInfo.objectId,
      type: this.data.type,
      page: 1
    }, (err, data) => {
      setTimeout(() => {
        wx.stopPullDownRefresh();
      }, 1000);
      if(err){
        this.showZanToast('获取出错了！');
        util.errHandle(err);
      } else {
        this.setData({
          items: data
        });
      }
    });
  },
  onReachBottom() {
    console.log('onReachBottom');
    profile.getState({
      id: app.globalData.userInfo.objectId,
      type: this.data.type,
      page: this.data.page + 1
    }, (err, data) => {
      if (err) {
        this.showZanToast('获取出错了！');
        util.errHandle(err);
      } else {
        let items = this.data.items;
        items.concat(data);
        this.setData({
          items: items,
          page: data.length === 0 ? this.data.page : this.data.page + 1
        });
      }
    });
  },
}));