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
    // CSRF Protection.
    $http.defaults.headers.post['x-csrf-token'] = $cookies._csrf;
});


app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
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
    })
});