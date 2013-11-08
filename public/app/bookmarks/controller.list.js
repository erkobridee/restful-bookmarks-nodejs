angular.module('app').controller(

  // controller name
  'BookmarksListCtrl',

  // dependencies injection
  ['$scope', 'BookmarksResource', 'PaginationService',

// controller definition
function ($scope, resource, pagination) {

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
          result.pages
        );
      }
    );
  }

  //---
  
  $scope.setPage = function() {
    if((this.n+1) != $scope.bookmarks.page) {
      pagination.setLastPage(this.n+1);
      loadData(pagination.getLastPage());
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
    loadData(pagination.getLastPage());
  }

  $scope.updatePageSizeFormSubmit = function() {
    if(!$scope.updatePageSizeInvalid($scope.pageSize))
      $scope.updatePageSize();
  }

  //---

  loadData(pagination.getLastPage());

}]);