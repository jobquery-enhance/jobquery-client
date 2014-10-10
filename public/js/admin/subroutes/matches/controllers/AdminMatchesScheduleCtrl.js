// app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'Scheduler', 'DialogueService',
//   function ($scope, $state, Match, Opportunity, User, Scheduler, DialogueService) {
  app.controller('AdminMatchesScheduleCtrl', ['$scope', '$state', 'Match', 'Opportunity', 'User', 'FilterService', 'DialogueService',
    function ($scope, $state, Match, Opportunity, User, FilterService, DialogueService) {

          $scope.grid = {
            columnDefs: FilterService.columnData,
            horizontalScroll: true,
            pageSize: '100'
           };

}]);