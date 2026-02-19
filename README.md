<img src="https://cdn.cottle.cloud/tinyextensions/jumpbar/logo.gif" width="150">

# Jumpbar for Kagi

Quick-access buttons for Kagi services, right on the homepage. Available for Chrome, Firefox, Edge, and Safari.

## How It Works

Jumpbar for Kagi adds a row of shortcut buttons below the search bar on the [Kagi](https://kagi.com) homepage. Click any button to jump straight to that service—no menus, no hunting.

## Services

| Button | Service |
|---|---|
| **Assistant** | [kagi.com/assistant](https://kagi.com/assistant) |
| **News** | [news.kagi.com](https://news.kagi.com) |
| **Translate** | [translate.kagi.com](https://translate.kagi.com) |
| **Summarize** | [kagi.com/summarizer](https://kagi.com/summarizer) |
| **Small Web** | [kagi.com/smallweb](https://kagi.com/smallweb) |

## Settings

Click the extension icon in your toolbar to open settings. You can:

- **Icon Style**: Choose between Simple (minimal, adapts to light/dark mode) or Color (branded icons).
- **Hover Color**: Pick a hover accent color from Kagi's palette: Purple (default), Orange, Sky, Grass, Graphite, or Yellow. Colors automatically adjust for light and dark mode accessibility.
- **Open in New Tab**: Off by default (links open in the same window). Enable to open services in a new tab.
- **Service Toggles**: Show or hide individual service buttons.

Settings sync across your devices via your browser's built-in extension storage.

## Building

Jumpbar for Kagi uses a build script to produce browser-specific packages:

```bash
./build.sh
```

This creates:
- `dist/chrome/`: Uses `service_worker` in the manifest
- `dist/firefox/`: Uses `scripts` in the manifest with `browser_specific_settings` for Gecko

The JavaScript is identical across both builds. Only the `manifest.json` differs.

## Requested Permissions

Jumpbar for Kagi requests a few permissions in the `manifest.json` file.

`storage` allows the extension to save your preferences (icon style, hover color, open in new tab, and service visibility) using the browser's built-in extension storage. This data syncs across your devices if you're signed into your browser.

`kagi.com` (host permission) allows the extension to add the jumpbar buttons to the Kagi homepage.

#### Privacy

Jumpbar for Kagi runs completely locally in your browser. The only data it stores are your settings preferences, which are kept in your browser's extension storage. It does not collect any analytics, it does not store any information about your tabs or browser history, it does not send any data back for processing or analysis. Your data is yours and yours alone.

## Installing Jumpbar for Kagi

Jumpbar for Kagi is available for manual download and installation. Store listings coming soon.

[![Download the Latest GitHub Release](https://cdn.cottle.cloud/tabcloser/buttons/button-latest.svg)](https://github.com/sethcottle/jumpbar/zipball/main)

#### For Chrome
Download the latest release and unzip it. Then navigate to `chrome://extensions/` and enable "Developer mode" using the toggle in the top right corner. Upload the extension manually by pressing "Load unpacked" and selecting the unzipped folder.

#### For Firefox
Download the latest release and unzip it. Navigate to `about:debugging#/runtime/this-firefox` and click "Load Temporary Add-on", then select `manifest.json` from the `dist/firefox/` folder. For permanent installation, install from Firefox Add-ons (AMO) when available.

#### For Edge
Download the latest release and unzip it. Then navigate to `edge://extensions/` and enable "Developer mode" in the left sidebar, it's near the bottom. Upload the extension manually by pressing "Load unpacked" and selecting the unzipped folder.

#### For Safari
Safari support is coming via Xcode wrapper. Once available, you'll need to launch Safari and go to `Safari` > `Settings` > `Advanced` and check `Show features for web developers`. Then go to the Developer tab and enable `Allow unsigned extensions`.

## Support the Extension

You can support Jumpbar for Kagi by contributing through these links:

[![Buy Me A Coffee](https://cdn.cottle.cloud/tabcloser/buttons/button-bmac.svg)](https://buymeacoffee.com/seth)

[![PayPal](https://cdn.cottle.cloud/tabcloser/buttons/button-paypal.svg)](https://www.paypal.com/paypalme/sethcottle)

[![GitHub Sponsors](https://cdn.cottle.cloud/tabcloser/buttons/button-ghs.svg)](https://github.com/sponsors/sethcottle)

Signing up through these services through these affiliate links is also a good way to support Jumpbar for Kagi.

[![Try DigitalOcean](https://cdn.cottle.cloud/tabcloser/buttons/button-do.svg)](https://m.do.co/c/632b45e20266)

[![Try Fathom Analytics](https://cdn.cottle.cloud/tabcloser/buttons/button-fa.svg)](https://usefathom.com/ref/EQVZMV)

## OpenKagi

I also built [OpenKagi](https://openkagi.com), a community project built for people who love Kagi Search and want to extend what's possible with it. OpenKagi is a place to share, discover, and experiment with Kagi Lenses and Themes—making search more powerful, more personal, and more fun.

## License

Copyright (C) 2026 Seth Cottle

Jumpbar for Kagi is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any later version.

Jumpbar for Kagi is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. Please see the
[GNU General Public License](https://www.gnu.org/licenses/quick-guide-gplv3.html) for more details.

---

This is an unofficial extension and is not affiliated with, endorsed by, or connected to Kagi, Inc.
