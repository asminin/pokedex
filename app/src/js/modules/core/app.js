angular.module('app', ['app.core', 'app.services', 'app.pokemon', 'app.pages' ,'ui.router', 'templates' ]);
angular.module('app.core', []);
angular.module('app.services', []);
angular.module('app.pokemon', []);
angular.module('app.pages', []);
angular.module('templates', []);

angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/index/');
        $stateProvider
            .state('index', {
                url: '/index/',
                template: '<index-page></index-page>',
            })
            .state('pokemon', {
                url: '/pokemon/',
                template: '<ui-view></ui-view>',
            })
            .state('pokemon.id', {
                url: ':id/',
                template: '<pokemon-page pokemon-id="pokemonId"></pokemon-page>',
                controller: function ($scope, $stateParams) {
                    $scope.pokemonId = $stateParams.id;
                }
            })
        });
