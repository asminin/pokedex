#  Pokédex Code Challenge
Single page app with PokeApi

### Live Demo
http://asminin.github.io/pokedex/app/dist/

### Core
- AngularJS (+ ui.router)
- Pure JS, HTML, CSS
- NodeJS + Gulp

### Structure
- `app/src` - developer folder
- `app/dist` - public folder

### How to run
- `$ npm install` - init all required node modules
- `$ gulp dist` - create `dist` folder from sources

### Issues
- have no idea how to get previous pokemon for a Bulbasaur. \#720 is 404. So, anyway if there is no NEXT or PREVIOUS pokemon - navigation is disabled
- only one way to load a pokemon's list - request each pokemon. I did not find another way.
- not sure what is Category and Gender on Pokemon info page. Anyway - this fields disabled if there is no data.

