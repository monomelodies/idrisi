
"use strict";

const wm = new WeakMap();

class controller {

    constructor($scope) {
        wm.set(this, $scope);
    }

    ['$postLink']() {
        this.parent.map.on('load', () => {
            wm.get(this).$watch('$ctrl.data', newval => {
                if (this.parent.map.isSourceLoaded(this.id)) {
                    this.parent.map.removeSource(this.id);
                }
                this.parent.map.addSource(this.id, {
                    type: this.type,
                    data: this.newval,
                    cluster: this.cluster,
                    clusterMaxZoom: this.clusterMaxZoom,
                    clusterRadius: this.clusterRadius
                });
            });
        });
    }

};

controller.$inject = ['$scope'];

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

