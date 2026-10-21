// ==========================================
// LINKS DE APLICATIVOS (DEEP LINKS)
// ==========================================
function iniciarLinksApp() {
  document.querySelectorAll('a[data-deeplink]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (!ehCelular) return;
      if (estaEmApp) return;

      e.preventDefault();

      let urlDestino = this.dataset.deeplink;
      if (ehAndroid && this.dataset.android) {
        urlDestino = this.dataset.android;
      }
      const urlFallback = this.href;

      let appAbriu = false;
      const aoEsconder = () => { if (document.hidden) appAbriu = true; };
      document.addEventListener('visibilitychange', aoEsconder);

      const aoDesfocar = () => { appAbriu = true; };
      window.addEventListener('blur', aoDesfocar, { once: true });

      window.location.href = urlDestino;

      setTimeout(() => {
        document.removeEventListener('visibilitychange', aoEsconder);
        window.removeEventListener('blur', aoDesfocar);
        if (!appAbriu && !document.hidden) {
          window.location.href = urlFallback;
        }
      }, 1800);
    });
  });
}