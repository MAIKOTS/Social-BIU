/* Botão de compartilhar (usa Web Share API quando disponível) */
import { mostrarAviso } from './toast.js';

export function iniciarCompartilhar() {
  const botao = document.getElementById('shareBtn');
  if (!botao) return;

  botao.addEventListener('click', async () => {
    const dados = {
      title: 'Maiko.TS | Info',
      text:  'Confira meus links!',
      url:   window.location.href
    };

    if (navigator.share) {
      try { await navigator.share(dados); } catch (e) { /* cancelado */ }
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