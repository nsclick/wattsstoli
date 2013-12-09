(function(window, angular, undefined) {
  
  angular.module('directives', [])
    
    .directive('toggleChecbox', [
      function () {
        return {
          restrict: 'A',
          link:     function ($scope, $element, $attrs) {
            $element.on('click', function (ev) {
              // ev.preventDefault();
              
              console.log($scope);
              if ($element.hasClass('active'))
                $element.removeClass('active')
              else
                $element.addClass('active')
            });
          }
        };
      }
    ])
    
    ;
  
})(window, angular);