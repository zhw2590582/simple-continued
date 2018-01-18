const { Toast, extend } = require('../../libs/zanui/index.js');
const Story = require('../../api/story.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
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
    catalogue: '',
    catalogueIndex: 0,
    catalogues: config.catalogues.map(item => item.name),
    tag: '',
    tags: [],
    auditMode: '1',
    auditModes: config.auditModes
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
    this.showZanToast('删除成功！');
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

  // 分类选择
  bindPickerChange(e) {
    let index = e.detail.value;
    this.setData({
      catalogue: config.catalogues[index],
      catalogueIndex: index
    });
  },

  // 新增标签
  addTag() {
    let tags = this.data.tags;
    if (this.data.tag !== '' && this.data.tag.length < 5) {
      tags.push(this.data.tag);
      this.setData({
        tags: tags,
        tag: ''
      });
      this.showZanToast('添加成功！');
    } else {
      this.showZanToast('请输入5个字以内的标签！');
    }
  },

  // 删除标签
  delTag(e) {
    let index = e.target.dataset.index;
    let tags = this.data.tags;
    tags.splice(index, 1);
    this.setData({
      tags: tags
    });
    this.showZanToast('删除成功！');
  },

  // 审核模式
  _handleZanSelectChange(e) {
    let value = e.detail.value;
    this.setData({
      auditMode: value
    });
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
