myApps = angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal,$ionicPopup, $timeout,$ionicLoading, $http, $httpParamSerializer) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $scope.Users = function () {

        var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmNjcwNjBlZi1lNjE2LTRmODUtYTg5ZS04M2NlMjRlMjExMzYiLCJleHAiOjE0NjgwNzUwOTR9.OqCc59rB1rS0_Gy4r4UFNp7CK75EnysawDVwHGxc2kk";

        $http({
            method: 'GET',
            url: 'http://localhost/api/users',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(function successCallback(response) {
            $scope.datas = response.data.users;
            console.log($scope.apisuccess);
        }, function errorCallback(response) {
            $scope.datas = response.data.users;
            console.log($scope.apisuccess);
        });
    };

    $scope.Token = function () {

        var users = {
            username: "mike3",
            password: "test123"
        };

        var self = this;

        $http({
            method: 'POST',
            url: 'http://localhost/api/users/token',
            data: $httpParamSerializer(users),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            $scope.token = response;
            console.log(response);
        }, function errorCallback(response) {
            $scope.token = response;
            console.log(response);
        });
    };




  // Form data for the login modal
  $scope.loginData = {username: '', password: '', spinner: false};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
    
    $scope.showAlert = function($title,$template) {
       var alertPopup = $ionicPopup.alert({
         title: $title,
         template: $template
       });

      
     };
    
    
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {   
      
//    $scope.show = function() {
//        $ionicLoading.show({
//          template: 'templates/spinner.html'
//        }).then(function(){
//           console.log("The loading indicator is now displayed");
//        });
//      };
      
      if($scope.loginData.username == 'admin' && $scope.loginData.password == 'admin123'){
          console.log('Doing login', $scope.loginData);
            $scope.showAlert("Login Success","Welcome!");
          $timeout(function() {
              $scope.closeLogin();
            }, 1000);
          
      }else{
          $scope.showAlert("Login Failed","Your crediential is not valid!");
      }
//      $scope.hide = function(){
//        $ionicLoading.hide().then(function(){
//           console.log("The loading indicator is now hidden");
//        });
//      };
//      
    
    
    };
    
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
