import RobloxIO from "../RobloxIO.js";
import Main from "../Main.js";

const IO = new RobloxIO();
const M = new Main();

const button = document.querySelector(".navbar-Button");
const textBox = document.querySelector(".navbar-TextBox");

IO.AddEventListener("navbar-Button: click", async (username) => {
    console.log(`Checking Roblox User Account: @${username}`);

    try {
        const result = await IO.SendRequest(
            `${M.CONFIG.WORKER_URL}/Check_RobloxAccount`,
            { username: username }
        );

        if (!result || result.ok !== true) {
            console.error(
                "[Audio IO] Failed to check Roblox account",
                result?.error ?? "Unknown error"
            );
            return;
        }

        console.log("[Audio IO] Account check response:", result.username);
    } catch(Error) {
        console.error("[Audio IO] Account request failed:", Error);
    }
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
    console.error(
        "[Audio IO] Username input or submit button not found.",
        `\nButton: ${button}`,
        `\nTextBox: ${textBox}`
    );
}