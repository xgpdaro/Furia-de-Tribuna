/* =====================================================================
   BARRA 14 — Poder especial (tecla L): reglas compartidas y presentaciones
   ---------------------------------------------------------------------
   REGLAS (iguales para todos los referentes; el motor está en js/juego.js):
   · Carga: 7 enemigos derrotados de forma definitiva POR ATAQUES NORMALES = 100 %. Contador entero (0…7),
     una sola carga disponible. Agotar la PRIMERA vida de un especial no cuenta. v37: las derrotas que causa
     el poder NO cuentan (no hay autorrecarga); las bajas por golpes normales durante la lluvia sí cuentan.
   · Se conserva entre oleadas y niveles de la misma partida. Empieza en 0 en una partida nueva
     (menú, campaña de nuevo o entrada directa a un nivel). Al reintentar un nivel perdido vuelve a la
     carga con la que se EMPEZÓ ese nivel (lo cargado en el intento perdido no queda).
   · L con carga completa: una activación por pulsación (sin repetición por tecla mantenida, nunca en pausa
     ni mientras dura otra activación). Consume la carga al comenzar.
   · Objetivos: TODOS los enemigos que ya entraron al combate en ese instante (lista fija). Los que
     todavía esperan para entrar y las oleadas futuras no se tocan.
   · Comunes: mueren aunque estén cubriéndose. Especiales (2 vidas): pierden SOLO la vida actual
     (sin pasar el sobrante); si estaban en la primera, caen y se recuperan con la segunda al 100 %;
     si estaban en la segunda, quedan derrotados. Un especial que ya está recuperándose no pierde nada.
   · El resultado se aplica UNA vez por objetivo, al COMENZAR la lluvia (v36).
     Las piedras y efectos que siguen son solo visuales.
   Tiempos en SEGUNDOS de juego (la pausa los congela).
   ===================================================================== */
(function (global) {
  'use strict';

  const CARGA_TOTAL = 7;

  /* v36 — PRESENTACIÓN. Por decisión de Darío, por ahora todos usan el MISMO efecto: lluvia de piedras,
     botellas y vidrios con el mismo sonido. Lo que cambia por personaje son SOLO sus dos poses de señal
     (mano arriba → da la orden), que están en js/sprites_referentes.js → anim.poder de cada uno.
     El efecto está separado de las poses para poder darle a cada uno un poder distinto más adelante
     sin tocar la carga ni el daño. Tiempos en s desde que se aprieta L. */
  const LLUVIA = { dura: 3.6, video: 'assets/poder/lluvia_piedras.webm', sonido: 'assets/poder/lluvia_piedras.ogg' };
  const SENIAS = {
    // pose 0 = mano arriba · pose 1 = da la orden. La lluvia (y el resultado, una sola vez) arranca al entrar en la pose 1.
    matute: { orden: 0.45, fin: 1.10 },   // tiempos ya ajustados en la v35 (se conservan)
    alan:   { orden: 0.25, fin: 0.45 },   // pedido: ~250 ms la primera pose y ~200 ms la segunda
    el_gallego: { orden: 0.25, fin: 0.45 }   // v58: = Alan
  };
  SENIAS.william = { ...SENIAS.alan };   // v82: William reutiliza el poder de Alan con sus poses 29 (preparar) y 30 (golpe)
  const SENIA_SIN_POSES = { orden: 0.25, fin: 0.45 };   // personaje sin poses de poder: su propia guardia
  /* v95 — CARGA DE HOMBRO en 4 poses (preparar → impulso → impacto → recuperar), referentes de Talleres y Central. Mismas reglas de carga,
     objetivos y efecto que los demás: el resultado se aplica UNA vez, al entrar en la pose de IMPACTO (fases[1] = fin del impulso). */
  const HOMBRO = { fases: [0.22, 0.36, 0.62, 0.86] };
  for (const id of ['el_capo_talleres', 'el_toro_talleres', 'el_viejo_talleres', 'pillin_central', 'el_rana_central', 'chapero_central', 'pimpi_newells', 'el_panadero_newells', 'manzanita', 'corea', 'el_abuelo_moron', 'el_gordo_cadena', 'el_paraguayo', 'el_colo', 'el_tarta', 'muchinga_chacarita', 'chuky_chacarita', 'pajarito_chacarita', 'el_armenio', 'el_tuerto', 'el_manco']) SENIAS[id] = HOMBRO;   // v104: + Laferrere   // v103: + Chacarita y El Armenio   // v101: + Morón y Chicago   // v97: + Newell's · v98: + Manzanita
  function presentacionDe(idPersonaje) {
    const s = SENIAS[idPersonaje] || SENIA_SIN_POSES;
    if (s.fases) {   // v95: secuencia de N poses; el impacto (y la lluvia) arranca al empezar la tercera pose
      const imp = s.fases[1], fin = s.fases[s.fases.length - 1];
      return { tipo: 'lluvia', poses: s.fases.map((h, i) => ({ hasta: h, pose: i })), quieto: fin,
        lluvia: { desde: imp, dura: LLUVIA.dura, video: LLUVIA.video, sonido: LLUVIA.sonido }, impacto: imp, duracion: imp + LLUVIA.dura };
    }
    return {
      tipo: 'lluvia',
      poses: [ { hasta: s.orden, pose: 0 }, { hasta: s.fin, pose: 1 } ],
      quieto: s.fin,                                    // s que el jugador queda dando la señal (no camina, no ataca, no recibe golpes)
      lluvia: { desde: s.orden, dura: LLUVIA.dura, video: LLUVIA.video, sonido: LLUVIA.sonido },
      impacto: s.orden,                                 // el resultado se aplica UNA vez, al comenzar la lluvia
      duracion: s.orden + LLUVIA.dura                   // recién al terminar se puede lanzar otra activación
    };
  }

  global.Poder = { CARGA_TOTAL, LLUVIA, SENIAS, presentacionDe };
})(typeof window !== 'undefined' ? window : globalThis);
