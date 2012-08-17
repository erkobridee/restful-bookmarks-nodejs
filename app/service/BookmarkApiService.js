var bookmarkModel = require('../model/BookmarkModel');


exports.getAll = function(req, res) {
  res.json( bookmarkModel.list() );
};

exports.getById = function(req, res) {
  var id = req.params.id;

  res.json( bookmarkModel.find(id) );
};

exports.insert  = function(req, res) {
  res.json( bookmarkModel.insert(req.body) );
};

exports.update = function(req, res) {
  var id = req.params.id
    , vo = req.body;

  res.json( bookmarkModel.update(id, vo) );
};

exports.remove = function(req, res) {
  var id = req.params.id;

  res.json( bookmarkModel.remove(id) );
};