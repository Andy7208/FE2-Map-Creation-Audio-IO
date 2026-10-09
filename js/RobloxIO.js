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
                console.error("Request failed:", Response.status);
                return false;
            }

            return await Response.json();
        } catch(Error) {
            console.error("Failed to send request:", Error);
            return false;
        }
    }
}

export default RobloxIO;