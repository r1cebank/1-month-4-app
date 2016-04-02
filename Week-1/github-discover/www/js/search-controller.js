//// Languages JSON
var languages = [
    {
        "name":"All"
    },
    {
        "name":"JavaScript"
    },
    {
        "name":"Swift"
    },
    {
        "name":"Java"
    },
    {
        "name":"Ruby"
    },
    {
        "name":"C"
    },
    {
        "name":"CSS"
    },
    {
        "name":"PHP"
    },
    {
        "name":"Python"
    },
    {
        "name":"C++"
    },
    {
        "name":"Objective-C"
    },
    {
        "name":"C#"
    },
    {
        "name":"Shell"
    },
    {
        "name":"R"
    },
    {
        "name":"CoffeeScript"
    },
    {
        "name":"Go"
    },
    {
        "name":"Perl"
    },
    {
        "name":"Scala"
    },
    {
        "name":"Lua"
    },
    {
        "name":"VimL"
    },
    {
        "name":"TeX"
    },
    {
        "name":"Clojure"
    },
    {
        "name":"Haskell"
    },
    {
        "name":"Puppet"
    },
    {
        "name":"Emacs Lisp"
    },
    {
        "name":"Erlang"
    },
    {
        "name":"Tcl"
    },
    {
        "name":"Prolog"
    }
];

angular.module('gdiscover.controllers')
.controller('searchCtl', function($scope, $state, $stateParams, $token, $localstorage, $ionicPopup, $sce, $location, $ionicPopup, $window, $http) {
    $scope.languages = languages;
    $scope.data = { };
    $scope.data.query = '';
    $scope.data.language = 'All';
    $scope.data.sort = 'Stars';

    $scope.go = function(path, params) {
        $state.go(path, params);
    };

    $scope.search = function() {
        $scope.go('tab.search/:data', {data: JSON.stringify($scope.data)})
    };
});
