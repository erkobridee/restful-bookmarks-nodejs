angular.module('app').controller(

  // controller name
  'BookmarksEditCtrl',

  // dependencies injection
  ['$rootScope', '$scope', 'BookmarksResource', '$routeParams',

// controller definition
function ($rootScope, $scope, resource, $routeParams) {

  $scope.title = 'Edit Bookmark : ' + $routeParams.id;

  resource.get({id: $routeParams.id}, function(result) {
    $scope.bookmark = result;
  });

  $scope.save = function() {
    $scope.bookmark.$update({id: $routeParams.id}, function(res) {
      $rootScope.$emit('bookmarks:update:event', 'updated');
    });
  };
  
  $scope.showConfirm = false;
  
  $scope.delete = function() {
    $scope.showConfirm = true;
  };

  $scope.cancelDelete = function() {
    $scope.showConfirm = false;
  };

  $scope.destroy = function() {
    $scope.bookmark.$delete({id: $routeParams.id}, function(res) {
      $scope.showConfirm = false;
      $rootScope.$emit('bookmarks:remove:event', 'removed');
    });
  };

}]);