
"use strict";

import Navigation from './Navigation';
import Geolocate from './Geolocate';
import Attribution from './Attribution';
import Scale from './Scale';

export default angular.module('idrisi.control', [Navigation, Geolocate, Attribution, Scale])
    .name;

