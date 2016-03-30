angular.module('gdiscover.controllers')
.controller('readmeCtl', function($scope, $state, $stateParams, $token, $localstorage, $ionicPopup, $sce, $location, $ionicPopup, $window, $http) {
    if($stateParams.link) {
        $http.get('https://api.github.com/repos/'+ $stateParams.link +'/readme')
        .success(function(item) {
            $http.get(item.download_url)
            .success(function(readme) {
                var converter = new showdown.Converter();
                $scope.readme = $sce.trustAsHtml(converter.makeHtml(readme));
                console.log($scope.readme);
            });
        })
        .error(function(data, status) {
            //  Set no readme markdown
        });
    }
});
