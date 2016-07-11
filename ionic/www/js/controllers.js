myApps = angular.module('starter.controllers', ['ionic', 'ngCordova'])

  .controller('AppCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, $ionicLoading, $http, $httpParamSerializerJQLike) {

    // Form data for the login modal
    $scope.loginData = {username: '', password: '', spinner: false};

    var api_url = 'http://localhost/api/';

    /*users token*/

    $scope.Token = function () {

      var users = {
        username: $scope.loginData.username,
        password: $scope.loginData.password
      };

      // console.log($httpParamSerializerJQLike(users)); return;

      // var self = this;

      if (users.username == '' && users.password == '') {
        $scope.showAlert("Login Failed", "Your crediential is not valid!");
      }

      $http({
        method: 'POST',
        url: api_url + 'users/token',
        data: $httpParamSerializerJQLike(users),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function successCallback(response) {
        $scope.token = response;
        console.log(response);
        // $scope.showAlert("Login Success", "Welcome!");
        // $timeout(function () {
        //   $scope.closeLogin();
        // }, 1000);
      }, function errorCallback(response) {
        $scope.token = response;
        console.log(response);
      });

      $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
          'request': function (config) {
              config.headers = config.headers || {};
              if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
              }
              return config;
          },
          'responseError': function (response) {
              if (response.status === 401 || response.status === 403) {
                $location.path('/app/register');
              }
              return $q.reject(response);
          }
        };
      }]);

    };

    $scope.Users = function () {

      var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmNjcwNjBlZi1lNjE2LTRmODUtYTg5ZS04M2NlMjRlMjExMzYiLCJleHAiOjE0Njg3MzcyNTd9.IVB6wLp64WwsMrjykFQORRqcaZVnNy2-voMtmKP-dX4';

      /*users index*/

      $http({
        method: 'GET',
        url: api_url + 'users',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function successCallback(response) {
        $scope.datas = response.data.users;
        console.log($scope.datas);
      }, function errorCallback(response) {
        $scope.datas = response.data.users;
        console.log($scope.datas);
      });

    };


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.showAlert = function ($title, $template) {
      var alertPopup = $ionicPopup.alert({
        title: $title,
        template: $template
      });


    };


    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {

//    $scope.show = function() {
//        $ionicLoading.show({
//          template: 'templates/spinner.html'
//        }).then(function(){
//           console.log("The loading indicator is now displayed");
//        });
//      };

      if ($scope.loginData.username == 'admin' && $scope.loginData.password == 'admin123') {
        console.log('Doing login', $scope.loginData);
        $scope.showAlert("Login Success", "Welcome!");
        $timeout(function () {
          $scope.closeLogin();
        }, 1000);

      } else {
        $scope.showAlert("Login Failed", "Your crediential is not valid!");
      }
//      $scope.hide = function(){
//        $ionicLoading.hide().then(function(){
//           console.log("The loading indicator is now hidden");
//        });
//      };
//


    };


  })

  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [
      {title: 'Reggae', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
