
// ==========================================
// BANNER IN-APP
// ==========================================
function iniciarBannerApp() {
  if (estaEmApp) {
    const banner = document.getElementById('inappBanner');
    if (banner) banner.classList.add('show');
  }
  const btn = document.getElementById('btnCopiarBanner');
  if (btn) btn.addEventListener('click', copiarLink);
}
