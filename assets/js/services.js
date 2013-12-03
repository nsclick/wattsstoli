(function(window, angular, undefined) {
  
  angular.module('services', [])
    
    /**
     * Drinks Service
     */
    .service('Drinks', [
      function() {
        this.drinks = [
          {
            id:     1,
            name:   'guanaja paradise',
            image:  'assets/images/fguanaja.png',
            price:  5
          },
          {
            id:     2,
            name:   'thai lemonade',
            image:  'assets/images/fthai.png',
            price:  10
          },
          {
            id:     3,
            name:   'greco ras',
            image:  'assets/images/fgreco.png',
            price:  15
          },
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
          }
        ];
      }
    ])
    
    /**
     * Drink Ingredients Service
     */
    .service('DrinksIngredients', [
      'Ingredients',
      'Drinks',
      function(Ingredients, Drinks) {
        var self = this;
        this.drinksIngredients = [
          {
            id:           1,
            ingredientId: 1,
            drinkId:      1,
            qty:          30
          },
          {
            id:           2,
            ingredientId: 2,
            drinkId:      1,
            qty:          2
          },
          {
            id:           3,
            ingredientId: 3,
            drinkId:      1,
            qty:          30
          },
          {
            id:           4,
            ingredientId: 4,
            drinkId:      1,
            qty:          30
          },
          {
            id:           5,
            ingredientId: 5,
            drinkId:      2,
            qty:          3
          },
          {
            id:           6,
            ingredientId: 6,
            drinkId:      2,
            qty:          30
          },
          {
            id:           7,
            ingredientId: 7,
            drinkId:      2,
            qty:          30
          },
          {
            id:           8,
            ingredientId: 12,
            drinkId:      3,
            qty:          30
          },
          {
            id:           9,
            ingredientId: 3,
            drinkId:      3,
            qty:          30
          },
          {
            id:           10,
            ingredientId: 8,
            drinkId:      3,
            qty:          30
          },
          {
            id:           11,
            ingredientId: 9,
            drinkId:      4,
            qty:          30
          },
          {
            id:           12,
            ingredientId: 10,
            drinkId:      4,
            qty:          30
          },
          {
            id:           13,
            ingredientId: 3,
            drinkId:      4,
            qty:          30
          },
          {
            id:           14,
            ingredientId: 11,
            drinkId:      4,
            qty:          30
          },
          {
            id:           15,
            ingredientId: 10,
            drinkId:      5,
            qty:          30
          },
          {
            id:           16,
            ingredientId: 13,
            drinkId:      5,
            qty:          30
          },
          {
            id:           17,
            ingredientId: 14,
            drinkId:      5,
            qty:          30
          }
        ];
        
        // Return ingredients of a drink, given it's id
        this.seekIngredientsByDrinkId = function(drinkId) {
          var ingredients = [];
          var relations    = self.drinksIngredients.filter(function(item) {
            return item.drinkId == drinkId;
          });
          
          angular.forEach(relations, function(relation) {
            angular.forEach(Ingredients.ingredients, function(ingredient) {
              if (ingredient.id == relation.ingredientId) {
                ingredients.push({
                  Ingredient: ingredient,
                  Relation:   relation
                });
              }
            });
          });
          
          return ingredients;
        };
        
      }
    ])
    
    /**
     * Ingredients Service
     */
    .service('Ingredients', [
      function() {
        var self = this;
        this.ingredients = [
          {
            id:         1,
            name:       'frutillas',
            unit:       'gramo',
            unitPlural: 'gramos',
            maxPerUnit: 60
          },
          {
            id:         2,
            name:       'arandanos',
            unit:       '',
            unitPlural: '',
            maxPerUnit: 60
          },
          {
            id:         3,
            name:       'vodka stolichnaya',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         4,
            name:       'seleccion sabor guayaba',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         5,
            name:       'pepino',
            unit:       'rodaja',
            unitPlural: 'rodajas',
            maxPerUnit: 6
          },
          {
            id:         6,
            name:       'vodka stolichnaya blueberi',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         7,
            name:       'seleccion sabor limonada',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         8,
            name:       'seleccion sabor frambuesa',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         9,
            name:       'limon de pica',
            unit:       '',
            unitPlural: '',
            maxPerUnit: 60
          },
          {
            id:         10,
            name:       'kiwi',
            unit:       '',
            unitPlural: '',
            maxPerUnit: 60
          },
          {
            id:         11,
            name:       'seleccion sabor mango maracuya',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         12,
            name:       'limon',
            unit:       '',
            unitPlural: '',
            maxPerUnit: 60
          },
          {
            id:         13,
            name:       'vodka stolichnaya razberi',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
          },
          {
            id:         14,
            name:       'seleccion sabor mandarina',
            unit:       'lt',
            unitPlural: 'lts',
            maxPerUnit: 750
            
          }
        ];
      }
    ])
    
    /**
     * Parties
     */
    .service('Parties', [
      function() {
        var partiesSaved  = localStorage.getItem('parties');
        if (!partiesSaved) {
          localStorage.setItem('parties', angular.toJson([]));
        }
        partiesSaved  = angular.fromJson(partiesSaved);
        
        var self = this;
        this.parties = [];
        angular.extend(this.parties, partiesSaved);
        
        this.addParty = function(party) {
          var partyId = self.parties.length+1;
          party['id'] = partyId;
          var pushed  = self.parties.push(party);
          
          localStorage.setItem('parties', angular.toJson(self.parties));
          return pushed;
        };
        
        this.getPartyById = function(partyId) {
          var party;
          angular.forEach(self.parties, function(item) {
            if (item.id == partyId) {
              party = item;
            }
          });
          return party;
        }
        
        this.removePartyByIndex = function(index) {
          if (self.parties.length >= index) {
            return self.parties.splice(index, 1);
          }
          return false;
        };
      }
    ])
    
    /**
     * Recipes
     */
    .service('Recipes', [
      function() {
        this.recipes = [
          {
            id:       1,
            drinkId:  1,
            partial: 'assets/views/drinks/fguanaja.tpl.html'
          },
          {
            id:       2,
            drinkId:  2,
            partial: 'assets/views/drinks/fthai.tpl.html'
          },
          {
            id:       3,
            drinkId:  3,
            partial: 'assets/views/drinks/fgreco.tpl.html'
          },
          {
            id:       4,
            drinkId:  4,
            partial: 'assets/views/drinks/fyellow.tpl.html'
          },
          {
            id:       5,
            drinkId:  5,
            partial: 'assets/views/drinks/fsakau.tpl.html'
          }
        ];
      }
    ])
    
    /**
     * Current Party Service
     */
    .service('CurrentParty', [
      function() {
        var self = this;
        this.name = null;
        this.drinks = [];
        this.addDrink = function(drink) {
          return this.drinks.push(drink);
        };
        
        this.removeDrinkAtIndex = function(index) {
          if (self.drinks.length-1 >= index) {
            return self.drinks.splice(index, 1);
          }
          return false;
        };
        
        this.removeDrinksById = function(drinkId) {
          self.drinks = self.drinks.filter(function(drink) {
            return drink.id != drinkId;
          });
        };
        
        this.updateName = function(name) {
          this.name = name;
        };
        
        this.clean = function() {
          this.name   = '';
          this.drinks = [];
        };
        
      }
    ])
    
    ;
  
})(window, angular);