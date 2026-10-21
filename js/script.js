
// ==========================================
// TOAST (AVISOS)
// ==========================================
let cronometroToast;
function mostrarAviso(mensagem) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = mensagem;
  toast.classList.add('show');
  clearTimeout(cronometroToast);
  cronometroToast = setTimeout(() => toast.classList.remove('show'), 2500);
}

function copiarLink() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => mostrarAviso('Link copiado! 📋'));
  } else {
    prompt('Copie o link:', url);
  }
}

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

// ==========================================
// COMPARTILHAR
// ==========================================
function iniciarCompartilhar() {
  const botao = document.getElementById('shareBtn');
  if (!botao) return;

  botao.addEventListener('click', async () => {
    const dados = {
      title: 'Maiko.TS | Info',
      text: 'Confira meus links!',
      url: window.location.href
    };

    if (navigator.share) {
      try { await navigator.share(dados); } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        mostrarAviso('Link copiado! 📋');
      } catch (e) {
        prompt('Copie o link:', window.location.href);
      }
    }
  });
}
