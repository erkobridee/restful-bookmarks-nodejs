//-----------------------------------------------------------

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
;

var keywordExtractor = require("keyword-extractor");
var extractorOptions = {
    language:"english",
    remove_digits: false,
    return_changed_case:true,
    remove_duplicates: true,
    return_chained_words: false,
};
var _ = require('lodash');

//--- bookmark schema definition
var BookmarkSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String},
  keywords: {type: String},
  url: {type: String, required: true}
});



// add a text index to the keywords array 
BookmarkSchema.index({ keywords: 'text' });

// show id virtual on response
//https://github.com/LearnBoost/mongoose/issues/1137
BookmarkSchema.set('toJSON', { getters: true });
BookmarkSchema.set('toObject', { getters: true });

//--- define bookmark model in mongoose using bookmark schema
mongoose.model('Bookmark', BookmarkSchema);

//--- connect to mongodb
//mongoose.connect('mongodb://localhost/bookmark-app');
mongoose.connect('mongodb://ravidasari:abc#123@ds155577.mlab.com:55577/chatbot');

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
        var findOpts = _.isEmpty(_.trim(opts.searchText)) ? undefined: {$text: {$search: opts.searchText}};
        var results = Bookmark
          .find(findOpts)
          .limit(opts.size)
          .skip(opts.size * (opts.page-1));
        results = _.isUndefined(findOpts) ? results.sort('name') : results;
          results
          .exec(function(err, docs) {
            if(err) {
              console.log(err);
            } else {
              selectErr = err;
              //console.log(docs);
              result.data = addRankingScore(docs, opts.searchText);;
              next();
            }
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
    var keywords = cleanKeywords(vo.keywords, extractorOptions);
    bookmark.name = vo.name;
    bookmark.url = vo.url;
    bookmark.description = vo.description;
    bookmark.keywords = keywords;

    bookmark.save(function(err, doc) {
      cb(err, doc)
    });
  };

  classDef.prototype.update = function(id, vo, cb) {
    var keywords = cleanKeywords(vo.keywords, extractorOptions);
    Bookmark
      .update(
        {_id: id},
        { $set: {
          name: vo.name,
          description: vo.description,
          keywords: keywords,
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

function addRankingScore(docs, searchText) {
  var keywords = cleanKeywords(searchText, extractorOptions);
  let newDocs = _.reduce(docs, function(results, item) {
    var newItem = _.pick(item, ['name', 'description', 'keywords', 'url', 'id']);
    newItem.score = getScore(newItem.keywords, keywords);
    results.push(newItem);
    return results;
  }, []) ;

  //console.log('After scoring: ' + newDocs)
  return _.orderBy(newDocs, ['score'], ['desc']);
}

function getScore(text, keywords){
  var count = 0;
  keywords = _.isString(keywords) ? keywords.split(' ') : keywords;
  _.forEach(keywords, function(keyword) {
    
    count += _.size(text.match(new RegExp(keyword, "g")));
  })
  //console.log('Count: ' + count)
  return count;
}

function cleanKeywords(keywords) {
  let text = '';
  if (keywords) {
    text = keywords.replace(/[^a-zA-Z 0-9_-]/g, ' '); //replace special characters
  }

  return text;
}
module.exports = BookmarkModel;