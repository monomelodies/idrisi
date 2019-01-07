
"use strict";

class controller {

    ['$postLink']() {
        this.parent.map.on('load', () => {
            this.parent.map.addSource(this.id, {
                type: this.type,
                data: this.data,
                cluster: this.cluster,
                clusterMaxZoom: this.clusterMaxZoom,
                clusterRadius: this.clusterRadius
            });
        });
    }

};

export default angular.module('idrisi.source', [])
    .component('idrisiSource', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            id: '@',
            // vector, raster, raster-dem, geojson, image, video
            type: '@',
            data: '<',
            cluster: '<',
            clusterMaxZoom: '@',
            clusterRadius: '@'
        }
    })
    .name;

