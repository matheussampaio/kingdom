(function () {

  /*
   * An Angular service which helps with creating recursive directives.
   * @author Mark Lagendijk
   * @license MIT
   */
  angular.module('kingdom')
    .factory('RecursionHelper', ($compile) => {
      return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered
         *         via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: (element, link) => {
          // Normalize the link parameter
          if (angular.isFunction(link)) {
            link = {
              post: link
            };
          }

          // Break the recursion loop by removing the contents
          const contents = element.contents()
            .remove();
          let compiledContents;

          return {
            pre: (link && link.pre) ? link.pre : null,
            /**
             * Compiles and re-adds the contents
             */
            post: (scope) => {
              // Compile the contents
              if (!compiledContents) {
                compiledContents = $compile(contents);
              }
              // Re-add the compiled contents to the element
              compiledContents(scope, (clone) => {
                element.append(clone);
              });

              // Call the post-linking function, if any
              if (link && link.post) {
                link.post.apply(null, arguments);
              }
            }
          };
        }
      };
    });

})();
