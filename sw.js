importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "assets/javascripts/appcss.bundle.js",
    "revision": "bef1106846e8f3000d65ea506b8cf3b8"
  },
  {
    "url": "assets/javascripts/appjs.bundle.js",
    "revision": "6fe252b09d9c452167326d7fcd16c31f"
  },
  {
    "url": "assets/stylesheets/appcss.bundle.css",
    "revision": "2ccdf7b1d3bd1fac231c54eb572333af"
  },
  {
    "url": "index.html",
    "revision": "359e36c9b694e2cc936931fc7be33c31"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
