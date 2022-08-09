const redis = require('redis');

const redisUrl = process.env.REDIS_URL;

const redisClient = redis.createClient({ url: redisUrl });
redisClient.on('error', (err) => console.log('[REDIS]', err.message));
redisClient.on('connect', () => console.log('[REDIS] Connected'));
redisClient.on('end', () => console.log('[REDIS] Connection closed'));
redisClient.on('reconnecting', () => console.log('[REDIS] Reconnecting'));
redisClient.flushdb((err) => {
  if (err) {
    console.log('[REDIS] Flushing error');
  } else {
    console.log('[REDIS] Flushed');
  }
});

module.exports = redisClient;
