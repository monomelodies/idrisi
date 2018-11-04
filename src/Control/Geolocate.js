
"use strict";

import { GeolocateControl } from 'mapbox-gl';

const wm = new WeakMap();

class controller {

    ['$onInit']() {
        wm.set(this, new GeolocateControl({
            positionOptions: this.positionOptions || {enableHighAccuracy: false, timeout: 6000},
            fitBoundsOptions: this.fitBoundsOptions || {maxZoom: 15},
            trackUserLocation: !!this.trackUserLocation,
            showUserLocation: this.showUserLocation === undefined ? true : !!this.showUserLocation
        }));
        this.parent.map.addControl(wm.get(this), this.location || 'top-right');
    }

    ['$onDestroy']() {
        wm.delete(this);
    }

};

export default angular.module('idrisi.control.geolocate', [])
    .component('idrisiGeolocateControl', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            positionOptions: '<',
            fitBoundsOptions: '<',
            trackUserLocation: '<',
            showUserLocation: '<',
            'location': '@'
        }
    })
    .name;

