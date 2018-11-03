
"use strict";

import Navigation from './Navigation';
import Geolocate from './Geolocate';
import Attribution from './Attribution';

export default angular.module('idrisi.control', [Navigation, Geolocate, Attribution])
    .name;

