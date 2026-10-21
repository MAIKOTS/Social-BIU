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
