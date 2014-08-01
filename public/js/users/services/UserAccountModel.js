app.factory('UserAccountResource', ['$resource', 'SERVER_URL', function ($resource, SERVER_URL) {

  // I want to use $resource. I added a update property and the method is 'PUT',so that I can use it later
  // Because the defalt method is get, save,query, remove,delete, it has no "PUT"

  return $resource(SERVER_URL + '/public/account', null, {update: {method: 'PUT'}});
}]);

app.factory('UsersAccount', ['UserAccountResource', function (UserAccountResource) {
  var userMethods = {};
  userMethods.get = function () {

    //NOTE:UserAccountResource is a function looks like this: function f(a){D(a||{},this)}
    console.log("UserAccountResource", UserAccountResource.get());
    //Now I call get(), I need to return a promise so that I can pass it to controller and use the data in promise

    return UserAccountResource.get().$promise;
  };

  userMethods.update = function (userData) {
    return UserAccountResource.update(userData).$promise;
  };

  return userMethods;
}]);
