// js/pwa.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((reg) => console.log('PWA ativado!', reg.scope))
      .catch((err) => console.log('Erro ao ativar PWA:', err));
  });
}