var app = require('./app'),
    debug = require('debug')('demo:server'),
    util = require('util'),
    port = process.env.PORT || 3000;
    MongoClient = require('mongodb').MongoClient,
    mongoUrl = util.format('mongodb://mongo:%s/demo', process.env.MONGO_PORT);

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) {
    console.error(err);
  } else {
    debug('connected to mongo');
    var server = app.listen(port, function () {
      app.set('server', server);
      app.set('db', db);
      debug('server listening on port ' + port);
    });
  }
});

