const redis = require("redis");

const DEFAULT_SET = "ranking";

const DEFAULT_OFFSET = 0;

const DEFAULT_MAX = 20;

module.exports = function(...args) {

  const client = redis.createClient(...args);

  return {
    score(userId, score, set = DEFAULT_SET) {
      return new Promise((resolve, reject) => {
        client
          .zadd(set, score, userId, (err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res);
          });
      });
    },
    get(offset = DEFAULT_OFFSET, max = DEFAULT_MAX, set = DEFAULT_SET) {
      return new Promise((resolve, reject) => {
        client
          .zrevrange(set, offset, offset + (max - 1), "WITHSCORES", (err, res) => {
            if (err) {
              return reject(err);
            }
            const result = [];
            for (let index = 0; index < res.length; index++) {
              if (index % 2 !== 0) {
                const id = res[index-1];
                const score = parseFloat(res[index]);
                result.push([id,score]);
              }
            }
            return resolve(result);
          });
      });
    },
    remove(userId, set = DEFAULT_SET) {
      return new Promise((resolve, reject) => {
        client
          .zrem(set, userId, (err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res);
          });
      });
    },
    clear(set = DEFAULT_SET) {
      return new Promise((resolve, reject) => {
        client
          .del(set, (err, res) => {
            if (err) {
              return reject(err);
            }
            return resolve(res);
          });
      });
    }
  };

};
