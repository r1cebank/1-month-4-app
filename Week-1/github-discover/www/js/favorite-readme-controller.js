angular.module('gdiscover.controllers')
.controller('readmeCtl', function($scope, $state, $stateParams, $token, $localstorage, $ionicPopup, $sce, $location, $ionicPopup, $window, $http) {
    if($stateParams.link) {
        $http.get('https://api.github.com/repos/'+ $stateParams.link +'/readme')
        .success(function(item) {
            $http.get(item.download_url)
            .success(function(readme) {
                $http.post('https://api.github.com/markdown', {
                    context: $stateParams.link,
                    mode: 'gfm',
                    text: readme
                })
                .success(function(readme) {
                    $scope.readme = $sce.trustAsHtml(readme);
                });
            });
        })
        .error(function(data, status) {
            $scope.readme = $sce.trustAsHtml('<h3>No readme avaliable</h3>');
        });
    }
});
