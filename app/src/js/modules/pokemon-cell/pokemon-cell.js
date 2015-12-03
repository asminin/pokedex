angular.module('app.pokemon')
.directive('pokemonCell', function pokemonCell($templateCache) {
    return {
        restrict: "E",
        template: $templateCache.get('js/modules/pokemon-cell/pokemon-cell.html'),
        scope: {
            pokemon: '='
        },
        link: function(scope) {

        }
    }
});
