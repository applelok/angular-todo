var app = angular.module("todoApp", []);

app.controller("TodoCtrl", function ($scope) {
  $scope.todos = [
    {text: "Build an AngularJS app.", done: false}, 
    {text: "Connect to Firebase", done: false}
  ];
  
  $scope.totalTasks = function () {
    return $scope.todos.length;
  };
  
  $scope.totalCompleted = function () {
    return _.filter($scope.todos, function (item) {
      return item.done;
    }).length;
  };
  
  $scope.remaining = function () {
    return _.filter($scope.todos, function (item) {
      return !item.done;
    }).length;
  };
  
  $scope.addTodo = function (item) {
    $scope.todos.push({text: item, done:false});
    $scope.newItem = "";
  };
  
  $scope.clearCompleted = function () {
    $scope.todos = _.filter($scope.todos, function (item) {
      return !item.done;
    });
  };
  
  $scope.removeItem = function (item) {
    $scope.todos.splice($scope.todos.indexOf(item), 1);
  }
});