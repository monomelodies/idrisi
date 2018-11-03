
"use strict";

class controller {

    constructor($element, $transclude) {
        this._element = $element;
        this._transclude = $transclude;
    }

    ['$onInit']() {
        const transcluded = this._transclude();
        const options = {
            anchor: this.anchor || 'center',
            color: this.color || '#3fb1ce',
            draggable: !!this.draggable
        };
        if (transcluded.length) {
            options.element = transcluded[0];
        }
        if (this.offset) {
            options.offset = this.offset;
        }
        const marker = new mapboxgl.Marker(options);
        marker.setLngLat(this.lngLat);
        marker.addTo(this.parent.getMap());
    }
};

controller.$inject = ['$element', '$transclude'];

export default angular.module('idrisi.marker', [])
    .component('idrisiMarker', {
        controller,
        require: {
            parent: '^^idrisiMap'
        },
        bindings: {
            lngLat: '<',
            color: '@',
            draggable: '<'
        },
        transclude: true,
        template: '<div></div>'
    })
    .name;

