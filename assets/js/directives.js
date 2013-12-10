(function(window, angular, undefined) {
  
  angular.module('directives', [])
    
    .directive('toggleChecbox', [
      function () {
        return {
          restrict: 'A',
          link:     function (scope, element, attrs) {
            element.on('click', function (ev) {
              if (element.hasClass('active'))
                element.removeClass('active')
              else
                element.addClass('active')
            });
          }
        };
      }
    ])
    
    .directive('facebookShare', [
      '$location',
      function ($location) {
        return {
          restrict: 'A',
          link:     function (scope, element, attrs) {
            var facebookSharer  = 'http://www.facebook.com/sharer.php?s=100',
                title           = attrs.title,
                url             = attrs.url,
                summary         = attrs.summary,
                image           = attrs.image;
            
            var images = image.split(',');
            
            var p = '';
            
            if (!angular.isUndefined(title)) {
              p += '&p[title]=' + title;  
            }
            
            if (!angular.isUndefined(summary)) {
              p += '&p[summary]=' + summary;  
            }
            
            if (!angular.isUndefined(url)) {
              p += '&p[url]=' + url;  
            }
            
            angular.forEach(images, function(image, index) {
              p += '&p[images][' + index + ']=' + image.trim();
            });
            
            
            var link = facebookSharer + p;
            attrs.$set('ngHref', link);
          }
        };
      }
    ])
    
    ;
  
})(window, angular);