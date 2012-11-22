var bookmarkModel = require('../models/BookmarkModel');


exports.getAll = function(req, res) {

  bookmarkModel.list(function(err, results) {
    res.json( results );
  });

};

exports.getById = function(req, res) {
  var id = req.params.id;

  bookmarkModel.find(id, function(err, result) {
    res.json( result );
  });
};

exports.insert  = function(req, res) {
  
  bookmarkModel.insert(req.body, function(err, result) {
    res.json( result );
  });

};

exports.update = function(req, res) {
  var id = req.params.id
    , vo = req.body;

  bookmarkModel.update(id, vo, function(err, result) {
    res.json(result);
  });
};

exports.remove = function(req, res) {
  var id = req.params.id;

  bookmarkModel.remove(id, function(err, result) {
    res.json(result);
  });
};