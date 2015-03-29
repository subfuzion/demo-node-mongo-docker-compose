var ObjectId = require('mongodb').ObjectId;

module.exports = function (db) {

  return {

    getUsers: function (callback) {

      var collection = db().collection('users');
      collection.find({}).toArray(callback);

    },

    getUser: function (id, callback) {

      var collection = db().collection('users');
      collection.findOne({ _id: ObjectId(id) }, callback);

    },

    addUser: function (user, callback) {

      if (!user.name) return callback(new Error('missing user name'));

      var collection = db().collection('users');

      collection.save(user, { w:1 }, function(err, result) {
        if (err) return callback(err);
        callback(null, result.ops[0]);
      });

    }

  };

};

