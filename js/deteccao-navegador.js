/* Detecta o ambiente do usuário para ajustar o comportamento */
export const agenteUsuario = navigator.userAgent || '';
export const estaEmApp     = /Instagram|FBAN|FBAV|FB_IAB|TikTok/i.test(agenteUsuario);
export const ehCelular     = /Android|iPhone|iPad|iPod/i.test(agenteUsuario);
export const ehAndroid     = /Android/i.test(agenteUsuario);