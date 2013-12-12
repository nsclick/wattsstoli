(function (window, angular, undefined) {
  
  angular.module('phonegap', [])
    
    .service('phonegap.load', [
      '$document',
      '$q',
      '$timeout',
      function($document, $q, $timeout) {

        var d = $q.defer(),
            resolved = false;

        var self = this;
        this.ready = d.promise;

        $document.on('deviceready', function() {
          console.log('Resolved');
          resolved = true;
          d.resolve(window.cordova);
        });

        // Check to make sure we didn't miss the 
        // event (just in case)
        $timeout(function() {
          if (!resolved) {
            if (window.cordova) {
              d.resolve(window.cordova);
            }
          }
        }, 3000);
    }]);
  
})(window, angular);