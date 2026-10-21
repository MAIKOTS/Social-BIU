/* Avisos flutuantes + cópia de link */
let cronometroToast;

export function mostrarAviso(mensagem) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = mensagem;
  toast.classList.add('show');
  clearTimeout(cronometroToast);
  cronometroToast = setTimeout(() => toast.classList.remove('show'), 2500);
}

export function copiarLink() {
  const url = window.location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => mostrarAviso('Link copiado! 📋'));
  } else {
    prompt('Copie o link:', url);
  }
}