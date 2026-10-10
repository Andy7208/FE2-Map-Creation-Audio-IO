const volumeSlider = document.querySelector("#volumeSlider");
const volumeValue = document.querySelector("#volumeValue");

if (!volumeSlider || !volumeValue) {
    console.warn("[Audio IO] Volume controls not found.");
} else {
    function applyVolume(audio) {
        audio.volume = Number(volumeSlider.value) / 100;
    }

    function updateVolume() {
        const volume = Number(volumeSlider.value);

        volumeValue.textContent = `${volume}%`;

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