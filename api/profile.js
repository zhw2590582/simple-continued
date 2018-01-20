const AV = require('../libs/av-weapp-min.js');
const config = require('../config/index.js');
const util = require('../utils/util.js');

/**
 * 刷新用户信息
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.getUserInfo = (args, callback) => {
  var userInfo = AV.Object.createWithoutData('_User', args.id);
  userInfo.fetch().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 统计通过用户转发打开的次数
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.openByShare = (args, callback) => {
  var profile = AV.Object.createWithoutData('_User', args.id);
  profile.save().then(data => {
    data.increment('openByShare', 1);
    return data.save(null, {
      fetchWhenSave: true
    });
  }).then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 查询用户状态信息：我的故事、我的回合、我的收藏、我的评论
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.getState = (args, callback) => {
  const name = util.firstUpperCase(args.type);
  const query = new AV.Query(name);
  query.contains('ownerId', args.id);
  query.limit(config.pageSize);
  query.skip(config.pageSize * (args.page - 1));
  query.ascending('createdAt');
  query.find().then(data => {
    let toJson = data.map(item => item.toJSON());
    callback && callback(null, toJson);
  }, error => {
    callback && callback(error);
  });
}
