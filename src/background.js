// Cross-browser API shim
const api = typeof browser !== 'undefined' ? browser : chrome;

// Set uninstall URL
api.runtime.setUninstallURL('https://tinyextensions.com/uninstall?ext=jumpbar');
