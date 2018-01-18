const { Toast, extend } = require('../../libs/zanui/index.js');
const Story = require('../../api/Story.js');
const util = require('../../utils/util.js');
const app = getApp();

// this.showZanToast('toast的内容');

Page(extend({}, Toast, {
  data: {
    id: '',
    edit: false,
    storyTitle: '',
    content: '',
    rule: '',
    rules: [],
    wordLimit: 200,
    catalogue: "catalogue",
    tags: ["标签01", "标签02", "标签03"],
    auditMode: 1
  },

  // 数据变化
  _handleZanFieldChange(e) {
    let name = e.target.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]: value
    });
  },

  // 失去焦点
  _handleZanFieldBlur({ componentId, detail }) { },

  // 获得焦点
  _handleZanFieldFocus({ componentId, detail }) { },

  // 删除规则
  delRule(e) {
    let index = e.target.dataset.index;
    let rules = this.data.rules;
    rules.splice(index, 1);
    this.setData({
      rules: rules
    });
  },

  // 添加规则
  addRule() {
    let rules = this.data.rules;
    if (this.data.rule !== '' && this.data.rule.length >= 5) {
      rules.push(this.data.rule);
      this.setData({
        rules: rules,
        rule: ''
      });
      this.showZanToast('添加成功！');
    } else {
      this.showZanToast('请输入至少5个字的规则！');
    }
  },

  // 提交表单
  formSubmit: function (e) {
    console.log(e.detail);
  },

  // 显示
  onShow() {
    let options = util.getOptions();
    if (options.id) {
      this.setData({
        id: options.id,
        edit: true
      });
    }
  },

  // 载入
  onLoad() {

  },

  // 载入就绪
  onReady() {
    if (this.data.edit) {
      wx.setNavigationBarTitle({
        title: '编辑故事'
      });
    }
  }
}));
