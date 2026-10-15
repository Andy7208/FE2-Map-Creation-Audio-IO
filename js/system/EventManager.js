class EventManager {
    constructor() {
        this.initialized = false;
        this.objects = new Map();

        this.eventHandler = null;
    }

    register(name, element) {
        if (!element || this.objects.has(name)) {
            return false;
        }

        const Events = {
            mouse_enter: "mouseenter",
            mouse_leave:"mouseleave",
            mouse_move:"mousemove",
            mouse_down:"mousedown",
            mouse_up:"mouseup",
            click:"click",
        };

        const listener = {};

        for (const [EventName, DOMEvent] of Object.entries(Events)) {
            const Listener = (event) => {
                this.onEvent(name, EventName, event);
            };

            element.addEventListener(DOMEvent, Listener);
            listener[EventName] = Listener;
        }

        this.objects.set(name, {
            element: element,
            listener: listener,
            events: Events
        });

        return true;
    }

    unregister(name) {
        const object = this.objects.get(name);

        if (!object) {
            return false;
        }

        for (const [type, listener] of Object.entries(object.listener)) {
            object.element.removeEventListener(
                object.events[type],
                listener
            );
        }

        this.objects.delete(name);
        return true;
    }

    get(name) {
        return this.objects.get(name) ?? null;
    }

    onEvent(name, type, event) {
        // console.log(`[EventManager] ${name}: ${type}`, event);

        this.eventHandler?.(name, type, event);
    }

    setEventHandler(callback) {
        if (typeof callback !== "function") {
            return false;
        }

        this.eventHandler = callback;
        return true;
    }

    start() {
        if (this.initialized) {
            return;
        }

        this.initialized = true;
        console.log("[Audio IO] EventManager initialized.");
    }
}

export default EventManager;