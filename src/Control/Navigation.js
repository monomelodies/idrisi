
"use strict";

import { NavigationControl } from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        try {
            wm.set(this, new NavigationControl({
                showCompass: this.showCompass === undefined ? true : !!this.showCompass,
                showZoom: this.showZoom === undefined ? true : !!this.showZoom
            }));
            this.parent.map.addControl(wm.get(this), this.location || 'top-right');
        } catch (error) {
            if (this.onWebglInitializationFailed) {
                this.onWebglInitializationFailed({error});
            }
        }
    }

    ['$onDestroy']() {
        wm.delete(this);
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
            'location': '@',
            onWebglInitializationFailed: '&'
        }
    })
    .name;

