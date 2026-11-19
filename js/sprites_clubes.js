/* v55 — BARRAS DE SAN LORENZO, RACING E INDEPENDIENTE (generado por integrar55.py: no editar a mano).
   16 poses por barra (personajes/CUERVOS, RACING y DIABLOS_ROJOS/BARRA_N). Todas miran a la derecha; a la izquierda se espejan
   (no tienen números ni letras). ref/ancla/pie medidos contra la guardia de cada uno (misma escala y mismo centro del cuerpo).
   Caminata de 5 cuadros: paso a → intermedio a → paso b → intermedio b → paso c. Reacción al golpe: alterna a/b/c.
   Caída: desequilibrio a → b → suelo; se levanta pasando por la pose sentada.  · v56: + barras de River (personajes/TABLON) como river_NN, mismas reglas.
*/
Object.assign(window.SPRITES_ENEMIGOS = window.SPRITES_ENEMIGOS || {}, {
 "san_lorenzo_01": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1327,
    "ancla": 568.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300,
    "ancla": 569.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 567.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 654.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 519.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 608.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/07_caminata_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 557.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/08_caminata_b.webp",
    "mira": "der",
    "pie": 1337,
    "ref": 1300,
    "ancla": 548.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/09_caminata_c.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 583.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/10_pina.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 537.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/11_patada.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 390.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 599.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300,
    "ancla": 678.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1154,
    "ref": 1300,
    "ancla": 561.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/15_suelo.webp",
    "mira": "der",
    "pie": 731,
    "ref": 1811.4,
    "ancla": 897.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_1/16_defensa.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 579.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_02": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1343,
    "ancla": 535.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1300,
    "ancla": 564.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1300,
    "ancla": 537.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 663.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 503.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1300,
    "ancla": 606.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/07_caminata_a.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 553.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/08_caminata_b.webp",
    "mira": "der",
    "pie": 1252,
    "ref": 1300,
    "ancla": 582.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/09_caminata_c.webp",
    "mira": "der",
    "pie": 1317,
    "ref": 1300,
    "ancla": 555.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/10_pina.webp",
    "mira": "der",
    "pie": 1293,
    "ref": 1300,
    "ancla": 510.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/11_patada.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 421.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 599.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1282,
    "ref": 1300,
    "ancla": 662.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1208,
    "ref": 1300,
    "ancla": 562.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/15_suelo.webp",
    "mira": "der",
    "pie": 751,
    "ref": 1680.2,
    "ancla": 914.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_2/16_defensa.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 570.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_03": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1336,
    "ancla": 553.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 569.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1297,
    "ref": 1300,
    "ancla": 554.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 653.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1300,
    "ancla": 530.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 607.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/07_caminata_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 543.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/08_caminata_b.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 533.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/09_caminata_c.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 575.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/10_pina.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1300,
    "ancla": 517.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/11_patada.webp",
    "mira": "der",
    "pie": 1286,
    "ref": 1300,
    "ancla": 428.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 594.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300,
    "ancla": 700.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1159,
    "ref": 1300,
    "ancla": 559.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/15_suelo.webp",
    "mira": "der",
    "pie": 725,
    "ref": 1768.3,
    "ancla": 899.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_3/16_defensa.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 585.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_04": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1326,
    "ancla": 570.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 549.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1289,
    "ref": 1300,
    "ancla": 558.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300,
    "ancla": 640.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 519.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1300,
    "ancla": 604.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/07_caminata_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 539.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/08_caminata_b.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 526.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/09_caminata_c.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 585.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/10_pina.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 518.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/11_patada.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 379.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 593.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300,
    "ancla": 687.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1102,
    "ref": 1300,
    "ancla": 575.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/15_suelo.webp",
    "mira": "der",
    "pie": 742,
    "ref": 1758.3,
    "ancla": 913.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_4/16_defensa.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 575.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_05": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1332,
    "ancla": 550.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 558.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 577.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 648.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 522.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 599.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/07_caminata_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 543.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/08_caminata_b.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300,
    "ancla": 535.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/09_caminata_c.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 566.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/10_pina.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 537.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/11_patada.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 439.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 587.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1272,
    "ref": 1300,
    "ancla": 683.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1169,
    "ref": 1300,
    "ancla": 561.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/15_suelo.webp",
    "mira": "der",
    "pie": 733,
    "ref": 1745.3,
    "ancla": 920.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_5/16_defensa.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 572.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_06": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1327,
    "ancla": 566.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 567.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 557.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 670.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1300,
    "ancla": 499.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 594.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/07_caminata_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 548.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/08_caminata_b.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 544.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/09_caminata_c.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 562.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/10_pina.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 533.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/11_patada.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 396.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1300,
    "ancla": 604.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 725.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1121,
    "ref": 1300,
    "ancla": 573.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/15_suelo.webp",
    "mira": "der",
    "pie": 729,
    "ref": 1784.2,
    "ancla": 890.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_6/16_defensa.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 592.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_07": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1332,
    "ancla": 562.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 556.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 556.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 654.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300,
    "ancla": 528.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 594.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/07_caminata_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 545.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/08_caminata_b.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 552.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/09_caminata_c.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 575.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/10_pina.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 514.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/11_patada.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 405.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 612.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 706.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1187,
    "ref": 1300,
    "ancla": 560.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/15_suelo.webp",
    "mira": "der",
    "pie": 758,
    "ref": 1766.8,
    "ancla": 897.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_7/16_defensa.webp",
    "mira": "der",
    "pie": 1332,
    "ref": 1300,
    "ancla": 585.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_09": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1357,
    "ancla": 557.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1300,
    "ancla": 580.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 556.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 662.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 524.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 617.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/07_caminata_a.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 568.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/08_caminata_b.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 553.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/09_caminata_c.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 559.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/10_pina.webp",
    "mira": "der",
    "pie": 1297,
    "ref": 1300,
    "ancla": 504.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/11_patada.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 394.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 608.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1317,
    "ref": 1300,
    "ancla": 687.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1149,
    "ref": 1300,
    "ancla": 560.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/15_suelo.webp",
    "mira": "der",
    "pie": 741,
    "ref": 1652.0,
    "ancla": 917.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_9/16_defensa.webp",
    "mira": "der",
    "pie": 1343,
    "ref": 1300,
    "ancla": 580.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "san_lorenzo_10": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1351,
    "ancla": 551.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 572.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300,
    "ancla": 565.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 633.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 522.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1294,
    "ref": 1300,
    "ancla": 594.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/07_caminata_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 553.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/08_caminata_b.webp",
    "mira": "der",
    "pie": 1244,
    "ref": 1300,
    "ancla": 578.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/09_caminata_c.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 576.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/10_pina.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 467.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/11_patada.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 419.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 600.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 637.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1122,
    "ref": 1300,
    "ancla": 586.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/15_suelo.webp",
    "mira": "der",
    "pie": 772,
    "ref": 1762.3,
    "ancla": 894.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/san_lorenzo/barra_10/16_defensa.webp",
    "mira": "der",
    "pie": 1340,
    "ref": 1300,
    "ancla": 561.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_01": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_1/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1330,
    "ancla": 565.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_1/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 568.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_1/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1324,
    "ref": 1300,
    "ancla": 567.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_1/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1331,
    "ref": 1300,
    "ancla": 653.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_1/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 521.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_1/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1324,
    "ref": 1300,
    "ancla": 610.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_1/07_caminata_a.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 557.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_1/08_caminata_b.webp",
    "mira": "der",
    "pie": 1338,
    "ref": 1300,
    "ancla": 548.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_1/09_caminata_c.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 581.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_1/10_pina.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 533.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_1/11_patada.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 386.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_1/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 598.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_1/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1297,
    "ref": 1300,
    "ancla": 677.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_1/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1156,
    "ref": 1300,
    "ancla": 561.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_1/15_suelo.webp",
    "mira": "der",
    "pie": 733,
    "ref": 1808.6,
    "ancla": 896.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_1/16_defensa.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 579.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_02": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_2/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1339,
    "ancla": 542.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_2/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 562.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_2/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 538.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_2/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1333,
    "ref": 1300,
    "ancla": 668.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_2/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 507.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_2/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1329,
    "ref": 1300,
    "ancla": 606.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_2/07_caminata_a.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300,
    "ancla": 555.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_2/08_caminata_b.webp",
    "mira": "der",
    "pie": 1256,
    "ref": 1300,
    "ancla": 584.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_2/09_caminata_c.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 549.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_2/10_pina.webp",
    "mira": "der",
    "pie": 1293,
    "ref": 1300,
    "ancla": 515.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_2/11_patada.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 412.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_2/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1331,
    "ref": 1300,
    "ancla": 604.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_2/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1284,
    "ref": 1300,
    "ancla": 658.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_2/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1235,
    "ref": 1300,
    "ancla": 561.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_2/15_suelo.webp",
    "mira": "der",
    "pie": 765,
    "ref": 1703.2,
    "ancla": 921.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_2/16_defensa.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 572.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_03": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_3/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1332,
    "ancla": 554.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_3/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1300,
    "ancla": 567.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_3/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1300,
    "ancla": 553.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_3/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 660.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_3/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 532.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_3/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 608.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_3/07_caminata_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 544.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_3/08_caminata_b.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 536.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_3/09_caminata_c.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1300,
    "ancla": 576.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_3/10_pina.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1300,
    "ancla": 517.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_3/11_patada.webp",
    "mira": "der",
    "pie": 1286,
    "ref": 1300,
    "ancla": 428.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_3/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 591.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_3/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1294,
    "ref": 1300,
    "ancla": 700.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_3/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1163,
    "ref": 1300,
    "ancla": 559.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_3/15_suelo.webp",
    "mira": "der",
    "pie": 726,
    "ref": 1775.3,
    "ancla": 899.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_3/16_defensa.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 587.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_04": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_4/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1329,
    "ancla": 571.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_4/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 551.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_4/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1290,
    "ref": 1300,
    "ancla": 557.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_4/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 641.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_4/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 523.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_4/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 608.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_4/07_caminata_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 540.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_4/08_caminata_b.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 526.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_4/09_caminata_c.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 589.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_4/10_pina.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1300,
    "ancla": 517.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_4/11_patada.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 382.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_4/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 595.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_4/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1300,
    "ancla": 710.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_4/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1159,
    "ref": 1300,
    "ancla": 583.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_4/15_suelo.webp",
    "mira": "der",
    "pie": 743,
    "ref": 1756.1,
    "ancla": 913.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_4/16_defensa.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 576.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_05": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_5/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1331,
    "ancla": 547.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_5/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 558.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_5/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300,
    "ancla": 577.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_5/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 651.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_5/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 524.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_5/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 604.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_5/07_caminata_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 543.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_5/08_caminata_b.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 536.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_5/09_caminata_c.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 566.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_5/10_pina.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 537.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_5/11_patada.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 434.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_5/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 586.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_5/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1284,
    "ref": 1300,
    "ancla": 699.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_5/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1172,
    "ref": 1300,
    "ancla": 560.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_5/15_suelo.webp",
    "mira": "der",
    "pie": 733,
    "ref": 1746.3,
    "ancla": 920.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_5/16_defensa.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1300,
    "ancla": 571.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_06": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_6/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1327,
    "ancla": 568.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_6/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 573.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_6/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 556.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_6/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 669.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_6/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 503.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_6/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 593.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_6/07_caminata_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 552.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_6/08_caminata_b.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 544.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_6/09_caminata_c.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 560.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_6/10_pina.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300,
    "ancla": 533.5
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_6/11_patada.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 397.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_6/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1300,
    "ancla": 605.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_6/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 730.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_6/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1125,
    "ref": 1300,
    "ancla": 576.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_6/15_suelo.webp",
    "mira": "der",
    "pie": 732,
    "ref": 1795.4,
    "ancla": 897.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_6/16_defensa.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 593.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_07": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_7/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1331,
    "ancla": 566.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_7/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 554.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_7/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1300,
    "ancla": 554.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_7/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 653.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_7/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300,
    "ancla": 533.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_7/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 595.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_7/07_caminata_a.webp",
    "mira": "der",
    "pie": 1317,
    "ref": 1300,
    "ancla": 547.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_7/08_caminata_b.webp",
    "mira": "der",
    "pie": 1324,
    "ref": 1300,
    "ancla": 551.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_7/09_caminata_c.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 578.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_7/10_pina.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 516.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_7/11_patada.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 390.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_7/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 617.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_7/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 704.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_7/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1193,
    "ref": 1300,
    "ancla": 560.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_7/15_suelo.webp",
    "mira": "der",
    "pie": 761,
    "ref": 1789.2,
    "ancla": 897.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_7/16_defensa.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 581.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_09": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_9/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1357,
    "ancla": 560.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_9/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1330,
    "ref": 1300,
    "ancla": 573.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_9/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 556.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_9/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 661.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_9/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1333,
    "ref": 1300,
    "ancla": 527.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_9/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 627.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_9/07_caminata_a.webp",
    "mira": "der",
    "pie": 1324,
    "ref": 1300,
    "ancla": 568.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_9/08_caminata_b.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 553.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_9/09_caminata_c.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 562.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_9/10_pina.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1300,
    "ancla": 502.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_9/11_patada.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1300,
    "ancla": 392.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_9/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 607.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_9/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 685.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_9/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1150,
    "ref": 1300,
    "ancla": 561.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_9/15_suelo.webp",
    "mira": "der",
    "pie": 741,
    "ref": 1652.2,
    "ancla": 918.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_9/16_defensa.webp",
    "mira": "der",
    "pie": 1341,
    "ref": 1300,
    "ancla": 579.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "racing_10": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/racing/barra_10/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1352,
    "ancla": 550.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/racing/barra_10/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 571.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/racing/barra_10/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300,
    "ancla": 573.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/racing/barra_10/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 634.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/racing/barra_10/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 525.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/racing/barra_10/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1299,
    "ref": 1300,
    "ancla": 597.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/racing/barra_10/07_caminata_a.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 546.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/racing/barra_10/08_caminata_b.webp",
    "mira": "der",
    "pie": 1248,
    "ref": 1300,
    "ancla": 580.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/racing/barra_10/09_caminata_c.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 574.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/racing/barra_10/10_pina.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 466.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/racing/barra_10/11_patada.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 420.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/racing/barra_10/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 599.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/racing/barra_10/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 631.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/racing/barra_10/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1126,
    "ref": 1300,
    "ancla": 588.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/racing/barra_10/15_suelo.webp",
    "mira": "der",
    "pie": 750,
    "ref": 1763.0,
    "ancla": 893.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/racing/barra_10/16_defensa.webp",
    "mira": "der",
    "pie": 1340,
    "ref": 1300,
    "ancla": 560.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_01": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_1/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1328,
    "ancla": 567.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_1/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300,
    "ancla": 566.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_1/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 565.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_1/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1331,
    "ref": 1300,
    "ancla": 654.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_1/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 521.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_1/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 609.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_1/07_caminata_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 556.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_1/08_caminata_b.webp",
    "mira": "der",
    "pie": 1338,
    "ref": 1300,
    "ancla": 547.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_1/09_caminata_c.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 582.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_1/10_pina.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 535.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_1/11_patada.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 388.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_1/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 601.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_1/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300,
    "ancla": 675.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_1/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1156,
    "ref": 1300,
    "ancla": 560.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_1/15_suelo.webp",
    "mira": "der",
    "pie": 732,
    "ref": 1813.5,
    "ancla": 897.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_1/16_defensa.webp",
    "mira": "der",
    "pie": 1329,
    "ref": 1300,
    "ancla": 577.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_02": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_2/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1333,
    "ancla": 553.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_2/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 564.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_2/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 539.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_2/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 664.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_2/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 508.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_2/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 602.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_2/07_caminata_a.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300,
    "ancla": 550.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_2/08_caminata_b.webp",
    "mira": "der",
    "pie": 1248,
    "ref": 1300,
    "ancla": 579.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_2/09_caminata_c.webp",
    "mira": "der",
    "pie": 1317,
    "ref": 1300,
    "ancla": 559.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_2/10_pina.webp",
    "mira": "der",
    "pie": 1296,
    "ref": 1300,
    "ancla": 510.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_2/11_patada.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 420.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_2/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1300,
    "ancla": 602.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_2/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1274,
    "ref": 1300,
    "ancla": 658.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_2/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1210,
    "ref": 1300,
    "ancla": 562.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_2/15_suelo.webp",
    "mira": "der",
    "pie": 752,
    "ref": 1699.3,
    "ancla": 915.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_2/16_defensa.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 570.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_03": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_3/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1334,
    "ancla": 551.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_3/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 569.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_3/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1296,
    "ref": 1300,
    "ancla": 553.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_3/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 652.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_3/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 531.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_3/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 606.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_3/07_caminata_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 541.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_3/08_caminata_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 533.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_3/09_caminata_c.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1300,
    "ancla": 576.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_3/10_pina.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 516.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_3/11_patada.webp",
    "mira": "der",
    "pie": 1284,
    "ref": 1300,
    "ancla": 429.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_3/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1300,
    "ancla": 593.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_3/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1292,
    "ref": 1300,
    "ancla": 701.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_3/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1159,
    "ref": 1300,
    "ancla": 560.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_3/15_suelo.webp",
    "mira": "der",
    "pie": 725,
    "ref": 1764.7,
    "ancla": 901.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_3/16_defensa.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 582.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_04": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_4/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1324,
    "ancla": 572.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_4/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 551.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_4/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1288,
    "ref": 1300,
    "ancla": 555.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_4/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1300,
    "ancla": 640.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_4/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 519.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_4/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 606.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_4/07_caminata_a.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 543.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_4/08_caminata_b.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 526.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_4/09_caminata_c.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 580.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_4/10_pina.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 518.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_4/11_patada.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 377.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_4/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 592.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_4/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1294,
    "ref": 1300,
    "ancla": 692.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_4/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1112,
    "ref": 1300,
    "ancla": 581.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_4/15_suelo.webp",
    "mira": "der",
    "pie": 744,
    "ref": 1747.6,
    "ancla": 912.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_4/16_defensa.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 575.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_05": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_5/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1329,
    "ancla": 552.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_5/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 557.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_5/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 577.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_5/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 646.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_5/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 522.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_5/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 603.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_5/07_caminata_a.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 540.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_5/08_caminata_b.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 536.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_5/09_caminata_c.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 565.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_5/10_pina.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 538.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_5/11_patada.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 436.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_5/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300,
    "ancla": 586.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_5/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1273,
    "ref": 1300,
    "ancla": 687.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_5/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1169,
    "ref": 1300,
    "ancla": 562.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_5/15_suelo.webp",
    "mira": "der",
    "pie": 734,
    "ref": 1744.9,
    "ancla": 920.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_5/16_defensa.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 572.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_06": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_6/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1326,
    "ancla": 565.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_6/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 566.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_6/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 553.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_6/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1300,
    "ancla": 669.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_6/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1324,
    "ref": 1300,
    "ancla": 500.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_6/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300,
    "ancla": 594.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_6/07_caminata_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 546.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_6/08_caminata_b.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300,
    "ancla": 543.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_6/09_caminata_c.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300,
    "ancla": 560.5
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_6/10_pina.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1300,
    "ancla": 533.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_6/11_patada.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300,
    "ancla": 397.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_6/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1300,
    "ancla": 602.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_6/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 725.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_6/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1125,
    "ref": 1300,
    "ancla": 576.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_6/15_suelo.webp",
    "mira": "der",
    "pie": 730,
    "ref": 1777.4,
    "ancla": 891.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_6/16_defensa.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 592.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_07": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_7/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1327,
    "ancla": 569.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_7/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 549.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_7/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300,
    "ancla": 553.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_7/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 662.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_7/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1293,
    "ref": 1300,
    "ancla": 530.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_7/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300,
    "ancla": 594.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_7/07_caminata_a.webp",
    "mira": "der",
    "pie": 1317,
    "ref": 1300,
    "ancla": 545.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_7/08_caminata_b.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 550.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_7/09_caminata_c.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 571.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_7/10_pina.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 514.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_7/11_patada.webp",
    "mira": "der",
    "pie": 1401,
    "ref": 1300,
    "ancla": 425.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_7/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 618.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_7/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 710.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_7/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1190,
    "ref": 1300,
    "ancla": 560.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_7/15_suelo.webp",
    "mira": "der",
    "pie": 760,
    "ref": 1772.2,
    "ancla": 897.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_7/16_defensa.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1300,
    "ancla": 584.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_09": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_9/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1357,
    "ancla": 570.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_9/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1300,
    "ancla": 582.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_9/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 556.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_9/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 661.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_9/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1332,
    "ref": 1300,
    "ancla": 528.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_9/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300,
    "ancla": 622.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_9/07_caminata_a.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300,
    "ancla": 566.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_9/08_caminata_b.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 552.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_9/09_caminata_c.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1300,
    "ancla": 562.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_9/10_pina.webp",
    "mira": "der",
    "pie": 1299,
    "ref": 1300,
    "ancla": 503.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_9/11_patada.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300,
    "ancla": 392.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_9/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 605.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_9/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300,
    "ancla": 682.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_9/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1150,
    "ref": 1300,
    "ancla": 562.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_9/15_suelo.webp",
    "mira": "der",
    "pie": 741,
    "ref": 1651.8,
    "ancla": 916.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_9/16_defensa.webp",
    "mira": "der",
    "pie": 1338,
    "ref": 1300,
    "ancla": 580.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "independiente_10": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/independiente/barra_10/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1348,
    "ancla": 550.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/independiente/barra_10/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 568.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/independiente/barra_10/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300,
    "ancla": 566.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/independiente/barra_10/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1316,
    "ref": 1300,
    "ancla": 635.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/independiente/barra_10/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300,
    "ancla": 526.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/independiente/barra_10/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1296,
    "ref": 1300,
    "ancla": 595.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/independiente/barra_10/07_caminata_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300,
    "ancla": 551.0
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/independiente/barra_10/08_caminata_b.webp",
    "mira": "der",
    "pie": 1242,
    "ref": 1300,
    "ancla": 584.0
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/independiente/barra_10/09_caminata_c.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 574.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/independiente/barra_10/10_pina.webp",
    "mira": "der",
    "pie": 1310,
    "ref": 1300,
    "ancla": 482.0
   },
   "patada": {
    "src": "assets/enemigos/clubes/independiente/barra_10/11_patada.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1300,
    "ancla": 416.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/independiente/barra_10/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300,
    "ancla": 598.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/independiente/barra_10/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1300,
    "ancla": 641.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/independiente/barra_10/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1142,
    "ref": 1300,
    "ancla": 594.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/independiente/barra_10/15_suelo.webp",
    "mira": "der",
    "pie": 774,
    "ref": 1767.5,
    "ancla": 895.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/independiente/barra_10/16_defensa.webp",
    "mira": "der",
    "pie": 1337,
    "ref": 1300,
    "ancla": 559.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_01": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_1/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 570.0,
    "pie": 1328
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_1/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 571.0,
    "pie": 1306
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_1/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 566.0,
    "pie": 1323
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_1/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 654.0,
    "pie": 1331
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_1/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 520.0,
    "pie": 1308
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_1/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 609.0,
    "pie": 1323
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_1/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 556.0,
    "pie": 1313
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_1/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 547.0,
    "pie": 1338
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_1/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 578.0,
    "pie": 1304
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_1/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 534.0,
    "pie": 1320
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_1/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 391.0,
    "pie": 1310
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_1/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 598.0,
    "pie": 1318
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_1/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 673.0,
    "pie": 1298
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_1/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 560.0,
    "pie": 1156
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_1/15_suelo.webp",
    "mira": "der",
    "ref": 1813.9,
    "ancla": 897.5,
    "pie": 732,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_1/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 579.0,
    "pie": 1330
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_02": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_2/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 535.0,
    "pie": 1343
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_2/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 564.0,
    "pie": 1326
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_2/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 544.0,
    "pie": 1320
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_2/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 664.0,
    "pie": 1321
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_2/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 508.0,
    "pie": 1328
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_2/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 607.0,
    "pie": 1335
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_2/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 553.0,
    "pie": 1305
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_2/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 582.0,
    "pie": 1251
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_2/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 556.0,
    "pie": 1319
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_2/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 509.0,
    "pie": 1302
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_2/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 421.0,
    "pie": 1316
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_2/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 603.0,
    "pie": 1331
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_2/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 667.0,
    "pie": 1285
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_2/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 562.5,
    "pie": 1208
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_2/15_suelo.webp",
    "mira": "der",
    "ref": 1682.2,
    "ancla": 914.0,
    "pie": 752,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_2/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 568.0,
    "pie": 1318
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_03": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_3/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 554.0,
    "pie": 1336
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_3/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 570.0,
    "pie": 1322
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_3/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 555.0,
    "pie": 1297
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_3/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 652.0,
    "pie": 1312
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_3/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 530.0,
    "pie": 1306
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_3/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 608.0,
    "pie": 1304
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_3/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 543.0,
    "pie": 1302
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_3/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 538.0,
    "pie": 1312
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_3/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 573.0,
    "pie": 1322
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_3/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 516.0,
    "pie": 1300
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_3/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 429.0,
    "pie": 1290
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_3/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 588.0,
    "pie": 1304
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_3/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 697.0,
    "pie": 1286
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_3/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 557.5,
    "pie": 1158
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_3/15_suelo.webp",
    "mira": "der",
    "ref": 1766.1,
    "ancla": 901.0,
    "pie": 729,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_3/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 584.0,
    "pie": 1310
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_04": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_4/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 570.0,
    "pie": 1331
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_4/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 548.0,
    "pie": 1320
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_4/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 559.0,
    "pie": 1295
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_4/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 642.0,
    "pie": 1302
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_4/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 522.0,
    "pie": 1302
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_4/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 608.0,
    "pie": 1302
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_4/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 539.0,
    "pie": 1323
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_4/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 527.0,
    "pie": 1310
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_4/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 588.0,
    "pie": 1321
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_4/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 518.0,
    "pie": 1309
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_4/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 383.0,
    "pie": 1313
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_4/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 595.0,
    "pie": 1323
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_4/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 689.0,
    "pie": 1301
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_4/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 580.5,
    "pie": 1125
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_4/15_suelo.webp",
    "mira": "der",
    "ref": 1756.1,
    "ancla": 913.5,
    "pie": 743,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_4/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 577.0,
    "pie": 1317
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_05": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_5/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 550.0,
    "pie": 1330
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_5/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 557.0,
    "pie": 1310
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_5/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 577.0,
    "pie": 1304
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_5/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 649.0,
    "pie": 1311
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_5/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 522.0,
    "pie": 1312
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_5/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 602.0,
    "pie": 1310
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_5/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 539.0,
    "pie": 1311
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_5/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 538.0,
    "pie": 1301
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_5/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 566.0,
    "pie": 1310
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_5/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 538.0,
    "pie": 1325
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_5/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 440.0,
    "pie": 1319
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_5/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 587.0,
    "pie": 1308
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_5/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 684.0,
    "pie": 1271
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_5/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 561.0,
    "pie": 1170
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_5/15_suelo.webp",
    "mira": "der",
    "ref": 1749.9,
    "ancla": 921.5,
    "pie": 734,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_5/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 572.0,
    "pie": 1324
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_06": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_6/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 568.0,
    "pie": 1340
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_6/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 566.0,
    "pie": 1315
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_6/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 557.0,
    "pie": 1304
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_6/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 668.0,
    "pie": 1321
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_6/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 497.0,
    "pie": 1326
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_6/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 591.0,
    "pie": 1321
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_6/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 548.0,
    "pie": 1323
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_6/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 543.0,
    "pie": 1318
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_6/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 562.0,
    "pie": 1312
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_6/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 534.0,
    "pie": 1302
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_6/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 399.0,
    "pie": 1305
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_6/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 604.0,
    "pie": 1328
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_6/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 726.0,
    "pie": 1315
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_6/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 574.0,
    "pie": 1132
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_6/15_suelo.webp",
    "mira": "der",
    "ref": 1764.9,
    "ancla": 892.5,
    "pie": 730,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_6/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 590.0,
    "pie": 1323
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_07": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_7/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 565.0,
    "pie": 1329
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_7/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 550.0,
    "pie": 1309
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_7/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 555.0,
    "pie": 1305
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_7/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 653.0,
    "pie": 1316
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_7/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 530.0,
    "pie": 1295
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_7/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 587.0,
    "pie": 1317
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_7/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 547.0,
    "pie": 1314
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_7/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 552.0,
    "pie": 1323
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_7/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 574.0,
    "pie": 1308
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_7/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 515.0,
    "pie": 1317
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_7/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 395.0,
    "pie": 1321
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_7/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 609.0,
    "pie": 1313
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_7/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 701.0,
    "pie": 1303
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_7/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 561.0,
    "pie": 1188
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_7/15_suelo.webp",
    "mira": "der",
    "ref": 1776.1,
    "ancla": 903.5,
    "pie": 759,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_7/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 584.0,
    "pie": 1331
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_09": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_9/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 563.0,
    "pie": 1362
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_9/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 578.0,
    "pie": 1329
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_9/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 556.0,
    "pie": 1315
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_9/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 664.0,
    "pie": 1321
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_9/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 531.0,
    "pie": 1331
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_9/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 622.0,
    "pie": 1316
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_9/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 567.0,
    "pie": 1324
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_9/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 554.0,
    "pie": 1320
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_9/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 561.0,
    "pie": 1324
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_9/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 502.0,
    "pie": 1304
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_9/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 390.0,
    "pie": 1302
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_9/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 609.0,
    "pie": 1320
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_9/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 687.0,
    "pie": 1317
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_9/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 560.5,
    "pie": 1148
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_9/15_suelo.webp",
    "mira": "der",
    "ref": 1640.2,
    "ancla": 916.0,
    "pie": 741,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_9/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 581.0,
    "pie": 1355
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 },
 "river_10": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/river/barra_10/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 549.0,
    "pie": 1351
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/river/barra_10/02_caminata_intermedia_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 572.0,
    "pie": 1312
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/river/barra_10/03_caminata_intermedia_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 567.0,
    "pie": 1301
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/river/barra_10/04_golpe_reaccion_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 632.0,
    "pie": 1321
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/river/barra_10/05_golpe_reaccion_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 524.0,
    "pie": 1312
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/river/barra_10/06_golpe_reaccion_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 598.0,
    "pie": 1295
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/river/barra_10/07_caminata_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 551.0,
    "pie": 1310
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/river/barra_10/08_caminata_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 578.0,
    "pie": 1245
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/river/barra_10/09_caminata_c.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 575.0,
    "pie": 1315
   },
   "pina": {
    "src": "assets/enemigos/clubes/river/barra_10/10_pina.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 468.0,
    "pie": 1310
   },
   "patada": {
    "src": "assets/enemigos/clubes/river/barra_10/11_patada.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 420.0,
    "pie": 1304
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/river/barra_10/12_desequilibrio_a.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 599.0,
    "pie": 1323
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/river/barra_10/13_desequilibrio_b.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 637.0,
    "pie": 1301
   },
   "sentado": {
    "src": "assets/enemigos/clubes/river/barra_10/14_caida_sentado.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 587.0,
    "pie": 1123
   },
   "suelo": {
    "src": "assets/enemigos/clubes/river/barra_10/15_suelo.webp",
    "mira": "der",
    "ref": 1766.8,
    "ancla": 895.0,
    "pie": 773,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/river/barra_10/16_defensa.webp",
    "mira": "der",
    "ref": 1300,
    "ancla": 564.0,
    "pie": 1339
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "caminaIzq": [
    "caminata_a",
    "camIntA",
    "caminata_b",
    "camIntB",
    "caminata_c"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 24
 }
});

