// Cross-browser API shim
const api = typeof browser !== 'undefined' ? browser : chrome;

// Inline simple SVGs (currentColor adapts to light/dark mode)
const svgIcons = {
  assistant: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5"></circle><circle cx="12" cy="12" r="7.75"></circle><path d="M19.2 14.9c-1.1.5-2.1 1.1-4.2 1.1-4 0-5-3-8.5-3-.9 0-1.6.1-2.1.3m15-3.5c-1.1.5-2.1 1.2-4.4 1.2-4 0-5-3-8.5-3-.4 0-.8 0-1.2.1"></path></svg>',
  news: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4.25 7.5a1 1 0 010-4.5H9c1.5 0 2.25 0 2.75.5s.5 1.25.5 2.75V7.5ZM19 12.5C19 10.25 19 9 18.25 8.25 17.5 7.5 16.25 7.5 13.5 7.5H4.25a2.25 2.25 0 01-2.25-2.25V14.5C2 17.25 2 18.5 2.75 19.25S5 20 7.5 20H14.5"></path><path d="M4.5 11h7.5m-7.5 2.5h4.5m-4.5 2.5h4.5" stroke-width="1"></path><circle cx="17.5" cy="16.5" r="4.5"></circle><path d="M22 16.5a4.5 4.5 90 00-5.75 4.25M13.25 16.5a4.5 4.5 90 005.75-4.25" stroke-width=".75"></path></svg>',
  translate: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 9.5V6.25a3.25 3.25 0 00-3.25-3.25H5.5a3.25 3.25 0 00-3.25 3.25v5.75a3.25 3.25 0 003.25 3.25H9.5a3.25 3.25 0 001.5-.25"></path><rect x="11" y="9.25" width="10.5" height="12.25" rx="3.25"></rect><path d="M7.4 5.4 9.6 10.3 8.2 10.2M10 6 4.8 6.7M9.9 12.2H6.6A1.7 1.7 0 014.9 10.5M10.2 7.9l-5.2.7" stroke-width="1"></path><path d="M3.5 16.5a2.5 2.5 0 002.5 2.5h1.5m-.5-1.75 1.25 1.75-1.25 1.75M19.75 6.5a2.5 2.5 0 00-2.5-2.5h-1.5m.5 1.75-1.25-1.75 1.25-1.75" stroke-width="1"></path><path d="M14.25 18.25v-4.25a1 1 0 014.25 0v4.25m-4.25-2.5h4.25" stroke-width="1"></path></svg>',
  summarize: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 5a2.5 2.5 0 00-2.5-2.5h-9.5a2.5 2.5 0 00-2.5 2.5V17.5a2.5 2.5 0 002.5 2.5H6.5" stroke-linecap="butt"></path><rect x="6.5" y="4.5" rx="2.5" width="14.5" height="17"></rect><circle cx="9.75" cy="9.5" r=".85" fill="currentColor" stroke="none"></circle><circle cx="9.75" cy="13" r=".85" fill="currentColor" stroke="none"></circle><circle cx="9.75" cy="16.5" r=".85" fill="currentColor" stroke="none"></circle><path d="M12 9.5h6m-6 3.5h6m-6 3.5h6" stroke-width="1"></path></svg>',
  smallweb: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.56"></circle><path d="M18.64 13.18a15 12 0 00-6.64-11.25 15 12 0 00-6.64 11.25" stroke-width="1"></path><path d="M12 22.56a9.5 9.5 0 013.6-7.76 11 10 0 00-3.6-8 11 10 0 00-3.6 8M22.53 12.82a9.5 9.5 0 00-10.53 9.74 9.5 9.5 0 00-10.53-9.74 10.56 10.56 0 0021.06 0Z" stroke-width="1"></path></svg>'
};

// Color SVG icon references (loaded as img from extension assets)
const colorIconPaths = {
  assistant: 'assets/svgs/color/assistant.svg',
  news: 'assets/svgs/color/news.svg',
  translate: 'assets/svgs/color/translate.svg',
  summarize: 'assets/svgs/color/summarize.svg',
  smallweb: 'assets/svgs/color/smallweb.svg'
};

// Hover color definitions — accessible light/dark pairs for each Kagi palette color
const hoverColors = {
  purple:   { light: '#4835BC', dark: '#C9C1FF', shadowLight: 'rgba(72, 53, 188, 0.25)',   shadowDark: 'rgba(201, 193, 255, 0.25)' },
  orange:   { light: '#D4550E', dark: '#FF8C57', shadowLight: 'rgba(212, 85, 14, 0.25)',    shadowDark: 'rgba(255, 140, 87, 0.25)' },
  sky:      { light: '#0C7DA8', dark: '#9DEBFE', shadowLight: 'rgba(12, 125, 168, 0.25)',   shadowDark: 'rgba(157, 235, 254, 0.25)' },
  grass:    { light: '#3D7A2E', dark: '#7FD36E', shadowLight: 'rgba(61, 122, 46, 0.25)',    shadowDark: 'rgba(127, 211, 110, 0.25)' },
  graphite: { light: '#191919', dark: '#B0B0B0', shadowLight: 'rgba(25, 25, 25, 0.25)',     shadowDark: 'rgba(176, 176, 176, 0.25)' },
  yellow:   { light: '#B37A00', dark: '#FFD066', shadowLight: 'rgba(179, 122, 0, 0.25)',    shadowDark: 'rgba(255, 208, 102, 0.25)' }
};

