/* Ponto de entrada: inicializa todos os módulos na ordem correta */
import { iniciarBannerApp }    from './banner-app.js';
import { iniciarVisitas, iniciarCurtidas } from './contadores.js';
import { iniciarLinksApp }     from './links-app.js';
import { iniciarCompartilhar } from './compartilhar.js';
import { iniciarRipple }       from './ripple.js';

document.addEventListener('DOMContentLoaded', () => {
  iniciarBannerApp();
  iniciarVisitas();
  iniciarCurtidas();
  iniciarLinksApp();
  iniciarCompartilhar();
  iniciarRipple();
});