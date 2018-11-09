
"use strict";

export default function proxyEvents(key, object, events) {
    events.map(event => {
        const name = event[0].toUpperCase() + event.substring(1);
        if (this[name]) {
            object.on(event, () => this[name]({key: object}));
        }
    });
};

