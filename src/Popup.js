
"use strict";

import { Popup } from 'mapbox-gl';

const elementWm = new WeakMap();
const popupWm = new WeakMap();
const domWm = new WeakMap();

class controller {

    constructor($element) {
        elementWm.set(this, $element);
    }

    set opened(newvalue) {
        if (newvalue) {
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
            const popup = new Popup(options);
            popup.setLngLat(this.parent.lngLat)
                .setDOMContent(domWm.get(this));
            popup.addTo(this.parent.parent.map);
            console.log(popup);
            popupWm.set(this, popup);
        } else if (popupWm.get(this)) {
            popupWm.get(this).remove();
        }
    }

    get opened() {
        const popup = popupWm.get(this);
        return popup && popup.isOpen();
    }

    ['$postLink']() {
        domWm.set(this, elementWm.get(this)[0].firstChild);
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

