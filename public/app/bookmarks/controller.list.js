angular.module('app').controller(

  // controller name
  'BookmarksListCtrl',

  // dependencies injection
  ['$rootScope', '$scope', '$location', 'BookmarksResource', 'PaginationService',

// controller definition
function ($rootScope, $scope, $location, resource, pagination) {

  //---

  function updateLocation() {
    $location.path('/bookmarks');
  }

  $rootScope.$on('bookmarks:add:event', function(event, value) {
    event.preventDefault(); event.stopPropagation();
    //console.log('bookmarks:add:event - ' + value);
    pagination.addCheck();
    updateLocation();
  });

  $rootScope.$on('bookmarks:update:event', function(event, value) {
    event.preventDefault(); event.stopPropagation();
    //console.log('bookmarks:add:event - ' + value);
    updateLocation();
  });

  $rootScope.$on('bookmarks:remove:event', function(event, value) {
    event.preventDefault(); event.stopPropagation();
    //console.log('bookmarks:remove:event - ' + value);
    pagination.removeCheck();
    updateLocation();
  });

  //---

  $scope.showFilter = false;

  $scope.filterBtnLabel = 'Show filter';

  $scope.showFilterBtn = function() {
    $scope.showFilter = !$scope.showFilter;
    $scope.filterBtnLabel = ($scope.showFilter ? 'Hide' : 'Show') + ' filter';
  }

  //---

  function loadData(page) {
    resource.get(
      {
        page: page,
        size: pagination.getPageSize()
      }, 
      function(result) {
        //console.log(result);
        $scope.bookmarks = result;

        pagination.updateMetainf(
          result.count,
          result.data.length,
          result.page,
          result.pages
        );
      }
    );
  }

  //---
  
  $scope.setPage = function() {
    if((this.n+1) != $scope.bookmarks.page) {
      pagination.setNextPage(this.n+1);
      loadData(pagination.getNextPage());
    }
  };

  //---

  $scope.pageSize = pagination.getPageSize();
  $scope.pageMinSize = 2;
  $scope.pageMaxSize = 50;

  $scope.updatePageSizeInvalid = function(pageSize) {
    var flag = false;

    flag = (
      pageSize === undefined || 
      pageSize === null || 
      pageSize === pagination.getPageSize() ||
      pageSize < $scope.pageMinSize ||
      pageSize > $scope.pageMaxSize
    );

    return flag;
  };

  $scope.updatePageSize = function() {
    pagination.resetPageSize($scope.pageSize);
    loadData(pagination.getNextPage());
  }

  $scope.updatePageSizeFormSubmit = function() {
    if(!$scope.updatePageSizeInvalid($scope.pageSize))
      $scope.updatePageSize();
  }

  //---

  loadData(pagination.getNextPage());

}]);