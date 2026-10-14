export function initialize() {
    const buttons = document.querySelectorAll(
        ".navbar-AudioOptions button[aria-pressed]"
    );

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const isPressed = button.getAttribute("aria-pressed") === "true";
            const newState = !isPressed;

            button.setAttribute("aria-pressed", String(newState));

            // const buttonName = button.textContent.split(":")[0]; // outdated
            // button.textContent = `${buttonName}: ${newState}`
        });
    });
}