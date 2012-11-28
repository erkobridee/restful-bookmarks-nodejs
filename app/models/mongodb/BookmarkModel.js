//-----------------------------------------------------------

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
;

//--- bookmark schema definition
var BookmarkSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  url: {type: String, required: true}
});

// show id virtual on response
//https://github.com/LearnBoost/mongoose/issues/1137
BookmarkSchema.set('toJSON', { getters: true });
BookmarkSchema.set('toObject', { getters: true });

//--- define bookmark model in mongoose using bookmark schema
mongoose.model('Bookmark', BookmarkSchema);

//--- connect to mongodb
mongoose.connect('mongodb://localhost/bookmark-app');

//-----------------------------------------------------------

var BookmarkModel = (function(Bookmark) {

  //---------------------------------------------------------
  function initMongoData() {
    var async = require('async');

    async.series({
      count: function(next) {
        Bookmark
          .count()
          .exec(function(err, count) {
            if(count === 0) next();
          });
      },
      insert: function(next) {
        var twitter, github, delicious, site;

        twitter = new Bookmark({
          "name": "Twitter",
          "description": "@ErkoBridee",
          "url": "https://twitter.com/erkobridee"
        });
        twitter.save();
        
        github = new Bookmark({
          "name": "GitHub",
          "description": "github/erkobridee",
          "url": "https://github.com/erkobridee"
        });
        github.save();

        delicious = new Bookmark({
          "name": "Delicious",
          "description": "delicious/erko.bridee",
          "url": "http://www.delicious.com/erko.bridee"
        });
        delicious.save();

        site = new Bookmark({
          "name": "Site",
          "description": "Site : Erko Bridee",
          "url": "http://about.erkobridee.com/"
        });
        site.save();
      }
    });

  };
  //---------------------------------------------------------

  // dependencies
  var FInterface = require('../../helpers/FInterface')
    , ModelFInterface = require('../interfaces/ModelFInterface');

  //---------------------------------------------------------

  var classDef = function() {
    FInterface.ensureImplements(this, ModelFInterface);

    initMongoData();
  };

  classDef.prototype.list = function(opts, cb) {
    var result, async, selectErr;

    async = require('async');

    result = {
      data: [],
      count: 0,
      page: 1,
      pages: 1
    };

    if(opts.page <= 0) opts.page = 1;

    async.series({
      select: function(next) {
        Bookmark
          .find()
          .limit(opts.size)
          .skip(opts.size * (opts.page-1))
          .sort('name')
          .exec(function(err, docs) {
            selectErr = err;
            result.data = docs;
            next();
          });
      },
      count: function(next) {
        if(selectErr) next();

        Bookmark
          .count()
          .exec(function(err, count) {
            result.count = count;
            result.page = opts.page;
            result.pages = Math.ceil(count / opts.size);
            next();
          });
      },
      back: function(next) {
        cb(selectErr, result);
      }
    });
  };

  classDef.prototype.find = function(id, cb) {
    Bookmark
      .findOne({_id: id})
      .exec(function(err, doc) {
        cb(err, doc);
      });
  };

  classDef.prototype.insert = function(vo, cb) {
    var bookmark = new Bookmark();

    bookmark.name = vo.name;
    bookmark.url = vo.url;
    bookmark.description = vo.description;

    bookmark.save(function(err, doc) {
      cb(err, doc)
    });
  };

  classDef.prototype.update = function(id, vo, cb) {
    Bookmark
      .update(
        {_id: id},
        { $set: {
          name: vo.name,
          description: vo.description,
          url: vo.url
        }}, function(err, doc) {
          if(err) cb(err, false);
          else cb(null, true);
        });
  };

  classDef.prototype.remove = function(id, cb) {
    Bookmark
    .findOne({_id: id})
    .remove(function(err) {
      if(err) cb(err, false);
      else cb(null, true);
    });
  };

  return classDef;

})(mongoose.model('Bookmark'));

//-----------------------------------------------------------

module.exports = BookmarkModel;