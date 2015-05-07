(function () {
    'use strict';

    angular.module('kingdom', [
            'ngRoute',

            'kingdom.controllers',
            'kingdom.services',
            'kingdom.directives'
        ])
        .config(config)
        .constant('version', 'GULP_APP_VERSION');

    function config($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    }

})();
