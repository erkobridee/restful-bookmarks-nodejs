var bookmarkModel = require('../models/BookmarkModel');

function toNumber(value) {
  if(typeof value === 'string')
    value = parseInt(value);
  return value;
}

exports.getAll = function(req, res) {
  var page, size, opts;

  page = req.query.page || 1; 
  size = req.query.size || 10;
  searchText = req.query.searchText || undefined;

  opts = {
    page: toNumber(page),
    searchText: searchText,
    size: toNumber(size)
  };
  
  bookmarkModel.list(opts, function(err, results) {
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