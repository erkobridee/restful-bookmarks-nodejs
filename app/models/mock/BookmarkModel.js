//-----------------------------------------------------------

var MockDB = (function(){
  var MockDB = function() {};

  MockDB.prototype.bookmarks = [
    {
      "name": "Twitter",
      "description": "@ErkoBridee",
      "url": "https://twitter.com/erkobridee"
    },
    {
      "name": "GitHub",
      "description": "github/erkobridee",
      "url": "https://github.com/erkobridee"
    },
    {
      "name": "Delicious",
      "description": "delicious/erko.bridee",
      "url": "http://www.delicious.com/erko.bridee"
    },
    {
      "name": "Site",
      "description": "Site : Erko Bridee",
      "url": "http://about.erkobridee.com/"
    }
  ];

  return MockDB;
})();

var db = new MockDB();

//-----------------------------------------------------------

var BookmarkModel = (function(db) {

  // dependencies
  var FInterface = require('../../helpers/FInterface')
    , ModelFInterface = require('../interfaces/ModelFInterface');
  
  var classDef = function() {
    FInterface.ensureImplements(this, ModelFInterface);
  };

  classDef.prototype.list = function(opts, cb) {
    var result = {
      data: [],
      count: 0,
      page: 0,
      pages: 1
    };

    var bookmarks = [];

    db.bookmarks.forEach(function(bookmark, i) {
      bookmarks.push({
        id:i,
        name: bookmark.name,
        description: bookmark.description,
        url: bookmark.url
      });
    });

    //---
    var bookmarksPage = [];
    var i, count, length, skip, limit, flag;

    count = 0;
    length = bookmarks.length;
    i = skip = (opts.page * opts.size);
    limit = opts.size;

    if(i < length) {
      flag = true;
    } else {
      flag = false;
    }

    while(flag) {

      bookmarksPage.push(bookmarks[i]);

      i++; count++

      if(i<length && count<limit) {
        flag = true;
      } else {
        flag = false;
      }
    }
    
    result.count = length;
    result.data = bookmarksPage;
    result.page = opts.page;
    result.pages = Math.ceil(length / opts.size);
    //---

    //return bookmarks;

    //cb(null, bookmarks);

    cb(null, result);
  };

  classDef.prototype.find = function(id, cb) {
    var vo = "Not Found";

    if(id >= 0 && id < db.bookmarks.length) {
      vo = db.bookmarks[id];
      vo.id = id;
    }

    //return vo;

    cb(null, vo);
  };

  classDef.prototype.insert = function(vo, cb) {
    db.bookmarks.push(vo);
    
    //return vo;

    cb(null, vo);
  };

  classDef.prototype.update = function(id, vo, cb) {
    var flag = true;

    if(id >= 0 && id < db.bookmarks.length) {
      db.bookmarks[id] = vo;
    } else {
      flag = false;
    }

    //return flag;

    cb(null, flag);  
  };

  classDef.prototype.remove = function(id, cb) {
    var flag = true;

      if(id >= 0 && id < db.bookmarks.length) {
        db.bookmarks.splice(id, 1);
      } else {
        flag = false;
      }

      //return flag;

      cb(null, flag); 
  };

  return classDef;

})(db);

//-----------------------------------------------------------

module.exports = BookmarkModel;