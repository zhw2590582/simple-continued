const AV = require('../libs/av-weapp-min.js');
const config = require('../config/index.js');
const profile = require('./profile.js');

/**
 * 创建故事
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.creat = (args, callback) => {
  const Stories = AV.Object.extend('Story');
  const story = new Stories();
  Object.keys(args).forEach(item => {
    story.set(item, args[item]);
  });
  const owner = AV.Object.createWithoutData('_User', args.ownerId);
  story.set('owner', owner);
  story.save().then(data => {
    profile.addState({
      value: 1,
      id: args.ownerId,
      type: 'storyNum'
    });
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

exports.get = (args, callback) => {
  const query = new AV.Query('Story');
  query.include('owner');
  query.get(args.id).then(data => {
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

exports.updata = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
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

exports.del = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
  story.set('status', 0);
  story.save().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    profile.addState({
      value: -1,
      id: args.ownerId,
      type: 'storyNum'
    });
    callback && callback(error);
  });
}

/**
 * 故事浏览量
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.view = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
  story.save().then(data => {
    data.increment('viewNum', 1);
    data.increment('popular', config.popular.view);
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
 * 故事点赞
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.like = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
  if (args.value > 0){
    if (args.likeId){
      const like = AV.Object.createWithoutData('Like', args.likeId);
      like.set('status', 1);
      like.save();
    } else {
      const Likes = AV.Object.extend('Like');
      const like = new Likes();
      like.set('storyId', args.id);
      like.set('ownerId', args.ownerId);
      const owner = AV.Object.createWithoutData('_User', args.ownerId);
      like.set('owner', owner);
      like.set('targetStory', story);
      like.set('status', 1);
      like.save();
    }
  } else {
    const like = AV.Object.createWithoutData('Like', args.likeId);
    like.set('status', 0);
    like.save();
  }
  story.save().then(data => {
    data.increment('likeNum', args.value);
    data.increment('popular', config.popular.like);
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
 * 是否点赞
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.isLike = (args, callback) => {
  var query = new AV.Query('Like');
  query.contains('ownerId', args.ownerId);
  query.contains('storyId', args.storyId);
  query.first().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 故事回合
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.roundNum = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
  story.save().then(data => {
    data.increment('roundNum', args.value);
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
 * 故事转发
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.share = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
  story.save().then(data => {
    data.increment('shareNum', 1);
    data.increment('popular', config.popular.share);
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
 * 故事收藏
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.collect = (args, callback) => {
  const story = AV.Object.createWithoutData('Story', args.id);
  if (args.value > 0){
    if (args.collectId){
      const collect = AV.Object.createWithoutData('Collect', args.collectId);
      collect.set('status', 1);
      collect.save();
    } else {
      const Collects = AV.Object.extend('Collect');
      const collect = new Collects();
      collect.set('storyId', args.id);
      collect.set('ownerId', args.ownerId);
      const owner = AV.Object.createWithoutData('_User', args.ownerId);
      collect.set('owner', owner);
      collect.set('targetStory', story);
      collect.set('status', 1);
      collect.save();
    }
  } else {
    const collect = AV.Object.createWithoutData('Collect', args.collectId);
    collect.set('status', 0);
    collect.save();
  }
  story.save().then(data => {
    data.increment('collectNum', args.value);
    profile.addState({
      value: args.value,
      id: args.ownerId,
      type: 'collectNum'
    });
    data.increment('popular', config.popular.collect);
    return data.save(null, {
      fetchWhenSave: true
    });
  }).then(data => {
    profile.addState({
      value: 1,
      id: args.ownerId,
      type: 'collectNum'
    });
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 是否收藏
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.isCollect = (args, callback) => {
  var query = new AV.Query('Collect');
  query.contains('ownerId', args.ownerId);
  query.contains('storyId', args.storyId);
  query.first().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
    callback && callback(error);
  });
}

/**
 * 分页查询故事集: 标题、分类和标签选其一查询
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.query = (args, callback) => {
  const query = new AV.Query('Story');
  if (args.title) {
    query.contains('title', args.title);
  }

  if (args.catalogue){
    query.contains('catalogue', args.catalogue);
  }

  if (args.tag) {
    query.containsAll('tags', [args.tag]);
  }

  query.limit(config.pageSize);
  query.skip(config.pageSize * (args.page - 1));
  query.ascending('createdAt');
  query.find().then(data => {
    let toJson = data.map(item => item.toJSON());
    query.count().then(count => {
      callback && callback(null, toJson, count);
    });
  }, error => {
    callback && callback(error);
  });
}

/**
 * 按类型查询: 热门、最新、完结
 *
 * @param {Object} args
 * @param {Function} callback
 */

exports.queryType = (args, callback) => {
  const query = new AV.Query('Story');
  query.include('owner');
  if (args.type === 'popular'){
    query.equalTo('status', 1);
    query.descending('popular');
  } else if (args.type === 'latest') {
    query.equalTo('status', 1);
    query.descending('updatedAt');
  } else if (args.type === 'over') {
    query.equalTo('status', 2);
    query.descending('updatedAt');
  }

  query.limit(config.pageSize);
  query.skip(config.pageSize * (args.page - 1));
  query.find().then(data => {
    let toJson = data.map(item => item.toJSON());
    callback && callback(null, toJson);
  }, error => {
    callback && callback(error);
  });
}
