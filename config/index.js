module.exports = {
  // 每页加载个数
  pageSize: 10,

  // 分类
  catalogues: [{
    name: "未分类",
    value: 0
  }, {
    name: "社会",
    value: 1,
  }, {
    name: "色情",
    value: 2
  }],

  // 审核模式
  auditModes: [{
    name: '自由回复',
    value: '1'
  }, {
    value: '2',
    name: '审核发表'
  }],

  // 故事状态
  storyStatus: [{
    name: '删除',
    value: 0
  }, {
    name: '待续',
    value: 1
  }, {
    name: '结束',
    value: 2
  }],

  // 回合状态
  roundStatus: [{
    name: '删除',
    value: 0
  }, {
    name: '正常',
    value: 1
  }],

  // 首页展示类型
  showTypes: [{
    id: 'popular',
    title: '热门'
  }, {
    id: 'latest',
    title: '最新'
  }, {
    id: 'over',
    title: '完结'
  }, {
    id: 'discover',
    title: '发现'
  }],

  // 热门数值比例
  popular: {
    view: 1,
    like: 10,
    share: 10,
    collect: 10,
    comment: 10
  }
}