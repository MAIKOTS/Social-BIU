/* Abre os apps nativos quando possível (com fallback inteligente) */
import { estaEmApp, ehCelular, ehAndroid } from './deteccao-navegador.js';

export function iniciarLinksApp() {
  document.querySelectorAll('a[data-deeplink]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (!ehCelular) return;  // Desktop: usa href normal
      if (estaEmApp)  return;  // Instagram/FB/TikTok: banner já orienta

      e.preventDefault();

      let urlDestino = this.dataset.deeplink;
      if (ehAndroid && this.dataset.android) {
        urlDestino = this.dataset.android;
      }
      const urlFallback = this.href;

      /* Detecta se o app abriu (página fica oculta ou perde foco) */
      let appAbriu = false;
      const aoEsconder = () => { if (document.hidden) appAbriu = true; };
      document.addEventListener('visibilitychange', aoEsconder);

      const aoDesfocar = () => { appAbriu = true; };
      window.addEventListener('blur', aoDesfocar, { once: true });

      /* Tenta abrir o app */
      window.location.href = urlDestino;

      /* Só cai no site se o app NÃO abriu */
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