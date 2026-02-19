#!/bin/bash
# Build script for Jumpbar for Kagi
# Produces dist/chrome/ and dist/firefox/ with browser-specific manifests
# Version is read from the root manifest.json (single source of truth)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SRC_DIR="$SCRIPT_DIR/src"
DIST_DIR="$SCRIPT_DIR/dist"

# Read version from root manifest.json
VERSION=$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$SCRIPT_DIR/manifest.json")
echo "Building Jumpbar for Kagi v${VERSION}..."

# Clean previous builds
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR/chrome" "$DIST_DIR/firefox"

# Copy shared source files to both targets
for file in popup.html popup.js content.js styles.css background.js; do
  cp "$SRC_DIR/$file" "$DIST_DIR/chrome/$file"
  cp "$SRC_DIR/$file" "$DIST_DIR/firefox/$file"
done

# Copy assets to both targets
cp -r "$SRC_DIR/assets" "$DIST_DIR/chrome/assets"
cp -r "$SRC_DIR/assets" "$DIST_DIR/firefox/assets"

# Remove .DS_Store files from builds
find "$DIST_DIR" -name '.DS_Store' -delete 2>/dev/null || true

# Chrome manifest (MV3)
cat > "$DIST_DIR/chrome/manifest.json" << EOF
{
  "manifest_version": 3,
  "name": "Jumpbar for Kagi",
  "version": "${VERSION}",
  "description": "Adds a quick-access jumpbar to the Kagi homepage for Assistant, News, Translate, Summarize, and Small Web.",
  "permissions": ["storage"],
  "host_permissions": [
    "https://kagi.com/"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "Jumpbar for Kagi",
    "default_icon": {
      "16": "assets/icons/icon16.png",
      "48": "assets/icons/icon48.png",
      "128": "assets/icons/icon128.png"
    }
  },
  "icons": {
    "16": "assets/icons/icon16.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  },
  "content_scripts": [
    {
      "matches": ["https://kagi.com/"],
      "css": ["styles.css"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": [
        "assets/svgs/color/assistant.svg",
        "assets/svgs/color/news.svg",
        "assets/svgs/color/translate.svg",
        "assets/svgs/color/summarize.svg",
        "assets/svgs/color/smallweb.svg"
      ],
      "matches": ["https://kagi.com/*"]
    }
  ]
}
EOF

# Firefox manifest (MV3 with gecko settings)
cat > "$DIST_DIR/firefox/manifest.json" << EOF
{
  "manifest_version": 3,
  "name": "Jumpbar for Kagi",
  "version": "${VERSION}",
  "description": "Adds a quick-access jumpbar to the Kagi homepage for Assistant, News, Translate, Summarize, and Small Web.",
  "permissions": ["storage"],
  "host_permissions": [
    "https://kagi.com/"
  ],
  "background": {
    "scripts": ["background.js"]
  },
  "action": {
    "default_popup": "popup.html",
    "default_title": "Jumpbar for Kagi",
    "default_icon": {
      "16": "assets/icons/icon16.png",
      "48": "assets/icons/icon48.png",
      "128": "assets/icons/icon128.png"
    }
  },
  "icons": {
    "16": "assets/icons/icon16.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  },
  "content_scripts": [
    {
      "matches": ["https://kagi.com/"],
      "css": ["styles.css"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
    {
      "resources": [
        "assets/svgs/color/assistant.svg",
        "assets/svgs/color/news.svg",
        "assets/svgs/color/translate.svg",
        "assets/svgs/color/summarize.svg",
        "assets/svgs/color/smallweb.svg"
      ],
      "matches": ["https://kagi.com/*"]
    }
  ],
  "browser_specific_settings": {
    "gecko": {
      "id": "kagi-enhancer@sethcottle.com",
      "strict_min_version": "140.0",
      "data_collection_permissions": {
        "required": ["none"],
        "optional": []
      }
    }
  }
}
EOF

echo "Build complete (v${VERSION}):"
echo "  Chrome:  $DIST_DIR/chrome/"
echo "  Firefox: $DIST_DIR/firefox/"
