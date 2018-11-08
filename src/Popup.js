
"use strict";

import { Popup } from 'mapbox-gl';

const elementWm = new WeakMap();
const popupWm = new WeakMap();
const openWm = new WeakMap();

class controller {

    constructor($element) {
        $element.css({display: 'none'});
        elementWm.set(this, $element);
        openWm.set(this, false);
    }

    ['$onInit']() {
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
        const popup = new Popup(options);
        popup.setLngLat(this.parent.lngLat)
        popup.on('close', () => {
            openWm.set(this, false);
            if (this.onClose) {
                this.onClose();
            }
        });
        popupWm.set(this, popup);
    }

    ['$postLink']() {
        if (this.opened) {
            const popup = popupWm.get(this);
            popup.setHTML(elementWm.get(this)[0].firstChild.innerHTML);
            popup.addTo(this.parent.parent.map);
        }
    }

    set opened(newvalue) {
        const open = openWm.get(this);
        const popup = popupWm.get(this);
        if (popup) {
            if (newvalue && !open) {
                popup.setHTML(elementWm.get(this)[0].firstChild.innerHTML);
                popup.addTo(this.parent.parent.map);
            } else if (open && !newvalue) {
                popup.remove();
                if (this.onClose) {
                    this.onClose();
                }
            }
        }
        openWm.set(this, newvalue);
    }

    get opened() {
        return openWm.get(this);
    }

    ['$onDestroy']() {
        elementWm.delete(this);
        popupWm.delete(this);
        openWm.delete(this);
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
            opened: '<',
            /**
             * Custom callback triggered on popup close. Useful for cleanup.
             */
            onClose: '&'
        }
    })
    .name;

