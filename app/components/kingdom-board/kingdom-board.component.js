(function () {

  angular
    .module('kingdom')
    .component('kingdomBoard', {
      controller: KingdomBoardController,
      templateUrl: 'kingdom-board/kingdom-board.html'
    });

  function KingdomBoardController(KingdomGameService, KingdomUtilsService) {
    const vm = this;

    vm.swap = swap;
    vm.order = KingdomUtilsService.order;
    vm.KingdomGameService = KingdomGameService;

    ////////////////

    function swap(y, x) {
      const currentIndex = this.order.indexOf(KingdomGameService.board[y][x]);
      const nextIndex = (currentIndex + 1) % this.order.length;
      KingdomGameService.board[y][x] = this.order[nextIndex];
    }

  }

})();
