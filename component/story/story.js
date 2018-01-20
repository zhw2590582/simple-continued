const app = getApp();

Component({
  properties: {
    item: {
      type: Object,
      value: {},
      observer: '_propertyChange'
    }
  },

  data: {
    owner: false
  },

  methods: {
    operate(e) {
      this.triggerEvent('operate', {
        id: this.data.item.objectId,
        owner: this.data.owner
      });
    },

    _propertyChange(newVal, oldVal) {
      if (newVal.owner && newVal.owner.objectId === app.globalData.userInfo.objectId) {
        this.setData({
          owner: true
        });
      }
    }
  }
})