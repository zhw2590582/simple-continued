const AV = require('../libs/av-weapp-min.js');
const config = require('../config/index.js');

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