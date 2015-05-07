(function () {
    'use strict';

    angular
        .module('kingdom.controllers')
        .controller('HomeController', HomeController);

    function HomeController() {
        this.text = 'new Hello!';
    }

})();
