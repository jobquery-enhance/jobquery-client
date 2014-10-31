app.factory('authHttpInterceptor', ['localStorageService', '$location', function (localStorageService, $location) {
   return {
     'request': function(config) {
       config.headers = config.headers || {};
       if (localStorageService.get('token')) {
         config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
       }
       if (!isTokenInDate(localStorageService) && checkAuthorizedRoutes(config.url)) {
         $location.path('/login');
       }
       return config;
     }
   };
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authHttpInterceptor');
  }]);

var checkAuthorizedRoutes = function(url){
  if(url.match(/send/g)){
    return false;
  } else if (url.match(/reset/g)) {
    return false;
  } else if (url.match(/auth/g)) {
    return false;
  } else {
    return true;
  }
};

var isTokenInDate = function (localStorageService) {
  var tokenDate = new Date(JSON.parse(localStorageService.get('token-date')));
  if (tokenDate) {
    var today = new Date();
    var timeDiff = Math.abs(today.getTime() - tokenDate.getTime());
    var diffDays = timeDiff / (1000 * 3600 * 24);
    if(diffDays > 0.25) {
      return false;
    }
  } else {
    return false;
  }
  return true;
};

app.factory('OppSetUp', ['Match', function(Match) {

  var opps = function() {
    return Match.getAll().then(function(data) {
      var groups = {};
      var allOpportunities = {};
      data.opportunities.forEach(function (oppModel) {
        var groupName = oppModel.category.name;
        var opportunity = {};
        if (!groups[groupName]) { groups[groupName] = []; }

        opportunity._id = oppModel._id;
        opportunity.category = oppModel.category;
        opportunity.groupName = groupName;
        opportunity.company = oppModel.company.name;
        opportunity.company._id = oppModel.company._id;
        opportunity.title = oppModel.jobTitle;
        opportunity.attending = groupName === 'Attending Hiring Day' ? true : false;
        opportunity.active = oppModel.active;
        opportunity.approved = oppModel.approved;
        opportunity.internalNotes =
        oppModel.internalNotes.length > 0 ? oppModel.internalNotes[0].text : null;
        opportunity.interested = 0;
        opportunity.declared = 0;

        allOpportunities[opportunity._id] = opportunity;
        groups[groupName].push(opportunity);
      });
      data.matches.forEach(function (match) {
        var oppId = match.opportunity;
        if (match.userInterest > 0) { allOpportunities[oppId].declared++; }
        if (match.userInterest > 2) { allOpportunities[oppId].interested++; }
      });
      return groups;
    });
  };

  return {
    groups: opps().then(function(data) {
      return data;
    })
  };
}]);













