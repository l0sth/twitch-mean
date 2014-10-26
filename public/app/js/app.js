'use strict';

var app = angular.module('twitch-mean-app', [
    'ngCookies',

    'ui.router',
    'ui.bootstrap',

    'oc.lazyLoad',

    'twitch.controllers',
    'twitch.directives',
    'twitch.factory',
    'twitch.services'
]).filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.run(function($http, $cookies) {
    // CSRF Token
    $http.defaults.headers.post['X-CSRF-Token'] = $cookies._csrf;
    $http.defaults.headers.common['X-CSRF-Token'] = $cookies._csrf;
});


app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;

    $httpProvider.defaults.xsrfHeaderName = 'x-csrf-token';
    $httpProvider.defaults.xsrfCookieName = 'x-csrf-token';

    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.responseInterceptors.push(function($q, $location) {
        return function(promise) {
            return promise.then(
                function(response) {
                    return response;
                },
                function(response) {
                    if (response.status === 401) {
                        $location.url('/login');
                    }
                    return $q.reject(response);
                }
            );
        }
    });

    var appHelper = {
        templatesDir: 'app/tpls',
        assetsDir: 'assets',
        templatePath: function(view_name) {
            return this.templatesDir + '/' + view_name + '.html';
        },
        assetPath: function(file_path) {
            return this.assetsDir + '/' + file_path;
        }
    };

    // Check if the user is logged in using the internal API.
    var checkLoggedin = function($q, $timeout, $http, $location) {
        var deferred = $q.defer();
        $http.get('/api/user').then(function(user) {
            if (user.data.username !== undefined) {
                $timeout(deferred.resolve, 0);
            } else {
                $timeout(function() {
                    deferred.reject();
                }, 0);
                $location.url('/login');
            }
        });
    };

    $urlRouterProvider.otherwise('/app/homepage');

    $stateProvider.
    state('app', {
        abstract: true,
        url: '/app',
        templateUrl: appHelper.templatePath('layout/app-body'),
        controller: function($scope, User) {
            $scope.user = User;
        }
    }).
    state('app.homepage', {
        url: '/homepage',
        templateUrl: appHelper.templatePath('homepage'),
        controller: function($scope, User) {
            $scope.user = User;

            $scope.welcome = 'Welcome, sir!';
        }
    }).
    state('app.members', {
        url: '/members',
        templateUrl: appHelper.templatePath('members'),
        controller: function($scope, User) {
            $scope.user = User;
        },
        resolve: {
            // User must be logged in to see this page.
            isLogged: checkLoggedin
        }
    }).
    state('error', {
        url: '/error',
        templateUrl: appHelper.templatePath('error'),
        controller: function() {
            //
        }
    })
});