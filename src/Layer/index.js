
"use strict";

class controller {
};

export default angular.module('idrisi.layer', [])
    .component('idrisiLayer', {
        controller,
        required: {
            parent: '^^idrisiMap'
        },
        bindings: {
            id: '@',
            // fill, line, symbol, circle, heatmap, fill-extrusion, raster, hillshade, background
            type: '@',
            source: '@',
            metadata: '<',
            source: '@',
            sourceLayer: '@',
            minzoom: '@',
            maxzoom: '@',
            filter: '<',
            layout: '<',
            paint: '<'
        }
    })
    .name;

