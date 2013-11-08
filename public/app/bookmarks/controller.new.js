angular.module('app').controller(

  // controller name
  'BookmarksNewCtrl',

  // dependencies injection
  ['$rootScope', '$scope', 'BookmarksResource', '$location',

// controller definition
function ($rootScope, $scope, resource, $location) {

  $scope.title = 'New Bookmark';

  $scope.bookmark = new resource({
    'id':0, 
    'name':'', 
    'description':'', 
    'url':''
  });

  $scope.save = function() {
    $scope.bookmark.$save(function(res) {
      $rootScope.$emit('bookmarks:add:event', 'added');
      //$location.path('/bookmark');
    });
  };

}]);