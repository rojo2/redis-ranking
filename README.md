# Redis Ranking
![Travis CI](https://travis-ci.org/rojo2/redis-ranking.svg?branch=master)

````javascript
const ranking = require("redis-ranking")(redisOptions);

ranking.set("player2", 25).then(() => {
  // ... setting score for player2 succedeed
}).catch((err) => {
  // ... show error
});
```

Made with ❤ by ROJO 2 (http://rojo2.com)
