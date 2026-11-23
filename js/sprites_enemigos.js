/* =====================================================================
   BARRAS BRAVAS — Cuadros de los enemigos animados (lote 1: barra_01, 02, 04, 16 · v26: barra_03, 08, 14 + bloqueos · v26c: barra_09, 11)
   ---------------------------------------------------------------------
   Origen: animaciones_nuevas/npc_barras_lote1/ENTREGA (48 PNG, 12 por hincha).
   ref  = alto de referencia del lienzo (1300 para 1122×1402, igual que las placas).
          El cuadro "muerto" (acostado) usa su propio valor: el cuerpo acostado mide
          lo mismo que parado, sin agrandarlo a la altura de las poses de pie.
   ancla = centro del torso (x, px del PNG) · pie = fila donde apoya en el piso.
   mira  = hacia dónde mira el dibujo. Si el enemigo mira al otro lado y existe la
          versión del otro lado (caminar/piña/patada), se usa esa; si no, se espeja.
   espejo = versión espejada con el "12" al derecho (solo la guardia).
   TODO(arte): en los cuadros *_izquierda de barra_01, 02 y 04 el 12 sale invertido.
   ===================================================================== */
window.SPRITES_ENEMIGOS = {
  barra_01: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja (12 al derecho). Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_01/reaccion/barra_01_recibe_golpe.webp", mira: "der", ref: 1304.4, pie: 1292, ancla: 541.0, espejo: "assets/enemigos/animados/barra_01/reaccion/barra_01_recibe_golpe_espejo12.webp" },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_01/caminata/barra_01_intermedio_pierna_derecha.webp", mira: "der", ref: 1306.5, pie: 1316, ancla: 540.5 },
      camIntIzq: { src: "assets/enemigos/animados/barra_01/caminata/barra_01_intermedio_pierna_izquierda.webp", mira: "der", ref: 1287.0, pie: 1286, ancla: 574.8 },
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_01/barra_01_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1330, ancla: 556.3 },   // v26
      bloqueo_izquierda: { src: "assets/enemigos/animados/barra_01/barra_01_bloqueo_izquierda.webp", mira: "izq", ref: 1300, pie: 1330, ancla: 563.7 },   // v26
      caida_01: { src: "assets/enemigos/animados/barra_01/barra_01_caida_01.webp", mira: "der", ref: 1300, pie: 1289, ancla: 490.7 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_01/barra_01_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1316, ancla: 538.6 },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_01/barra_01_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1308, ancla: 571.3 },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_01/barra_01_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1316, ancla: 581.4 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_01/barra_01_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1308, ancla: 548.7 },
      guardia_original: { src: "assets/enemigos/animados/barra_01/barra_01_guardia_original.webp", mira: "der", ref: 1300, pie: 1331, ancla: 518.8, espejo: "assets/enemigos/barra_01_espejo.webp" },
      muerto: { src: "assets/enemigos/animados/barra_01/barra_01_muerto.webp", mira: "der", ref: 1643, pie: 727, ancla: 885.0, acostado: true },
      patada_derecha: { src: "assets/enemigos/animados/barra_01/barra_01_patada_derecha.webp", mira: "der", ref: 1300, pie: 1311, ancla: 351.4 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_01/barra_01_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1311, ancla: 768.6 },
      pina_derecha: { src: "assets/enemigos/animados/barra_01/barra_01_pina_derecha.webp", mira: "der", ref: 1300, pie: 1321, ancla: 466.4 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_01/barra_01_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1321, ancla: 653.6 },
    },
    anim: {
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      dolor: 'reaccion'   /* v48 */, caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' }   // v26
    },
    zancada: 40, zancadaLado: 24
  },
  barra_02: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja (12 al derecho). Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_02/reaccion/barra_02_recibe_golpe.webp", mira: "der", ref: 1260.7, pie: 1214, ancla: 706.8, espejo: "assets/enemigos/animados/barra_02/reaccion/barra_02_recibe_golpe_espejo12.webp" },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_02/caminata/barra_02_intermedio_pierna_derecha.webp", mira: "der", ref: 1289.3, pie: 1324, ancla: 546.6, espejo: "assets/enemigos/animados/barra_02/caminata/barra_02_intermedio_pierna_derecha_espejo12.webp" },
      camIntIzq: { src: "assets/enemigos/animados/barra_02/caminata/barra_02_intermedio_pierna_izquierda.webp", mira: "der", ref: 1280.5, pie: 1209, ancla: 586.0, espejo: "assets/enemigos/animados/barra_02/caminata/barra_02_intermedio_pierna_izquierda_espejo12.webp" },
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_02/barra_02_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1340, ancla: 533.4 },   // v26
      bloqueo_izquierda: { src: "assets/enemigos/animados/barra_02/barra_02_bloqueo_izquierda.webp", mira: "izq", ref: 1300, pie: 1340, ancla: 586.6 },   // v26
      caida_01: { src: "assets/enemigos/animados/barra_02/barra_02_caida_01.webp", mira: "izq", ref: 1300, pie: 1291, ancla: 656.4 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_02/barra_02_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1324, ancla: 542.3, espejo: "assets/enemigos/animados/barra_02/caminata/barra_02_caminar_derecha_01_espejo12.webp" },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_02/barra_02_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1222, ancla: 583.2, espejo: "assets/enemigos/animados/barra_02/caminata/barra_02_caminar_derecha_02_espejo12.webp" },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_02/barra_02_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1324, ancla: 577.7 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_02/barra_02_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1222, ancla: 668.8 },
      guardia_original: { src: "assets/enemigos/animados/barra_02/barra_02_guardia_original.webp", mira: "izq", ref: 1300, pie: 1339, ancla: 591.6, espejo: "assets/enemigos/barra_02_espejo.webp" },
      muerto: { src: "assets/enemigos/animados/barra_02/barra_02_muerto.webp", mira: "izq", ref: 1547, pie: 726, ancla: 888.0, acostado: true },
      patada_derecha: { src: "assets/enemigos/animados/barra_02/barra_02_patada_derecha.webp", mira: "der", ref: 1300, pie: 1318, ancla: 458.9 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_02/barra_02_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1318, ancla: 661.1 },
      pina_derecha: { src: "assets/enemigos/animados/barra_02/barra_02_pina_derecha.webp", mira: "der", ref: 1300, pie: 1329, ancla: 450.8 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_02/barra_02_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1329, ancla: 669.2 },
    },
    anim: {
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo (con el 12 al derecho)
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      dolor: 'reaccion'   /* v48 */, caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' }   // v26
    },
    zancada: 40, zancadaLado: 24
  },
  barra_04: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja (12 al derecho). Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_04/reaccion/barra_04_recibe_golpe.webp", mira: "der", ref: 1354.4, pie: 1316, ancla: 617.2, espejo: "assets/enemigos/animados/barra_04/reaccion/barra_04_recibe_golpe_espejo12.webp" },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_04/caminata/barra_04_intermedio_pierna_derecha.webp", mira: "der", ref: 1278.9, pie: 1300, ancla: 574.7, espejo: "assets/enemigos/animados/barra_04/caminata/barra_04_intermedio_pierna_derecha_espejo12.webp" },
      camIntIzq: { src: "assets/enemigos/animados/barra_04/caminata/barra_04_intermedio_pierna_izquierda.webp", mira: "der", ref: 1309.8, pie: 1306, ancla: 587.7, espejo: "assets/enemigos/animados/barra_04/caminata/barra_04_intermedio_pierna_izquierda_espejo12.webp" },
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_04/barra_04_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1324, ancla: 568.5 },   // v26
      bloqueo_izquierda: { src: "assets/enemigos/animados/barra_04/barra_04_bloqueo_izquierda.webp", mira: "izq", ref: 1300, pie: 1324, ancla: 551.5 },   // v26
      caida_01: { src: "assets/enemigos/animados/barra_04/barra_04_caida_01.webp", mira: "der", ref: 1300, pie: 1265, ancla: 493.0 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_04/barra_04_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1315, ancla: 553.9, espejo: "assets/enemigos/animados/barra_04/caminata/barra_04_caminar_derecha_01_espejo12.webp" },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_04/barra_04_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1306, ancla: 582.3, espejo: "assets/enemigos/animados/barra_04/caminata/barra_04_caminar_derecha_02_espejo12.webp" },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_04/barra_04_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1315, ancla: 566.1 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_04/barra_04_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1306, ancla: 537.7 },
      guardia_original: { src: "assets/enemigos/animados/barra_04/barra_04_guardia_original.webp", mira: "der", ref: 1300, pie: 1323, ancla: 554.8, espejo: "assets/enemigos/barra_04_espejo.webp" },
      muerto: { src: "assets/enemigos/animados/barra_04/barra_04_muerto.webp", mira: "der", ref: 1660, pie: 819, ancla: 894.5, acostado: true },
      patada_derecha: { src: "assets/enemigos/animados/barra_04/barra_04_patada_derecha.webp", mira: "der", ref: 1300, pie: 1299, ancla: 413.0 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_04/barra_04_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1299, ancla: 707.0 },
      pina_derecha: { src: "assets/enemigos/animados/barra_04/barra_04_pina_derecha.webp", mira: "der", ref: 1300, pie: 1318, ancla: 490.9 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_04/barra_04_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1318, ancla: 629.1 },
    },
    anim: {
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo (con el 12 al derecho)
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      dolor: 'reaccion'   /* v48 */, caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' }   // v26
    },
    zancada: 40, zancadaLado: 24
  },
  barra_16: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja. Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_16/reaccion/barra_16_recibe_golpe.webp", mira: "der", ref: 1340.2, pie: 1328, ancla: 619.9 },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_16/caminata/barra_16_intermedio_pierna_derecha.webp", mira: "der", ref: 1319.5, pie: 1331, ancla: 526.5 },
      camIntIzq: { src: "assets/enemigos/animados/barra_16/caminata/barra_16_intermedio_pierna_izquierda.webp", mira: "der", ref: 1320.3, pie: 1324, ancla: 517.8 },
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_16/barra_16_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1347, ancla: 523.9 },   // v26
      bloqueo_izquierda: { src: "assets/enemigos/animados/barra_16/barra_16_bloqueo_izquierda.webp", mira: "izq", ref: 1300, pie: 1347, ancla: 596.1 },   // v26
      caida_01: { src: "assets/enemigos/animados/barra_16/barra_16_caida_01.webp", mira: "der", ref: 1300, pie: 1277, ancla: 473.0 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_16/barra_16_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1332, ancla: 515.2 },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_16/barra_16_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1338, ancla: 505.3 },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_16/barra_16_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1332, ancla: 604.8 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_16/barra_16_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1338, ancla: 614.7 },
      guardia_original: { src: "assets/enemigos/animados/barra_16/barra_16_guardia_original.webp", mira: "der", ref: 1300, pie: 1346, ancla: 529.1 },
      muerto: { src: "assets/enemigos/animados/barra_16/barra_16_muerto.webp", mira: "der", ref: 1658, pie: 757, ancla: 887.0, acostado: true },
      patada_derecha: { src: "assets/enemigos/animados/barra_16/barra_16_patada_derecha.webp", mira: "der", ref: 1300, pie: 1302, ancla: 430.0 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_16/barra_16_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1302, ancla: 690.0 },
      pina_derecha: { src: "assets/enemigos/animados/barra_16/barra_16_pina_derecha.webp", mira: "der", ref: 1300, pie: 1345, ancla: 497.3 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_16/barra_16_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1345, ancla: 622.7 },
    },
    anim: {
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      dolor: 'reaccion'   /* v48 */, caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' }   // v26
    },
    zancada: 40, zancadaLado: 24
  },
  // v26 — Barra 3 de Darío: camiseta amarilla con franja azul, pantalón largo. Sin cuadro de "recibir golpe": usa la guardia inclinada (TODO arte).
  barra_03: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja. Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_03/reaccion/barra_03_recibe_golpe.webp", mira: "der", ref: 1321.7, pie: 1302, ancla: 674.5 },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_03/caminata/barra_03_intermedio_pierna_derecha.webp", mira: "der", ref: 1313.0, pie: 1326, ancla: 534.4 },
      camIntIzq: { src: "assets/enemigos/animados/barra_03/caminata/barra_03_intermedio_pierna_izquierda.webp", mira: "der", ref: 1335.8, pie: 1327, ancla: 587.2 },
      guardia_original: { src: "assets/enemigos/animados/barra_03/barra_03_guardia_original.webp", mira: "der", ref: 1300, pie: 1326, ancla: 523.2 },   // la guardia que ya tenía (assets/enemigos/barra_03.webp)
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_03/barra_03_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1323, ancla: 570.1 },
      caida_01: { src: "assets/enemigos/animados/barra_03/barra_03_caida_01.webp", mira: "der", ref: 1300, pie: 1293, ancla: 431.3 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_03/barra_03_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1333, ancla: 536.6 },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_03/barra_03_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1321, ancla: 584.1 },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_03/barra_03_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1333, ancla: 583.4 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_03/barra_03_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1321, ancla: 535.9 },
      muerto: { src: "assets/enemigos/animados/barra_03/barra_03_muerte_ko.webp", mira: "der", ref: 1638, pie: 795, ancla: 897.0, acostado: true },   // cabeza a la izquierda; lienzo horizontal, sin estirar
      patada_derecha: { src: "assets/enemigos/animados/barra_03/barra_03_patada_derecha.webp", mira: "der", ref: 1300, pie: 1314, ancla: 455.0 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_03/barra_03_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1314, ancla: 665.0 },
      pina_derecha: { src: "assets/enemigos/animados/barra_03/barra_03_pina_derecha.webp", mira: "der", ref: 1300, pie: 1325, ancla: 488.9 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_03/barra_03_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1325, ancla: 631.1 },
    },
    anim: {
    dolor: 'reaccion',   // v48: reacción al golpe (antes: guardia inclinada)
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_derecha' }   // un solo dibujo: a la izquierda se espeja al dibujar
    },
    zancada: 40, zancadaLado: 24
  },
  // v26 — "Barra 6" de Darío: camiseta azul con franja amarilla, bermudas claras. Sin cuadro de "recibir golpe": usa la guardia inclinada (TODO arte).
  barra_08: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja. Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_08/reaccion/barra_08_recibe_golpe.webp", mira: "der", ref: 1330.5, pie: 1316, ancla: 637.7 },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_08/caminata/barra_08_intermedio_pierna_derecha.webp", mira: "der", ref: 1296.8, pie: 1308, ancla: 569.8 },
      camIntIzq: { src: "assets/enemigos/animados/barra_08/caminata/barra_08_intermedio_pierna_izquierda.webp", mira: "der", ref: 1289.2, pie: 1307, ancla: 593.6 },
      guardia_original: { src: "assets/enemigos/animados/barra_08/barra_08_guardia_original.webp", mira: "der", ref: 1300, pie: 1326, ancla: 547.5 },   // la guardia que ya tenía (assets/enemigos/barra_08.webp)
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_08/barra_08_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1338, ancla: 560.8 },
      caida_01: { src: "assets/enemigos/animados/barra_08/barra_08_caida_01.webp", mira: "der", ref: 1300, pie: 1249, ancla: 422.2 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_08/barra_08_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1316, ancla: 558.7 },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_08/barra_08_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1315, ancla: 589.6 },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_08/barra_08_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1316, ancla: 561.3 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_08/barra_08_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1315, ancla: 530.4 },
      muerto: { src: "assets/enemigos/animados/barra_08/barra_08_muerte_ko.webp", mira: "der", ref: 1617, pie: 776, ancla: 895.5, acostado: true },   // cabeza a la izquierda; lienzo horizontal, sin estirar
      patada_derecha: { src: "assets/enemigos/animados/barra_08/barra_08_patada_derecha.webp", mira: "der", ref: 1300, pie: 1327, ancla: 409.8 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_08/barra_08_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1327, ancla: 710.2 },
      pina_derecha: { src: "assets/enemigos/animados/barra_08/barra_08_pina_derecha.webp", mira: "der", ref: 1300, pie: 1328, ancla: 517.6 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_08/barra_08_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1328, ancla: 602.4 },
    },
    anim: {
    dolor: 'reaccion',   // v48: reacción al golpe (antes: guardia inclinada)
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_derecha' }   // un solo dibujo: a la izquierda se espeja al dibujar
    },
    zancada: 40, zancadaLado: 24
  },
  // v26 — "Barra 5" de Darío: musculosa celeste sin número, bermudas de jean. Sin cuadro de "recibir golpe": usa la guardia inclinada (TODO arte).
  barra_14: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja. Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_14/reaccion/barra_14_recibe_golpe.webp", mira: "der", ref: 1296.9, pie: 1309, ancla: 637.2 },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_14/caminata/barra_14_intermedio_pierna_derecha.webp", mira: "der", ref: 1307.3, pie: 1328, ancla: 596.5 },
      camIntIzq: { src: "assets/enemigos/animados/barra_14/caminata/barra_14_intermedio_pierna_izquierda.webp", mira: "der", ref: 1359.7, pie: 1320, ancla: 593.3 },
      guardia_original: { src: "assets/enemigos/animados/barra_14/barra_14_guardia_original.webp", mira: "izq", ref: 1300, pie: 1327, ancla: 592.5 },   // la guardia que ya tenía (assets/enemigos/barra_14.webp)
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_14/barra_14_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1329, ancla: 565.7 },
      caida_01: { src: "assets/enemigos/animados/barra_14/barra_14_caida_01.webp", mira: "der", ref: 1300, pie: 1176, ancla: 413.0 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_14/barra_14_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1323, ancla: 595.9 },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_14/barra_14_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1310, ancla: 587.5 },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_14/barra_14_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1323, ancla: 524.1 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_14/barra_14_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1310, ancla: 532.5 },
      muerto: { src: "assets/enemigos/animados/barra_14/barra_14_muerte_ko.webp", mira: "der", ref: 1701, pie: 806, ancla: 891.5, acostado: true },   // cabeza a la izquierda; lienzo horizontal, sin estirar
      patada_derecha: { src: "assets/enemigos/animados/barra_14/barra_14_patada_derecha.webp", mira: "der", ref: 1300, pie: 1323, ancla: 444.4 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_14/barra_14_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1323, ancla: 675.6 },
      pina_derecha: { src: "assets/enemigos/animados/barra_14/barra_14_pina_derecha.webp", mira: "der", ref: 1300, pie: 1310, ancla: 510.2 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_14/barra_14_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1310, ancla: 609.8 },
    },
    anim: {
    dolor: 'reaccion',   // v48: reacción al golpe (antes: guardia inclinada)
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_derecha' }   // un solo dibujo: a la izquierda se espeja al dibujar
    },
    zancada: 40, zancadaLado: 24
  },
  // v26c — "Barra 7" de Darío: musculosa azul con el 12 celeste, pelo muy largo, pantalón largo. Sin cuadro de "recibir golpe": usa la guardia inclinada (TODO arte).
  barra_09: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja (12 al derecho). Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_09/reaccion/barra_09_recibe_golpe.webp", mira: "der", ref: 1303.4, pie: 1305, ancla: 636.5, espejo: "assets/enemigos/animados/barra_09/reaccion/barra_09_recibe_golpe_espejo12.webp" },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_09/caminata/barra_09_intermedio_pierna_derecha.webp", mira: "der", ref: 1296.8, pie: 1307, ancla: 552.5, espejo: "assets/enemigos/animados/barra_09/caminata/barra_09_intermedio_pierna_derecha_espejo12.webp" },
      camIntIzq: { src: "assets/enemigos/animados/barra_09/caminata/barra_09_intermedio_pierna_izquierda.webp", mira: "der", ref: 1287.0, pie: 1322, ancla: 604.7, espejo: "assets/enemigos/animados/barra_09/caminata/barra_09_intermedio_pierna_izquierda_espejo12.webp" },
      guardia_original: { src: "assets/enemigos/animados/barra_09/barra_09_guardia_original.webp", mira: "der", ref: 1300, pie: 1328, ancla: 540.1, espejo: "assets/enemigos/barra_09_espejo.webp" },   // la guardia que ya tenía (assets/enemigos/barra_09.webp)
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_09/barra_09_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1329, ancla: 544.9 },
      caida_01: { src: "assets/enemigos/animados/barra_09/barra_09_caida_01.webp", mira: "der", ref: 1300, pie: 998, ancla: 568.6 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_09/barra_09_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1323, ancla: 543.5, espejo: "assets/enemigos/animados/barra_09/caminata/barra_09_caminar_derecha_01_espejo12.webp" },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_09/barra_09_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1331, ancla: 592.4, espejo: "assets/enemigos/animados/barra_09/caminata/barra_09_caminar_derecha_02_espejo12.webp" },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_09/barra_09_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1323, ancla: 576.5 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_09/barra_09_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1331, ancla: 527.6 },
      muerto: { src: "assets/enemigos/animados/barra_09/barra_09_muerte_ko.webp", mira: "der", ref: 1652, pie: 739, ancla: 890.0, acostado: true },   // cabeza a la izquierda; lienzo horizontal, sin estirar
      patada_derecha: { src: "assets/enemigos/animados/barra_09/barra_09_patada_derecha.webp", mira: "der", ref: 1300, pie: 1339, ancla: 471.6 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_09/barra_09_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1339, ancla: 648.4 },
      pina_derecha: { src: "assets/enemigos/animados/barra_09/barra_09_pina_derecha.webp", mira: "der", ref: 1300, pie: 1330, ancla: 434.9 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_09/barra_09_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1330, ancla: 685.1 },
    },
    anim: {
    dolor: 'reaccion',   // v48: reacción al golpe (antes: guardia inclinada)
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo (con el 12 al derecho)
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_derecha' }   // un solo dibujo: a la izquierda se espeja al dibujar
    },
    zancada: 40, zancadaLado: 24
  },
  // v26c — "Barra 9" de Darío: buzo azul con franja amarilla, jean oscuro, zapatillas claras. Sin cuadro de "recibir golpe": usa la guardia inclinada (TODO arte).
  barra_11: {
    frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja. Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/animados/barra_11/reaccion/barra_11_recibe_golpe.webp", mira: "der", ref: 1287.8, pie: 1337, ancla: 612.9 },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4: intermedio der → paso 01 → intermedio izq → paso 02). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/animados/barra_11/caminata/barra_11_intermedio_pierna_derecha.webp", mira: "der", ref: 1306.5, pie: 1340, ancla: 513.7 },
      camIntIzq: { src: "assets/enemigos/animados/barra_11/caminata/barra_11_intermedio_pierna_izquierda.webp", mira: "der", ref: 1297.6, pie: 1344, ancla: 558.9 },
      guardia_original: { src: "assets/enemigos/animados/barra_11/barra_11_guardia_original.webp", mira: "der", ref: 1300, pie: 1366, ancla: 535.1 },   // la guardia que ya tenía (assets/enemigos/barra_11.webp)
      bloqueo_derecha: { src: "assets/enemigos/animados/barra_11/barra_11_bloqueo_derecha.webp", mira: "der", ref: 1300, pie: 1365, ancla: 552.1 },
      caida_01: { src: "assets/enemigos/animados/barra_11/barra_11_caida_01.webp", mira: "der", ref: 1300, pie: 1136, ancla: 525.1 },
      caminar_derecha_01: { src: "assets/enemigos/animados/barra_11/barra_11_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1352, ancla: 520.5 },
      caminar_derecha_02: { src: "assets/enemigos/animados/barra_11/barra_11_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1337, ancla: 556.8 },
      caminar_izquierda_01: { src: "assets/enemigos/animados/barra_11/barra_11_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1352, ancla: 599.5 },
      caminar_izquierda_02: { src: "assets/enemigos/animados/barra_11/barra_11_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1337, ancla: 563.2 },
      muerto: { src: "assets/enemigos/animados/barra_11/barra_11_muerte_ko.webp", mira: "der", ref: 1527, pie: 790, ancla: 895.5, acostado: true },   // cabeza a la izquierda; lienzo horizontal, sin estirar
      patada_derecha: { src: "assets/enemigos/animados/barra_11/barra_11_patada_derecha.webp", mira: "der", ref: 1300, pie: 1344, ancla: 461.5 },
      patada_izquierda: { src: "assets/enemigos/animados/barra_11/barra_11_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1344, ancla: 658.5 },
      pina_derecha: { src: "assets/enemigos/animados/barra_11/barra_11_pina_derecha.webp", mira: "der", ref: 1300, pie: 1345, ancla: 468.1 },
      pina_izquierda: { src: "assets/enemigos/animados/barra_11/barra_11_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1345, ancla: 651.9 },
    },
    anim: {
    dolor: 'reaccion',   // v48: reacción al golpe (antes: guardia inclinada)
      quieto: 'guardia_original',
      caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; a la izquierda se espeja el mismo ciclo
      pina: { der: 'pina_derecha', izq: 'pina_izquierda' }, patada: { der: 'patada_derecha', izq: 'patada_izquierda' },
      caida: 'caida_01', muerto: 'muerto',
      bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_derecha' }   // un solo dibujo: a la izquierda se espeja al dibujar
    },
    zancada: 40, zancadaLado: 24
  },
};

/* ---- Especiales con cuadros propios ------------------------------------
   Los ataques, el golpe recibido y la caída vienen mirando a la IZQUIERDA:
   para el otro lado se espejan al dibujar. Arriba = de espaldas alejándose,
   abajo = de frente acercándose. ref distinto por cuadro: algunos lienzos
   vienen a otra escala (medido con el tamaño de la cabeza). */
// Cabeza de Poronga (enemigo especial, final del nivel 7).
// v23: los pasos laterales 02 se reemplazaron por los corregidos (piernas alternadas, aprobados por Darío).
// Los 02 viejos quedaron en cabeza_de_poronga/descartados_v22/ y ya no se cargan.
// v47: cuadro de muerto propio para la derrota definitiva (segunda vida).
window.SPRITES_ENEMIGOS.cabeza_de_poronga = {
  frames: {
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4 cuadros). Alineados con su paso completo (cabeza) y la suela.
      camIntDer: { src: "assets/enemigos/especiales/cabeza_de_poronga/caminata/cdp_intermedio_pierna_derecha.webp", mira: "der", ref: 1324.8, pie: 1339, ancla: 503.4 },
      camIntIzq: { src: "assets/enemigos/especiales/cabeza_de_poronga/caminata/cdp_intermedio_pierna_izquierda.webp", mira: "der", ref: 1257.4, pie: 1219, ancla: 639.7 },
      bloqueo_izquierda: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_bloqueo_izquierda.webp", mira: "izq", ref: 1313, pie: 1353, ancla: 583.6 },   // v24: bloqueo (brazos cruzados)
      bloqueo_derecha: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_bloqueo_derecha.webp", mira: "der", ref: 1313, pie: 1353, ancla: 538.4 },   // v24: espejo del paquete
      guardia: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_guardia_original.webp", mira: "izq", ref: 1300, pie: 1352, ancla: 584.2 },
      caminar_derecha_01: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1324, ancla: 536.3 },
      caminar_derecha_02: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_derecha_02.webp", mira: "der", ref: 1248, pie: 1216, ancla: 635.0 },   // v23: paso contrario corregido (lienzo 1254², escala medida por la cabeza)
      caminar_izquierda_01: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1340, ancla: 592.7 },
      caminar_izquierda_02: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_izquierda_02.webp", mira: "izq", ref: 1248, pie: 1216, ancla: 617.0 },   // v23: paso contrario corregido (lienzo 1254², escala medida por la cabeza)
      caminar_arriba_01: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_arriba_01.webp", mira: "espalda", ref: 1300, pie: 1336, ancla: 559.1 },
      caminar_arriba_02: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_arriba_02.webp", mira: "espalda", ref: 1300, pie: 1379, ancla: 570.0 },
      caminar_abajo_01: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_abajo_01.webp", mira: "frente", ref: 1300, pie: 1383, ancla: 565.7 },
      caminar_abajo_02: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caminar_abajo_02.webp", mira: "frente", ref: 1300, pie: 1354, ancla: 564.5 },
      pina: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_pina.webp", mira: "izq", ref: 1300, pie: 1348, ancla: 663.5 },
      patada: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_patada.webp", mira: "izq", ref: 1300, pie: 1342, ancla: 668.6 },
      cabezazo: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_cabezazo.webp", mira: "izq", ref: 1300, pie: 1332, ancla: 572.0 },
      recibir_golpe: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_recibir_golpe.webp", mira: "izq", ref: 1300, pie: 1337, ancla: 654.5 },
      caer: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_caer.webp", mira: "izq", ref: 1300, pie: 1279, ancla: 732.8 },
      // v47 — derrota DEFINITIVA (al agotar la SEGUNDA vida). Acostado boca arriba, cabeza a la izquierda (= mira a la derecha).
      // No se estira: ref 1640 hace que el cuerpo acostado mida lo mismo que parado. pie = espalda en el piso · ancla = centro del cuerpo.
      muerto: { src: "assets/enemigos/especiales/cabeza_de_poronga/cdp_muerto_segunda_vida.webp", mira: "der", ref: 1640, pie: 765, ancla: 897, acostado: true },
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'], caminaIzq: ['camIntDer', 'caminar_derecha_01', 'camIntIzq', 'caminar_derecha_02'],   // v47: 4 cuadros; el motor espeja según hacia dónde mira
    caminaArriba: ['caminar_arriba_01', 'caminar_arriba_02'], caminaAbajo: ['caminar_abajo_01', 'caminar_abajo_02'],
    pina: 'pina', patada: 'patada', cabezazo: 'cabezazo',
    bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' },   // v24: solo mientras el bloqueo protege
    dolor: 'recibir_golpe', caida: 'caer', muerto: 'muerto',   // v47: muerto SOLO al perder la segunda vida (la primera sigue con su caída y recuperación)
    suelo: 'caer'                                              // v47: derribado sin morir: en el piso usa la caída, nunca la pose de muerto
  },
  zancada: 40, zancadaLado: 24
};

