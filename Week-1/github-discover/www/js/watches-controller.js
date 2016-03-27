/*!
*  watches controller
*/

angular.module('gdiscover.controllers')
.controller('watchesCtl', function($scope, $state, $localstorage, $sce, $location, $ionicPopup, $window, $http) {

    $scope.go = function(path) {
        $state.go(path);
    };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $http.get('https://api.github.com/users/r1cebank/starred')
    .success(function(newItems) {
        $scope.items = newItems;
        console.log(newItems);
    });

    $scope.refresh = function() {
        console.log('refreshing');
        $http.get('https://api.github.com/users/r1cebank/starred')
        .success(function(newItems) {
            $scope.items = newItems;
        })
        .finally(function() {
        // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.openRepoLink = function(index) {
        window.open($scope.items[index].html_url, '_blank', 'location=no');
        return false;
    };

    $scope.openAuthorLink = function(index) {
        window.open($scope.items[index].owner.html_url, '_blank', 'location=no');
        return false;
    };
});
