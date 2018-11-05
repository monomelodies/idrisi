
"use strict";

import { Popup } from 'mapbox-gl';

const elementWm = new WeakMap();
const scopeWm = new WeakMap();
const popupWm = new WeakMap();

class controller {

    constructor($element, $scope) {
        elementWm.set(this, $element);
        scopeWm.set(this, $scope);
    }

    ['$postLink']() {
        const options = {
            closeButton: this.closeButton === undefined ? true : !!this.closeButton,
            closeOnClick: this.closeOnClick == undefined ? true : !!this.closeOnClick
        };
        if (this.anchor) {
            options.anchor = this.anchor;
        }
        if (this.offset) {
            options.offset = this.offset;
        }
        if (this.className) {
            options.className = this.className;
        }
        popupWm.set(this, new Popup(options))
        scopeWm.get(this).apply(() => popupWm.get(this).setLngLat(this.lngLat).setHTML(elementWm.get(this).html()).addTo(this.parent.parent.map));
    }

    ['$destroy']() {
        elementWm.delete(this);
        scopeWm.delete(this);
        popupWm.delete(this);
    }

};

controller.$inject = ['$element', '$scope'];

export default angular.module('idrisi.popup', [])
    .component('idrisiPopup', {
        controller,
        require: {
            parent: '^^idrisiMarker'
        },
        transclude: true,
        bindings: {
            closeButton: '<',
            closeOnClick: '<',
            anchor: '@',
            offset: '<',
            className: '@'
        }
    })
    .name;

