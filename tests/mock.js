
window.mapboxgl = require('mapbox-gl');

function noop() {
};

function FakeControl() {
};

function Transform() {
    this.renderWorldCopies = {
        _add: noop
    };
    this.center = new window.mapboxgl.LngLat(0, 0);
    this.locationPoint = function (lnglat) {
        return new Point();
    };
    this.project = function (lnglat) {
        return new Point();
    };
};

function Point() {
    this._add = function (Point) {
        return Point;
    };
};

window.mapboxgl.Map = function (options) {
    this.transform = new Transform();
    this.on = noop;
    this.off = noop;
    this.addControl = noop;
    this.getBounds = function () {
        return new window.mapboxgl.LngLatBounds([-1, -1], [1, 1]);
    };
    var div = document.createElement('div');
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    options.container.appendChild(div);
    this.getCanvasContainer = function () {
        return div;
    };
    this.setCenter = noop;
    this.setStyle = noop;
    this.getRenderWorldCopies = function () {
        return this.transform.renderWorldCopies;
    };
    this.project = function (lnglat) {
        return this.transform.locationPoint(window.mapboxgl.LngLat.convert(lnglat));
    };
    this.setMinZoom = noop;
};
/*,
    Marker: function () {
        this.setLngLat = function () {
        };
    },
    ScaleControl: FakeControl,
};
*/

