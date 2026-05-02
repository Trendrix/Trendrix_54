const VIEW_MODES = ["compact", "medium", "full"];

function sanitizeMode(mode) {
  return VIEW_MODES.includes(mode) ? mode : "";
}

export function initLayoutMode({
  hostId,
  storageKey,
  target = document.body,
  defaultMode = "medium",
}) {
  const host = document.getElementById(hostId);
  if (!host || !storageKey || !target) {
    return "medium";
  }

  const fallbackMode = sanitizeMode(defaultMode);
  const savedMode = sanitizeMode(localStorage.getItem(storageKey));
  const activeMode = savedMode || fallbackMode || "medium";

  host.innerHTML = `
    <div class="tx-layout-switch" role="group" aria-label="Layout mode">
      <button type="button" class="tx-layout-btn" data-mode="full">Full View</button>
      <button type="button" class="tx-layout-btn" data-mode="medium">Medium</button>
      <button type="button" class="tx-layout-btn" data-mode="compact">Compact</button>
    </div>
  `;

  const buttons = host.querySelectorAll(".tx-layout-btn");

  function applyMode(mode) {
    const nextMode = sanitizeMode(mode);
    const selectedMode = nextMode || "medium";
    target.setAttribute("data-layout-mode", selectedMode);
    localStorage.setItem(storageKey, selectedMode);
    buttons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.mode === selectedMode);
      btn.setAttribute("aria-pressed", btn.dataset.mode === selectedMode ? "true" : "false");
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => applyMode(btn.dataset.mode));
  });

  applyMode(activeMode);
  return activeMode;
}
