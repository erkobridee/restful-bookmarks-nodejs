//-----------------------------------------------------------

var Model = require('./mock/BookmarkModel');

var model = new Model();

//-----------------------------------------------------------

exports.list = function() {
  return model.list();
};

exports.find = function(id) {
  return model.find(id);  
}

exports.insert = function(vo) {
  return model.insert(vo);
};

exports.update = function(id, vo) {
  return model.update(id, vo);
};

exports.remove = function(id) {
  return model.remove(id);
}

//-----------------------------------------------------------
