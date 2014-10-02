app.controller('AdminCompaniesMonitorCtrl', ['$scope', '$http', 'SERVER_URL', '$modal', function ($scope, $http, SERVER_URL, $modal) {
  $scope.jobs;
  //used to check if there are job results
  $scope.jobResults = false;

  $scope.status = {
    isopen: false
  };


  $http({
    method: 'POST',
    url: SERVER_URL + '/api/companies/indeed',
    cache: true
  }).then(function(res) {
    // _.filter(res.data, function() {

    // });
    $scope.companies = res.data;
  });

  $scope.companyInfo = function(company) {
    $scope.jobs = $scope.companies[company];
    $scope.status.isopen = !$scope.status.isopen;
    var modalInstance = $modal.open({
      templateUrl: 'js/admin/subroutes/companies/templates/jobModal.tpl.html',
      controller: 'ModalCtrl',
      size: 'lg',
      resolve: {
        items: function () {
          return $scope.jobs;
        }
      }
    });
  };
}])
.controller('ModalCtrl', ['$scope', '$modalInstance', '$log', 'items', function($scope, $modalInstance, $log, items) {
  $log.info(items, ' items');
  $scope.items = items;

  if(items.results.length) {
    $scope.jobResults = true;
  }

  $scope.ok = function() {
    $log.info($modalInstance, '  modalInstance');
    $modalInstance.close();
  };



}]);