// El Abuelo — jefe del nivel 10, con las MANOS LIBRES (el trapo está apoyado en el paravalanchas del fondo).
// En el nivel 9 NO se usan estos cuadros: ahí mira desde atrás con el trapo (imagen original, ver js/niveles.js).
// TODO(arte): los dos pasos de frente (caminar_abajo) conservan un halo semitransparente: provisorios.
window.SPRITES_ENEMIGOS.el_abuelo = {
  frames: {
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4 cuadros). Alineados con su paso completo (cabeza) y la suela.
      camApoyo: { src: "assets/enemigos/especiales/el_abuelo/caminata/abuelo_intermedio_apoyo.webp", mira: "izq", ref: 1316.2, pie: 1148, ancla: 660.3 },
      camAvance: { src: "assets/enemigos/especiales/el_abuelo/caminata/abuelo_intermedio_avance.webp", mira: "izq", ref: 1283.1, pie: 1115, ancla: 656.5 },
      bloqueo_izquierda: { src: "assets/enemigos/especiales/el_abuelo/abuelo_bloqueo_izquierda.webp", mira: "izq", ref: 1339, pie: 1170, ancla: 621.6 },   // v24: bloqueo (brazos cruzados)
      bloqueo_derecha: { src: "assets/enemigos/especiales/el_abuelo/abuelo_bloqueo_derecha.webp", mira: "der", ref: 1339, pie: 1170, ancla: 690.4 },   // v24: espejo del paquete
      guardia: { src: "assets/enemigos/especiales/el_abuelo/abuelo_guardia_combate.webp", mira: "izq", ref: 1300, pie: 1166, ancla: 619.7 },
      caminar_derecha_01: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1143, ancla: 612.9 },
      caminar_derecha_02: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_derecha_02.webp", mira: "der", ref: 1417, pie: 1247, ancla: 578.0 },   // v47: escala corregida (medida por la cabeza contra el paso 01: el dibujo es ~9 % más grande; antes 1365)
      caminar_izquierda_01: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1156, ancla: 659.5 },
      caminar_izquierda_02: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_izquierda_02.webp", mira: "izq", ref: 1417, pie: 1250, ancla: 588.1 },   // v47: escala corregida (medida por la cabeza contra el paso 01: el dibujo es ~9 % más grande; antes 1365)
      caminar_arriba_01: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_arriba_01.webp", mira: "espalda", ref: 1300, pie: 1265, ancla: 589.4 },
      caminar_arriba_02: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_arriba_02.webp", mira: "espalda", ref: 1300, pie: 1262, ancla: 624.5 },
      caminar_abajo_01: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_abajo_01.webp", mira: "frente", ref: 1480, pie: 1506, ancla: 525.9 },
      caminar_abajo_02: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caminar_abajo_02.webp", mira: "frente", ref: 1480, pie: 1486, ancla: 530.6 },
      pina: { src: "assets/enemigos/especiales/el_abuelo/abuelo_pina_izquierda.webp", mira: "izq", ref: 1300, pie: 1157, ancla: 690.7 },
      patada: { src: "assets/enemigos/especiales/el_abuelo/abuelo_patada_izquierda.webp", mira: "izq", ref: 1300, pie: 1153, ancla: 776.3 },
      cabezazo: { src: "assets/enemigos/especiales/el_abuelo/abuelo_cabezazo_izquierda.webp", mira: "izq", ref: 1300, pie: 1150, ancla: 649.6 },
      recibir_golpe: { src: "assets/enemigos/especiales/el_abuelo/abuelo_recibir_golpe.webp", mira: "izq", ref: 1300, pie: 1145, ancla: 841.2 },
      caer: { src: "assets/enemigos/especiales/el_abuelo/abuelo_caer.webp", mira: "izq", ref: 1300, pie: 1102, ancla: 831.5 },
      muerto: { src: "assets/enemigos/especiales/el_abuelo/abuelo_muerto_ko.webp", mira: "izq", ref: 1791, pie: 825, ancla: 894.5, acostado: true },
      // v29: segunda vida. Arrodillado (pose única + su espejo). El dibujo es ~1,35 veces más grande que la guardia,
      // por eso ref = 1750: el cuerpo queda a la misma escala y de rodillas mide ~62 % de lo que mide parado.
      // pie = fila de la rodilla/zapato en el piso (misma línea de suelo que la guardia) · ancla = centro del torso.
      arrodillado_izquierda: { src: "assets/enemigos/especiales/el_abuelo/abuelo_arrodillado_izquierda.webp", mira: "izq", ref: 1750, pie: 1085, ancla: 720 },
      arrodillado_derecha: { src: "assets/enemigos/especiales/el_abuelo/abuelo_arrodillado_derecha.webp", mira: "der", ref: 1750, pie: 1085, ancla: 592 },
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ['caminar_izquierda_01', 'camApoyo', 'caminar_izquierda_02', 'camAvance'], caminaIzq: ['caminar_izquierda_01', 'camApoyo', 'caminar_izquierda_02', 'camAvance'],   // v47: 4 cuadros; el motor espeja según hacia dónde mira
    caminaArriba: ['caminar_arriba_01', 'caminar_arriba_02'], caminaAbajo: ['caminar_abajo_01', 'caminar_abajo_02'],
    pina: 'pina', patada: 'patada', cabezazo: 'cabezazo',
    bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' },   // v24: solo mientras el bloqueo protege
    dolor: 'recibir_golpe', caida: 'caer', muerto: 'muerto',
    arrodillado: { der: 'arrodillado_derecha', izq: 'arrodillado_izquierda' }   // v29: entre la primera y la segunda barra
  },
  zancada: 40, zancadaLado: 24
};

// v30 — Policía antidisturbios (guardaespaldas del Abuelo, nivel 10). Paquete POLICIA_ANTIMOTIN_MOVIMIENTOS.
// Poses clave, no animaciones completas. Salvo la caminata, todas miran a la DERECHA: el motor las espeja.
// Escala: cada PNG viene dibujado a distinto tamaño. ref se calibró midiendo el casco DENTRO del juego contra la
// guardia (ref 1300), para que el cuerpo mida lo mismo en todas las poses. Arrodillado y KO NO se estiran a la altura de pie.
// TODO(arte): golpe_palo, golpe_escudo y arrodillado conservan halo exterior (ver LEEME v30).
window.SPRITES_ENEMIGOS.policia = {
  frames: {
      guardia: { src: "assets/enemigos/especiales/policia/policia_guardia_derecha.webp", mira: "der", ref: 1300, pie: 1258, ancla: 620 },
      caminar_derecha_01: { src: "assets/enemigos/especiales/policia/policia_caminar_derecha_01.webp", mira: "der", ref: 1300, pie: 1277, ancla: 620 },
      caminar_derecha_02: { src: "assets/enemigos/especiales/policia/policia_caminar_derecha_02.webp", mira: "der", ref: 1300, pie: 1265, ancla: 588 },
      caminar_izquierda_01: { src: "assets/enemigos/especiales/policia/policia_caminar_izquierda_01.webp", mira: "izq", ref: 1300, pie: 1277, ancla: 600 },
      caminar_izquierda_02: { src: "assets/enemigos/especiales/policia/policia_caminar_izquierda_02.webp", mira: "izq", ref: 1300, pie: 1265, ancla: 632 },
      golpe_palo: { src: "assets/enemigos/especiales/policia/policia_golpe_palo_derecha.webp", mira: "der", ref: 1097, pie: 1014, ancla: 901 },   // palo ATRÁS = preparación (sin daño)
      // v43: palo ADELANTE = impacto. Misma escala que el palo atrás (rodilleras y borcegos miden igual: ref 1097). pie = suela; ancla = la cadera
      // (entrepierna + la misma distancia que en el palo atrás), para que el cuerpo no salte al pasar de una pose a la otra.
      palo_adelante: { src: "assets/enemigos/especiales/policia/policia_palo_adelante_v1.webp", mira: "der", ref: 1097, pie: 1006, ancla: 725 },
      golpe_escudo: { src: "assets/enemigos/especiales/policia/policia_golpe_escudo_derecha.webp", mira: "der", ref: 1074, pie: 958, ancla: 812 },
      bloqueo: { src: "assets/enemigos/especiales/policia/policia_bloqueo_derecha.webp", mira: "der", ref: 1263, pie: 1253, ancla: 657 },
      arrodillado: { src: "assets/enemigos/especiales/policia/policia_arrodillado_derecha.webp", mira: "der", ref: 1190, pie: 960, ancla: 768 },   // transición breve al KO
      muerto: { src: "assets/enemigos/especiales/policia/policia_muerto_ko.webp", mira: "der", ref: 1430, pie: 874, ancla: 888, acostado: true }
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ['caminar_derecha_01', 'caminar_derecha_02'], caminaIzq: ['caminar_izquierda_01', 'caminar_izquierda_02'],
    // v43: palazo = guardia → palo atrás (preparación, sin daño) → palo adelante (impacto: el daño se aplica UNA vez) → guardia.
    pina: 'palo_adelante', patada: 'golpe_escudo',       // palazo = "piña" · golpe de escudo = "patada" (mismo daño que el Abuelo; el escudo no cambia)
    preparar: { pina: 'golpe_palo' },                     // palo atrás durante toda la preparación
    bloqueo: { der: 'bloqueo', izq: 'bloqueo' },          // se espeja al mirar a la izquierda
    caida: 'arrodillado', muerto: 'muerto',               // sin cuadro de golpe recibido: guardia inclinada (como los hinchas v26)
    especial: 'palo_adelante'                             // v69: especial = palazo potente (preparación: palo atrás, más larga)
  },
  zancada: 40
};
window.SPRITES_ENEMIGOS.policia.anim.preparar.especial = 'golpe_palo';