/* v92 BELGRANO — inicio (generado por t92/npc92.py: no editar a mano). 9 barras (personajes/BELGRANO_9_BARRAS_144_PNG_COMPLETO, BARRA_1…7, 9 y 10;
   no existe el 8). Mismas reglas de medición que los demás clubes. Caminata 07 → 08 → 09 → 08 (4 cuadros, 30 px por cuadro =
   ciclo de 120 px como los otros clubes); 02 → 03 al arrancar cada tramo (js/juego.js). Derrota: 12 → 13 → 14 (sentado) → 15 (suelo). */
Object.assign(window.SPRITES_ENEMIGOS, {
 "belgrano_01": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1334,
    "ancla": 564.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1267.5,
    "ancla": 634.0
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1274.0,
    "ancla": 640.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300.0,
    "ancla": 670.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1301,
    "ref": 1300.0,
    "ancla": 676.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1293,
    "ref": 1300.0,
    "ancla": 619.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/07_caminata_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1267.5,
    "ancla": 635.9
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/08_caminata_b.webp",
    "mira": "der",
    "pie": 1299,
    "ref": 1244.7,
    "ancla": 664.9
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/09_caminata_c.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1189.5,
    "ancla": 623.8
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/10_pina.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1261.0,
    "ancla": 503.9
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/11_patada.webp",
    "mira": "der",
    "pie": 1253,
    "ref": 1300.0,
    "ancla": 341.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1308,
    "ref": 1300.0,
    "ancla": 662.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1229,
    "ref": 1300.0,
    "ancla": 538.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1196,
    "ref": 1300,
    "ancla": 563.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/15_suelo.webp",
    "mira": "der",
    "pie": 774,
    "ref": 1768.5,
    "ancla": 886.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_1/16_defensa.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300.0,
    "ancla": 567.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_02": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1341,
    "ancla": 539.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1321,
    "ref": 1218.7,
    "ancla": 634.2
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1215.5,
    "ancla": 589.1
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1300.0,
    "ancla": 650.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1300.0,
    "ancla": 654.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300.0,
    "ancla": 595.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/07_caminata_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1215.5,
    "ancla": 585.1
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/08_caminata_b.webp",
    "mira": "der",
    "pie": 1343,
    "ref": 1335.7,
    "ancla": 563.1
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/09_caminata_c.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1300.0,
    "ancla": 559.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/10_pina.webp",
    "mira": "der",
    "pie": 1287,
    "ref": 1261.0,
    "ancla": 467.7
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/11_patada.webp",
    "mira": "der",
    "pie": 1287,
    "ref": 1300.0,
    "ancla": 372.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1300.0,
    "ancla": 687.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1171,
    "ref": 1300.0,
    "ancla": 495.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/14_caida_sentado.webp",
    "mira": "der",
    "pie": 986,
    "ref": 1520.0,
    "ancla": 767.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/15_suelo.webp",
    "mira": "der",
    "pie": 731,
    "ref": 1696.9,
    "ancla": 903.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_2/16_defensa.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1300.0,
    "ancla": 547.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_03": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1330,
    "ancla": 561.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1277.2,
    "ancla": 624.7
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1291,
    "ref": 1280.5,
    "ancla": 601.9
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1290,
    "ref": 1300.0,
    "ancla": 636.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1295,
    "ref": 1300.0,
    "ancla": 656.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300.0,
    "ancla": 622.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/07_caminata_a.webp",
    "mira": "der",
    "pie": 1291,
    "ref": 1257.8,
    "ancla": 619.6
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/08_caminata_b.webp",
    "mira": "der",
    "pie": 1294,
    "ref": 1283.8,
    "ancla": 591.1
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/09_caminata_c.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1306.5,
    "ancla": 573.4
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/10_pina.webp",
    "mira": "der",
    "pie": 1289,
    "ref": 1244.7,
    "ancla": 500.9
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/11_patada.webp",
    "mira": "der",
    "pie": 1279,
    "ref": 1300.0,
    "ancla": 344.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1297,
    "ref": 1300.0,
    "ancla": 694.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1216,
    "ref": 1300.0,
    "ancla": 563.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1207,
    "ref": 1300,
    "ancla": 562.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/15_suelo.webp",
    "mira": "der",
    "pie": 816,
    "ref": 1728.8,
    "ancla": 897.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_3/16_defensa.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1329.2,
    "ancla": 597.6
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_04": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1337,
    "ancla": 570.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1261.0,
    "ancla": 625.5
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1283.7,
    "ancla": 596.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300.0,
    "ancla": 663.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1300.0,
    "ancla": 660.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1298,
    "ref": 1300.0,
    "ancla": 598.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/07_caminata_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1306.5,
    "ancla": 586.4
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/08_caminata_b.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1205.7,
    "ancla": 601.1
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/09_caminata_c.webp",
    "mira": "der",
    "pie": 1289,
    "ref": 1267.5,
    "ancla": 597.9
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/10_pina.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1251.2,
    "ancla": 515.9
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/11_patada.webp",
    "mira": "der",
    "pie": 1263,
    "ref": 1300.0,
    "ancla": 355.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1304,
    "ref": 1300.0,
    "ancla": 656.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1109,
    "ref": 1300.0,
    "ancla": 518.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1119,
    "ref": 1300,
    "ancla": 559.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/15_suelo.webp",
    "mira": "der",
    "pie": 769,
    "ref": 1722.9,
    "ancla": 891.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_4/16_defensa.webp",
    "mira": "der",
    "pie": 1324,
    "ref": 1244.7,
    "ancla": 581.5
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_05": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1334,
    "ancla": 549.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1205.7,
    "ancla": 662.2
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1267.5,
    "ancla": 622.3
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1309,
    "ref": 1300.0,
    "ancla": 636.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300.0,
    "ancla": 699.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1300.0,
    "ancla": 587.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/07_caminata_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1267.5,
    "ancla": 618.3
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/08_caminata_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1296.7,
    "ancla": 604.8
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/09_caminata_c.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1205.7,
    "ancla": 576.2
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/10_pina.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1283.8,
    "ancla": 502.2
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/11_patada.webp",
    "mira": "der",
    "pie": 1275,
    "ref": 1300.0,
    "ancla": 333.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1266,
    "ref": 1150.5,
    "ancla": 412.4
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1137,
    "ref": 1300.0,
    "ancla": 409.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1176,
    "ref": 1300,
    "ancla": 565.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/15_suelo.webp",
    "mira": "der",
    "pie": 790,
    "ref": 1716.5,
    "ancla": 899.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_5/16_defensa.webp",
    "mira": "der",
    "pie": 1338,
    "ref": 1322.8,
    "ancla": 618.2
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_06": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1330,
    "ancla": 567.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1319.5,
    "ancla": 626.4
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1277.2,
    "ancla": 628.5
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1212.2,
    "ancla": 401.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1300.0,
    "ancla": 675.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1391.0,
    "ancla": 634.1
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/07_caminata_a.webp",
    "mira": "der",
    "pie": 1326,
    "ref": 1313.0,
    "ancla": 586.3
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/08_caminata_b.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1306.5,
    "ancla": 610.1
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/09_caminata_c.webp",
    "mira": "der",
    "pie": 1313,
    "ref": 1296.7,
    "ancla": 604.9
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/10_pina.webp",
    "mira": "der",
    "pie": 1311,
    "ref": 1348.8,
    "ancla": 496.1
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/11_patada.webp",
    "mira": "der",
    "pie": 1307,
    "ref": 1300.0,
    "ancla": 333.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1293,
    "ref": 1300.0,
    "ancla": 664.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1260,
    "ref": 1300.0,
    "ancla": 582.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1220,
    "ref": 1300,
    "ancla": 561.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/15_suelo.webp",
    "mira": "der",
    "pie": 730,
    "ref": 1775.8,
    "ancla": 884.5,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_6/16_defensa.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1446.2,
    "ancla": 614.4
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_07": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1336,
    "ancla": 566.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1293.5,
    "ancla": 617.6
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1235.0,
    "ancla": 656.0
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1300.0,
    "ancla": 672.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1302,
    "ref": 1300.0,
    "ancla": 662.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1323,
    "ref": 1300.0,
    "ancla": 600.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/07_caminata_a.webp",
    "mira": "der",
    "pie": 1315,
    "ref": 1248.0,
    "ancla": 580.8
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/08_caminata_b.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1257.8,
    "ancla": 600.4
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/09_caminata_c.webp",
    "mira": "der",
    "pie": 1319,
    "ref": 1280.5,
    "ancla": 602.8
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/10_pina.webp",
    "mira": "der",
    "pie": 1303,
    "ref": 1287.0,
    "ancla": 481.2
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/11_patada.webp",
    "mira": "der",
    "pie": 1266,
    "ref": 1300.0,
    "ancla": 367.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300.0,
    "ancla": 686.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1172,
    "ref": 1300.0,
    "ancla": 518.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1195,
    "ref": 1300,
    "ancla": 562.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/15_suelo.webp",
    "mira": "der",
    "pie": 728,
    "ref": 1721.8,
    "ancla": 892.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_7/16_defensa.webp",
    "mira": "der",
    "pie": 1338,
    "ref": 1300.0,
    "ancla": 574.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_09": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1357,
    "ancla": 559.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1320,
    "ref": 1251.2,
    "ancla": 614.1
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1318,
    "ref": 1257.8,
    "ancla": 608.5
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1333,
    "ref": 1300.0,
    "ancla": 667.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1332,
    "ref": 1300.0,
    "ancla": 665.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1325,
    "ref": 1300.0,
    "ancla": 635.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/07_caminata_a.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1244.7,
    "ancla": 613.7
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/08_caminata_b.webp",
    "mira": "der",
    "pie": 1314,
    "ref": 1274.0,
    "ancla": 624.4
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/09_caminata_c.webp",
    "mira": "der",
    "pie": 1312,
    "ref": 1209.0,
    "ancla": 644.5
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/10_pina.webp",
    "mira": "der",
    "pie": 1322,
    "ref": 1228.5,
    "ancla": 471.7
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/11_patada.webp",
    "mira": "der",
    "pie": 1305,
    "ref": 1300.0,
    "ancla": 365.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1299,
    "ref": 1300.0,
    "ancla": 660.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 1136,
    "ref": 1300.0,
    "ancla": 464.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1176,
    "ref": 1300,
    "ancla": 562.0
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/15_suelo.webp",
    "mira": "der",
    "pie": 771,
    "ref": 1617.9,
    "ancla": 890.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_9/16_defensa.webp",
    "mira": "der",
    "pie": 1336,
    "ref": 1179.7,
    "ancla": 653.8
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 },
 "belgrano_10": {
  "frames": {
   "guardia": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/01_guardia.webp",
    "mira": "der",
    "ref": 1300,
    "pie": 1355,
    "ancla": 549.0
   },
   "camIntA": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/02_caminata_intermedia_a.webp",
    "mira": "der",
    "pie": 1331,
    "ref": 1251.2,
    "ancla": 622.7
   },
   "camIntB": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/03_caminata_intermedia_b.webp",
    "mira": "der",
    "pie": 1327,
    "ref": 1293.5,
    "ancla": 606.6
   },
   "reaccion_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/04_golpe_reaccion_a.webp",
    "mira": "der",
    "pie": 1332,
    "ref": 1300.0,
    "ancla": 646.0
   },
   "reaccion_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/05_golpe_reaccion_b.webp",
    "mira": "der",
    "pie": 1341,
    "ref": 1300.0,
    "ancla": 570.0
   },
   "reaccion_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/06_golpe_reaccion_c.webp",
    "mira": "der",
    "pie": 1337,
    "ref": 1300.0,
    "ancla": 611.0
   },
   "caminata_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/07_caminata_a.webp",
    "mira": "der",
    "pie": 1337,
    "ref": 1303.2,
    "ancla": 600.2
   },
   "caminata_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/08_caminata_b.webp",
    "mira": "der",
    "pie": 1328,
    "ref": 1251.2,
    "ancla": 622.7
   },
   "caminata_c": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/09_caminata_c.webp",
    "mira": "der",
    "pie": 1329,
    "ref": 1254.5,
    "ancla": 622.0
   },
   "pina": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/10_pina.webp",
    "mira": "der",
    "pie": 1300,
    "ref": 1280.5,
    "ancla": 483.7
   },
   "patada": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/11_patada.webp",
    "mira": "der",
    "pie": 1283,
    "ref": 1300.0,
    "ancla": 421.0
   },
   "deseq_a": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/12_desequilibrio_a.webp",
    "mira": "der",
    "pie": 1306,
    "ref": 1300.0,
    "ancla": 595.0
   },
   "deseq_b": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/13_desequilibrio_b.webp",
    "mira": "der",
    "pie": 994,
    "ref": 1274.0,
    "ancla": 573.0
   },
   "sentado": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/14_caida_sentado.webp",
    "mira": "der",
    "pie": 1233,
    "ref": 1300,
    "ancla": 568.5
   },
   "suelo": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/15_suelo.webp",
    "mira": "der",
    "pie": 783,
    "ref": 1681.9,
    "ancla": 890.0,
    "acostado": true
   },
   "defensa": {
    "src": "assets/enemigos/clubes/belgrano/barra_10/16_defensa.webp",
    "mira": "der",
    "pie": 1339,
    "ref": 1300.0,
    "ancla": 560.0
   }
  },
  "anim": {
   "quieto": "guardia",
   "caminaDer": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaIzq": [
    "caminata_a",
    "caminata_b",
    "caminata_c",
    "caminata_b"
   ],
   "caminaEntrada": [
    "camIntA",
    "camIntB"
   ],
   "pina": "pina",
   "patada": "patada",
   "dolor": "reaccion_a",
   "dolores": [
    "reaccion_a",
    "reaccion_b",
    "reaccion_c"
   ],
   "desequilibrio": [
    "deseq_a",
    "deseq_b",
    "sentado"
   ],
   "caida": "sentado",
   "suelo": "suelo",
   "muerto": "suelo",
   "bloqueo": {
    "der": "defensa",
    "izq": "defensa"
   }
  },
  "zancada": 40,
  "zancadaLado": 30
 }
});
/* v92 BELGRANO — fin */

