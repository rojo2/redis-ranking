const {expect} = require("chai");
const ranking = require("../ranking")();

describe("Redis Ranking", function() {

  const rankingData = [];
  for (let index = 100; index >= 0; index--) {
    rankingData.push([`player${index}`, index * 1000]);
  }

  before((done) => {
    ranking.clear().then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });

  it("should add some ranking scores", (done) => {

    const promises = [];
    const oks = [];
    for (let index = 0; index < 100; index++) {
      const [id, score] = rankingData[index];
      promises.push(ranking.score(id, score));
      oks.push(1);
    }

    Promise.all(promises).then((results) => {
      expect(results).to.be.deep.equal(oks);
      done();
    }).catch((err) => {
      done(err);
    });

  });

  it("should get the ranking first page", (done) => {

    ranking.get().then((results) => {
      expect(results).to.be.deep.equal(rankingData.slice(0,20));
      done();
    }).catch((err) => {
      done(err);
    });

  });

  it("should get the ranking second page", (done) => {

    ranking.get(20).then((results) => {
      expect(results).to.be.deep.equal(rankingData.slice(20,40));
      done();
    }).catch((err) => {
      done(err);
    });

  });

  it("should get the ranking third page", (done) => {

    ranking.get(40).then((results) => {
      expect(results).to.be.deep.equal(rankingData.slice(40,60));
      done();
    }).catch((err) => {
      done(err);
    });

  });

  it("should get a different ranking page", (done) => {

    ranking.get(20).then((results) => {
      expect(results).not.to.be.deep.equal(rankingData.slice(40,60));
      done();
    }).catch((err) => {
      done(err);
    });

  });

  it("should remove a value", (done) => {

    ranking.remove("player99").then((results) => {
      expect(results).not.to.be.deep.equal(rankingData.slice(1,21));
      done();
    }).catch((err) => {
      done(err);
    });

  });

});
