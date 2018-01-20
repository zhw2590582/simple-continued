const AV = require('../libs/av-weapp-min.js');
const config = require('../config/index.js');

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
  var story = AV.Object.createWithoutData('Story', args.id);
  story.fetch().then(data => {
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
  story.destroy().then(data => {
    callback && callback(null, data.toJSON());
  }, error => {
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
    data.increment('views', 1);
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
  story.save().then(data => {
    data.increment('likes', 1);
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
    data.increment('share', 1);
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
  const user = new AV.Query('_User');
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
