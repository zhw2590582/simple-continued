const { Toast, Tab, extend } = require('../../libs/zanui/index.js');
const util = require('../../utils/util.js');
const story = require('../../api/story.js');
const app = getApp();

Page(extend({}, Toast, Tab, {
  data: {
    items: [],
    page: 1,
    loadEnd: false,
    nodata: false,
    tab: {
      selectedId: 'popular',
      height: 45,
      scroll: true,
      fixed: true,
      list: [{
        id: 'popular',
        title: '热门'
      }, {
        id: 'latest',
        title: '最新'
      }, {
        id: 'over',
        title: '完结'
      }, {
        id: 'discover',
        title: '发现'
      }]
    }
  },

  handleZanTabChange(e) {
    let selectedId = e.selectedId;
    this.setData({
      'tab.selectedId': selectedId,
      items: [],
      page: 1,
      loadEnd: false,
      nodata: false
    }, () => {
      this.getData({ refresh: false });
    });
  },

  getData({ refresh }){
    story.queryType({
      type: this.data.tab.selectedId,
      page: this.data.page
    }, (err, data) => {
      if (err) {
        this.showZanToast('获取失败！');
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
            page: data.length === 0 ? this.data.page - 1 : this.data.page + 1,
            nodata: this.data.page === 1 && data.length === 0,
            loadEnd: data.length === 0
          });
        }, 500);
      }
    });
  },

  onLoad(options) {
    // 统计转发来源
    options.id && profile.openByShare({ id: options.id });
  },

  onShow() {
    this.getData({ refresh: false });
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getData({ refresh: true});
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
  },

  onShareAppMessage() {
    return {
      title: '用你简洁的文字来续写故事吧',
      path: '/pages/index/index?id=' + app.globalData.userInfo.objectId
    }
  }
}));
