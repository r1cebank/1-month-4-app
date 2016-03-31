angular.module('gdiscover.controllers')
.controller('searchDataCtl', function($scope, $state, $stateParams, $token, $localstorage, $ionicPopup, $sce, $location, $ionicPopup, $window, $http) {
    $scope.data = { };
    $scope.$on('$ionicView.enter', function() {
        if($stateParams.data) {
            $scope.hasMoreData = true;
            $scope.page = 1;
            $scope.data = JSON.parse($stateParams.data);
            $http.get('https://api.github.com/search/repositories?q='+ $scope.data.query +
                '+language:' + $scope.data.language + '&sort=' + $scope.data.sort +
                '&page='+ $scope.page + '&per_page=20&access_token=' + $token)
            .success(function(items) {
                if(items.items.length < 1) {
                    $scope.hasMoreData = false;
                } else {
                    $scope.hasMoreData = true;
                }
                $scope.items = items.items;
            });
        }
    });
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
    $scope.loadMore = function() {
        $scope.page = $scope.page + 1;
        $http.get('https://api.github.com/search/repositories?q='+ $scope.data.query +
            '+language:' + $scope.data.language + '&sort=' + $scope.data.sort +
            '&page='+ $scope.page + '&per_page=20&access_token=' + $token)
        .success(function(items) {
            if(items.items.length < 1) {
                $scope.hasMoreData = false;
            } else {
                $scope.hasMoreData = true;
            }
            $scope.items = ($scope.items || []).concat(items.items);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.favorite = function(index) {
        console.log('Fav: ' + index);
        $scope.favorites = $localstorage.getObject('favorites');
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
    $scope.openRepoLink = function(index) {
        window.open($scope.items[index].html_url, '_blank', 'location=no');
        return false;
    };

    $scope.openAuthorLink = function(index) {
        window.open($scope.items[index].owner.html_url, '_blank', 'location=no');
        return false;
    };
});