/* v95 TALLERES Y CENTRAL — inicio (generado por t95/py/npc95.py: no editar a mano).
   TALLERES «Fiel 1…8 y 10» (personajes/TALLERES/BARRAS_v1, 23 poses) y ROSARIO CENTRAL «Guerrero 1…8 y 10» (personajes/CENTRAL/GUERREROS_v1,
   28 poses). No existe el 9. IDs internos talleres_NN / central_NN (carpetas barra_N). Caminatas con dibujo propio en las 4 direcciones:
   derecha 02 → 03 → 04 → 03, izquierda 05 → 06 → 07 → 06, frente 08 → 09 → 10 → 09, espalda 11 → 12 → 13 → 12, 180 ms por cuadro (reloj propio).
   Reacciones 14/15/16, piña 17, patada 18, bloqueo 23; derrota 19 → 20 → 22 (suelo, largo = alto de pie); se levantan por 21 (Fiel) o 28 (Guerreros).
   Las poses 24–27 de los Guerreros (cartón de vino) quedan registradas: los barras comunes no se recuperan en el juego. */
Object.assign(window.SPRITES_ENEMIGOS, {"talleres_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_1/01_guardia.webp", "mira": "der", "pie": 1330, "ref": 1300, "ancla": 564.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1330, "ref": 1300, "ancla": 643.3}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1330, "ref": 1300, "ancla": 561.1}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1330, "ref": 1300, "ancla": 652.2}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1330, "ref": 1300, "ancla": 530.4}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1330, "ref": 1300, "ancla": 613.9}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1330, "ref": 1300, "ancla": 522.0}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1330, "ref": 1300, "ancla": 592.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1330, "ref": 1300, "ancla": 599.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1330, "ref": 1300, "ancla": 582.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1330, "ref": 1300, "ancla": 602.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1330, "ref": 1300, "ancla": 577.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1330, "ref": 1300, "ancla": 572.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1332, "ref": 1300, "ancla": 651.0}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1317, "ref": 1300.0, "ancla": 613.0}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1319, "ref": 1300, "ancla": 620.0}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_1/17_pina.webp", "mira": "der", "pie": 1337, "ref": 1306.5, "ancla": 552.2}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_1/18_patada.webp", "mira": "der", "pie": 997, "ref": 1092.0, "ancla": 436.8}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 949, "ref": 1072.5, "ancla": 425.7}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_1/20_caida.webp", "mira": "der", "pie": 945, "ref": 1072.5, "ancla": 799.0}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_1/21_sentado.webp", "mira": "der", "pie": 835, "ref": 1495.0, "ancla": 885.5}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_1/22_suelo.webp", "mira": "der", "pie": 690, "ref": 2021.6, "ancla": 1032.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_1/23_bloqueo.webp", "mira": "der", "pie": 980, "ref": 1033.5, "ancla": 812.4}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_2/01_guardia.webp", "mira": "der", "pie": 1332, "ref": 1300, "ancla": 546.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1332, "ref": 1300, "ancla": 601.7}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1332, "ref": 1300, "ancla": 484.2}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1332, "ref": 1300, "ancla": 573.5}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1332, "ref": 1300, "ancla": 520.2}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1332, "ref": 1300, "ancla": 637.2}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1332, "ref": 1300, "ancla": 548.3}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1332, "ref": 1300, "ancla": 548.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1332, "ref": 1300, "ancla": 555.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1332, "ref": 1300, "ancla": 574.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1332, "ref": 1300, "ancla": 587.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1332, "ref": 1300, "ancla": 545.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1332, "ref": 1300, "ancla": 536.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1329, "ref": 1289.6, "ancla": 607.0}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1338, "ref": 1300, "ancla": 555.0}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1329, "ref": 1300.0, "ancla": 598.0}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_2/17_pina.webp", "mira": "der", "pie": 1316, "ref": 1306.5, "ancla": 441.1}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_2/18_patada.webp", "mira": "der", "pie": 1042, "ref": 1092.0, "ancla": 336.7}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 956, "ref": 1092.0, "ancla": 687.0}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_2/20_caida.webp", "mira": "der", "pie": 921, "ref": 1215.5, "ancla": 777.5}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_2/21_sentado.webp", "mira": "der", "pie": 909, "ref": 1430.0, "ancla": 805.5}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_2/22_suelo.webp", "mira": "der", "pie": 665, "ref": 1923.5, "ancla": 998.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_2/23_bloqueo.webp", "mira": "der", "pie": 990, "ref": 1066.0, "ancla": 801.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_3/01_guardia.webp", "mira": "der", "pie": 1331, "ref": 1300, "ancla": 553.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1331, "ref": 1300, "ancla": 565.2}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1331, "ref": 1300, "ancla": 489.7}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1331, "ref": 1300, "ancla": 584.3}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1331, "ref": 1300, "ancla": 563.2}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1331, "ref": 1300, "ancla": 637.9}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1331, "ref": 1300, "ancla": 543.2}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1331, "ref": 1300, "ancla": 565.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1331, "ref": 1300, "ancla": 573.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1331, "ref": 1300, "ancla": 562.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1331, "ref": 1300, "ancla": 579.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1331, "ref": 1300, "ancla": 544.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1331, "ref": 1300, "ancla": 549.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1306, "ref": 1269.4, "ancla": 381.5}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1327, "ref": 1488.5, "ancla": 739.6}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1322, "ref": 1303.2, "ancla": 296.4}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_3/17_pina.webp", "mira": "der", "pie": 1306, "ref": 1300.0, "ancla": 484.8}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_3/18_patada.webp", "mira": "der", "pie": 1026, "ref": 1059.5, "ancla": 402.0}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 965, "ref": 1014.0, "ancla": 390.1}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_3/20_caida.webp", "mira": "der", "pie": 931, "ref": 1053.0, "ancla": 784.5}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_3/21_sentado.webp", "mira": "der", "pie": 895, "ref": 1469.0, "ancla": 809.0}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_3/22_suelo.webp", "mira": "der", "pie": 673, "ref": 1963.7, "ancla": 1000.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_3/23_bloqueo.webp", "mira": "der", "pie": 978, "ref": 1124.5, "ancla": 773.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_4/01_guardia.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 567.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 566.2}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 485.5}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 602.3}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 563.9}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 644.6}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 530.1}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 565.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 567.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 566.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 581.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 545.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 550.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1323, "ref": 1283.8, "ancla": 620.0}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1309, "ref": 1283.8, "ancla": 580.0}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1312, "ref": 1283.8, "ancla": 634.0}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_4/17_pina.webp", "mira": "der", "pie": 1299, "ref": 1267.5, "ancla": 513.7}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_4/18_patada.webp", "mira": "der", "pie": 1354, "ref": 1235.0, "ancla": 220.8}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1331, "ref": 1280.5, "ancla": 361.0}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_4/20_caida.webp", "mira": "der", "pie": 955, "ref": 1384.5, "ancla": 784.5}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_4/21_sentado.webp", "mira": "der", "pie": 909, "ref": 1365.0, "ancla": 767.0}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_4/22_suelo.webp", "mira": "der", "pie": 670, "ref": 1996.8, "ancla": 1000.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_4/23_bloqueo.webp", "mira": "der", "pie": 995, "ref": 1105.0, "ancla": 780.4}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_5/01_guardia.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 589.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 632.5}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 610.2}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 648.0}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1327, "ref": 1300, "ancla": 519.0}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1327, "ref": 1300, "ancla": 539.4}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1327, "ref": 1300, "ancla": 501.6}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1327, "ref": 1300, "ancla": 594.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1327, "ref": 1300, "ancla": 576.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1327, "ref": 1300, "ancla": 556.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1327, "ref": 1300, "ancla": 612.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1327, "ref": 1300, "ancla": 552.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1327, "ref": 1300, "ancla": 538.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1321, "ref": 1300, "ancla": 668.0}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1313, "ref": 1300.0, "ancla": 586.0}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1333, "ref": 1300, "ancla": 642.0}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_5/17_pina.webp", "mira": "der", "pie": 1331, "ref": 1235.0, "ancla": 536.9}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_5/18_patada.webp", "mira": "der", "pie": 1322, "ref": 1241.5, "ancla": 393.0}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 971, "ref": 1163.5, "ancla": 626.0}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_5/20_caida.webp", "mira": "der", "pie": 891, "ref": 1300, "ancla": 808.0}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_5/21_sentado.webp", "mira": "der", "pie": 922, "ref": 1358.5, "ancla": 763.5}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_5/22_suelo.webp", "mira": "der", "pie": 756, "ref": 1785.8, "ancla": 893.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_5/23_bloqueo.webp", "mira": "der", "pie": 986, "ref": 1105.0, "ancla": 781.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_6/01_guardia.webp", "mira": "der", "pie": 1326, "ref": 1300, "ancla": 570.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1326, "ref": 1300, "ancla": 607.4}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1326, "ref": 1300, "ancla": 598.6}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1326, "ref": 1300, "ancla": 573.3}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1326, "ref": 1300, "ancla": 557.4}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1326, "ref": 1300, "ancla": 563.8}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1326, "ref": 1300, "ancla": 588.1}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1326, "ref": 1300, "ancla": 587.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1326, "ref": 1300, "ancla": 570.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1326, "ref": 1300, "ancla": 575.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1326, "ref": 1300, "ancla": 593.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1326, "ref": 1300, "ancla": 565.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1326, "ref": 1300, "ancla": 569.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1334, "ref": 1254.5, "ancla": 355.5}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1330, "ref": 1452.2, "ancla": 570.4}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1325, "ref": 1163.5, "ancla": 382.5}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_6/17_pina.webp", "mira": "der", "pie": 1319, "ref": 1326.0, "ancla": 480.0}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_6/18_patada.webp", "mira": "der", "pie": 1338, "ref": 1209.0, "ancla": 251.2}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1289, "ref": 1137.5, "ancla": 329.0}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_6/20_caida.webp", "mira": "der", "pie": 963, "ref": 1326.0, "ancla": 768.5}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_6/21_sentado.webp", "mira": "der", "pie": 869, "ref": 1430.0, "ancla": 795.0}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_6/22_suelo.webp", "mira": "der", "pie": 651, "ref": 2115.8, "ancla": 1123.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_6/23_bloqueo.webp", "mira": "der", "pie": 987, "ref": 1144.0, "ancla": 787.4}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_7/01_guardia.webp", "mira": "der", "pie": 1341, "ref": 1300, "ancla": 565.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1341, "ref": 1300, "ancla": 604.3}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1341, "ref": 1300, "ancla": 520.8}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1341, "ref": 1300, "ancla": 582.5}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1341, "ref": 1300, "ancla": 551.7}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1341, "ref": 1300, "ancla": 635.8}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1341, "ref": 1300, "ancla": 572.3}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1341, "ref": 1300, "ancla": 573.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1341, "ref": 1300, "ancla": 587.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1341, "ref": 1300, "ancla": 583.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1341, "ref": 1300, "ancla": 603.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1341, "ref": 1300, "ancla": 597.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1341, "ref": 1300, "ancla": 551.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1038, "ref": 1026.8, "ancla": 585.6}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 976, "ref": 1066.0, "ancla": 804.0}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 988, "ref": 1092.0, "ancla": 832.0}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_7/17_pina.webp", "mira": "der", "pie": 1038, "ref": 1118.0, "ancla": 782.1}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_7/18_patada.webp", "mira": "der", "pie": 1042, "ref": 1053.0, "ancla": 452.8}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 969, "ref": 1092.0, "ancla": 394.8}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_7/20_caida.webp", "mira": "der", "pie": 830, "ref": 1313.0, "ancla": 895.0}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_7/21_sentado.webp", "mira": "der", "pie": 953, "ref": 1508.0, "ancla": 835.5}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_7/22_suelo.webp", "mira": "der", "pie": 719, "ref": 2025.6, "ancla": 1026.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_7/23_bloqueo.webp", "mira": "der", "pie": 991, "ref": 1001.2, "ancla": 790.8}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_8/01_guardia.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 566.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 591.3}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 519.3}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 596.1}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1329, "ref": 1300, "ancla": 580.8}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1329, "ref": 1300, "ancla": 654.7}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1329, "ref": 1300, "ancla": 577.7}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1329, "ref": 1300, "ancla": 575.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1329, "ref": 1300, "ancla": 578.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1329, "ref": 1300, "ancla": 598.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1329, "ref": 1300, "ancla": 593.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1329, "ref": 1300, "ancla": 582.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1329, "ref": 1300, "ancla": 580.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1332, "ref": 1293.5, "ancla": 308.8}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1321, "ref": 1462.5, "ancla": 721.6}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1314, "ref": 1303.2, "ancla": 636.0}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_8/17_pina.webp", "mira": "der", "pie": 1316, "ref": 1306.5, "ancla": 472.1}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_8/18_patada.webp", "mira": "der", "pie": 1038, "ref": 1118.0, "ancla": 435.3}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 977, "ref": 1053.0, "ancla": 494.0}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_8/20_caida.webp", "mira": "der", "pie": 975, "ref": 1345.5, "ancla": 773.5}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_8/21_sentado.webp", "mira": "der", "pie": 937, "ref": 1423.5, "ancla": 767.0}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_8/22_suelo.webp", "mira": "der", "pie": 701, "ref": 1770.8, "ancla": 895.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_8/23_bloqueo.webp", "mira": "der", "pie": 978, "ref": 985.3, "ancla": 776.9}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "talleres_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/talleres/barra_10/01_guardia.webp", "mira": "der", "pie": 1348, "ref": 1300, "ancla": 548.0}, "camDA": {"src": "assets/enemigos/clubes/talleres/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1346, "ref": 1300, "ancla": 572.5}, "camDP": {"src": "assets/enemigos/clubes/talleres/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1348, "ref": 1300, "ancla": 530.2}, "camDB": {"src": "assets/enemigos/clubes/talleres/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1348, "ref": 1300, "ancla": 578.4}, "camIA": {"src": "assets/enemigos/clubes/talleres/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1346, "ref": 1300, "ancla": 555.8}, "camIP": {"src": "assets/enemigos/clubes/talleres/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1348, "ref": 1300, "ancla": 595.8}, "camIB": {"src": "assets/enemigos/clubes/talleres/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1348, "ref": 1300, "ancla": 550.4}, "camFA": {"src": "assets/enemigos/clubes/talleres/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1348, "ref": 1300, "ancla": 575.0}, "camFP": {"src": "assets/enemigos/clubes/talleres/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1348, "ref": 1300, "ancla": 582.0}, "camFB": {"src": "assets/enemigos/clubes/talleres/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1348, "ref": 1300, "ancla": 553.0}, "camEA": {"src": "assets/enemigos/clubes/talleres/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1348, "ref": 1300, "ancla": 589.0}, "camEP": {"src": "assets/enemigos/clubes/talleres/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1348, "ref": 1300, "ancla": 569.0}, "camEB": {"src": "assets/enemigos/clubes/talleres/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1348, "ref": 1300, "ancla": 539.0}, "reaccion_a": {"src": "assets/enemigos/clubes/talleres/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1334, "ref": 1299.0, "ancla": 451.0}, "reaccion_b": {"src": "assets/enemigos/clubes/talleres/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 973, "ref": 923.0, "ancla": 770.0}, "reaccion_c": {"src": "assets/enemigos/clubes/talleres/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1025, "ref": 1000.2, "ancla": 540.7}, "pina": {"src": "assets/enemigos/clubes/talleres/barra_10/17_pina.webp", "mira": "der", "pie": 1030, "ref": 1144.0, "ancla": 728.0}, "patada": {"src": "assets/enemigos/clubes/talleres/barra_10/18_patada.webp", "mira": "der", "pie": 1041, "ref": 1131.0, "ancla": 357.6}, "deseq_a": {"src": "assets/enemigos/clubes/talleres/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 961, "ref": 1020.5, "ancla": 451.7}, "deseq_b": {"src": "assets/enemigos/clubes/talleres/barra_10/20_caida.webp", "mira": "der", "pie": 837, "ref": 1118.0, "ancla": 889.5}, "sentado": {"src": "assets/enemigos/clubes/talleres/barra_10/21_sentado.webp", "mira": "der", "pie": 833, "ref": 1222.0, "ancla": 866.0}, "suelo": {"src": "assets/enemigos/clubes/talleres/barra_10/22_suelo.webp", "mira": "der", "pie": 760, "ref": 1983.0, "ancla": 1032.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/talleres/barra_10/23_bloqueo.webp", "mira": "der", "pie": 992, "ref": 1010.1, "ancla": 782.1}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_1/01_guardia.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 555.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 599.1}, "camDP": {"src": "assets/enemigos/clubes/central/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 584.3}, "camDB": {"src": "assets/enemigos/clubes/central/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 619.1}, "camIA": {"src": "assets/enemigos/clubes/central/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1323, "ref": 1300, "ancla": 521.5}, "camIP": {"src": "assets/enemigos/clubes/central/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1323, "ref": 1300, "ancla": 537.1}, "camIB": {"src": "assets/enemigos/clubes/central/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1323, "ref": 1300, "ancla": 501.4}, "camFA": {"src": "assets/enemigos/clubes/central/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1323, "ref": 1300, "ancla": 558.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1323, "ref": 1300, "ancla": 579.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1323, "ref": 1300, "ancla": 563.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1323, "ref": 1300, "ancla": 565.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1323, "ref": 1300, "ancla": 543.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1323, "ref": 1300, "ancla": 556.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1327, "ref": 1277.2, "ancla": 631.0}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1321, "ref": 1277.2, "ancla": 574.0}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1319, "ref": 1277.2, "ancla": 609.0}, "pina": {"src": "assets/enemigos/clubes/central/barra_1/17_pina.webp", "mira": "der", "pie": 1315, "ref": 1404.0, "ancla": 495.4}, "patada": {"src": "assets/enemigos/clubes/central/barra_1/18_patada.webp", "mira": "der", "pie": 1169, "ref": 1222.0, "ancla": 323.6}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 1326, "ref": 1254.5, "ancla": 316.2}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_1/20_caida.webp", "mira": "der", "pie": 1305, "ref": 1277.2, "ancla": 573.0}, "sentado": {"src": "assets/enemigos/clubes/central/barra_1/21_sentado.webp", "mira": "der", "pie": 1064, "ref": 1579.5, "ancla": 697.0}, "suelo": {"src": "assets/enemigos/clubes/central/barra_1/22_suelo.webp", "mira": "der", "pie": 708, "ref": 1995.7, "ancla": 962.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_1/23_bloqueo.webp", "mira": "der", "pie": 1340, "ref": 1436.5, "ancla": 581.3}, "carton1": {"src": "assets/enemigos/clubes/central/barra_1/24_carton_preparar.webp", "mira": "der", "pie": 1323, "ref": 1228.5, "ancla": 560.5}, "carton2": {"src": "assets/enemigos/clubes/central/barra_1/25_carton_subir.webp", "mira": "der", "pie": 1323, "ref": 1189.5, "ancla": 524.3}, "carton3": {"src": "assets/enemigos/clubes/central/barra_1/26_carton_beber.webp", "mira": "der", "pie": 1323, "ref": 1277.2, "ancla": 577.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_1/27_carton_bajar.webp", "mira": "der", "pie": 1323, "ref": 1215.5, "ancla": 529.5}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_1/28_levantarse.webp", "mira": "der", "pie": 1274, "ref": 1735.5, "ancla": 578.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_2/01_guardia.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 547.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 565.9}, "camDP": {"src": "assets/enemigos/clubes/central/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 514.3}, "camDB": {"src": "assets/enemigos/clubes/central/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 573.0}, "camIA": {"src": "assets/enemigos/clubes/central/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1334, "ref": 1300, "ancla": 556.3}, "camIP": {"src": "assets/enemigos/clubes/central/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1334, "ref": 1300, "ancla": 609.7}, "camIB": {"src": "assets/enemigos/clubes/central/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1334, "ref": 1300, "ancla": 550.5}, "camFA": {"src": "assets/enemigos/clubes/central/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1334, "ref": 1300, "ancla": 546.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1334, "ref": 1300, "ancla": 581.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1334, "ref": 1300, "ancla": 577.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1334, "ref": 1300, "ancla": 580.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1334, "ref": 1300, "ancla": 565.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1334, "ref": 1300, "ancla": 543.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1320, "ref": 1270.9, "ancla": 622.0}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1307, "ref": 1215.5, "ancla": 583.0}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1285, "ref": 1131.0, "ancla": 616.0}, "pina": {"src": "assets/enemigos/clubes/central/barra_2/17_pina.webp", "mira": "der", "pie": 1324, "ref": 1287.0, "ancla": 481.4}, "patada": {"src": "assets/enemigos/clubes/central/barra_2/18_patada.webp", "mira": "der", "pie": 1144, "ref": 1170.0, "ancla": 262.3}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 1321, "ref": 1202.5, "ancla": 641.0}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_2/20_caida.webp", "mira": "der", "pie": 1337, "ref": 1313.0, "ancla": 613.5}, "sentado": {"src": "assets/enemigos/clubes/central/barra_2/21_sentado.webp", "mira": "der", "pie": 1057, "ref": 1417.0, "ancla": 700.0}, "suelo": {"src": "assets/enemigos/clubes/central/barra_2/22_suelo.webp", "mira": "der", "pie": 741, "ref": 1864.9, "ancla": 972.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_2/23_bloqueo.webp", "mira": "der", "pie": 1310, "ref": 1306.5, "ancla": 585.0}, "carton1": {"src": "assets/enemigos/clubes/central/barra_2/24_carton_preparar.webp", "mira": "der", "pie": 1334, "ref": 1261.0, "ancla": 561.5}, "carton2": {"src": "assets/enemigos/clubes/central/barra_2/25_carton_subir.webp", "mira": "der", "pie": 1334, "ref": 1274.0, "ancla": 522.8}, "carton3": {"src": "assets/enemigos/clubes/central/barra_2/26_carton_beber.webp", "mira": "der", "pie": 1334, "ref": 1124.5, "ancla": 524.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_2/27_carton_bajar.webp", "mira": "der", "pie": 1334, "ref": 1319.5, "ancla": 532.6}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_2/28_levantarse.webp", "mira": "der", "pie": 1292, "ref": 1501.5, "ancla": 610.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_3/01_guardia.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 557.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 566.1}, "camDP": {"src": "assets/enemigos/clubes/central/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 508.4}, "camDB": {"src": "assets/enemigos/clubes/central/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1327, "ref": 1300, "ancla": 584.8}, "camIA": {"src": "assets/enemigos/clubes/central/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1327, "ref": 1300, "ancla": 555.7}, "camIP": {"src": "assets/enemigos/clubes/central/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1327, "ref": 1300, "ancla": 612.4}, "camIB": {"src": "assets/enemigos/clubes/central/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1327, "ref": 1300, "ancla": 536.5}, "camFA": {"src": "assets/enemigos/clubes/central/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1327, "ref": 1300, "ancla": 557.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1327, "ref": 1300, "ancla": 567.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1327, "ref": 1300, "ancla": 564.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1327, "ref": 1300, "ancla": 564.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1327, "ref": 1300, "ancla": 562.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1327, "ref": 1300, "ancla": 557.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1307, "ref": 1278.9, "ancla": 350.9}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1295, "ref": 1423.5, "ancla": 690.8}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1275, "ref": 1229.2, "ancla": 330.9}, "pina": {"src": "assets/enemigos/clubes/central/barra_3/17_pina.webp", "mira": "der", "pie": 1282, "ref": 1287.0, "ancla": 452.3}, "patada": {"src": "assets/enemigos/clubes/central/barra_3/18_patada.webp", "mira": "der", "pie": 1148, "ref": 1267.5, "ancla": 257.6}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 1281, "ref": 1222.0, "ancla": 352.2}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_3/20_caida.webp", "mira": "der", "pie": 1318, "ref": 1293.5, "ancla": 620.0}, "sentado": {"src": "assets/enemigos/clubes/central/barra_3/21_sentado.webp", "mira": "der", "pie": 1092, "ref": 1462.5, "ancla": 732.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_3/22_suelo.webp", "mira": "der", "pie": 723, "ref": 1922.5, "ancla": 972.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_3/23_bloqueo.webp", "mira": "der", "pie": 1307, "ref": 1293.5, "ancla": 572.8}, "carton1": {"src": "assets/enemigos/clubes/central/barra_3/24_carton_preparar.webp", "mira": "der", "pie": 1327, "ref": 1241.5, "ancla": 560.5}, "carton2": {"src": "assets/enemigos/clubes/central/barra_3/25_carton_subir.webp", "mira": "der", "pie": 1327, "ref": 1189.5, "ancla": 527.7}, "carton3": {"src": "assets/enemigos/clubes/central/barra_3/26_carton_beber.webp", "mira": "der", "pie": 1327, "ref": 1053.0, "ancla": 460.4}, "carton4": {"src": "assets/enemigos/clubes/central/barra_3/27_carton_bajar.webp", "mira": "der", "pie": 1327, "ref": 1261.0, "ancla": 510.5}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_3/28_levantarse.webp", "mira": "der", "pie": 1253, "ref": 1599.0, "ancla": 578.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_4/01_guardia.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 568.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 585.6}, "camDP": {"src": "assets/enemigos/clubes/central/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 502.1}, "camDB": {"src": "assets/enemigos/clubes/central/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1323, "ref": 1300, "ancla": 595.4}, "camIA": {"src": "assets/enemigos/clubes/central/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1323, "ref": 1300, "ancla": 536.1}, "camIP": {"src": "assets/enemigos/clubes/central/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1323, "ref": 1300, "ancla": 618.4}, "camIB": {"src": "assets/enemigos/clubes/central/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1323, "ref": 1300, "ancla": 525.0}, "camFA": {"src": "assets/enemigos/clubes/central/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1323, "ref": 1300, "ancla": 562.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1323, "ref": 1300, "ancla": 567.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1323, "ref": 1300, "ancla": 559.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1323, "ref": 1300, "ancla": 577.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1323, "ref": 1300, "ancla": 555.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1323, "ref": 1300, "ancla": 544.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1287, "ref": 1287.0, "ancla": 655.0}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1289, "ref": 1482.0, "ancla": 604.0}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1324, "ref": 1287.0, "ancla": 645.0}, "pina": {"src": "assets/enemigos/clubes/central/barra_4/17_pina.webp", "mira": "der", "pie": 1278, "ref": 1274.0, "ancla": 476.1}, "patada": {"src": "assets/enemigos/clubes/central/barra_4/18_patada.webp", "mira": "der", "pie": 1147, "ref": 1215.5, "ancla": 284.3}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1320, "ref": 1308.1, "ancla": 363.6}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_4/20_caida.webp", "mira": "der", "pie": 1304, "ref": 1287.0, "ancla": 615.5}, "sentado": {"src": "assets/enemigos/clubes/central/barra_4/21_sentado.webp", "mira": "der", "pie": 1102, "ref": 1469.0, "ancla": 730.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_4/22_suelo.webp", "mira": "der", "pie": 710, "ref": 2039.1, "ancla": 1079.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_4/23_bloqueo.webp", "mira": "der", "pie": 1319, "ref": 1326.0, "ancla": 587.5}, "carton1": {"src": "assets/enemigos/clubes/central/barra_4/24_carton_preparar.webp", "mira": "der", "pie": 1323, "ref": 1287.0, "ancla": 560.0}, "carton2": {"src": "assets/enemigos/clubes/central/barra_4/25_carton_subir.webp", "mira": "der", "pie": 1323, "ref": 1235.0, "ancla": 538.6}, "carton3": {"src": "assets/enemigos/clubes/central/barra_4/26_carton_beber.webp", "mira": "der", "pie": 1323, "ref": 1287.0, "ancla": 530.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_4/27_carton_bajar.webp", "mira": "der", "pie": 1323, "ref": 1248.0, "ancla": 543.7}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_4/28_levantarse.webp", "mira": "der", "pie": 1290, "ref": 1560.0, "ancla": 615.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_5/01_guardia.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 595.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 627.2}, "camDP": {"src": "assets/enemigos/clubes/central/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 571.3}, "camDB": {"src": "assets/enemigos/clubes/central/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 643.2}, "camIA": {"src": "assets/enemigos/clubes/central/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 493.5}, "camIP": {"src": "assets/enemigos/clubes/central/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 550.6}, "camIB": {"src": "assets/enemigos/clubes/central/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 478.3}, "camFA": {"src": "assets/enemigos/clubes/central/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 547.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 557.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 574.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 572.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 556.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 549.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1294, "ref": 1261.0, "ancla": 643.0}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1295, "ref": 1396.4, "ancla": 838.8}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1288, "ref": 1261.0, "ancla": 610.0}, "pina": {"src": "assets/enemigos/clubes/central/barra_5/17_pina.webp", "mira": "der", "pie": 1277, "ref": 1261.0, "ancla": 545.0}, "patada": {"src": "assets/enemigos/clubes/central/barra_5/18_patada.webp", "mira": "der", "pie": 1182, "ref": 1261.0, "ancla": 376.1}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 1307, "ref": 1341.6, "ancla": 634.0}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_5/20_caida.webp", "mira": "der", "pie": 1307, "ref": 1267.5, "ancla": 613.0}, "sentado": {"src": "assets/enemigos/clubes/central/barra_5/21_sentado.webp", "mira": "der", "pie": 1077, "ref": 1384.5, "ancla": 706.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_5/22_suelo.webp", "mira": "der", "pie": 752, "ref": 1907.5, "ancla": 969.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_5/23_bloqueo.webp", "mira": "der", "pie": 1313, "ref": 1267.5, "ancla": 584.0}, "carton1": {"src": "assets/enemigos/clubes/central/barra_5/24_carton_preparar.webp", "mira": "der", "pie": 1325, "ref": 1267.5, "ancla": 560.5}, "carton2": {"src": "assets/enemigos/clubes/central/barra_5/25_carton_subir.webp", "mira": "der", "pie": 1325, "ref": 1170.0, "ancla": 516.0}, "carton3": {"src": "assets/enemigos/clubes/central/barra_5/26_carton_beber.webp", "mira": "der", "pie": 1325, "ref": 1235.0, "ancla": 515.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_5/27_carton_bajar.webp", "mira": "der", "pie": 1325, "ref": 1183.0, "ancla": 553.0}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_5/28_levantarse.webp", "mira": "der", "pie": 1278, "ref": 1508.0, "ancla": 624.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_6/01_guardia.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 571.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 590.5}, "camDP": {"src": "assets/enemigos/clubes/central/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 492.6}, "camDB": {"src": "assets/enemigos/clubes/central/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1325, "ref": 1300, "ancla": 554.3}, "camIA": {"src": "assets/enemigos/clubes/central/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 530.6}, "camIP": {"src": "assets/enemigos/clubes/central/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 629.2}, "camIB": {"src": "assets/enemigos/clubes/central/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1325, "ref": 1300, "ancla": 566.1}, "camFA": {"src": "assets/enemigos/clubes/central/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 552.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 568.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1325, "ref": 1300, "ancla": 569.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 569.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 546.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1325, "ref": 1300, "ancla": 552.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1322, "ref": 1241.5, "ancla": 387.3}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1318, "ref": 1283.8, "ancla": 594.0}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1318, "ref": 1241.5, "ancla": 358.4}, "pina": {"src": "assets/enemigos/clubes/central/barra_6/17_pina.webp", "mira": "der", "pie": 1305, "ref": 1287.0, "ancla": 502.5}, "patada": {"src": "assets/enemigos/clubes/central/barra_6/18_patada.webp", "mira": "der", "pie": 1154, "ref": 1235.0, "ancla": 313.4}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1339, "ref": 1170.0, "ancla": 394.2}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_6/20_caida.webp", "mira": "der", "pie": 1341, "ref": 1183.0, "ancla": 621.0}, "sentado": {"src": "assets/enemigos/clubes/central/barra_6/21_sentado.webp", "mira": "der", "pie": 1108, "ref": 1495.0, "ancla": 732.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_6/22_suelo.webp", "mira": "der", "pie": 695, "ref": 2107.1, "ancla": 1051.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_6/23_bloqueo.webp", "mira": "der", "pie": 1333, "ref": 1345.5, "ancla": 570.0}, "carton1": {"src": "assets/enemigos/clubes/central/barra_6/24_carton_preparar.webp", "mira": "der", "pie": 1325, "ref": 1287.0, "ancla": 560.5}, "carton2": {"src": "assets/enemigos/clubes/central/barra_6/25_carton_subir.webp", "mira": "der", "pie": 1325, "ref": 1241.5, "ancla": 529.5}, "carton3": {"src": "assets/enemigos/clubes/central/barra_6/26_carton_beber.webp", "mira": "der", "pie": 1325, "ref": 1183.0, "ancla": 493.1}, "carton4": {"src": "assets/enemigos/clubes/central/barra_6/27_carton_bajar.webp", "mira": "der", "pie": 1325, "ref": 1280.5, "ancla": 535.2}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_6/28_levantarse.webp", "mira": "der", "pie": 1273, "ref": 1586.0, "ancla": 570.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_7/01_guardia.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 563.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 561.0}, "camDP": {"src": "assets/enemigos/clubes/central/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 508.6}, "camDB": {"src": "assets/enemigos/clubes/central/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1334, "ref": 1300, "ancla": 570.6}, "camIA": {"src": "assets/enemigos/clubes/central/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1334, "ref": 1300, "ancla": 560.4}, "camIP": {"src": "assets/enemigos/clubes/central/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1334, "ref": 1300, "ancla": 612.1}, "camIB": {"src": "assets/enemigos/clubes/central/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1334, "ref": 1300, "ancla": 550.9}, "camFA": {"src": "assets/enemigos/clubes/central/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1334, "ref": 1300, "ancla": 568.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1334, "ref": 1300, "ancla": 551.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1334, "ref": 1300, "ancla": 553.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1334, "ref": 1300, "ancla": 572.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1334, "ref": 1300, "ancla": 553.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1334, "ref": 1300, "ancla": 549.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1322, "ref": 1287.0, "ancla": 631.0}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 1328, "ref": 1287.0, "ancla": 597.0}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 1353, "ref": 1163.5, "ancla": 654.0}, "pina": {"src": "assets/enemigos/clubes/central/barra_7/17_pina.webp", "mira": "der", "pie": 1322, "ref": 1287.0, "ancla": 465.0}, "patada": {"src": "assets/enemigos/clubes/central/barra_7/18_patada.webp", "mira": "der", "pie": 1168, "ref": 1235.0, "ancla": 304.1}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 1340, "ref": 1163.5, "ancla": 650.0}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_7/20_caida.webp", "mira": "der", "pie": 1345, "ref": 1163.5, "ancla": 608.0}, "sentado": {"src": "assets/enemigos/clubes/central/barra_7/21_sentado.webp", "mira": "der", "pie": 1085, "ref": 1482.0, "ancla": 702.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_7/22_suelo.webp", "mira": "der", "pie": 744, "ref": 1899.9, "ancla": 975.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_7/23_bloqueo.webp", "mira": "der", "pie": 1335, "ref": 1352.0, "ancla": 558.3}, "carton1": {"src": "assets/enemigos/clubes/central/barra_7/24_carton_preparar.webp", "mira": "der", "pie": 1334, "ref": 1248.0, "ancla": 560.0}, "carton2": {"src": "assets/enemigos/clubes/central/barra_7/25_carton_subir.webp", "mira": "der", "pie": 1334, "ref": 1202.5, "ancla": 511.9}, "carton3": {"src": "assets/enemigos/clubes/central/barra_7/26_carton_beber.webp", "mira": "der", "pie": 1334, "ref": 1287.0, "ancla": 564.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_7/27_carton_bajar.webp", "mira": "der", "pie": 1334, "ref": 1267.5, "ancla": 507.5}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_7/28_levantarse.webp", "mira": "der", "pie": 1276, "ref": 1592.5, "ancla": 571.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_8/01_guardia.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 567.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 559.9}, "camDP": {"src": "assets/enemigos/clubes/central/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 503.8}, "camDB": {"src": "assets/enemigos/clubes/central/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1329, "ref": 1300, "ancla": 572.7}, "camIA": {"src": "assets/enemigos/clubes/central/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1329, "ref": 1300, "ancla": 560.8}, "camIP": {"src": "assets/enemigos/clubes/central/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1329, "ref": 1300, "ancla": 617.8}, "camIB": {"src": "assets/enemigos/clubes/central/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1329, "ref": 1300, "ancla": 548.7}, "camFA": {"src": "assets/enemigos/clubes/central/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1329, "ref": 1300, "ancla": 558.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1329, "ref": 1300, "ancla": 571.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1329, "ref": 1300, "ancla": 563.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1329, "ref": 1300, "ancla": 574.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1329, "ref": 1300, "ancla": 551.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1329, "ref": 1300, "ancla": 547.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1322, "ref": 1291.6, "ancla": 343.3}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1294, "ref": 1384.5, "ancla": 733.8}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1311, "ref": 1241.5, "ancla": 346.0}, "pina": {"src": "assets/enemigos/clubes/central/barra_8/17_pina.webp", "mira": "der", "pie": 1334, "ref": 1352.0, "ancla": 506.6}, "patada": {"src": "assets/enemigos/clubes/central/barra_8/18_patada.webp", "mira": "der", "pie": 1149, "ref": 1248.0, "ancla": 319.9}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 1339, "ref": 1326.7, "ancla": 340.5}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_8/20_caida.webp", "mira": "der", "pie": 1247, "ref": 1287.0, "ancla": 608.5}, "sentado": {"src": "assets/enemigos/clubes/central/barra_8/21_sentado.webp", "mira": "der", "pie": 1107, "ref": 1508.0, "ancla": 735.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_8/22_suelo.webp", "mira": "der", "pie": 762, "ref": 1935.4, "ancla": 995.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_8/23_bloqueo.webp", "mira": "der", "pie": 1321, "ref": 1339.0, "ancla": 567.7}, "carton1": {"src": "assets/enemigos/clubes/central/barra_8/24_carton_preparar.webp", "mira": "der", "pie": 1329, "ref": 1248.0, "ancla": 560.0}, "carton2": {"src": "assets/enemigos/clubes/central/barra_8/25_carton_subir.webp", "mira": "der", "pie": 1329, "ref": 1241.5, "ancla": 523.8}, "carton3": {"src": "assets/enemigos/clubes/central/barra_8/26_carton_beber.webp", "mira": "der", "pie": 1329, "ref": 1222.0, "ancla": 451.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_8/27_carton_bajar.webp", "mira": "der", "pie": 1329, "ref": 1261.0, "ancla": 516.6}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_8/28_levantarse.webp", "mira": "der", "pie": 1286, "ref": 1579.5, "ancla": 606.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "central_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/central/barra_10/01_guardia.webp", "mira": "der", "pie": 1347, "ref": 1300, "ancla": 555.0}, "camDA": {"src": "assets/enemigos/clubes/central/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1347, "ref": 1300, "ancla": 572.6}, "camDP": {"src": "assets/enemigos/clubes/central/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1347, "ref": 1300, "ancla": 576.4}, "camDB": {"src": "assets/enemigos/clubes/central/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1347, "ref": 1300, "ancla": 574.3}, "camIA": {"src": "assets/enemigos/clubes/central/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1347, "ref": 1300, "ancla": 548.8}, "camIP": {"src": "assets/enemigos/clubes/central/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1347, "ref": 1300, "ancla": 546.8}, "camIB": {"src": "assets/enemigos/clubes/central/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1347, "ref": 1300, "ancla": 546.9}, "camFA": {"src": "assets/enemigos/clubes/central/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1347, "ref": 1300, "ancla": 546.0}, "camFP": {"src": "assets/enemigos/clubes/central/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1347, "ref": 1300, "ancla": 586.0}, "camFB": {"src": "assets/enemigos/clubes/central/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1347, "ref": 1300, "ancla": 575.0}, "camEA": {"src": "assets/enemigos/clubes/central/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1347, "ref": 1300, "ancla": 585.0}, "camEP": {"src": "assets/enemigos/clubes/central/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1347, "ref": 1300, "ancla": 554.0}, "camEB": {"src": "assets/enemigos/clubes/central/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1347, "ref": 1300, "ancla": 536.0}, "reaccion_a": {"src": "assets/enemigos/clubes/central/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1345, "ref": 1301.0, "ancla": 354.1}, "reaccion_b": {"src": "assets/enemigos/clubes/central/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 1336, "ref": 1436.1, "ancla": 575.0}, "reaccion_c": {"src": "assets/enemigos/clubes/central/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1367, "ref": 1268.9, "ancla": 374.2}, "pina": {"src": "assets/enemigos/clubes/central/barra_10/17_pina.webp", "mira": "der", "pie": 1357, "ref": 1300.0, "ancla": 479.4}, "patada": {"src": "assets/enemigos/clubes/central/barra_10/18_patada.webp", "mira": "der", "pie": 1202, "ref": 1144.0, "ancla": 325.3}, "deseq_a": {"src": "assets/enemigos/clubes/central/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 1352, "ref": 1318.3, "ancla": 330.2}, "deseq_b": {"src": "assets/enemigos/clubes/central/barra_10/20_caida.webp", "mira": "der", "pie": 1339, "ref": 1245.5, "ancla": 602.0}, "sentado": {"src": "assets/enemigos/clubes/central/barra_10/21_sentado.webp", "mira": "der", "pie": 1106, "ref": 1423.5, "ancla": 732.5}, "suelo": {"src": "assets/enemigos/clubes/central/barra_10/22_suelo.webp", "mira": "der", "pie": 750, "ref": 1946.9, "ancla": 988.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/central/barra_10/23_bloqueo.webp", "mira": "der", "pie": 1349, "ref": 1378.0, "ancla": 564.3}, "carton1": {"src": "assets/enemigos/clubes/central/barra_10/24_carton_preparar.webp", "mira": "der", "pie": 1347, "ref": 1144.0, "ancla": 560.5}, "carton2": {"src": "assets/enemigos/clubes/central/barra_10/25_carton_subir.webp", "mira": "der", "pie": 1347, "ref": 1131.0, "ancla": 517.1}, "carton3": {"src": "assets/enemigos/clubes/central/barra_10/26_carton_beber.webp", "mira": "der", "pie": 1347, "ref": 936.0, "ancla": 516.0}, "carton4": {"src": "assets/enemigos/clubes/central/barra_10/27_carton_bajar.webp", "mira": "der", "pie": 1347, "ref": 1183.0, "ancla": 536.6}, "levantarse": {"src": "assets/enemigos/clubes/central/barra_10/28_levantarse.webp", "mira": "der", "pie": 1305, "ref": 1592.5, "ancla": 603.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}});
/* v95 TALLERES Y CENTRAL — fin */

