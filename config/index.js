module.exports = {
  // 每页加载个数
  pageSize: 3,

  // 分类
  catalogues: [{
    name: "未分类",
    value: "0"
  }, {
    name: "社会",
    value: "1",
  }, {
    name: "色情",
    value: "2"
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
  status: [{
    name: '待续',
    value: 1
  }, {
    name: '结束',
    value: 2
  }, {
    name: '删除',
    value: 3
  }]
}