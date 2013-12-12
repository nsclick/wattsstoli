/**
 * Watts App Controllers
 */
(function(window, angular, undefined) {
  
  angular.module('controllers', [])
    
    .controller('MainController', [
      '$scope',
      // 'Facebook',
      function($scope) {
        $scope.images = {
          size: 320
        };
        
       // $scope.login = function() {
          // console.log('login');
          // Facebook.login(function(r) {
              // console.log('Logged in: ', r);
            // }
          // );
        // };
        
        // $scope.logout = function () {
          // console.log('out');
          // Facebook.logout(function(r) {
            // console.log('logout ', r);
          // })
        // };
        
      }
    ])
    
    /****************************************************************
     * VALIDAR EDAD
     ****************************************************************/
    .controller('ValidarEdadController', [
      '$scope',
      '$location',
      function($scope, $location) {
        $scope.agreeWithTerms = false;
        $scope.rememberMe     = false;
        $scope.ageValid       = false;
        
        $scope.validateAge = function () {
          var age           = Date.parse($scope.age),
              allowed       = (18).years().ago(),
              diff          = allowed.compareTo(age);
          
          if (diff >= 0) {
            $scope.ageValid = true;
          }
        };
        
        $scope.submitForm = function () {
          if ($scope.agreeWithTerms && $scope.ageValid) {
            if ($scope.rememberMe) {
              localStorage.setItem('skipAgeValidation', 'skip');
            }
            
            $location.path('/intro_app');
          }
          
        };
      }
    ])
    
    /****************************************************************
     * INTRO APP
     ****************************************************************/
    .controller('IntroController', [
      '$scope',
      'CurrentParty',
      '$location',
      function($scope, CurrentParty, $location) {
        $scope.buildParty = function() {
          CurrentParty.clean();
          $location.path('/armar_fiesta');
        }
      }
    ])
    
    /****************************************************************
     * ARMAR FIESTA
     ****************************************************************/
    .controller('ArmarFiestaController', [
      '$scope',
      'Drinks',
      'CurrentParty',
      '$location',
      function($scope, Drinks, CurrentParty, $location) {
        $scope.drinks = angular.copy(Drinks.drinks);
        $scope.party  = CurrentParty;
        
        $scope.addDrink = function(index) {
          var drink = $scope.drinks[index];
          $scope.party.addDrink(angular.copy(drink));
        };
        
        $scope.isDisabled = function () {
          return $scope.party.drinks.length < 1;
        };
        
        $scope.goToCheck = function () {
          if ($scope.isDisabled()) {
            return;
          }
          
          $location.path('/check_fiesta');
        }
        
        $scope.goToParty = function () {
          if ($scope.isDisabled()) {
            return;
          }
          
          $location.path('/go_fiesta');
        }
        
      }
    ])
    
    /****************************************************************
     * CHECK EVENTO
     ****************************************************************/
    .controller('CheckFiestaController', [
      '$scope',
      'Drinks',
      'CurrentParty',
      '$location',
      function($scope, Drinks, CurrentParty, $location) {
        $scope.party = CurrentParty;
        $scope.drinkGroups = [];
        
        $scope.isDisabled = function () {
          return $scope.drinkGroups.length < 1;
        };
        
        $scope.goToParty = function () {
          if ($scope.isDisabled()) {
            return;
          }
          
          $location.path('/go_fiesta');
        };
        
        $scope.party.drinks = [
          {
            id:     4,
            name:   'yellow bahía',
            image:  'assets/images/fyellow.png',
            price:  20
          },
          {
            id:     5,
            name:   'sakau mandarin',
            image:  'assets/images/fsakau.png',
            price:  25
          },
          {
            id:     5,
            name:   'sakau mandarin',
            image:  'assets/images/fsakau.png',
            price:  25
          }
        ];
        CurrentParty.drinks = $scope.party.drinks;
        
        function makeDrinkGroups() {
          $scope.drinkGroups = [];
          
          angular.forEach($scope.party.drinks, function(drink) {
            var exists = false;
            angular.forEach($scope.drinkGroups, function(group) {
              if (drink.id == group.drink.id) {
                exists = true;
                group.qty += 1;
              }
            });
            
            if (!exists) {
              $scope.drinkGroups.push({
                drink:  drink,
                qty:    1
              });
            }
          });
        };
        
        makeDrinkGroups(); // Create drink groups
        
        $scope.removeDrinkGroupAtIndex = function(index) {
          var group   = $scope.drinkGroups[index],
              drinkId = $scope.drinkGroups[index]['drink']['id'];
          
          $scope.party.removeDrinksById(drinkId)
          $scope.drinkGroups.splice(index, 1);
        };
      }
    ])
    
    
    /****************************************************************
     * GoFiesta Controller
     ****************************************************************/
    .controller('GoFiestaController', [
      '$scope',
      'CurrentParty',
      'DrinksIngredients',
      'Parties',
      '$location',
      function($scope, CurrentParty, DrinksIngredients, Parties, $location) {
        $scope.party            = CurrentParty;
        $scope.ingredients      = [];
        $scope.ingredientGroups = [];
        
        $scope.isDisabled = function () {
          if (!angular.isObject($scope.party) || !angular.isString($scope.party.name)) {
            return true;
          }
          
          return $scope.party.name.trim() == '';
        };
        
        angular.forEach($scope.party.drinks, function(drink) {
          var ingredients     = DrinksIngredients.seekIngredientsByDrinkId(drink.id);
          $scope.ingredients = $scope.ingredients.concat(ingredients);
        });
        
        function makeIngredientGroups() {
          $scope.ingredientGroups = [];
          
          angular.forEach($scope.ingredients, function(ingredient) {
            var exists = false;
            angular.forEach($scope.ingredientGroups, function(group) {
              if (ingredient.Ingredient.id == group.ingredient.Ingredient.id) {
                exists = true;
                group.qty += 1;
              }
            });
            
            if (!exists) {
              $scope.ingredientGroups.push({
                ingredient: ingredient,
                qty:        1
              });
            }
          });
        };
        
        function calcQuantities() {
          angular.forEach($scope.ingredientGroups, function(group) {
            var unitsNeeded = (group.qty * group.ingredient.Relation.qty) / group.ingredient.Ingredient.maxPerUnit;
            group.unitsNeeded = Math.ceil(unitsNeeded);
          });
        };
        
        makeIngredientGroups(); // Create ingredient groups
        calcQuantities();
        
        console.log($scope.ingredientGroups);
        
        $scope.updatePartyName = function() {
          CurrentParty.updateName($scope.party.name);
        };
        
        $scope.saveParty = function() {
          Parties.addParty({
            name:   $scope.party.name,
            drinks: $scope.party.drinks
          });
          
          $location.path('/go_fiesta_envio');
        };
        
      }
    ])
    
    /****************************************************************
     * GoFiestaEnvio Controller
     ****************************************************************/
    .controller('GoFiestaEnvioController', [
      '$scope',
      function($scope) {
        
      }
    ])
    
    /****************************************************************
     * 
     ****************************************************************/
    .controller('MisFiestasController', [
      '$scope',
      'Parties',
      '$location',
      function($scope, Parties, $location) {
        $scope.parties = Parties.parties;
        
        $scope.goToParty = function(partyId) {
          console.log(partyId);
          angular.forEach($scope.parties, function (party) {
            if (party.id == partyId) {
              $location.path('/detalle_fiesta/' + partyId);
            }
          });
        };
      }
    ])
    
    /****************************************************************
     * 
     ****************************************************************/
    .controller('DetalleFiestaController', [
      '$scope',
      'DrinksIngredients',
      'party',
      function($scope, DrinksIngredients, party) {
        $scope.party            = party;
        $scope.ingredients      = [];
        $scope.ingredientGroups = [];
        $scope.drinkGroups = [];
        
        angular.forEach($scope.party.drinks, function(drink) {
          // Make drinkGroups
          var exists = false;
          angular.forEach($scope.drinkGroups, function (drinkGroup) {
            if (drinkGroup.drink.id == drink.id) {
              exists = true;
              drinkGroup.qty += 1;
            }
          });
          
          if (!exists) {
            $scope.drinkGroups.push({
              drink: drink,
              qty:   1
            });
          }
          
          // Seek for ingredients for these drinks
          var ingredients     = DrinksIngredients.seekIngredientsByDrinkId(drink.id);
          $scope.ingredients = $scope.ingredients.concat(ingredients);
        });
        
        function makeIngredientGroups() {
          $scope.ingredientGroups = [];
          
          angular.forEach($scope.ingredients, function(ingredient) {
            var exists = false;
            angular.forEach($scope.ingredientGroups, function(group) {
              if (ingredient.Ingredient.id == group.ingredient.Ingredient.id) {
                exists = true;
                group.qty += 1;
              }
            });
            
            if (!exists) {
              $scope.ingredientGroups.push({
                ingredient: ingredient,
                qty:        1
              });
            }
          });
        };
        
        function calcQuantities() {
          angular.forEach($scope.ingredientGroups, function(group) {
            console.log(group);
            var unitsNeeded = (group.qty * group.ingredient.Relation.qty) / group.ingredient.Ingredient.maxPerUnit;
            group.unitsNeeded = Math.ceil(unitsNeeded);
          });
        };
        
        makeIngredientGroups();
        calcQuantities();
        
        console.log($scope.ingredientGroups);
      }
    ])
    
    /****************************************************************
     * 
     ****************************************************************/
    .controller('VerRecetarioController', [
      '$scope',
      function($scope) {
        
      }
    ])
    
    /****************************************************************
     * VerReceta Controller
     ****************************************************************/
    .controller('VerRecetaController', [
      '$scope',
      'recipe',
      function($scope, recipe) {
        $scope.recipe = recipe;
      }
    ])
    
    /****************************************************************
     * Author Controller
     ****************************************************************/
    .controller('AuthorController', [
      '$scope',
      function($scope) {
        
      }
    ])
    
    ;
  
})(window, angular);