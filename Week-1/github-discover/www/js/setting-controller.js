angular.module('gdiscover.controllers')
.controller('settingCtl', function($scope, $state, $localstorage, $token, $sce, $location, $ionicPopup, $window, $http) {

    // On View load
    $scope.$on('$ionicView.enter', function(){
        $scope.data = {};
        $scope.watches = $localstorage.getObject('watches');
        $scope.data.username = $scope.watches[0];
    });
    $scope.watchChange = function () {
        $localstorage.setObject('watches', [$scope.data.username]);
    };
});
