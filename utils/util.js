// 异步获取用户信息
exports.pageInit = (ctx, app) => {
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

// 获取当前页url参数
exports.getOptions = () => {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage.options;
};