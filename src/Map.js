"use strict";

import bindEvents from './Helpers/bindEvents';
import proxyEvents from './Helpers/proxyEvents';

const events = [
    'resize',
    'remove',
    'mousedown',
    'mouseup',
    'mouseover',
    'mousemove',
    'click',
    'dblclick',
    'mouseenter',
    'mouselease',
    'mouseout',
    'contextmenu',
    'wheel',
    'touchstart',
    'touchcancel',
    'movestart',
    'move',
    'moveend',
    'dragstart',
    'drag',
    'dragend',
    'zoomstart',
    'zoomend',
    'rotatestart',
    'rotate',
    'rotateend',
    'pitchstart',
    'pitch',
    'pitchend',
    'boxzoomstart',
    'boxzoomend',
    'boxzoomcancel',
    'webglcontextlost',
    'webglcontextrestored',
    'load',
    'error',
    'data',
    'styledata',
    'sourcedata',
    'dataloading',
    'styledataloading',
    'sourcedataloading'
];

const mapWm = new WeakMap();
const elementWm = new WeakMap();
const scopeWm = new WeakMap();
const callbackWm = new WeakMap();

/**
 * @description
 *
 * AngularJS component providing an interface to the `mapboxgl.Map` object.
 */
class controller {

    constructor($element, $scope) {
        elementWm.set(this, $element);
        scopeWm.set(this, $scope);
        callbackWm.set(this, []);
        if (!window.mapboxgl.Map.prototype.contains) {
            window.mapboxgl.Map.prototype.contains = function (lngLat) {
                const bounds = this.getBounds();
                const southWest = bounds.getSouthWest();
                const northEast = bounds.getNorthEast();
                if (angular.isArray(lngLat)) {
                    lngLat = new window.mapboxgl.LngLat(lngLat[0], lngLat[1]);
                }
                return lngLat.lng >= southWest.lng && lngLat.lat >= southWest.lat && lngLat.lng <= northEast.lng && lngLat.lat <= northEast.lat;
            };
        }
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
        const map = new window.mapboxgl.Map(options);
        mapWm.set(this, map);
        const $scope = scopeWm.get(this);
        map.on('load', () => $scope.$apply(() => {
            callbackWm.get(this).map(callbackFn => callbackFn());
        }));
        map.on('render', () => $scope.$apply());
        $scope.$watch('$ctrl.center', newvalue => newvalue && map.setCenter(newvalue));
        $scope.$watch('$ctrl.minZoom', newvalue => newvalue && map.setMinZoom(newvalue));
        $scope.$watch('$ctrl.maxZoom', newvalue => newvalue && map.setMaxZoom(newvalue));
        $scope.$watch('$ctrl.maxBounds', newvalue => newvalue && map.setMaxBounds(newvalue));
        $scope.$watch('$ctrl.style', newvalue => newvalue && map.setStyle(newvalue));
        proxyEvents.call(this, 'map', map, events);
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

    registerCallback(callbackFn) {
        if (this.map) {
            callbackFn();
        } else {
            const callbacks = callbackWm.get(this);
            callbacks.push(callbackFn);
            callbackWm.set(this, callbacks);
        }
    }

};

controller.$inject = ['$element', '$scope'];

export default angular.module('idrisi.map', [])
    .component('idrisiMap', {
        controller,
        bindings: bindEvents({
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
        }, events)
    })
    .name;

