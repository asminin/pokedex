angular.module('app.pages')
.directive('indexPage', function indexPage(PokemonEP, PokemonMap, $templateCache) {

	return {
		restrict: "E",
		template: $templateCache.get('js/modules/pages/index-page/index-page.html'),
		link: function(scope){
			scope.pokemons = [];
			scope.pokemonsT = [];
			scope.infScroll = false;
			scope.preloader = false;
			function getPokemonsList(lastId){
				scope.preloader = true;
				PokemonEP.getPokemonsList(lastId).then(function(data){
                    data.forEach(function(e){
                        scope.pokemons.push(PokemonMap.mapPokemonCell(e));
						scope.preloader = false;
                    })
				})
			}
			getPokemonsList(0);
			scope.loadMore = function(){
				getPokemonsList(scope.pokemons[scope.pokemons.length-1].id);
				infiniteScroll();
				scope.infScroll = true;
			}

			function infiniteScroll(){
				window.onscroll = function(ev) {
			    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			        getPokemonsList(scope.pokemons[scope.pokemons.length-1].id);
			    }
			};
			}
		}
	}
});
