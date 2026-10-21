// ==========================================
// CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// ==========================================
const NS = 'maikots-social-biu';
const API = 'https://abacus.jasoncameron.dev';
const CHAVE_VISITA = 'maikots_visited';
const CHAVE_CURTIDA = 'maikots_liked';

const agenteUsuario = navigator.userAgent || '';
const estaEmApp = /Instagram|FBAN|FBAV|FB_IAB|TikTok/i.test(agenteUsuario);
const ehCelular = /Android|iPhone|iPad|iPod/i.test(agenteUsuario);
const ehAndroid = /Android/i.test(agenteUsuario);

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
// CONTADORES (VISITAS E CURTIDAS)
// ==========================================
function iniciarVisitas() {
  const el = document.getElementById('visitCount');
  if (!el) return;

  (async () => {
    try {
      let url;
      if (sessionStorage.getItem(CHAVE_VISITA)) {
        url = `${API}/get/${NS}/visits`;
      } else {
        url = `${API}/hit/${NS}/visits`;
        sessionStorage.setItem(CHAVE_VISITA, '1');
      }
      const resposta = await fetch(url);
      const dados = await resposta.json();
      if (dados && typeof dados.value === 'number') {
        el.textContent = dados.value.toLocaleString('pt-BR');
      } else {
        el.textContent = '0';
      }
    } catch (e) {
      el.textContent = '—';
    }
  })();
}

function iniciarCurtidas() {
  const botao = document.getElementById('likeBtn');
  const icone = document.getElementById('likeIcon');
  const contador = document.getElementById('likeCount');
  if (!botao || !icone || !contador) return;

  const jaCurtiu = () => localStorage.getItem(CHAVE_CURTIDA) === '1';

  if (jaCurtiu()) {
    botao.classList.add('liked');
    icone.classList.remove('fa-regular');
    icone.classList.add('fa-solid');
  }

  (async () => {
    try {
      const resposta = await fetch(`${API}/get/${NS}/likes`);
      const dados = await resposta.json();
      contador.textContent = (dados && typeof dados.value === 'number')
        ? dados.value.toLocaleString('pt-BR')
        : '0';
    } catch (e) {
      contador.textContent = '0';
    }
  })();

  botao.addEventListener('click', async () => {
    if (jaCurtiu()) {
      mostrarAviso('Você já curtiu! ❤️');
      return;
    }

    localStorage.setItem(CHAVE_CURTIDA, '1');
    botao.classList.add('liked');
    icone.classList.remove('fa-regular');
    icone.classList.add('fa-solid');

    try {
      const resposta = await fetch(`${API}/hit/${NS}/likes`);
      const dados = await resposta.json();
      if (dados && typeof dados.value === 'number') {
        contador.textContent = dados.value.toLocaleString('pt-BR');
      }
      mostrarAviso('Obrigado pela curtida! ❤️');
    } catch (e) {
      const atual = parseInt(contador.textContent.replace(/\D/g, ''), 10) || 0;
      contador.textContent = (atual + 1).toLocaleString('pt-BR');
      mostrarAviso('Obrigado pela curtida! ❤️');
    }
  });
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

// ==========================================
// EFEITO RIPPLE (ONDA AO CLICAR)
// ==========================================
function iniciarRipple() {
  document.querySelectorAll('.link, .like-btn, .share-btn').forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const tamanho = Math.max(rect.width, rect.height);
      const onda = document.createElement('span');

      onda.className = 'ripple';
      onda.style.width = onda.style.height = tamanho + 'px';
      onda.style.left = (e.clientX - rect.left - tamanho / 2) + 'px';
      onda.style.top = (e.clientY - rect.top - tamanho / 2) + 'px';

      this.appendChild(onda);
      setTimeout(() => onda.remove(), 600);
    });
  });
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  iniciarBannerApp();
  iniciarVisitas();
  iniciarCurtidas();
  iniciarLinksApp();
  iniciarCompartilhar();
  iniciarRipple();
});