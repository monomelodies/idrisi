
"use strict";

import mapboxgl from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        wm.set(this, new mapboxgl.NavigationControler({
            showCompass: this.showCompass === undefined ? true : !!this.showCompass,
            showZoom: this.showZoom === undefined ? true : !!this.showZoom
        }));
    }
};

export default angular.module('idrisi.control.navigation', [])
    .component('idrisiNavigation', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            showCompass: '<',
            showZoom: '<'
        }
    })
    .name;

