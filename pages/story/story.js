const { Toast, Tab, extend } = require('../../libs/zanui/index.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const story = require('../../api/story.js');
const app = getApp();

Page(extend({}, Toast, Tab, {
  data: {

  },
  onShow() {
    let options = util.getOptions();
    console.log(options.id)
  }
}));