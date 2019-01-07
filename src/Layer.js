
"use strict";

class controller {

    ['$postLink']() {
        this.parent.parent.map.on('load', () => {
            this.parent.parent.map.addLayer({
                id: this.id,
                type: this.type,
                source: this.parent.id,
                filter: this.filter || ['has', 'point_count'],
                paint: this.paint
            });
        });
    }

};

export default angular.module('idrisi.layer', [])
    .component('idrisiLayer', {
        controller,
        require: {
            parent: '^^idrisiSource'
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

