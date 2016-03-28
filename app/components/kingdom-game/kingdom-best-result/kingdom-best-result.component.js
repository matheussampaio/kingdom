(function () {

  angular
    .module('kingdom')
    .directive('kingdomBestResult', KingdomBestResult);

  function KingdomBestResult(RecursionHelper) {
    return {
      restrict: 'E',
      scope: {
        result: '='
      },
      templateUrl: 'kingdom-best-result/kingdom-best-result.html',
      compile: (element) => {
        return RecursionHelper.compile(element, () => {});
      }
    };
  }

})();
