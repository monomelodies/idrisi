# idrisi
MaboxGL directives for AngularJS

There are already packages for this, but I checked them out and thought I could
do better. So here it is :) It's still a work in progress; the aim is to
eventually offer a complete implementation. As it is (I've got other stuff to
do as well) I'm focussing on the functions I actually need in my own projects.

Feel free to contribute though!

## Design goals
- Implement 1-on-1 the Mapbox specification; constructor options are AngularJS
  bindings per the usual `camelCase` to `hyphen-separated` schema;
- Events can be bound prefixed with `on-`;
- When attribute names conflict (e.g. `style`) prefix with `mapbox-`;

This should in theory mean that you _only_ need the Mapbox documentation!

## About the name
"Mercator" was already taken, so I went for the famous Medieval Moroccan
cartographer [https://nl.wikipedia.org/wiki/Muhammad_al-Idrisi](Muhammad
al-Idrisi) instead.

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

You'll also need to set your `accessToken` that you got from the MapboxGL
website. The token is implemented as an angular constant which you should set
on your main application (or whatever module uses Idrisi):

```js
angular.module('myModule', [idrisi])
    .constant('accessToken', 'your access token')
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

### `idrisi-popup`
A popup for a marker. Should be contained in `idrisi-marker`. Adding the
necessary `ng-if` or whatever is up to the implementor. All contents of the
`popup` component are transcluded and used as HTML for inside the popup.

## Todo and contributing
This is far from complete; I started with the features I needed personally for a
particular project. Feel free to contribute though! Please adhere to the coding
style as used so far (I think it's pretty sensible).

