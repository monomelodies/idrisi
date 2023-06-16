
"use strict";

import bindEvents from './Helpers/bindEvents';
import proxyEvents from './Helpers/proxyEvents';

const events = ['open', 'close'];
const elementWm = new WeakMap();
const popupWm = new WeakMap();
const openWm = new WeakMap();

let $rootScope = undefined;

class controller {

    constructor($element, _$rootScope_) {
        $element.css({display: 'none'});
        elementWm.set(this, $element);
        openWm.set(this, false);
        $rootScope = _$rootScope_;
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
        const popup = new window.mapboxgl.Popup(options);
        try {
            popup.setLngLat(this.parent.lngLat);
        } catch (Error) {
        }
        proxyEvents.call(this, 'popup', popup, events);
        popupWm.set(this, popup);
        popup.on('close', () => {
            if (this.onClose) {
                openWm.set(this, false);
            } else {
                $rootScope.$apply(() => openWm.set(this, false));
            }
        });
    }

    ['$postLink']() {
        if (this.opened) {
            const popup = popupWm.get(this);
            popup.setHTML(elementWm.get(this)[0].firstChild.innerHTML);
            if (this.parent.parent.map) {
                popup.addTo(this.parent.parent.map);
            }
        }
    }

    set opened(newvalue) {
        const open = openWm.get(this);
        const popup = popupWm.get(this);
        if (popup) {
            if (newvalue && !open) {
                popup.setHTML(elementWm.get(this)[0].firstChild.innerHTML);
                if (this.parent.parent.map) {
                    popup.addTo(this.parent.parent.map);
                }
            } else if (open && !newvalue) {
                popup.remove();
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

controller.$inject = ['$element', '$rootScope'];

export default angular.module('idrisi.popup', [])
    .component('idrisiPopup', {
        controller,
        require: {
            parent: '^^idrisiMarker'
        },
        transclude: true,
        template: '<ng-transclude/>',
        bindings: bindEvents({
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
        }, events)
    })
    .name;

