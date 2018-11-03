
"use strict";

import mapboxgl from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        wm.set(this, new mapboxgl.NavigationControl({
            showCompass: this.showCompass === undefined ? true : !!this.showCompass,
            showZoom: this.showZoom === undefined ? true : !!this.showZoom
        }));
        this.parent.map.addControl(wm.get(this), this.location || 'top-right');
    }
};

export default angular.module('idrisi.control.navigation', [])
    .component('idrisiNavigationControl', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            showCompass: '<',
            showZoom: '<',
            'location': '@'
        }
    })
    .name;

