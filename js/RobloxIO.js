class RobloxIO {
    constructor() {
        this.EventListener = {};
        
        console.log("RobloxIO initialized!");
    }

    AddEventListener(name, callback) {
        this.EventListener[name] = callback;
    }

    RemoveEventListener(name) {
        if (!this.EventListener[name]) {
            return false;
        }
        
        delete this.EventListener[name];
        return true;
    }

    CallEventListener(name, ...args) {
        const callback = this.EventListener[name];

        if (!callback) {
            return false;
        }

        callback(...args);
        return true;
    }
}

export default RobloxIO;