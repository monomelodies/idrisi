"use strict";

import { Map } from 'mapbox-gl';

const mapWm = new WeakMap();
const elementWm = new WeakMap();

/**
 * @description
 *
 * AngularJS component providing an interface to the `mapboxgl.Map` object.
 */
class controller {

    constructor($element) {
        elementWm.set(this, $element);
    }

    ['$onInit']() {
        const options = {
            container: this.id || elementWm.get(this)[0],
            minZoom: parseInt(this.minZoom || 0),
            maxZoom: parseInt(this.maxZoom === undefined ? 22 : this.maxZoom),
            style: this.style || 'mapbox://styles/mapbox/streets-v10',
            hash: !!(this.hash || false),
            interactive: this.interactive === undefined ? true : !!this.interactive,
            bearingSnap: parseInt(this.bearingSnap === undefined ? 7 : this.bearingSnap),
            pitchWithRotate: this.pitchWithRotate === undefined ? true : !!this.pitchWithRotate,
            clickTolerance: parseInt(this.clickTolerance || 3),
            attributionControl: this.attributionControl === undefined ? true : !!this.attributionControl,
            logoPosition: this.logoPosition || 'bottom-left',
            failIfMajorPerformanceCaveat: !!this.failIfMajorPerformanceCaveat,
            preserveDrawingBuffer: !!this.preserveDrawingBuffer,
            refreshExpiredTiles: this.refreshExpiredTiles === undefined ? true : !!this.refreshExpiredTiles,
            scrollZoom: this.scrollZoom === undefined ? true : !!this.scrollZoom,
            boxZoom: this.boxZoom === undefined ? true : !!this.boxZoom,
            dragRotate: this.dragRotate === undefined ? true : !!this.dragRotate,
            dragPan: this.dragPan === undefined ? true : !!this.dragPan,
            keyboard: this.keyboard === undefined ? true : !!this.keyboard,
            doubleClickZoom: this.doubleClickZoom === undefined ? true : !!this.doubleClickZoom,
            touchZoomRotate: this.touchZoomRotate === undefined ? true : this.touchZoomRotate,
            trackResize: this.trackResize === undefined ? true : !!this.trackResize,
            center: this.center || [0, 0],
            zoom: parseInt(this.zoom || 0),
            bearing: parseInt(this.bearing || 0),
            pitch: parseInt(this.pitch || 0),
            renderWorldCopies: this.renderWorldCopies === undefined ? true : !!this.renderWorldCopies,
            maxTileCacheSize: this.maxTileCacheSize === undefined ? null : parseInt(this.maxTileCacheSize),
            localIdeographFontFamily: this.localIdeographFontFamily === undefined ? null : this.localIdeographFontFamily,
            transformRequest: this.transformRequest === undefined ? null : this.transformRequest(),
            collectResourceTiming: !!this.collectResourceTiming,
            fadeDuration: this.fadeDuration === undefined ? 300 : parseInt(this.fadeDuration),
            crossSourceCollisions: this.crossSourceCollisions === undefined ? true : !!this.crossSourceCollisions
        };
        if (this.customAttribution !== undefined) {
            options.customAttribution = this.customAttribution;
        }
        if (this.maxBounds !== undefined) {
            options.maxBounds = this.maxBounds;
        }
        mapWm.set(this, new Map(options));
        this.onMapLoaded({map: mapWm.get(this)});
    }

    ['$onDestory']() {
        elementWm.delete(this);
        mapWm.delete(this);
    }

    get map() {
        return mapWm.get(this);
    }

};

controller.$inject = ['$element'];

export default angular.module('idrisi.map', [])
    .component('idrisiMap', {
        controller,
        bindings: {
            id: '@',
            minZoom: '@',
            maxZoom: '@',
            style: '<mapboxStyle',
            hash: '<',
            interactive: '<',
            bearingSnap: '@',
            pitchWithRotate: '<',
            clickTolerance: '@',
            attributionControl: '<',
            customAttribution: '<',
            logoPosition: '@',
            failIfMajorPerformanceCaveat: '<',
            preserveDrawingBuffer: '<',
            refreshExpiredTiles: '<',
            maxBounds: '<',
            scrollZoom: '<',
            boxZoom: '<',
            dragRotate: '<',
            dragPan: '<',
            keyboard: '<',
            doubleClickZoom: '<',
            touchZoomRotate: '<',
            trackResize: '<',
            center: '<',
            zoom: '@',
            bearing: '@',
            pitch: '@',
            renderWorldCopies: '<',
            maxTileCacheSize: '@',
            localIdeographFontFamily: '@',
            transformRequest: '&',
            collectResourceTiming: '<',
            fadeDuration: '@',
            crossSourceCollisions: '<',
            /**
             * @description
             *
             * Custom binding called when the map is loaded. This is to allow
             * calling controllers to interact with it. The map is passed as
             * single argument `map`.
             */
            onMapLoaded: '&'
        }
    })
    .name;

