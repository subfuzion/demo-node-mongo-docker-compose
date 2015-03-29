var app = require('./app'),
    debug = require('debug')('demo:server'),
    MongoClient = require('mongodb').MongoClient,
    mongoUrl = 'mongodb://localhost:27017/demo',
    port = process.env.PORT || 3000;

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