// Inject CSS custom properties for the selected hover color
function applyHoverColor(colorName) {
  const color = hoverColors[colorName] || hoverColors.purple;
  let styleEl = document.getElementById('kagi-enhancer-hover-vars');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'kagi-enhancer-hover-vars';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `:root {
    --kagi-hover-light: ${color.light};
    --kagi-hover-dark: ${color.dark};
    --kagi-hover-shadow-light: ${color.shadowLight};
    --kagi-hover-shadow-dark: ${color.shadowDark};
    --kagi-focus-light: ${color.light};
    --kagi-focus-dark: ${color.dark};
  }`;
}

// Run on the Kagi homepage
if (window.location.pathname === '/' && window.location.hostname === 'kagi.com') {

  // Default button state (all enabled by default)
  const defaultButtonState = {
    assistant: true,
    news: true,
    translate: true,
    summarize: true,
    smallweb: true
  };

  // Get button visibility state, icon style, and hover color from storage
  const getSettings = () => {
    return new Promise((resolve) => {
      if (api.storage) {
        api.storage.sync.get(['buttonState', 'iconStyle', 'hoverColor', 'openInNewTab'], (result) => {
          resolve({
            buttonState: result.buttonState || defaultButtonState,
            iconStyle: result.iconStyle || 'simple',
            hoverColor: result.hoverColor || 'purple',
            openInNewTab: result.openInNewTab || false
          });
        });
      } else {
        const storedButtons = localStorage.getItem('kagiEnhancerButtons');
        const storedStyle = localStorage.getItem('kagiEnhancerIconStyle');
        const storedColor = localStorage.getItem('kagiEnhancerHoverColor');
        const storedNewTab = localStorage.getItem('kagiEnhancerOpenInNewTab');
        resolve({
          buttonState: storedButtons ? JSON.parse(storedButtons) : defaultButtonState,
          iconStyle: storedStyle || 'simple',
          hoverColor: storedColor || 'purple',
          openInNewTab: storedNewTab === 'true'
        });
      }
    });
  };

  // Wait for the page to load and find the search container
  const init = async () => {
    const settings = await getSettings();
    const { buttonState, iconStyle, hoverColor, openInNewTab } = settings;

    // Apply hover color custom properties
    applyHoverColor(hoverColor);

    // Find the search form wrapper
    const searchFormWrapper = document.querySelector('.search-form-wrapper') ||
                              document.querySelector('#searchForm')?.closest('.search-form-wrapper');

    if (!searchFormWrapper) {
      setTimeout(init, 100);
      return;
    }

    // Check if we already added the buttons
    if (document.querySelector('.kagi-enhancer-buttons')) {
      return;
    }

    // Create the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'kagi-enhancer-buttons';

    // Button configurations
    const buttons = [
      { id: 'assistant', name: 'Assistant', url: 'https://kagi.com/assistant' },
      { id: 'news', name: 'News', url: 'https://news.kagi.com/' },
      { id: 'translate', name: 'Translate', url: 'https://translate.kagi.com/' },
      { id: 'summarize', name: 'Summarize', url: 'https://kagi.com/summarizer' },
      { id: 'smallweb', name: 'Small Web', url: 'https://kagi.com/smallweb' }
    ];

    // Create each button (only if enabled)
    buttons.forEach(btn => {
      if (!buttonState[btn.id]) return;

      const button = document.createElement('a');
      button.href = btn.url;
      button.className = 'kagi-enhancer-button';
      button.setAttribute('aria-label', btn.name);
      if (openInNewTab) {
        button.target = '_blank';
        button.rel = 'noopener';
      }

      const buttonContent = document.createElement('div');
      buttonContent.className = 'kagi-enhancer-button-content';

      // Create icon based on style preference
      if (iconStyle === 'color') {
        const icon = document.createElement('img');
        icon.className = 'kagi-enhancer-icon kagi-enhancer-icon-color';
        icon.alt = '';
        icon.src = api.runtime.getURL(colorIconPaths[btn.id]);
        buttonContent.appendChild(icon);
      } else {
        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'kagi-enhancer-icon';
        iconWrapper.innerHTML = svgIcons[btn.id];
        buttonContent.appendChild(iconWrapper);
      }

      const text = document.createElement('span');
      text.textContent = btn.name;
      text.className = 'kagi-enhancer-text';

      buttonContent.appendChild(text);
      button.appendChild(buttonContent);
      buttonContainer.appendChild(button);
    });

    // Only insert if there are buttons to show
    if (buttonContainer.children.length > 0) {
      searchFormWrapper.insertAdjacentElement('afterend', buttonContainer);
    }
  };

  // Listen for storage changes to update buttons
  if (api.storage) {
    api.storage.onChanged.addListener((changes) => {
      if (changes.hoverColor) {
        const newColor = changes.hoverColor.newValue || 'purple';
        applyHoverColor(newColor);
      }
      if (changes.buttonState || changes.iconStyle || changes.openInNewTab) {
        const existing = document.querySelector('.kagi-enhancer-buttons');
        if (existing) {
          existing.remove();
        }
        init();
      }
    });
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }

  // Watch for dynamic changes
  const observer = new MutationObserver(() => {
    if (!document.querySelector('.kagi-enhancer-buttons') && document.querySelector('.search-form-wrapper')) {
      init();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
