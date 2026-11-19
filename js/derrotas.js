/* =====================================================================
   v87 — DERROTA FINAL de los referentes (v96: nueve) (un solo lugar para TODO el juego).
   ---------------------------------------------------------------------
   Paquete animaciones_nuevas/DERROTA_10_REFERENTES_v1/ENTREGA → assets/referentes/<carpeta>/derrota/<id>_muerto_acostado.webp
   (halo difuso y borde de color limpiados). Pose FINAL individual: cuerpo tendido boca arriba, cabeza a la izquierda.
   Mapeo por IDENTIFICADOR real del referente, aplicado a:
     · SPRITES_REFERENTES[id]  (jugador en las campañas y en Batalla Campal, aliados con IA): anim.ko = ['muerto'];
       la caída existente (anim.koCaida) se conserva; quien no tiene caída dibujada (Alan, Matute) cae con su
       último cuadro de golpe recibido y queda tendido (ya no se gira la pose de pie).
     · SPRITES_ENEMIGOS[id]   (el mismo referente como rival o jefe): anim.muerto = 'muertoFinal' (solo la derrota DEFINITIVA:
       las caídas temporales siguen usando su pose de suelo de siempre; la segunda vida de El Abuelo no pasa por acá).
   Escala: el largo del cuerpo tendido (cabeza a talones) = el alto del personaje parado → ref = largo en px del original.
   Pie: línea de apoyo un poco arriba del borde inferior (la espalda apoya sobre la sombra). Ancla: centro del cuerpo.
   No se refleja (mira 'frente'): la remera de Pistola y la franja de William quedan siempre del lado correcto.
   ===================================================================== */
(function () {
  'use strict';
  const POSES = {
    abuelo: {"src": "assets/referentes/abuelo/derrota/el_abuelo_muerto_acostado.webp", "ref": 1669, "pie": 740, "ancla": 896.5},
    cdp: {"src": "assets/referentes/cdp/derrota/cabeza_de_poronga_muerto_acostado.webp", "ref": 1915, "pie": 680, "ancla": 992.5},
    pistola_gamez: {"src": "assets/referentes/pistola_gamez/derrota/pistola_gamez_muerto_acostado.webp", "ref": 1521, "pie": 783, "ancla": 794.5},
    alan: {"src": "assets/referentes/alan/derrota/alan_muerto_acostado.webp", "ref": 1675, "pie": 754, "ancla": 886.5},
    william: {"src": "assets/referentes/william/derrota/william_muerto_acostado.webp", "ref": 1689, "pie": 700, "ancla": 890.5},
    matute: {"src": "assets/referentes/matute/derrota/matute_muerto_acostado.webp", "ref": 1587, "pie": 765, "ancla": 909.5},
    cacho: {"src": "assets/referentes/cacho/derrota/cacho_muerto_acostado.webp", "ref": 1584, "pie": 728, "ancla": 873.0},
    el_gallego: {"src": "assets/referentes/el_gallego/derrota/el_gallego_muerto_acostado.webp", "ref": 1581, "pie": 736, "ancla": 886.5},
    el_chivo: {"src": "assets/referentes/el_chivo/derrota/el_chivo_muerto_acostado.webp", "ref": 1651, "pie": 727, "ancla": 901.5}
  };
  const ENEMIGO = {"abuelo": "el_abuelo", "cdp": "cabeza_de_poronga", "matute": "matute", "cacho": "cacho", "el_gallego": "el_gallego", "el_chivo": "el_chivo"};
  const R = window.SPRITES_REFERENTES || {}, E = window.SPRITES_ENEMIGOS || {}, aplicados = [];
  for (const [rid, m] of Object.entries(POSES)) {
    const D = R[rid];
    if (D) {
      D.altoReferencia.MUERTO = m.ref;
      D.frames.muerto = { src: m.src, mira: 'frente', grupo: 'MUERTO', pie: m.pie, ancla: m.ancla, sinGiro: true, acostado: true };
      if (!D.anim.koCaida) { const dl = D.anim.dolor || D.anim.quieto; D.anim.koCaida = [dl[dl.length - 1]]; }
      D.anim.ko = ['muerto'];
      aplicados.push('referente:' + rid);
    }
    const X = E[ENEMIGO[rid]];
    if (X) {
      // la pose de suelo de las caídas TEMPORALES queda como estaba (antes caía en 'muerto' si no tenía 'suelo')
      if (!X.anim.suelo) X.anim.suelo = X.anim.muerto || X.anim.caida || X.anim.koGirando;
      X.frames.muertoFinal = { src: m.src, mira: 'frente', ref: m.ref, pie: m.pie, ancla: m.ancla, acostado: true };
      X.anim.muerto = 'muertoFinal';
      aplicados.push('rival:' + ENEMIGO[rid]);
    }
  }
  window.Derrotas = { POSES, ENEMIGO, aplicados, total: Object.keys(POSES).length };
})();
