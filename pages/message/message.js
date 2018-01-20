const { Toast, Tab, extend } = require('../../libs/zanui/index.js');
const story = require('../../api/story.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const app = getApp();

Page(extend({}, Toast, Tab, {
  data: {
    tab: {
      selectedId: 'round',
      height: 45,
      list: [{
        id: 'round',
        title: '回合'
      }, {
        id: 'comment',
        title: '评论'
      }, {
        id: 'collect',
        title: '收藏'
      }, {
        id: 'like',
        title: '点赞'
      }]
    }
  },

  handleZanTabChange(e) {
    let selectedId = e.selectedId;
    this.setData({
      'tab.selectedId': selectedId
    })
  }
}));