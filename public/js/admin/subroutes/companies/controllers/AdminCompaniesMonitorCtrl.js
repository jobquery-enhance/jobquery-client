app.controller('AdminCompaniesMonitorCtrl', ['$scope', '$http', 'SERVER_URL', '$modal', function ($scope, $http, SERVER_URL, $modal) {
  $scope.jobs;

  $scope.status = {
    isopen: false
  };

  $http({
    method: 'POST',
    url: SERVER_URL + '/api/companies/indeed',
    data: {keyword: 'Google'},
    cache: true
  }).then(function(res) {
    $scope.companies = res.data;
  });

  $scope.companyInfo = function(company) {
    $scope.jobs = $scope.companies[company];
    $scope.status.isopen = !$scope.status.isopen;
    console.log($scope.jobs);
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

  // $scope.openModal = function() {
  //   modalInstance = $modal.open({
  //     templateUrl: 'jobModal.tpl.html',
  //     controller: 'AdminCompaniesMonitorCtrl',
  //     size: 'lg',
  //     // resolve: {
  //     //   items: function () {
  //     //     return $scope.jobs;
  //     //   }
  //     // }
  //   });
  // };

}])
.controller('ModalCtrl', ['$scope', '$modalInstance', '$log', 'items', function($scope, $modalInstance, $log, items) {
  $log.info(items, ' items');
  $scope.items = items;

  $scope.ok = function() {
    $log.info($modalInstance);
    $modalInstance.close();
  };



}]);







