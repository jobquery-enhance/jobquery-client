app.controller('AdminOpportunitiesCtrl', ['$scope', 'Opportunity', 'Match', 'DialogueService', 'OppSetUp',
  function ($scope, Opportunity, Match, DialogueService, OppSetUp) {
    //authInterceptor
  OppSetUp.groups.then(function(data) {
    console.log(data);
    $scope.groups = data;
  });

  $scope.toggleEdit = function (attribute) {
    if (attribute.editable) { $scope.syncTags(); }
    attribute.editable = !attribute.editable;
  };

  $scope.includeAllActive = false;
  $scope.includeAllPublic = true;

  $scope.toggleC = function (attribute) {
    $scope[attribute] = !$scope[attribute];
  };

  $scope.excludingMachine = function () {
    return function (item) {
      if ( (!$scope.includeAllActive && !item.active) ||
           (!$scope.includeAllPublic && !item.approved) ){
        return false;
      } else {
        return true;
      }
    };
  };

  $scope.toggleCheckbox = function (opp, property) {
    var opportunityToUpdate = {};
    opportunityToUpdate._id = opp._id;
    opportunityToUpdate[property] = !opp[property];
    Opportunity.update(opportunityToUpdate);
  };

  $scope.updateAttendingCategory = function(opp){

    var toggleOppCategory = function(opp){

      //these are the unique _id in mongodb for the 'Attending Hiring Day', and
      //'Not Attending Hiring Day' respectively. These two categories should probably
      //be refactored at some point in time to be boolean values on each opportunity
      //rather than part of the original 'category' implementation

      if(opp.category.name === 'Attending Hiring Day'){
        var isNotAttendingDbId = '53ac93d51efb4600001c976d';
        opp.category.name = 'Not Attending Hiring Day';
        opp.category._id = isNotAttendingDbId;
      }else{
        var isAttendingDbId = '53ac93d51efb4600001c976c';
        opp.category.name = 'Attending Hiring Day';
        opp.category._id = isAttendingDbId;
      }
    };

    var toggleScopeGroupsCategory = function(opp){
      opp.attending = !opp.attending;
      if(opp.category.name === 'Attending Hiring Day'){
        var currentCategory = 'Attending Hiring Day';
        var newCategory = 'Not Attending Hiring Day';
      }else{
        var currentCategory = 'Not Attending Hiring Day';
        var newCategory = 'Attending Hiring Day';
      }

      var currentGroup = $scope.groups[currentCategory];
      for(var i = 0; i < currentGroup.length; i++){
        var opportunityInGroup = currentGroup[i];
        if(opportunityInGroup === opp){
          currentGroup.splice(i, 1);
          break;
        }
      }
      $scope.groups[newCategory].push(opp);

    };

    var toggleOppCategoryInDatabase = function(opp){
        opportunityToUpdate = {
          _id: opp._id,
          category: opp.category
        };
        Opportunity.update(opportunityToUpdate);
    };

    toggleScopeGroupsCategory(opp);
    toggleOppCategory(opp);
    toggleOppCategoryInDatabase(opp);
  };

}]);

