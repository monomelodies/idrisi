
"use strict";

import mapboxgl from 'mapbox-gl';
window.mapboxgl = mapboxgl;

import map from './Map';
import marker from './Marker';

export default angular.module('idrisi', [map, marker])
    .name;

