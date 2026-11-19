/* =====================================================================
   v78 — PISTOLA GAMEZ (35 poses, animaciones_nuevas/pistola_gamez/ENTREGA). Mismo formato que js/sprites_referentes.js.
   · pie = suela (fila opaca más baja) · ancla = centro de la cadera (mediana del short negro; en caída/KO/levantarse/recoger,
     centro de la figura) · grupo = la propia pose, con su altoReferencia: el lienzo del generador no tiene la misma escala en
     todas las poses, así que se igualó el TAMAÑO DE LA CABEZA contra la guardia derecha (02 = 1231 px); caída y KO por superficie.
   · Remera en la mano ANATÓMICA IZQUIERDA: las poses con las dos orientaciones dibujadas (guardias, caminatas, remerazo,
     patada, bloqueo) se usan con su par, sin espejar. Las de una sola orientación (reacciones, caída, KO, levantarse, poder,
     agarre, cartón de vino) se espejan cuando hace falta la otra: eso cambia la mano de la remera → PENDIENTE de arte.
   · alcance.Trompadas = franja del REMERAZO (px a escala 1, delante de la cadera): pega con la tela, no con el sprite entero.
   · Sin barra ni campaña asignada: solo lo usa el modo BATALLA CAMPAL (js/batalla.js).
   ===================================================================== */
window.SPRITES_REFERENTES = window.SPRITES_REFERENTES || {};
/* v93 — CAMINATAS de Pistola corregidas (CORRECCION_CAMINATA_GALLEGO_PISTOLA_v1): por dirección A (la pose 1 de siempre) → paso → B (la
   otra pierna adelante) → paso, con dibujos propios: nada se espeja, la remera queda en su mano anatómica izquierda. paso y B vienen
   en el mismo lienzo y escala que A → mismo grupo (ci1/cd1/cf1/ce1); pie = suela real; ancla = la de A corrida lo que se movió
   la cabeza y el torso (sin saltos laterales). Ciclo por TIEMPO: 140 ms por cuadro (pasoMs). Las poses 2 y 3 viejas quedan sin uso. */
