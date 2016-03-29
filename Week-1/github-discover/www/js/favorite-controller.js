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

    $scope.openRepoLink = function(full_name) {
        window.open($scope.favorites[full_name].html_url, '_blank', 'location=no');
        return false;
    };

    $scope.openAuthorLink = function(full_name) {
        window.open($scope.favorites[full_name].owner.html_url, '_blank', 'location=no');
        return false;
    };

    $scope.openReadme = function(full_name) {
        $http.get('https://api.github.com/repos/'+ full_name +'/readme')
        .success(function(item) {
            console.log(item);
            window.open(item.html_url, '_blank', 'location=no');
        });
        return false;
    };

    $scope.favorites = $localstorage.getObject('favorites');

    $scope.favorite = function(full_name) {
        console.log('Unfav: ' + full_name);
        delete $scope.favorites[full_name];
        //  Replace the object
        $localstorage.setObject('favorites', $scope.favorites);
    }
});
