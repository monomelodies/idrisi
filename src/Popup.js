
"use strict";

import { Popup } from 'mapbox-gl';

const elementWm = new WeakMap();
const popupWm = new WeakMap();

class controller {

    constructor($element) {
        elementWm.set(this, $element);
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
        popupWm.set(this, new Popup(options));
    }

    set opened(newvalue) {
        if (newvalue) {
            console.log('adding? :(');
            popupWm.get(this).addTo(this.parent.parent.map);
            console.log(popupWm.get(this));
        } else {
            popupWm.get(this).remove();
        }
    }

    get opened() {
        return popupWm.get(this).isOpen();
    }

    ['$postLink']() {
        popupWm.get(this).setLngLat(this.parent.lngLat);
        popupWm.get(this).setHTML(elementWm.get(this).html());
        elementWm.get(this).css({display: 'none'});
    }

    ['$onDestroy']() {
        elementWm.delete(this);
        popupWm.delete(this);
    }

};

controller.$inject = ['$element'];

export default angular.module('idrisi.popup', [])
    .component('idrisiPopup', {
        controller,
        require: {
            parent: '^^idrisiMarker'
        },
        transclude: true,
        template: '<ng-transclude/>',
        bindings: {
            closeButton: '<',
            closeOnClick: '<',
            anchor: '@',
            offset: '<',
            className: '@',
            /**
             * Custom binding: true to show the popup. Using e.g. `ng-if` on the
             * component trips up MapboxGL.
             */
            opened: '<'
        }
    })
    .name;

