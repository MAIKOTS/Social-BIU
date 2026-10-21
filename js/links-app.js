// ==========================================
// LINKS DE APLICATIVOS (DEEP LINKS)
// Arquivo isolado e auto-inicializável
// ==========================================
(function () {
  // Detecta o ambiente localmente (sem depender do script.js)
  const ua = navigator.userAgent || '';
  const estaEmApp = /Instagram|FBAN|FBAV|FB_IAB|TikTok/i.test(ua);
  const ehCelular = /Android|iPhone|iPad|iPod/i.test(ua);
  const ehAndroid = /Android/i.test(ua);

  document.querySelectorAll('a[data-deeplink]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (!ehCelular) return;  // Desktop: usa o href normal
      if (estaEmApp)  return;  // Instagram/FB/TikTok: banner já orienta

      e.preventDefault();

      let urlDestino = this.dataset.deeplink;
      if (ehAndroid && this.dataset.android) {
        urlDestino = this.dataset.android;
      }
      const urlFallback = this.href;

      // Detecta se o app abriu (página oculta ou perdeu foco)
      let appAbriu = false;
      const aoEsconder = () => { if (document.hidden) appAbriu = true; };
      document.addEventListener('visibilitychange', aoEsconder);

      const aoDesfocar = () => { appAbriu = true; };
      window.addEventListener('blur', aoDesfocar, { once: true });

      // Tenta abrir o app
      window.location.href = urlDestino;

      // Só cai no site se o app NÃO abriu
      setTimeout(() => {
        document.removeEventListener('visibilitychange', aoEsconder);
        window.removeEventListener('blur', aoDesfocar);
        if (!appAbriu && !document.hidden) {
          window.location.href = urlFallback;
        }
      }, 1800);
    });
  });
})();