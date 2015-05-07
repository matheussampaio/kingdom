(function () {
    'use strict';

    angular
        .module('kingdom.services')
        .service('KingdomGame', KingdomGame);

    function KingdomGame() {
        var game = {
            turns : 100,
            board : [
                ['W', 'S', 'G', 'G', 'T', 'G', 'W', 'G'],
                ['H', 'F', 'T', 'T', 'S', 'T', 'P', 'W'],
                ['G', 'S', 'W', 'F', 'H', 'F', 'S', 'H'],
                ['F', 'H', 'G', 'H', 'W', 'W', 'S', 'P'],
                ['H', 'G', 'G', 'H', 'H', 'G', 'W', 'S'],
                ['F', 'G', 'F', 'S', 'W', 'T', 'G', 'G'],
                ['G', 'T', 'W', 'G', 'P', 'P', 'W', 'F'],
                ['F', 'W', 'H', 'S', 'T', 'G', 'H', 'W'],
            ]
        };

        return game;
    }

})();
