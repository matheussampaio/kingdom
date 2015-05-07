(function () {
    'use strict';

    angular
        .module('kingdom.directives')
        .directive('kingdom', Kingdom);

    function Kingdom() {
        return {
            restrict: 'E',
            templateUrl: 'templates/kingdom.html'
        };
    }

})();
