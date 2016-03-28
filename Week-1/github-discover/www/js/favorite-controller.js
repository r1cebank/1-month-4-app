/*!
*  Favorite controller
*/

angular.module('gdiscover.controllers')
.controller('favoriteCtl', function($scope, $state, $localstorage, $sce, $location, $ionicPopup, $window, $http) {

    $scope.go = function(path) {
        $state.go(path);
    };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.favorites = $localstorage.getObject('favorites');

    $scope.favorite = function(full_name) {
        console.log('Unfav: ' + full_name);
        delete $scope.favorites[full_name];
        //  Replace the object
        $localstorage.setObject('favorites', $scope.favorites);
    }
});
