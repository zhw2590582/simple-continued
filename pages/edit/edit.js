const API = require('../../api/index.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {

  },
  onLoad() {
    API.delStory({
      id: '5a5f034a0b61600044dc87b7'
    }, (err, data) => {
      console.log(data)
    });
  },
  onShow(){
    let options = util.getOptions();
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑故事'
      });
    }
  },
  onReady() {

  }
})
