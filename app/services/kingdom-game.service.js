(function () {
    'use strict';

    angular
        .module('kingdom.services')
        .service('KingdomGameService', KingdomGameService);

    function KingdomGameService(KingdomAlgorithmsService) {
        var service = {
            'turns' : 100,
            'board' : [
                ['W', 'S', 'G', 'G', 'T', 'G', 'W', 'G'],
                ['H', 'F', 'T', 'T', 'S', 'T', 'P', 'W'],
                ['G', 'S', 'W', 'F', 'H', 'F', 'S', 'H'],
                ['F', 'H', 'G', 'H', 'W', 'W', 'S', 'P'],
                ['H', 'G', 'G', 'H', 'H', 'G', 'W', 'S'],
                ['F', 'G', 'F', 'S', 'W', 'T', 'G', 'G'],
                ['G', 'T', 'W', 'G', 'P', 'P', 'W', 'F'],
                ['F', 'W', 'H', 'S', 'T', 'G', 'H', 'W'],
            ],
            'production': '',
            'digest': digest
        };

        return service;

        //var coef = {
        //    gold: 1,
        //        wood: 1,
        //        food: 1,
        //        people: 1,
        //        sword: 1,
        //        hammer: 1,
        //        turn: 1
        //};

        function digest() {
            KingdomAlgorithmsService.digest(service.board, {}, function (board, production) {
                service.board = board;
                service.production = production;
            });
        }
    }

})();
