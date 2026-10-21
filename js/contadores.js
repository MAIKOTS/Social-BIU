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