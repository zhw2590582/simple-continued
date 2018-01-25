const AV = require('../libs/av-weapp-min.js');
const config = require('../config/index.js');
const story = require('./story.js');
const profile = require('./profile.js');

/**
 * 添加回合
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.creat = (args, callback) => {
  const Rounds = AV.Object.extend('Round');
  const round = new Rounds();
  Object.keys(args).forEach(item => {
    round.set(item, args[item]);
  });
  const owner = AV.Object.createWithoutData('_User', args.ownerId);
  round.set('owner', owner);
  const targetStory = AV.Object.createWithoutData('Story', args.storyId);
  round.set('targetStory', targetStory);

  round.save().then(data => {
    profile.addState({
      id: args.ownerId,
      type: 'roundNum'
    });
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 删除回合
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.del = (args, callback) => {
  const round = AV.Object.createWithoutData('Round', args.id);
  round.set('status', 0);
  round.save().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 回合点赞
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.like = (args, callback) => {
  const round = AV.Object.createWithoutData('Round', args.id);
  round.save().then(data => {
    data.increment('likeNum', args.value);
    story.like({ id: args.storyId, value: args.value });
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
 * 获取故事回合
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.get = (args, callback) => {
  const user = new AV.Query('_User');
  const query = new AV.Query('Round');
  query.include('owner');
  query.equalTo('status', 1);
  query.contains('storyId', args.id);
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