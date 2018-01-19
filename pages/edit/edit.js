const { Toast, extend } = require('../../libs/zanui/index.js');
const story = require('../../api/story.js');
const util = require('../../utils/util.js');
const config = require('../../config/index.js');
const app = getApp();

Page(extend({}, Toast, {
  data: {
    id: '',
    edit: false,
    storyTitle: '',
    content: '',
    rule: '',
    rules: [],
    roundLimit: 100,
    wordLimit: 100,
    catalogue: '',
    catalogueIndex: 0,
    catalogues: config.catalogues.map(item => item.name),
    tag: '',
    tags: [],
    auditMode: '1',
    auditModes: config.auditModes
  },

  // 数据变化 -- 光标有bug
  _handleZanFieldChange(e) { },

  // 获得焦点
  _handleZanFieldFocus(e) { },

  // 失去焦点
  _handleZanFieldBlur(e) {
    let name = e.target.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]: value
    });
  },

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
      catalogue: Number.parseInt(index)
    });
  },

  // 新增标签
  addTag() {
    let tags = this.data.tags;
    if (this.data.tag !== '' && this.data.tag.length <= 5) {
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
  submit: function (e) {
    setTimeout(() => {
      if (this.data.storyTitle === '') {
        this.showZanToast('请输入标题！');
        return;
      }
      if (this.data.content === '') {
        this.showZanToast('请输入故事开头！');
        return;
      }

      let storyData = {
        id: this.data.id,
        ownerId: app.globalData.userInfo.objectId,
        storyTitle: this.data.storyTitle,
        content: this.data.content,
        rules: this.data.rules,
        roundLimit: Number.parseInt(this.data.roundLimit),
        wordLimit: Number.parseInt(this.data.wordLimit),
        catalogue: this.data.catalogue,
        tags: this.data.tags,
        auditMode: Number.parseInt(this.data.auditMode)
      }

      story.updata(storyData, (err, data) => {
        if (err) {
          this.showZanToast('更新失败！');
          util.errHandle(err);
        } else {
          this.showZanToast('更新成功！');
        }
      });
    }, 10);
  },

  // 显示
  onShow() {
    let options = util.getOptions();
    this.setData({
      id: options.id,
      edit: true
    });
    story.get({
      id: options.id
    }, (err, data) => {
      if (err){
        this.showZanToast('打开错误， 请重新打开！');
        util.errHandle(err);
      } else {
        if (!data.ownerId){
          this.showZanToast('获取错误，请重新打开！');
          setTimeout(() => {
            wx.navigateBack({ delta: 1 });
          }, 1000);
        } else {
          this.setData({
            ownerId: data.ownerId,
            storyTitle: data.storyTitle,
            content: data.content,
            rules: data.rules,
            roundLimit: data.roundLimit,
            wordLimit: data.wordLimit,
            catalogue: String(data.catalogue),
            tags: data.tags,
            auditMode: String(data.auditMode)
          });
        }
      }
    });
  }
}));
