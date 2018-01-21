const { Toast, extend } = require('../../libs/zanui/index.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const story = require('../../api/story.js');
const round = require('../../api/round.js');
const app = getApp();

Page(extend({}, Toast, {
  data: {
    page: 1,
    loadEnd: false,
    nodata: false,
    story: {}
  },

  onShow() {
    let options = util.getOptions();
    this.getStory();
    this.getRound({ refresh: false });
  },

  getStory(){
    let options = util.getOptions()
    story.get({
      id: options.id
    }, (err, data) => {
      if (err) {
        this.showZanToast('获取出错了！');
        util.errHandle(err);
      } else {
        data.updatedAt = util.formatTime(data.updatedAt, true);
        this.setData({
          story: data
        });

        // 浏览量
        if (data.owner.objectId !== app.globalData.userInfo.objectId) {
          story.view({
            id: options.id
          });
        }
      }
    });
  },

  getRound(){
    let options = util.getOptions();

  },

  onPullDownRefresh(){
    this.setData({
      page: 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getStory();
      this.getRound({ refresh: true });
    });
  },

  onReachBottom(){
    this.setData({
      page: this.data.page + 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getRound({ refresh: false });
    });
  }
}));