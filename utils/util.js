// 初始化页面必要数据：异步用户信息、url参数
const pageInit = function (ctx, app, query){
  ctx.setData({
    query: query
  });
  if (app.globalData.userInfo) {
    ctx.setData({
      userInfo: app.globalData.userInfo
    });
  } else {
    app.userInfoReady = userInfo => {
      ctx.setData({
        userInfo: userInfo
      });
    }
  }
}

module.exports = {
  pageInit
}
