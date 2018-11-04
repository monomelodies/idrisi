
"use strict";

import { ScaleControl } from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        wm.set(this, new ScaleControl({
            maxWidth: this.maxWidth == undefined ? 100 : parseInt(this.maxWidth),
            unit: this.unit || 'metric'
        }));
        this.parent.map.addControl(wm.get(this), this.location || 'top-right');
    }

    ['$onDestroy']() {
        wm.delete(this);
    }

};

export default angular.module('idrisi.control.scale', [])
    .component('idrisiScaleControl', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            maxWidth: '@',
            unit: '@',
            'location': '@'
        }
    })
    .name;

