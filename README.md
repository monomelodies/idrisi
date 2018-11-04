# idrisi
MaboxGL directives for AngularJS

There are already packages for this, but I checked them out and thought I could
do better. So here it is :) It's still a work in progress; the aim is to
eventually offer a complete implementation. As it is (I've got other stuff to
do as well) I'm focussing on the functions I actually need in my own projects.

Feel free to contribute though!

## Installation
```sh
npm install --save idrisi
```

or

```sh
yarn add idrisi
```

## Usage
Browserify is what I personally usually use, but instructions for Webpack etc.
will be comparable:

```js
import idrisi from 'idrisi';
// Or: var idrisi = require('idrisi').default if not using ES6

angular.module('myModule', [idrisi])
    // ...
    ;
```

## Philosophy
All components are prefixed with `idrisi-`, followed by the name of the MapboxGL
class in the custom AngularJS conversion (camelCase to camel-case). All
configuration options are to be supplied as bindings. When an option conflicts
with a standard HTML attribute (e.g. `idrisi-map` and `style`) it is prefixed
with `mapbox-`. Some components require additional configuration (e.g.
`location` for controls) and these are also to be supplied as (extra) bindings.

## Components

### `idrisi-map`
The main component, and one that most other components will require.

### `idrisi-marker`
A marker on the map. If transcluded content is supplied, it is used as the
marker instead of the default blueish pin.

