app.controller('AdminMatchesCtrl',
  ['$scope', '$state', '$http', 'Match', 'Opportunity', 'User', 'SERVER_URL', 'FilterService',
  function ($scope, $state, $http, Match, Opportunity, User, SERVER_URL, FilterService) {
    FilterService.scheduleSpreadsheet.then(function(result) {
      console.log(result, 'result');
    });
}]);
