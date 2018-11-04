
"use strict";

import { FullscreenControl } from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        wm.set(this, new FullscreenControl());
        this.parent.map.addControl(wm.get(this), this.location || 'top-right');
    }

    ['$onDestroy']() {
        wm.delete(this);
    }

};

export default angular.module('idrisi.control.fullscreen', [])
    .component('idrisiFullscreenControl', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            'location': '@'
        }
    })
    .name;

