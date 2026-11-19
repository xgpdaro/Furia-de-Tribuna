/* =====================================================================
   v83 — GOLPES A/B de cinco referentes: Cacho, El Gallego, Cabeza de Poronga, El Abuelo y Pistola Gamez.
   ---------------------------------------------------------------------
   Paquete animaciones_nuevas/COMBOS_5_REFERENTES_v1 (40 PNG, 8 por personaje) → assets/referentes/<id>/golpes/.
   Piña A = recta · piña B = gancho ascendente · patada A = frontal media · patada B = lateral elevada.
   _D / _I = hacia dónde MIRA y PEGA en pantalla (cada lado con su dibujo: nada se refleja; Pistola conserva la remera en su izquierda).
   Son POSES DE IMPACTO: el motor pone la preparación (guardia), el impacto y la vuelta a guardia con los tiempos de siempre.
   Medidas por pose (px del original): pie = fila más baja; ancla = mediana de la cadera (del pecho en patadas);
   ref = alto de referencia → escala corporal IGUAL a la de su guardia (medida por área del cuerpo, no por el lienzo);
   alcance = hasta dónde llega el puño o el pie desde el ancla, en px a escala 1 (345 px de alto), acotado a ±20/25 % del alcance
   base (piña 150 · patada 190) para no cambiar el balance. Halo difuso y borde de color limpiados (alfa < 24, polvo > 4 px, borde
   semitransparente con el color del cuerpo vecino).
   Secuencia por botón (combo existente izq → izq → der, +10 % el 3.º): J = piña A → piña B → su piña de siempre (Pistola: el
   remerazo); K = patada A → patada B → su patada de siempre. El daño NO cambia por la variante (lo decide ReglasCombate).
   ===================================================================== */
