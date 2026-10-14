export function initialize(M) {
    const volumeSlider = document.querySelector("#volumeSlider");
    const volumeValue = document.querySelector("#volumeValue");

    let currentValue = 0.75;

    if (!volumeSlider || !volumeValue) {
        console.warn("[Audio IO] Volume controls not found.");
    } else {
        currentValue = Number(volumeSlider.value) / 100;
        
        function applyVolume(audio) {
            audio.volume = currentValue;
        }

        function updateVolume() {
            currentValue = Math.max(
                0,
                Math.min(1, Number(volumeSlider.value) / 100)
            );

            volumeValue.textContent = 
                `${Math.round(currentValue * 100)}%`;

            document.querySelectorAll("audio").forEach(applyVolume);
        }

        updateVolume();

        volumeSlider.addEventListener("input", updateVolume);

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (!(node instanceof Element)) {
                        continue;
                    }

                    if (node instanceof HTMLAudioElement) {
                        applyVolume(node)
                    }

                    node.querySelectorAll("audio").forEach(applyVolume);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}