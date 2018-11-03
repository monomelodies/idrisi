
"use strict";

import Navigation from './Navigation';
import Geolocate from './Geolocate';
import Attribution from './Attribution';
import Scale from './Scale';
import Fullscreen from './Fullscreen';

export default angular.module('idrisi.control', [Navigation, Geolocate, Attribution, Scale, Fullscreen])
    .name;

