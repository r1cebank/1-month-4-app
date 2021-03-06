// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('gdiscover', ['ionic','ionic.service.core', 'ionic.service.analytics', 'gdiscover.controllers', 'gdiscover.services', 'ionic-cache-src'])
.filter('hrefToJS', function ($sce, $sanitize) {
    debugger;
    return function (text) {
        var regex = /href="([\S]+)"/g;
        var newString = $sanitize(text).replace(regex, "href=\"#\" onClick=\"window.open('$1', '_blank', 'location=yes')\"");
        return $sce.trustAsHtml(newString);
    }
})
.run(function($ionicPlatform, $ionicAnalytics, $ionicPopup, $window) {
    //  On Resume update the user object
    $ionicPlatform.on('resume', function(){
        // Run stuff on resume
    });
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $ionicAnalytics.register();

        //  Check settings
        if(!$window.localStorage['watches']) {
            $window.localStorage['watches'] = JSON.stringify(['r1cebank']);
        }
        if(!$window.localStorage['favorites']) {
            $window.localStorage['favorites'] = JSON.stringify({});
        }

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'introCtl'
    })

    // Each tab has its own nav history stack:

    .state('tab.watches', {
        url: '/watches',
        views: {
            'tab-watches': {
                templateUrl: 'templates/tab-watches.html',
                controller: 'watchesCtl'
            }
        }
    })

    .state('tab.search', {
        url: '/search',
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-search.html',
                controller: 'searchCtl'
            }
        }
    })
    .state('tab.search/:data', {
        url: '/search/:data',
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-search-data.html',
                controller: 'searchDataCtl'
            }
        }
    })
    .state('tab.settings', {
        url: '/settings',
        views: {
            'tab-settings': {
                templateUrl: 'templates/tab-settings.html',
                controller: 'settingCtl'
            }
        }
    })
    .state('tab.favorite', {
        url: '/favorite',
        views: {
            'tab-favorite': {
                templateUrl: 'templates/tab-favorite.html',
                controller: 'favoriteCtl'
            }
        }
    })
    .state('tab.favorite/:link', {
        url: '/favorite/:link',
        views: {
            'tab-favorite': {
                templateUrl: 'templates/tab-favorite-readme.html',
                controller: 'readmeCtl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/watches');

});
