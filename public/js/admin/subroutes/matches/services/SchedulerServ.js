app.factory('Scheduler', ['Opportunity', 'User', 'Match', '$q', function (Opportunity, User, Match, $q) {

  var users = FilterService.userObj;
  var opportunities = FilterService.opportunities;
  var scheduleData = [];
  var rowObj = {};

  for(var opportunity in opportunities) {


  }


  return {
    scheduleData: []
  };

}]);
