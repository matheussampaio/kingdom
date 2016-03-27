(function () {

  angular
    .module('kingdom')
    .service('KingdomGameService', KingdomGameService);

  function KingdomGameService(KingdomAlgorithmsService) {
    const service = {
      turns: 100,
      board: [
        ['w', 's', 'g', 'g', 't', 'g', 'w', 'g'],
        ['h', 'f', 't', 't', 's', 't', 'p', 'w'],
        ['g', 's', 'w', 'f', 'h', 'f', 's', 'h'],
        ['f', 'h', 'g', 'h', 'w', 'w', 's', 'p'],
        ['h', 'g', 'g', 'h', 'h', 'g', 'w', 's'],
        ['f', 'g', 'f', 's', 'w', 't', 'g', 'g'],
        ['g', 't', 'w', 'g', 'p', 'p', 'w', 'f'],
        ['f', 'w', 'h', 's', 't', 'g', 'h', 'w']
      ],
      production: '',
      digest: digest
    };

    return service;

    /////////////////

    function digest() {
      KingdomAlgorithmsService.digest(service.board, {}, (board, production) => {
        service.board = board;
        service.production = production;
      });
    }

  }

})();
