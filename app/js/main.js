var app = angular.module('todoApp', []).service('todoJson', function ($http, $q) {

  var promise = $http.get('js/testdata.json').then(
  function success(response) {
    var data = response.data.root;
    var deferred = $q.defer();
    var todoTemp2 = [];
    for (var i = 0; i < data.length; i++) {
      var datum = data[i];
      todoTemp2.push({ id: datum.id, text: datum.text, duedate: datum.duedate, desc: datum.desc, color: datum.color, done: datum.done });
    }

    return todoTemp2;
  },

  function error(response) {
    var data = response.data;
    return data;
  });

  return promise;
}); // other stuff comes after this;

var todoList = [];
var todoTemp = [];

var isShowAsList = false;

app.controller('taskBarController', function ($scope, $http, todoJson) {
  todoJson.then(function (data) {
    var todoList = data;
    $scope.todos = todoList;
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

  $scope.toggleStat = function () {
    $('#taskbar').slideToggle(600, function () {
    //Animation complete.
      if ($('#taskbar').is(':visible')) {
        $('#toggleSwitch').text('Hide');
        $('#toggleArrow').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
      }else {
        $('#toggleSwitch').text('Show');
        $('#toggleArrow').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
      }
    });
  };
});

app.controller('taskWinController', function ($scope, todoJson) {
  var todoList = [];
  var id = todoList.length;
  todoJson.then(function (todoTemp) {
     todoList = todoTemp;
     $scope.todos = todoList;
   });

  $scope.colorSet = ['#5CB85C', '#D25024', '#D9AE15'];
  $scope.selectedColor = '#5CB85C';

  $scope.switchGridList = function ($event) {
    var boxEle = $('#task-box-container');
    var listEle = $('#task-list-container');
    if (!isShowAsList) {
      boxEle.fadeOut(1000, function () {
        boxEle.css({ display:'none' });
        listEle.fadeIn(1000);
        listEle.css('display', 'block');
        $(showFormat).text('Show as Grid');
      });

      isShowAsList = true;
    }else {
      listEle.fadeOut(1000, function () {
        listEle.css({ display:'none' });
        boxEle.fadeIn(1000);
        boxEle.css('display', 'block');
        $(showFormat).text('Show as List');
      });

      isShowAsList = false;
    }

  };

  $scope.addTaskViaPopup = function () {
    var item = $('#formTaskName').val();
    var duedate = $('#formTaskDate').val();
    var desc = $('#formTaskDesc').val();
    var color = $scope.selectedColor;
    var form = document.getElementById('addTaskForm');
    $scope.addTask(item, duedate, desc, color);
    $('#addTaskPopUp').modal('hide');
    form.reset();
    $('.colorpicker').children().css('display', 'none');
  };

  $scope.addTask = function (item, duedate, desc, color) {
    todoList.push({ id: id, text: item, duedate: duedate, desc: desc, color: color, done: false });
    id++;
  };

  $scope.selectColor = function (event, color) {
    $('.colorpicker').children().css('display', 'none');
    $(event.target).children().css('display', 'block');
    $scope.selectedColor = color;
  };

  $scope.taskCompleted = function (event, id, isBox) {
    var ele = todoList[id];
    var parent = (isBox) ? $(event.target).closest('.task-box') : $(event.target).closest('.task-list');
    if (!ele.done) {
      todoList[id].done = true;
      parent.addClass('sample');
    }else {
      todoList[id].done = false;
      parent.removeClass('sample');
    }
  };

  $scope.removeAlert = function (id){

  }

  
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