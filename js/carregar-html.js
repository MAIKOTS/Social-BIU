// js/carregar-html.js
async function carregarComponentes() {
  const elementos = document.querySelectorAll('[data-include]');
  
  for (let el of elementos) {
    const arquivo = el.getAttribute('data-include');
    try {
      const resposta = await fetch(arquivo);
      el.innerHTML = await resposta.text();
    } catch (erro) {
      console.error(`Erro ao carregar ${arquivo}:`, erro);
    }
  }

  // Avisa todos os outros scripts que o HTML foi montado!
  document.dispatchEvent(new Event('htmlPronto'));
}

carregarComponentes();