window.SPRITES_REFERENTES.pistola_gamez = {
 "altoReferencia": {
  "g01": 1249,
  "g02": 1231,
  "g03": 1219,
  "g04": 1217,
  "ci1": 1270,
  "ci2": 1342,
  "ci3": 1167,
  "cd1": 1141,
  "cd2": 1358,
  "cd3": 1130,
  "cf1": 1392,
  "cf2": 1452,
  "cf3": 1389,
  "ce1": 1292,
  "ce2": 1317,
  "ce3": 1354,
  "remI": 1184,
  "remD": 1280,
  "patI": 1223,
  "patD": 1224,
  "bloI": 1281,
  "bloD": 1340,
  "dol1": 1275,
  "dol2": 1361,
  "dol3": 1251,
  "caida": 1366,
  "ko": 1355,
  "lev": 1381,
  "pod1": 1245,
  "pod2": 1286,
  "agarre": 1244,
  "v1": 1476,
  "v2": 1326,
  "v3": 1283,
  "v4": 1250
 },
 "frames": {
  "g01": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_01_guardia_izquierda.webp",
   "mira": "izq",
   "grupo": "g01",
   "pie": 1261,
   "ancla": 633.0
  },
  "g02": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_02_guardia_derecha.webp",
   "mira": "der",
   "grupo": "g02",
   "pie": 1249,
   "ancla": 647.0
  },
  "g03": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_03_guardia_frente.webp",
   "mira": "frente",
   "grupo": "g03",
   "pie": 1238,
   "ancla": 582.5
  },
  "g04": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_04_guardia_espalda.webp",
   "mira": "espalda",
   "grupo": "g04",
   "pie": 1232,
   "ancla": 608.0
  },
  "ci1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_05_caminar_izquierda_1.webp",
   "mira": "izq",
   "grupo": "ci1",
   "pie": 1360,
   "ancla": 538.0
  },
  "ci2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_06_caminar_izquierda_2.webp",
   "mira": "izq",
   "grupo": "ci2",
   "pie": 1474,
   "ancla": 485.0
  },
  "ci3": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_07_caminar_izquierda_3.webp",
   "mira": "izq",
   "grupo": "ci3",
   "pie": 1242,
   "ancla": 645.0
  },
  "cd1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_08_caminar_derecha_1.webp",
   "mira": "der",
   "grupo": "cd1",
   "pie": 1223,
   "ancla": 581.0
  },
  "cd2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_09_caminar_derecha_2.webp",
   "mira": "der",
   "grupo": "cd2",
   "pie": 1444,
   "ancla": 496.0
  },
  "cd3": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_10_caminar_derecha_3.webp",
   "mira": "der",
   "grupo": "cd3",
   "pie": 1212,
   "ancla": 638.0
  },
  "cf1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_11_caminar_frente_1.webp",
   "mira": "frente",
   "grupo": "cf1",
   "pie": 1481,
   "ancla": 494.0
  },
  "cf2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_12_caminar_frente_2.webp",
   "mira": "frente",
   "grupo": "cf2",
   "pie": 1595,
   "ancla": 477.0
  },
  "cf3": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_13_caminar_frente_3.webp",
   "mira": "frente",
   "grupo": "cf3",
   "pie": 1485,
   "ancla": 505.0
  },
  "ce1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_14_caminar_espalda_1.webp",
   "mira": "espalda",
   "grupo": "ce1",
   "pie": 1417,
   "ancla": 524.0
  },
  "ce2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_15_caminar_espalda_2.webp",
   "mira": "espalda",
   "grupo": "ce2",
   "pie": 1460,
   "ancla": 534.0
  },
  "ce3": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_16_caminar_espalda_3.webp",
   "mira": "espalda",
   "grupo": "ce3",
   "pie": 1496,
   "ancla": 527.0
  },
  "remI": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_17_remerazo_izquierda.webp",
   "mira": "izq",
   "grupo": "remI",
   "pie": 1188,
   "ancla": 825.0
  },
  "remD": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_18_remerazo_derecha.webp",
   "mira": "der",
   "grupo": "remD",
   "pie": 1240,
   "ancla": 477.0
  },
  "patI": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_19_patada_izquierda.webp",
   "mira": "izq",
   "grupo": "patI",
   "pie": 1254,
   "ancla": 801.0
  },
  "patD": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_20_patada_derecha.webp",
   "mira": "der",
   "grupo": "patD",
   "pie": 1242,
   "ancla": 547.0
  },
  "bloI": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_21_bloqueo_izquierda.webp",
   "mira": "izq",
   "grupo": "bloI",
   "pie": 1256,
   "ancla": 722.0
  },
  "bloD": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_22_bloqueo_derecha.webp",
   "mira": "der",
   "grupo": "bloD",
   "pie": 1248,
   "ancla": 599.0
  },
  "dol1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_23_recibir_golpe_01.webp",
   "mira": "der",
   "grupo": "dol1",
   "pie": 1238,
   "ancla": 635.0
  },
  "dol2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_24_recibir_golpe_02.webp",
   "mira": "izq",
   "grupo": "dol2",
   "pie": 1255,
   "ancla": 674.0
  },
  "dol3": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_25_recibir_golpe_03.webp",
   "mira": "der",
   "grupo": "dol3",
   "pie": 1263,
   "ancla": 586.0
  },
  "caida": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_26_caida.webp",
   "mira": "der",
   "grupo": "caida",
   "pie": 892,
   "ancla": 762.5,
   "sinGiro": true
  },
  "ko": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_27_ko.webp",
   "mira": "der",
   "grupo": "ko",
   "pie": 773,
   "ancla": 892.0,
   "sinGiro": true
  },
  "lev": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_28_levantarse.webp",
   "mira": "izq",
   "grupo": "lev",
   "pie": 1226,
   "ancla": 615.5
  },
  "pod1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_29_poder_preparar.webp",
   "mira": "izq",
   "grupo": "pod1",
   "pie": 1257,
   "ancla": 613.0
  },
  "pod2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_30_poder_remerazo.webp",
   "mira": "izq",
   "grupo": "pod2",
   "pie": 1237,
   "ancla": 671.0
  },
  "agarre": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_31_agarre.webp",
   "mira": "izq",
   "grupo": "agarre",
   "pie": 1210,
   "ancla": 704.0
  },
  "v1": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_32_vino_recoger.webp",
   "mira": "izq",
   "grupo": "v1",
   "pie": 1195,
   "ancla": 669.0
  },
  "v2": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_33_vino_sostener.webp",
   "mira": "izq",
   "grupo": "v2",
   "pie": 1408,
   "ancla": 542.0
  },
  "v3": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_34_vino_beber.webp",
   "mira": "izq",
   "grupo": "v3",
   "pie": 1375,
   "ancla": 556.0
  },
  "v4": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_35_vino_bajar.webp",
   "mira": "izq",
   "grupo": "v4",
   "pie": 1263,
   "ancla": 621.0
  },
  "ciP": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_izquierda_paso.webp",
   "mira": "izq",
   "grupo": "ci1",
   "pie": 1355,
   "ancla": 544.2
  },
  "ciB": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_izquierda_b.webp",
   "mira": "izq",
   "grupo": "ci1",
   "pie": 1359,
   "ancla": 548.0
  },
  "cdP": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_derecha_paso.webp",
   "mira": "der",
   "grupo": "cd1",
   "pie": 1210,
   "ancla": 594.2
  },
  "cdB": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_derecha_b.webp",
   "mira": "der",
   "grupo": "cd1",
   "pie": 1221,
   "ancla": 580.0
  },
  "cfP": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_frente_paso.webp",
   "mira": "frente",
   "grupo": "cf1",
   "pie": 1464,
   "ancla": 500.0
  },
  "cfB": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_frente_b.webp",
   "mira": "frente",
   "grupo": "cf1",
   "pie": 1508,
   "ancla": 493.2
  },
  "ceP": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_espalda_paso.webp",
   "mira": "espalda",
   "grupo": "ce1",
   "pie": 1390,
   "ancla": 538.0
  },
  "ceB": {
   "src": "assets/referentes/pistola_gamez/poses/pistola_gamez_caminar_espalda_b.webp",
   "mira": "espalda",
   "grupo": "ce1",
   "pie": 1424,
   "ancla": 547.0
  }
 },
 "pares": {
  "g02": "g01",
  "cd1": "ci1",
  "cd2": "ci2",
  "cd3": "ci3",
  "remD": "remI",
  "patD": "patI",
  "bloD": "bloI"
 },
 "anim": {
  "bloqueo": [
   "bloD"
  ],
  "quieto": [
   "g02"
  ],
  "quietoFrente": [
   "g03"
  ],
  "quietoEspalda": [
   "g04"
  ],
  "caminaLadoDer": [
   "cd1",
   "cdP",
   "cdB",
   "cdP"
  ],
  "caminaLadoIzq": [
   "ci1",
   "ciP",
   "ciB",
   "ciP"
  ],
  "caminaAbajo": [
   "cf1",
   "cfP",
   "cfB",
   "cfP"
  ],
  "caminaArriba": [
   "ce1",
   "ceP",
   "ceB",
   "ceP"
  ],
  "Trompadas": [
   "remD"
  ],
  "Patadas": [
   "patD"
  ],
  "Codazos": [
   "remD"
  ],
  "Rodillazos": [
   "patD"
  ],
  "Cabezazos": [
   "remD"
  ],
  "Agarres": [
   "agarre"
  ],
  "agarrando": [
   "agarre"
  ],
  "comboPina": [
   "remD"
  ],
  "comboCabezazo": [
   "remD"
  ],
  "dolor": [
   "dol1",
   "dol2",
   "dol3"
  ],
  "koCaida": [
   "caida"
  ],
  "ko": [
   "ko"
  ],
  "levantarse": [
   "lev"
  ],
  "victoria": [
   "g03"
  ],
  "poder": [
   "pod1",
   "pod2"
  ],
  "damajuana": [
   "v1",
   "v2",
   "v3",
   "v4"
  ]
 },
 "tiempos": {
  "dolor": [
   0.1,
   0.2,
   0.15
  ],
  "tomar": 0.7
 },
 "zancada": 44,
 "zancadaLado": 46,
 "fps": {
  "camina": 7
 },
 "alcance": {
  "Trompadas": [
   40,
   195
  ]
 },
 "pasoMs": 140
};