// v69 — CUATRO POLICÍAS (paquete ENTREGA_CLAUDE_POLICIAS_Y_TABLA). Gordo = `policia` (arriba, sus 11 PNG de siempre).
// Musculoso, normal (bigote, escudo y palo) y guía con ovejero: 13 poses clave cada uno, NO secuencias completas:
//   01 guardia · 02/03 caminar der · 04/05 caminar izq · 06 ataque primario · 07 ataque secundario · 08 bloqueo
//   09 arrodillado · 10 KO · 11 ataque frontal · 12 golpe recibido · 13 levantarse.
// Escala: cada PNG viene en otro lienzo y a otro tamaño. ref = alto de la guardia × (tamaño relativo medido con el casco
// y el cartel POLICIA contra la guardia), así el cuerpo mide igual en todas las poses (agachado y KO NO se estiran).
// pie = fila de la suela (píxeles opacos) · ancla = centro del cuerpo del agente (en el guía, el hombre; el perro va delante).
// Guía + ovejero: imágenes CONJUNTAS → una sola unidad (una vida, un enemigo); la mordida pega en la boca del perro (franja en niveles.js).
window.SPRITES_ENEMIGOS.policia_musculoso = {
  frames: {
      guardia: { src: "assets/enemigos/especiales/policia_musculoso/01_guardia_derecha.webp", mira: "der", ref: 1256, pie: 1268, ancla: 608 },
      cam_der_1: { src: "assets/enemigos/especiales/policia_musculoso/02_caminar_derecha_contacto.webp", mira: "der", ref: 1193.2, pie: 1251, ancla: 621 },
      cam_der_2: { src: "assets/enemigos/especiales/policia_musculoso/03_caminar_derecha_paso.webp", mira: "der", ref: 1161.8, pie: 1259, ancla: 596 },
      cam_izq_1: { src: "assets/enemigos/especiales/policia_musculoso/04_caminar_izquierda_contacto.webp", mira: "izq", ref: 1224.6, pie: 1262, ancla: 623 },
      cam_izq_2: { src: "assets/enemigos/especiales/policia_musculoso/05_caminar_izquierda_paso.webp", mira: "izq", ref: 1224.6, pie: 1261, ancla: 621 },
      primario: { src: "assets/enemigos/especiales/policia_musculoso/06_ataque_primario_derecha.webp", mira: "der", ref: 1193.2, pie: 1253, ancla: 441 },
      secundario: { src: "assets/enemigos/especiales/policia_musculoso/07_ataque_secundario_derecha.webp", mira: "der", ref: 1117.8, pie: 1265, ancla: 732 },
      bloqueo: { src: "assets/enemigos/especiales/policia_musculoso/08_bloqueo_derecha.webp", mira: "der", ref: 1256, pie: 1264, ancla: 662 },
      arrodillado: { src: "assets/enemigos/especiales/policia_musculoso/09_arrodillado_derecha.webp", mira: "der", ref: 1256, pie: 971, ancla: 897 },
      ko: { src: "assets/enemigos/especiales/policia_musculoso/10_ko.webp", mira: "der", ref: 1256, pie: 806, ancla: 992, acostado: true },
      frontal: { src: "assets/enemigos/especiales/policia_musculoso/11_ataque_frontal_derecha.webp", mira: "der", ref: 1099.0, pie: 991, ancla: 674 },
      golpe: { src: "assets/enemigos/especiales/policia_musculoso/12_golpe_recibido_derecha.webp", mira: "der", ref: 1067.6, pie: 1005, ancla: 769 },
      levantarse: { src: "assets/enemigos/especiales/policia_musculoso/13_levantarse_derecha.webp", mira: "der", ref: 1256, pie: 972, ancla: 928 }
  },
  anim: { quieto: 'guardia', caminaDer: ['cam_der_1', 'cam_der_2'], caminaIzq: ['cam_izq_1', 'cam_izq_2'],
    pina: 'frontal', patada: 'primario', especial: 'frontal',              // palo frontal · puño · especial = palazo potente
    preparar: { pina: 'secundario', especial: 'secundario' },              // palo elevado = preparación (sin daño)
    bloqueo: { der: 'bloqueo', izq: 'bloqueo' },                           // antebrazos
    dolor: 'golpe', caida: 'arrodillado', muerto: 'ko', suelo: 'ko', levantarse: 'levantarse' },
  zancada: 40
};
window.SPRITES_ENEMIGOS.policia_normal = {
  frames: {
      guardia: { src: "assets/enemigos/especiales/policia_normal/01_guardia_derecha.webp", mira: "der", ref: 1246, pie: 1263, ancla: 630 },
      cam_der_1: { src: "assets/enemigos/especiales/policia_normal/02_caminar_derecha_contacto.webp", mira: "der", ref: 1214.8, pie: 1263, ancla: 635 },
      cam_der_2: { src: "assets/enemigos/especiales/policia_normal/03_caminar_derecha_paso.webp", mira: "der", ref: 1183.7, pie: 1228, ancla: 616 },
      cam_izq_1: { src: "assets/enemigos/especiales/policia_normal/04_caminar_izquierda_contacto.webp", mira: "izq", ref: 1183.7, pie: 1250, ancla: 601 },
      cam_izq_2: { src: "assets/enemigos/especiales/policia_normal/05_caminar_izquierda_paso.webp", mira: "izq", ref: 1121.4, pie: 1243, ancla: 600 },
      primario: { src: "assets/enemigos/especiales/policia_normal/06_ataque_primario_derecha.webp", mira: "der", ref: 1152.5, pie: 1165, ancla: 736 },
      secundario: { src: "assets/enemigos/especiales/policia_normal/07_ataque_secundario_derecha.webp", mira: "der", ref: 1084.0, pie: 1266, ancla: 655 },
      bloqueo: { src: "assets/enemigos/especiales/policia_normal/08_bloqueo_derecha.webp", mira: "der", ref: 1183.7, pie: 1249, ancla: 668 },
      arrodillado: { src: "assets/enemigos/especiales/policia_normal/09_arrodillado_derecha.webp", mira: "der", ref: 1246, pie: 1094, ancla: 771 },
      ko: { src: "assets/enemigos/especiales/policia_normal/10_ko.webp", mira: "der", ref: 1196.2, pie: 795, ancla: 973, acostado: true },
      frontal: { src: "assets/enemigos/especiales/policia_normal/11_ataque_frontal_derecha.webp", mira: "der", ref: 996.8, pie: 995, ancla: 720 },
      golpe: { src: "assets/enemigos/especiales/policia_normal/12_golpe_recibido_derecha.webp", mira: "der", ref: 996.8, pie: 1007, ancla: 777 },
      levantarse: { src: "assets/enemigos/especiales/policia_normal/13_levantarse_derecha.webp", mira: "der", ref: 1246, pie: 989, ancla: 788 }
  },
  anim: { quieto: 'guardia', caminaDer: ['cam_der_1', 'cam_der_2'], caminaIzq: ['cam_izq_1', 'cam_izq_2'],
    pina: 'frontal', patada: 'primario', especial: 'primario',             // palo frontal · escudazo · especial = escudazo potente
    preparar: { pina: 'secundario', especial: 'bloqueo' },                 // palo elevado / escudo cargado (sin daño)
    bloqueo: { der: 'bloqueo', izq: 'bloqueo' },                           // con el escudo
    dolor: 'golpe', caida: 'arrodillado', muerto: 'ko', suelo: 'ko', levantarse: 'levantarse' },
  zancada: 40
};
window.SPRITES_ENEMIGOS.policia_guia = {
  frames: {
      guardia: { src: "assets/enemigos/especiales/policia_guia/01_guardia_derecha.webp", mira: "der", ref: 1144, pie: 1162, ancla: 470 },
      cam_der_1: { src: "assets/enemigos/especiales/policia_guia/02_caminar_derecha_contacto.webp", mira: "der", ref: 1029.6, pie: 1127, ancla: 436 },
      cam_der_2: { src: "assets/enemigos/especiales/policia_guia/03_caminar_derecha_paso.webp", mira: "der", ref: 1086.8, pie: 1135, ancla: 359 },
      cam_izq_1: { src: "assets/enemigos/especiales/policia_guia/04_caminar_izquierda_contacto.webp", mira: "izq", ref: 1086.8, pie: 1156, ancla: 974 },
      cam_izq_2: { src: "assets/enemigos/especiales/policia_guia/05_caminar_izquierda_paso.webp", mira: "izq", ref: 1086.8, pie: 1142, ancla: 958 },
      primario: { src: "assets/enemigos/especiales/policia_guia/06_ataque_primario_derecha.webp", mira: "der", ref: 1001.0, pie: 962, ancla: 540 },
      secundario: { src: "assets/enemigos/especiales/policia_guia/07_ataque_secundario_derecha.webp", mira: "der", ref: 1086.8, pie: 1115, ancla: 516 },
      bloqueo: { src: "assets/enemigos/especiales/policia_guia/08_bloqueo_derecha.webp", mira: "der", ref: 1115.4, pie: 1143, ancla: 473 },
      arrodillado: { src: "assets/enemigos/especiales/policia_guia/09_arrodillado_derecha.webp", mira: "der", ref: 938.1, pie: 938, ancla: 671 },
      ko: { src: "assets/enemigos/especiales/policia_guia/10_ko.webp", mira: "der", ref: 1029.6, pie: 742, ancla: 970, acostado: true },
      frontal: { src: "assets/enemigos/especiales/policia_guia/11_ataque_frontal_derecha.webp", mira: "der", ref: 1001.0, pie: 1002, ancla: 600 },
      golpe: { src: "assets/enemigos/especiales/policia_guia/12_golpe_recibido_derecha.webp", mira: "der", ref: 1086.8, pie: 1001, ancla: 348 },
      levantarse: { src: "assets/enemigos/especiales/policia_guia/13_levantarse_derecha.webp", mira: "der", ref: 1058.2, pie: 961, ancla: 475 }
  },
  anim: { quieto: 'guardia', caminaDer: ['cam_der_1', 'cam_der_2'], caminaIzq: ['cam_izq_1', 'cam_izq_2'],
    pina: 'primario', patada: 'frontal', especial: 'primario',             // mordida en avance · mordida extendida · especial = embestida con mordida
    preparar: { pina: 'secundario', patada: 'secundario', especial: 'secundario' },   // 07 = la ORDEN del agente: SIN daño
    bloqueo: { der: 'bloqueo', izq: 'bloqueo' },                           // nunca palo ni escudo
    dolor: 'golpe', caida: 'arrodillado', muerto: 'ko', suelo: 'ko', levantarse: 'levantarse' },
  zancada: 40
};


// v34 — GORDO ESCOBA (jefe del nivel 8). Paquete HINCHA_ESCOBA_MOVIMIENTOS_Y_BLOQUEO: poses clave, no animaciones completas.
// Las izquierdas son espejos exactos de las derechas (verificado píxel a píxel). Caída y KO miran a la derecha: el motor las espeja.
// Escala: ref medido con el ancho del pelo contra el paso 01 (ref 1190): escobazo dibujado ~7 % más chico → 1107, bloqueo ~4 % → 1147. pie = fila de la suela apoyada
// (píxeles opacos), ancla = centro del cuerpo (sin la escoba). Caída y KO NO se estiran a la altura de pie.
// TODO(arte): no hay guardia propia: se usa el paso 01 de la caminata como pose de parado/preparación (provisorio).
// TODO(arte): no hay cuadro de golpe recibido (guardia inclinada) ni de levantarse (primera caída = su pose de caída).
window.SPRITES_ENEMIGOS.gordo_escoba = {
  frames: {
      // v48 — REACCIÓN AL GOLPE: un cuadro (ojos cerrados, torso atrás). Mira a la derecha; a la izquierda se espeja. Pies alineados con la guardia.
      reaccion: { src: "assets/enemigos/especiales/gordo_escoba/reaccion/escoba_recibe_golpe.webp", mira: "der", ref: 1178.1, pie: 1259, ancla: 614.6 },
      // v47 — CAMINATA FLUIDA: pasos intermedios (ciclo de 4 cuadros). Alineados con su paso completo (cabeza) y la suela.
      camCambioApoyo: { src: "assets/enemigos/especiales/gordo_escoba/caminata/escoba_intermedio_cambio_apoyo.webp", mira: "der", ref: 1130.5, pie: 1224, ancla: 450.6 },
      camPasoCorto: { src: "assets/enemigos/especiales/gordo_escoba/caminata/escoba_intermedio_paso_corto.webp", mira: "der", ref: 1129.7, pie: 1225, ancla: 446.3 },
      caminar_derecha_01: { src: "assets/enemigos/especiales/gordo_escoba/escoba_caminar_derecha_01.webp", mira: "der", ref: 1190, pie: 1246, ancla: 440 },
      caminar_derecha_02: { src: "assets/enemigos/especiales/gordo_escoba/escoba_caminar_derecha_02.webp", mira: "der", ref: 1190, pie: 1259, ancla: 410 },
      caminar_izquierda_01: { src: "assets/enemigos/especiales/gordo_escoba/escoba_caminar_izquierda_01.webp", mira: "izq", ref: 1190, pie: 1246, ancla: 762 },
      caminar_izquierda_02: { src: "assets/enemigos/especiales/gordo_escoba/escoba_caminar_izquierda_02.webp", mira: "izq", ref: 1190, pie: 1259, ancla: 792 },
      golpe_derecha: { src: "assets/enemigos/especiales/gordo_escoba/escoba_golpe_escoba_derecha.webp", mira: "der", ref: 1107, pie: 995, ancla: 460 },
      golpe_izquierda: { src: "assets/enemigos/especiales/gordo_escoba/escoba_golpe_escoba_izquierda.webp", mira: "izq", ref: 1107, pie: 995, ancla: 1024 },
      bloqueo_derecha: { src: "assets/enemigos/especiales/gordo_escoba/escoba_bloqueo_derecha.webp", mira: "der", ref: 1147, pie: 1146, ancla: 510 },
      bloqueo_izquierda: { src: "assets/enemigos/especiales/gordo_escoba/escoba_bloqueo_izquierda.webp", mira: "izq", ref: 1147, pie: 1146, ancla: 744 },
      caida: { src: "assets/enemigos/especiales/gordo_escoba/escoba_caida.webp", mira: "der", ref: 1190, pie: 1156, ancla: 545 },
      muerto: { src: "assets/enemigos/especiales/gordo_escoba/escoba_muerto_ko.webp", mira: "der", ref: 1190, pie: 868, ancla: 968, acostado: true }
  },
  anim: {
    dolor: 'reaccion',   // v48: reacción al golpe (antes: guardia inclinada)
    quieto: 'caminar_derecha_01',                                   // provisorio: no hay guardia en el paquete
    caminaDer: ['caminar_derecha_01', 'camCambioApoyo', 'camPasoCorto', 'caminar_derecha_02'], caminaIzq: ['caminar_derecha_01', 'camCambioApoyo', 'camPasoCorto', 'caminar_derecha_02'],   // v47: 4 cuadros; el motor espeja según hacia dónde mira
    pina: { der: 'golpe_derecha', izq: 'golpe_izquierda' },          // escobazo (único ataque)
    bloqueo: { der: 'bloqueo_derecha', izq: 'bloqueo_izquierda' },
    caida: 'caida', muerto: 'muerto'
  },
  zancada: 40, zancadaLado: 22
};


// v56 — MATUTE como JEFE FINAL (Boca y San Lorenzo VS RIVER, nivel 10). Usa los MISMOS dibujos del Matute jugable
// (assets/referentes/matute), con su misma escala (ref = altoReferencia del grupo en js/sprites_referentes.js), suela y centro.
// Poses que NO existen todavía y se cubren con lo que hay (TODO arte, ver LEEME v56):
//   · caída, suelo y KO → no hay dibujo: el motor lo voltea con la reacción fuerte (golpe_b), como al Matute jugable.
//   · arrodillado (entre sus dos barras) → no hay dibujo: queda en la reacción fuerte (golpe_b) hasta levantarse.
window.SPRITES_ENEMIGOS.matute = {
  frames: {
    guardia: { src: "assets/referentes/matute/matute_01.webp", mira: "der", ref: 1235, pie: 1245.0, ancla: 632.0 },   // matute_01
    camIntDer: { src: "assets/referentes/matute/caminata/matute_intermedio_pierna_derecha.webp", mira: "der", ref: 1216.8, pie: 1237.0, ancla: 601.0 },   // camIntDer
    cam09: { src: "assets/referentes/matute/matute_09.webp", mira: "der", ref: 1235, pie: 1247.0, ancla: 587.5 },   // cam09
    camIntIzq: { src: "assets/referentes/matute/caminata/matute_intermedio_pierna_izquierda.webp", mira: "der", ref: 1237.1, pie: 1226.0, ancla: 618.5 },   // camIntIzq
    camPasoB: { src: "assets/referentes/matute/matute_caminar_derecha_paso_b.webp", mira: "der", ref: 1235, pie: 1230.0, ancla: 614.0 },   // camPasoB
    arriba_a: { src: "assets/referentes/matute/matute_02.webp", mira: "espalda", ref: 1490, pie: 1512.0, ancla: 502.5 },   // matute_02
    arriba_b: { src: "assets/referentes/matute/matute_15.webp", mira: "espalda", ref: 1490, pie: 1493.0, ancla: 510.5 },   // matute_15
    abajo_a: { src: "assets/referentes/matute/matute_03.webp", mira: "frente", ref: 1490, pie: 1499.0, ancla: 506.5 },   // matute_03
    abajo_b: { src: "assets/referentes/matute/matute_05.webp", mira: "frente", ref: 1490, pie: 1515.0, ancla: 498.0 },   // matute_05
    abajo_c: { src: "assets/referentes/matute/matute_20.webp", mira: "frente", ref: 1490, pie: 1515.0, ancla: 506.0 },   // matute_20
    pina_der: { src: "assets/referentes/matute/matute_04.webp", mira: "der", ref: 1235, pie: 1198.0, ancla: 720.5 },   // matute_04
    pina_izq: { src: "assets/referentes/matute/matute_10.webp", mira: "izq", ref: 1235, pie: 1195.0, ancla: 792.5 },   // matute_10
    patada_der: { src: "assets/referentes/matute/matute_extra_07.webp", mira: "der", ref: 1235, pie: 1195.0, ancla: 401.0 },   // matute_extra_07
    patada_izq: { src: "assets/referentes/matute/matute_07.webp", mira: "izq", ref: 1235, pie: 1201.0, ancla: 802.0 },   // matute_07
    cabezazo: { src: "assets/referentes/matute/matute_06.webp", mira: "der", ref: 1235, pie: 1181.0, ancla: 444.5 },   // matute_06
    bloqueo_der: { src: "assets/referentes/matute/bloqueo/matute_bloqueo_derecha.webp", mira: "der", ref: 1247, pie: 1244.0, ancla: 631.5 },   // bloqueoDer
    bloqueo_izq: { src: "assets/referentes/matute/bloqueo/matute_bloqueo_izquierda.webp", mira: "izq", ref: 1247, pie: 1244.0, ancla: 622.5 },   // bloqueoIzq
    golpe_a: { src: "assets/referentes/matute/matute_recibir_golpe_02.webp", mira: "der", ref: 1235, pie: 1241.0, ancla: 644.0 },   // matute_recibir_golpe_02
    golpe_b: { src: "assets/referentes/matute/matute_recibir_golpe_03.webp", mira: "der", ref: 1235, pie: 1238.0, ancla: 638.0 },   // matute_recibir_golpe_03
    golpe_c: { src: "assets/referentes/matute/matute_recibir_golpe_04.webp", mira: "der", ref: 1235, pie: 1245.0, ancla: 632.0 },   // matute_recibir_golpe_04
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ['camIntDer', 'cam09', 'camIntIzq', 'camPasoB'], caminaIzq: ['camIntDer', 'cam09', 'camIntIzq', 'camPasoB'],   // ciclo de 4; a la izquierda se espeja
    caminaArriba: ['arriba_a', 'arriba_b'], caminaAbajo: ['abajo_a', 'abajo_b', 'abajo_c', 'abajo_b'],
    pina: { der: 'pina_der', izq: 'pina_izq' }, patada: { der: 'patada_der', izq: 'patada_izq' }, cabezazo: 'cabezazo',
    bloqueo: { der: 'bloqueo_der', izq: 'bloqueo_izq' },
    dolores: ['golpe_a', 'golpe_b', 'golpe_c'], dolor: 'golpe_a',
    arrodillado: { der: 'golpe_b', izq: 'golpe_b' },   // provisorio: no hay pose de rodillas (TODO arte)
    koGirando: 'golpe_b'                               // provisorio: sin caída ni KO dibujados, se voltea esta pose (TODO arte)
  },
  zancada: 44, zancadaLado: 46
};

/* ---- v64 — JEFES RIVALES DE LA CAMPAÑA DE RIVER (bloques San Lorenzo, Racing e Independiente) -------------------
   Generados desde sus cuadros de referente jugable (js/sprites_referentes.js): mismo PNG, pie, ancla y escala
   (ref = altoReferencia de su grupo). Caída → tendido propios. Segunda vida: no hay pose de rodillas → golpe 2 (provisorio,
   igual que Matute jefe). Números de combate: los del Abuelo como jefe (js/niveles.js → statsEnemigo), como Matute. */
