
"use strict";

import bindEvents from '../Helpers/bindEvents';
import proxyEvents from '../Helpers/proxyEvents';

const wm = new WeakMap();
const events = ['trackuserlocationstart', 'trackuserlocationend', 'geolocate', 'error'];

class controller {

    ['$onInit']() {
        wm.set(this, new window.mapboxgl.GeolocateControl({
            positionOptions: this.positionOptions || {enableHighAccuracy: false, timeout: 6000},
            fitBoundsOptions: this.fitBoundsOptions || {maxZoom: 15},
            trackUserLocation: !!this.trackUserLocation,
            showUserLocation: this.showUserLocation === undefined ? true : !!this.showUserLocation
        }));
        if (this.parent.map) {
            this.parent.map.addControl(wm.get(this), this.location || 'top-right');
        }
        proxyEvents.call(this, 'geolocate', wm.get(this));
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
        bindings: bindEvents({
            positionOptions: '<',
            fitBoundsOptions: '<',
            trackUserLocation: '<',
            showUserLocation: '<',
            'location': '@'
        }, events)
    })
    .name;

