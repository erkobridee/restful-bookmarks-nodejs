//-----------------------------------------------------------

var BookmarkModel = (function() {

  // dependencies
  var FInterface = require('../../helpers/FInterface')
    , MySqlProvider = require('../../helpers/MySqlProvider')
    , ModelFInterface = require('../interfaces/ModelFInterface');
  
  var classDef = function() {
    FInterface.ensureImplements(this, ModelFInterface);

    var mysqldb = 'bookmarks'
      , table = 'bookmark'
      , dbconfig = {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : mysqldb
      };


    this.provider = new MySqlProvider(table, dbconfig);
  };

  classDef.prototype.list = function(cb) {
    var bookmarks = [];

    this.provider.findAll(function(err, results) {
      if(!err) bookmarks = results;

      cb(err, bookmarks);
    });
  };

  classDef.prototype.find = function(id, cb) {
    var bookmark  = "Not Found";

    this.provider.findById(id, function(err, result) {
      if(result) bookmark = result;

      cb(err, bookmark);
    });

  };

  classDef.prototype.insert = function(vo, cb) {
    var lastId;

    this.provider.insert(vo, function(err, result) {
      if(result) lastId = result.insertId;

      cb(err, lastId);
    });
  };

  classDef.prototype.update = function(id, vo, cb) {
    this.provider.update(id, vo, function(err, result) {
      if (err) cb(err, false);
      else cb(null, true);
    });

  };

  classDef.prototype.remove = function(id, cb) {
    this.provider.remove(id, function(err, result) {
      if (err) cb(err, false);
      else cb(null, true);
    });
  };

  return classDef;

})();

//-----------------------------------------------------------

module.exports = BookmarkModel;