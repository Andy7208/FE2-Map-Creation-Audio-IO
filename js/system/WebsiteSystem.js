class WebsiteSystem {
    constructor() {
        this.initialized = false;

        this.data = {};
        this.modules = [];
    }

    set(name, value) {
        this.data[name] = value;
    }

    get(name) {
        return this.data[name];
    }

    register(name, initialize, ...args) {
        this.modules.push({
            name,
            initialize,
            args
        });
    }

    start() {
        if (this.initialized) {
            return;
        }

        this.initialized = true;

        for (const module of this.modules) {
            try {
                module.initialize(...module.args);

                console.log(
                    `[Audio IO] ${module.name} initialized.`
                );
            } catch(Error) {
                console.error(
                    `[Audio IO] Failed to initialize ${module.name}:`,
                    Error
                );
            }
        }
    }
}

export default WebsiteSystem;