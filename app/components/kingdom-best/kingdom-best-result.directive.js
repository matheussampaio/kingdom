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
      template: `<div class="indent" ng-repeat="(key, value) in result">
                           {{key}} : Step = {{value.result}}
                           <kingdom-best-result result="value.child"></kingdom-best-result>
                       </div>`,
      compile: function (element) {
        return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
        });
      }
    };
  }

})();
