
"use strict";

export default function bindEvents(bindings, events) {
    events.map(event => {
        bindings['on' + event[0].toUpperCase() + event.substring(1)] = '&';
    });
    return bindings;
};

