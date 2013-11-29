/**
 * Watts App Controllers
 */
(function(window, angular, undefined) {
  
  angular.module('controllers', [])
    
    .controller('MainController', [
      '$scope',
      function($scope) {
        
      }
    ])
    
    .controller('FechaNacimientoController', [
      '$scope',
      function($scope) {
        console.log('Home');
      }
    ])
    
    .controller('IntroController', [
      '$scope',
      function($scope) {
        console.log('Intro');
      }
    ])
    
    .controller('ArmarFiestaController', [
      '$scope',
      function($scope) {
        console.log('Armar Fiesta');
      }
    ])
    
    .controller('CheckFiestaController', [
      '$scope',
      function($scope) {
        console.log('Check Fiesta');
      }
    ])
    
    .controller('GoFiestaController', [
      '$scope',
      function($scope) {
        console.log('Intro');
      }
    ])
    
    .controller('GoFiestaEnvioController', [
      '$scope',
      function($scope) {
        console.log('Go Fiesta');
      }
    ])
    
    .controller('MisFiestasController', [
      '$scope',
      function($scope) {
        console.log('Mis Fiestas');
      }
    ])
    
    .controller('DetalleFiestaController', [
      '$scope',
      function($scope) {
        console.log('Detalle Fiesta');
      }
    ])
    
    .controller('VerRecetarioController', [
      '$scope',
      function($scope) {
        console.log('Ver Recetario');
      }
    ])
    
    ;
  
})(window, angular);