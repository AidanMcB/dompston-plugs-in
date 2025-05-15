const toggle = document.getElementById("clickHornToggle");
const status = document.getElementById("status");

function updateStatusLabel(enabled) {
    status.textContent = enabled ? "CLOWN MODE ON 🤡" : "CLOWN MODE OFF 🤫";
    status.style.color = enabled ? "limegreen" : "gray";
}

// Load saved state on popup open
chrome.storage.sync.get(["clickHornEnabled"], (result) => {
    const isEnabled = result.clickHornEnabled ?? false;
    toggle.checked = isEnabled;
    updateStatusLabel(isEnabled);
});

// Save state and update label on toggle change
toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    chrome.storage.sync.set({ clickHornEnabled: enabled });
    updateStatusLabel(enabled);
});
