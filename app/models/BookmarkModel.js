//-----------------------------------------------------------
/*
  - mock
  - mysql  >> use bookmarks.sql to create bookmarks database
  - mongdb >> mongoosejs
*/
var use = 'mock';

var Model = require('./' + use + '/BookmarkModel');

var model = new Model();

//-----------------------------------------------------------

exports.list = function(opts, cb) {
  return model.list(opts, cb);
};

exports.find = function(id, cb) {
  return model.find(id, cb);  
}

exports.insert = function(vo, cb) {
  return model.insert(vo, cb);
};

exports.update = function(id, vo, cb) {
  return model.update(id, vo, cb);
};

exports.remove = function(id, cb) {
  return model.remove(id, cb);
}

//-----------------------------------------------------------
