const moment = require('../libs/moment-zh-cn.js');

/**
 * 格式化时间
 *
 * @param {String || Data} date
 * @param {Boolean} before
 */

module.exports = (date, before) => {
  // day hour minute second
  return before ? moment(date).startOf('hour').fromNow() : moment(date).format('YYYY-MM-DD HH:mm');
}