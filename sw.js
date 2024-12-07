console.log("service worker inside sw.js");

const cacheName = "app-shell-rsrs";
const assets = [
    "/",
    "index.html",
    "./assets/hamburgerIcon.jpg",
    "./logic/burn.js",
    "./logic/intake.js",
    "./logic/nav.js",
    "./logic/status.js",
    "./style/burn.css",
    "./style/intake.css",
    "./style/nav.css",
    "./style/status.css",
    "./views/burn.html",
    "./views/intake.html",
    "./views/status.html",
    "script.js",
    "style.css",
    "manifest.json",
    "sw.js",
    "bigicon.png",
    "icon.png"
]


self.addEventListener("install", evt => {
    console.log("service worker has been installed.");   //log in console
    evt.waitUntil(
    caches.open(cacheName).then(cache => {
        cache.addAll(assets);
        }) 
    );
});


self.addEventListener("activate", evt => {
    console.log("service worker has been activated.");   //log in console
});


self.addEventListener("fetch", evt => {
    console.log(evt);                                    //log in console
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || evt.request;
        })
    );
});