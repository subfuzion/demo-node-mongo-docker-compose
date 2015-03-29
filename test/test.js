var app = require('../app'),
    assert = require('assert'),
    request = require('supertest'),
    util = require('util'),
    MongoClient = require('mongodb').MongoClient,
    mongoUrl = util.format('mongodb://mongo:%s/demo', process.env.MONGO_PORT);

before(function(done) {
  MongoClient.connect(mongoUrl, function (err, db) {
    if (err) return done(err);

    console.log('connected to mongo');
    app.set('db', db);
    done();
  });
});

describe('basic tests', function () {
  var lastUser;

  it('should get a collection of users', function (done) {

    request(app)
        .get('/users')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, true);

          done();
        });
  });

  it('should add a user', function (done) {

    request(app)
        .post('/users')
        .send({name: 'nodester'})
        .expect(200)
        .end(function (err, res) {

          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, true);

          assert.equal(result.user.name, 'nodester');

          assert(result.user._id);

          lastUser = result.user;

          done();
        });

  });

  it('should get a user', function (done) {
    var id = lastUser._id;

    console.log(id);

    request(app)
        .get('/users/' + id)
        .expect(200)
        .end(function (err, res) {

          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, true);

          assert.equal(result.user.name, lastUser.name);

          assert.equal(result.user._id, lastUser._id);

          done();
        });
  });

  // test expected errors
  it('missing name in object: should return error (400)', function (done) {

    request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(function (err, res) {

          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, false);

          assert.equal(result.reason, 'missing user name');

          done();
        });

  });

  it('user not found: should return error (404)', function (done) {

    var id = "5517ddf4c4b1235721fd8278";

    request(app)
        .get('/users/' + id)
        .expect(404)
        .end(function (err, res) {

          if (err) return done(err);

          var result = res.body;

          assert.equal(result.success, false);

          assert.equal(result.reason, 'user id not found');

          done();
        });
  });


});

