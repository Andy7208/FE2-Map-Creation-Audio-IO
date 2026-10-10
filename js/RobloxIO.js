class RobloxIO {
    constructor() {
        this.EventListener = {};
        
        console.log("RobloxIO initialized!");
    }

    AddEventListener(name, callback) {
        if (typeof name !== "string" || typeof callback !== "function") {
            return false;
        }

        if (this.EventListener[name]) {
            return false;
        }
        
        this.EventListener[name] = callback;
        return true;
    }

    RemoveEventListener(name) {
        if (!Object.hasOwn(this.EventListener, name)) {
            return false;
        }
        
        delete this.EventListener[name];
        return true;
    }

    CallEventListener(name, ...args) {
        const callback = this.EventListener[name];

        if (typeof callback !== "function") {
            return false;
        }

        callback(...args);
        return true;
    }

    async SendRequest(URL, Data) {
        try {
            const Response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Data)
            });

            if (!Response.ok) {
                console.error("Request failed:", Response.status, Response.statusText);
                return false;
            }

            try {
                return await Response.json();
            } catch(Error) {
                console.error("Invalid JSON response:", Error);
                return false;
            }
        } catch(Error) {
            console.error("Failed to send request:", Error);
            return false;
        }
    }
}

export default RobloxIO;