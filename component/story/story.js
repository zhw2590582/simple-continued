Component({
  // 继承属性验证
  properties: {
    item: {
      type: Object,
      value: {},
      observer: '_propertyChange'
    }
  },

  // 内部数据
  data: {
    someData: ''
  },

  // 组件的方法
  methods: {
    customMethod() {

    },

    // 继承属性发生变化
    _propertyChange(newVal, oldVal) {
      // console.log(newVal, oldVal)
    }
  },

  // 复用机制
  behaviors: [],

  // 进入页面节点树时
  created() {

  },

  // 进入页面节点树时 ?
  attached() {

  },

  // 布局完成后
  ready() {
    this.setData({
      someData: 'someData'
    });
  },

  // 实例被移动 ?
  moved() {

  },

  // 移除时执行
  detached() {

  },

  // 组件间关系 ?
  relations() {

  },

  // 组件选项
  options: {

  }
})