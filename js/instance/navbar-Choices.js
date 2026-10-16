export function initialize(M) {
    document.querySelectorAll(".navbar-Choices").forEach(group => {
        const buttons = group.querySelectorAll(".navbar-Selecter");

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                buttons.forEach(other => {
                    other.dataset.selected = String(other === button);
                });

                console.log(
                    `[Audio IO] ${group.id}: ${button.id}`
                );
            });
        });
    });
}