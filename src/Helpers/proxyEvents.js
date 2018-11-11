
"use strict";

export default function proxyEvents(key, object, events) {
    events.map(event => {
        const name = 'on' + event[0].toUpperCase() + event.substring(1);
        if (this[name]) {
            const args = {};
            args[key] = object;
            object.on(event, () => this[name](args));
        }
    });
};

