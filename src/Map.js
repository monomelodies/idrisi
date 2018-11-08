"use strict";

import { Map } from 'mapbox-gl';
import { LngLat } from 'mapbox-gl';

if (!Map.prototype.contains) {
    Map.prototype.contains = function (lngLat) {
        const bounds = this.getBounds();
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();
        if (angular.isArray(lngLat)) {
            lngLat = new LngLat(lngLat[0], lngLat[1]);
        }
        return lngLat.lng >= southWest.lng && lngLat.lat >= southWest.lat && lngLat.lng <= northEast.lng && lngLat.lat <= northEast.lat;
    };
}

const mapWm = new WeakMap();
const elementWm = new WeakMap();
const scopeWm = new WeakMap();

/**
 * @description
 *
 * AngularJS component providing an interface to the `mapboxgl.Map` object.
 */
class controller {

    constructor($element, $scope) {
        elementWm.set(this, $element);
        scopeWm.set(this, $scope);
        $scope.$watch('$ctrl.center', newvalue => {
            mapWm.get(this).setCenter(newvalue);
        });
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
        try {
            mapWm.set(this, new Map(options));
            mapWm.get(this).on('render', () => scopeWm.get(this).$apply());
            if (this.onMapLoaded) {
                this.onMapLoaded({map: mapWm.get(this)});
            }
        } catch (error) {
            if (this.onWebglInitializationFailure) {
                this.onWebglInitializationFailure({error});
            }
        }
    }

    ['$onDestroy']() {
        elementWm.delete(this);
        mapWm.delete(this);
    }

    get map() {
        return mapWm.get(this);
    }

    set map(map) {
        mapWm.set(this, map);
    }

};

controller.$inject = ['$element', '$scope'];

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
            onMapLoaded: '&',
            /**
             * @description
             *
             * Custom error called when WebGL could not be initialized. Allows
             * for graceful error handling in the application. The error is
             * passed as argument `error`.
             */
            onWebglInitializationFailure: '&'
        }
    })
    .name;