window.SPRITES_ENEMIGOS.el_chivo = {"frames":{"guardiaDer":{"src":"assets/referentes/el_chivo/el_chivo_guardia_derecha.webp","mira":"der","ref":1496,"pie":1514,"ancla":489},"camD1":{"src":"assets/referentes/el_chivo/el_chivo_caminar_derecha_01.webp","mira":"der","ref":1496,"pie":1490,"ancla":481},"camD3":{"src":"assets/referentes/el_chivo/el_chivo_caminar_derecha_03.webp","mira":"der","ref":1496,"pie":1510,"ancla":479},"camD2":{"src":"assets/referentes/el_chivo/el_chivo_caminar_derecha_02.webp","mira":"der","ref":1391,"pie":1351,"ancla":557},"camE1":{"src":"assets/referentes/el_chivo/el_chivo_caminar_espalda_01.webp","mira":"espalda","ref":1496,"pie":1483,"ancla":515},"camE3":{"src":"assets/referentes/el_chivo/el_chivo_caminar_espalda_03.webp","mira":"espalda","ref":1496,"pie":1479,"ancla":505},"camE2":{"src":"assets/referentes/el_chivo/el_chivo_caminar_espalda_02.webp","mira":"espalda","ref":1496,"pie":1475,"ancla":514},"camF1":{"src":"assets/referentes/el_chivo/el_chivo_caminar_frente_01.webp","mira":"frente","ref":1496,"pie":1503,"ancla":537},"camF3":{"src":"assets/referentes/el_chivo/el_chivo_caminar_frente_03.webp","mira":"frente","ref":1496,"pie":1477,"ancla":539},"camF2":{"src":"assets/referentes/el_chivo/el_chivo_caminar_frente_02.webp","mira":"frente","ref":1496,"pie":1501,"ancla":523},"pinaDer":{"src":"assets/referentes/el_chivo/el_chivo_pina_derecha.webp","mira":"der","ref":1496,"pie":1468,"ancla":422},"pinaIzq":{"src":"assets/referentes/el_chivo/el_chivo_pina_izquierda.webp","mira":"izq","ref":1376,"pie":1409,"ancla":585},"patadaDer":{"src":"assets/referentes/el_chivo/el_chivo_patada_derecha.webp","mira":"der","ref":1227,"pie":1380,"ancla":455},"patadaIzq":{"src":"assets/referentes/el_chivo/el_chivo_patada_izquierda.webp","mira":"izq","ref":1227,"pie":1367,"ancla":545},"agarre":{"src":"assets/referentes/el_chivo/el_chivo_agarre.webp","mira":"der","ref":1496,"pie":1481,"ancla":462},"bloqueoDer":{"src":"assets/referentes/el_chivo/el_chivo_bloqueo_derecha.webp","mira":"der","ref":1496,"pie":1493,"ancla":512},"bloqueoIzq":{"src":"assets/referentes/el_chivo/el_chivo_bloqueo_izquierda.webp","mira":"izq","ref":1376,"pie":1483,"ancla":532},"golpe1":{"src":"assets/referentes/el_chivo/el_chivo_recibir_golpe_01.webp","mira":"der","ref":1496,"pie":1491,"ancla":460},"golpe2":{"src":"assets/referentes/el_chivo/el_chivo_recibir_golpe_02.webp","mira":"der","ref":1496,"pie":1497,"ancla":609},"golpe3":{"src":"assets/referentes/el_chivo/el_chivo_recibir_golpe_03.webp","mira":"der","ref":1496,"pie":1494,"ancla":531},"caida":{"src":"assets/referentes/el_chivo/el_chivo_caida.webp","mira":"der","ref":1496,"pie":1413,"ancla":514},"ko":{"src":"assets/referentes/el_chivo/el_chivo_ko.webp","mira":"der","ref":1272,"pie":914,"ancla":777.5,"acostado":true}},"anim":{"quieto":"guardiaDer","caminaDer":["camD1","camD3","camD2","camD3"],"caminaIzq":["camD1","camD3","camD2","camD3"],"caminaArriba":["camE1","camE3","camE2","camE3"],"caminaAbajo":["camF1","camF3","camF2","camF3"],"pina":{"der":"pinaDer","izq":"pinaIzq"},"patada":{"der":"patadaDer","izq":"patadaIzq"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"ko","suelo":"caida","arrodillado":{"der":"golpe2","izq":"golpe2"}},"zancada":44,"zancadaLado":46};
window.SPRITES_ENEMIGOS.cacho = {"frames":{"guardiaDer":{"src":"assets/referentes/cacho/cacho_guardia_derecha.webp","mira":"der","ref":1458,"pie":1499,"ancla":496},"camD1":{"src":"assets/referentes/cacho/cacho_caminar_derecha_01.webp","mira":"der","ref":1458,"pie":1478,"ancla":435},"camD3":{"src":"assets/referentes/cacho/cacho_caminar_derecha_03.webp","mira":"der","ref":1458,"pie":1449,"ancla":432},"camD2":{"src":"assets/referentes/cacho/cacho_caminar_derecha_02.webp","mira":"der","ref":1356,"pie":1353,"ancla":549},"camE1":{"src":"assets/referentes/cacho/cacho_caminar_espalda_01.webp","mira":"espalda","ref":1458,"pie":1505,"ancla":507},"camE3":{"src":"assets/referentes/cacho/cacho_caminar_espalda_03.webp","mira":"espalda","ref":1458,"pie":1483,"ancla":484},"camE2":{"src":"assets/referentes/cacho/cacho_caminar_espalda_02.webp","mira":"espalda","ref":1458,"pie":1488,"ancla":515},"camF1":{"src":"assets/referentes/cacho/cacho_caminar_frente_01.webp","mira":"frente","ref":1458,"pie":1510,"ancla":560},"camF3":{"src":"assets/referentes/cacho/cacho_caminar_frente_03.webp","mira":"frente","ref":1458,"pie":1483,"ancla":553},"camF2":{"src":"assets/referentes/cacho/cacho_caminar_frente_02.webp","mira":"frente","ref":1458,"pie":1493,"ancla":541},"pinaDer":{"src":"assets/referentes/cacho/cacho_pina_derecha.webp","mira":"der","ref":1458,"pie":1395,"ancla":425},"pinaIzq":{"src":"assets/referentes/cacho/cacho_pina_izquierda.webp","mira":"izq","ref":1458,"pie":1459,"ancla":601},"patadaDer":{"src":"assets/referentes/cacho/cacho_patada_derecha.webp","mira":"der","ref":1283,"pie":1422,"ancla":453.5},"patadaIzq":{"src":"assets/referentes/cacho/cacho_patada_izquierda.webp","mira":"izq","ref":1283,"pie":1397,"ancla":566.5},"agarre":{"src":"assets/referentes/cacho/cacho_agarre.webp","mira":"der","ref":1458,"pie":1453,"ancla":444},"bloqueoDer":{"src":"assets/referentes/cacho/cacho_bloqueo_derecha.webp","mira":"der","ref":1458,"pie":1467,"ancla":494},"bloqueoIzq":{"src":"assets/referentes/cacho/cacho_bloqueo_izquierda.webp","mira":"izq","ref":1458,"pie":1484,"ancla":550},"golpe1":{"src":"assets/referentes/cacho/cacho_recibir_golpe_01.webp","mira":"der","ref":1458,"pie":1466,"ancla":604},"golpe2":{"src":"assets/referentes/cacho/cacho_recibir_golpe_02.webp","mira":"der","ref":1458,"pie":1470,"ancla":562},"golpe3":{"src":"assets/referentes/cacho/cacho_recibir_golpe_03.webp","mira":"der","ref":1458,"pie":1457,"ancla":497},"caida":{"src":"assets/referentes/cacho/cacho_caida.webp","mira":"der","ref":1458,"pie":1335,"ancla":517},"ko":{"src":"assets/referentes/cacho/cacho_ko.webp","mira":"der","ref":1327,"pie":830,"ancla":905,"acostado":true}},"anim":{"quieto":"guardiaDer","caminaDer":["camD1","camD3","camD2","camD3"],"caminaIzq":["camD1","camD3","camD2","camD3"],"caminaArriba":["camE1","camE3","camE2","camE3"],"caminaAbajo":["camF1","camF3","camF2","camF3"],"pina":{"der":"pinaDer","izq":"pinaIzq"},"patada":{"der":"patadaDer","izq":"patadaIzq"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"ko","suelo":"caida","arrodillado":{"der":"golpe2","izq":"golpe2"}},"zancada":44,"zancadaLado":46};
window.SPRITES_ENEMIGOS.el_gallego = {"frames":{"guardiaDer":{"src":"assets/referentes/el_gallego/el_gallego_guardia_derecha.webp","mira":"der","ref":1344,"pie":1367,"ancla":548},"camD1":{"src":"assets/referentes/el_gallego/el_gallego_caminar_derecha_01.webp","mira":"der","ref":1344,"pie":1362,"ancla":501},"camD3":{"src":"assets/referentes/el_gallego/el_gallego_caminar_derecha_03.webp","mira":"der","ref":1344,"pie":1334,"ancla":541},"camD2":{"src":"assets/referentes/el_gallego/el_gallego_caminar_derecha_02.webp","mira":"der","ref":1344,"pie":1353,"ancla":522},"camI1":{"src":"assets/referentes/el_gallego/el_gallego_caminar_izquierda_01.webp","mira":"izq","ref":1344,"pie":1358,"ancla":618},"camI3":{"src":"assets/referentes/el_gallego/el_gallego_caminar_izquierda_03.webp","mira":"izq","ref":1344,"pie":1343,"ancla":604},"camI2":{"src":"assets/referentes/el_gallego/el_gallego_caminar_izquierda_02.webp","mira":"izq","ref":1344,"pie":1352,"ancla":568},"camE1":{"src":"assets/referentes/el_gallego/el_gallego_caminar_espalda_01.webp","mira":"espalda","ref":1344,"pie":1348,"ancla":520},"camE3":{"src":"assets/referentes/el_gallego/el_gallego_caminar_espalda_03.webp","mira":"espalda","ref":1344,"pie":1369,"ancla":526},"camE2":{"src":"assets/referentes/el_gallego/el_gallego_caminar_espalda_02.webp","mira":"espalda","ref":1344,"pie":1356,"ancla":507},"camF1":{"src":"assets/referentes/el_gallego/el_gallego_caminar_frente_01.webp","mira":"frente","ref":1344,"pie":1366,"ancla":517},"camF3":{"src":"assets/referentes/el_gallego/el_gallego_caminar_frente_03.webp","mira":"frente","ref":1344,"pie":1371,"ancla":593},"camF2":{"src":"assets/referentes/el_gallego/el_gallego_caminar_frente_02.webp","mira":"frente","ref":1344,"pie":1372,"ancla":600},"pinaDer":{"src":"assets/referentes/el_gallego/el_gallego_pina_derecha.webp","mira":"der","ref":1344,"pie":1332,"ancla":478},"pinaIzq":{"src":"assets/referentes/el_gallego/el_gallego_pina_izquierda.webp","mira":"izq","ref":1344,"pie":1328,"ancla":696},"patadaDer":{"src":"assets/referentes/el_gallego/el_gallego_patada_derecha.webp","mira":"der","ref":1344,"pie":1305,"ancla":462},"patadaIzq":{"src":"assets/referentes/el_gallego/el_gallego_patada_izquierda.webp","mira":"izq","ref":1344,"pie":1302,"ancla":634},"agarre":{"src":"assets/referentes/el_gallego/el_gallego_agarre.webp","mira":"der","ref":1344,"pie":1340,"ancla":443},"bloqueoDer":{"src":"assets/referentes/el_gallego/el_gallego_bloqueo_derecha.webp","mira":"der","ref":1344,"pie":1362,"ancla":540},"bloqueoIzq":{"src":"assets/referentes/el_gallego/el_gallego_bloqueo_izquierda.webp","mira":"izq","ref":1344,"pie":1369,"ancla":599},"golpe1":{"src":"assets/referentes/el_gallego/el_gallego_recibir_golpe_01.webp","mira":"der","ref":1344,"pie":1352,"ancla":611},"golpe2":{"src":"assets/referentes/el_gallego/el_gallego_recibir_golpe_02.webp","mira":"der","ref":1344,"pie":1355,"ancla":571},"golpe3":{"src":"assets/referentes/el_gallego/el_gallego_recibir_golpe_03.webp","mira":"der","ref":1344,"pie":1352,"ancla":564},"caida":{"src":"assets/referentes/el_gallego/el_gallego_caida.webp","mira":"der","ref":1344,"pie":1256,"ancla":567},"ko":{"src":"assets/referentes/el_gallego/el_gallego_ko.webp","mira":"der","ref":1560,"pie":810,"ancla":890,"acostado":true},"camFp":{"src":"assets/referentes/el_gallego/el_gallego_caminar_frente_paso.webp","mira":"frente","ref":1344,"pie":1360,"ancla":514.4},"camFb":{"src":"assets/referentes/el_gallego/el_gallego_caminar_frente_b.webp","mira":"frente","ref":1344,"pie":1368,"ancla":512.0}},"anim":{"quieto":"guardiaDer","caminaDer":["camD1","camD3","camD2","camD3"],"caminaIzq":["camI1","camI3","camI2","camI3"],"caminaArriba":["camE1","camE3","camE2","camE3"],"caminaAbajo":["camF1","camFp","camFb","camFp"],"pina":{"der":"pinaDer","izq":"pinaIzq"},"patada":{"der":"patadaDer","izq":"patadaIzq"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"ko","suelo":"caida","arrodillado":{"der":"golpe2","izq":"golpe2"}},"zancada":44,"zancadaLado":46,"pasoMs":{"caminaAbajo":140}};   // v93: caminata de frente A → paso → B → paso (140 ms por cuadro)

/* ---- v106 EL LOCO TITO JEFE (Belgrano local, nivel 10) — generado desde SPRITES_REFERENTES.el_loco_tito (animaciones_nuevas/REFERENTES_BELGRANO_35_POSES_v1/el_loco_tito):
   mismos PNG, pie, ancla y escala (ref = altoReferencia de su grupo); caminatas con sus cuadros direccionales (der D1→D2→D3→D2, izq I1→I2→I3→I2,
   frente F, espalda E: las mismas secuencias corregidas del referente). Segunda vida: su pose «levantarse». Instancia SEPARADA del referente jugable. */
window.SPRITES_ENEMIGOS.el_loco_tito = {"frames":{"guardiaDer":{"src":"assets/referentes/el_loco_tito/el_loco_tito_01_guardia_derecha.webp","mira":"der","ref":1247.5,"pie":1339,"ancla":566},"guardiaIzq":{"src":"assets/referentes/el_loco_tito/el_loco_tito_02_guardia_izquierda.webp","mira":"izq","ref":1156.2,"pie":1135,"ancla":673},"guardiaFrente":{"src":"assets/referentes/el_loco_tito/el_loco_tito_03_guardia_frente.webp","mira":"frente","ref":1100.5,"pie":1153,"ancla":649},"guardiaEspalda":{"src":"assets/referentes/el_loco_tito/el_loco_tito_04_guardia_espalda.webp","mira":"espalda","ref":1232.5,"pie":1327,"ancla":578},"camI1":{"src":"assets/referentes/el_loco_tito/el_loco_tito_05_caminar_izquierda_1.webp","mira":"izq","ref":1212,"pie":1311,"ancla":600},"camI2":{"src":"assets/referentes/el_loco_tito/el_loco_tito_06_caminar_izquierda_2.webp","mira":"izq","ref":1155,"pie":1278,"ancla":611},"camI3":{"src":"assets/referentes/el_loco_tito/el_loco_tito_07_caminar_izquierda_3.webp","mira":"izq","ref":1215,"pie":1317,"ancla":575},"camD1":{"src":"assets/referentes/el_loco_tito/el_loco_tito_08_caminar_derecha_1.webp","mira":"der","ref":1102,"pie":1124,"ancla":657},"camD2":{"src":"assets/referentes/el_loco_tito/el_loco_tito_09_caminar_derecha_2.webp","mira":"der","ref":1224,"pie":1312,"ancla":520},"camD3":{"src":"assets/referentes/el_loco_tito/el_loco_tito_10_caminar_derecha_3.webp","mira":"der","ref":1056,"pie":1132,"ancla":629},"camF1":{"src":"assets/referentes/el_loco_tito/el_loco_tito_11_caminar_frente_1.webp","mira":"frente","ref":1230,"pie":1328,"ancla":575},"camF2":{"src":"assets/referentes/el_loco_tito/el_loco_tito_12_caminar_frente_2.webp","mira":"frente","ref":1232,"pie":1317,"ancla":519},"camF3":{"src":"assets/referentes/el_loco_tito/el_loco_tito_13_caminar_frente_3.webp","mira":"frente","ref":1274,"pie":1345,"ancla":579},"camE1":{"src":"assets/referentes/el_loco_tito/el_loco_tito_14_caminar_espalda_1.webp","mira":"espalda","ref":1243,"pie":1331,"ancla":604},"camE2":{"src":"assets/referentes/el_loco_tito/el_loco_tito_15_caminar_espalda_2.webp","mira":"espalda","ref":1258,"pie":1328,"ancla":514},"camE3":{"src":"assets/referentes/el_loco_tito/el_loco_tito_16_caminar_espalda_3.webp","mira":"espalda","ref":1235,"pie":1324,"ancla":532},"pinaIzq":{"src":"assets/referentes/el_loco_tito/el_loco_tito_17_pina_izquierda.webp","mira":"izq","ref":1246.2,"pie":1285,"ancla":616},"pinaDer":{"src":"assets/referentes/el_loco_tito/el_loco_tito_18_pina_derecha.webp","mira":"der","ref":1300,"pie":1304,"ancla":509},"patadaIzq":{"src":"assets/referentes/el_loco_tito/el_loco_tito_19_patada_izquierda.webp","mira":"izq","ref":1250,"pie":1282,"ancla":624},"patadaDer":{"src":"assets/referentes/el_loco_tito/el_loco_tito_20_patada_derecha.webp","mira":"der","ref":1159.4,"pie":1149,"ancla":620},"bloqueoIzq":{"src":"assets/referentes/el_loco_tito/el_loco_tito_21_bloqueo_izquierda.webp","mira":"izq","ref":1275,"pie":1317,"ancla":593},"bloqueoDer":{"src":"assets/referentes/el_loco_tito/el_loco_tito_22_bloqueo_derecha.webp","mira":"der","ref":1318.8,"pie":1322,"ancla":580},"golpe1":{"src":"assets/referentes/el_loco_tito/el_loco_tito_23_golpe_recibido_01.webp","mira":"der","ref":1137.5,"pie":1134,"ancla":679},"golpe2":{"src":"assets/referentes/el_loco_tito/el_loco_tito_24_golpe_recibido_02.webp","mira":"der","ref":1250,"pie":1315,"ancla":553},"golpe3":{"src":"assets/referentes/el_loco_tito/el_loco_tito_25_golpe_recibido_03.webp","mira":"der","ref":1251,"pie":1139,"ancla":742},"caida":{"src":"assets/referentes/el_loco_tito/el_loco_tito_26_caida.webp","mira":"der","ref":1371.8,"pie":887,"ancla":773},"ko":{"src":"assets/referentes/el_loco_tito/el_loco_tito_27_ko.webp","mira":"der","ref":1344,"pie":730,"ancla":889.5,"acostado":true},"levantarse":{"src":"assets/referentes/el_loco_tito/el_loco_tito_28_levantarse.webp","mira":"der","ref":1362.5,"pie":1180,"ancla":572.5},"poder01":{"src":"assets/referentes/el_loco_tito/el_loco_tito_29_poder_preparar.webp","mira":"der","ref":1190,"pie":1302,"ancla":642},"poder02":{"src":"assets/referentes/el_loco_tito/el_loco_tito_30_poder_golpe.webp","mira":"der","ref":1162.5,"pie":973,"ancla":802},"agarre":{"src":"assets/referentes/el_loco_tito/el_loco_tito_31_agarre.webp","mira":"der","ref":1196.2,"pie":1144,"ancla":609},"fernet1":{"src":"assets/referentes/el_loco_tito/el_loco_tito_32_recuperacion_recoger.webp","mira":"der","ref":1475,"pie":1284,"ancla":583.5},"fernet2":{"src":"assets/referentes/el_loco_tito/el_loco_tito_33_recuperacion_sostener.webp","mira":"der","ref":1290,"pie":1350,"ancla":569},"fernet3":{"src":"assets/referentes/el_loco_tito/el_loco_tito_34_recuperacion_beber.webp","mira":"der","ref":1250,"pie":1347,"ancla":550},"fernet4":{"src":"assets/referentes/el_loco_tito/el_loco_tito_35_recuperacion_bajar.webp","mira":"der","ref":1256.2,"pie":1337,"ancla":565}},"anim":{"quieto":"guardiaDer","caminaDer":["camD1","camD2","camD3","camD2"],"caminaIzq":["camI1","camI2","camI3","camI2"],"caminaArriba":["camE1","camE2","camE3","camE2"],"caminaAbajo":["camF1","camF2","camF3","camF2"],"pina":{"der":"pinaDer","izq":"pinaIzq"},"patada":{"der":"patadaDer","izq":"patadaIzq"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"ko","suelo":"caida","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":135};

/* ---- v107 EL TORO JEFE (Talleres local, nivel 10) — generado desde SPRITES_REFERENTES.el_toro_talleres (animaciones_nuevas/TALLERES_3_REFERENTES_v1/EL_TORO):
   mismos PNG, pie, ancla y escala por pose; caminatas con sus cuadros direccionales (der 08→09→10→09, izq 05→06→07→06, frente, espalda);
   piña 18/17, patada 22/21, bloqueo 26/25, daño 27→29, caída 30, en el piso 31 (KO), derrota 33, segunda vida = 32 (levantarse).
   Instancia SEPARADA del referente jugable «el_toro_talleres» (mismo dibujo, otros datos y estado). */
window.SPRITES_ENEMIGOS.el_toro = {"frames":{"guardiaDer":{"src":"assets/referentes/el_toro/el_toro_01_guardia_derecha.webp","mira":"der","ref":1485,"pie":1506,"ancla":551},"guardiaIzq":{"src":"assets/referentes/el_toro/el_toro_02_guardia_izquierda.webp","mira":"izq","ref":1470.2,"pie":1474,"ancla":648},"guardiaFrente":{"src":"assets/referentes/el_toro/el_toro_03_guardia_frente.webp","mira":"frente","ref":1440.5,"pie":1495,"ancla":517},"guardiaEspalda":{"src":"assets/referentes/el_toro/el_toro_04_guardia_espalda.webp","mira":"espalda","ref":1507.3,"pie":1468,"ancla":514},"camIA":{"src":"assets/referentes/el_toro/el_toro_05_caminar_izquierda_a.webp","mira":"izq","ref":1440.5,"pie":1481,"ancla":686},"camIP":{"src":"assets/referentes/el_toro/el_toro_06_caminar_izquierda_paso.webp","mira":"izq","ref":1440.5,"pie":1461,"ancla":670},"camIB":{"src":"assets/referentes/el_toro/el_toro_07_caminar_izquierda_b.webp","mira":"izq","ref":1440.5,"pie":1439,"ancla":675},"camDA":{"src":"assets/referentes/el_toro/el_toro_08_caminar_derecha_a.webp","mira":"der","ref":1425.6,"pie":1439,"ancla":488},"camDP":{"src":"assets/referentes/el_toro/el_toro_09_caminar_derecha_paso.webp","mira":"der","ref":1388.5,"pie":1424,"ancla":510},"camDB":{"src":"assets/referentes/el_toro/el_toro_10_caminar_derecha_b.webp","mira":"der","ref":1529.6,"pie":1418,"ancla":513},"camFA":{"src":"assets/referentes/el_toro/el_toro_11_caminar_frente_a.webp","mira":"frente","ref":1425.6,"pie":1532,"ancla":552},"camFP":{"src":"assets/referentes/el_toro/el_toro_12_caminar_frente_paso.webp","mira":"frente","ref":1425.6,"pie":1536,"ancla":532},"camFB":{"src":"assets/referentes/el_toro/el_toro_13_caminar_frente_b.webp","mira":"frente","ref":1425.6,"pie":1543,"ancla":487},"camEA":{"src":"assets/referentes/el_toro/el_toro_14_caminar_espalda_a.webp","mira":"espalda","ref":1421.8,"pie":1534,"ancla":547},"camEP":{"src":"assets/referentes/el_toro/el_toro_15_caminar_espalda_paso.webp","mira":"espalda","ref":1363.5,"pie":1473,"ancla":519},"camEB":{"src":"assets/referentes/el_toro/el_toro_16_caminar_espalda_b.webp","mira":"espalda","ref":1432.3,"pie":1542,"ancla":493},"pinaA_I":{"src":"assets/referentes/el_toro/el_toro_17_pina_a_izquierda.webp","mira":"izq","ref":1522.1,"pie":1474,"ancla":648},"pinaA_D":{"src":"assets/referentes/el_toro/el_toro_18_pina_a_derecha.webp","mira":"der","ref":1626.1,"pie":1452,"ancla":421},"pinaB_I":{"src":"assets/referentes/el_toro/el_toro_19_pina_b_izquierda.webp","mira":"izq","ref":1553.7,"pie":1435,"ancla":529},"pinaB_D":{"src":"assets/referentes/el_toro/el_toro_20_pina_b_derecha.webp","mira":"der","ref":1648.3,"pie":1431,"ancla":534},"patadaA_I":{"src":"assets/referentes/el_toro/el_toro_21_patada_a_izquierda.webp","mira":"izq","ref":1529.6,"pie":1479,"ancla":659},"patadaA_D":{"src":"assets/referentes/el_toro/el_toro_22_patada_a_derecha.webp","mira":"der","ref":1425.6,"pie":1488,"ancla":386},"patadaB_I":{"src":"assets/referentes/el_toro/el_toro_23_patada_b_izquierda.webp","mira":"izq","ref":1403.3,"pie":1388,"ancla":639},"patadaB_D":{"src":"assets/referentes/el_toro/el_toro_24_patada_b_derecha.webp","mira":"der","ref":1277.1,"pie":1400,"ancla":455},"bloqueoIzq":{"src":"assets/referentes/el_toro/el_toro_25_bloqueo_izquierda.webp","mira":"izq","ref":1663.2,"pie":1527,"ancla":577},"bloqueoDer":{"src":"assets/referentes/el_toro/el_toro_26_bloqueo_derecha.webp","mira":"der","ref":1663.2,"pie":1514,"ancla":610},"golpe1":{"src":"assets/referentes/el_toro/el_toro_27_dano_cabeza.webp","mira":"der","ref":1339.9,"pie":1496,"ancla":558},"golpe2":{"src":"assets/referentes/el_toro/el_toro_28_dano_cuerpo.webp","mira":"der","ref":1826.5,"pie":1497,"ancla":527},"golpe3":{"src":"assets/referentes/el_toro/el_toro_29_dano_tambaleo.webp","mira":"der","ref":1284.5,"pie":1499,"ancla":643},"caida":{"src":"assets/referentes/el_toro/el_toro_30_caida.webp","mira":"der","ref":1217.7,"pie":1225,"ancla":545},"ko":{"src":"assets/referentes/el_toro/el_toro_31_ko.webp","mira":"frente","ref":1468.8,"pie":730,"ancla":893,"acostado":true},"levantarse":{"src":"assets/referentes/el_toro/el_toro_32_levantarse.webp","mira":"der","ref":1989.9,"pie":1375,"ancla":516.5},"derrota":{"src":"assets/referentes/el_toro/el_toro_33_derrota_acostado.webp","mira":"frente","ref":1673,"pie":802,"ancla":897.5,"acostado":true},"agarre":{"src":"assets/referentes/el_toro/el_toro_34_agarre.webp","mira":"der","ref":1485,"pie":1502,"ancla":482},"codazoI":{"src":"assets/referentes/el_toro/el_toro_35_codazo_izquierda.webp","mira":"izq","ref":1486.7,"pie":1500,"ancla":584},"codazoD":{"src":"assets/referentes/el_toro/el_toro_36_codazo_derecha.webp","mira":"der","ref":1477.6,"pie":1487,"ancla":544},"poder01":{"src":"assets/referentes/el_toro/el_toro_37_poder_preparar.webp","mira":"der","ref":1796.8,"pie":1448,"ancla":585},"poder02":{"src":"assets/referentes/el_toro/el_toro_38_poder_impulso.webp","mira":"der","ref":1811.7,"pie":1432,"ancla":568},"poder03":{"src":"assets/referentes/el_toro/el_toro_39_poder_impacto.webp","mira":"der","ref":1871.1,"pie":1454,"ancla":624},"poder04":{"src":"assets/referentes/el_toro/el_toro_40_poder_recuperar.webp","mira":"der","ref":1507.3,"pie":1440,"ancla":571},"recup1":{"src":"assets/referentes/el_toro/el_toro_41_fernet_recoger.webp","mira":"der","ref":1590.4,"pie":1446,"ancla":542},"recup2":{"src":"assets/referentes/el_toro/el_toro_42_fernet_sostener.webp","mira":"der","ref":1397.6,"pie":1521,"ancla":527},"recup3":{"src":"assets/referentes/el_toro/el_toro_43_fernet_beber.webp","mira":"der","ref":1470,"pie":1522,"ancla":525},"recup4":{"src":"assets/referentes/el_toro/el_toro_44_fernet_bajar.webp","mira":"der","ref":1482,"pie":1489,"ancla":527}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

/* ---- v138 EL TUERTO JEFE (Laferrere local, nivel 10) — generado desde SPRITES_REFERENTES.el_tuerto con el mismo esquema que El Toro.
   Instancia SEPARADA del referente jugable «el_tuerto». */
window.SPRITES_ENEMIGOS.el_tuerto_jefe = {"frames":{"guardiaDer":{"src":"assets/referentes/el_tuerto/el_tuerto_01_guardia_derecha.webp","mira":"der","ref":1399,"pie":1503,"ancla":757},"guardiaIzq":{"src":"assets/referentes/el_tuerto/el_tuerto_02_guardia_izquierda.webp","mira":"izq","ref":1399,"pie":1503,"ancla":778},"guardiaFrente":{"src":"assets/referentes/el_tuerto/el_tuerto_03_guardia_frente.webp","mira":"frente","ref":1399,"pie":1503,"ancla":761},"guardiaEspalda":{"src":"assets/referentes/el_tuerto/el_tuerto_04_guardia_espalda.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":761},"camIA":{"src":"assets/referentes/el_tuerto/el_tuerto_05_caminar_izquierda_a.webp","mira":"izq","ref":1399,"pie":1503,"ancla":799},"camIP":{"src":"assets/referentes/el_tuerto/el_tuerto_06_caminar_izquierda_paso.webp","mira":"izq","ref":1399,"pie":1503,"ancla":819},"camIB":{"src":"assets/referentes/el_tuerto/el_tuerto_07_caminar_izquierda_b.webp","mira":"izq","ref":1399,"pie":1503,"ancla":832},"camDA":{"src":"assets/referentes/el_tuerto/el_tuerto_08_caminar_derecha_a.webp","mira":"der","ref":1399,"pie":1503,"ancla":736},"camDP":{"src":"assets/referentes/el_tuerto/el_tuerto_09_caminar_derecha_paso.webp","mira":"der","ref":1399,"pie":1503,"ancla":716},"camDB":{"src":"assets/referentes/el_tuerto/el_tuerto_10_caminar_derecha_b.webp","mira":"der","ref":1399,"pie":1503,"ancla":703},"camFA":{"src":"assets/referentes/el_tuerto/el_tuerto_11_caminar_frente_a.webp","mira":"frente","ref":1399,"pie":1503,"ancla":757},"camFP":{"src":"assets/referentes/el_tuerto/el_tuerto_12_caminar_frente_paso.webp","mira":"frente","ref":1399,"pie":1503,"ancla":778},"camFB":{"src":"assets/referentes/el_tuerto/el_tuerto_13_caminar_frente_b.webp","mira":"frente","ref":1399,"pie":1503,"ancla":778},"camEA":{"src":"assets/referentes/el_tuerto/el_tuerto_14_caminar_espalda_a.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":733},"camEP":{"src":"assets/referentes/el_tuerto/el_tuerto_15_caminar_espalda_paso.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":766},"camEB":{"src":"assets/referentes/el_tuerto/el_tuerto_16_caminar_espalda_b.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":802},"pinaA_I":{"src":"assets/referentes/el_tuerto/el_tuerto_17_pina_a_izquierda.webp","mira":"izq","ref":1035.3,"pie":993,"ancla":889},"pinaA_D":{"src":"assets/referentes/el_tuerto/el_tuerto_18_pina_a_derecha.webp","mira":"der","ref":1035.3,"pie":993,"ancla":631},"pinaB_I":{"src":"assets/referentes/el_tuerto/el_tuerto_19_pina_b_izquierda.webp","mira":"izq","ref":1000.3,"pie":976,"ancla":832},"pinaB_D":{"src":"assets/referentes/el_tuerto/el_tuerto_20_pina_b_derecha.webp","mira":"der","ref":1000.3,"pie":976,"ancla":688},"patadaA_I":{"src":"assets/referentes/el_tuerto/el_tuerto_21_patada_a_izquierda.webp","mira":"izq","ref":895.4,"pie":984,"ancla":935},"patadaA_D":{"src":"assets/referentes/el_tuerto/el_tuerto_22_patada_a_derecha.webp","mira":"der","ref":902.4,"pie":984,"ancla":585},"patadaB_I":{"src":"assets/referentes/el_tuerto/el_tuerto_23_patada_b_izquierda.webp","mira":"izq","ref":1007.3,"pie":984,"ancla":906},"patadaB_D":{"src":"assets/referentes/el_tuerto/el_tuerto_24_patada_b_derecha.webp","mira":"der","ref":1007.3,"pie":984,"ancla":618},"bloqueoIzq":{"src":"assets/referentes/el_tuerto/el_tuerto_25_bloqueo_izquierda.webp","mira":"izq","ref":1154.2,"pie":987,"ancla":744},"bloqueoDer":{"src":"assets/referentes/el_tuerto/el_tuerto_26_bloqueo_derecha.webp","mira":"der","ref":1154.2,"pie":987,"ancla":791},"golpe1":{"src":"assets/referentes/el_tuerto/el_tuerto_27_dano_cabeza.webp","mira":"der","ref":1049.3,"pie":991,"ancla":747},"golpe2":{"src":"assets/referentes/el_tuerto/el_tuerto_28_dano_cuerpo.webp","mira":"der","ref":1364,"pie":1024,"ancla":723},"golpe3":{"src":"assets/referentes/el_tuerto/el_tuerto_29_dano_tambaleo.webp","mira":"der","ref":986.3,"pie":1035,"ancla":875},"caida":{"src":"assets/referentes/el_tuerto/el_tuerto_30_caida.webp","mira":"der","ref":1427,"pie":849,"ancla":842.5},"ko":{"src":"assets/referentes/el_tuerto/el_tuerto_31_ko.webp","mira":"frente","ref":1917,"pie":732,"ancla":1116.5,"acostado":true},"levantarse":{"src":"assets/referentes/el_tuerto/el_tuerto_32_levantarse.webp","mira":"der","ref":1496.9,"pie":990,"ancla":727},"derrota":{"src":"assets/referentes/el_tuerto/el_tuerto_33_derrota_acostado.webp","mira":"frente","ref":1926,"pie":693,"ancla":1063,"acostado":true},"agarre":{"src":"assets/referentes/el_tuerto/el_tuerto_34_agarre.webp","mira":"der","ref":1091.2,"pie":987,"ancla":593},"codazoI":{"src":"assets/referentes/el_tuerto/el_tuerto_35_codazo_izquierda.webp","mira":"izq","ref":1119.2,"pie":994,"ancla":785},"codazoD":{"src":"assets/referentes/el_tuerto/el_tuerto_36_codazo_derecha.webp","mira":"der","ref":1119.2,"pie":994,"ancla":735},"poder01":{"src":"assets/referentes/el_tuerto/el_tuerto_37_poder_preparar.webp","mira":"der","ref":1448,"pie":986,"ancla":680},"poder02":{"src":"assets/referentes/el_tuerto/el_tuerto_38_poder_impulso.webp","mira":"der","ref":1329.1,"pie":984,"ancla":825},"poder03":{"src":"assets/referentes/el_tuerto/el_tuerto_39_poder_impacto.webp","mira":"der","ref":1364,"pie":887,"ancla":973},"poder04":{"src":"assets/referentes/el_tuerto/el_tuerto_40_poder_recuperar.webp","mira":"der","ref":1105.2,"pie":975,"ancla":757},"recup1":{"src":"assets/referentes/el_tuerto/el_tuerto_41_toro_recoger.webp","mira":"der","ref":1434,"pie":988,"ancla":740.5},"recup2":{"src":"assets/referentes/el_tuerto/el_tuerto_42_toro_sostener.webp","mira":"der","ref":1399,"pie":1503,"ancla":717},"recup3":{"src":"assets/referentes/el_tuerto/el_tuerto_43_toro_beber.webp","mira":"der","ref":1399,"pie":1503,"ancla":712.5},"recup4":{"src":"assets/referentes/el_tuerto/el_tuerto_44_toro_bajar.webp","mira":"der","ref":1399,"pie":1503,"ancla":771}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

/* v139 — MUCHINGA como jefe del nivel 10 de Chacarita: mismas imágenes y medidas de su ficha de referente (sprites_referentes.js), formato de jefe como El Tuerto. */
window.SPRITES_ENEMIGOS.muchinga_jefe = {"frames":{"guardiaDer":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_01_guardia_derecha.webp","mira":"der","ref":1399,"pie":1503,"ancla":748},"guardiaIzq":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_02_guardia_izquierda.webp","mira":"izq","ref":1399,"pie":1503,"ancla":787},"guardiaFrente":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_03_guardia_frente.webp","mira":"frente","ref":1399,"pie":1503,"ancla":768},"guardiaEspalda":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_04_guardia_espalda.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":765},"camIA":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_05_caminar_izquierda_a.webp","mira":"izq","ref":1399,"pie":1503,"ancla":835},"camIP":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_06_caminar_izquierda_paso.webp","mira":"izq","ref":1399,"pie":1503,"ancla":834},"camIB":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_07_caminar_izquierda_b.webp","mira":"izq","ref":1399,"pie":1503,"ancla":839},"camDA":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_08_caminar_derecha_a.webp","mira":"der","ref":1399,"pie":1503,"ancla":700},"camDP":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_09_caminar_derecha_paso.webp","mira":"der","ref":1399,"pie":1503,"ancla":701},"camDB":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_10_caminar_derecha_b.webp","mira":"der","ref":1399,"pie":1503,"ancla":696},"camFA":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_11_caminar_frente_a.webp","mira":"frente","ref":1399,"pie":1503,"ancla":778},"camFP":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_12_caminar_frente_paso.webp","mira":"frente","ref":1399,"pie":1503,"ancla":747},"camFB":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_13_caminar_frente_b.webp","mira":"frente","ref":1399,"pie":1503,"ancla":757},"camEA":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_14_caminar_espalda_a.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":767},"camEP":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_15_caminar_espalda_paso.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":766},"camEB":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_16_caminar_espalda_b.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":768},"pinaA_I":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_17_pina_a_izquierda.webp","mira":"izq","ref":1049.3,"pie":1036,"ancla":920},"pinaA_D":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_18_pina_a_derecha.webp","mira":"der","ref":1049.3,"pie":1036,"ancla":679},"pinaB_I":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_19_pina_b_izquierda.webp","mira":"izq","ref":1007.3,"pie":949,"ancla":887},"pinaB_D":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_20_pina_b_derecha.webp","mira":"der","ref":1007.3,"pie":949,"ancla":848},"patadaA_I":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_21_patada_a_izquierda.webp","mira":"izq","ref":937.3,"pie":1025,"ancla":982},"patadaA_D":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_22_patada_a_derecha.webp","mira":"der","ref":944.3,"pie":1025,"ancla":617},"patadaB_I":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_23_patada_b_izquierda.webp","mira":"izq","ref":1021.3,"pie":1031,"ancla":902},"patadaB_D":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_24_patada_b_derecha.webp","mira":"der","ref":1021.3,"pie":1031,"ancla":697},"bloqueoIzq":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_25_bloqueo_izquierda.webp","mira":"izq","ref":1056.2,"pie":950,"ancla":841},"bloqueoDer":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_26_bloqueo_derecha.webp","mira":"der","ref":1056.2,"pie":950,"ancla":894},"golpe1":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_27_dano_cabeza.webp","mira":"der","ref":1049.3,"pie":1037,"ancla":772},"golpe2":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_28_dano_cuerpo.webp","mira":"der","ref":1147.2,"pie":982,"ancla":749},"golpe3":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_29_dano_tambaleo.webp","mira":"der","ref":1049.3,"pie":1036,"ancla":877},"caida":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_30_caida.webp","mira":"der","ref":1434,"pie":836,"ancla":846},"ko":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_31_ko.webp","mira":"frente","ref":1973,"pie":688,"ancla":1088.5,"acostado":true},"levantarse":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_32_levantarse.webp","mira":"der","ref":1224.1,"pie":941,"ancla":694.5},"derrota":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_33_derrota_acostado.webp","mira":"frente","ref":1925,"pie":730,"ancla":1145.5,"acostado":true},"agarre":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_34_agarre.webp","mira":"der","ref":1077.2,"pie":987,"ancla":655},"codazoI":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_35_codazo_izquierda.webp","mira":"izq","ref":1049.3,"pie":1023,"ancla":845},"codazoD":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_36_codazo_derecha.webp","mira":"der","ref":1056.2,"pie":1023,"ancla":754},"poder01":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_37_poder_preparar.webp","mira":"der","ref":1329.1,"pie":906,"ancla":834},"poder02":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_38_poder_impulso.webp","mira":"der","ref":1189.2,"pie":903,"ancla":998},"poder03":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_39_poder_impacto.webp","mira":"der","ref":1538.9,"pie":901,"ancla":967},"poder04":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_40_poder_recuperar.webp","mira":"der","ref":944.3,"pie":947,"ancla":837},"recup1":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_41_toro_recoger.webp","mira":"der","ref":1538.9,"pie":1029,"ancla":763},"recup2":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_42_toro_sostener.webp","mira":"der","ref":1399,"pie":1503,"ancla":708},"recup3":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_43_toro_beber.webp","mira":"der","ref":1399,"pie":1503,"ancla":713},"recup4":{"src":"assets/referentes/muchinga_chacarita/muchinga_chacarita_44_toro_bajar.webp","mira":"der","ref":1399,"pie":1503,"ancla":774}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

