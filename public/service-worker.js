const CACHE_NAME = 'BudgetTracker-version_1.0';

const FILES_TO_CACHE = [
    './manifest.json',
    './index.html',
    './js/index.js',
    './css/styles.css'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Success!!!!!!');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
})

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (request) {
            return request || fetch(e.request);
        })
    )
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(CACHE_NAME);
            })

            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
});