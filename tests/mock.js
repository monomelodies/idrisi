
window.mapboxgl = require('mapbox-gl');

function noop() {
};

function FakeControl() {
};

function Transform() {
    this.renderWorldCopies = {
        _add: noop
    }
};

window.mapboxgl.Map = function () {
    this.transform = new Transform();
    this.on = noop;
    this.off = noop;
    this.addControl = noop;
    this.getBounds = function () {
        return new window.mapboxgl.LngLatBounds([-1, -1], [1, 1]);
    };
    this.getCanvasContainer = function () {
        return document.createElement('div');
    };
    this.setCenter = noop;
    this.setStyle = noop;
    this.getRenderWorldCopies = function () {
        return this.transform.renderWorldCopies;
    };
    this.project = noop;
};
/*,
    Marker: function () {
        this.setLngLat = function () {
        };
    },
    ScaleControl: FakeControl,
};
*/

