const CACHE_NAME = 'maikots-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './css/variaveis.css',
  './css/base.css',
  './css/componentes.css',
  './css/animacoes.css',
  './js/carregar-html.js',
  './js/configs-e-variaveis-globais.js',
  './js/toast.js',
  './js/banner-in-app.js',
  './js/contadores.js',
  './js/compartilhar.js',
  './js/efeito-ripple.js',
  './js/links-apps.js',
  './js/principal.js',
  './componentes/banner-in-app.html',
  './componentes/cabecalho.html',
  './componentes/estatisticas.html',
  './componentes/links.html',
  './componentes/rodape.html'
];

// Instala o Service Worker e salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepta as requisições (se estiver offline, usa o cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});