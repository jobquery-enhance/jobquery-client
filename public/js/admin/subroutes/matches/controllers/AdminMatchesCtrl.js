app.controller('AdminMatchesCtrl',
  ['$scope', '$state', '$http', 'Match', 'Opportunity', 'User', 'SERVER_URL', 'FilterService',
  function ($scope, $state, $http, Match, Opportunity, User, SERVER_URL, FilterService) {
    var schedule;
    var matches;
    FilterService.info.then(function(data) {
      console.log(data);
      schedule = data[0];
      matches = data[1];
    });

    var download = function(csvString) {
      var f = document.createElement('iframe');
      document.body.appendChild(f);
      f.src = 'data:' + 'text/csv' + ',' + encodeURIComponent(csvString);
      //remove Iframes
      setTimeout(function() {
        document.body.removeChild(f);
      }, 333);
    };

    $scope.downloadSchedule = function() {
      // FilterService.scheduleSpreadsheet.then(function(result) {
        download(schedule);
      // });
    };
    $scope.downloadMatches = function() {
      download(matches);
    };

}]);
