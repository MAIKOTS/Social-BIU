// ==========================================
// INICIALIZAÇÃO PRINCIPAL
// Espera o HTML ser montado para rodar os scripts
// ==========================================
document.addEventListener('htmlPronto', () => {
  iniciarBannerApp();
  iniciarVisitas();
  iniciarCurtidas();
  iniciarCompartilhar();
  iniciarRipple();
});