/* v97 NEWELLS — inicio (generado por t97/py/npc97.py: no editar a mano).
   NEWELL'S «Leproso 1…8 y 10» (personajes/NEWELLS/LEPROSOS_ORIGINALES_v1, 28 poses). No existe el 9. IDs internos newells_NN (carpetas barra_N).
   Caminatas con dibujo propio en las 4 direcciones (ANIMACIONES.json): derecha 02 → 03 → 04 → 03, izquierda 05 → 06 → 07 → 06, frente 08 → 09 → 10 → 09,
   espalda 11 → 12 → 13 → 12, 180 ms por cuadro (reloj propio). Reacciones 14/15/16, piña 17, patada 18, bloqueo 23; derrota 19 → 20 → 22; se levantan por 28.
   Las poses 24–27 (cartón de vino TORO) quedan registradas: los barras comunes no se recuperan en el juego. */
Object.assign(window.SPRITES_ENEMIGOS, {"newells_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_1/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 729.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 792.3}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 787.3}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 800.4}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 674.0}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 736.2}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 613.7}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 789.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 805.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 751.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 763.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1253, "ref": 1300, "ancla": 504.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1208, "ref": 1248.0, "ancla": 564.1}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1225, "ref": 1118.0, "ancla": 369.9}, "pina": {"src": "assets/enemigos/clubes/newells/barra_1/17_pina.webp", "mira": "der", "pie": 951, "ref": 890.5, "ancla": 450.1}, "patada": {"src": "assets/enemigos/clubes/newells/barra_1/18_patada.webp", "mira": "der", "pie": 1245, "ref": 1157.0, "ancla": 306.0}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 1157, "ref": 1118.0, "ancla": 583.3}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_1/20_caida.webp", "mira": "der", "pie": 749, "ref": 1228.5, "ancla": 743.5}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_1/21_sentado.webp", "mira": "der", "pie": 930, "ref": 1384.5, "ancla": 611.5}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_1/22_suelo.webp", "mira": "der", "pie": 412, "ref": 1547.2, "ancla": 884.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_1/23_bloqueo.webp", "mira": "der", "pie": 1228, "ref": 1209.0, "ancla": 468.1}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_1/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1209.0, "ancla": 767.5}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_1/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1209.0, "ancla": 708.1}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_1/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1313.0, "ancla": 759.0}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_1/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1196.0, "ancla": 715.3}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_1/28_levantarse.webp", "mira": "der", "pie": 991, "ref": 1254.5, "ancla": 559.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_2/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 778.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 895.4}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 876.1}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 889.5}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 642.8}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 670.1}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 642.8}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 782.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 813.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 749.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 767.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1394, "ref": 1300, "ancla": 564.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1273, "ref": 1339.0, "ancla": 471.0}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1265, "ref": 1196.0, "ancla": 434.0}, "pina": {"src": "assets/enemigos/clubes/newells/barra_2/17_pina.webp", "mira": "der", "pie": 967, "ref": 1001.0, "ancla": 562.0}, "patada": {"src": "assets/enemigos/clubes/newells/barra_2/18_patada.webp", "mira": "der", "pie": 978, "ref": 929.5, "ancla": 432.0}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 980, "ref": 975.0, "ancla": 652.0}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_2/20_caida.webp", "mira": "der", "pie": 801, "ref": 1215.5, "ancla": 865.0}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_2/21_sentado.webp", "mira": "der", "pie": 949, "ref": 1339.0, "ancla": 704.5}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_2/22_suelo.webp", "mira": "der", "pie": 469, "ref": 1852.9, "ancla": 1045.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_2/23_bloqueo.webp", "mira": "der", "pie": 1291, "ref": 1189.5, "ancla": 533.0}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_2/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1326.0, "ancla": 767.0}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_2/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1332.5, "ancla": 813.4}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_2/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1423.5, "ancla": 830.0}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_2/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1358.5, "ancla": 679.0}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_2/28_levantarse.webp", "mira": "der", "pie": 1029, "ref": 1261.0, "ancla": 628.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_3/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 748.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 760.7}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 759.2}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 770.4}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 771.9}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 774.6}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 764.4}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 807.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 748.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 763.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 760.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1416, "ref": 1300, "ancla": 576.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1318, "ref": 1293.5, "ancla": 602.0}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1154, "ref": 988.0, "ancla": 272.3}, "pina": {"src": "assets/enemigos/clubes/newells/barra_3/17_pina.webp", "mira": "der", "pie": 973, "ref": 968.5, "ancla": 517.5}, "patada": {"src": "assets/enemigos/clubes/newells/barra_3/18_patada.webp", "mira": "der", "pie": 1025, "ref": 949.0, "ancla": 227.1}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 1024, "ref": 1007.5, "ancla": 536.0}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_3/20_caida.webp", "mira": "der", "pie": 802, "ref": 1267.5, "ancla": 850.0}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_3/21_sentado.webp", "mira": "der", "pie": 990, "ref": 1488.5, "ancla": 712.0}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_3/22_suelo.webp", "mira": "der", "pie": 500, "ref": 1900.3, "ancla": 1070.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_3/23_bloqueo.webp", "mira": "der", "pie": 1145, "ref": 1092.0, "ancla": 449.0}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_3/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1261.0, "ancla": 767.0}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_3/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1261.0, "ancla": 661.7}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_3/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1157.0, "ancla": 640.6}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_3/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1280.5, "ancla": 649.9}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_3/28_levantarse.webp", "mira": "der", "pie": 1062, "ref": 1306.5, "ancla": 625.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_4/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 770.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 788.5}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 783.1}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 783.2}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 745.0}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 749.8}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 751.4}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 793.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 811.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 755.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 776.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 759.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 762.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1365, "ref": 1300, "ancla": 589.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1308, "ref": 1365.0, "ancla": 492.0}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1193, "ref": 1059.5, "ancla": 291.3}, "pina": {"src": "assets/enemigos/clubes/newells/barra_4/17_pina.webp", "mira": "der", "pie": 988, "ref": 962.0, "ancla": 567.3}, "patada": {"src": "assets/enemigos/clubes/newells/barra_4/18_patada.webp", "mira": "der", "pie": 1029, "ref": 955.5, "ancla": 275.8}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1032, "ref": 1072.5, "ancla": 614.3}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_4/20_caida.webp", "mira": "der", "pie": 842, "ref": 1235.0, "ancla": 856.0}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_4/21_sentado.webp", "mira": "der", "pie": 964, "ref": 1352.0, "ancla": 698.5}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_4/22_suelo.webp", "mira": "der", "pie": 480, "ref": 1796.2, "ancla": 1014.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_4/23_bloqueo.webp", "mira": "der", "pie": 1314, "ref": 1196.0, "ancla": 535.4}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_4/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1300.0, "ancla": 767.0}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_4/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1326.0, "ancla": 717.0}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_4/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1300.0, "ancla": 682.0}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_4/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1339.0, "ancla": 722.2}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_4/28_levantarse.webp", "mira": "der", "pie": 1111, "ref": 1436.5, "ancla": 647.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_5/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 784.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 845.0}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 840.0}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 856.9}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 663.9}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 693.5}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 623.9}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 787.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 792.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 757.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 774.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 763.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1373, "ref": 1300, "ancla": 578.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1127, "ref": 1189.5, "ancla": 642.5}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1241, "ref": 1192.9, "ancla": 621.0}, "pina": {"src": "assets/enemigos/clubes/newells/barra_5/17_pina.webp", "mira": "der", "pie": 968, "ref": 936.0, "ancla": 561.0}, "patada": {"src": "assets/enemigos/clubes/newells/barra_5/18_patada.webp", "mira": "der", "pie": 1032, "ref": 929.5, "ancla": 415.0}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 986, "ref": 942.5, "ancla": 648.1}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_5/20_caida.webp", "mira": "der", "pie": 800, "ref": 1046.5, "ancla": 842.5}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_5/21_sentado.webp", "mira": "der", "pie": 984, "ref": 1371.5, "ancla": 703.0}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_5/22_suelo.webp", "mira": "der", "pie": 514, "ref": 1870.6, "ancla": 1054.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_5/23_bloqueo.webp", "mira": "der", "pie": 1344, "ref": 1170.0, "ancla": 602.5}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_5/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1215.5, "ancla": 767.5}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_5/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1170.0, "ancla": 740.0}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_5/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1231.8, "ancla": 736.0}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_5/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1248.0, "ancla": 724.0}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_5/28_levantarse.webp", "mira": "der", "pie": 1022, "ref": 1202.5, "ancla": 618.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_6/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 785.7}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 755.4}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 797.0}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 731.5}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 723.6}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 595.5}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 796.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 797.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 755.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 779.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1392, "ref": 1248.9, "ancla": 314.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1133, "ref": 1267.5, "ancla": 543.0}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1169, "ref": 994.5, "ancla": 284.0}, "pina": {"src": "assets/enemigos/clubes/newells/barra_6/17_pina.webp", "mira": "der", "pie": 998, "ref": 1007.5, "ancla": 527.5}, "patada": {"src": "assets/enemigos/clubes/newells/barra_6/18_patada.webp", "mira": "der", "pie": 1013, "ref": 962.0, "ancla": 236.2}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1086, "ref": 1027.0, "ancla": 560.6}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_6/20_caida.webp", "mira": "der", "pie": 811, "ref": 1254.5, "ancla": 840.0}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_6/21_sentado.webp", "mira": "der", "pie": 983, "ref": 1397.5, "ancla": 683.0}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_6/22_suelo.webp", "mira": "der", "pie": 493, "ref": 1874.3, "ancla": 1056.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_6/23_bloqueo.webp", "mira": "der", "pie": 1170, "ref": 1131.0, "ancla": 469.0}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_6/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1332.5, "ancla": 767.5}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_6/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1339.0, "ancla": 712.5}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_6/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1280.5, "ancla": 715.4}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_6/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1326.0, "ancla": 711.2}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_6/28_levantarse.webp", "mira": "der", "pie": 1062, "ref": 1306.5, "ancla": 614.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_7/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 751.2}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 785.3}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 782.2}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 784.4}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 748.0}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 748.9}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 796.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 806.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 771.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 762.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 773.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 774.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1180, "ref": 1051.9, "ancla": 295.1}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 1176, "ref": 1235.0, "ancla": 600.9}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 1192, "ref": 1101.2, "ancla": 349.6}, "pina": {"src": "assets/enemigos/clubes/newells/barra_7/17_pina.webp", "mira": "der", "pie": 991, "ref": 994.5, "ancla": 560.6}, "patada": {"src": "assets/enemigos/clubes/newells/barra_7/18_patada.webp", "mira": "der", "pie": 996, "ref": 884.0, "ancla": 279.3}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 961, "ref": 968.5, "ancla": 553.2}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_7/20_caida.webp", "mira": "der", "pie": 847, "ref": 1293.5, "ancla": 857.5}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_7/21_sentado.webp", "mira": "der", "pie": 1008, "ref": 1469.0, "ancla": 695.5}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_7/22_suelo.webp", "mira": "der", "pie": 500, "ref": 1989.5, "ancla": 1118.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_7/23_bloqueo.webp", "mira": "der", "pie": 1185, "ref": 1163.5, "ancla": 506.2}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_7/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1261.0, "ancla": 767.0}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_7/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1241.5, "ancla": 719.4}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_7/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1157.0, "ancla": 681.1}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_7/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1254.5, "ancla": 707.6}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_7/28_levantarse.webp", "mira": "der", "pie": 1122, "ref": 1365.0, "ancla": 632.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_8/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 771.8}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 801.2}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 770.0}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 761.4}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 734.3}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 761.6}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 784.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 801.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 756.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 789.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 770.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1171, "ref": 988.0, "ancla": 244.0}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1158, "ref": 1332.5, "ancla": 532.1}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1196, "ref": 1053.0, "ancla": 290.6}, "pina": {"src": "assets/enemigos/clubes/newells/barra_8/17_pina.webp", "mira": "der", "pie": 1003, "ref": 1033.5, "ancla": 508.6}, "patada": {"src": "assets/enemigos/clubes/newells/barra_8/18_patada.webp", "mira": "der", "pie": 1014, "ref": 949.0, "ancla": 260.1}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 992, "ref": 981.5, "ancla": 536.7}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_8/20_caida.webp", "mira": "der", "pie": 793, "ref": 1267.5, "ancla": 852.0}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_8/21_sentado.webp", "mira": "der", "pie": 1032, "ref": 1482.0, "ancla": 685.0}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_8/22_suelo.webp", "mira": "der", "pie": 467, "ref": 1762.8, "ancla": 1005.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_8/23_bloqueo.webp", "mira": "der", "pie": 1335, "ref": 1254.5, "ancla": 519.7}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_8/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1313.0, "ancla": 767.5}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_8/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1345.5, "ancla": 726.7}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_8/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1267.5, "ancla": 725.5}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_8/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1319.5, "ancla": 724.1}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_8/28_levantarse.webp", "mira": "der", "pie": 1115, "ref": 1410.5, "ancla": 635.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "newells_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/newells/barra_10/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 742.0}, "camDA": {"src": "assets/enemigos/clubes/newells/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 770.2}, "camDP": {"src": "assets/enemigos/clubes/newells/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 785.6}, "camDB": {"src": "assets/enemigos/clubes/newells/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 766.6}, "camIA": {"src": "assets/enemigos/clubes/newells/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 757.8}, "camIP": {"src": "assets/enemigos/clubes/newells/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 745.9}, "camIB": {"src": "assets/enemigos/clubes/newells/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 763.2}, "camFA": {"src": "assets/enemigos/clubes/newells/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 805.0}, "camFP": {"src": "assets/enemigos/clubes/newells/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 811.0}, "camFB": {"src": "assets/enemigos/clubes/newells/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 751.0}, "camEA": {"src": "assets/enemigos/clubes/newells/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 782.0}, "camEP": {"src": "assets/enemigos/clubes/newells/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 765.0}, "camEB": {"src": "assets/enemigos/clubes/newells/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 783.0}, "reaccion_a": {"src": "assets/enemigos/clubes/newells/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1410, "ref": 1265.6, "ancla": 274.5}, "reaccion_b": {"src": "assets/enemigos/clubes/newells/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 1159, "ref": 1173.2, "ancla": 432.0}, "reaccion_c": {"src": "assets/enemigos/clubes/newells/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1138, "ref": 1055.3, "ancla": 389.9}, "pina": {"src": "assets/enemigos/clubes/newells/barra_10/17_pina.webp", "mira": "der", "pie": 999, "ref": 1007.5, "ancla": 592.0}, "patada": {"src": "assets/enemigos/clubes/newells/barra_10/18_patada.webp", "mira": "der", "pie": 1015, "ref": 936.0, "ancla": 350.1}, "deseq_a": {"src": "assets/enemigos/clubes/newells/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 1002, "ref": 981.5, "ancla": 668.9}, "deseq_b": {"src": "assets/enemigos/clubes/newells/barra_10/20_caida.webp", "mira": "der", "pie": 832, "ref": 1170.0, "ancla": 838.5}, "sentado": {"src": "assets/enemigos/clubes/newells/barra_10/21_sentado.webp", "mira": "der", "pie": 984, "ref": 1254.5, "ancla": 697.5}, "suelo": {"src": "assets/enemigos/clubes/newells/barra_10/22_suelo.webp", "mira": "der", "pie": 491, "ref": 1964.4, "ancla": 1106.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/newells/barra_10/23_bloqueo.webp", "mira": "der", "pie": 1315, "ref": 1228.5, "ancla": 547.4}, "carton1": {"src": "assets/enemigos/clubes/newells/barra_10/24_carton_preparar.webp", "mira": "der", "pie": 1503, "ref": 1261.0, "ancla": 767.5}, "carton2": {"src": "assets/enemigos/clubes/newells/barra_10/25_carton_subir.webp", "mira": "der", "pie": 1503, "ref": 1300.0, "ancla": 716.0}, "carton3": {"src": "assets/enemigos/clubes/newells/barra_10/26_carton_beber.webp", "mira": "der", "pie": 1503, "ref": 1202.5, "ancla": 695.4}, "carton4": {"src": "assets/enemigos/clubes/newells/barra_10/27_carton_bajar.webp", "mira": "der", "pie": 1503, "ref": 1306.5, "ancla": 716.8}, "levantarse": {"src": "assets/enemigos/clubes/newells/barra_10/28_levantarse.webp", "mira": "der", "pie": 1145, "ref": 1332.5, "ancla": 645.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}});
/* v97 NEWELLS — fin */

/* v101 MORON Y CHICAGO — inicio (generado por t101/py/npc101.py: no editar a mano).
   MORÓN «Gallo 1…8 y 10» (personajes/MORON/GALLOS_ORIGINALES_v1) y NUEVA CHICAGO «Torero 1…8 y 10» (personajes/CHICAGO/TOREROS_ORIGINALES_v1),
   28 poses cada uno. No existe el 9. IDs internos moron_NN / chicago_NN (carpetas barra_N). Caminatas con dibujo propio (ANIMACIONES.json):
   derecha 02 → 03 → 04 → 03, izquierda 05 → 06 → 07 → 06, frente 08 → 09 → 10 → 09, espalda 11 → 12 → 13 → 12, 180 ms por cuadro.
   Reacciones 14/15/16, piña 17, patada 18, bloqueo 23; derrota 19 → 20 → 22; se levantan por 28. Las poses 24–27 (damajuana / choripán)
   quedan registradas: los barras comunes no se recuperan en el juego. */
Object.assign(window.SPRITES_ENEMIGOS, {"moron_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_1/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 729.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 812.2}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 792.2}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 817.2}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 716.9}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 742.5}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 723.3}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 794.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 793.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 741.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 767.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1394, "ref": 1300, "ancla": 592.0}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1397, "ref": 1300, "ancla": 496.0}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1266, "ref": 1170.0, "ancla": 381.8}, "pina": {"src": "assets/enemigos/clubes/moron/barra_1/17_pina.webp", "mira": "der", "pie": 1202, "ref": 1163.5, "ancla": 547.7}, "patada": {"src": "assets/enemigos/clubes/moron/barra_1/18_patada.webp", "mira": "der", "pie": 1240, "ref": 1202.5, "ancla": 334.8}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 1198, "ref": 1150.5, "ancla": 614.9}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_1/20_caida.webp", "mira": "der", "pie": 839, "ref": 1404.0, "ancla": 846.5}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_1/21_sentado.webp", "mira": "der", "pie": 1026, "ref": 1501.5, "ancla": 687.5}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_1/22_suelo.webp", "mira": "der", "pie": 493, "ref": 1909.6, "ancla": 1075.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_1/23_bloqueo.webp", "mira": "der", "pie": 1350, "ref": 1313.0, "ancla": 580.0}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_1/24_damajuana_recoger.webp", "mira": "der", "pie": 1152, "ref": 1365.0, "ancla": 489.0}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_1/25_damajuana_sostener.webp", "mira": "der", "pie": 1303, "ref": 1144.0, "ancla": 345.2}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_1/26_damajuana_beber.webp", "mira": "der", "pie": 1480, "ref": 1300, "ancla": 479.0}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_1/27_damajuana_bajar.webp", "mira": "der", "pie": 1299, "ref": 1150.5, "ancla": 428.2}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_1/28_levantarse.webp", "mira": "der", "pie": 1130, "ref": 1482.0, "ancla": 643.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_2/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 776.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 907.4}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 895.7}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 891.3}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 643.4}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 641.2}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 627.2}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 784.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 808.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 751.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 751.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 767.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 784.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1369, "ref": 1300, "ancla": 600.0}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1283, "ref": 1482.0, "ancla": 495.0}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1283, "ref": 1196.0, "ancla": 441.6}, "pina": {"src": "assets/enemigos/clubes/moron/barra_2/17_pina.webp", "mira": "der", "pie": 1088, "ref": 1150.5, "ancla": 636.0}, "patada": {"src": "assets/enemigos/clubes/moron/barra_2/18_patada.webp", "mira": "der", "pie": 1123, "ref": 1131.0, "ancla": 569.0}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 1089, "ref": 1111.5, "ancla": 738.0}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_2/20_caida.webp", "mira": "der", "pie": 821, "ref": 1313.0, "ancla": 899.5}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_2/21_sentado.webp", "mira": "der", "pie": 970, "ref": 1410.5, "ancla": 750.5}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_2/22_suelo.webp", "mira": "der", "pie": 489, "ref": 1929.1, "ancla": 1086.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_2/23_bloqueo.webp", "mira": "der", "pie": 1300, "ref": 1235.0, "ancla": 564.0}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_2/24_damajuana_recoger.webp", "mira": "der", "pie": 1120, "ref": 1358.5, "ancla": 566.0}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_2/25_damajuana_sostener.webp", "mira": "der", "pie": 1471, "ref": 1293.5, "ancla": 434.9}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_2/26_damajuana_beber.webp", "mira": "der", "pie": 1492, "ref": 1300, "ancla": 548.0}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_2/27_damajuana_bajar.webp", "mira": "der", "pie": 1308, "ref": 1215.5, "ancla": 493.5}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_2/28_levantarse.webp", "mira": "der", "pie": 1075, "ref": 1352.0, "ancla": 677.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_3/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 728.4}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 745.6}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 773.1}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 762.8}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 788.2}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 806.9}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 807.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 774.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 767.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1434, "ref": 1300, "ancla": 580.0}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1248, "ref": 1345.5, "ancla": 654.8}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1241, "ref": 1079.0, "ancla": 296.9}, "pina": {"src": "assets/enemigos/clubes/moron/barra_3/17_pina.webp", "mira": "der", "pie": 1128, "ref": 1118.0, "ancla": 588.7}, "patada": {"src": "assets/enemigos/clubes/moron/barra_3/18_patada.webp", "mira": "der", "pie": 1166, "ref": 1098.5, "ancla": 258.4}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 1094, "ref": 1092.0, "ancla": 606.8}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_3/20_caida.webp", "mira": "der", "pie": 813, "ref": 1267.5, "ancla": 876.5}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_3/21_sentado.webp", "mira": "der", "pie": 1022, "ref": 1495.0, "ancla": 738.0}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_3/22_suelo.webp", "mira": "der", "pie": 504, "ref": 1923.5, "ancla": 1085.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_3/23_bloqueo.webp", "mira": "der", "pie": 1243, "ref": 1222.0, "ancla": 485.5}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_3/24_damajuana_recoger.webp", "mira": "der", "pie": 1217, "ref": 1436.5, "ancla": 539.5}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_3/25_damajuana_sostener.webp", "mira": "der", "pie": 1371, "ref": 1105.0, "ancla": 223.3}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_3/26_damajuana_beber.webp", "mira": "der", "pie": 1464, "ref": 1098.5, "ancla": 322.8}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_3/27_damajuana_bajar.webp", "mira": "der", "pie": 1240, "ref": 1124.5, "ancla": 447.0}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_3/28_levantarse.webp", "mira": "der", "pie": 1081, "ref": 1332.5, "ancla": 649.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_4/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 793.3}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 796.6}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 777.8}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 756.3}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 739.0}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 742.5}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 790.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 799.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 745.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 785.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 750.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1392, "ref": 1300, "ancla": 616.0}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1375, "ref": 1547.0, "ancla": 710.9}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1254, "ref": 1131.0, "ancla": 304.7}, "pina": {"src": "assets/enemigos/clubes/moron/barra_4/17_pina.webp", "mira": "der", "pie": 1117, "ref": 1105.0, "ancla": 631.9}, "patada": {"src": "assets/enemigos/clubes/moron/barra_4/18_patada.webp", "mira": "der", "pie": 1134, "ref": 1124.5, "ancla": 302.0}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1074, "ref": 1118.0, "ancla": 643.9}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_4/20_caida.webp", "mira": "der", "pie": 851, "ref": 1222.0, "ancla": 876.0}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_4/21_sentado.webp", "mira": "der", "pie": 1003, "ref": 1365.0, "ancla": 730.0}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_4/22_suelo.webp", "mira": "der", "pie": 490, "ref": 1906.8, "ancla": 1074.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_4/23_bloqueo.webp", "mira": "der", "pie": 1334, "ref": 1209.0, "ancla": 560.7}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_4/24_damajuana_recoger.webp", "mira": "der", "pie": 1105, "ref": 1287.0, "ancla": 484.0}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_4/25_damajuana_sostener.webp", "mira": "der", "pie": 1478, "ref": 1235.0, "ancla": 297.9}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_4/26_damajuana_beber.webp", "mira": "der", "pie": 1407, "ref": 1300, "ancla": 479.0}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_4/27_damajuana_bajar.webp", "mira": "der", "pie": 1438, "ref": 1248.0, "ancla": 474.3}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_4/28_levantarse.webp", "mira": "der", "pie": 1112, "ref": 1436.5, "ancla": 641.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_5/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 783.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 820.4}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 846.9}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 851.5}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 684.9}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 689.1}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 713.8}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 782.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 798.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 782.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 753.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1403, "ref": 1300, "ancla": 594.0}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1313, "ref": 1456.0, "ancla": 750.2}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1260, "ref": 1238.8, "ancla": 657.0}, "pina": {"src": "assets/enemigos/clubes/moron/barra_5/17_pina.webp", "mira": "der", "pie": 1101, "ref": 1072.5, "ancla": 648.0}, "patada": {"src": "assets/enemigos/clubes/moron/barra_5/18_patada.webp", "mira": "der", "pie": 1122, "ref": 1033.5, "ancla": 433.0}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 1084, "ref": 1007.5, "ancla": 761.0}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_5/20_caida.webp", "mira": "der", "pie": 830, "ref": 1222.0, "ancla": 891.5}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_5/21_sentado.webp", "mira": "der", "pie": 1014, "ref": 1397.5, "ancla": 729.5}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_5/22_suelo.webp", "mira": "der", "pie": 524, "ref": 1935.6, "ancla": 1089.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_5/23_bloqueo.webp", "mira": "der", "pie": 1335, "ref": 1202.5, "ancla": 590.0}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_5/24_damajuana_recoger.webp", "mira": "der", "pie": 1101, "ref": 1202.5, "ancla": 600.0}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_5/25_damajuana_sostener.webp", "mira": "der", "pie": 1388, "ref": 1202.5, "ancla": 352.1}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_5/26_damajuana_beber.webp", "mira": "der", "pie": 1378, "ref": 1300, "ancla": 481.0}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_5/27_damajuana_bajar.webp", "mira": "der", "pie": 1282, "ref": 1163.5, "ancla": 532.0}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_5/28_levantarse.webp", "mira": "der", "pie": 1084, "ref": 1332.5, "ancla": 679.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_6/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 787.1}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.3}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 789.5}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 746.5}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 783.2}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 748.2}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 791.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 799.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 744.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 774.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 772.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 761.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1420, "ref": 1274.9, "ancla": 310.6}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1351, "ref": 1475.5, "ancla": 676.4}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1241, "ref": 1027.0, "ancla": 296.0}, "pina": {"src": "assets/enemigos/clubes/moron/barra_6/17_pina.webp", "mira": "der", "pie": 1151, "ref": 1137.5, "ancla": 584.9}, "patada": {"src": "assets/enemigos/clubes/moron/barra_6/18_patada.webp", "mira": "der", "pie": 1174, "ref": 1124.5, "ancla": 288.0}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1138, "ref": 1085.5, "ancla": 597.4}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_6/20_caida.webp", "mira": "der", "pie": 849, "ref": 1410.5, "ancla": 900.0}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_6/21_sentado.webp", "mira": "der", "pie": 1020, "ref": 1430.0, "ancla": 717.0}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_6/22_suelo.webp", "mira": "der", "pie": 516, "ref": 1940.2, "ancla": 1093.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_6/23_bloqueo.webp", "mira": "der", "pie": 1310, "ref": 1274.0, "ancla": 538.5}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_6/24_damajuana_recoger.webp", "mira": "der", "pie": 1100, "ref": 1280.5, "ancla": 528.5}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_6/25_damajuana_sostener.webp", "mira": "der", "pie": 1501, "ref": 1261.0, "ancla": 341.7}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_6/26_damajuana_beber.webp", "mira": "der", "pie": 1352, "ref": 994.5, "ancla": 321.7}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_6/27_damajuana_bajar.webp", "mira": "der", "pie": 1461, "ref": 1261.0, "ancla": 468.3}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_6/28_levantarse.webp", "mira": "der", "pie": 1124, "ref": 1378.0, "ancla": 652.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_7/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 754.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 748.3}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 778.0}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 744.7}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 791.1}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 757.0}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 787.7}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 785.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 806.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 750.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 755.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 778.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 780.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1349, "ref": 1208.9, "ancla": 303.7}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 1323, "ref": 1346.3, "ancla": 700.8}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 1227, "ref": 1124.5, "ancla": 366.4}, "pina": {"src": "assets/enemigos/clubes/moron/barra_7/17_pina.webp", "mira": "der", "pie": 1120, "ref": 1150.5, "ancla": 629.2}, "patada": {"src": "assets/enemigos/clubes/moron/barra_7/18_patada.webp", "mira": "der", "pie": 1137, "ref": 1118.0, "ancla": 332.4}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 1075, "ref": 1105.0, "ancla": 635.4}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_7/20_caida.webp", "mira": "der", "pie": 862, "ref": 1313.0, "ancla": 880.0}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_7/21_sentado.webp", "mira": "der", "pie": 1012, "ref": 1475.5, "ancla": 711.5}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_7/22_suelo.webp", "mira": "der", "pie": 499, "ref": 1988.6, "ancla": 1118.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_7/23_bloqueo.webp", "mira": "der", "pie": 1317, "ref": 1280.5, "ancla": 574.4}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_7/24_damajuana_recoger.webp", "mira": "der", "pie": 1178, "ref": 1456.0, "ancla": 436.0}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_7/25_damajuana_sostener.webp", "mira": "der", "pie": 1432, "ref": 1170.0, "ancla": 346.9}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_7/26_damajuana_beber.webp", "mira": "der", "pie": 1485, "ref": 884.0, "ancla": 355.9}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_7/27_damajuana_bajar.webp", "mira": "der", "pie": 1272, "ref": 1118.0, "ancla": 436.8}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_7/28_levantarse.webp", "mira": "der", "pie": 1154, "ref": 1462.5, "ancla": 652.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_8/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 750.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 763.9}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 778.3}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 769.6}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 764.3}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 756.8}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 771.0}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 787.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 797.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 748.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 786.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 749.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1402, "ref": 1144.0, "ancla": 273.6}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1405, "ref": 1586.0, "ancla": 664.6}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1282, "ref": 1170.0, "ancla": 324.9}, "pina": {"src": "assets/enemigos/clubes/moron/barra_8/17_pina.webp", "mira": "der", "pie": 1155, "ref": 1176.5, "ancla": 554.4}, "patada": {"src": "assets/enemigos/clubes/moron/barra_8/18_patada.webp", "mira": "der", "pie": 1154, "ref": 1098.5, "ancla": 293.7}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 1111, "ref": 1144.0, "ancla": 615.8}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_8/20_caida.webp", "mira": "der", "pie": 813, "ref": 1326.0, "ancla": 890.5}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_8/21_sentado.webp", "mira": "der", "pie": 1052, "ref": 1482.0, "ancla": 714.0}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_8/22_suelo.webp", "mira": "der", "pie": 502, "ref": 1907.7, "ancla": 1074.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_8/23_bloqueo.webp", "mira": "der", "pie": 1345, "ref": 1228.5, "ancla": 519.4}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_8/24_damajuana_recoger.webp", "mira": "der", "pie": 1162, "ref": 1365.0, "ancla": 469.5}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_8/25_damajuana_sostener.webp", "mira": "der", "pie": 1476, "ref": 1202.5, "ancla": 336.9}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_8/26_damajuana_beber.webp", "mira": "der", "pie": 1503, "ref": 1066.0, "ancla": 297.2}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_8/27_damajuana_bajar.webp", "mira": "der", "pie": 1453, "ref": 1267.5, "ancla": 452.0}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_8/28_levantarse.webp", "mira": "der", "pie": 1129, "ref": 1423.5, "ancla": 660.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "moron_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/moron/barra_10/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 744.0}, "camDA": {"src": "assets/enemigos/clubes/moron/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 764.2}, "camDP": {"src": "assets/enemigos/clubes/moron/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 785.6}, "camDB": {"src": "assets/enemigos/clubes/moron/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 769.9}, "camIA": {"src": "assets/enemigos/clubes/moron/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camIP": {"src": "assets/enemigos/clubes/moron/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 749.1}, "camIB": {"src": "assets/enemigos/clubes/moron/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 769.9}, "camFA": {"src": "assets/enemigos/clubes/moron/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 815.0}, "camFP": {"src": "assets/enemigos/clubes/moron/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 814.0}, "camFB": {"src": "assets/enemigos/clubes/moron/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 720.0}, "camEA": {"src": "assets/enemigos/clubes/moron/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 783.0}, "camEP": {"src": "assets/enemigos/clubes/moron/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEB": {"src": "assets/enemigos/clubes/moron/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 752.0}, "reaccion_a": {"src": "assets/enemigos/clubes/moron/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1407, "ref": 1475.5, "ancla": 555.0}, "reaccion_b": {"src": "assets/enemigos/clubes/moron/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 1305, "ref": 1376.5, "ancla": 545.8}, "reaccion_c": {"src": "assets/enemigos/clubes/moron/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1165, "ref": 1475.5, "ancla": 701.6}, "pina": {"src": "assets/enemigos/clubes/moron/barra_10/17_pina.webp", "mira": "der", "pie": 1096, "ref": 1150.5, "ancla": 634.5}, "patada": {"src": "assets/enemigos/clubes/moron/barra_10/18_patada.webp", "mira": "der", "pie": 1097, "ref": 1046.5, "ancla": 397.1}, "deseq_a": {"src": "assets/enemigos/clubes/moron/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 1050, "ref": 1098.5, "ancla": 739.1}, "deseq_b": {"src": "assets/enemigos/clubes/moron/barra_10/20_caida.webp", "mira": "der", "pie": 849, "ref": 1274.0, "ancla": 866.5}, "sentado": {"src": "assets/enemigos/clubes/moron/barra_10/21_sentado.webp", "mira": "der", "pie": 1009, "ref": 1371.5, "ancla": 738.0}, "suelo": {"src": "assets/enemigos/clubes/moron/barra_10/22_suelo.webp", "mira": "der", "pie": 482, "ref": 1954.2, "ancla": 1099.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/moron/barra_10/23_bloqueo.webp", "mira": "der", "pie": 1339, "ref": 1300.0, "ancla": 562.0}, "carton1": {"src": "assets/enemigos/clubes/moron/barra_10/24_damajuana_recoger.webp", "mira": "der", "pie": 1111, "ref": 1306.5, "ancla": 591.5}, "carton2": {"src": "assets/enemigos/clubes/moron/barra_10/25_damajuana_sostener.webp", "mira": "der", "pie": 1390, "ref": 1176.5, "ancla": 437.7}, "carton3": {"src": "assets/enemigos/clubes/moron/barra_10/26_damajuana_beber.webp", "mira": "der", "pie": 1453, "ref": 806.0, "ancla": 376.0}, "carton4": {"src": "assets/enemigos/clubes/moron/barra_10/27_damajuana_bajar.webp", "mira": "der", "pie": 1213, "ref": 1085.5, "ancla": 464.2}, "levantarse": {"src": "assets/enemigos/clubes/moron/barra_10/28_levantarse.webp", "mira": "der", "pie": 1155, "ref": 1378.0, "ancla": 656.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_1/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 730.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 812.1}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 806.6}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 820.2}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 715.1}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 728.9}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 722.7}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 802.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 788.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 733.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 762.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 771.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1174, "ref": 1046.3, "ancla": 473.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1148, "ref": 1300, "ancla": 291.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1186, "ref": 1057.5, "ancla": 560.0}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_1/17_pina.webp", "mira": "der", "pie": 1185, "ref": 1105.0, "ancla": 405.2}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_1/18_patada.webp", "mira": "der", "pie": 1186, "ref": 1124.5, "ancla": 343.2}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 1143, "ref": 1007.5, "ancla": 690.8}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_1/20_caida.webp", "mira": "der", "pie": 838, "ref": 1072.5, "ancla": 639.0}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_1/21_sentado.webp", "mira": "der", "pie": 1075, "ref": 1280.5, "ancla": 644.5}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_1/22_suelo.webp", "mira": "der", "pie": 553, "ref": 1564.8, "ancla": 890.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_1/23_bloqueo.webp", "mira": "der", "pie": 1197, "ref": 1157.0, "ancla": 478.4}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_1/24_choripan_recoger.webp", "mira": "der", "pie": 1157, "ref": 1839.5, "ancla": 489.0}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_1/25_choripan_sostener.webp", "mira": "der", "pie": 1480, "ref": 1293.5, "ancla": 408.9}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_1/26_choripan_comer.webp", "mira": "der", "pie": 1200, "ref": 1118.0, "ancla": 484.6}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_1/27_choripan_bajar.webp", "mira": "der", "pie": 1652, "ref": 1423.5, "ancla": 447.4}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_1/28_levantarse.webp", "mira": "der", "pie": 1002, "ref": 1410.5, "ancla": 498.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_2/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 777.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 920.9}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 921.6}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 900.3}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 635.6}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 614.3}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 614.8}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 796.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 804.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 739.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 772.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 763.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1152, "ref": 1206.9, "ancla": 362.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1171, "ref": 1300, "ancla": 438.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1122, "ref": 1174.1, "ancla": 356.0}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_2/17_pina.webp", "mira": "der", "pie": 1183, "ref": 1085.5, "ancla": 506.0}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_2/18_patada.webp", "mira": "der", "pie": 1179, "ref": 1085.5, "ancla": 454.0}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 1214, "ref": 1300, "ancla": 606.0}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_2/20_caida.webp", "mira": "der", "pie": 734, "ref": 1053.0, "ancla": 630.5}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_2/21_sentado.webp", "mira": "der", "pie": 1034, "ref": 1345.5, "ancla": 610.5}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_2/22_suelo.webp", "mira": "der", "pie": 675, "ref": 1542.5, "ancla": 878.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_2/23_bloqueo.webp", "mira": "der", "pie": 1174, "ref": 1144.0, "ancla": 519.0}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_2/24_choripan_recoger.webp", "mira": "der", "pie": 1064, "ref": 1657.5, "ancla": 524.0}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_2/25_choripan_sostener.webp", "mira": "der", "pie": 1465, "ref": 1358.5, "ancla": 529.6}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_2/26_choripan_comer.webp", "mira": "der", "pie": 1226, "ref": 1163.5, "ancla": 451.9}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_2/27_choripan_bajar.webp", "mira": "der", "pie": 1221, "ref": 1144.0, "ancla": 502.2}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_2/28_levantarse.webp", "mira": "der", "pie": 957, "ref": 1391.0, "ancla": 548.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_3/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 750.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 760.2}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 747.3}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 751.8}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 783.4}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 787.9}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 775.5}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 780.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 784.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 755.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 779.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 762.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 756.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1183, "ref": 1054.7, "ancla": 148.5}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1139, "ref": 1332.5, "ancla": 462.2}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1167, "ref": 1098.5, "ancla": 341.2}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_3/17_pina.webp", "mira": "der", "pie": 1164, "ref": 1124.5, "ancla": 454.4}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_3/18_patada.webp", "mira": "der", "pie": 1171, "ref": 1111.5, "ancla": 355.6}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 1149, "ref": 1137.5, "ancla": 686.6}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_3/20_caida.webp", "mira": "der", "pie": 850, "ref": 1092.0, "ancla": 630.5}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_3/21_sentado.webp", "mira": "der", "pie": 908, "ref": 1332.5, "ancla": 653.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_3/22_suelo.webp", "mira": "der", "pie": 573, "ref": 1743.2, "ancla": 986.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_3/23_bloqueo.webp", "mira": "der", "pie": 1161, "ref": 1124.5, "ancla": 503.3}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_3/24_choripan_recoger.webp", "mira": "der", "pie": 923, "ref": 1436.5, "ancla": 555.5}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_3/25_choripan_sostener.webp", "mira": "der", "pie": 1383, "ref": 1144.0, "ancla": 320.4}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_3/26_choripan_comer.webp", "mira": "der", "pie": 1218, "ref": 1092.0, "ancla": 465.1}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_3/27_choripan_bajar.webp", "mira": "der", "pie": 1645, "ref": 1378.0, "ancla": 381.4}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_3/28_levantarse.webp", "mira": "der", "pie": 1045, "ref": 1449.5, "ancla": 545.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_4/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 765.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 800.7}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 777.5}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 767.9}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 766.7}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 756.5}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 733.7}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 790.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 760.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 765.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 775.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1192, "ref": 1063.0, "ancla": 507.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1129, "ref": 1254.5, "ancla": 338.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1148, "ref": 1022.2, "ancla": 615.0}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_4/17_pina.webp", "mira": "der", "pie": 1195, "ref": 1157.0, "ancla": 498.3}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_4/18_patada.webp", "mira": "der", "pie": 1136, "ref": 1072.5, "ancla": 333.2}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1166, "ref": 1027.0, "ancla": 708.3}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_4/20_caida.webp", "mira": "der", "pie": 874, "ref": 1196.0, "ancla": 630.0}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_4/21_sentado.webp", "mira": "der", "pie": 939, "ref": 1313.0, "ancla": 654.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_4/22_suelo.webp", "mira": "der", "pie": 501, "ref": 1495.1, "ancla": 852.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_4/23_bloqueo.webp", "mira": "der", "pie": 1163, "ref": 1092.0, "ancla": 543.3}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_4/24_choripan_recoger.webp", "mira": "der", "pie": 1022, "ref": 1560.0, "ancla": 564.5}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_4/25_choripan_sostener.webp", "mira": "der", "pie": 1373, "ref": 1287.0, "ancla": 319.4}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_4/26_choripan_comer.webp", "mira": "der", "pie": 1206, "ref": 1202.5, "ancla": 489.9}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_4/27_choripan_bajar.webp", "mira": "der", "pie": 1376, "ref": 1313.0, "ancla": 318.8}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_4/28_levantarse.webp", "mira": "der", "pie": 993, "ref": 1443.0, "ancla": 607.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_5/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 785.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 835.9}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 807.0}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 836.7}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 698.9}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 728.9}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 700.0}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 793.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 793.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 742.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 777.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 762.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 758.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1171, "ref": 1043.5, "ancla": 530.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1202, "ref": 1218.6, "ancla": 411.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1161, "ref": 1034.2, "ancla": 552.0}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_5/17_pina.webp", "mira": "der", "pie": 1179, "ref": 1092.0, "ancla": 514.0}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_5/18_patada.webp", "mira": "der", "pie": 1152, "ref": 1007.5, "ancla": 452.0}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 1238, "ref": 1241.5, "ancla": 831.5}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_5/20_caida.webp", "mira": "der", "pie": 777, "ref": 1085.5, "ancla": 630.0}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_5/21_sentado.webp", "mira": "der", "pie": 1066, "ref": 1410.5, "ancla": 647.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_5/22_suelo.webp", "mira": "der", "pie": 598, "ref": 1562.0, "ancla": 888.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_5/23_bloqueo.webp", "mira": "der", "pie": 1184, "ref": 1170.0, "ancla": 533.0}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_5/24_choripan_recoger.webp", "mira": "der", "pie": 1110, "ref": 1553.5, "ancla": 562.5}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_5/25_choripan_sostener.webp", "mira": "der", "pie": 1408, "ref": 1267.5, "ancla": 556.7}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_5/26_choripan_comer.webp", "mira": "der", "pie": 1203, "ref": 1150.5, "ancla": 470.1}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_5/27_choripan_bajar.webp", "mira": "der", "pie": 1404, "ref": 1274.0, "ancla": 452.9}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_5/28_levantarse.webp", "mira": "der", "pie": 1010, "ref": 1332.5, "ancla": 579.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_6/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 792.7}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 773.0}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 778.4}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 755.8}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 762.7}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 742.2}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 781.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 792.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 754.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 778.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 757.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1148, "ref": 1022.2, "ancla": 551.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1184, "ref": 1300, "ancla": 354.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1165, "ref": 968.5, "ancla": 205.7}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_6/17_pina.webp", "mira": "der", "pie": 1166, "ref": 1085.5, "ancla": 490.5}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_6/18_patada.webp", "mira": "der", "pie": 1172, "ref": 1131.0, "ancla": 339.4}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1163, "ref": 1040.0, "ancla": 399.4}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_6/20_caida.webp", "mira": "der", "pie": 852, "ref": 981.5, "ancla": 608.5}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_6/21_sentado.webp", "mira": "der", "pie": 967, "ref": 1300, "ancla": 612.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_6/22_suelo.webp", "mira": "der", "pie": 625, "ref": 1537.0, "ancla": 875.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_6/23_bloqueo.webp", "mira": "der", "pie": 1177, "ref": 1150.5, "ancla": 474.6}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_6/24_choripan_recoger.webp", "mira": "der", "pie": 1159, "ref": 1586.0, "ancla": 538.5}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_6/25_choripan_sostener.webp", "mira": "der", "pie": 1445, "ref": 1235.0, "ancla": 454.0}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_6/26_choripan_comer.webp", "mira": "der", "pie": 1254, "ref": 1118.0, "ancla": 467.0}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_6/27_choripan_bajar.webp", "mira": "der", "pie": 1447, "ref": 1267.5, "ancla": 452.7}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_6/28_levantarse.webp", "mira": "der", "pie": 1065, "ref": 1449.5, "ancla": 534.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_7/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 759.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 747.7}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 768.2}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 765.5}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 769.5}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 767.2}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 787.3}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 790.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 787.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 745.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 756.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 779.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1220, "ref": 1089.1, "ancla": 250.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 1146, "ref": 1092.0, "ancla": 391.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 1206, "ref": 981.5, "ancla": 317.1}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_7/17_pina.webp", "mira": "der", "pie": 1210, "ref": 1228.5, "ancla": 522.6}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_7/18_patada.webp", "mira": "der", "pie": 1209, "ref": 1202.5, "ancla": 343.9}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 1169, "ref": 1147.1, "ancla": 449.6}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_7/20_caida.webp", "mira": "der", "pie": 857, "ref": 1111.5, "ancla": 653.0}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_7/21_sentado.webp", "mira": "der", "pie": 1067, "ref": 1137.5, "ancla": 626.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_7/22_suelo.webp", "mira": "der", "pie": 559, "ref": 1572.3, "ancla": 894.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_7/23_bloqueo.webp", "mira": "der", "pie": 1168, "ref": 1209.0, "ancla": 506.9}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_7/24_choripan_recoger.webp", "mira": "der", "pie": 1193, "ref": 1885.0, "ancla": 581.0}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_7/25_choripan_sostener.webp", "mira": "der", "pie": 1420, "ref": 1163.5, "ancla": 341.4}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_7/26_choripan_comer.webp", "mira": "der", "pie": 1191, "ref": 1124.5, "ancla": 498.9}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_7/27_choripan_bajar.webp", "mira": "der", "pie": 1206, "ref": 1144.0, "ancla": 503.5}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_7/28_levantarse.webp", "mira": "der", "pie": 1091, "ref": 1560.0, "ancla": 564.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_8/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 755.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 800.6}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 749.6}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 792.2}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 742.6}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 785.1}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 734.9}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 790.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 783.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 745.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 763.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1186, "ref": 1057.5, "ancla": 549.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1124, "ref": 1196.0, "ancla": 463.8}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1118, "ref": 994.5, "ancla": 313.7}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_8/17_pina.webp", "mira": "der", "pie": 1170, "ref": 1124.5, "ancla": 454.1}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_8/18_patada.webp", "mira": "der", "pie": 1147, "ref": 1105.0, "ancla": 327.6}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 1255, "ref": 1105.0, "ancla": 729.8}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_8/20_caida.webp", "mira": "der", "pie": 894, "ref": 1085.5, "ancla": 629.0}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_8/21_sentado.webp", "mira": "der", "pie": 894, "ref": 1215.5, "ancla": 643.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_8/22_suelo.webp", "mira": "der", "pie": 548, "ref": 1453.3, "ancla": 830.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_8/23_bloqueo.webp", "mira": "der", "pie": 1164, "ref": 1183.0, "ancla": 518.0}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_8/24_choripan_recoger.webp", "mira": "der", "pie": 1200, "ref": 1859.0, "ancla": 594.0}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_8/25_choripan_sostener.webp", "mira": "der", "pie": 1396, "ref": 1254.5, "ancla": 381.1}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_8/26_choripan_comer.webp", "mira": "der", "pie": 1232, "ref": 1150.5, "ancla": 476.8}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_8/27_choripan_bajar.webp", "mira": "der", "pie": 1414, "ref": 1293.5, "ancla": 389.6}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_8/28_levantarse.webp", "mira": "der", "pie": 1072, "ref": 1456.0, "ancla": 565.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chicago_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chicago/barra_10/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 748.0}, "camDA": {"src": "assets/enemigos/clubes/chicago/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 795.1}, "camDP": {"src": "assets/enemigos/clubes/chicago/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 765.5}, "camDB": {"src": "assets/enemigos/clubes/chicago/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 787.4}, "camIA": {"src": "assets/enemigos/clubes/chicago/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 747.5}, "camIP": {"src": "assets/enemigos/clubes/chicago/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 768.3}, "camIB": {"src": "assets/enemigos/clubes/chicago/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 739.2}, "camFA": {"src": "assets/enemigos/clubes/chicago/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 800.0}, "camFP": {"src": "assets/enemigos/clubes/chicago/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 799.0}, "camFB": {"src": "assets/enemigos/clubes/chicago/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 735.0}, "camEA": {"src": "assets/enemigos/clubes/chicago/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camEP": {"src": "assets/enemigos/clubes/chicago/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 765.0}, "camEB": {"src": "assets/enemigos/clubes/chicago/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 782.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chicago/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1203, "ref": 1073.3, "ancla": 291.2}, "reaccion_b": {"src": "assets/enemigos/clubes/chicago/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 1147, "ref": 1160.5, "ancla": 435.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chicago/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1215, "ref": 1154.7, "ancla": 363.0}, "pina": {"src": "assets/enemigos/clubes/chicago/barra_10/17_pina.webp", "mira": "der", "pie": 1177, "ref": 1157.0, "ancla": 473.5}, "patada": {"src": "assets/enemigos/clubes/chicago/barra_10/18_patada.webp", "mira": "der", "pie": 1188, "ref": 1163.5, "ancla": 456.5}, "deseq_a": {"src": "assets/enemigos/clubes/chicago/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 1143, "ref": 1007.5, "ancla": 397.3}, "deseq_b": {"src": "assets/enemigos/clubes/chicago/barra_10/20_caida.webp", "mira": "der", "pie": 973, "ref": 1144.0, "ancla": 632.5}, "sentado": {"src": "assets/enemigos/clubes/chicago/barra_10/21_sentado.webp", "mira": "der", "pie": 1033, "ref": 1072.5, "ancla": 611.0}, "suelo": {"src": "assets/enemigos/clubes/chicago/barra_10/22_suelo.webp", "mira": "der", "pie": 558, "ref": 1577.8, "ancla": 897.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chicago/barra_10/23_bloqueo.webp", "mira": "der", "pie": 1162, "ref": 1111.5, "ancla": 499.0}, "carton1": {"src": "assets/enemigos/clubes/chicago/barra_10/24_choripan_recoger.webp", "mira": "der", "pie": 1236, "ref": 1716.0, "ancla": 585.0}, "carton2": {"src": "assets/enemigos/clubes/chicago/barra_10/25_choripan_sostener.webp", "mira": "der", "pie": 1410, "ref": 1391.0, "ancla": 475.6}, "carton3": {"src": "assets/enemigos/clubes/chicago/barra_10/26_choripan_comer.webp", "mira": "der", "pie": 1219, "ref": 1189.5, "ancla": 435.3}, "carton4": {"src": "assets/enemigos/clubes/chicago/barra_10/27_choripan_bajar.webp", "mira": "der", "pie": 1444, "ref": 1501.5, "ancla": 491.5}, "levantarse": {"src": "assets/enemigos/clubes/chicago/barra_10/28_levantarse.webp", "mira": "der", "pie": 997, "ref": 1436.5, "ancla": 556.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}});
/* v101 MORON Y CHICAGO — fin */

/* v104 LAFERRERE — inicio (generado por t104/npc104.py).
   LAFERRERE «Villero 1…8 y 10» (personajes/LAFERRERE/VILLEROS_ORIGINALES_v1, entrega completa de 252 PNG), 28 poses cada uno. No existe el 9.
   IDs laferrere_NN (carpetas barra_N). Caminatas propias: derecha 02 → 03 → 04 → 03, izquierda 05 → 06 → 07 → 06, frente 08 → 09 → 10 → 09,
   espalda 11 → 12 → 13 → 12, 180 ms por cuadro. Reacciones 14/15/16, piña 17, patada 18, bloqueo 23; derrota 19 → 20 → 22; se levantan por 28.
   Las poses 24–27 (cartón TORO) quedan registradas: los barras comunes no se recuperan en el juego. */
Object.assign(window.SPRITES_ENEMIGOS, {"laferrere_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_1/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 735.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 812.6}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 808.7}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 813.4}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 720.5}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 725.7}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 722.1}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 809.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 801.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 726.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 756.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 773.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 779.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1182, "ref": 1053.8, "ancla": 462.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1117, "ref": 1300, "ancla": 377.0}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1170, "ref": 1042.6, "ancla": 643.0}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_1/17_pina.webp", "mira": "der", "pie": 1200, "ref": 1144.0, "ancla": 494.0}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_1/18_patada.webp", "mira": "der", "pie": 1179, "ref": 1170.0, "ancla": 357.5}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 1177, "ref": 1079.0, "ancla": 669.7}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_1/20_caida.webp", "mira": "der", "pie": 850, "ref": 1105.0, "ancla": 630.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_1/21_sentado.webp", "mira": "der", "pie": 1030, "ref": 1222.0, "ancla": 646.5}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_1/22_suelo.webp", "mira": "der", "pie": 598, "ref": 1588.1, "ancla": 904.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_1/23_bloqueo.webp", "mira": "der", "pie": 1199, "ref": 1124.5, "ancla": 462.5}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_1/24_carton_recoger.webp", "mira": "der", "pie": 1088, "ref": 1371.5, "ancla": 523.0}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_1/25_carton_sostener.webp", "mira": "der", "pie": 1220, "ref": 1092.0, "ancla": 387.0}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_1/26_carton_beber.webp", "mira": "der", "pie": 1520, "ref": 1300, "ancla": 533.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_1/27_carton_bajar.webp", "mira": "der", "pie": 1531, "ref": 1345.5, "ancla": 494.5}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_1/28_levantarse.webp", "mira": "der", "pie": 1089, "ref": 1527.5, "ancla": 572.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_2/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 776.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 921.9}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 891.1}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 734.0}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 801.0}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 642.7}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 612.4}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 803.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 800.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 732.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 759.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 772.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 776.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1185, "ref": 1056.5, "ancla": 483.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1073, "ref": 1082.3, "ancla": 406.0}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1188, "ref": 1059.3, "ancla": 463.0}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_2/17_pina.webp", "mira": "der", "pie": 1201, "ref": 1189.5, "ancla": 531.0}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_2/18_patada.webp", "mira": "der", "pie": 1188, "ref": 1079.0, "ancla": 484.0}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 1197, "ref": 1300, "ancla": 507.0}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_2/20_caida.webp", "mira": "der", "pie": 931, "ref": 1124.5, "ancla": 651.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_2/21_sentado.webp", "mira": "der", "pie": 1042, "ref": 1293.5, "ancla": 635.0}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_2/22_suelo.webp", "mira": "der", "pie": 591, "ref": 1541.6, "ancla": 877.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_2/23_bloqueo.webp", "mira": "der", "pie": 1093, "ref": 1059.5, "ancla": 470.0}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_2/24_carton_recoger.webp", "mira": "der", "pie": 1212, "ref": 1586.0, "ancla": 507.0}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_2/25_carton_sostener.webp", "mira": "der", "pie": 1491, "ref": 1306.5, "ancla": 456.9}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_2/26_carton_beber.webp", "mira": "der", "pie": 1267, "ref": 1300, "ancla": 481.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_2/27_carton_bajar.webp", "mira": "der", "pie": 1456, "ref": 1306.5, "ancla": 470.3}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_2/28_levantarse.webp", "mira": "der", "pie": 1035, "ref": 1410.5, "ancla": 626.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_3/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 747.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 739.3}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 750.9}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 736.0}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 800.1}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 784.7}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 794.7}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 782.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 785.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1184, "ref": 1055.6, "ancla": 225.1}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1177, "ref": 1358.5, "ancla": 532.7}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1220, "ref": 1089.1, "ancla": 201.2}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_3/17_pina.webp", "mira": "der", "pie": 1182, "ref": 1098.5, "ancla": 476.4}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_3/18_patada.webp", "mira": "der", "pie": 1167, "ref": 1079.0, "ancla": 448.3}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 1192, "ref": 1046.5, "ancla": 623.8}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_3/20_caida.webp", "mira": "der", "pie": 727, "ref": 1072.5, "ancla": 640.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_3/21_sentado.webp", "mira": "der", "pie": 1003, "ref": 1371.5, "ancla": 654.0}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_3/22_suelo.webp", "mira": "der", "pie": 505, "ref": 1614.1, "ancla": 916.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_3/23_bloqueo.webp", "mira": "der", "pie": 1148, "ref": 1053.0, "ancla": 462.0}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_3/24_carton_recoger.webp", "mira": "der", "pie": 1144, "ref": 1501.5, "ancla": 525.5}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_3/25_carton_sostener.webp", "mira": "der", "pie": 1376, "ref": 1235.0, "ancla": 401.7}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_3/26_carton_beber.webp", "mira": "der", "pie": 1501, "ref": 1092.0, "ancla": 553.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_3/27_carton_bajar.webp", "mira": "der", "pie": 1367, "ref": 1189.5, "ancla": 374.0}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_3/28_levantarse.webp", "mira": "der", "pie": 1034, "ref": 1449.5, "ancla": 523.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_4/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 770.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 807.8}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 779.7}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 794.1}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 741.6}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 755.4}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 727.9}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 776.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 796.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 759.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 770.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 757.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 765.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1236, "ref": 1103.9, "ancla": 535.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1155, "ref": 1267.5, "ancla": 369.0}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1205, "ref": 1124.5, "ancla": 527.0}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_4/17_pina.webp", "mira": "der", "pie": 1180, "ref": 1072.5, "ancla": 478.7}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_4/18_patada.webp", "mira": "der", "pie": 1217, "ref": 1170.0, "ancla": 354.7}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1145, "ref": 1027.0, "ancla": 714.3}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_4/20_caida.webp", "mira": "der", "pie": 764, "ref": 1124.5, "ancla": 607.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_4/21_sentado.webp", "mira": "der", "pie": 904, "ref": 1235.0, "ancla": 625.5}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_4/22_suelo.webp", "mira": "der", "pie": 480, "ref": 1539.7, "ancla": 876.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_4/23_bloqueo.webp", "mira": "der", "pie": 1186, "ref": 1066.0, "ancla": 515.8}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_4/24_carton_recoger.webp", "mira": "der", "pie": 1175, "ref": 1560.0, "ancla": 551.5}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_4/25_carton_sostener.webp", "mira": "der", "pie": 1466, "ref": 1241.5, "ancla": 417.2}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_4/26_carton_beber.webp", "mira": "der", "pie": 1548, "ref": 1300, "ancla": 530.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_4/27_carton_bajar.webp", "mira": "der", "pie": 1245, "ref": 1085.5, "ancla": 399.9}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_4/28_levantarse.webp", "mira": "der", "pie": 1044, "ref": 1417.0, "ancla": 565.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_5/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 787.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 862.8}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 822.3}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 878.5}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 655.3}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 712.1}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 672.5}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 795.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 798.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 740.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 779.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 767.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 756.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1175, "ref": 1047.2, "ancla": 534.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1171, "ref": 1176.5, "ancla": 292.0}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1198, "ref": 1068.6, "ancla": 566.0}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_5/17_pina.webp", "mira": "der", "pie": 1179, "ref": 1157.0, "ancla": 498.0}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_5/18_patada.webp", "mira": "der", "pie": 1174, "ref": 1085.5, "ancla": 504.0}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 1130, "ref": 1040.0, "ancla": 735.0}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_5/20_caida.webp", "mira": "der", "pie": 996, "ref": 936.0, "ancla": 628.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_5/21_sentado.webp", "mira": "der", "pie": 1016, "ref": 1137.5, "ancla": 616.0}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_5/22_suelo.webp", "mira": "der", "pie": 624, "ref": 1545.3, "ancla": 879.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_5/23_bloqueo.webp", "mira": "der", "pie": 1230, "ref": 1202.5, "ancla": 537.0}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_5/24_carton_recoger.webp", "mira": "der", "pie": 1125, "ref": 1430.0, "ancla": 526.0}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_5/25_carton_sostener.webp", "mira": "der", "pie": 1357, "ref": 1209.0, "ancla": 497.8}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_5/26_carton_beber.webp", "mira": "der", "pie": 1346, "ref": 929.5, "ancla": 529.7}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_5/27_carton_bajar.webp", "mira": "der", "pie": 1360, "ref": 1248.0, "ancla": 468.7}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_5/28_levantarse.webp", "mira": "der", "pie": 990, "ref": 1384.5, "ancla": 562.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_6/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 755.5}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 784.2}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 765.4}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 782.7}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 753.5}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 769.2}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 751.8}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 781.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 791.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 754.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 775.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 770.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 760.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1227, "ref": 1095.6, "ancla": 483.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1112, "ref": 1280.5, "ancla": 561.6}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1164, "ref": 1037.0, "ancla": 292.5}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_6/17_pina.webp", "mira": "der", "pie": 1212, "ref": 1144.0, "ancla": 456.6}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_6/18_patada.webp", "mira": "der", "pie": 1157, "ref": 1098.5, "ancla": 536.4}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1177, "ref": 1059.5, "ancla": 756.9}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_6/20_caida.webp", "mira": "der", "pie": 940, "ref": 1183.0, "ancla": 772.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_6/21_sentado.webp", "mira": "der", "pie": 1012, "ref": 1118.0, "ancla": 616.0}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_6/22_suelo.webp", "mira": "der", "pie": 626, "ref": 1622.4, "ancla": 921.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_6/23_bloqueo.webp", "mira": "der", "pie": 1187, "ref": 1189.5, "ancla": 527.9}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_6/24_carton_recoger.webp", "mira": "der", "pie": 1189, "ref": 1605.5, "ancla": 524.0}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_6/25_carton_sostener.webp", "mira": "der", "pie": 1337, "ref": 1196.0, "ancla": 433.0}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_6/26_carton_beber.webp", "mira": "der", "pie": 1467, "ref": 1085.5, "ancla": 534.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_6/27_carton_bajar.webp", "mira": "der", "pie": 1535, "ref": 1358.5, "ancla": 498.5}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_6/28_levantarse.webp", "mira": "der", "pie": 1039, "ref": 1449.5, "ancla": 522.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_7/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 747.2}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 775.9}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 769.5}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 766.3}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 759.6}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 786.8}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 792.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 798.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 743.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 758.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 777.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1231, "ref": 1099.3, "ancla": 525.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 1153, "ref": 1059.5, "ancla": 395.0}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 1172, "ref": 1044.5, "ancla": 310.9}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_7/17_pina.webp", "mira": "der", "pie": 1203, "ref": 1170.0, "ancla": 521.7}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_7/18_patada.webp", "mira": "der", "pie": 1166, "ref": 1131.0, "ancla": 403.8}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 1203, "ref": 1072.5, "ancla": 710.4}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_7/20_caida.webp", "mira": "der", "pie": 880, "ref": 981.5, "ancla": 656.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_7/21_sentado.webp", "mira": "der", "pie": 1057, "ref": 1209.0, "ancla": 637.5}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_7/22_suelo.webp", "mira": "der", "pie": 556, "ref": 1565.8, "ancla": 890.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_7/23_bloqueo.webp", "mira": "der", "pie": 1176, "ref": 1085.5, "ancla": 511.9}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_7/24_carton_recoger.webp", "mira": "der", "pie": 1122, "ref": 1488.5, "ancla": 480.5}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_7/25_carton_sostener.webp", "mira": "der", "pie": 1475, "ref": 1241.5, "ancla": 445.5}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_7/26_carton_beber.webp", "mira": "der", "pie": 1583, "ref": 1157.0, "ancla": 565.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_7/27_carton_bajar.webp", "mira": "der", "pie": 1576, "ref": 1345.5, "ancla": 473.0}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_7/28_levantarse.webp", "mira": "der", "pie": 1119, "ref": 1449.5, "ancla": 542.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_8/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 752.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 791.1}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 759.9}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 785.3}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 749.5}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 774.6}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 744.6}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 774.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 791.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 783.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 752.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1188, "ref": 1057.5, "ancla": 460.0}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1199, "ref": 1313.0, "ancla": 503.4}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1149, "ref": 1092.0, "ancla": 285.6}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_8/17_pina.webp", "mira": "der", "pie": 1201, "ref": 1131.0, "ancla": 460.6}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_8/18_patada.webp", "mira": "der", "pie": 1183, "ref": 1098.5, "ancla": 292.9}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 1175, "ref": 1059.5, "ancla": 644.5}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_8/20_caida.webp", "mira": "der", "pie": 870, "ref": 1020.5, "ancla": 656.0}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_8/21_sentado.webp", "mira": "der", "pie": 1047, "ref": 1410.5, "ancla": 635.5}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_8/22_suelo.webp", "mira": "der", "pie": 613, "ref": 1563.9, "ancla": 889.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_8/23_bloqueo.webp", "mira": "der", "pie": 1139, "ref": 1059.5, "ancla": 462.3}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_8/24_carton_recoger.webp", "mira": "der", "pie": 1188, "ref": 1449.5, "ancla": 520.0}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_8/25_carton_sostener.webp", "mira": "der", "pie": 1459, "ref": 1222.0, "ancla": 463.1}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_8/26_carton_beber.webp", "mira": "der", "pie": 1517, "ref": 1059.5, "ancla": 534.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_8/27_carton_bajar.webp", "mira": "der", "pie": 1427, "ref": 1176.5, "ancla": 456.3}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_8/28_levantarse.webp", "mira": "der", "pie": 823, "ref": 1124.5, "ancla": 527.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "laferrere_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/laferrere/barra_10/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 751.0}, "camDA": {"src": "assets/enemigos/clubes/laferrere/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 809.5}, "camDP": {"src": "assets/enemigos/clubes/laferrere/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 762.8}, "camDB": {"src": "assets/enemigos/clubes/laferrere/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 797.8}, "camIA": {"src": "assets/enemigos/clubes/laferrere/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 737.9}, "camIP": {"src": "assets/enemigos/clubes/laferrere/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 772.9}, "camIB": {"src": "assets/enemigos/clubes/laferrere/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 724.5}, "camFA": {"src": "assets/enemigos/clubes/laferrere/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 811.0}, "camFP": {"src": "assets/enemigos/clubes/laferrere/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 793.0}, "camFB": {"src": "assets/enemigos/clubes/laferrere/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 724.0}, "camEA": {"src": "assets/enemigos/clubes/laferrere/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 757.0}, "camEP": {"src": "assets/enemigos/clubes/laferrere/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camEB": {"src": "assets/enemigos/clubes/laferrere/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 778.0}, "reaccion_a": {"src": "assets/enemigos/clubes/laferrere/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1175, "ref": 1047.2, "ancla": 344.1}, "reaccion_b": {"src": "assets/enemigos/clubes/laferrere/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 1110, "ref": 1121.4, "ancla": 360.0}, "reaccion_c": {"src": "assets/enemigos/clubes/laferrere/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1155, "ref": 1028.7, "ancla": 349.9}, "pina": {"src": "assets/enemigos/clubes/laferrere/barra_10/17_pina.webp", "mira": "der", "pie": 1164, "ref": 1131.0, "ancla": 502.8}, "patada": {"src": "assets/enemigos/clubes/laferrere/barra_10/18_patada.webp", "mira": "der", "pie": 1172, "ref": 1131.0, "ancla": 447.2}, "deseq_a": {"src": "assets/enemigos/clubes/laferrere/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 1134, "ref": 1079.0, "ancla": 667.5}, "deseq_b": {"src": "assets/enemigos/clubes/laferrere/barra_10/20_caida.webp", "mira": "der", "pie": 883, "ref": 1079.0, "ancla": 659.5}, "sentado": {"src": "assets/enemigos/clubes/laferrere/barra_10/21_sentado.webp", "mira": "der", "pie": 1039, "ref": 1066.0, "ancla": 651.5}, "suelo": {"src": "assets/enemigos/clubes/laferrere/barra_10/22_suelo.webp", "mira": "der", "pie": 598, "ref": 1567.6, "ancla": 891.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/laferrere/barra_10/23_bloqueo.webp", "mira": "der", "pie": 1186, "ref": 1150.5, "ancla": 511.8}, "carton1": {"src": "assets/enemigos/clubes/laferrere/barra_10/24_carton_recoger.webp", "mira": "der", "pie": 1149, "ref": 1508.0, "ancla": 583.0}, "carton2": {"src": "assets/enemigos/clubes/laferrere/barra_10/25_carton_sostener.webp", "mira": "der", "pie": 1282, "ref": 1209.0, "ancla": 492.3}, "carton3": {"src": "assets/enemigos/clubes/laferrere/barra_10/26_carton_beber.webp", "mira": "der", "pie": 1351, "ref": 1020.5, "ancla": 590.0}, "carton4": {"src": "assets/enemigos/clubes/laferrere/barra_10/27_carton_bajar.webp", "mira": "der", "pie": 1381, "ref": 1313.0, "ancla": 509.5}, "levantarse": {"src": "assets/enemigos/clubes/laferrere/barra_10/28_levantarse.webp", "mira": "der", "pie": 1047, "ref": 1365.0, "ancla": 576.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}});
/* v104 LAFERRERE — fin */

