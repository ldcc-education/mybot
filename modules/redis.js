const ioRedis = require('ioredis');
const util = require('util');
const moment = require('moment-timezone');

const config = require('../config');

const RedisModule = (function () {
  const redis = new ioRedis(
  {
      port: config.redis.redisPort,
      host: config.redis.redisHost,
      password: config.redis.redisPassword,
      db: 0,
      retryStrategy: function (times) {
          const delay = Math.min(times * 2, 2000);
          console.log(util.format('[Logger]::[Redis]::[Service]::[%s]::[Retried...]',
                                    moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
          return delay;
      }
  });
  return {
    getValue: async (key) => redis.get(key).then(r => JSON.parse(r)).catch(e => e.message),
    setValue: async (key, value) => redis.set(key, JSON.stringify(value)).catch(e => e.message)
  }
})();

module.exports = RedisModule;
