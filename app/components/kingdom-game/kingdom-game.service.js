(function () {

  angular
    .module('kingdom')
    .service('KingdomGameService', KingdomGameService);

  function KingdomGameService($localStorage, KingdomAlgorithmsService) {
    const service = {
      turns: 100,
      board: [
        ['f', 'g', 'h', 'f', 'h', 'w', 'w', 'f'],
        ['p', 't', 'w', 'f', 'f', 't', 'f', 't'],
        ['t', 't', 'h', 's', 't', 'p', 'w', 't'],
        ['f', 'g', 'h', 'h', 'f', 'h', 'f', 's'],
        ['s', 'p', 'w', 'g', 'f', 't', 'w', 't'],
        ['g', 'p', 's', 'p', 't', 's', 'h', 'g'],
        ['t', 'f', 'f', 'h', 'g', 'g', 't', 'g'],
        ['p', 'f', 's', 't', 'w', 'h', 'p', 't']
      ],
      production: '',
      digest: digest
    };

    activate();

    return service;

    /////////////////

    function activate() {
      $localStorage.$default({
        board: [
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
          ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
        ]
      });

      service.board = $localStorage.board;
    }

    function digest() {
      KingdomAlgorithmsService.digest(service.board, {}, (board, production) => {
        service.board = board;
        service.production = production;
      });
    }

  }

})();