/* v139 CHACARITA — inicio (generado por t139/npc139.py + t139/ajuste.py).
   CHACARITA «Funebrero 1…8 y 10» (personajes/CHACARITA/FUNEBREROS_ORIGINALES_v1, 252 PNG), 28 poses cada uno. No existe el 9.
   IDs chacarita_NN (carpetas barra_N). Misma estructura que los Villeros (v104): caminatas 02-04 / 05-07 / 08-10 / 11-13, reacciones 14/15/16,
   piña 17, patada 18, bloqueo 23, derrota 19 → 20 → 22, se levantan por 28. Reacciones con escala de las poses de pelea del mismo barra (ajuste.txt).
   Las poses 24–27 (cartón TORO) quedan registradas: los barras comunes no se recuperan en el juego. */
Object.assign(window.SPRITES_ENEMIGOS, {"chacarita_01": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_1/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 726.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_1/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 808.7}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_1/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 815.3}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_1/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 833.8}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_1/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 701.8}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_1/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 720.2}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_1/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 726.0}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_1/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 804.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_1/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 797.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_1/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 731.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_1/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 759.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_1/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 759.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_1/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 776.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_1/14_reaccion_cabeza.webp", "mira": "der", "pie": 1363, "ref": 1153.8, "ancla": 564.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_1/15_reaccion_torso.webp", "mira": "der", "pie": 1330, "ref": 1153.8, "ancla": 339.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_1/16_reaccion_atras.webp", "mira": "der", "pie": 1272, "ref": 1153.8, "ancla": 595.0}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_1/17_pina.webp", "mira": "der", "pie": 1174, "ref": 1098.5, "ancla": 413.3}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_1/18_patada.webp", "mira": "der", "pie": 1182, "ref": 1189.5, "ancla": 360.3}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_1/19_desequilibrio.webp", "mira": "der", "pie": 1227, "ref": 1118.0, "ancla": 766.8}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_1/20_caida.webp", "mira": "der", "pie": 981, "ref": 1345.5, "ancla": 767.0}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_1/21_sentado.webp", "mira": "der", "pie": 1128, "ref": 1404.0, "ancla": 695.0}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_1/22_suelo.webp", "mira": "der", "pie": 633, "ref": 1930.0, "ancla": 1086.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_1/23_bloqueo.webp", "mira": "der", "pie": 1358, "ref": 1267.5, "ancla": 550.0}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_1/24_carton_recoger.webp", "mira": "der", "pie": 1294, "ref": 1937.0, "ancla": 565.0}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_1/25_carton_sostener.webp", "mira": "der", "pie": 1541, "ref": 1300, "ancla": 373.0}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_1/26_carton_beber.webp", "mira": "der", "pie": 1307, "ref": 1300, "ancla": 392.0}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_1/27_carton_bajar.webp", "mira": "der", "pie": 1648, "ref": 1423.5, "ancla": 445.2}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_1/28_levantarse.webp", "mira": "der", "pie": 1187, "ref": 1696.5, "ancla": 614.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_02": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_2/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 779.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_2/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 888.3}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_2/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 895.9}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_2/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 910.6}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_2/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 623.4}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_2/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 639.9}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_2/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 645.8}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_2/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 795.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_2/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 806.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_2/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 740.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_2/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_2/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_2/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 771.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_2/14_reaccion_cabeza.webp", "mira": "der", "pie": 1337, "ref": 1108.2, "ancla": 463.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_2/15_reaccion_torso.webp", "mira": "der", "pie": 1396, "ref": 1108.2, "ancla": 518.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_2/16_reaccion_atras.webp", "mira": "der", "pie": 1259, "ref": 1108.2, "ancla": 455.0}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_2/17_pina.webp", "mira": "der", "pie": 1152, "ref": 1111.5, "ancla": 549.0}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_2/18_patada.webp", "mira": "der", "pie": 1172, "ref": 1105.0, "ancla": 530.0}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_2/19_desequilibrio.webp", "mira": "der", "pie": 1230, "ref": 1118.0, "ancla": 665.0}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_2/20_caida.webp", "mira": "der", "pie": 904, "ref": 1280.5, "ancla": 804.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_2/21_sentado.webp", "mira": "der", "pie": 1133, "ref": 1449.5, "ancla": 672.0}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_2/22_suelo.webp", "mira": "der", "pie": 724, "ref": 1752.5, "ancla": 991.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_2/23_bloqueo.webp", "mira": "der", "pie": 1300, "ref": 1300.0, "ancla": 617.0}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_2/24_carton_recoger.webp", "mira": "der", "pie": 1251, "ref": 1300, "ancla": 575.5}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_2/25_carton_sostener.webp", "mira": "der", "pie": 1490, "ref": 1300, "ancla": 425.0}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_2/26_carton_beber.webp", "mira": "der", "pie": 1449, "ref": 1300, "ancla": 479.0}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_2/27_carton_bajar.webp", "mira": "der", "pie": 1492, "ref": 1475.5, "ancla": 540.5}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_2/28_levantarse.webp", "mira": "der", "pie": 1118, "ref": 1605.5, "ancla": 660.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_03": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_3/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 747.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_3/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 754.3}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_3/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 746.5}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_3/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 743.2}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_3/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 791.3}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_3/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 788.4}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_3/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 780.2}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_3/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 777.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_3/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 792.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_3/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 758.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_3/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 772.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_3/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 760.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_3/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 763.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_3/14_reaccion_cabeza.webp", "mira": "der", "pie": 1349, "ref": 1192.8, "ancla": 176.6}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_3/15_reaccion_torso.webp", "mira": "der", "pie": 1254, "ref": 1192.8, "ancla": 479.9}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_3/16_reaccion_atras.webp", "mira": "der", "pie": 1234, "ref": 1192.8, "ancla": 354.4}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_3/17_pina.webp", "mira": "der", "pie": 1160, "ref": 1176.5, "ancla": 446.9}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_3/18_patada.webp", "mira": "der", "pie": 1197, "ref": 1209.0, "ancla": 371.5}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_3/19_desequilibrio.webp", "mira": "der", "pie": 1157, "ref": 1170.0, "ancla": 695.3}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_3/20_caida.webp", "mira": "der", "pie": 954, "ref": 1332.5, "ancla": 757.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_3/21_sentado.webp", "mira": "der", "pie": 1030, "ref": 1534.0, "ancla": 741.5}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_3/22_suelo.webp", "mira": "der", "pie": 592, "ref": 1915.2, "ancla": 1080.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_3/23_bloqueo.webp", "mira": "der", "pie": 1293, "ref": 1267.5, "ancla": 553.6}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_3/24_carton_recoger.webp", "mira": "der", "pie": 1278, "ref": 1703.0, "ancla": 564.0}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_3/25_carton_sostener.webp", "mira": "der", "pie": 1520, "ref": 1345.5, "ancla": 303.8}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_3/26_carton_beber.webp", "mira": "der", "pie": 1419, "ref": 981.5, "ancla": 372.5}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_3/27_carton_bajar.webp", "mira": "der", "pie": 1534, "ref": 1345.5, "ancla": 339.4}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_3/28_levantarse.webp", "mira": "der", "pie": 1129, "ref": 1560.0, "ancla": 617.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_04": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_4/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 764.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_4/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 799.6}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_4/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 791.6}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_4/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 784.0}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_4/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 749.7}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_4/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 744.4}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_4/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 735.0}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_4/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 781.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_4/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 792.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_4/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 754.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_4/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 775.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_4/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 758.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_4/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 760.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_4/14_reaccion_cabeza.webp", "mira": "der", "pie": 1296, "ref": 1131.0, "ancla": 924.5}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_4/15_reaccion_torso.webp", "mira": "der", "pie": 1299, "ref": 1131.0, "ancla": 594.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_4/16_reaccion_atras.webp", "mira": "der", "pie": 1228, "ref": 1131.0, "ancla": 667.0}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_4/17_pina.webp", "mira": "der", "pie": 1160, "ref": 1131.0, "ancla": 520.7}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_4/18_patada.webp", "mira": "der", "pie": 1186, "ref": 1131.0, "ancla": 354.0}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_4/19_desequilibrio.webp", "mira": "der", "pie": 1220, "ref": 1105.0, "ancla": 752.4}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_4/20_caida.webp", "mira": "der", "pie": 982, "ref": 1410.5, "ancla": 746.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_4/21_sentado.webp", "mira": "der", "pie": 1041, "ref": 1482.0, "ancla": 724.0}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_4/22_suelo.webp", "mira": "der", "pie": 584, "ref": 1940.2, "ancla": 1092.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_4/23_bloqueo.webp", "mira": "der", "pie": 1197, "ref": 1131.0, "ancla": 576.3}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_4/24_carton_recoger.webp", "mira": "der", "pie": 1198, "ref": 1534.0, "ancla": 574.0}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_4/25_carton_sostener.webp", "mira": "der", "pie": 1472, "ref": 1280.5, "ancla": 625.5}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_4/26_carton_beber.webp", "mira": "der", "pie": 1257, "ref": 1124.5, "ancla": 638.1}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_4/27_carton_bajar.webp", "mira": "der", "pie": 1540, "ref": 1332.5, "ancla": 690.9}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_4/28_levantarse.webp", "mira": "der", "pie": 1092, "ref": 1605.5, "ancla": 678.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_05": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_5/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 790.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_5/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 854.4}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_5/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 836.6}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_5/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 884.2}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_5/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 650.6}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_5/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 697.3}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_5/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 681.7}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_5/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 794.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_5/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 793.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_5/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 741.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_5/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 780.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_5/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 761.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_5/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 755.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_5/14_reaccion_cabeza.webp", "mira": "der", "pie": 1241, "ref": 1105.0, "ancla": 568.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_5/15_reaccion_torso.webp", "mira": "der", "pie": 1366, "ref": 1105.0, "ancla": 492.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_5/16_reaccion_atras.webp", "mira": "der", "pie": 1223, "ref": 1105.0, "ancla": 799.5}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_5/17_pina.webp", "mira": "der", "pie": 1196, "ref": 1105.0, "ancla": 541.0}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_5/18_patada.webp", "mira": "der", "pie": 1187, "ref": 1105.0, "ancla": 507.0}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_5/19_desequilibrio.webp", "mira": "der", "pie": 1220, "ref": 1046.5, "ancla": 827.4}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_5/20_caida.webp", "mira": "der", "pie": 938, "ref": 1358.5, "ancla": 787.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_5/21_sentado.webp", "mira": "der", "pie": 1123, "ref": 1332.5, "ancla": 698.5}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_5/22_suelo.webp", "mira": "der", "pie": 651, "ref": 1825.0, "ancla": 1030.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_5/23_bloqueo.webp", "mira": "der", "pie": 1241, "ref": 1267.5, "ancla": 578.0}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_5/24_carton_recoger.webp", "mira": "der", "pie": 1278, "ref": 1716.0, "ancla": 589.0}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_5/25_carton_sostener.webp", "mira": "der", "pie": 1475, "ref": 1300, "ancla": 411.0}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_5/26_carton_beber.webp", "mira": "der", "pie": 1377, "ref": 1300, "ancla": 443.0}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_5/27_carton_bajar.webp", "mira": "der", "pie": 1476, "ref": 1027.0, "ancla": 549.0}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_5/28_levantarse.webp", "mira": "der", "pie": 1096, "ref": 1547.0, "ancla": 648.5}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_06": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_6/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_6/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 765.7}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_6/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 767.2}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_6/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 780.5}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_6/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 754.2}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_6/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 768.1}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_6/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 768.9}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_6/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 775.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_6/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 788.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_6/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 760.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_6/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 778.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_6/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 766.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_6/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 757.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_6/14_reaccion_cabeza.webp", "mira": "der", "pie": 1290, "ref": 1192.8, "ancla": 609.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_6/15_reaccion_torso.webp", "mira": "der", "pie": 1460, "ref": 1192.8, "ancla": 437.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_6/16_reaccion_atras.webp", "mira": "der", "pie": 1308, "ref": 1192.8, "ancla": 236.8}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_6/17_pina.webp", "mira": "der", "pie": 1260, "ref": 1170.0, "ancla": 559.7}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_6/18_patada.webp", "mira": "der", "pie": 1186, "ref": 1215.5, "ancla": 331.0}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_6/19_desequilibrio.webp", "mira": "der", "pie": 1192, "ref": 1072.5, "ancla": 423.1}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_6/20_caida.webp", "mira": "der", "pie": 998, "ref": 1183.0, "ancla": 737.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_6/21_sentado.webp", "mira": "der", "pie": 1088, "ref": 1170.0, "ancla": 692.0}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_6/22_suelo.webp", "mira": "der", "pie": 675, "ref": 1775.8, "ancla": 1003.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_6/23_bloqueo.webp", "mira": "der", "pie": 1324, "ref": 1300.0, "ancla": 550.8}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_6/24_carton_recoger.webp", "mira": "der", "pie": 1193, "ref": 1859.0, "ancla": 608.5}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_6/25_carton_sostener.webp", "mira": "der", "pie": 1520, "ref": 1306.5, "ancla": 387.0}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_6/26_carton_beber.webp", "mira": "der", "pie": 1505, "ref": 1313.0, "ancla": 414.3}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_6/27_carton_bajar.webp", "mira": "der", "pie": 1571, "ref": 1384.5, "ancla": 412.8}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_6/28_levantarse.webp", "mira": "der", "pie": 1108, "ref": 1547.0, "ancla": 583.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_07": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_7/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_7/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 747.2}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_7/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 766.4}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_7/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 787.0}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_7/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 748.1}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_7/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 768.0}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_7/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 787.3}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_7/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 797.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_7/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 800.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_7/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 738.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_7/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 758.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_7/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 769.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_7/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 777.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_7/14_reaccion_cabeza.webp", "mira": "der", "pie": 1355, "ref": 1215.5, "ancla": 594.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_7/15_reaccion_torso.webp", "mira": "der", "pie": 1405, "ref": 1215.5, "ancla": 482.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_7/16_reaccion_atras.webp", "mira": "der", "pie": 1200, "ref": 1215.5, "ancla": 315.3}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_7/17_pina.webp", "mira": "der", "pie": 1183, "ref": 1241.5, "ancla": 512.4}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_7/18_patada.webp", "mira": "der", "pie": 1189, "ref": 1189.5, "ancla": 415.7}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_7/19_desequilibrio.webp", "mira": "der", "pie": 1209, "ref": 1085.5, "ancla": 440.0}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_7/20_caida.webp", "mira": "der", "pie": 945, "ref": 1267.5, "ancla": 766.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_7/21_sentado.webp", "mira": "der", "pie": 1120, "ref": 1235.0, "ancla": 671.5}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_7/22_suelo.webp", "mira": "der", "pie": 637, "ref": 1756.3, "ancla": 993.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_7/23_bloqueo.webp", "mira": "der", "pie": 1302, "ref": 1293.5, "ancla": 567.0}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_7/24_carton_recoger.webp", "mira": "der", "pie": 1267, "ref": 1566.5, "ancla": 583.5}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_7/25_carton_sostener.webp", "mira": "der", "pie": 1585, "ref": 851.5, "ancla": 132.4}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_7/26_carton_beber.webp", "mira": "der", "pie": 1495, "ref": 773.5, "ancla": 126.1}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_7/27_carton_bajar.webp", "mira": "der", "pie": 1703, "ref": 1150.5, "ancla": 452.0}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_7/28_levantarse.webp", "mira": "der", "pie": 1178, "ref": 1683.5, "ancla": 613.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_08": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_8/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 753.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_8/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 794.9}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_8/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 779.2}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_8/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 808.1}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_8/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 727.5}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_8/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 755.9}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_8/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 739.4}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_8/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 773.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_8/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 787.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_8/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 762.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_8/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 786.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_8/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 765.0}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_8/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 749.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_8/14_reaccion_cabeza.webp", "mira": "der", "pie": 1316, "ref": 1134.2, "ancla": 627.0}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_8/15_reaccion_torso.webp", "mira": "der", "pie": 1312, "ref": 1134.2, "ancla": 536.8}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_8/16_reaccion_atras.webp", "mira": "der", "pie": 1171, "ref": 1134.2, "ancla": 321.0}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_8/17_pina.webp", "mira": "der", "pie": 1259, "ref": 1196.0, "ancla": 498.3}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_8/18_patada.webp", "mira": "der", "pie": 1198, "ref": 1131.0, "ancla": 340.6}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_8/19_desequilibrio.webp", "mira": "der", "pie": 1267, "ref": 1131.0, "ancla": 771.7}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_8/20_caida.webp", "mira": "der", "pie": 973, "ref": 1157.0, "ancla": 727.0}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_8/21_sentado.webp", "mira": "der", "pie": 1002, "ref": 1462.5, "ancla": 738.5}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_8/22_suelo.webp", "mira": "der", "pie": 648, "ref": 1825.9, "ancla": 1030.5, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_8/23_bloqueo.webp", "mira": "der", "pie": 1173, "ref": 1137.5, "ancla": 543.5}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_8/24_carton_recoger.webp", "mira": "der", "pie": 1298, "ref": 1963.0, "ancla": 569.5}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_8/25_carton_sostener.webp", "mira": "der", "pie": 1553, "ref": 1196.0, "ancla": 400.5}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_8/26_carton_beber.webp", "mira": "der", "pie": 1313, "ref": 1072.5, "ancla": 388.1}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_8/27_carton_bajar.webp", "mira": "der", "pie": 1590, "ref": 1300, "ancla": 514.0}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_8/28_levantarse.webp", "mira": "der", "pie": 1165, "ref": 1625.0, "ancla": 611.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}, "chacarita_10": {"frames": {"guardia": {"src": "assets/enemigos/clubes/chacarita/barra_10/01_guardia.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 750.0}, "camDA": {"src": "assets/enemigos/clubes/chacarita/barra_10/02_derecha_a.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 802.8}, "camDP": {"src": "assets/enemigos/clubes/chacarita/barra_10/03_derecha_paso.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 754.2}, "camDB": {"src": "assets/enemigos/clubes/chacarita/barra_10/04_derecha_b.webp", "mira": "der", "pie": 1503, "ref": 1300, "ancla": 791.9}, "camIA": {"src": "assets/enemigos/clubes/chacarita/barra_10/05_izquierda_a.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 743.3}, "camIP": {"src": "assets/enemigos/clubes/chacarita/barra_10/06_izquierda_paso.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 780.2}, "camIB": {"src": "assets/enemigos/clubes/chacarita/barra_10/07_izquierda_b.webp", "mira": "izq", "pie": 1503, "ref": 1300, "ancla": 733.4}, "camFA": {"src": "assets/enemigos/clubes/chacarita/barra_10/08_frente_a.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 810.0}, "camFP": {"src": "assets/enemigos/clubes/chacarita/barra_10/09_frente_paso.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 801.0}, "camFB": {"src": "assets/enemigos/clubes/chacarita/barra_10/10_frente_b.webp", "mira": "frente", "pie": 1503, "ref": 1300, "ancla": 725.0}, "camEA": {"src": "assets/enemigos/clubes/chacarita/barra_10/11_espalda_a.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 767.0}, "camEP": {"src": "assets/enemigos/clubes/chacarita/barra_10/12_espalda_paso.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 770.5}, "camEB": {"src": "assets/enemigos/clubes/chacarita/barra_10/13_espalda_b.webp", "mira": "espalda", "pie": 1503, "ref": 1300, "ancla": 768.0}, "reaccion_a": {"src": "assets/enemigos/clubes/chacarita/barra_10/14_reaccion_cabeza.webp", "mira": "der", "pie": 1299, "ref": 1098.5, "ancla": 322.4}, "reaccion_b": {"src": "assets/enemigos/clubes/chacarita/barra_10/15_reaccion_torso.webp", "mira": "der", "pie": 1128, "ref": 1098.5, "ancla": 388.0}, "reaccion_c": {"src": "assets/enemigos/clubes/chacarita/barra_10/16_reaccion_atras.webp", "mira": "der", "pie": 1148, "ref": 1098.5, "ancla": 409.7}, "pina": {"src": "assets/enemigos/clubes/chacarita/barra_10/17_pina.webp", "mira": "der", "pie": 1155, "ref": 1098.5, "ancla": 489.9}, "patada": {"src": "assets/enemigos/clubes/chacarita/barra_10/18_patada.webp", "mira": "der", "pie": 1130, "ref": 1098.5, "ancla": 414.4}, "deseq_a": {"src": "assets/enemigos/clubes/chacarita/barra_10/19_desequilibrio.webp", "mira": "der", "pie": 1171, "ref": 1066.0, "ancla": 397.0}, "deseq_b": {"src": "assets/enemigos/clubes/chacarita/barra_10/20_caida.webp", "mira": "der", "pie": 949, "ref": 1105.0, "ancla": 653.5}, "sentado": {"src": "assets/enemigos/clubes/chacarita/barra_10/21_sentado.webp", "mira": "der", "pie": 943, "ref": 1124.5, "ancla": 655.5}, "suelo": {"src": "assets/enemigos/clubes/chacarita/barra_10/22_suelo.webp", "mira": "der", "pie": 632, "ref": 1579.7, "ancla": 898.0, "acostado": true}, "defensa": {"src": "assets/enemigos/clubes/chacarita/barra_10/23_bloqueo.webp", "mira": "der", "pie": 1167, "ref": 1092.0, "ancla": 493.6}, "carton1": {"src": "assets/enemigos/clubes/chacarita/barra_10/24_carton_recoger.webp", "mira": "der", "pie": 1285, "ref": 1391.0, "ancla": 591.5}, "carton2": {"src": "assets/enemigos/clubes/chacarita/barra_10/25_carton_sostener.webp", "mira": "der", "pie": 1440, "ref": 1059.5, "ancla": 374.0}, "carton3": {"src": "assets/enemigos/clubes/chacarita/barra_10/26_carton_beber.webp", "mira": "der", "pie": 1276, "ref": 916.5, "ancla": 367.7}, "carton4": {"src": "assets/enemigos/clubes/chacarita/barra_10/27_carton_bajar.webp", "mira": "der", "pie": 1444, "ref": 1007.5, "ancla": 394.3}, "levantarse": {"src": "assets/enemigos/clubes/chacarita/barra_10/28_levantarse.webp", "mira": "der", "pie": 1011, "ref": 1358.5, "ancla": 568.0}}, "anim": {"quieto": "guardia", "caminaDer": ["camDA", "camDP", "camDB", "camDP"], "caminaIzq": ["camIA", "camIP", "camIB", "camIP"], "caminaAbajo": ["camFA", "camFP", "camFB", "camFP"], "caminaArriba": ["camEA", "camEP", "camEB", "camEP"], "pina": "pina", "patada": "patada", "dolor": "reaccion_a", "dolores": ["reaccion_a", "reaccion_b", "reaccion_c"], "desequilibrio": ["deseq_a", "deseq_b"], "caida": "sentado", "suelo": "suelo", "muerto": "suelo", "bloqueo": {"der": "defensa", "izq": "defensa"}, "levantarse": "levantarse"}, "zancada": 40, "zancadaLado": 30, "pasoMs": 180}});
/* v139 CHACARITA — fin */
