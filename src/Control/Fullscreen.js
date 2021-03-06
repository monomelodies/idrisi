
"use strict";

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        wm.set(this, new window.mapboxgl.FullscreenControl());
        if (this.parent.map) {
            this.parent.map.addControl(wm.get(this), this.location || 'top-right');
        }
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

