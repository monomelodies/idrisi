
"use strict";

import mapboxgl from 'mapbox-gl';
import Map from './Map';
import Marker from './Marker';
import Control from './Control';

export default angular.module('idrisi', [Map, Marker, Control])
    .run(['accessToken', accessToken => mapboxgl.accessToken = accessToken])
    .name;

