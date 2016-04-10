var app = angular.module("todoApp", []);
var todoList = [
    {id: 0,text: "Hang around with Alex", duedate: '02/05/2016', desc: 'Wherever you go, Whatever you do, i do stay with you <3', color: '#D25024', done: false},
    {id: 1,text: "Finish AngularTodo as a profolio", duedate: '02/05/2016', desc: 'Do a profolio for job reference', color: '#D25024', done: false}
  ];
var id = 2;

app.controller("taskBarController", function ($scope){
  $scope.tasks = todoList;
});
app.controller("taskWinController", function ($scope){
  $scope.todos = todoList;
  $scope.colorSet = ["#5CB85C", "#D25024", "#D9AE15"];
  $scope.selectedColor = "#5CB85C";

  $scope.addTaskViaPopup = function(){
    var item = $('#formTaskName').val();
    var duedate = $('#formTaskDate').val();
    var desc = $('#formTaskDesc').val();
    var color = $scope.selectedColor;
    var form = document.getElementById("addTaskForm");
    $scope.addTask(item, duedate, desc, color);
    $('#addTaskPopUp').modal('hide');
    form.reset();
    $('.colorpicker').children().css('display', 'none');
  }

  $scope.addTask = function(item, duedate, desc, color){
    todoList.push({id: id,text: item, duedate: duedate, desc: desc, color: color, done: false});
    id++;
  }

  $scope.selectColor = function(event, color){
    $('.colorpicker').children().css('display', 'none');
    $(event.target).children().css('display','block');
    $scope.selectedColor = color;
  }

  $scope.taskCompleted = function(event,id){
    var ele = todoList[id];
    var parent = $(event.target).closest('.task-box');
    if(!ele['done']){
      todoList[id]['done'] = true;
      parent.addClass('sample');
    }else{
      todoList[id]['done'] = false;
      parent.removeClass('sample');
    }
  }

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

});
// app.controller("TodoCtrl", function ($scope) {
//   $scope.todos = [
//     {text: "Build an AngularJS app.", done: false}, 
//     {text: "Connect to Firebase", done: false}
//   ];
  
//   $scope.totalTasks = function () {
//     return $scope.todos.length;
//   };
  
//   $scope.totalCompleted = function () {
//     return _.filter($scope.todos, function (item) {
//       return item.done;
//     }).length;
//   };
  
//   $scope.remaining = function () {
//     return _.filter($scope.todos, function (item) {
//       return !item.done;
//     }).length;
//   };
  
//   $scope.addTodo = function (item) {
//     $scope.todos.push({text: item, done:false});
//     $scope.newItem = "";
//   };
  
//   $scope.clearCompleted = function () {
//     $scope.todos = _.filter($scope.todos, function (item) {
//       return !item.done;
//     });
//   };
  
//   $scope.removeItem = function (item) {
//     $scope.todos.splice($scope.todos.indexOf(item), 1);
//   }
// });