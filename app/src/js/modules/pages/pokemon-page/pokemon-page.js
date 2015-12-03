angular.module('app.pokemon')
.directive('pokemonPage', function pokemonPage(PokemonEP, PokemonMap, $templateCache) {
    return {
        restrict: "E",
        template: $templateCache.get('js/modules/pages/pokemon-page/pokemon-page.html'),
        scope: {
            pokemonId: '='
        },
        link: function(scope) {
            scope.preloader = true;
            PokemonEP.getPokemon(scope.pokemonId).then(function(data){
                scope.pokemon = PokemonMap.mapPokemonPage(data);
                PokemonEP.getPokemonDescription(scope.pokemon.descriptionUrl).then(function(data){
                    scope.pokemon.description = data.description;
                    scope.preloader = false;
                });
            });

            //Prev and next Pokemon Info
            var prevPokeId = (scope.pokemonId == 1) ? 720 : Number(scope.pokemonId)-1;
            var nextPokeId = (scope.pokemonId == 720) ? 1 : Number(scope.pokemonId)+1;
            PokemonEP.getPokemon(prevPokeId).then(function(data){
                if(data){
                    scope.pokePrev = PokemonMap.mapPokemonPage(data);
                }
            });
            PokemonEP.getPokemon(nextPokeId).then(function(data){
                if(data){
                    scope.pokeNext = PokemonMap.mapPokemonPage(data);
                }
            });
        }
    }
});
