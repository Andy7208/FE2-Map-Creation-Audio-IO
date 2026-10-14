import RobloxIO from "../../js/backend/RobloxIO.js"
import Main from "../../js/Main.js"

import WebsiteSystem from "../../js/system/WebsiteSystem.js";

import { initialize as initNavbarButton } from "../../js/instance/navbar-Button.js";
import { initialize as initNavbarVolume } from "../../js/instance/navbar-Volume.js";
import { initialize as initNavbarAudioOptions } from "../../js/instance/navbar-AudioOptions.js";

const IO = new RobloxIO()
const M = new Main()

const website = new WebsiteSystem();

website.register("Navbar Button", initNavbarButton, M, IO);
website.register("Navbar Volume", initNavbarVolume, M);
website.register("Navbar Audio Options", initNavbarAudioOptions);

website.start();