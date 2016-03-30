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

    $scope.watches = $localstorage.getObject('watches');
    $scope.favorites = $localstorage.getObject('favorites');

    $scope.page = 1;

    $http.get('https://api.github.com/users/'+ $scope.watches[0] +'/starred?page='+ $scope.page + '&per_page=20')
    .success(function(newItems) {
        newItems = newItems.map(function(item) {
            if($scope.favorites[item.full_name]) {
                item.fav = true;
            } else {
                item.fav = false;
            }
            return item;
        });
        $scope.items = newItems;
    });

    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;
        $http.get('https://api.github.com/users/'+ $scope.watches[0] +'/starred?page='+ $scope.page + '&per_page=20')
        .success(function(items) {
            console.log(items);
            $scope.items = $scope.items.concat(items);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.favorite = function(index) {
        console.log('Fav: ' + index);
        $scope.items[index].fav = !$scope.items[index].fav;
        if($scope.favorites[$scope.items[index].full_name]) {
            // Remove from list
            delete $scope.favorites[$scope.items[index].full_name];
        } else {
            $scope.favorites[$scope.items[index].full_name] = $scope.items[index];
        }
        //  Replace the object
        $localstorage.setObject('favorites', $scope.favorites);
    }

    $scope.refresh = function() {
        console.log('refreshing');
        $http.get('https://api.github.com/users/'+ $scope.watches[0] +'/starred?page=1&per_page=20')
        .success(function(newItems) {
            newItems = newItems.map(function(item) {
                if($scope.favorites[item.full_name]) {
                    item.fav = true;
                } else {
                    item.fav = false;
                }
                return item;
            });
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

    // On View load
    $scope.$on('$ionicView.enter', function(){
        $scope.favorites = $localstorage.getObject('favorites');
        $scope.items = ($scope.items || []).map(function(item) {
            if($scope.favorites[item.full_name]) {
                item.fav = true;
            } else {
                item.fav = false;
            }
            return item;
        });
    });
});