(function () {
  'use strict';
  const POSES = {
    cacho: {
      pinaA_D: {"src": "assets/referentes/cacho/golpes/cacho_pina_a_derecha.webp", "mira": "der", "ref": 1271, "pie": 1387, "ancla": 400.0, "alcance": 166.1},
      pinaA_I: {"src": "assets/referentes/cacho/golpes/cacho_pina_a_izquierda.webp", "mira": "izq", "ref": 1271, "pie": 1381, "ancla": 631.0, "alcance": 163.7},
      pinaB_D: {"src": "assets/referentes/cacho/golpes/cacho_pina_b_derecha.webp", "mira": "der", "ref": 1403, "pie": 1425, "ancla": 499.0, "alcance": 120.0},
      pinaB_I: {"src": "assets/referentes/cacho/golpes/cacho_pina_b_izquierda.webp", "mira": "izq", "ref": 1403, "pie": 1415, "ancla": 570.0, "alcance": 129.8},
      patadaA_D: {"src": "assets/referentes/cacho/golpes/cacho_patada_a_derecha.webp", "mira": "der", "ref": 1234, "pie": 1390, "ancla": 342.0, "alcance": 186.2},
      patadaA_I: {"src": "assets/referentes/cacho/golpes/cacho_patada_a_izquierda.webp", "mira": "izq", "ref": 1234, "pie": 1400, "ancla": 647.0, "alcance": 175.3},
      patadaB_D: {"src": "assets/referentes/cacho/golpes/cacho_patada_b_derecha.webp", "mira": "der", "ref": 1146, "pie": 1329, "ancla": 444.0, "alcance": 169.8},
      patadaB_I: {"src": "assets/referentes/cacho/golpes/cacho_patada_b_izquierda.webp", "mira": "izq", "ref": 1146, "pie": 1324, "ancla": 582.0, "alcance": 172.5}
    },
    el_gallego: {
      pinaA_D: {"src": "assets/referentes/el_gallego/golpes/el_gallego_pina_a_derecha.webp", "mira": "der", "ref": 1199, "pie": 1303, "ancla": 460.0, "alcance": 185.0},
      pinaA_I: {"src": "assets/referentes/el_gallego/golpes/el_gallego_pina_a_izquierda.webp", "mira": "izq", "ref": 1199, "pie": 1291, "ancla": 681.0, "alcance": 181.3},
      pinaB_D: {"src": "assets/referentes/el_gallego/golpes/el_gallego_pina_b_derecha.webp", "mira": "der", "ref": 1228, "pie": 1307, "ancla": 566.0, "alcance": 140.5},
      pinaB_I: {"src": "assets/referentes/el_gallego/golpes/el_gallego_pina_b_izquierda.webp", "mira": "izq", "ref": 1228, "pie": 1295, "ancla": 605.0, "alcance": 138.8},
      patadaA_D: {"src": "assets/referentes/el_gallego/golpes/el_gallego_patada_a_derecha.webp", "mira": "der", "ref": 1126, "pie": 1302, "ancla": 414.0, "alcance": 207.7},
      patadaA_I: {"src": "assets/referentes/el_gallego/golpes/el_gallego_patada_a_izquierda.webp", "mira": "izq", "ref": 1126, "pie": 1322, "ancla": 740.0, "alcance": 213.3},
      patadaB_D: {"src": "assets/referentes/el_gallego/golpes/el_gallego_patada_b_derecha.webp", "mira": "der", "ref": 1021, "pie": 1286, "ancla": 536.0, "alcance": 194.6},
      patadaB_I: {"src": "assets/referentes/el_gallego/golpes/el_gallego_patada_b_izquierda.webp", "mira": "izq", "ref": 1021, "pie": 1240, "ancla": 603.0, "alcance": 189.9}
    },
    cdp: {
      pinaA_D: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_pina_a_derecha.webp", "mira": "der", "ref": 1211, "pie": 1286, "ancla": 459.0, "alcance": 183.2},
      pinaA_I: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_pina_a_izquierda.webp", "mira": "izq", "ref": 1211, "pie": 1319, "ancla": 668.0, "alcance": 184.3},
      pinaB_D: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_pina_b_derecha.webp", "mira": "der", "ref": 1230, "pie": 1304, "ancla": 575.0, "alcance": 140.0},
      pinaB_I: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_pina_b_izquierda.webp", "mira": "izq", "ref": 1230, "pie": 1323, "ancla": 579.0, "alcance": 134.6},
      patadaA_D: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_patada_a_derecha.webp", "mira": "der", "ref": 1122, "pie": 1298, "ancla": 380.0, "alcance": 221.4},
      patadaA_I: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_patada_a_izquierda.webp", "mira": "izq", "ref": 1122, "pie": 1295, "ancla": 730.0, "alcance": 214.3},
      patadaB_D: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_patada_b_derecha.webp", "mira": "der", "ref": 1078, "pie": 1274, "ancla": 540.0, "alcance": 176.3},
      patadaB_I: {"src": "assets/referentes/cdp/golpes/cabeza_de_poronga_patada_b_izquierda.webp", "mira": "izq", "ref": 1078, "pie": 1284, "ancla": 568.0, "alcance": 177.3}
    },
    abuelo: {
      pinaA_D: {"src": "assets/referentes/abuelo/golpes/el_abuelo_pina_a_derecha.webp", "mira": "der", "ref": 1314, "pie": 1152, "ancla": 560.0, "alcance": 170.4},
      pinaA_I: {"src": "assets/referentes/abuelo/golpes/el_abuelo_pina_a_izquierda.webp", "mira": "izq", "ref": 1314, "pie": 1150, "ancla": 737.0, "alcance": 172.8},
      pinaB_D: {"src": "assets/referentes/abuelo/golpes/el_abuelo_pina_b_derecha.webp", "mira": "der", "ref": 1302, "pie": 1133, "ancla": 677.0, "alcance": 125.3},
      pinaB_I: {"src": "assets/referentes/abuelo/golpes/el_abuelo_pina_b_izquierda.webp", "mira": "izq", "ref": 1302, "pie": 1144, "ancla": 666.0, "alcance": 122.9},
      patadaA_D: {"src": "assets/referentes/abuelo/golpes/el_abuelo_patada_a_derecha.webp", "mira": "der", "ref": 1209, "pie": 1137, "ancla": 538.0, "alcance": 196.3},
      patadaA_I: {"src": "assets/referentes/abuelo/golpes/el_abuelo_patada_a_izquierda.webp", "mira": "izq", "ref": 1209, "pie": 1148, "ancla": 828.0, "alcance": 188.3},
      patadaB_D: {"src": "assets/referentes/abuelo/golpes/el_abuelo_patada_b_derecha.webp", "mira": "der", "ref": 1227, "pie": 1149, "ancla": 633.0, "alcance": 179.7},
      patadaB_I: {"src": "assets/referentes/abuelo/golpes/el_abuelo_patada_b_izquierda.webp", "mira": "izq", "ref": 1227, "pie": 1149, "ancla": 757.0, "alcance": 196.5}
    },
    pistola_gamez: {
      pinaA_D: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_pina_a_derecha.webp", "mira": "der", "ref": 1248, "pie": 1221, "ancla": 591.0, "alcance": 167.0},
      pinaA_I: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_pina_a_izquierda.webp", "mira": "izq", "ref": 1248, "pie": 1233, "ancla": 690.0, "alcance": 162.0},
      pinaB_D: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_pina_b_derecha.webp", "mira": "der", "ref": 1231, "pie": 1221, "ancla": 627.0, "alcance": 120.0},
      pinaB_I: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_pina_b_izquierda.webp", "mira": "izq", "ref": 1231, "pie": 1197, "ancla": 619.0, "alcance": 120.0},
      patadaA_D: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_patada_a_derecha.webp", "mira": "der", "ref": 1145, "pie": 1219, "ancla": 539.0, "alcance": 197.7},
      patadaA_I: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_patada_a_izquierda.webp", "mira": "izq", "ref": 1145, "pie": 1233, "ancla": 806.0, "alcance": 215.1},
      patadaB_D: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_patada_b_derecha.webp", "mira": "der", "ref": 1153, "pie": 1224, "ancla": 631.0, "alcance": 172.6},
      patadaB_I: {"src": "assets/referentes/pistola_gamez/golpes/pistola_gamez_patada_b_izquierda.webp", "mira": "izq", "ref": 1153, "pie": 1215, "ancla": 770.0, "alcance": 220.2}
    },
    /* v85 — WILLIAM: 12 poses (paquetes WILLIAM_COMBOS_Y_GALPON_v1/GOLPES + WILLIAM_CROSS_Y_PATADAS_OPUESTAS_v1).
       Mirando a la derecha: recta = brazo izquierdo · cross = brazo derecho (vista de 3/4 de espaldas) · gancho;
       patada alta y frontal media = pierna izquierda · patada opuesta = pierna derecha (de espaldas). A la izquierda, al revés.
       Alto de referencia: el de su guardia (G 1508) y su patada de siempre (P 1206), corregido por área del cuerpo. */
    william: {
      pinaA_D: {"src": "assets/referentes/william/golpes/william_pina_a_derecha.webp", "mira": "der", "ref": 1508, "pie": 1422, "ancla": 400.0, "alcance": 141.5},
      pinaA_I: {"src": "assets/referentes/william/golpes/william_pina_a_izquierda.webp", "mira": "izq", "ref": 1508, "pie": 1450, "ancla": 568.0, "alcance": 127.0},
      cross_D: {"src": "assets/referentes/william/golpes/william_cross_derecha.webp", "mira": "der", "ref": 1433, "pie": 1430, "ancla": 520.0, "alcance": 120.0},
      cross_I: {"src": "assets/referentes/william/golpes/william_cross_izquierda.webp", "mira": "izq", "ref": 1433, "pie": 1425, "ancla": 599.0, "alcance": 138.8},
      pinaB_D: {"src": "assets/referentes/william/golpes/william_pina_b_derecha.webp", "mira": "der", "ref": 1500, "pie": 1446, "ancla": 580.0, "alcance": 120.0},
      pinaB_I: {"src": "assets/referentes/william/golpes/william_pina_b_izquierda.webp", "mira": "izq", "ref": 1500, "pie": 1422, "ancla": 432.0, "alcance": 120.0},
      patadaA_D: {"src": "assets/referentes/william/golpes/william_patada_a_derecha.webp", "mira": "der", "ref": 1206, "pie": 1360, "ancla": 490.0, "alcance": 152.0},
      patadaA_I: {"src": "assets/referentes/william/golpes/william_patada_a_izquierda.webp", "mira": "izq", "ref": 1206, "pie": 1365, "ancla": 635.0, "alcance": 171.0},
      opuesta_D: {"src": "assets/referentes/william/golpes/william_patada_opuesta_derecha.webp", "mira": "der", "ref": 1186, "pie": 1385, "ancla": 467.0, "alcance": 153.9},
      opuesta_I: {"src": "assets/referentes/william/golpes/william_patada_opuesta_izquierda.webp", "mira": "izq", "ref": 1186, "pie": 1395, "ancla": 550.0, "alcance": 152.0},
      patadaB_D: {"src": "assets/referentes/william/golpes/william_patada_b_derecha.webp", "mira": "der", "ref": 1293, "pie": 1433, "ancla": 316.0, "alcance": 180.3},
      patadaB_I: {"src": "assets/referentes/william/golpes/william_patada_b_izquierda.webp", "mira": "izq", "ref": 1293, "pie": 1454, "ancla": 620.0, "alcance": 152.2}
    }
  };
  const BASES = ['pinaA', 'pinaB', 'patadaA', 'patadaB'];
  // Secuencias propias (si no figura, J = A → B → la de siempre · K = A → B → la de siempre)
  const SEQ = { william: { Trompadas: ['pinaA_D', 'cross_D', 'pinaB_D'], Patadas: ['patadaA_D', 'opuesta_D', 'patadaB_D'] } };
  const ENEMIGO = { cacho: 'cacho', el_gallego: 'el_gallego', cdp: 'cabeza_de_poronga', abuelo: 'el_abuelo' };   // los mismos como rivales (jefes)
  const R = window.SPRITES_REFERENTES || {}, E = window.SPRITES_ENEMIGOS || {};
  for (const [rid, P] of Object.entries(POSES)) {
    const D = R[rid];
    if (D) {                                            // como referente (jugador o IA aliada)
      for (const [id, m] of Object.entries(P)) {
        const grupo = 'gab' + m.ref; D.altoReferencia[grupo] = m.ref;
        D.frames[id] = { src: m.src, mira: m.mira, grupo, pie: m.pie, ancla: m.ancla, alcance: m.alcance };
      }
      for (const id of Object.keys(P)) if (id.endsWith('_D') && P[id.slice(0, -2) + '_I']) D.pares[id] = id.slice(0, -2) + '_I';
      D.anim.TrompadasSeq = SEQ[rid] ? SEQ[rid].Trompadas.slice() : ['pinaA_D', 'pinaB_D', D.anim.Trompadas[0]];
      D.anim.PatadasSeq = SEQ[rid] ? SEQ[rid].Patadas.slice() : ['patadaA_D', 'patadaB_D', D.anim.Patadas[0]];
      D.golpesAB = true;
    }
    const X = E[ENEMIGO[rid]];
    if (X) {                                            // como rival animado (modos normales)
      for (const [id, m] of Object.entries(P)) X.frames[id] = { src: m.src, mira: m.mira, ref: m.ref, pie: m.pie, ancla: m.ancla, alcance: m.alcance };
      for (const b of BASES) X.anim[b] = { der: b + '_D', izq: b + '_I' };
      X.variantes = ['A', 'B', ''];                    // rota A → B → su golpe de siempre
    }
  }
  // Cuadro de la secuencia J/K para el paso del combo (0, 1, 2…). null si el referente no tiene variantes.
  function cuadroSecuencia(def, tecnica, paso) { const l = def && def.anim[tecnica + 'Seq']; return l ? l[(paso || 0) % l.length] : null; }
  // Alcance (px a escala 1) del cuadro que realmente se dibuja según hacia dónde mira; null = el alcance general de la técnica.
  function alcanceCuadro(def, id, face) {
    if (!def || !id) return null;
    const otro = face < 0 && def.pares && def.pares[id] ? def.pares[id] : id, m = def.frames[otro] || def.frames[id];
    return m && m.alcance != null ? m.alcance : null;
  }
  window.GolpesAB = { POSES, cuadroSecuencia, alcanceCuadro, total: Object.values(POSES).reduce((n, P) => n + Object.keys(P).length, 0) };
})();
