const Story = require('../../api/Story.js');
const util = require('../../utils/util.js');
const app = getApp();

Page({
  data: {
    storyTitle: "storyTitle", // 命名冲突
    content: "content",
    rules: [],
    wordLimit: 150,
    catalogue: "catalogue",
    tags: [],
    auditMode: 1
  },

  // 数据变化
  _handleZanFieldChange(e){
    let name = e.target.dataset.name;
    let value = e.detail.value;
    if (name === 'storyTitle' || name === 'content'){
      this.setData({
        [name]: value
      });
    }
  },

  // 失去焦点
  _handleZanFieldBlur({ componentId, detail }) {},

  // 获得焦点
  _handleZanFieldFocus({ componentId, detail }) {},

  // 提交表单
  formSubmit: function (e) {
    console.log(e.detail);
  },

  // 显示
  onShow(){
    let options = util.getOptions();
    if (options.id) {
      wx.setNavigationBarTitle({
        title: '编辑故事'
      });
    }
  },

  // 载入
  onLoad() {

  },

  // 载入就绪
  onReady() {

  }
})
