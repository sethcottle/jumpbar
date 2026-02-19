// Cross-browser API shim
const api = typeof browser !== 'undefined' ? browser : chrome;

// Default button state
const defaultButtonState = {
  assistant: true,
  news: true,
  translate: true,
  summarize: true,
  smallweb: true
};

// Load color icons into the popup toggle list
function loadIcons() {
  const iconElements = document.querySelectorAll('[data-icon]');

  for (const element of iconElements) {
    const iconName = element.getAttribute('data-icon');
    const img = document.createElement('img');
    img.src = `assets/svgs/color/${iconName}.svg`;
    img.alt = '';
    img.style.width = '24px';
    img.style.height = '24px';
    element.appendChild(img);
  }
}

// Load current settings from storage
async function loadSettings() {
  const result = await api.storage.local.get(['buttonState', 'iconStyle', 'hoverColor', 'openInNewTab']);
  const state = result.buttonState || defaultButtonState;
  const iconStyle = result.iconStyle || 'simple';
  const hoverColor = result.hoverColor || 'purple';
  const openInNewTab = result.openInNewTab || false;

  // Update toggle switches
  Object.keys(state).forEach(buttonId => {
    const toggle = document.getElementById(buttonId);
    if (toggle) {
      toggle.checked = state[buttonId];
    }
  });

  // Update open in new tab toggle
  const newTabToggle = document.getElementById('openInNewTab');
  if (newTabToggle) {
    newTabToggle.checked = openInNewTab;
  }

  // Update icon style selector
  document.querySelectorAll('.icon-style-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.style === iconStyle);
  });

  // Update hover color palette
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.classList.toggle('active', swatch.dataset.color === hoverColor);
  });

  return { buttonState: state, iconStyle, hoverColor };
}

// Notify all open Kagi tabs that settings changed
async function notifyContentScript(key, value) {
  try {
    const tabs = await api.tabs.query({ url: 'https://kagi.com/*' });
    for (const tab of tabs) {
      api.tabs.sendMessage(tab.id, { type: 'settingsChanged', key, value }).catch(() => {});
    }
  } catch (e) {
    // No Kagi tabs open — that's fine
  }
}

// Save button state to storage
function saveButtonState(buttonState) {
  api.storage.local.set({ buttonState });
  notifyContentScript('buttonState', buttonState);
}

// Save icon style to storage
function saveIconStyle(iconStyle) {
  api.storage.local.set({ iconStyle });
  notifyContentScript('iconStyle', iconStyle);
}

// Hover color definitions (light/dark pairs matching content.js)
const popupHoverColors = {
  purple:   { light: '#4835BC', dark: '#C9C1FF' },
  orange:   { light: '#D4550E', dark: '#FF8C57' },
  sky:      { light: '#0C7DA8', dark: '#9DEBFE' },
  grass:    { light: '#3D7A2E', dark: '#7FD36E' },
  graphite: { light: '#191919', dark: '#B0B0B0' },
  yellow:   { light: '#B37A00', dark: '#FFD066' }
};

// Apply accent color to popup UI elements (toggles, icon style selector)
function applyPopupAccent(colorName) {
  const color = popupHoverColors[colorName] || popupHoverColors.purple;
  let styleEl = document.getElementById('popup-accent-vars');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'popup-accent-vars';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `
    input:checked + .slider { background-color: ${color.light}; }
    @media (prefers-color-scheme: dark) {
      input:checked + .slider { background-color: ${color.dark}; }
    }
  `;
}

// Save hover color to storage
function saveHoverColor(hoverColor) {
  api.storage.local.set({ hoverColor });
  notifyContentScript('hoverColor', hoverColor);
}

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  loadIcons();

  const settings = await loadSettings();
  const currentState = settings.buttonState;

  // Apply accent color to popup based on current hover color
  applyPopupAccent(settings.hoverColor);

  // Service toggle listeners
  const toggles = document.querySelectorAll('input[type="checkbox"]');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      currentState[toggle.id] = toggle.checked;
      saveButtonState(currentState);
    });
  });

  // Open in new tab toggle listener
  const newTabToggle = document.getElementById('openInNewTab');
  if (newTabToggle) {
    newTabToggle.addEventListener('change', () => {
      api.storage.local.set({ openInNewTab: newTabToggle.checked });
      notifyContentScript('openInNewTab', newTabToggle.checked);
    });
  }

  // Icon style selector listeners
  document.querySelectorAll('.icon-style-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.icon-style-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveIconStyle(btn.dataset.style);
    });
  });

  // Hover color palette listeners
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      saveHoverColor(swatch.dataset.color);
      applyPopupAccent(swatch.dataset.color);
    });
  });
});
