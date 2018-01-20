const moment = require('../libs/moment-zh-cn.js');

/**
 * 异步获取用户信息
 *
 * @param {Object} ctx
 * @param {Object} app
 */
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

/**
 * 获取当前页url参数
 */

exports.getOptions = () => {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage.options;
};

/**
 * 异常处理
 *
 * @param {Error} err
 */

exports.errHandle = err => {
  throw new Error(err.message);
}

/**
 * 格式化时间
 *
 * @param {String || Data} date
 * @param {Boolean} before
 */

exports.formatTime = (date, before) => {
  // day hour minute second
  return before
   ? moment(date).startOf('hour').fromNow()
   : moment(date).format('YYYY-MM-DD HH:mm');
}

/**
 * 首字母大写
 *
 * @param {String} str
 */
exports.firstUpperCase = str => {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}