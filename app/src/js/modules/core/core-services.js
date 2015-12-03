angular.module('app.services')
    .service('PokemonEP', function (REST, PokemonMap, $q) {
        return {
            getPokemon: function(id) {
                return REST.mr('GET', 'http://pokeapi.co/api/v1/pokemon/'+id+'/');
            },
            getPokemonDescription: function(url) {
                return REST.mr('GET', 'http://pokeapi.co/'+url);
            },
            getPokemonsList: function(lastId) {
                var pokemonList = [];
                var firstId = Number(lastId) + 1;
                var lastId = firstId + 16;
                for(var i = firstId; i< lastId; i++) {
                    pokemonList.push(this.getPokemon(i));
                }
                return $q.all(pokemonList);
            }
        };
    })
    .service('PokemonMap', function(REST) {
        return {
            mapPokemonCell: function(poke) {
                return {
                    id: poke.pkdx_id,
                    num: this.mapPokemonNum(poke.pkdx_id),
                    name: poke.name,
                    types: poke.types,
                    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'+this.mapPokemonNum(poke.pkdx_id)+'.png'
                }
            },
            mapPokemonPage: function(poke) {
                return {
                    id: poke.pkdx_id,
                    num: this.mapPokemonNum(poke.pkdx_id),
                    name: poke.name,
                    types: poke.types,
                    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+this.mapPokemonNum(poke.pkdx_id)+'.png',
                    descriptionUrl: poke.descriptions[poke.descriptions.length-1].resource_uri,
                    params: {
                        height: this.mapPokemonHeight(poke.height),
                        weight: this.mapPokemonWidth(poke.weight),
                        gender: poke.male_female_ratio,
                        category: poke.species,
                        abilities: this.mapPokemonAbilities(poke.abilities)
                    },
                    stats: {
                        hp: poke.hp,
                        attack: poke.attack,
                        defense: poke.defense,
                        specialAttack: poke.sp_atk,
                        specialDefense: poke.sp_def,
                        speed: poke.speed
                    },
                    moves: poke.moves
                }
            },
            mapPokemonNum: function(id) {
                return +(id<100) ? ((id<10) ? '00'+String(id) : '0'+String(id) ) : String(id);
            },
            mapPokemonHeight: function(num){
                return Number(num)/10+' m'
            },
            mapPokemonWidth: function(num){
                return Number(num/10)+' kg'
            },
            mapPokemonAbilities: function(abilities){
                var abilArr = []
                abilities.forEach(function(e){
                    abilArr.push(e.name);
                });
                return abilArr.join(', ');
            }
        }
    })

    .service('REST', function($q, $http) {
        return {
            mr: function(method, url, data, error) {
                var e = error || 'It was some error request';
                var d = data || null;
                var q = $q.defer();
                var request = $http({
                    method: method,
                    url: url,
                    data: d
                });
                request
                    .success(function (data, status) {
                        q.resolve(data, status);
                    })
                    .error(function (data, status) {
                        q.resolve(data, status);
                    });
                return q.promise;
            }
        };
    })
