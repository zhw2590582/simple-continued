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
    roundWrite: false,
    roundValue: '',
    story: {}
  },

  onShow() {
    let options = util.getOptions();
    this.getStory();
    this.getRound({ refresh: false });
  },

  getStory() {
    let options = util.getOptions()
    story.get({
      id: options.id
    }, (err, data) => {
      if (err) {
        this.showZanToast('获取出错了！');
        util.errHandle(err);
      } else {
        data.updatedAt = util.formatTime(data.updatedAt, true);
        data.catalogue = config.catalogues.find(item => item.value == data.catalogue).name;
        data.tags = data.tags.join('、');
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

  getRound() {
    let options = util.getOptions();

  },

  roundWritePopup(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      roundWrite: type
    })
  },

  roundWriteBlur(e) {
    let value = e.detail.value;
    this.setData({
      roundValue: value
    });
  },

  addRound(e) {
    let options = util.getOptions();
    setTimeout(() => {
      let content = this.data.roundValue;
      if (content == '') {
        this.showZanToast('请输入回合文字！');
        return;
      }
      round.creat({
        content: content,
        ownerId: app.globalData.userInfo.objectId,
        storyId: options.id,
      }, (err, data) => {
        if (err) {
          this.showZanToast('回复回合失败，请稍后再试！');
          util.errHandle(err);
          return;
        }
        this.showZanToast('回复回合成功！');
        this.setData({
          roundWrite: false,
          roundValue: ''
        });
        this.setData({
          page: 1,
          loadEnd: false,
          nodata: false,
        }, () => {
          this.getStory();
          this.getRound({ refresh: true });
        });
      });
    }, 100);
  },

  storyLike(e) {
    let value = e.currentTarget.dataset.value;
    let options = util.getOptions();
    story.like({
      id: options.id,
      value: value
    }, (err, data) => {
      if (err) {
        this.showZanToast('点赞失败，请稍后再试！');
        util.errHandle(err);
        return;
      }
      if (value > 0) {
        this.showZanToast('点赞成功！');
      } else {
        this.showZanToast('取消点赞成功！');
      }
    })
  },

  storyCollect(e) {
    let value = e.currentTarget.dataset.value;
    let options = util.getOptions();
    story.collect({
      id: options.id,
      value: value,
      ownerId: app.globalData.userInfo.objectId
    }, (err, data) => {
      if (err) {
        this.showZanToast('收藏失败，请稍后再试！');
        util.errHandle(err);
        return;
      }
      if (value > 0) {
        this.showZanToast('收藏成功！');
      } else {
        this.showZanToast('取消收藏成功！');
      }
    })
  },

  storyShare() {
    wx.showShareMenu();
  },

  onPullDownRefresh() {
    this.setData({
      page: 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getStory();
      this.getRound({ refresh: true });
    });
  },

  onReachBottom() {
    this.setData({
      page: this.data.page + 1,
      loadEnd: false,
      nodata: false,
    }, () => {
      this.getRound({ refresh: false });
    });
  },

  onShareAppMessage() {
    return {
      title: '故事接龙，快来用你简洁的文字来续写故事吧',
      path: '/pages/index/index?userId=' + app.globalData.userInfo.objectId
    }
  }
}));