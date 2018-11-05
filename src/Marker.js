
"use strict";

import { Marker } from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    constructor($element) {
        wm.set(this, $element);
    }

    ['$postLink']() {
        //const transcluded = wm.get(this)();
        const options = {
            anchor: this.anchor || 'center',
            color: this.color || '#3fb1ce',
            draggable: !!this.draggable
        };
        const transcluded = wm.get(this)[0].children[0].children.length;
        if (transcluded) {
            options.element = wm.get(this)[0];
        }
        if (this.offset) {
            options.offset = this.offset;
        }
        const marker = new Marker(options);
        marker.setLngLat(this.lngLat);
        this.parent.map.on('render', () => {
            if (this.parent.map.contains(this.lngLat)) {
                marker.addTo(this.parent.map);
            } else {
                marker.remove();
            }
        });
    }

    ['$onDestroy']() {
        wm.delete(this);
    }

};

controller.$inject = ['$element'];

export default angular.module('idrisi.marker', [])
    .component('idrisiMarker', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            lngLat: '<',
            color: '@',
            draggable: '<'
        },
        transclude: true,
        template: '<ng-transclude></ng-transclude>'
    })
    .name;

