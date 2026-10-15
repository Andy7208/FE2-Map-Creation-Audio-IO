class Main {
    constructor() {
        this.CONFIG = {
            WEBSITE_URL: "https://andy7208.github.io/FE2-Map-Creation-Audio-IO",
            WORKER_URL: "https://fe2-map-creation-audio-io.andygentile092.workers.dev",

            AUDIO_JSON_URL: "/FE2-Map-Creation-Audio-IO/assets/data/Audio.json"
        }

        this.AudioData = new AudioData(this.CONFIG);
    }
}

class AudioData {
    constructor(CONFIG) {
        this.CONFIG = CONFIG;
        this.Data = null;
    }

    async LoadJson(JSON_URL) {
        try {
            const ResolvedURL = new URL(
                JSON_URL,
                `${this.CONFIG.WEBSITE_URL}/`
            );
            const Response = await fetch(ResolvedURLURL);

            if (!Response.ok) {
                throw new Error(`HTTP ${Response.status}`);
            }

            this.Data = await Response.json();
            return this.Data;
        } catch(Error) {
            console.error(`[Audio IO] Failed to load "${JSON_URL}":`, Error);
            return null;
        }
    }

    UpdateJson(JSON_DATA) {
        if (
            JSON_DATA === null ||
            typeof JSON_DATA !== "object" ||
            Array.isArray(JSON_DATA)
        ) {
            return false
        }

        if (this.Data === null) {
            this.Data = JSON_DATA;
            return true;
        }

        let Updated = false;

        for (const Key of Object.keys(JSON_DATA)) {
            const NewValue = JSON_DATA[Key];
            const OldValue = this.Data[Key];

            if (JSON.stringify(OldValue) === JSON.stringify(NewValue)) {
                continue;
            }

            this.Data[Key] = NewValue;
            Updated = true;
        }

        return Updated;
    }
}

export default Main