angular.module('app').controller(

  // controller name
  'BookmarksListCtrl',

  // dependencies injection
  ['$scope', 'BookmarksResource', 'PaginationService',

// controller definition
function ($scope, resource, pagination) {

  console.log(pagination);
  console.log(pagination.getDefaultPageSize());
  pagination.setDefaultPageSize(2);
  console.log(pagination.getDefaultPageSize());

  //---

  $scope.showFilter = false;

  //---

  function loadData(page) {
    resource.get(
      {
        page: page,
        size: pagination.getPageSize()
      }, 
      function(result) {
        console.log(result);
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

  loadData(pagination.getLastPage());

  /*
  resource.get(null, function(result) {
    console.log(result);
    $scope.bookmarks = result;
  });
  */

}]);