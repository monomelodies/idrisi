
"use strict";

import { Marker } from 'mapbox-gl';

const elementWm = new WeakMap();
const scopeWm = new WeakMap();

class controller {

    constructor($element, $scope) {
        elementWm.set(this, $element);
        scopeWm.set(this, $scope);
        // This is needed to prevent clickOnClose immediately firing for a popup.
        $element.on('click', event => event.stopPropagation());
    }

    ['$postLink']() {
        //const transcluded = wm.get(this)();
        const options = {
            anchor: this.anchor || 'center',
            color: this.color || '#3fb1ce',
            draggable: !!this.draggable
        };
        const transcluded = elementWm.get(this)[0].children[0].children.length;
        if (transcluded) {
            options.element = elementWm.get(this)[0];
        }
        if (this.offset) {
            options.offset = this.offset;
        }
        const marker = new Marker(options);
        marker.setLngLat(this.lngLat);
        scopeWm.get(this).$watch('$ctrl.lngLat', newvalue => marker.setLngLat(newvalue));
        this.parent.map.on('render', () => {
            if (this.parent.map.contains(this.lngLat)) {
                marker.addTo(this.parent.map);
            } else {
                marker.remove();
            }
        });
    }

    ['$onDestroy']() {
        elementWm.delete(this);
        scopeWm.delete(this);
    }

};

controller.$inject = ['$element', '$scope'];

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
        template: '<ng-transclude></ng-transclude>'
    })
    .name;

