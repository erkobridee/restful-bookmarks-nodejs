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

var data = new MockDB();

//-----------------------------------------------------------

exports.list = function() {
  var bookmarks = [];

  data.bookmarks.forEach(function(bookmark, i) {
    bookmarks.push({
      id:i,
      name: bookmark.name,
      description: bookmark.description,
      url: bookmark.url
    });
  });

  return bookmarks;
};

exports.find = function(id) {
  var vo = "Not Found";

  if(id >= 0 && id < data.bookmarks.length) {
    vo = data.bookmarks[id];
    vo.id = id;
  }

  return vo;  
}

exports.insert = function(vo) {
  data.bookmarks.push(vo);
  return vo;
};

exports.update = function(id, vo) {
  var flag = true;

  if(id >= 0 && id < data.bookmarks.length) {
    data.bookmarks[id] = vo;
  } else {
    flag = false;
  }

  return flag;
};

exports.remove = function(id) {
  var flag = true;

  if(id >= 0 && id < data.bookmarks.length) {
    data.bookmarks.splice(id, 1);
  } else {
    flag = false;
  }

  return flag;
}