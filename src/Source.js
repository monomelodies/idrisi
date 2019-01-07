
"use strict";

class controller {
};

export default angular.module('idrisi.source', [])
    .component('idrisiSource', {
        controller,
        require: {
            parent: '^^idrisiMap'
        }
    })
    .name;

