/* Dream Tour service worker — offline shell + fast repeat loads.
   Bump VERSION whenever you upload a new index.html so players get the update. */
const VERSION = 'dt-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const LIVE = /firebaseio\.com|identitytoolkit|securetoken|accounts\.google|apis\.google\.com|firebaseapp\.com\/__\/auth|googleapis\.com\/(identitytoolkit|oauth)|recaptcha|google-analytics|firebaseinstallations/;

self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (LIVE.test(url.href) || !/^https?:/.test(url.protocol)) return;
  if (req.mode === 'navigate') {              // network first, cached shell when offline
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', cp)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {   // stale-while-revalidate for CSS/JS/fonts/images
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
