/**
 *
 */
'use strict';
(function(window, angular, undefined) {
  angular.element(document).ready(function() {
    
    angular.module('Watts', [
      'controllers',
      'services',
      'directives',
      'ngRoute',
      'ngTouch',
      'ngAnimate',
      'facebook'
    ])
      
      .config([
        '$routeProvider',
        '$locationProvider',
        'FacebookProvider',
        function($routeProvider, $locationProvider, FacebookProvider) {
          document.addEventListener('deviceready', function () { console.log('Loaded!'); }, false);
          FacebookProvider.init('145154345631340', false); // Initialize Facebook module
          FacebookProvider.setInitCustomOption('localSDK', 'assets/js/vendor/phonegap-facebook/facebook-js-sdk.js');
          
          // Whitelist file URIs
          // $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
          
          // $locationProvider.html5mode(true);
          
          $routeProvider
            .when('/', {
              templateUrl:  'assets/views/validar_edad.tpl.html',
              controller:   'ValidarEdadController',
              resolve: {
                skipAgeValidation: [
                  '$location',
                  function ($location) {
                    if (localStorage.getItem('skipAgeValidation') == 'skip') {
                      $location.path('/intro_app');
                    }
                  }
                ]
              }
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
              controller:   'CheckFiestaController'
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
            .when('/detalle_fiesta/:partyId', {
              templateUrl:  'assets/views/detalle_fiesta.tpl.html',
              controller:   'DetalleFiestaController',
              resolve:      {
                party:      [
                  'Parties',
                  '$route',
                  function(Parties, $route) {
                    var partyId = $route.current.params.partyId;
                    var party   = Parties.getPartyById(partyId);
                    
                    return party;
                  }
                ]
              }
            })
            .when('/ver_recetario', {
              templateUrl:  'assets/views/ver_recetario.tpl.html',
              controller:   'VerRecetarioController'
            })
            .when('/ver_receta/:drinkId', {
              templateUrl:  'assets/views/ver_receta.tpl.html',
              controller:   'VerRecetaController',
              resolve:      {
                recipe: [
                  'Recipes',
                  '$route',
                  function(Recipes, $route) {
                    var recipe;
                    angular.forEach(Recipes.recipes, function(item) {
                      if (item.drinkId == $route.current.params.drinkId) {
                        recipe = item;
                      }
                    });
                    
                    return recipe;
                  }
                ]
              }
            })
            .when('/author', {
              templateUrl:  'assets/views/author.tpl.html',
              controller:   'AuthorController'
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