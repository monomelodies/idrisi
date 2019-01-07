
"use strict";

import mapboxgl from 'mapbox-gl';
import Map from './Map';
import Layer from './Layer';
import Source from './Source';
import Marker from './Marker';
import Control from './Control';
import Popup from './Popup';

if (!window.mapboxgl) {
    window.mapboxgl = mapboxgl;
}

export default angular.module('idrisi', [Map, Layer, Source, Marker, Control, Popup])
    .run(['accessToken', accessToken => mapboxgl.accessToken = accessToken])
    .name;

