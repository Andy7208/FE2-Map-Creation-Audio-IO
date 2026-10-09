import RobloxIO from "../RobloxIO.js";

const IO = new RobloxIO();

IO.AddEventListener("navbar-Button: click", (username) => {
    console.log(`Checking Roblox User Account: @${text}`);
});

document.querySelector(".navbar-Button").addEventListener("click", () => {
    const text = document.querySelector(".navbar-TextBox").value.trim();

    if (text == "") {
        alert("Error: Please type your Roblox UserName Account.");
        return;
    }
    
    IO.CallEventListener("navbar-Button: click", text);
});