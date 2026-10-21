/* Banner exibido quando o site é aberto dentro do Instagram/Facebook/TikTok */
import { estaEmApp } from './deteccao-navegador.js';
import { copiarLink } from './toast.js';

export function iniciarBannerApp() {
  if (estaEmApp) {
    const banner = document.getElementById('inappBanner');
    if (banner) banner.classList.add('show');
  }

  const btn = document.getElementById('btnCopiarBanner');
  if (btn) btn.addEventListener('click', copiarLink);
}