const Story = require('../../api/Story.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {

  },
  onLoad() {

  },
  onShow(){
    Story.query({
      page: 1
    }, (err, data, count) => {
      console.log(data, count)
    })
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
