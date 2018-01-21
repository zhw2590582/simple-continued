const AV = require('./libs/av-weapp-min.js');
const profile = require('./api/profile.js');

// leancloud初始化
AV.init({
  appId: 'M4ejaG8fuUSuF8zrcy9Mjv4j-gzGzoHsz',
  appKey: '8QBzNJmYuhqwN4WzSnk3syy4',
});

App({
  // 小程序初始化并登录
  onLaunch(options) {
    this.userLogin();
    options.userId && profile.openByShare({ id: options.userId });
  },

  // 小程序启动
  onShow({ path, query }) {
    console.log(path, query)
  },

  // 用户登录
  userLogin() {
    AV.User.loginWithWeapp().then(user => {
      this.globalData.userInfo = user.toJSON();
      this.getUserSetting();
    }).catch(console.error);
  },

  // 获取用户权限
  getUserSetting() {
    wx.getSetting({
      success: res => {
        let that = this;
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  that.getUserInfo();
                },
                fail() {
                  that.userInfoReject();
                }
              })
            },
            fail() {
              that.userInfoReject();
            }
          })
        } else {
          that.getUserInfo();
        }
      }
    });
  },

  // 获取用户信息
  getUserInfo(res) {
    const user = AV.User.current();
    wx.getUserInfo({
      success: ({ userInfo }) => {
        user.set(userInfo).save().then(user => {
          this.globalData.userInfo = user.toJSON();
          this.globalData.openId = this.globalData.userInfo.authData.lc_weapp.openid;
          this.userInfoReady(this.globalData.userInfo);
        }).catch(console.error);
      }
    });
  },

  // 用户信息准备就绪
  userInfoReady(res) {
    console.log(res);
  },

  // 用户拒绝授权
  userInfoReject() {
    wx.redirectTo({
      url: '/pages/auth/auth'
    });
  },

  // 全局信息
  globalData: {
    userInfo: null,
    openId: null
  }
})