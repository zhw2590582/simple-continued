const AV = require('../libs/av-weapp-min.js');

/**
 * 创建故事
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.creatStory = (args, callback) => {
  const Storys = AV.Object.extend('storys');
  const story = new Storys();
  Object.keys(args).forEach(item => {
    story.set(item, args[item]);
  });
  story.save().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 获取故事
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.getStory = (args, callback) => {
  const storys = new AV.Query('storys');
  storys.get(args.id).then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 更新故事
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.updataStory = (args, callback) => {
  const story = AV.Object.createWithoutData('storys', args.id);
  delete args.id;
  Object.keys(args).forEach(item => {
    story.set(item, args[item]);
  });
  story.save().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 删除故事
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.delStory = (args, callback) => {
  const story = AV.Object.createWithoutData('storys', args.id);
  delete args.id;
  Object.keys(args).forEach(item => {
    story.set(item, args[item]);
  });
  story.destroy().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}
