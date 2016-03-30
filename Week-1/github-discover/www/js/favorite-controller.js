/*!
*  Favorite controller
*/

angular.module('gdiscover.controllers')
.controller('favoriteCtl', function($scope, $state, $localstorage, $token, $ionicPopup, $sce, $location, $ionicPopup, $window, $http) {

    $scope.go = function(path, params) {
        $state.go(path, params);
    };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.openRepoLink = function(full_name) {
        window.open($scope.favorites[full_name].html_url, '_blank', 'location=no');
        return false;
    };

    $scope.openAuthorLink = function(full_name) {
        window.open($scope.favorites[full_name].owner.html_url, '_blank', 'location=no');
        return false;
    };

    $scope.favorites = $localstorage.getObject('favorites');

    $scope.favorite = function(full_name) {
        console.log('Unfav: ' + full_name);
        delete $scope.favorites[full_name];
        //  Replace the object
        $localstorage.setObject('favorites', $scope.favorites);
    }

    // On View load
    $scope.$on('$ionicView.enter', function(){
        $scope.favorites = $localstorage.getObject('favorites');
        console.log('favorite entered');
    });
});
