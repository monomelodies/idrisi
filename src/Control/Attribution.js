
"use strict";

import mapboxgl from 'mapboxgl';

class controller {

    ['$onInit']() {
        const options = {};
        if (this.compact) {
            options.compat = !!this.compact;
        }
        if (this.customAttributions) {
            options.customAttributions = this.customAttributions;
        }
        this.parent.map.addControl(new mapboxgl.AttributionControl(options), this.location || 'top-right');
    }

};

export default angular.module('idris.control.attribution', [])
    .component('idrisAttributionControl', {
        controller,
        require: {
            parent: '^^idrisMap'
        },
        bindings: {
            compact: '<',
            customAttribution: '<',
            location: '@'
        }
    })
    .name;

