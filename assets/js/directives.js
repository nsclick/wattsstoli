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
    
    .directive('carousel', [
      function () {
        return {
          restrict: 'A',
          controller: [
            '$scope',
            '$timeout',
            function ($scope, $timeout) {
              var items   = [],
                  current = 0; 
              
              function cleanItem (item, removeActive) {
                removeActive = !angular.isUndefined(removeActive) ? removeActive : true;
                var klasses = ['next', 'left', 'right', 'prev'];
                if (!!removeActive) {
                  klasses.push('active');
                }
                
                angular.forEach(klasses, function (klass) {
                  item.removeClass(klass);
                });
              }
              
              /* Add Item */
              this.addItem = function (item) {
                items.push(item);
                
                if (items.length == 1) {
                  item.addClass('active');
                }
              };
              
              /* Previous */
              this.prev = function () {
                var prevIndex   = ((current - 1) < 0) ? (items.length-1) : (current-1),
                    nextIndex   = ((current + 1) >= items.length) ? 0 : current + 1,
                    prevItem    = items[prevIndex],
                    nextItem    = items[nextIndex],
                    currentItem = items[current];
                
                prevItem.addClass('prev');
                currentItem.addClass('right');
                $timeout(function () {
                  prevItem.addClass('right');
                  prevItem.on('webkitTransitionEnd', function (ev) {
                    prevItem.off('webkitTransitionEnd'); // remove event so it doesn't disturb next transition
                    $timeout(function () {
                      cleanItem(currentItem);
                      current = prevIndex;
                      prevItem.addClass('active');
                      cleanItem(prevItem, false);
                    });
                  });
                });
              };
              
              /* Next */
              this.next = function () {
                var nextIndex   = ((current + 1) >= items.length) ? 0 : current + 1,
                    prevIndex   = ((current - 1) < 0) ? (items.length-1) : (current-1),
                    nextItem    = items[nextIndex],
                    prevItem    = items[prevIndex],
                    currentItem = items[current];

                nextItem.addClass('next');
                currentItem.addClass('left');
                $timeout(function () {
                  nextItem.addClass('left');
                  nextItem.on('webkitTransitionEnd', function (ev) {
                    nextItem.off('webkitTransitionEnd'); // remove event so it doesn't disturb next transition
                    $timeout(function () {
                      cleanItem(currentItem);
                      current = nextIndex;
                      nextItem.addClass('active');
                      cleanItem(nextItem, false);
                    })
                  });
                });
              };
              
            }
          ]
        };
      }
    ])
    
    .directive('carouselItem', [
      function () {
        return {
          restrict: 'A',
          require:  '^carousel',
          link:     function (scope, element, attrs, ctrl) {
            ctrl.addItem(element);
          }
        };
      }
    ])
    
    .directive('carouselControl', [
      function () {
        return {
          restrict: 'A',
          require:  '^carousel',
          link:     function (scope, element, attrs, ctrl) {
            var direction = attrs.carouselControl;
            
            element.on('click', function (ev) {
              if (direction == 'prev') {
                ctrl.prev();
              } else {
                ctrl.next();
              }
            });
          }
        };
      }
    ])
    
    ;
  
})(window, angular);