(function () {

  angular
    .module('kingdom')
    .component('kingdomBoard', {
      controller: KingdomBoardController,
      templateUrl: 'kingdom-board/kingdom-board.html'
    });

  function KingdomBoardController(KingdomGameService, KingdomUtilsService) {
    const vm = this;

    // vm.swap = swap;
    vm.order = KingdomUtilsService.order;
    vm.KingdomGameService = KingdomGameService;

    vm.setCells = KingdomGameService.setCells;
    vm.toggleCell = KingdomGameService.toggleCell;
    vm.isSelected = KingdomGameService.isSelected;

    ////////////////

    // function swap(y, x) {
    //   const currentIndex = vm.order.indexOf(KingdomGameService.board[y][x]);
    //   const nextIndex = (currentIndex + 1) % vm.order.length;
    //   KingdomGameService.board[y][x] = vm.order[nextIndex];
    // }

  }

})();
