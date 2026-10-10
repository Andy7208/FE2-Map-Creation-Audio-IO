import RobloxIO from "../RobloxIO.js";

const IO = new RobloxIO();

const button = document.querySelector(".navbar-Button");
const textBox = document.querySelector(".navbar-Textbox");

IO.AddEventListener("navbar-Button: click", (username) => {
    console.log(`Checking Roblox User Account: @${username}`);

    const result = await IO.SendRequest(
        "https://fe2-map-creation-audio-io.andygentile092.workers.dev/Check_RobloxAccount",
        { username: username }
    );

    if (!result) {
        console.error("[Audio IO] Failed to check Roblox account");
        return;
    }

    console.log("[Audio IO] Account check response:", result.username);
});

if (button && textBox) {
    button.addEventListener("click", () => {
        const text = textBox.value.trim();

        if (text == "") {
            alert("Error: Please type your Roblox UserName Account.");
            return;
        }
        
        IO.CallEventListener("navbar-Button: click", text);
    });
} else {
    console.error("[Audio IO] Username input or submit button not found.");
}