/* v140 — EL PARAGUAYO como jefe del nivel 10 de Nueva Chicago: mismas imágenes y medidas de su ficha de referente (sprites_referentes.js), formato de jefe como El Tuerto / Muchinga. */
window.SPRITES_ENEMIGOS.el_paraguayo_jefe = {"frames":{"guardiaDer":{"src":"assets/referentes/el_paraguayo/el_paraguayo_01_guardia_derecha.webp","mira":"der","ref":1399,"pie":1503,"ancla":751},"guardiaIzq":{"src":"assets/referentes/el_paraguayo/el_paraguayo_02_guardia_izquierda.webp","mira":"izq","ref":1399,"pie":1503,"ancla":784},"guardiaFrente":{"src":"assets/referentes/el_paraguayo/el_paraguayo_03_guardia_frente.webp","mira":"frente","ref":1399,"pie":1503,"ancla":765},"guardiaEspalda":{"src":"assets/referentes/el_paraguayo/el_paraguayo_04_guardia_espalda.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":759},"camIA":{"src":"assets/referentes/el_paraguayo/el_paraguayo_05_caminar_izquierda_a.webp","mira":"izq","ref":1399,"pie":1503,"ancla":816},"camIP":{"src":"assets/referentes/el_paraguayo/el_paraguayo_06_caminar_izquierda_paso.webp","mira":"izq","ref":1399,"pie":1503,"ancla":813},"camIB":{"src":"assets/referentes/el_paraguayo/el_paraguayo_07_caminar_izquierda_b.webp","mira":"izq","ref":1399,"pie":1503,"ancla":819},"camDA":{"src":"assets/referentes/el_paraguayo/el_paraguayo_08_caminar_derecha_a.webp","mira":"der","ref":1399,"pie":1503,"ancla":719},"camDP":{"src":"assets/referentes/el_paraguayo/el_paraguayo_09_caminar_derecha_paso.webp","mira":"der","ref":1399,"pie":1503,"ancla":722},"camDB":{"src":"assets/referentes/el_paraguayo/el_paraguayo_10_caminar_derecha_b.webp","mira":"der","ref":1399,"pie":1503,"ancla":716},"camFA":{"src":"assets/referentes/el_paraguayo/el_paraguayo_11_caminar_frente_a.webp","mira":"frente","ref":1399,"pie":1503,"ancla":729},"camFP":{"src":"assets/referentes/el_paraguayo/el_paraguayo_12_caminar_frente_paso.webp","mira":"frente","ref":1399,"pie":1503,"ancla":788},"camFB":{"src":"assets/referentes/el_paraguayo/el_paraguayo_13_caminar_frente_b.webp","mira":"frente","ref":1399,"pie":1503,"ancla":806},"camEA":{"src":"assets/referentes/el_paraguayo/el_paraguayo_14_caminar_espalda_a.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":766},"camEP":{"src":"assets/referentes/el_paraguayo/el_paraguayo_15_caminar_espalda_paso.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":765},"camEB":{"src":"assets/referentes/el_paraguayo/el_paraguayo_16_caminar_espalda_b.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":769},"pinaA_I":{"src":"assets/referentes/el_paraguayo/el_paraguayo_17_pina_a_izquierda.webp","mira":"izq","ref":1448,"pie":1447,"ancla":664},"pinaA_D":{"src":"assets/referentes/el_paraguayo/el_paraguayo_18_pina_a_derecha.webp","mira":"der","ref":1448,"pie":1447,"ancla":428},"pinaB_I":{"src":"assets/referentes/el_paraguayo/el_paraguayo_19_pina_b_izquierda.webp","mira":"izq","ref":1496.9,"pie":1469,"ancla":535},"pinaB_D":{"src":"assets/referentes/el_paraguayo/el_paraguayo_20_pina_b_derecha.webp","mira":"der","ref":1482.9,"pie":1469,"ancla":493},"patadaA_I":{"src":"assets/referentes/el_paraguayo/el_paraguayo_21_patada_a_izquierda.webp","mira":"izq","ref":1364,"pie":1481,"ancla":776},"patadaA_D":{"src":"assets/referentes/el_paraguayo/el_paraguayo_22_patada_a_derecha.webp","mira":"der","ref":1364,"pie":1481,"ancla":315},"patadaB_I":{"src":"assets/referentes/el_paraguayo/el_paraguayo_23_patada_b_izquierda.webp","mira":"izq","ref":1308.1,"pie":1243,"ancla":839},"patadaB_D":{"src":"assets/referentes/el_paraguayo/el_paraguayo_24_patada_b_derecha.webp","mira":"der","ref":1315.1,"pie":1243,"ancla":377},"bloqueoIzq":{"src":"assets/referentes/el_paraguayo/el_paraguayo_25_bloqueo_izquierda.webp","mira":"izq","ref":1531.9,"pie":1443,"ancla":497},"bloqueoDer":{"src":"assets/referentes/el_paraguayo/el_paraguayo_26_bloqueo_derecha.webp","mira":"der","ref":1531.9,"pie":1443,"ancla":531},"golpe1":{"src":"assets/referentes/el_paraguayo/el_paraguayo_27_dano_cabeza.webp","mira":"der","ref":1507.4,"pie":1465,"ancla":494},"golpe2":{"src":"assets/referentes/el_paraguayo/el_paraguayo_28_dano_cuerpo.webp","mira":"der","ref":1507.4,"pie":1480,"ancla":431},"golpe3":{"src":"assets/referentes/el_paraguayo/el_paraguayo_29_dano_tambaleo.webp","mira":"der","ref":1462,"pie":1465,"ancla":580},"caida":{"src":"assets/referentes/el_paraguayo/el_paraguayo_30_caida.webp","mira":"der","ref":1399,"pie":960,"ancla":766.5},"ko":{"src":"assets/referentes/el_paraguayo/el_paraguayo_31_ko.webp","mira":"frente","ref":1935,"pie":726,"ancla":1119.5,"acostado":true},"levantarse":{"src":"assets/referentes/el_paraguayo/el_paraguayo_32_levantarse.webp","mira":"der","ref":1552.9,"pie":1178,"ancla":595},"derrota":{"src":"assets/referentes/el_paraguayo/el_paraguayo_33_derrota_acostado.webp","mira":"frente","ref":1932,"pie":742,"ancla":1124,"acostado":true},"agarre":{"src":"assets/referentes/el_paraguayo/el_paraguayo_34_agarre.webp","mira":"der","ref":1364,"pie":1460,"ancla":423},"codazoI":{"src":"assets/referentes/el_paraguayo/el_paraguayo_35_codazo_izquierda.webp","mira":"izq","ref":1517.9,"pie":1459,"ancla":531},"codazoD":{"src":"assets/referentes/el_paraguayo/el_paraguayo_36_codazo_derecha.webp","mira":"der","ref":1517.9,"pie":1459,"ancla":497},"poder01":{"src":"assets/referentes/el_paraguayo/el_paraguayo_37_poder_preparar.webp","mira":"der","ref":1671.8,"pie":1240,"ancla":554},"poder02":{"src":"assets/referentes/el_paraguayo/el_paraguayo_38_poder_impulso.webp","mira":"der","ref":1482.9,"pie":1254,"ancla":669},"poder03":{"src":"assets/referentes/el_paraguayo/el_paraguayo_39_poder_impacto.webp","mira":"der","ref":1399,"pie":985,"ancla":834},"poder04":{"src":"assets/referentes/el_paraguayo/el_paraguayo_40_poder_recuperar.webp","mira":"der","ref":1434,"pie":1422,"ancla":524},"recup1":{"src":"assets/referentes/el_paraguayo/el_paraguayo_41_choripan_recoger.webp","mira":"der","ref":1748.8,"pie":1200,"ancla":700},"recup2":{"src":"assets/referentes/el_paraguayo/el_paraguayo_42_choripan_sostener.webp","mira":"der","ref":1399,"pie":1503,"ancla":647},"recup3":{"src":"assets/referentes/el_paraguayo/el_paraguayo_43_choripan_comer.webp","mira":"der","ref":1399,"pie":1503,"ancla":713},"recup4":{"src":"assets/referentes/el_paraguayo/el_paraguayo_44_choripan_bajar.webp","mira":"der","ref":1399,"pie":1503,"ancla":697}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

/* v141 — EL GORDO CADENA como jefe del nivel 10 de Morón: mismas imágenes y medidas de su ficha de referente (sprites_referentes.js), formato de jefe como El Tuerto / Muchinga / El Paraguayo. */
window.SPRITES_ENEMIGOS.el_gordo_cadena_jefe = {"frames":{"guardiaDer":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_01_guardia_derecha.webp","mira":"der","ref":1399,"pie":1503,"ancla":750},"guardiaIzq":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_02_guardia_izquierda.webp","mira":"izq","ref":1399,"pie":1503,"ancla":785},"guardiaFrente":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_03_guardia_frente.webp","mira":"frente","ref":1399,"pie":1503,"ancla":765},"guardiaEspalda":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_04_guardia_espalda.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":748},"camIA":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_05_caminar_izquierda_a.webp","mira":"izq","ref":1399,"pie":1503,"ancla":783},"camIP":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_06_caminar_izquierda_paso.webp","mira":"izq","ref":1399,"pie":1503,"ancla":846},"camIB":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_07_caminar_izquierda_b.webp","mira":"izq","ref":1399,"pie":1503,"ancla":800},"camDA":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_08_caminar_derecha_a.webp","mira":"der","ref":1399,"pie":1503,"ancla":752},"camDP":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_09_caminar_derecha_paso.webp","mira":"der","ref":1399,"pie":1503,"ancla":689},"camDB":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_10_caminar_derecha_b.webp","mira":"der","ref":1399,"pie":1503,"ancla":735},"camFA":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_11_caminar_frente_a.webp","mira":"frente","ref":1399,"pie":1503,"ancla":713.5},"camFP":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_12_caminar_frente_paso.webp","mira":"frente","ref":1399,"pie":1503,"ancla":780},"camFB":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_13_caminar_frente_b.webp","mira":"frente","ref":1399,"pie":1503,"ancla":821.5},"camEA":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_14_caminar_espalda_a.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":764},"camEP":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_15_caminar_espalda_paso.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":760},"camEB":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_16_caminar_espalda_b.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":771},"pinaA_I":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_17_pina_a_izquierda.webp","mira":"izq","ref":1434,"pie":1465,"ancla":636},"pinaA_D":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_18_pina_a_derecha.webp","mira":"der","ref":1434,"pie":1465,"ancla":368},"pinaB_I":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_19_pina_b_izquierda.webp","mira":"izq","ref":1350,"pie":1514,"ancla":547},"pinaB_D":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_20_pina_b_derecha.webp","mira":"der","ref":1322.1,"pie":1514,"ancla":522},"patadaA_I":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_21_patada_a_izquierda.webp","mira":"izq","ref":1364,"pie":1494,"ancla":711},"patadaA_D":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_22_patada_a_derecha.webp","mira":"der","ref":1371,"pie":1494,"ancla":357},"patadaB_I":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_23_patada_b_izquierda.webp","mira":"izq","ref":1119.2,"pie":1026,"ancla":1034},"patadaB_D":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_24_patada_b_derecha.webp","mira":"der","ref":1119.2,"pie":1026,"ancla":565},"bloqueoIzq":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_25_bloqueo_izquierda.webp","mira":"izq","ref":1622.8,"pie":1493,"ancla":521},"bloqueoDer":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_26_bloqueo_derecha.webp","mira":"der","ref":1636.8,"pie":1493,"ancla":483},"golpe1":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_27_dano_cabeza.webp","mira":"der","ref":1517.9,"pie":1504,"ancla":472},"golpe2":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_28_dano_cuerpo.webp","mira":"der","ref":1645.9,"pie":1472,"ancla":397},"golpe3":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_29_dano_tambaleo.webp","mira":"der","ref":1399,"pie":1552,"ancla":582},"caida":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_30_caida.webp","mira":"der","ref":1399,"pie":976,"ancla":762},"ko":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_31_ko.webp","mira":"frente","ref":1947,"pie":728,"ancla":1102.5,"acostado":true},"levantarse":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_32_levantarse.webp","mira":"der","ref":1510.9,"pie":1029,"ancla":742},"derrota":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_33_derrota_acostado.webp","mira":"frente","ref":1982,"pie":734,"ancla":1127,"acostado":true},"agarre":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_34_agarre.webp","mira":"der","ref":1399,"pie":1503,"ancla":387},"codazoI":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_35_codazo_izquierda.webp","mira":"izq","ref":1475.9,"pie":1497,"ancla":562},"codazoD":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_36_codazo_derecha.webp","mira":"der","ref":1517.9,"pie":1497,"ancla":442},"poder01":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_37_poder_preparar.webp","mira":"der","ref":1399,"pie":1275,"ancla":540},"poder02":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_38_poder_impulso.webp","mira":"der","ref":1399,"pie":1323,"ancla":615},"poder03":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_39_poder_impacto.webp","mira":"der","ref":1399,"pie":1038,"ancla":870},"poder04":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_40_poder_recuperar.webp","mira":"der","ref":1538.9,"pie":1495,"ancla":437},"recup1":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_41_damajuana_recoger.webp","mira":"der","ref":1622.8,"pie":1503,"ancla":523},"recup2":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_42_damajuana_sostener.webp","mira":"der","ref":1399,"pie":1503,"ancla":739},"recup3":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_43_damajuana_beber.webp","mira":"der","ref":1399,"pie":1503,"ancla":748},"recup4":{"src":"assets/referentes/el_gordo_cadena/el_gordo_cadena_44_damajuana_bajar.webp","mira":"der","ref":1399,"pie":1503,"ancla":739}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

