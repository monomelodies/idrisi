
"use strict";

import mapboxgl from 'mapbox-gl';
window.mapboxgl = mapboxgl;

import map from './Map';

export default angular.module('idrisi', [map])
    .name;

