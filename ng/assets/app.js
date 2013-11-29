/**
 *
 */
'use strict';
(function(window, angular, undefined) {
  angular.element(document).ready(function() {
    
    angular.module('Watts', ['controllers', 'ngRoute', 'ngTouch'])
      
      .config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {
          
          // Whitelist file URIs
          // $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
          
          // $locationProvider.html5mode(true);
          
          $routeProvider
            .when('/', {
              templateUrl:  'assets/views/fecha_nacimiento.tpl.html',
              controller:   'FechaNacimientoController',
            })
            .when('/intro_app', {
              templateUrl:  'assets/views/intro_app.tpl.html',
              controller:   'IntroController'
            })
            .when('/armar_fiesta', {
              templateUrl:  'assets/views/armar_fiesta.tpl.html',
              controller:   'ArmarFiestaController'
            })
            .when('/check_fiesta', {
              templateUrl:  'assets/views/check_fiesta.tpl.html',
              controller:   'GoFiestaController'
            })
            .when('/go_fiesta', {
              templateUrl:  'assets/views/go_fiesta.tpl.html',
              controller:   'GoFiestaController'
            })
            .when('/go_fiesta_envio', {
              templateUrl:  'assets/views/go_fiesta_envio.tpl.html',
              controller:   'GoFiestaEnvioController'
            })
            .when('/mis_fiestas', {
              templateUrl:  'assets/views/mis_fiestas.tpl.html',
              controller:   'MisFiestasController'
            })
            .when('/detalle_fiesta', {
              templateUrl:  'assets/views/detalle_fiesta.tpl.html',
              controller:   'DetalleFiestaController'
            })
            .when('/ver_recetario', {
              templateUrl:  'assets/views/ver_recetario.tpl.html',
              controller:   'VerRecetarioController'
            })
            .otherwise({
              redirectTo: '/'
            })
            ;
          
        }
      ])
      
      ;
    
  
    /**
     * Angular Bootstrapping
     */
    angular.bootstrap(document, ['Watts']);
    
  });
  
})(window, angular);