"use strict";


/**
 * @description
 *
 * AngularJS component providing an interface to the `mapboxgl.Map` object.
 */
class controller {

    constructor($element) {
        this._element = $element;
    }

    ['$onInit']() {
        mapboxgl.accessToken = this.token;
        const options = {
            container: this.id || this._element[0],
            minZoom: parseInt(this.minZoom || 0),
            maxZoom: parseInt(this.maxZoom === undefined ? 22 : this.maxZoom),
            style: this.style || 'mapbox://styles/mapbox/streets-v',
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
        this.map = new mapboxgl.Map(options);
    }

    getMap() {
        return this.map;
    }

};

controller.$inject = ['$element'];

export default angular.module('idrisi.map', [])
    .component('idrisiMap', {
        controller,
        bindings: {
            token: '@accessToken',
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
            crossSourceCollisions: '<'
        }
    })
    .name;

