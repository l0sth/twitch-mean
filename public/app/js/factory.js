'use strict';

angular.module('twitch.factory', ['ngResource']).
factory('User', function($http, $cookies) {
    var user = {};

    $http.defaults.headers.common['X-CSRF-Token'] = $cookies._csrf;

    user.whenLoggedIn = $http.get('/api/user')
        .then(function(response) {
            if (response.data.error !== undefined || response.data === '{}') {
                user.loggedIn = false;
            } else {
                if (response.data.provider !== 'twitch') {
                    user.loggedIn = false;
                } else {
                    user.loggedIn = true;
                    user.details = response.data;
                    return user;
                }
            }
        }).then;

    return user;

});