/* v142 — PILLÍN como jefe del nivel 10 de Rosario Central: mismas imágenes y medidas de su ficha de referente (sprites_referentes.js), formato de jefe como El Tuerto / Muchinga / El Paraguayo / El Gordo Cadena. */
window.SPRITES_ENEMIGOS.pillin_jefe = {"frames":{"guardiaDer":{"src":"assets/referentes/pillin/pillin_01_guardia_derecha.webp","mira":"der","ref":1399,"pie":1503,"ancla":720},"guardiaIzq":{"src":"assets/referentes/pillin/pillin_02_guardia_izquierda.webp","mira":"izq","ref":1399,"pie":1503,"ancla":815},"guardiaFrente":{"src":"assets/referentes/pillin/pillin_03_guardia_frente.webp","mira":"frente","ref":1399,"pie":1503,"ancla":755},"guardiaEspalda":{"src":"assets/referentes/pillin/pillin_04_guardia_espalda.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":724},"camIA":{"src":"assets/referentes/pillin/pillin_05_caminar_izquierda_a.webp","mira":"izq","ref":1399,"pie":1503,"ancla":793},"camIP":{"src":"assets/referentes/pillin/pillin_06_caminar_izquierda_paso.webp","mira":"izq","ref":1399,"pie":1503,"ancla":813},"camIB":{"src":"assets/referentes/pillin/pillin_07_caminar_izquierda_b.webp","mira":"izq","ref":1399,"pie":1503,"ancla":782},"camDA":{"src":"assets/referentes/pillin/pillin_08_caminar_derecha_a.webp","mira":"der","ref":1399,"pie":1503,"ancla":742},"camDP":{"src":"assets/referentes/pillin/pillin_09_caminar_derecha_paso.webp","mira":"der","ref":1399,"pie":1503,"ancla":722},"camDB":{"src":"assets/referentes/pillin/pillin_10_caminar_derecha_b.webp","mira":"der","ref":1399,"pie":1503,"ancla":753},"camFA":{"src":"assets/referentes/pillin/pillin_11_caminar_frente_a.webp","mira":"frente","ref":1399,"pie":1503,"ancla":748},"camFP":{"src":"assets/referentes/pillin/pillin_12_caminar_frente_paso.webp","mira":"frente","ref":1399,"pie":1503,"ancla":782},"camFB":{"src":"assets/referentes/pillin/pillin_13_caminar_frente_b.webp","mira":"frente","ref":1399,"pie":1503,"ancla":787},"camEA":{"src":"assets/referentes/pillin/pillin_14_caminar_espalda_a.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":773},"camEP":{"src":"assets/referentes/pillin/pillin_15_caminar_espalda_paso.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":769},"camEB":{"src":"assets/referentes/pillin/pillin_16_caminar_espalda_b.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":762},"pinaA_I":{"src":"assets/referentes/pillin/pillin_17_pina_a_izquierda.webp","mira":"izq","ref":1364,"pie":1456,"ancla":650},"pinaA_D":{"src":"assets/referentes/pillin/pillin_18_pina_a_derecha.webp","mira":"der","ref":1364,"pie":1456,"ancla":437},"pinaB_I":{"src":"assets/referentes/pillin/pillin_19_pina_b_izquierda.webp","mira":"izq","ref":1448,"pie":1478,"ancla":499},"pinaB_D":{"src":"assets/referentes/pillin/pillin_20_pina_b_derecha.webp","mira":"der","ref":1448,"pie":1478,"ancla":588},"patadaA_I":{"src":"assets/referentes/pillin/pillin_21_patada_a_izquierda.webp","mira":"izq","ref":1357,"pie":1456,"ancla":721},"patadaA_D":{"src":"assets/referentes/pillin/pillin_22_patada_a_derecha.webp","mira":"der","ref":1357,"pie":1456,"ancla":366},"patadaB_I":{"src":"assets/referentes/pillin/pillin_23_patada_b_izquierda.webp","mira":"izq","ref":1224.1,"pie":1358,"ancla":658},"patadaB_D":{"src":"assets/referentes/pillin/pillin_24_patada_b_derecha.webp","mira":"der","ref":1210.1,"pie":1358,"ancla":429},"bloqueoIzq":{"src":"assets/referentes/pillin/pillin_25_bloqueo_izquierda.webp","mira":"izq","ref":1413,"pie":1465,"ancla":488},"bloqueoDer":{"src":"assets/referentes/pillin/pillin_26_bloqueo_derecha.webp","mira":"der","ref":1413,"pie":1465,"ancla":535},"golpe1":{"src":"assets/referentes/pillin/pillin_27_dano_cabeza.webp","mira":"der","ref":1235.5,"pie":1455,"ancla":564},"golpe2":{"src":"assets/referentes/pillin/pillin_28_dano_cuerpo.webp","mira":"der","ref":1413,"pie":1445,"ancla":493},"golpe3":{"src":"assets/referentes/pillin/pillin_29_dano_tambaleo.webp","mira":"der","ref":1300,"pie":1486,"ancla":628},"caida":{"src":"assets/referentes/pillin/pillin_30_caida.webp","mira":"der","ref":1172.6,"pie":1238,"ancla":560.5},"ko":{"src":"assets/referentes/pillin/pillin_31_ko.webp","mira":"frente","ref":1694,"pie":816,"ancla":930,"acostado":true},"levantarse":{"src":"assets/referentes/pillin/pillin_32_levantarse.webp","mira":"der","ref":1510.9,"pie":1351,"ancla":519},"derrota":{"src":"assets/referentes/pillin/pillin_33_derrota_acostado.webp","mira":"frente","ref":1699,"pie":818,"ancla":928.5,"acostado":true},"agarre":{"src":"assets/referentes/pillin/pillin_34_agarre.webp","mira":"der","ref":1364,"pie":1474,"ancla":461},"codazoI":{"src":"assets/referentes/pillin/pillin_35_codazo_izquierda.webp","mira":"izq","ref":1378,"pie":1448,"ancla":482},"codazoD":{"src":"assets/referentes/pillin/pillin_36_codazo_derecha.webp","mira":"der","ref":1378,"pie":1448,"ancla":541},"poder01":{"src":"assets/referentes/pillin/pillin_37_poder_preparar.webp","mira":"der","ref":1566.9,"pie":1440,"ancla":561},"poder02":{"src":"assets/referentes/pillin/pillin_38_poder_impulso.webp","mira":"der","ref":1448,"pie":1407,"ancla":597},"poder03":{"src":"assets/referentes/pillin/pillin_39_poder_impacto.webp","mira":"der","ref":1531.9,"pie":1399,"ancla":648},"poder04":{"src":"assets/referentes/pillin/pillin_40_poder_recuperar.webp","mira":"der","ref":1399,"pie":1423,"ancla":548},"recup1":{"src":"assets/referentes/pillin/pillin_41_choripan_recoger.webp","mira":"der","ref":1587.9,"pie":1477,"ancla":552},"recup2":{"src":"assets/referentes/pillin/pillin_42_choripan_sostener.webp","mira":"der","ref":1399,"pie":1503,"ancla":698},"recup3":{"src":"assets/referentes/pillin/pillin_43_choripan_comer.webp","mira":"der","ref":1399,"pie":1503,"ancla":720},"recup4":{"src":"assets/referentes/pillin/pillin_44_choripan_bajar.webp","mira":"der","ref":1399,"pie":1503,"ancla":720}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

/* v143 — PIMPI como jefe del nivel 10 de Newell's: mismas imágenes y medidas de su ficha de referente (sprites_referentes.js), formato de jefe como los demás clubes. */
window.SPRITES_ENEMIGOS.pimpi_jefe = {"frames":{"guardiaDer":{"src":"assets/referentes/pimpi/pimpi_01_guardia_derecha.webp","mira":"der","ref":1399,"pie":1503,"ancla":752},"guardiaIzq":{"src":"assets/referentes/pimpi/pimpi_02_guardia_izquierda.webp","mira":"izq","ref":1399,"pie":1503,"ancla":783},"guardiaFrente":{"src":"assets/referentes/pimpi/pimpi_03_guardia_frente.webp","mira":"frente","ref":1399,"pie":1503,"ancla":759},"guardiaEspalda":{"src":"assets/referentes/pimpi/pimpi_04_guardia_espalda.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":762},"camIA":{"src":"assets/referentes/pimpi/pimpi_05_caminar_izquierda_a.webp","mira":"izq","ref":1399,"pie":1503,"ancla":795},"camIP":{"src":"assets/referentes/pimpi/pimpi_06_caminar_izquierda_paso.webp","mira":"izq","ref":1399,"pie":1503,"ancla":820},"camIB":{"src":"assets/referentes/pimpi/pimpi_07_caminar_izquierda_b.webp","mira":"izq","ref":1399,"pie":1503,"ancla":791},"camDA":{"src":"assets/referentes/pimpi/pimpi_08_caminar_derecha_a.webp","mira":"der","ref":1399,"pie":1503,"ancla":740},"camDP":{"src":"assets/referentes/pimpi/pimpi_09_caminar_derecha_paso.webp","mira":"der","ref":1399,"pie":1503,"ancla":715},"camDB":{"src":"assets/referentes/pimpi/pimpi_10_caminar_derecha_b.webp","mira":"der","ref":1399,"pie":1503,"ancla":744},"camFA":{"src":"assets/referentes/pimpi/pimpi_11_caminar_frente_a.webp","mira":"frente","ref":1399,"pie":1503,"ancla":743},"camFP":{"src":"assets/referentes/pimpi/pimpi_12_caminar_frente_paso.webp","mira":"frente","ref":1399,"pie":1503,"ancla":796},"camFB":{"src":"assets/referentes/pimpi/pimpi_13_caminar_frente_b.webp","mira":"frente","ref":1399,"pie":1503,"ancla":792},"camEA":{"src":"assets/referentes/pimpi/pimpi_14_caminar_espalda_a.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":785},"camEP":{"src":"assets/referentes/pimpi/pimpi_15_caminar_espalda_paso.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":784},"camEB":{"src":"assets/referentes/pimpi/pimpi_16_caminar_espalda_b.webp","mira":"espalda","ref":1399,"pie":1503,"ancla":750},"pinaA_I":{"src":"assets/referentes/pimpi/pimpi_17_pina_a_izquierda.webp","mira":"izq","ref":1371,"pie":1431,"ancla":642},"pinaA_D":{"src":"assets/referentes/pimpi/pimpi_18_pina_a_derecha.webp","mira":"der","ref":1392,"pie":1431,"ancla":445},"pinaB_I":{"src":"assets/referentes/pimpi/pimpi_19_pina_b_izquierda.webp","mira":"izq","ref":1343,"pie":1435,"ancla":483},"pinaB_D":{"src":"assets/referentes/pimpi/pimpi_20_pina_b_derecha.webp","mira":"der","ref":1343,"pie":1435,"ancla":540},"patadaA_I":{"src":"assets/referentes/pimpi/pimpi_21_patada_a_izquierda.webp","mira":"izq","ref":1329.1,"pie":1459,"ancla":727},"patadaA_D":{"src":"assets/referentes/pimpi/pimpi_22_patada_a_derecha.webp","mira":"der","ref":1329.1,"pie":1459,"ancla":360},"patadaB_I":{"src":"assets/referentes/pimpi/pimpi_23_patada_b_izquierda.webp","mira":"izq","ref":1084.2,"pie":1359,"ancla":575},"patadaB_D":{"src":"assets/referentes/pimpi/pimpi_24_patada_b_derecha.webp","mira":"der","ref":1084.2,"pie":1359,"ancla":512},"bloqueoIzq":{"src":"assets/referentes/pimpi/pimpi_25_bloqueo_izquierda.webp","mira":"izq","ref":1434,"pie":1523,"ancla":445},"bloqueoDer":{"src":"assets/referentes/pimpi/pimpi_26_bloqueo_derecha.webp","mira":"der","ref":1441,"pie":1523,"ancla":642},"golpe1":{"src":"assets/referentes/pimpi/pimpi_27_dano_cabeza.webp","mira":"der","ref":1385,"pie":1491,"ancla":586},"golpe2":{"src":"assets/referentes/pimpi/pimpi_28_dano_cuerpo.webp","mira":"der","ref":1385,"pie":1469,"ancla":502},"golpe3":{"src":"assets/referentes/pimpi/pimpi_29_dano_tambaleo.webp","mira":"der","ref":1437.5,"pie":1496,"ancla":698},"caida":{"src":"assets/referentes/pimpi/pimpi_30_caida.webp","mira":"der","ref":1399,"pie":923,"ancla":776.5},"ko":{"src":"assets/referentes/pimpi/pimpi_31_ko.webp","mira":"frente","ref":1684,"pie":802,"ancla":889,"acostado":true},"levantarse":{"src":"assets/referentes/pimpi/pimpi_32_levantarse.webp","mira":"der","ref":1437.5,"pie":1405,"ancla":546},"derrota":{"src":"assets/referentes/pimpi/pimpi_33_derrota_acostado.webp","mira":"frente","ref":1675,"pie":832,"ancla":896.5,"acostado":true},"agarre":{"src":"assets/referentes/pimpi/pimpi_34_agarre.webp","mira":"der","ref":1462,"pie":1509,"ancla":437},"codazoI":{"src":"assets/referentes/pimpi/pimpi_35_codazo_izquierda.webp","mira":"izq","ref":1448,"pie":1458,"ancla":515},"codazoD":{"src":"assets/referentes/pimpi/pimpi_36_codazo_derecha.webp","mira":"der","ref":1448,"pie":1458,"ancla":572},"poder01":{"src":"assets/referentes/pimpi/pimpi_37_poder_preparar.webp","mira":"der","ref":1531.9,"pie":1384,"ancla":568},"poder02":{"src":"assets/referentes/pimpi/pimpi_38_poder_impulso.webp","mira":"der","ref":1573.9,"pie":1458,"ancla":656},"poder03":{"src":"assets/referentes/pimpi/pimpi_39_poder_impacto.webp","mira":"der","ref":1517.9,"pie":1404,"ancla":645},"poder04":{"src":"assets/referentes/pimpi/pimpi_40_poder_recuperar.webp","mira":"der","ref":1427,"pie":1424,"ancla":549},"recup1":{"src":"assets/referentes/pimpi/pimpi_41_vino_recoger.webp","mira":"der","ref":1615.8,"pie":1453,"ancla":563.5},"recup2":{"src":"assets/referentes/pimpi/pimpi_42_vino_sostener.webp","mira":"der","ref":1399,"pie":1503,"ancla":721},"recup3":{"src":"assets/referentes/pimpi/pimpi_43_vino_beber.webp","mira":"der","ref":1399,"pie":1503,"ancla":703},"recup4":{"src":"assets/referentes/pimpi/pimpi_44_vino_bajar.webp","mira":"der","ref":1399,"pie":1503,"ancla":737}},"anim":{"quieto":"guardiaDer","caminaDer":["camDA","camDP","camDB","camDP"],"caminaIzq":["camIA","camIP","camIB","camIP"],"caminaArriba":["camEA","camEP","camEB","camEP"],"caminaAbajo":["camFA","camFP","camFB","camFP"],"pina":{"der":"pinaA_D","izq":"pinaA_I"},"patada":{"der":"patadaA_D","izq":"patadaA_I"},"cabezazo":"agarre","bloqueo":{"der":"bloqueoDer","izq":"bloqueoIzq"},"dolores":["golpe1","golpe2","golpe3"],"dolor":"golpe1","caida":"caida","muerto":"derrota","suelo":"ko","arrodillado":{"der":"levantarse","izq":"levantarse"}},"zancada":44,"zancadaLado":46,"pasoMs":140};

// v225 — BARRAS ESPECIALES DE RIVER (enemigos de visita_river, niveles 3, 6, 7 y 8). Origen: Documents\ChatGPT\PC Barra Brava (PNG de Darío),
// recortados y llevados a 800 px de alto de cuerpo (el juego los dibuja a ≤ 366 px), webp sin pérdida. ref = alto de pie; pie = suela; ancla = centro
// del cuerpo (en los cuadros de perfil, alineado por la cabeza con la guardia). Solo secuencias completas y verificadas a ojo:
//   · caminata 6 cuadros × derecha / izquierda / frente / espalda, guardia derecha + izquierda (otroLado), cubrirse der/izq, golpe recibido
//     (cabeza y cuerpo), tambalear → caída, en el piso, levantarse, derrota.
//   · ataques con el objeto (anticipación → efecto → continuación → recuperación), SOLO hacia la derecha: hacia la izquierda el motor los espeja.
// PENDIENTE (no se integra): El Tano arco ascendente (la «recuperación» es una hoja de 15 figuras); EL FLACO ataques a la izquierda (mezclan
// vistas de frente y perfil); PATOVA arco lateral (la «continuación» está rota) y ascendente (faltan continuación y recuperación) → no ataca;
// VIKINGO ataques a la izquierda (solo 2 de 4 cuadros). Guardias de frente/espalda: entregadas, el motor todavía no las usa.
// El Tano (micrófono con pie) — v232 (PRUEBA JUGABLE), 15 % más grande que el resto (ref ÷ 1,15).
// Caminata derecha (6): 01 v2 derecha adelante · pierna izquierda despegue v4 · pierna izquierda paso v4 · 04 izquierda adelante · pierna
// derecha despegue v4 · pierna derecha paso v4. Caminata izquierda (4): pierna izquierda despegue · paso · pierna derecha despegue · paso (v4).
// Bloqueo v2: los dos dibujos miran a la derecha (a = derecha, b = «izquierda»); mirando a la izquierda el motor los espeja.
window.SPRITES_ENEMIGOS.el_tano = {
  frames: {
    guardia: {"src": "assets/enemigos/especiales/barras_river/el_tano/guardia.webp", "mira": "der", "ref": 695.7, "pie": 801.9, "ancla": 64.7, "otroLado": "guardia_izq"},
    guardia_izq: {"src": "assets/enemigos/especiales/barras_river/el_tano/guardia_izq.webp", "mira": "izq", "ref": 695.7, "pie": 800.0, "ancla": 143.2},
    cam_frente_01: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_frente_01.webp", "mira": "frente", "ref": 695.7, "pie": 798.6, "ancla": 138.0},
    cam_frente_02: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_frente_02.webp", "mira": "frente", "ref": 695.7, "pie": 803.8, "ancla": 140.4},
    cam_frente_03: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_frente_03.webp", "mira": "frente", "ref": 695.7, "pie": 798.6, "ancla": 136.1},
    cam_frente_04: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_frente_04.webp", "mira": "frente", "ref": 695.7, "pie": 790.5, "ancla": 144.7},
    cam_frente_05: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_frente_05.webp", "mira": "frente", "ref": 695.7, "pie": 795.2, "ancla": 143.7},
    cam_frente_06: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_frente_06.webp", "mira": "frente", "ref": 695.7, "pie": 797.1, "ancla": 179.4},
    cam_espalda_01: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_espalda_01.webp", "mira": "frente", "ref": 695.7, "pie": 799.0, "ancla": 129.9},
    cam_espalda_02: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_espalda_02.webp", "mira": "frente", "ref": 695.7, "pie": 796.2, "ancla": 141.3},
    cam_espalda_03: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_espalda_03.webp", "mira": "frente", "ref": 695.7, "pie": 792.9, "ancla": 133.7},
    cam_espalda_04: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_espalda_04.webp", "mira": "frente", "ref": 695.7, "pie": 808.1, "ancla": 141.8},
    cam_espalda_05: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_espalda_05.webp", "mira": "frente", "ref": 695.7, "pie": 786.7, "ancla": 134.2},
    cam_espalda_06: {"src": "assets/enemigos/especiales/barras_river/el_tano/cam_espalda_06.webp", "mira": "frente", "ref": 695.7, "pie": 791.4, "ancla": 138.0},
    recibe_golpe: {"src": "assets/enemigos/especiales/barras_river/el_tano/recibe_golpe.webp", "mira": "der", "ref": 695.7, "pie": 767.2, "ancla": 199.9},
    recibe_cuerpo: {"src": "assets/enemigos/especiales/barras_river/el_tano/recibe_cuerpo.webp", "mira": "frente", "ref": 695.7, "pie": 792.9, "ancla": 200.8},
    tambalear: {"src": "assets/enemigos/especiales/barras_river/el_tano/tambalear.webp", "mira": "der", "ref": 695.7, "pie": 708.1, "ancla": 192.3},
    caida: {"src": "assets/enemigos/especiales/barras_river/el_tano/caida.webp", "mira": "der", "ref": 695.7, "pie": 633.0, "ancla": 195.6},
    levantarse: {"src": "assets/enemigos/especiales/barras_river/el_tano/levantarse.webp", "mira": "frente", "ref": 695.7, "pie": 715.8, "ancla": 154.7},
    derrota: {"src": "assets/enemigos/especiales/barras_river/el_tano/derrota.webp", "mira": "der", "ref": 794.0, "pie": 287.9, "ancla": 471.6, "acostado": true},
    lateral_anticipacion: {"src": "assets/enemigos/especiales/barras_river/el_tano/lateral_anticipacion.webp", "mira": "der", "ref": 695.7, "pie": 799.0, "ancla": 74.7},
    lateral_efecto: {"src": "assets/enemigos/especiales/barras_river/el_tano/lateral_efecto.webp", "mira": "der", "ref": 695.7, "pie": 801.9, "ancla": 55.4},
    lateral_continuacion: {"src": "assets/enemigos/especiales/barras_river/el_tano/lateral_continuacion.webp", "mira": "der", "ref": 695.7, "pie": 807.1, "ancla": 42.1},
    lateral_recuperacion: {"src": "assets/enemigos/especiales/barras_river/el_tano/lateral_recuperacion.webp", "mira": "der", "ref": 695.7, "pie": 794.3, "ancla": 54.0},
    ext_izq: {"src": "assets/enemigos/especiales/barras_river/el_tano/ext_izq.webp", "mira": "izq", "ref": 695.7, "pie": 724.6, "ancla": 633.0, "prueba": true},
    camD_01: {"src": "assets/enemigos/especiales/barras_river/el_tano/camD_01.webp", "mira": "der", "ref": 695.7, "pie": 780.0, "ancla": 176.5, "origen": "el-tano-caminar-derecha-01-v2.png"},
    camD_02: {"src": "assets/enemigos/especiales/barras_river/el_tano/camD_02.webp", "mira": "der", "ref": 695.7, "pie": 770.5, "ancla": 179.4, "origen": "el-tano-caminar-derecha-pierna-izquierda-despegue-v4.png"},
    camD_03: {"src": "assets/enemigos/especiales/barras_river/el_tano/camD_03.webp", "mira": "der", "ref": 695.7, "pie": 791.0, "ancla": 144.2, "origen": "el-tano-caminar-derecha-pierna-izquierda-paso-v4.png"},
    camD_04: {"src": "assets/enemigos/especiales/barras_river/el_tano/camD_04.webp", "mira": "der", "ref": 695.7, "pie": 773.8, "ancla": 176.5, "origen": "el-tano-caminar-derecha-04-izquierda-adelante.png"},
    camD_05: {"src": "assets/enemigos/especiales/barras_river/el_tano/camD_05.webp", "mira": "der", "ref": 695.7, "pie": 793.3, "ancla": 194.1, "origen": "el-tano-caminar-derecha-pierna-derecha-despegue-v4.png"},
    camD_06: {"src": "assets/enemigos/especiales/barras_river/el_tano/camD_06.webp", "mira": "der", "ref": 695.7, "pie": 788.6, "ancla": 124.2, "origen": "el-tano-caminar-derecha-pierna-derecha-paso-v4.png"},
    camI_01: {"src": "assets/enemigos/especiales/barras_river/el_tano/camI_01.webp", "mira": "izq", "ref": 695.7, "pie": 787.6, "ancla": 155.6, "origen": "el-tano-caminar-izquierda-pierna-izquierda-despegue-v4.png"},
    camI_02: {"src": "assets/enemigos/especiales/barras_river/el_tano/camI_02.webp", "mira": "izq", "ref": 695.7, "pie": 800.5, "ancla": 177.0, "origen": "el-tano-caminar-izquierda-pierna-izquierda-paso-v4.png"},
    camI_03: {"src": "assets/enemigos/especiales/barras_river/el_tano/camI_03.webp", "mira": "izq", "ref": 695.7, "pie": 771.4, "ancla": 160.8, "origen": "el-tano-caminar-izquierda-pierna-derecha-despegue-v4.png"},
    camI_04: {"src": "assets/enemigos/especiales/barras_river/el_tano/camI_04.webp", "mira": "izq", "ref": 695.7, "pie": 775.7, "ancla": 145.1, "origen": "el-tano-caminar-izquierda-pierna-derecha-paso-v4.png"},
    bloqueo_a: {"src": "assets/enemigos/especiales/barras_river/el_tano/bloqueo_a.webp", "mira": "der", "ref": 695.7, "pie": 528.3, "ancla": 158.9, "origen": "el-tano-bloqueo-derecha-v2.png"},
    bloqueo_b: {"src": "assets/enemigos/especiales/barras_river/el_tano/bloqueo_b.webp", "mira": "der", "ref": 695.7, "pie": 537.6, "ancla": 159.9, "origen": "el-tano-bloqueo-izquierda-v2.png"}
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ["camD_01", "camD_02", "camD_03", "camD_04", "camD_05", "camD_06"], caminaIzq: ["camI_01", "camI_02", "camI_03", "camI_04"],
    caminaAbajo: ["cam_frente_01", "cam_frente_02", "cam_frente_03", "cam_frente_04", "cam_frente_05", "cam_frente_06"], caminaArriba: ["cam_espalda_01", "cam_espalda_02", "cam_espalda_03", "cam_espalda_04", "cam_espalda_05", "cam_espalda_06"],
    bloqueo: { der: 'bloqueo_a', izq: 'bloqueo_b' },
    dolores: ['recibe_golpe', 'recibe_cuerpo'], desequilibrio: ['tambalear', 'caida'], caida: 'caida',
    suelo: 'derrota', levantarse: 'levantarse', arrodillado: { der: 'levantarse', izq: 'levantarse' }, muerto: 'derrota',
    secuencias: {"lateral": {"der": ["lateral_anticipacion", "lateral_efecto", "lateral_continuacion", "lateral_recuperacion"], "izq": ["lateral_anticipacion", "ext_izq", "ext_izq", "lateral_recuperacion"]}}   // {der, izq}: cada lado con sus cuadros; un cuadro que mira al otro lado se espeja
  },
  pasoMs: { caminaDer: 145, caminaIzq: 145 },   // cuerpo continuo; un cuadro cada 145 ms con el reloj de paso de su velocidad
  zancada: 34, zancadaLado: 38
};
// EL FLACO (caño de plomería) — v232 (PRUEBA JUGABLE). Caminata derecha (6): 01 v2 · pierna izquierda despegue v4 · paso v4 · 04 izquierda
// adelante · pierna derecha despegue v4 · paso v4. Caminata izquierda (4): pierna izquierda despegue v5 · paso v4 · pierna derecha despegue v4
// · paso v4. Bloqueo v2 (los dos miran a la derecha; mirando a la izquierda se espejan). Estocada ext_der / ext_izq (prueba). Escala única.
window.SPRITES_ENEMIGOS.el_flaco = {
  frames: {
    guardia: {"src": "assets/enemigos/especiales/barras_river/el_flaco/guardia.webp", "mira": "der", "ref": 800, "pie": 802.1, "ancla": 70.4, "otroLado": "guardia_izq"},
    guardia_izq: {"src": "assets/enemigos/especiales/barras_river/el_flaco/guardia_izq.webp", "mira": "izq", "ref": 800, "pie": 792.5, "ancla": 196.4},
    cam_frente_01: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_frente_01.webp", "mira": "frente", "ref": 800, "pie": 811.2, "ancla": 121.1},
    cam_frente_02: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_frente_02.webp", "mira": "frente", "ref": 800, "pie": 802.7, "ancla": 124.9},
    cam_frente_03: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_frente_03.webp", "mira": "frente", "ref": 800, "pie": 801.1, "ancla": 122.7},
    cam_frente_04: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_frente_04.webp", "mira": "frente", "ref": 800, "pie": 803.2, "ancla": 128.1},
    cam_frente_05: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_frente_05.webp", "mira": "frente", "ref": 800, "pie": 804.3, "ancla": 126.5},
    cam_frente_06: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_frente_06.webp", "mira": "frente", "ref": 800, "pie": 800.5, "ancla": 127.6},
    cam_espalda_01: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_espalda_01.webp", "mira": "frente", "ref": 800, "pie": 797.3, "ancla": 145.2},
    cam_espalda_02: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_espalda_02.webp", "mira": "frente", "ref": 800, "pie": 792.0, "ancla": 136.1},
    cam_espalda_03: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_espalda_03.webp", "mira": "frente", "ref": 800, "pie": 789.9, "ancla": 118.5},
    cam_espalda_04: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_espalda_04.webp", "mira": "frente", "ref": 800, "pie": 802.1, "ancla": 145.7},
    cam_espalda_05: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_espalda_05.webp", "mira": "frente", "ref": 800, "pie": 792.5, "ancla": 131.8},
    cam_espalda_06: {"src": "assets/enemigos/especiales/barras_river/el_flaco/cam_espalda_06.webp", "mira": "frente", "ref": 800, "pie": 794.7, "ancla": 158.5},
    recibe_golpe: {"src": "assets/enemigos/especiales/barras_river/el_flaco/recibe_golpe.webp", "mira": "der", "ref": 800, "pie": 758.9, "ancla": 217.2},
    recibe_cuerpo: {"src": "assets/enemigos/especiales/barras_river/el_flaco/recibe_cuerpo.webp", "mira": "frente", "ref": 800, "pie": 795.7, "ancla": 132.9},
    tambalear: {"src": "assets/enemigos/especiales/barras_river/el_flaco/tambalear.webp", "mira": "der", "ref": 800, "pie": 780.8, "ancla": 235.4},
    caida: {"src": "assets/enemigos/especiales/barras_river/el_flaco/caida.webp", "mira": "der", "ref": 800, "pie": 541.7, "ancla": 333.6},
    levantarse: {"src": "assets/enemigos/especiales/barras_river/el_flaco/levantarse.webp", "mira": "der", "ref": 800, "pie": 707.7, "ancla": 187.3},
    derrota: {"src": "assets/enemigos/especiales/barras_river/el_flaco/derrota.webp", "mira": "der", "ref": 1055.5, "pie": 307.9, "ancla": 549.2, "acostado": true},
    lateral_anticipacion: {"src": "assets/enemigos/especiales/barras_river/el_flaco/lateral_anticipacion.webp", "mira": "der", "ref": 800, "pie": 810.1, "ancla": 79.7},
    lateral_efecto: {"src": "assets/enemigos/especiales/barras_river/el_flaco/lateral_efecto.webp", "mira": "der", "ref": 800, "pie": 804.3, "ancla": 79.7},
    lateral_continuacion: {"src": "assets/enemigos/especiales/barras_river/el_flaco/lateral_continuacion.webp", "mira": "der", "ref": 800, "pie": 798.9, "ancla": 135.0},
    lateral_recuperacion: {"src": "assets/enemigos/especiales/barras_river/el_flaco/lateral_recuperacion.webp", "mira": "der", "ref": 800, "pie": 798.9, "ancla": 127.5},
    ascendente_anticipacion: {"src": "assets/enemigos/especiales/barras_river/el_flaco/ascendente_anticipacion.webp", "mira": "der", "ref": 800, "pie": 804.8, "ancla": 123.5},
    ascendente_efecto: {"src": "assets/enemigos/especiales/barras_river/el_flaco/ascendente_efecto.webp", "mira": "der", "ref": 800, "pie": 800.5, "ancla": 79.7},
    ascendente_continuacion: {"src": "assets/enemigos/especiales/barras_river/el_flaco/ascendente_continuacion.webp", "mira": "der", "ref": 800, "pie": 814.4, "ancla": 72.8},
    ascendente_recuperacion: {"src": "assets/enemigos/especiales/barras_river/el_flaco/ascendente_recuperacion.webp", "mira": "der", "ref": 800, "pie": 805.3, "ancla": 212.9},
    ext_der: {"src": "assets/enemigos/especiales/barras_river/el_flaco/ext_der.webp", "mira": "der", "ref": 800, "pie": 772.7, "ancla": 313.8, "prueba": true},
    ext_izq: {"src": "assets/enemigos/especiales/barras_river/el_flaco/ext_izq.webp", "mira": "izq", "ref": 800, "pie": 744.6, "ancla": 811.4, "prueba": true},
    camD_01: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camD_01.webp", "mira": "der", "ref": 800, "pie": 774.5, "ancla": 238.2, "origen": "el-flaco-caminar-derecha-01-v2.png"},
    camD_02: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camD_02.webp", "mira": "der", "ref": 800, "pie": 773.3, "ancla": 195.8, "origen": "el-flaco-caminar-derecha-pierna-izquierda-despegue-v4.png"},
    camD_03: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camD_03.webp", "mira": "der", "ref": 800, "pie": 788.3, "ancla": 141.4, "origen": "el-flaco-caminar-derecha-pierna-izquierda-paso-v4.png"},
    camD_04: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camD_04.webp", "mira": "der", "ref": 800, "pie": 782.9, "ancla": 254.6, "origen": "el-flaco-caminar-derecha-04-izquierda-adelante.png"},
    camD_05: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camD_05.webp", "mira": "der", "ref": 800, "pie": 787.7, "ancla": 212.9, "origen": "el-flaco-caminar-derecha-pierna-derecha-despegue-v4.png"},
    camD_06: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camD_06.webp", "mira": "der", "ref": 800, "pie": 788.3, "ancla": 140.3, "origen": "el-flaco-caminar-derecha-pierna-derecha-paso-v4.png"},
    camI_01: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camI_01.webp", "mira": "izq", "ref": 800, "pie": 780.8, "ancla": 140.4, "origen": "el-flaco-caminar-izquierda-pierna-izquierda-despegue-v5.png"},
    camI_02: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camI_02.webp", "mira": "izq", "ref": 800, "pie": 782.9, "ancla": 155.3, "origen": "el-flaco-caminar-izquierda-pierna-izquierda-paso-v4.png"},
    camI_03: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camI_03.webp", "mira": "izq", "ref": 800, "pie": 776.0, "ancla": 212.4, "origen": "el-flaco-caminar-izquierda-pierna-derecha-despegue-v4.png"},
    camI_04: {"src": "assets/enemigos/especiales/barras_river/el_flaco/camI_04.webp", "mira": "izq", "ref": 800, "pie": 768.0, "ancla": 217.7, "origen": "el-flaco-caminar-izquierda-pierna-derecha-paso-v4.png"},
    bloqueo_a: {"src": "assets/enemigos/especiales/barras_river/el_flaco/bloqueo_a.webp", "mira": "der", "ref": 800, "pie": 751.4, "ancla": 218.5, "origen": "el-flaco-bloqueo-derecha-v2.png"},
    bloqueo_b: {"src": "assets/enemigos/especiales/barras_river/el_flaco/bloqueo_b.webp", "mira": "der", "ref": 800, "pie": 726.4, "ancla": 242.8, "origen": "el-flaco-bloqueo-izquierda-v2.png"}
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ["camD_01", "camD_02", "camD_03", "camD_04", "camD_05", "camD_06"], caminaIzq: ["camI_01", "camI_02", "camI_03", "camI_04"],
    caminaAbajo: ["cam_frente_01", "cam_frente_02", "cam_frente_03", "cam_frente_04", "cam_frente_05", "cam_frente_06"], caminaArriba: ["cam_espalda_01", "cam_espalda_02", "cam_espalda_03", "cam_espalda_04", "cam_espalda_05", "cam_espalda_06"],
    bloqueo: { der: 'bloqueo_a', izq: 'bloqueo_b' },
    dolores: ['recibe_golpe', 'recibe_cuerpo'], desequilibrio: ['tambalear', 'caida'], caida: 'caida',
    suelo: 'derrota', levantarse: 'levantarse', arrodillado: { der: 'levantarse', izq: 'levantarse' }, muerto: 'derrota',
    secuencias: {"lateral": ["lateral_anticipacion", "lateral_efecto", "lateral_continuacion", "lateral_recuperacion"], "ascendente": ["ascendente_anticipacion", "ascendente_efecto", "ascendente_continuacion", "ascendente_recuperacion"], "estocada": {"der": ["lateral_anticipacion", "ext_der", "ext_der", "lateral_recuperacion"], "izq": ["lateral_anticipacion", "ext_izq", "ext_izq", "lateral_recuperacion"]}}   // {der, izq}: cada lado con sus cuadros; un cuadro que mira al otro lado se espeja
  },
  pasoMs: { caminaDer: 145, caminaIzq: 145 },   // cuerpo continuo; un cuadro cada 145 ms con el reloj de paso de su velocidad
  zancada: 34, zancadaLado: 38
};
// PATOVA (cadena)
window.SPRITES_ENEMIGOS.patova = {
  frames: {
    guardia: {"src": "assets/enemigos/especiales/barras_river/patova/guardia.webp", "mira": "der", "ref": 800, "pie": 802.1, "ancla": 59.1, "otroLado": "guardia_izq"},
    guardia_izq: {"src": "assets/enemigos/especiales/barras_river/patova/guardia_izq.webp", "mira": "izq", "ref": 800, "pie": 791.0, "ancla": 126.1},
    cam_derecha_01: {"src": "assets/enemigos/especiales/barras_river/patova/cam_derecha_01.webp", "mira": "der", "ref": 800, "pie": 787.8, "ancla": 174.6},
    cam_derecha_02: {"src": "assets/enemigos/especiales/barras_river/patova/cam_derecha_02.webp", "mira": "der", "ref": 800, "pie": 783.0, "ancla": 220.4},
    cam_derecha_03: {"src": "assets/enemigos/especiales/barras_river/patova/cam_derecha_03.webp", "mira": "der", "ref": 800, "pie": 782.4, "ancla": 123.0},
    cam_derecha_04: {"src": "assets/enemigos/especiales/barras_river/patova/cam_derecha_04.webp", "mira": "der", "ref": 800, "pie": 781.9, "ancla": 158.1},
    cam_derecha_05: {"src": "assets/enemigos/especiales/barras_river/patova/cam_derecha_05.webp", "mira": "der", "ref": 800, "pie": 791.5, "ancla": 199.6},
    cam_derecha_06: {"src": "assets/enemigos/especiales/barras_river/patova/cam_derecha_06.webp", "mira": "der", "ref": 800, "pie": 774.5, "ancla": 192.7},
    cam_izquierda_01: {"src": "assets/enemigos/especiales/barras_river/patova/cam_izquierda_01.webp", "mira": "izq", "ref": 800, "pie": 793.6, "ancla": 226.7},
    cam_izquierda_02: {"src": "assets/enemigos/especiales/barras_river/patova/cam_izquierda_02.webp", "mira": "izq", "ref": 800, "pie": 784.0, "ancla": 181.5},
    cam_izquierda_03: {"src": "assets/enemigos/especiales/barras_river/patova/cam_izquierda_03.webp", "mira": "izq", "ref": 800, "pie": 783.5, "ancla": 186.3},
    cam_izquierda_04: {"src": "assets/enemigos/especiales/barras_river/patova/cam_izquierda_04.webp", "mira": "izq", "ref": 800, "pie": 786.7, "ancla": 219.8},
    cam_izquierda_05: {"src": "assets/enemigos/especiales/barras_river/patova/cam_izquierda_05.webp", "mira": "izq", "ref": 800, "pie": 785.6, "ancla": 232.6},
    cam_izquierda_06: {"src": "assets/enemigos/especiales/barras_river/patova/cam_izquierda_06.webp", "mira": "izq", "ref": 800, "pie": 794.1, "ancla": 162.3},
    cam_frente_01: {"src": "assets/enemigos/especiales/barras_river/patova/cam_frente_01.webp", "mira": "frente", "ref": 800, "pie": 809.6, "ancla": 141.1},
    cam_frente_02: {"src": "assets/enemigos/especiales/barras_river/patova/cam_frente_02.webp", "mira": "frente", "ref": 800, "pie": 801.6, "ancla": 144.8},
    cam_frente_03: {"src": "assets/enemigos/especiales/barras_river/patova/cam_frente_03.webp", "mira": "frente", "ref": 800, "pie": 796.8, "ancla": 135.2},
    cam_frente_04: {"src": "assets/enemigos/especiales/barras_river/patova/cam_frente_04.webp", "mira": "frente", "ref": 800, "pie": 798.4, "ancla": 154.4},
    cam_frente_05: {"src": "assets/enemigos/especiales/barras_river/patova/cam_frente_05.webp", "mira": "frente", "ref": 800, "pie": 803.7, "ancla": 156.0},
    cam_frente_06: {"src": "assets/enemigos/especiales/barras_river/patova/cam_frente_06.webp", "mira": "frente", "ref": 800, "pie": 791.0, "ancla": 144.2},
    cam_espalda_01: {"src": "assets/enemigos/especiales/barras_river/patova/cam_espalda_01.webp", "mira": "frente", "ref": 800, "pie": 800.5, "ancla": 152.8},
    cam_espalda_02: {"src": "assets/enemigos/especiales/barras_river/patova/cam_espalda_02.webp", "mira": "frente", "ref": 800, "pie": 792.0, "ancla": 186.3},
    cam_espalda_03: {"src": "assets/enemigos/especiales/barras_river/patova/cam_espalda_03.webp", "mira": "frente", "ref": 800, "pie": 798.9, "ancla": 162.9},
    cam_espalda_04: {"src": "assets/enemigos/especiales/barras_river/patova/cam_espalda_04.webp", "mira": "frente", "ref": 800, "pie": 806.9, "ancla": 178.3},
    cam_espalda_05: {"src": "assets/enemigos/especiales/barras_river/patova/cam_espalda_05.webp", "mira": "frente", "ref": 800, "pie": 790.4, "ancla": 179.4},
    cam_espalda_06: {"src": "assets/enemigos/especiales/barras_river/patova/cam_espalda_06.webp", "mira": "frente", "ref": 800, "pie": 796.3, "ancla": 176.7},
    cubrirse_der: {"src": "assets/enemigos/especiales/barras_river/patova/cubrirse_der.webp", "mira": "der", "ref": 800, "pie": 755.3, "ancla": 168.2},
    cubrirse_izq: {"src": "assets/enemigos/especiales/barras_river/patova/cubrirse_izq.webp", "mira": "izq", "ref": 800, "pie": 740.9, "ancla": 146.9},
    recibe_golpe: {"src": "assets/enemigos/especiales/barras_river/patova/recibe_golpe.webp", "mira": "der", "ref": 800, "pie": 765.9, "ancla": 203.3},
    recibe_cuerpo: {"src": "assets/enemigos/especiales/barras_river/patova/recibe_cuerpo.webp", "mira": "frente", "ref": 800, "pie": 794.1, "ancla": 147.4},
    tambalear: {"src": "assets/enemigos/especiales/barras_river/patova/tambalear.webp", "mira": "der", "ref": 800, "pie": 749.4, "ancla": 264.0},
    caida: {"src": "assets/enemigos/especiales/barras_river/patova/caida.webp", "mira": "der", "ref": 800, "pie": 579.6, "ancla": 275.2},
    levantarse: {"src": "assets/enemigos/especiales/barras_river/patova/levantarse.webp", "mira": "der", "ref": 800, "pie": 720.2, "ancla": 200.7},
    derrota: {"src": "assets/enemigos/especiales/barras_river/patova/derrota.webp", "mira": "der", "ref": 1028.5, "pie": 306.1, "ancla": 530.7, "acostado": true}
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ["cam_derecha_01", "cam_derecha_02", "cam_derecha_03", "cam_derecha_04", "cam_derecha_05", "cam_derecha_06"], caminaIzq: ["cam_izquierda_01", "cam_izquierda_02", "cam_izquierda_03", "cam_izquierda_04", "cam_izquierda_05", "cam_izquierda_06"],
    caminaAbajo: ["cam_frente_01", "cam_frente_02", "cam_frente_03", "cam_frente_04", "cam_frente_05", "cam_frente_06"], caminaArriba: ["cam_espalda_01", "cam_espalda_02", "cam_espalda_03", "cam_espalda_04", "cam_espalda_05", "cam_espalda_06"],
    bloqueo: { der: 'cubrirse_der', izq: 'cubrirse_izq' },
    dolores: ['recibe_golpe', 'recibe_cuerpo'], desequilibrio: ['tambalear', 'caida'], caida: 'caida',
    suelo: 'derrota', levantarse: 'levantarse', arrodillado: { der: 'levantarse', izq: 'levantarse' }, muerto: 'derrota'
  },
  zancada: 34, zancadaLado: 38
};
// VIKINGO (bate de aluminio)
window.SPRITES_ENEMIGOS.vikingo = {
  frames: {
    guardia: {"src": "assets/enemigos/especiales/barras_river/vikingo/guardia.webp", "mira": "der", "ref": 800, "pie": 800.5, "ancla": 93.2, "otroLado": "guardia_izq"},
    guardia_izq: {"src": "assets/enemigos/especiales/barras_river/vikingo/guardia_izq.webp", "mira": "izq", "ref": 800, "pie": 792.6, "ancla": 194.4},
    cam_derecha_01: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_derecha_01.webp", "mira": "der", "ref": 800, "pie": 793.1, "ancla": 209.3},
    cam_derecha_02: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_derecha_02.webp", "mira": "der", "ref": 800, "pie": 790.5, "ancla": 206.1},
    cam_derecha_03: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_derecha_03.webp", "mira": "der", "ref": 800, "pie": 793.1, "ancla": 123.4},
    cam_derecha_04: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_derecha_04.webp", "mira": "der", "ref": 800, "pie": 794.2, "ancla": 182.8},
    cam_derecha_05: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_derecha_05.webp", "mira": "der", "ref": 800, "pie": 785.7, "ancla": 197.6},
    cam_derecha_06: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_derecha_06.webp", "mira": "der", "ref": 800, "pie": 780.4, "ancla": 189.1},
    cam_izquierda_01: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_izquierda_01.webp", "mira": "izq", "ref": 800, "pie": 791.0, "ancla": 253.2},
    cam_izquierda_02: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_izquierda_02.webp", "mira": "izq", "ref": 800, "pie": 787.8, "ancla": 262.8},
    cam_izquierda_03: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_izquierda_03.webp", "mira": "izq", "ref": 800, "pie": 787.3, "ancla": 262.3},
    cam_izquierda_04: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_izquierda_04.webp", "mira": "izq", "ref": 800, "pie": 780.4, "ancla": 229.9},
    cam_izquierda_05: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_izquierda_05.webp", "mira": "izq", "ref": 800, "pie": 787.8, "ancla": 223.0},
    cam_izquierda_06: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_izquierda_06.webp", "mira": "izq", "ref": 800, "pie": 770.9, "ancla": 276.6},
    cam_frente_01: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_frente_01.webp", "mira": "frente", "ref": 800, "pie": 806.4, "ancla": 180.1},
    cam_frente_02: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_frente_02.webp", "mira": "frente", "ref": 800, "pie": 798.9, "ancla": 165.8},
    cam_frente_03: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_frente_03.webp", "mira": "frente", "ref": 800, "pie": 796.3, "ancla": 165.3},
    cam_frente_04: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_frente_04.webp", "mira": "frente", "ref": 800, "pie": 801.6, "ancla": 168.5},
    cam_frente_05: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_frente_05.webp", "mira": "frente", "ref": 800, "pie": 794.2, "ancla": 168.5},
    cam_frente_06: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_frente_06.webp", "mira": "frente", "ref": 800, "pie": 796.8, "ancla": 164.8},
    cam_espalda_01: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_espalda_01.webp", "mira": "frente", "ref": 800, "pie": 795.2, "ancla": 220.4},
    cam_espalda_02: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_espalda_02.webp", "mira": "frente", "ref": 800, "pie": 797.9, "ancla": 231.5},
    cam_espalda_03: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_espalda_03.webp", "mira": "frente", "ref": 800, "pie": 797.9, "ancla": 227.8},
    cam_espalda_04: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_espalda_04.webp", "mira": "frente", "ref": 800, "pie": 796.8, "ancla": 220.9},
    cam_espalda_05: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_espalda_05.webp", "mira": "frente", "ref": 800, "pie": 787.8, "ancla": 223.6},
    cam_espalda_06: {"src": "assets/enemigos/especiales/barras_river/vikingo/cam_espalda_06.webp", "mira": "frente", "ref": 800, "pie": 787.8, "ancla": 221.5},
    cubrirse_der: {"src": "assets/enemigos/especiales/barras_river/vikingo/cubrirse_der.webp", "mira": "der", "ref": 800, "pie": 773.0, "ancla": 175.4},
    cubrirse_izq: {"src": "assets/enemigos/especiales/barras_river/vikingo/cubrirse_izq.webp", "mira": "izq", "ref": 800, "pie": 777.7, "ancla": 197.1},
    recibe_golpe: {"src": "assets/enemigos/especiales/barras_river/vikingo/recibe_golpe.webp", "mira": "der", "ref": 800, "pie": 760.3, "ancla": 239.5},
    recibe_cuerpo: {"src": "assets/enemigos/especiales/barras_river/vikingo/recibe_cuerpo.webp", "mira": "frente", "ref": 800, "pie": 788.3, "ancla": 182.3},
    tambalear: {"src": "assets/enemigos/especiales/barras_river/vikingo/tambalear.webp", "mira": "der", "ref": 800, "pie": 721.1, "ancla": 275.0},
    caida: {"src": "assets/enemigos/especiales/barras_river/vikingo/caida.webp", "mira": "der", "ref": 800, "pie": 619.3, "ancla": 278.1},
    levantarse: {"src": "assets/enemigos/especiales/barras_river/vikingo/levantarse.webp", "mira": "der", "ref": 800, "pie": 654.3, "ancla": 221.5},
    derrota: {"src": "assets/enemigos/especiales/barras_river/vikingo/derrota.webp", "mira": "der", "ref": 1001.1, "pie": 332.7, "ancla": 516.6, "acostado": true},
    lateral_anticipacion: {"src": "assets/enemigos/especiales/barras_river/vikingo/lateral_anticipacion.webp", "mira": "der", "ref": 800, "pie": 796.3, "ancla": 94.8},
    lateral_efecto: {"src": "assets/enemigos/especiales/barras_river/vikingo/lateral_efecto.webp", "mira": "der", "ref": 800, "pie": 794.7, "ancla": 99.1},
    lateral_continuacion: {"src": "assets/enemigos/especiales/barras_river/vikingo/lateral_continuacion.webp", "mira": "der", "ref": 800, "pie": 789.9, "ancla": 155.2},
    lateral_recuperacion: {"src": "assets/enemigos/especiales/barras_river/vikingo/lateral_recuperacion.webp", "mira": "der", "ref": 800, "pie": 798.9, "ancla": 86.9},
    ascendente_anticipacion: {"src": "assets/enemigos/especiales/barras_river/vikingo/ascendente_anticipacion.webp", "mira": "der", "ref": 800, "pie": 788.3, "ancla": 98.0},
    ascendente_efecto: {"src": "assets/enemigos/especiales/barras_river/vikingo/ascendente_efecto.webp", "mira": "der", "ref": 800, "pie": 802.1, "ancla": 144.6},
    ascendente_continuacion: {"src": "assets/enemigos/especiales/barras_river/vikingo/ascendente_continuacion.webp", "mira": "der", "ref": 800, "pie": 797.4, "ancla": 101.2},
    ascendente_recuperacion: {"src": "assets/enemigos/especiales/barras_river/vikingo/ascendente_recuperacion.webp", "mira": "der", "ref": 800, "pie": 802.1, "ancla": 103.8}
  },
  anim: {
    quieto: 'guardia',
    caminaDer: ["cam_derecha_01", "cam_derecha_02", "cam_derecha_03", "cam_derecha_04", "cam_derecha_05", "cam_derecha_06"], caminaIzq: ["cam_izquierda_01", "cam_izquierda_02", "cam_izquierda_03", "cam_izquierda_04", "cam_izquierda_05", "cam_izquierda_06"],
    caminaAbajo: ["cam_frente_01", "cam_frente_02", "cam_frente_03", "cam_frente_04", "cam_frente_05", "cam_frente_06"], caminaArriba: ["cam_espalda_01", "cam_espalda_02", "cam_espalda_03", "cam_espalda_04", "cam_espalda_05", "cam_espalda_06"],
    bloqueo: { der: 'cubrirse_der', izq: 'cubrirse_izq' },
    dolores: ['recibe_golpe', 'recibe_cuerpo'], desequilibrio: ['tambalear', 'caida'], caida: 'caida',
    suelo: 'derrota', levantarse: 'levantarse', arrodillado: { der: 'levantarse', izq: 'levantarse' }, muerto: 'derrota',
    secuencias: {"lateral": ["lateral_anticipacion", "lateral_efecto", "lateral_continuacion", "lateral_recuperacion"], "ascendente": ["ascendente_anticipacion", "ascendente_efecto", "ascendente_continuacion", "ascendente_recuperacion"]}   // ataques con el objeto; el motor elige uno al azar en cada golpe
  },
  zancada: 34, zancadaLado: 38
};
