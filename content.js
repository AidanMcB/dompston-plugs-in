// This script is injected into the page and will run in the context of the page
document.addEventListener("click", (e) => {
    chrome.storage.sync.get(["clickHornEnabled"], (result) => {
        if (result.clickHornEnabled) {
            // Bubble effect
            // document.addEventListener("click", (e) => {
            //     const bubble = document.createElement("div");
            //     bubble.className = "click-bubble";
            //     bubble.style.left = `${e.clientX}px`;
            //     bubble.style.top = `${e.clientY}px`;
            //     document.body.appendChild(bubble);

            //     setTimeout(() => {
            //         bubble.remove();
            //     }, 400);
            // });

            // Confetti effect
            confetti({
                particleCount: 30,
                spread: 50,
                origin: {
                    x: e.clientX / window.innerWidth,
                    y: e.clientY / window.innerHeight,
                },
            });

            // Web Audio API method to play sound
            const context = new AudioContext();
            fetch(chrome.runtime.getURL("bulb-horn-honk.mp3"))
                .then((response) => response.arrayBuffer())
                .then((buffer) => context.decodeAudioData(buffer))
                .then((decoded) => {
                    const source = context.createBufferSource();
                    source.buffer = decoded;
                    source.connect(context.destination);
                    source.start(0);
                })
                .catch((err) => console.warn("Audio play error", err));
        }
    });
});
