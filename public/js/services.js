angular.module('BookmarkService', ['ngResource'])

  .factory('BookmarkResource', function($resource) {
    
    var api = $resource(
      'rest/bookmarks/:param1/:param2',
      {
        'param1': ''
      , 'param2': ''
      , 'page': 1
      , 'size': 10
      }, {
        'update': { 'method': 'PUT' }
      }
    );

    return api;
  	  
  });

// http://docs.angularjs.org/api/ngResource.$resource