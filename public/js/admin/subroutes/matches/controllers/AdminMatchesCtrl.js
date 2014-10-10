app.controller('AdminMatchesCtrl',
  ['$scope', '$state', '$http', 'Match', 'Opportunity', 'User', 'SERVER_URL', 'FilterService',
  function ($scope, $state, $http, Match, Opportunity, User, SERVER_URL, FilterService) {
    console.log(FilterService, ' yo');

}]);
