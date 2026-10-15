// ---------- //
// Main setup //
// ---------- //

import EventManager from "../../js/system/EventManager.js";
import RobloxIO from "../../js/backend/RobloxIO.js"
import Main from "../../js/Main.js"

import WebsiteSystem from "../../js/system/WebsiteSystem.js";

import { initialize as initNavbarButton } from "../../js/instance/navbar-Button.js";
import { initialize as initNavbarVolume } from "../../js/instance/navbar-Volume.js";
import { initialize as initNavbarAudioOptions } from "../../js/instance/navbar-AudioOptions.js";

let website;

async function startWebsite() {    
    const Events = new EventManager();
    const IO = new RobloxIO();
    const M = new Main();

    website = new WebsiteSystem();
    
    //

    const data = await M.AudioData.LoadJson(M.CONFIG.AUDIO_JSON_URL);

    website.register("Navbar Button", initNavbarButton, M, IO);
    website.register("Navbar Volume", initNavbarVolume, M);
    website.register("Navbar Audio Options", initNavbarAudioOptions);

    website.set("EventManager", Events);
    website.set("Main", M);
    website.set("RobloxIO", IO);
    
    website.set("AudioData", M.AudioData);
    website.set("AudioJSON", data)

    website.start();

    // ------ //
    // Source //
    // ------ //

    const EventsManager = website.get("EventManager");

    EventsManager.register(
        "navbar-Button",
        document.querySelector(".navbar-Button")
    );

    EventsManager.register(
        "navbar-Volume",
        document.querySelector(".navbar-Volume")
    );

    EventsManager.register(
        "navbar-AllowAudioControl",
        document.querySelector(".navbar-AllowAudioControl")
    );
    
    EventsManager.register(
        "navbar-AllowEffect",
        document.querySelector(".navbar-AllowEffect")
    );

    EventsManager.setEventHandler((name, type, event) => {
        const AudioData = website.get("AudioData");

        if (!AudioData?.Data) {
            return;
        }

        /* if (type === "click") {
            console.log(`[Audio IO] Player interacted with: ${name}`);
        } */

        switch(`${name}:${type}`) {
            case "navbar-Volume:input": {
                const Volume = Number(event.target.value) / 100;

                AudioData.UpdateJson({
                    Setting: {
                        ...AudioData.Data.Setting,
                        Volume: Volume
                    }
                });

                console.log(
                    `[Audio IO] Volume updated: ${AudioData.Data.Setting.Volume}`
                );

                break;
            }
            case "navbar-Button:click": {
                console.log("[Audio IO] Submit button clicked.");
                break;
            }
            case "navbar-AllowEffect:click": {
                const Enabled = event.target.getAttribute("aria-pressed") === "true";

                AudioData.UpdateJson({
                    Setting: {
                        ...AudioData.Data.Setting,
                        AllowFade: Enabled
                    }
                });

                console.log(`[Audio IO] Toggle "Allow Effect": ${Enabled}`);
                break;
            }
            case "navbar-AllowEffect:click": {
                const Enabled = event.target.getAttribute("aria-pressed") === "true";

                AudioData.UpdateJson({
                    Setting: {
                        ...AudioData.Data.Setting,
                        AudioControl: Enabled
                    }
                });

                console.log(`[Audio IO] Toggle "Allow Audio Control": ${Enabled}`);
                break;
            }
        }
    });

    EventsManager.start();
}

startWebsite();