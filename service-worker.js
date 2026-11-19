const VERSION = "v1";
const CACHE_PREFIX = "pwa-" + self.registration.scope;
const CACHE_NAME = CACHE_PREFIX + VERSION;
const OFFLINE_URL = new URL("offline.html", self.registration.scope).href;

self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })());
});

self.addEventListener("activate", event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map(key => caches.delete(key)));
        if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
        await self.clients.claim();
    })());
});


self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET" || event.request.mode !== "navigate") return;
    if (!event.request.url.startsWith(self.registration.scope)) return;
    event.respondWith((async () => {
        try {
            const preload = await event.preloadResponse;
            return preload || await fetch(event.request);
        } catch (error) {
            return (await caches.open(CACHE_NAME)).match(OFFLINE_URL)
                .then(response => response || Response.error());
        }
    })());
});
