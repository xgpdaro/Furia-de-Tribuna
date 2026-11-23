/* =====================================================================
   BARRAS BRAVAS — Los 10 niveles, enemigos y escalado por nivel
   ---------------------------------------------------------------------
   Todo lo que define un nivel vive acá: fondo, piso caminable, escala por
   profundidad, entradas de los rivales, oleadas y qué hinchas aparecen.
   El escalado de VIDA y DAÑO de los enemigos también está acá (ESCALADO),
   en un solo lugar, para balancear sin tocar el motor (js/juego.js).
   ===================================================================== */
(function (global) {
  'use strict';

  /* ---- Escalado por nivel (BALANCE PROVISORIO) -----------------------
     vida del enemigo  = base.vida   × ESCALADO.vida[nivel]
     daño del enemigo  = base.golpe  × ESCALADO.danio[nivel]
     Se calcula SIEMPRE desde la base y el número de nivel: reintentar,
     reiniciar o entrar por el selector de niveles no acumula aumentos.
     · vida: conserva la tabla que ya existía (30 %, 35 %, 40 %, 45 %, 50 %,
       55 %, 60 %, 70 %, 80 % de la vida del jugador) y la extiende al 10 (90 %).
     · daño: la tabla vieja repetía valores (4/5 en los niveles 1 a 3), así que
       se reemplazó por +5 % por nivel para que suba en TODOS los niveles
       (con +10 % los niveles 5 a 9 quedaban muy difíciles en las pruebas). */
  /* v31 — VIDA DE CADA HINCHA COMÚN, en puntos y por nivel (balance acordado con Darío). Reemplaza al escalado de
     vida para los comunes: se usa tal cual, sin multiplicar por nada más. El nivel 10 no tiene comunes. */
  const VIDA_COMUN = [null, 40, 45, 50, 55, 60, 70, 70, 80, 80, 90];   // nivel 1…10

  /* v31 — PARES QUE NUNCA SALEN JUNTOS EN UNA MISMA CAMADA (simétrico; sí pueden estar en camadas distintas).
     Se usan los números de Darío (los de sus carpetas y del HUD: "Barra N"), ver PLANTEL más abajo:
       Barra 2 ↔ Barra 5  = barra_02 ↔ barra_14
       Barra 7 ↔ Barra 1  = barra_09 ↔ barra_01
       Barra 3 ↔ Barra 6  = barra_03 ↔ barra_08                                                                  */
  const INCOMPATIBLES = [['barra_02', 'barra_14'], ['barra_09', 'barra_01'], ['barra_03', 'barra_08']];

  const ESCALADO = {
    //        nivel:  1     2     3     4     5     6     7     8     9     10
    vida:  [null, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90].map(v => v && v / 30),   // = % de la vida del jugador ÷ 30 (nivel 1)
    danio: [null, 1.00, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45]
  };

  /* ---- Estadísticas BASE por tipo (valores del nivel 1) -------------- */
  const BASE = {
    comun:             { vida: 30, pina: 4, patada: 5 },   // = lo que ya tenía la Pantalla 1
    // Provisorio: Cabeza de Poronga llega a 90 de vida en el nivel 7 (el 90 % que ya estaba configurado).
    // cabezazo: provisorio (solo lo usan los que tienen ese cuadro: Cabeza de Poronga y El Abuelo). Solo de cerca.
    cabeza_de_poronga: { vida: 45, pina: 5, patada: 6, cabezazo: 7, preparacion: 0.50, recuperacion: 0.80 },
    // Provisorio: jefe final. En el nivel 10: 180 de vida, piña 7,25 y patada 8,7.
    // Preparación más larga que la de un hincha (0,65 s contra 0,40) para que se vea venir y se pueda esquivar.
    // agarrable: false → al jefe no se lo agarra (con el combo se lo podía tumbar sin parar). dolor: cuánto lo frena cada golpe.
    // v29: todos sus golpes hacen +20 % (factor UNO, aplicado una sola vez en statsEnemigo) y tiene DOS barras:
    // al vaciar la primera se arrodilla, se levanta con la vida llena una sola vez y recién al vaciar la segunda cae.
    el_abuelo:         { vida: 60, pina: 5, patada: 6, cabezazo: 7, preparacion: 0.65, recuperacion: 0.90, agarrable: false, dolor: 0.16,
                         factorDanio: 1.20, barras: 2 }
  };

  const nivelValido = n => Math.max(1, Math.min(10, n | 0));
  // Valores reales de combate de un tipo de enemigo en un nivel. Siempre desde la base (no acumula).
  function statsEnemigo(tipo, nivel) {
    // v31 — Cabeza de Poronga (nivel 7) = MISMOS números que El Abuelo como jefe del nivel 10: 180 por barra,
    // 2 barras (una recuperación) y piña/patada/cabezazo con el +20 % ya incluido (no se vuelve a multiplicar).
    // Conserva sus propios tiempos de preparación y recuperación entre ataques.
    if (tipo === 'cabeza_de_poronga') {
      const a = statsEnemigo('el_abuelo', 10), b = BASE.cabeza_de_poronga;
      return { vida: a.vida, pina: a.pina, patada: a.patada, cabezazo: a.cabezazo,
               preparacion: b.preparacion, recuperacion: b.recuperacion, agarrable: b.agarrable !== false, dolor: b.dolor, barras: a.barras };
    }
    // v30 — Policía (guardaespaldas del Abuelo, nivel 10): NO tiene números propios. Se consultan los
    // del Abuelo ya calculados (con su +20 % incluido, sin volver a multiplicar), así siempre coinciden:
    //   vida = UNA barra del Abuelo · palazo (piña) = piña del Abuelo · golpe de escudo (patada) = patada del Abuelo.
    //   v35: DOS barras (como los otros tres especiales), sin cabezazo. Se cubre con la regla de los comunes del nivel (js/defensa.js).
    //   v69: los CUATRO policías (gordo, musculoso, normal, guía con ovejero) usan estos números. UNA SOLA VIDA y una sola barra
    //   (sin segunda fase ni recarga). Poder especial: golpe potente = 2 × la patada del Abuelo en ese nivel (su golpe normal más fuerte
    //   que un policía comparte), con la preparación/recuperación de js/defensa.js → policia.especial. Potencia ≠ vida: no copia sus 2 barras.
    if (tipo === 'policia') {
      const a = statsEnemigo('el_abuelo', nivel), r2 = v => Math.round(v * 100) / 100;
      return { vida: a.vida, pina: a.pina, patada: a.patada, cabezazo: null, especial: r2(a.patada * 2),
               preparacion: a.preparacion, recuperacion: a.recuperacion, agarrable: true, dolor: undefined, barras: 1 };   // v69: UNA vida
    }
    // v34 — GORDO ESCOBA (jefe del nivel 8): vida y daño IGUALES a los jefes, sin números propios.
    // Se consultan los del Abuelo ya calculados (180 por barra, 2 barras, piña con el +20 % YA incluido = 8,7):
    //   escobazo = UNA piña del Abuelo (no su patada ni su cabezazo). Sin patada ni cabezazo.
    // Tiempos de preparación/recuperación del escobazo: los del Abuelo (se ve venir). Se lo puede agarrar.
    // Al cubrirse usa la regla de los comunes del nivel 8 (30 %, js/defensa.js): NO es inmune como los jefes.
    if (tipo === 'gordo_escoba') {
      const a = statsEnemigo('el_abuelo', 10);
      return { vida: a.vida, pina: a.pina, patada: null, cabezazo: null,
               preparacion: a.preparacion, recuperacion: a.recuperacion, agarrable: true, dolor: undefined, barras: a.barras };
    }
    // v56 — Matute jefe: mismos números que El Abuelo como jefe del nivel 10 (con su +20 % ya incluido y sus 2 barras).
    if (tipo === 'matute') return statsEnemigo('el_abuelo', nivel);
    // v225 — barras especiales de River (El Tano, EL FLACO, PATOVA, VIKINGO): como el GORDO ESCOBA, sin números propios. Vida, barras y
    // tiempos del Abuelo EN ESE NIVEL; su único golpe (con el objeto) = la piña del Abuelo. Sin patada ni cabezazo. Se los puede agarrar.
    if (tipo === 'barra_river_especial') {
      const a = statsEnemigo('el_abuelo', nivel);
      return { vida: a.vida, pina: a.pina, patada: null, cabezazo: null,
               preparacion: a.preparacion, recuperacion: a.recuperacion, agarrable: true, dolor: undefined, barras: a.barras };
    }
    // v64 — jefes rivales de la campaña de River (El Chivo, Cacho, El Gallego): sin números propios → los del Abuelo como jefe, igual que Matute.
    if (tipo === 'el_chivo' || tipo === 'cacho' || tipo === 'el_gallego' || tipo === 'el_loco_tito' || tipo === 'el_toro' || tipo === 'el_tuerto_jefe' || tipo === 'muchinga_jefe' || tipo === 'el_paraguayo_jefe' || tipo === 'el_gordo_cadena_jefe' || tipo === 'pillin_jefe' || tipo === 'pimpi_jefe') return statsEnemigo('el_abuelo', nivel);   // v138: + El Tuerto   // v107: + El Toro   // v106: + El Loco Tito
    const b = BASE[tipo] || BASE.comun, n = nivelValido(nivel);
    const r = v => Math.round(v * 100) / 100;
    // Redondeo centralizado a 2 decimales (el que ya existía). El factor del jefe se aplica sobre el daño
    // que ya tenía en ese nivel: r(r(base × nivel) × factor). Ej. nivel 10: piña 7,25 → 8,7.
    const f = b.factorDanio || 1, golpe = v => f === 1 ? r(v * ESCALADO.danio[n]) : r(r(v * ESCALADO.danio[n]) * f);
    return {
      vida: tipo === 'comun' || !BASE[tipo] ? VIDA_COMUN[n] : r(b.vida * ESCALADO.vida[n]),   // v31: comunes = tabla fija
      pina: golpe(b.pina),
      patada: golpe(b.patada),
      cabezazo: b.cabezazo ? golpe(b.cabezazo) : null,
      preparacion: b.preparacion, recuperacion: b.recuperacion, agarrable: b.agarrable !== false, dolor: b.dolor,
      barras: b.barras || 1
    };
  }

  /* ---- Pisos de cada fondo (coordenadas del fondo, 1672 × 941) --------
     y: de yMin (lejos) a yMax (cerca). x: xMin/xMax pueden ser [arriba, abajo]
     para pisos que se angostan (la escalera). escala: tamaño del personaje
     en el fondo (sLejos) y adelante (sCerca). */
  const CALLE  = { yMin: 610, yMax: 922, xMin: 70, xMax: 1602 };
  const PLAZA  = { yMin: 600, yMax: 925, xMin: 60, xMax: 1612 };
  const TRIBU  = { yMin: 390, yMax: 925, xMin: 60, xMax: 1612 };
  const LADOS  = (y1, y2, y3) => [ { x: 1780, y: y1 }, { x: -110, y: y2 }, { x: 1800, y: y3 }, { x: -130, y: (y1 + y3) / 2 } ];
  const ARRIBA = (y) => [ { x: 700, y: y - 70 }, { x: 980, y: y - 70 }, { x: 1780, y: 820 }, { x: -110, y: 760 } ];

  /* ---- Los 10 niveles -------------------------------------------------
     animados: hinchas con animaciones completas (lote 1) que el nivel SÍ o SÍ
     incluye; el resto se sortea entre los otros hinchas (sin repetir). */
  // nombre: lo que se ve en el menú, la presentación y el HUD (v23). El número `n` y las rutas no cambian.
  const PANTALLAS = [
    { n: 1, nombre: 'La Pampa y Alcorta',           escenario: 'assets/escenarios/pantalla_01_calle_lejana.webp',
      piso: CALLE, escala: [0.84, 1.06], inicio: { x: 280, y: 780 }, entradas: LADOS(700, 760, 860),
      oleadas: [5], animados: ['barra_01', 'barra_04'] },
    { n: 2, nombre: 'Cantilo',  escenario: 'assets/escenarios/pantalla_02_frente_estadio.webp',
      piso: CALLE, escala: [0.84, 1.06], inicio: { x: 280, y: 780 }, entradas: LADOS(700, 760, 860),
      oleadas: [5], animados: ['barra_02', 'barra_16'] },
    { n: 3, nombre: 'Puente Labruna',         escenario: 'assets/escenarios/pantalla_03_lateral.webp',
      piso: { yMin: 660, yMax: 925, xMin: 60, xMax: 1612 }, escala: [0.86, 1.06], inicio: { x: 260, y: 800 }, entradas: LADOS(720, 790, 880),
      oleadas: [6], animados: ['barra_01', 'barra_02', 'barra_04'] },   // v31: SEIS en una sola camada (excepción pedida)
    { n: 4, nombre: 'Udaondo', escenario: 'assets/escenarios/pantalla_04_vereda_monumental.webp',
      piso: PLAZA, escala: [0.66, 1.06], inicio: { x: 260, y: 780 }, entradas: LADOS(660, 760, 880),
      oleadas: [3, 4], animados: ['barra_04', 'barra_16'] },
    { n: 5, nombre: 'Alcorta y Quinteros',   // v32: antes 'Udaondo y Quinteros'
      escenario: 'assets/escenarios/pantalla_05_vereda_monumental.webp',
      piso: PLAZA, escala: [0.66, 1.06], inicio: { x: 260, y: 780 }, entradas: LADOS(660, 760, 880),
      oleadas: [4, 4], animados: ['barra_01', 'barra_02', 'barra_16'] },
    { n: 6, nombre: 'Quinteros',    escenario: 'assets/escenarios/pantalla_06_puerta_lejana.webp',
      piso: PLAZA, escala: [0.66, 1.06], inicio: { x: 260, y: 780 }, entradas: LADOS(660, 760, 880),
      oleadas: [4, 4], animados: ['barra_02', 'barra_04', 'barra_16'] },
    { n: 7, nombre: 'Puerta 12 - Centenario',          escenario: 'assets/escenarios/pantalla_07_frente_puerta_12.webp',
      piso: PLAZA, escala: [0.66, 1.06], inicio: { x: 260, y: 780 }, entradas: LADOS(660, 760, 880),
      oleadas: [4, 5], animados: ['barra_01', 'barra_02', 'barra_04', 'barra_16'],
      especialAlFinal: 'cabeza_de_poronga' },   // estaba configurado así desde el pedido de la Pantalla 1
    { n: 8, nombre: 'Escaleras',        escenario: 'assets/escenarios/pantalla_08_escalera_ascenso.webp',
      piso: { yMin: 430, yMax: 925, xMin: [190, 40], xMax: [1420, 1630] }, escala: [0.72, 1.06], inicio: { x: 830, y: 880 },
      entradas: ARRIBA(430), oleadas: [5, 5], animados: ['barra_01', 'barra_02', 'barra_04', 'barra_16'],
      especialAlFinal: 'gordo_escoba' },   // v34: 5 + 5 comunes y DESPUÉS, solo, el GORDO ESCOBA (jefe del nivel)
    { n: 9, nombre: 'La Tribuna',         escenario: 'assets/escenarios/pantalla_09_tribuna_banderas_v4.webp',
      piso: TRIBU, escala: [0.74, 1.04], inicio: { x: 300, y: 820 }, entradas: ARRIBA(390),
      oleadas: [5, 5, 5], animados: ['barra_01', 'barra_02', 'barra_04', 'barra_16'],   // v31: 15, no 16
      // El Abuelo mira desde atrás: NO pelea, NO recibe daño, NO bloquea, NO cuenta para terminar.
      espectador: { id: 'el_abuelo', x: 1500, y: 430, escala: 0.62 } },   // v23: más abajo, para no quedar parado sobre la bandera gigante del fondo v4
    { n: 10, nombre: '¡Por los trapos!',  escenario: 'assets/escenarios/pantalla_10_duelo_final_banderas_v4.webp',
      piso: { yMin: 400, yMax: 925, xMin: 60, xMax: 1612 }, escala: [0.74, 1.04], inicio: { x: 300, y: 820 },
      entradas: [ { x: 1300, y: 330 } ], oleadas: [], jefe: 'el_abuelo',
      guardaespaldas: 'policia',   // v30: sale antes del Abuelo; hasta derrotarlo, el Abuelo no entra
      frase: '«El trapo de la 12 no se lo lleva nadie. Vas a tener que pasar por encima mío.»' }
  ];

  /* ---- Hinchas rivales (barras) --------------------------------------------------
     barra_01, 02, 04 y 16 tienen animaciones completas (js/sprites_enemigos.js).
     v26: barra_03, barra_08 y barra_14 tienen poses mínimas (caminar, piña, patada, bloqueo, caída, KO).
     El resto son imágenes quietas de guardia (se deslizan y giran). */
  const CON_NUMERO = [1, 2, 4, 5, 6, 7, 9];   // camisetas con el 12: al mirar al otro lado usan su espejo corregido
  const MIRA_IZQ = [2, 14];                   // las imágenes de barra_02 y barra_14 miran a la IZQUIERDA; las demás a la derecha (v26: 14 corregido)
  // v26b — PLANTEL DE DARÍO: solo estos 9 hinchas salen en los niveles. La clave es el archivo del
  // juego (barra_XX) y el valor el número que usa Darío en sus carpetas ("Barra 5" = barra_14, etc.).
  // Los otros 7 PNG del paquete v1 (barra_05, 06, 07, 10, 12, 13, 15) quedan en la carpeta pero ya no salen.
  const PLANTEL = { barra_01: 1, barra_02: 2, barra_03: 3, barra_04: 4, barra_14: 5, barra_08: 6, barra_09: 7, barra_11: 9, barra_16: 10 };
  // v102: barra_01/02/03.webp eran copias idénticas (mismo SHA-256) de su guardia animada → se usa esa y se libera espacio en la web
  const MISMA_IMAGEN = { '01': 'assets/enemigos/animados/barra_01/barra_01_guardia_original.webp', '02': 'assets/enemigos/animados/barra_02/barra_02_guardia_original.webp', '03': 'assets/enemigos/animados/barra_03/barra_03_guardia_original.webp', '04': 'assets/enemigos/animados/barra_04/barra_04_guardia_original.webp', '08': 'assets/enemigos/animados/barra_08/barra_08_guardia_original.webp', '09': 'assets/enemigos/animados/barra_09/barra_09_guardia_original.webp', '11': 'assets/enemigos/animados/barra_11/barra_11_guardia_original.webp', '14': 'assets/enemigos/animados/barra_14/barra_14_guardia_original.webp', '16': 'assets/enemigos/animados/barra_16/barra_16_guardia_original.webp' };   // v104: + 04, 08, 09, 11, 14 y 16 (también idénticas)
  const TODOS_LOS_HINCHAS = Array.from({ length: 16 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    const espejo = CON_NUMERO.includes(i + 1) ? `assets/enemigos/barra_${num}_espejo.webp` : null;
    return { id: `barra_${num}`, tipo: 'comun', nombre: `Barra ${num}`, sprite: MISMA_IMAGEN[num] || `assets/enemigos/barra_${num}.webp`,
             espejo, mira: MIRA_IZQ.includes(i + 1) ? -1 : 1 };
  });
  const POOL_COMUNES = TODOS_LOS_HINCHAS.filter(d => d.id in PLANTEL)
    .map(d => ({ ...d, nombre: `Barra ${PLANTEL[d.id]}` }))
    .sort((x, y) => PLANTEL[x.id] - PLANTEL[y.id]);

  /* ---- Especiales: NUNCA salen por sorteo ---------------------------- */
  const ESPECIALES = {
    // Sin animaciones ni ataques especiales aprobados: usa su imagen quieta. Mira a la izquierda.
    cabeza_de_poronga: { id: 'cabeza_de_poronga', tipo: 'cabeza_de_poronga', nombre: 'Cabeza de Poronga',
                         sprite: 'assets/enemigos/especiales/cabeza_de_poronga/cdp_guardia_original.webp', mira: -1, especial: true },   // v102: misma imagen (SHA-256 idéntico)
    // Jefe del nivel 10. Imagen actual CON la bandera (no la usa como arma).
    // TODO(arte): reemplazar por cuadros de guardia, caminar, ataques, recibir daño y KO → ver `cuadros` abajo.
    // v30: policía antidisturbios, guardaespaldas del Abuelo en el nivel 10 (cuadros en js/sprites_enemigos.js → policia).
    policia:           { id: 'policia', tipo: 'policia', nombre: 'Policía gordo', especial: true,
                         sprite: 'assets/enemigos/especiales/policia/policia_guardia_derecha.webp', mira: 1,
                         // v43: zona del PALAZO = franja DELANTE del policía (px a escala 1 desde su centro hacia donde mira), nunca detrás
                         // ni el lienzo entero. En la pose de impacto el puño queda a ~112 px y la punta del palo a ~252 px: un rival
                         // dentro de 0–150 tiene el cuerpo bajo el brazo o el palo. 150 = alcance que ya tenía (no cambia la dificultad).
                         alcance: { pina: [0, 150], especial: [0, 150] } },
    // v69 — los otros tres policías del nivel 5 (cuadros en js/sprites_enemigos.js). tipo 'policia' = mismos números y misma IA.
    // alcance = franja DELANTE del agente (px a escala 1 desde su ancla hacia donde mira) donde tiene que estar el rival para que el
    // golpe conecte. Medida sobre cada pose de impacto (puño / punta del palo / boca del perro), nunca el ancho entero del PNG.
    policia_musculoso: { id: 'policia_musculoso', tipo: 'policia', nombre: 'Policía musculoso', especial: true, sprite: null, mira: 1,
                         alcance: { pina: [40, 240], patada: [20, 195], especial: [40, 240] } },   // palo frontal (punta ≈ 266) · puño (≈ 221)
    policia_normal:    { id: 'policia_normal', tipo: 'policia', nombre: 'Policía', especial: true, sprite: null, mira: 1,
                         alcance: { pina: [40, 245], patada: [10, 160], especial: [10, 160] } },   // palo frontal (≈ 272) · escudazo (≈ 172)
    // Guía + ovejero = UNA unidad. Muerde el PERRO: la zona activa es la boca (últimos ~110 px de la pose), no el cuerpo del agente.
    policia_guia:      { id: 'policia_guia', tipo: 'policia', nombre: 'Guía con ovejero', especial: true, sprite: null, mira: 1,
                         alcance: { pina: [225, 335], patada: [200, 311], especial: [225, 335] }, distancia: 270 },   // boca: 335 / 311
    // v34: jefe del nivel 8 (cuadros en js/sprites_enemigos.js → gordo_escoba). Ataca SOLO con el escobazo, que pega
    // con la parte de paja: el golpe conecta si el jugador está en esa franja delante de él (alcance.pina, px a escala 1,
    // medidos sobre la imagen del escobazo; no se usa el tamaño del PNG). distancia: dónde se para para pegar.
    gordo_escoba:      { id: 'gordo_escoba', tipo: 'gordo_escoba', nombre: 'GORDO ESCOBA', especial: true,
                         sprite: 'assets/enemigos/especiales/gordo_escoba/escoba_caminar_derecha_01.webp', mira: 1,
                         soloGolpe: 'pina', alcance: { pina: [150, 340] }, distancia: 245 },
    // v56 — MATUTE como JEFE FINAL (Boca y San Lorenzo VS RIVER, nivel 10). Cuadros en js/sprites_enemigos.js → matute
    // (los mismos dibujos del Matute jugable). Sin números propios: vida, daño, 2 barras y bloqueo de daño cero = los del
    // Abuelo en el mismo papel (statsEnemigo('matute') → los del Abuelo; js/defensa.js → jefesPct). Mira a la derecha.
    // v225 — BARRAS ESPECIALES DE RIVER (otras barras visitan el Monumental: visita_river). Uno por nivel, al final, solo (especialAlFinal):
    // nivel 3 El Tano (micrófono con pie) · 6 EL FLACO (caño) · 7 PATOVA (cadena) · 8 VIKINGO (bate de aluminio). NO son jugables.
    // Pegan SOLO con su objeto (soloGolpe): sin piñas, patadas ni golpes a mano libre. alcance = franja delante de él (px a escala 1)
    // medida en el cuadro de efecto hasta la punta del objeto. Cuadros en js/sprites_enemigos.js. PATOVA: sinAtaque hasta que llegue
    // una secuencia de cadena completa (la lateral tiene la «continuación» rota y la ascendente solo 2 de 4 cuadros).
    el_tano:           { id: 'el_tano', tipo: 'barra_river_especial', nombre: 'El Tano', especial: true, sprite: null, mira: 1,
                         soloGolpe: 'pina', nombreGolpe: 'Golpe de micrófono', alcance: { pina: [40, 150] }, distancia: 115,
                         alcanceSecu: { lateral: { der: [40, 150], izq: [60, 240] } } },   // v226: hacia la izquierda, el brazo extendido (punta del micrófono ≈ 242)
    el_flaco:          { id: 'el_flaco', tipo: 'barra_river_especial', nombre: 'EL FLACO', especial: true, sprite: null, mira: 1,
                         soloGolpe: 'pina', nombreGolpe: 'Cañazo', alcance: { pina: [40, 170] }, distancia: 125,
                         alcanceSecu: { lateral: [40, 180], ascendente: [40, 160], estocada: { der: [80, 305], izq: [80, 280] } } },   // v226: punta del caño medida en cada cuadro de impacto
    patova:            { id: 'patova', tipo: 'barra_river_especial', nombre: 'PATOVA', especial: true, sprite: null, mira: 1,
                         soloGolpe: 'pina', nombreGolpe: 'Cadenazo', sinAtaque: true, alcance: { pina: [40, 160] }, distancia: 120 },
    vikingo:           { id: 'vikingo', tipo: 'barra_river_especial', nombre: 'VIKINGO', especial: true, sprite: null, mira: 1,
                         soloGolpe: 'pina', nombreGolpe: 'Batazo', alcance: { pina: [40, 170] }, distancia: 125 },
    matute:            { id: 'matute', tipo: 'matute', nombre: 'Matute', sprite: null, mira: 1, jefe: true,
                         lema: 'Defiende los trapos del Tablón.' },
    // v64 — jefes rivales de la CAMPAÑA DE RIVER (cuadros en js/sprites_enemigos.js, los mismos del referente jugable). Miran a la derecha.
    el_chivo:          { id: 'el_chivo', tipo: 'el_chivo', nombre: 'El Chivo', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos del Cuervo.' },
    cacho:             { id: 'cacho', tipo: 'cacho', nombre: 'Cacho', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de la Academia.' },
    el_gallego:        { id: 'el_gallego', tipo: 'el_gallego', nombre: 'El Gallego', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos del Rojo.' },
    // v106 — El Loco Tito, jefe de Belgrano cuando OTRO club visita Alberdi (cuadros en js/sprites_enemigos.js, generados de su referente).
    // v107 — El Toro, jefe de Talleres cuando OTRO club visita el Kempes / barrio Jardín (cuadros en js/sprites_enemigos.js → el_toro).
    el_tuerto_jefe:    { id: 'el_tuerto_jefe', tipo: 'el_tuerto_jefe', nombre: 'El Tuerto', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de La 79.' },   // v138
    muchinga_jefe:     { id: 'muchinga_jefe', tipo: 'muchinga_jefe', nombre: 'Muchinga', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de La Famosa Banda de San Martín.' },   // v139
    el_paraguayo_jefe: { id: 'el_paraguayo_jefe', tipo: 'el_paraguayo_jefe', nombre: 'El Paraguayo', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de Ciudad Oculta y Los Perales.' },   // v140
    el_gordo_cadena_jefe: { id: 'el_gordo_cadena_jefe', tipo: 'el_gordo_cadena_jefe', nombre: 'El Gordo Cadena', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de Los Borrachos de Morón.' },   // v141
    pillin_jefe:       { id: 'pillin_jefe', tipo: 'pillin_jefe', nombre: 'Pillín', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de Los Guerreros.' },   // v142
    pimpi_jefe:        { id: 'pimpi_jefe', tipo: 'pimpi_jefe', nombre: 'Pimpi', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de Los Leprosos.' },   // v143
    el_toro:           { id: 'el_toro', tipo: 'el_toro', nombre: 'El Toro', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos de la Fiel.' },
    el_loco_tito:      { id: 'el_loco_tito', tipo: 'el_loco_tito', nombre: 'El Loco Tito', sprite: null, mira: 1, jefe: true, lema: 'Defiende los trapos del Pirata.' },
    el_abuelo:         { id: 'el_abuelo', tipo: 'el_abuelo', nombre: 'El Abuelo', lema: 'Defiende el trapo de la 12.',
                         sprite: 'assets/enemigos/especiales/el_abuelo.webp', mira: -1, jefe: true,
                         espejo: 'assets/enemigos/especiales/el_abuelo_espejo.webp',   // mirando a la derecha, con el 12 de la bandera al derecho
                         cuadros: null }   // cuando existan: nombre de entrada en js/sprites_enemigos.js
  };

  // Arma la lista de hinchas de un nivel: primero los animados obligatorios, después
  // se sortea el resto entre los demás sin repetir (solo repite si hacen falta más de los 9 del plantel).
  /* v31 — Arma TODAS las camadas del nivel de una vez (antes de que entre nadie), con cantidad exacta y sin
     pares incompatibles dentro de una camada. Búsqueda con vuelta atrás (backtracking), siempre termina:
       1) reparte los hinchas obligatorios del nivel (`animados`) entre las camadas;
       2) completa cada camada con IDs DISTINTOS y compatibles, prefiriendo los que todavía no salieron en el nivel;
       3) solo si no alcanzan los IDs distintos compatibles, repite el mínimo posible un ID compatible ya elegido
          (queda avisado en la consola). Jefes, Cabeza de Poronga, el policía y el GORDO ESCOBA NO entran en este sorteo.
     pool y azar se pueden pasar para probar con catálogos reducidos. Devuelve [[def, …], [def, …], …]. */
  const prohibido = (a, b) => INCOMPATIBLES.some(([x, y]) => (a === x && b === y) || (a === y && b === x));
  const compatibleCon = (id, ids) => ids.every(o => !prohibido(id, o));
  function camadaValida(defs) { const ids = defs.map(d => d.id); return ids.every((id, i) => ids.every((o, j) => i === j || !prohibido(id, o))); }
  function mezclar(lista, azar) { const a = lista.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(azar() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function armarCamadas(nivel, pool = POOL_COMUNES, azar = Math.random) {
    const cfg = pantalla(nivel), cupos = cfg.oleadas.slice();
    if (!cupos.length) return [];
    const ids = pool.map(d => d.id), porId = id => pool.find(d => d.id === id);
    const fijos = mezclar((cfg.animados || []).filter(id => ids.includes(id)), azar);
    const usadosNivel = new Set();
    const avisos = [];

    // 1) obligatorios: cada uno en una camada con lugar y sin conflicto (backtracking)
    const asignados = cupos.map(() => []);
    (function ubicar(k) {
      if (k === fijos.length) return true;
      for (const c of mezclar(cupos.map((_, i) => i), azar)) {
        if (asignados[c].length < cupos[c] && !asignados[c].includes(fijos[k]) && compatibleCon(fijos[k], asignados[c])) {
          asignados[c].push(fijos[k]); if (ubicar(k + 1)) return true; asignados[c].pop();
        }
      }
      return false;
    })(0) || avisos.push('no se pudieron ubicar todos los obligatorios');
    asignados.flat().forEach(id => usadosNivel.add(id));

    // 2) completar cada camada con IDs distintos y compatibles
    const camadas = cupos.map((cant, c) => {
      const elegidos = asignados[c].slice();
      const candidatos = () => {
        const libres = ids.filter(id => !elegidos.includes(id));
        return [...mezclar(libres.filter(id => !usadosNivel.has(id)), azar), ...mezclar(libres.filter(id => usadosNivel.has(id)), azar)];
      };
      (function llenar() {
        if (elegidos.length === cant) return true;
        for (const id of candidatos()) {
          if (!compatibleCon(id, elegidos)) continue;
          elegidos.push(id); if (llenar()) return true; elegidos.pop();
        }
        return false;
      })();
      // 3) no alcanzan los distintos: repetir lo mínimo un ID compatible ya elegido (o el primero compatible del catálogo)
      while (elegidos.length < cant) {
        const rep = mezclar(elegidos, azar).find(id => compatibleCon(id, elegidos)) || ids.find(id => compatibleCon(id, elegidos));
        if (!rep) break;   // solo pasaría con un catálogo vacío
        elegidos.push(rep); avisos.push(`camada ${c + 1}: se repite ${rep}`);
      }
      elegidos.forEach(id => usadosNivel.add(id));
      return mezclar(elegidos, azar).map(porId);
    });
    // validación final: cantidad exacta y ningún par prohibido
    camadas.forEach((cam, c) => {
      if (cam.length !== cupos[c]) avisos.push(`camada ${c + 1}: ${cam.length} de ${cupos[c]}`);
      if (!camadaValida(cam)) avisos.push(`camada ${c + 1}: par incompatible`);
    });
    if (avisos.length) console.warn(`[Nivel ${nivel}] sorteo de camadas:`, avisos.join(' · '));
    return camadas;
  }

  // Compatibilidad con código viejo: la lista plana de las camadas.
  function sortearNivel(nivel) { return armarCamadas(nivel).flat(); }

  const pantalla = n => PANTALLAS.find(p => p.n === n);

  /* ======================================================================
     v55/v56 — CLUBES, ESCENARIOS Y BARRAS POR CLUB
     ----------------------------------------------------------------------
     · CLUBES: qué barras salen de enemigos y qué juegos de escenarios («sets») tiene cada club.
         River  → contra Boca, en sus escenarios (lo que ya existía, sin cambios: Cabeza de Poronga, Gordo Escoba, policía y El Abuelo).
         Boca   → v56: sus 10 escenarios (escenarios/BOCA). La popular visitante es la de River («Los Borrachos del Tablón»):
                  pelea contra los barras de River (personajes/TABLON). En la 9 Matute mira (dibujado en el fondo); en la 10 es el jefe.
         San Lorenzo → v56: escenarios 1 a 8 propios y DOS finales según el rival elegido en el selector (pestañas VS BOCA / VS RIVER):
                  VS BOCA  → barras de Boca, 9/10 «popular_abuelo» / «sin_abuelo», jefe El Abuelo.
                  VS RIVER → barras de River, 9/10 «alternativa_river», jefe Matute.
                  En la 9 el jefe ya está dibujado mirando (no se agrega su sprite: sin duplicados); en la 10 pelea su personaje.
         Racing, Independiente → contra sus propios barras, en sus escenarios (v55, sin jefes: no hay jefes creados para ellos).
     · Un set puede definir sus propios enemigos (`enemigos`) y su rival; si no, se usan los del club.
     · La elección se lee de localStorage: 'barra14.barra' (club) y 'barra14.escenarios' (set).
       El motor (js/juego.js) cambia de set con Niveles.configurar(club, set).
     ====================================================================== */
  const PANTALLAS_RIVER = PANTALLAS.map(P => ({ ...P, club: 'river', mini: `assets/escenarios/mini/nivel_${String(P.n).padStart(2, '0')}.webp` }));
  const POOL_BOCA = POOL_COMUNES.slice();
  const OLEADAS = [null, [5], [5], [6], [3, 4], [4, 4], [4, 4], [4, 5], [5, 5], [5, 5, 5], [5, 6]];   // misma progresión que River (sin jefes)
  // datos: [archivo, nombre, yMin] o [archivo, nombre, { ...lo que cambia }] (piso, escala, entradas, inicio, jefe…)
  function nivelesDe(club, datos, carpeta = club, prefijoMini = club) {
    return datos.map(([archivo, nombre, extra], i) => {
      const n = i + 1, yMax = 925, o = typeof extra === 'number' ? { yMin: extra } : extra, yMin = o.yMin || (o.piso && o.piso.yMin), cerca = yMin <= 660;
      const P = { n, nombre, club, escenario: `assets/escenarios/${carpeta}/${archivo}`, mini: `assets/escenarios/mini/${prefijoMini}_${String(n).padStart(2, '0')}.webp`,
                  piso: { yMin, yMax, xMin: 60, xMax: 1612 }, escala: cerca ? [0.84, 1.06] : [0.9, 1.06],
                  inicio: { x: 280, y: Math.round((yMin + yMax) / 2 + 30) },
                  entradas: LADOS(yMin + 45, Math.round((yMin + yMax) / 2), yMax - 40), oleadas: OLEADAS[n].slice(), animados: [] };
      const { yMin: _y, ...resto } = o; return Object.assign(P, resto);
    });
  }
  // yMin = borde de arriba del piso caminable (medido en cada imagen: donde termina la vereda / la base de la tribuna)
  const PANTALLAS_RACING = nivelesDe('racing', [
    ['01_calle_lejana_v1.webp', 'Calle lejana', 650], ['02_plazoleta_barrio_v1.webp', 'Plazoleta del barrio', 650],
    ['03_tanque_copa_intercontinental_v1.webp', 'El tanque de la Copa', 650], ['04_acercamiento_estadio_v1.webp', 'Llegando al Cilindro', 650],
    ['05_calle_lateral_estadio_v1.webp', 'Calle lateral', 655], ['06_lateral_cercano_sin_torre_v1.webp', 'Lateral del estadio', 655],
    ['07_vereda_lateral_estadio_v2_carteles.webp', 'Popular Alta Norte', 700], ['08_entrada_puertas_24_25_v2_escaleras.webp', 'Puertas 24 y 25', 710],
    ['09_popular_banderas_v1.webp', 'La Popular', 700], ['10_popular_banderas_grandes_v2_paravalanchas.webp', '¡Por los trapos de la Academia!', 700]]);
  const PANTALLAS_INDEPENDIENTE = nivelesDe('independiente', [
    ['01_calle_industrial_lejana_v1.webp', 'Calle industrial', 650], ['02_galpones_acercamiento_v1.webp', 'Los galpones', 650],
    ['03_deposito_estadio_cercano_v1.webp', 'El depósito', 650], ['04_barrio_casas_estadio_v1.webp', 'Casas del barrio', 650],
    ['05_barrio_esquina_estadio_v1.webp', 'La esquina', 650], ['06_calle_frente_estadio_v1.webp', 'Frente a la Doble Visera', 655],
    ['07_lateral_alto_sin_frase_v1.webp', 'Lateral alto', 752], ['08_lateral_accesos_escaleras_v1.webp', 'Accesos y escaleras', 752],   // v91: borde real del piso (base de persianas, rejas y escaleras) · perspectiva en js/perspectiva.js
    ['09_dos_puertas_escaleras_v1.webp', 'Las dos puertas', 715], ['10_popular_roja_final.webp', '¡Por los trapos del Rojo!', 710]]);

  /* ---- v56: pisos especiales (coordenadas del fondo 1672 × 941) -------------------------------------------
     Calles y pasillos EN PROFUNDIDAD: el piso se angosta hacia el fondo (xMin/xMax = [arriba, abajo]) para no caminar
     sobre paredes, casas ni columnas; personajes más chicos al fondo (escala). Los enemigos de Boca 4 entran desde el
     fondo de la calle y desde abajo de la pantalla, no por los costados (pauta de Darío).
     POPULARES 9 y 10: toda la escena son escalones y se pelea SOBRE ellos (mismo encuadre que las populares de River):
     se usan los mismos pisos que River 9 y 10 (sin explanada ni suelo plano agregado). El motor no tiene obstáculos:
     los paravalanchas quedan como parte del dibujo (igual que en River) y no bloquean la pelea. */
  const EN_PROFUNDIDAD = (yMin, xMin, xMax, escala, entradas) => ({ piso: { yMin, yMax: 925, xMin, xMax }, escala, entradas,
    inicio: { x: Math.round((xMin[1] + xMax[1]) / 2) - 320, y: 860 } });
  const POPULAR_9 = { piso: TRIBU, escala: [0.74, 1.04], inicio: { x: 300, y: 820 }, entradas: ARRIBA(390) };
  const POPULAR_10 = { piso: { yMin: 400, yMax: 925, xMin: 60, xMax: 1612 }, escala: [0.74, 1.04], inicio: { x: 300, y: 820 } };
  const FONDO_Y_ABAJO = (yMin, cx) => [ { x: cx - 60, y: yMin - 60 }, { x: cx + 60, y: yMin - 60 }, { x: cx - 380, y: 1010 }, { x: cx + 380, y: 1010 } ];
  const PANTALLAS_BOCA = nivelesDe('boca', [
    ['01_barrio_conventillos_lejana_v1.webp', 'Caminito', 660],
    ['02_barrio_acercamiento_v1.webp', 'Los conventillos', 660],
    ['03_barrio_estadio_cercano_v1.webp', 'A la sombra de la Bombonera', 660],
    ['04_pasillo_vertical_v2.webp', 'El pasaje', EN_PROFUNDIDAD(590, [560, 60], [1110, 1612], [0.6, 1.06], FONDO_Y_ABAJO(590, 840))],
    // v68: 5–8 con PERSPECTIVA (js/perspectiva.js: el tamaño sale del perfil de cada fondo, no de «escala»). Pisos recalibrados:
    //   5: corredor que se angosta hacia el fondo de la calle (sin subir a las veredas lejanas ni a las rejas del estadio).
    //   6: frente del lateral: vereda + calle a todo lo ancho.  7: la esquina; a la izquierda, el árbol y la casa quedan afuera.
    //   8: la plaza; a la derecha, la vereda con mesas del bar queda afuera hasta el cordón.
    ['05_calle_lateral_estadio_v1.webp', 'Calle lateral', EN_PROFUNDIDAD(735, [390, 40], [1120, 1630], [0.66, 1.06], LADOS(760, 830, 890))],
    ['06_lateral_blanco_frontal_v1.webp', 'El lateral blanco', 670],
    ['07_esquina_estadio_v1.webp', 'La esquina', { yMin: 730, piso: { yMin: 730, yMax: 925, xMin: [200, 60], xMax: 1612 } }],
    ['08_esquina_entrada_principal_v1.webp', 'La entrada principal', { yMin: 700, piso: { yMin: 700, yMax: 925, xMin: 60, xMax: [1330, 1612] } }],
    ['09_visitante_amarilla_v4_matute_frente.webp', 'La popular visitante', { yMin: 420, ...POPULAR_9, piso: { ...TRIBU, yMin: 420 }, entradas: ARRIBA(420), oleadas: OLEADAS[9].slice() }],   // Matute mira: ya está en el fondo
    ['10_duelo_matute_sin_personaje.webp', '¡Por los trapos del Tablón!', { yMin: 400, ...POPULAR_10, entradas: [ { x: 1300, y: 330 } ], oleadas: [], jefe: 'matute',
      frase: '«Los trapos del Tablón no se tocan. Vas a tener que pasar por encima mío.»' }]]);
  const SL_1_8 = [
    ['01_pasillo_villa_v1.webp', 'El pasillo', EN_PROFUNDIDAD(660, [640, 100], [1100, 1560], [0.62, 1.06], FONDO_Y_ABAJO(660, 860))],
    ['02_calle_estadio_fondo_v1.webp', 'La calle del Nuevo Gasómetro', 665],
    ['03_casas_calle_estadio_lejos_v1.webp', 'Las casas del barrio', 665],
    ['04_casas_estadio_cerca_v1.webp', 'Frente a la cancha', 685],
    ['05_vereda_estadio_v1.webp', 'La vereda del estadio', 665],
    ['06_lateral_solo_vereda_v1.webp', 'El lateral', 655],
    ['07_dentro_predio_columnas_v1.webp', 'Dentro del predio', { yMin: 640, escala: [0.78, 1.06] }],
    ['08_pasillo_bajo_tribunas_v2_invertida.webp', 'Bajo las tribunas', EN_PROFUNDIDAD(600, [200, 60], [1480, 1612], [0.66, 1.06], FONDO_Y_ABAJO(600, 910))]];
  const PANTALLAS_SL_BOCA = nivelesDe('san_lorenzo', [...SL_1_8,
    ['09_popular_abuelo_v1.webp', 'La popular', { yMin: 390, ...POPULAR_9, oleadas: OLEADAS[9].slice() }],   // El Abuelo mira: ya está en el fondo
    ['10_popular_final_sin_abuelo_v1.webp', '¡Por los trapos de la 12!', { yMin: 400, ...POPULAR_10, entradas: [ { x: 1300, y: 330 } ], oleadas: [], jefe: 'el_abuelo',
      frase: '«El trapo de la 12 no se lo lleva nadie. Vas a tener que pasar por encima mío.»' }]], 'san_lorenzo', 'san_lorenzo');
  const PANTALLAS_SL_RIVER = nivelesDe('san_lorenzo', [...SL_1_8,
    ['09_alternativa_river_matute_v1.webp', 'La popular', { yMin: 390, ...POPULAR_9, oleadas: OLEADAS[9].slice() }],   // Matute mira: ya está en el fondo
    ['10_alternativa_river_sin_matute_v1.webp', '¡Por los trapos del Tablón!', { yMin: 400, ...POPULAR_10, entradas: [ { x: 1300, y: 330 } ], oleadas: [], jefe: 'matute',
      frase: '«Los trapos del Tablón no se tocan. Vas a tener que pasar por encima mío.»' }]], 'san_lorenzo', 'san_lorenzo');
  // las miniaturas 9 y 10 de la rama River tienen su propio archivo
  PANTALLAS_SL_RIVER[8].mini = 'assets/escenarios/mini/san_lorenzo_river_09.webp'; PANTALLAS_SL_RIVER[9].mini = 'assets/escenarios/mini/san_lorenzo_river_10.webp';
  /* ---- v64 — CAMPAÑA DE RIVER: cuatro bloques de 10 pantallas (ver js/campana.js) ----------------------------------
     Sede (escenarios) y rival (barras y jefe) son decisiones separadas. Cada set clona las 10 pantallas de su sede.
     · campana_river_vs_san_lorenzo: escenarios de RIVER con barras de San Lorenzo y El Chivo de jefe. Se quitan los personajes
       de Boca del recorrido de River (Cabeza de Poronga, Gordo Escoba, el Abuelo espectador, policía y Abuelo jefe).
       v65: la 9 y la 10 usan los fondos propios de River vs San Lorenzo (ver CAMPANA_SL).
     · campana_racing / campana_independiente: sus 10 pantallas y sus barras; en la 10, solo su referente de jefe (Cacho / El Gallego).
     · campana_boca: las 10 de BOCA con el plantel de Boca (los hinchas de siempre); en la 7 Cabeza de Poronga, en la 8 el Gordo
       Escoba y en la 10 policía + El Abuelo, como en el recorrido original contra Boca. La 9 usa la versión SIN Matute
       (09_visitante_amarilla_v2_escalones): en la campaña de River el jugador puede ser Matute. TODO(arte): 9/10 con banderas de Boca. */
  const JEFE_10 = (lista, jefe, frase, extra = {}) => lista.map(P => P.n === 10 ? { ...P, oleadas: [], jefe, frase,
    entradas: [ { x: 1300, y: (P.piso.yMin || 400) - 70 } ], ...extra } : P);
  const sinBoca = P => { const { especialAlFinal, espectador, guardaespaldas, jefe, frase, ...resto } = P; return resto; };
  // v65 — RIVER VS SAN LORENZO, pantallas 9 y 10 propias (escenarios/RIVER_VS_SAN_LORENZO): tribuna de River con banderas de San Lorenzo.
  //   9: El Chivo YA está dibujado en el fondo (arriba a la derecha, brazos cruzados, mirando abajo a la izquierda): es solo un espectador
  //      del dibujo — no pelea, no recibe daño, no tiene colisión y no cuenta para terminar. Se pelea contra las oleadas de barras.
  //  10: fondo sin personajes; mano a mano contra El Chivo (jefe): sin policía, sin oleadas y sin otro jefe.
  const RVSL = 'assets/escenarios/river_vs_san_lorenzo/';
  const CAMPANA_SL = JEFE_10(PANTALLAS_RIVER.map(sinBoca).map(P =>
      P.n === 9 ? { ...P, escenario: RVSL + '09_tribuna_chivo_escalones_mirada_abajo_izquierda_v4.webp', mini: 'assets/escenarios/mini/river_vs_san_lorenzo_09.webp' }
    : P.n === 10 ? { ...P, escenario: RVSL + '10_duelo_banderas_san_lorenzo_sin_personajes_v1.webp', mini: 'assets/escenarios/mini/river_vs_san_lorenzo_10.webp' } : P),
    'el_chivo', '«Los trapos del Cuervo no se tocan. Vas a tener que pasar por encima mío.»');
  // v66: finales nuevos de Racing, Independiente y Boca (9 = referente dibujado mirando, 10 = mismo sector y mismos trapos, sin personas).
  //      Las 10 son SOLO jugador contra el referente: sin policía, sin oleadas y sin otro jefe (JEFE_10 deja oleadas: []).
  const CF = 'assets/escenarios/campana/', MINI = 'assets/escenarios/mini/';
  const FINAL = (club, f9, f10, piso9, piso10) => P => {
    if (P.n !== 9 && P.n !== 10) return P;
    const y = P.n === 9 ? piso9 : piso10, o = { ...P, escenario: CF + (P.n === 9 ? f9 : f10), mini: `${MINI}campana_${club}_${P.n === 9 ? '09' : '10'}.webp` };
    if (typeof y === 'number') Object.assign(o, { piso: { ...P.piso, yMin: y }, inicio: { x: 280, y: Math.round((y + 925) / 2 + 30) },
      entradas: LADOS(y + 45, Math.round((y + 925) / 2), 885) });
    else Object.assign(o, y);
    return o;
  };
  const CAMPANA_RACING = JEFE_10(PANTALLAS_RACING.map(FINAL('racing', 'racing_09_cuatro_banderas_cacho_observando_v2.webp',
    'racing_10_duelo_cuatro_banderas_sin_personajes_v3.webp', 700, 700)), 'cacho', '«Los trapos de la Academia no se los lleva nadie.»');
  const CAMPANA_INDEPENDIENTE = JEFE_10(PANTALLAS_INDEPENDIENTE.map(FINAL('independiente', 'independiente_09_seis_banderas_gallego_observando_v2.webp',
    'independiente_10_seis_banderas_sin_personajes_v2.webp', 705, 705)), 'el_gallego', '«Los trapos del Rojo se quedan en Avellaneda.»');
  // Boca: toda la escena son escalones amarillos debajo del telón LA BARRA DE JOSE → piso de popular desde y 420 (borde inferior del telón).
  const BOCA_POP = { piso: { ...TRIBU, yMin: 420 }, escala: [0.74, 1.04], inicio: { x: 300, y: 820 }, entradas: LADOS(470, 680, 885) };   // entran por los costados: no caminan por encima del telón
  const CAMPANA_BOCA = JEFE_10(PANTALLAS_BOCA.map(sinBoca).map(P => P.n === 7 ? { ...P, especialAlFinal: 'cabeza_de_poronga' }
    : P.n === 8 ? { ...P, especialAlFinal: 'gordo_escoba' } : P)
    .map(FINAL('boca', 'boca_09_barra_jose_cuatro_trapos_abuelo_v3.webp', 'boca_10_barra_jose_cuatro_trapos_sin_personajes_v3.webp', BOCA_POP, BOCA_POP)),
    'el_abuelo', '«El trapo de la 12 no se lo lleva nadie. Vas a tener que pasar por encima mío.»').map(P => P.n === 10
      ? { ...P, nombre: '¡Por los trapos de la 12!', entradas: [ { x: 1300, y: 470 } ] } : P);
  /* v92 — BELGRANO (Los Piratas). Todavía NO hay escenarios de Belgrano en el proyecto (escenarios/ no tiene carpeta BELGRANO):
     PROVISORIO, recorre las 10 pantallas del Monumental sin los personajes de Boca (como la campaña de River) y pelea contra SUS
     barras (belgrano_01…10, sin el 8), igual que Racing e Independiente pelean contra los suyos. Sin jefe; en la 10, dos camadas.
     TODO(arte): cuando lleguen los escenarios de Belgrano, reemplazar PANTALLAS_BELGRANO con nivelesDe('belgrano', [...]). */
  const PANTALLAS_BELGRANO = PANTALLAS_RIVER.map(sinBoca).map(P => ({ ...P, club: 'belgrano' })).map(P => P.n === 10 ? { ...P, oleadas: OLEADAS[10].slice(),
    entradas: LADOS(470, 680, 885) } : P);
  // v95 — TALLERES y ROSARIO CENTRAL: tampoco hay escenarios propios todavía → mismo recorrido PROVISORIO que Belgrano (Monumental
  // sin los personajes de Boca, contra sus propias barras, sin jefe). TODO(arte): reemplazar cuando lleguen sus escenarios.
  const PROVISORIO = club => PANTALLAS_RIVER.map(sinBoca).map(P => ({ ...P, club })).map(P => P.n === 10 ? { ...P, oleadas: OLEADAS[10].slice(),
    entradas: LADOS(470, 680, 885) } : P);
  /* v106 — BELGRANO COMO LOCAL (otro club visita Alberdi). Fondos 1–8 en el ORDEN DEFINIDO POR DARÍO (escenarios/BELGRANO/
     NIVELES_01_08_ORDEN_USUARIO_v2: 01.png … 08.png, ver ORDEN_DEFINITIVO.json). 9 = popular con El Loco Tito dibujado mirando
     (decorativo: sin colisión, vida ni ataques); 10 = la misma popular SIN Tito: mano a mano contra Tito animado (JEFE_10: sin oleadas).
     Enemigos: los Piratas (belgrano_NN). Misma estructura que Racing / Independiente (OLEADAS, nivel 5 con policías, sin especiales). */
  const BELGRANO_POP = y => ({ piso: { yMin: y, yMax: 925, xMin: 60, xMax: 1612 }, escala: [0.84, 1.06], inicio: { x: 300, y: 830 }, entradas: LADOS(y + 45, Math.round((y + 925) / 2), 885) });
  /* v133 — RIVER como RIVAL (otras barras visitan Núñez): niveles 1–8 = los escenarios originales del recorrido de River, en su orden;
     9 y 10 = ENTREGA_NIVELES_09_10_FINAL (9: Matute observando, dibujado; 10: sin Matute → jefe animado, mano a mano).
     Configuración de los niveles equivalentes de las demás visitas: OLEADAS por nivel, sin especiales de Boca (Cabeza de Poronga,
     Gordo Escoba, El Abuelo espectador), nivel 5 = policías (regla global), jefe Matute con los números del jefe final (El Abuelo). */
  const RIVER_POP = y => ({ piso: { yMin: y, yMax: 925, xMin: 60, xMax: 1612 }, escala: [0.74, 1.04], inicio: { x: 300, y: 840 }, entradas: LADOS(y + 45, Math.round((y + 925) / 2), 885) });
  const ESPECIAL_RIVER = { 3: 'el_tano', 6: 'el_flaco', 7: 'patova', 8: 'vikingo' };   // v225: barras especiales de River, uno por nivel
  const VISITA_RIVER = JEFE_10(PANTALLAS_RIVER.slice(0, 8).map(P => ({ ...sinBoca(P), oleadas: OLEADAS[P.n].slice(), animados: [],
    ...(ESPECIAL_RIVER[P.n] ? { especialAlFinal: ESPECIAL_RIVER[P.n] } : {}) })).concat(
    nivelesDe('river', [['09.webp', 'La popular', { yMin: 540, ...RIVER_POP(540) }], ['10.webp', '¡Por los trapos del Tablón!', { yMin: 540, ...RIVER_POP(540) }]], 'river', 'river')
      .map((P, i) => ({ ...P, n: 9 + i, oleadas: OLEADAS[9 + i].slice(), mini: `assets/escenarios/mini/river_${9 + i && String(9 + i).padStart(2, "0")}.webp` }))),
    'matute', '«El Monumental es nuestro. De acá no te llevás ni un trapo.»');
  /* v138 — LAFERRERE como rival (Los Villeros): 1–5 barrio, 6–7 vereda del estadio, 8 portón negro, 9 popular con El Tuerto observando
     (dibujado), 10 la misma popular sin él → El Tuerto jefe animado, mano a mano. Configuración de los niveles equivalentes (OLEADAS). */
  const VISITA_LAFERRERE = JEFE_10(nivelesDe('laferrere', [
    ['01.webp', 'Casas humildes', 650], ['02.webp', 'Otra cuadra del barrio', 650], ['03.webp', 'La tribuna detrás de los techos', 650],
    ['04.webp', 'La tribuna más cerca', 655], ['05.webp', 'Las últimas casas', 660], ['06.webp', 'La vereda del estadio', 640],
    ['07.webp', 'Por la vereda', 650], ['08.webp', 'El portón negro', 665],
    ['09.webp', 'La popular', { yMin: 530, ...RIVER_POP(530) }], ['10.webp', '¡Por los trapos de La 79!', { yMin: 530, ...RIVER_POP(530) }]], 'laferrere', 'laferrere'),
    'el_tuerto_jefe', '«Acá en Laferrere mandamos nosotros. La 79 no se toca.»');
  /* v139 — CHACARITA como rival (Los Funebreros, San Martín). escenarios/CHACARITA/NIVELES_01_08_v1 01–08 en su orden (1–6 casas de clase
     media con la cancha cada vez más cerca, 7 vereda del estadio, 8 portón negro con el monograma) y NIVELES_09_10_v1 (9 popular con las ocho
     banderas y Muchinga dibujado observando — decorativo —, 10 la misma popular sin él → Muchinga jefe animado, mano a mano). En 9 y 10 se pelea
     sobre la base plana de cemento (yMin = donde terminan los escalones). Configuración de los niveles equivalentes (OLEADAS, nivel 5 policías). */
  const VISITA_CHACARITA = JEFE_10(nivelesDe('chacarita', [
    ['01.webp', 'San Martín, lejos de la cancha', 705], ['02.webp', 'Otra cuadra del barrio', 705], ['03.webp', 'La cancha al fondo', 708],
    ['04.webp', 'La tribuna más cerca', 708], ['05.webp', 'La penúltima cuadra', 712], ['06.webp', 'Las últimas casas', 715],
    ['07.webp', 'La vereda del estadio', 712], ['08.webp', 'El portón negro', 700],
    ['09.webp', 'La popular', { yMin: 712, ...RIVER_POP(712) }], ['10.webp', '¡Por los trapos del Funebrero!', { yMin: 712, ...RIVER_POP(712) }]], 'chacarita', 'chacarita'),
    'muchinga_jefe', '«San Martín es nuestro. Los trapos del Funebrero no se tocan.»');
  /* v140 — NUEVA CHICAGO como rival (La Banda de Chicago, Mataderos). escenarios/CHICAGO/NIVELES_01_08_v1 01–08 en su orden (1–3 la villa de
     ladrillo a la vista, 4–6 el barrio Los Perales acercándose al estadio, 7 vereda de la cancha, 8 la ENTRADA) y NIVELES_09_10_v1 (9 popular con
     las siete banderas y El Paraguayo dibujado observando — decorativo —, 10 la misma popular sin él → El Paraguayo jefe animado, mano a mano).
     En 9 y 10 se pelea sobre la base plana de cemento (yMin = donde terminan los escalones). Configuración de los niveles equivalentes (OLEADAS). */
  const VISITA_CHICAGO = JEFE_10(nivelesDe('chicago', [
    ['01.webp', 'La villa', 736], ['02.webp', 'Ladrillo a la vista', 736], ['03.webp', 'Saliendo de la villa', 726],
    ['04.webp', 'Los Perales', 672], ['05.webp', 'Se ve la cancha', 696], ['06.webp', 'La cancha cerca', 742],
    ['07.webp', 'La vereda de la cancha', 682], ['08.webp', 'La entrada', 682],
    ['09.webp', 'La popular', { yMin: 702, ...RIVER_POP(702) }], ['10.webp', '¡Por los trapos del Torito!', { yMin: 702, ...RIVER_POP(702) }]], 'chicago', 'chicago'),
    'el_paraguayo_jefe', '«Esto es Mataderos. Los trapos de Chicago no se los lleva nadie.»');
  /* v141 — MORÓN como rival (Los Borrachos de Morón). escenarios/MORON/NIVELES_01_08_v2 01–08 en su orden (v2: sin casas pegadas al estadio;
     1–3 barrio, 4–7 paredes exteriores y veredas, 8 la entrada) y NIVELES_09_10_v1 (9 popular con las ocho banderas y El Gordo Cadena dibujado
     observando — decorativo —, 10 la misma popular sin él → El Gordo Cadena jefe animado, mano a mano). En 9 y 10 se pelea sobre la base de cemento. */
  const VISITA_MORON = JEFE_10(nivelesDe('moron', [
    ['01.webp', 'El barrio', 690], ['02.webp', 'Otra cuadra', 690], ['03.webp', 'Se ve la cancha', 700],
    ['04.webp', 'La pared del estadio', 700], ['05.webp', 'Deportivo Morón', 700], ['06.webp', 'Bajo la tribuna', 672],
    ['07.webp', 'La vereda de la cancha', 670], ['08.webp', 'La entrada', 684],
    ['09.webp', 'La popular', { yMin: 718, ...RIVER_POP(718) }], ['10.webp', '¡Por los trapos del Gallo!', { yMin: 718, ...RIVER_POP(718) }]], 'moron', 'moron'),
    'el_gordo_cadena_jefe', '«Esto es Morón. Los trapos de Los Borrachos no se tocan.»');
  /* v142 — ROSARIO CENTRAL como rival (Los Guerreros, Arroyito). escenarios/ROSARIO_CENTRAL/NIVELES_01_08_v1 01–08 en su orden (1–3 barrio,
     4–6 veredas exteriores, 7 la entrada de lejos, 8 la entrada de cerca) y NIVELES_09_10_v1 (9 popular con las cuatro banderas y Pillín dibujado
     observando — decorativo —, 10 la misma popular sin él → Pillín jefe animado, mano a mano). En 9 y 10 el piso y los escalones son AZULES (sin base
     gris): se pelea en la plataforma azul despejada de abajo (yMin = donde termina el último escalón). Cristalería descartada. */
  const VISITA_CENTRAL = JEFE_10(nivelesDe('central', [
    ['01.webp', 'El barrio', 690], ['02.webp', 'Edificios y comercios', 690], ['03.webp', 'La cancha detrás', 698],
    ['04.webp', 'La pared del Gigante', 700], ['05.webp', 'Columnas y escaleras', 705], ['06.webp', 'Cerca del acceso', 700],
    ['07.webp', 'La entrada de lejos', 690], ['08.webp', 'La entrada', 690],
    ['09.webp', 'La popular', { yMin: 745, ...RIVER_POP(745) }], ['10.webp', '¡Por los trapos de Los Guerreros!', { yMin: 745, ...RIVER_POP(745) }]], 'central', 'central'),
    'pillin_jefe', '«Esto es Arroyito. Los trapos de Los Guerreros no se tocan.»');
  /* v143 — NEWELL'S como rival (Los Leprosos, Parque Independencia). escenarios/NEWELLS/NIVELES_01_08_v1 01–08 en su orden (1–3 barrio,
     4–6 el parque con el estadio cada vez más cerca, 7 vereda con palmeras, 8 la puerta) y NIVELES_09_10_v1 (versión con la segunda tribuna arriba:
     9 popular con las ocho banderas y Pimpi dibujado observando — decorativo —, 10 la misma popular sin él → Pimpi jefe animado, mano a mano).
     En 9 y 10 se pelea en la base de cemento de abajo (yMin = donde termina el último escalón negro). */
  const VISITA_NEWELLS = JEFE_10(nivelesDe('newells', [
    ['01.webp', 'El barrio', 700], ['02.webp', 'Cerca del Coloso', 705], ['03.webp', 'Hacia el parque', 700],
    ['04.webp', 'El parque', 650], ['05.webp', 'Entre los árboles', 690], ['06.webp', 'Junto al estadio', 705],
    ['07.webp', 'La vereda de las palmeras', 705], ['08.webp', 'La puerta', 700],
    ['09.webp', 'La popular', { yMin: 785, ...RIVER_POP(785) }], ['10.webp', '¡Por los trapos de Los Leprosos!', { yMin: 785, ...RIVER_POP(785) }]], 'newells', 'newells'),
    'pimpi_jefe', '«Esto es el Parque. Los trapos de Los Leprosos no se tocan.»');
  const VISITA_BELGRANO = JEFE_10(nivelesDe('belgrano', [
    ['01.webp', 'Alberdi, lejos de la cancha', 650], ['02.webp', 'Las casas bajas', 650],
    ['03.webp', 'Se ve el Gigante', 665], ['04.webp', 'La última cuadra', 665],
    ['05.webp', 'Llegando al perímetro', 690], ['06.webp', 'La vereda del estadio', 690],
    ['07.webp', 'La Popular Pirata', 690], ['08.webp', 'El hall de entrada', 760],
    ['09_popular_tito_mira_abajo_izquierda_v2.webp', 'La popular', { yMin: 700, ...BELGRANO_POP(700) }],   // El Loco Tito mira: ya está en el fondo
    ['10_popular_final_sin_tito_v1.webp', '¡Por los trapos del Pirata!', { yMin: 700, ...BELGRANO_POP(700) }]], 'belgrano', 'belgrano'),
    'el_loco_tito', '«Los trapos de Alberdi no se los lleva nadie. Vas a tener que pasar por encima mío.»');
  /* v107 — TALLERES COMO LOCAL (otro club visita a la Fiel). Fondos escenarios/TALLERES/ENTREGA_10_NIVELES_v1/01.png … 10.png en ESE orden
     (1–4 barrio de casas bajas, 5 llegada al lateral, 6–7 veredas paralelas, 8 entrada principal, 9 popular con las siete banderas y El Toro
     dibujado sobre un paravalanchas — decorativo —, 10 la misma popular SIN El Toro: mano a mano contra El Toro animado). Enemigos: los
     Fieles originales (talleres_NN). Misma estructura que Racing / Independiente / Belgrano (OLEADAS, nivel 5 con policías, jefe solo en el 10). */
  const VISITA_TALLERES = JEFE_10(nivelesDe('talleres', [
    ['01.webp', 'Barrio Jardín', 660], ['02.webp', 'Las casas bajas', 660],
    ['03.webp', 'Se ve el estadio', 665], ['04.webp', 'La última cuadra', 665],
    ['05.webp', 'El lateral del estadio', 690], ['06.webp', 'La vereda de la cancha', 740],
    ['07.webp', 'Paralelo a la cancha', 745], ['08.webp', 'La entrada principal', 775],
    ['09.webp', 'La popular', { yMin: 760, ...BELGRANO_POP(760) }],   // El Toro mira: ya está en el fondo
    ['10.webp', '¡Por los trapos de la Fiel!', { yMin: 760, ...BELGRANO_POP(760) }]], 'talleres', 'talleres'),
    'el_toro', '«Los trapos de la Fiel no se tocan. Vas a tener que pasar por encima mío.»');
  /* v106 — SAN LORENZO COMO LOCAL: el visitante recorre los escenarios 1–8 de San Lorenzo. Todavía no hay una popular propia de San Lorenzo
     con El Chivo (las 9/10 de escenarios/SAN_LORENZO tienen dibujados a El Abuelo o a Matute): provisoriamente la 9 y la 10 son las de
     RIVER_VS_SAN_LORENZO (El Chivo mirando con las banderas del Cuervo / duelo sin personajes). TODO(arte): popular de San Lorenzo con El Chivo. */
  const VISITA_SL = JEFE_10(nivelesDe('san_lorenzo', [...SL_1_8,
    ['09_popular_abuelo_v1.webp', 'La popular', { yMin: 390, ...POPULAR_9, oleadas: OLEADAS[9].slice() }],
    ['10_popular_final_sin_abuelo_v1.webp', '¡Por los trapos del Cuervo!', { yMin: 400, ...POPULAR_10 }]], 'san_lorenzo', 'san_lorenzo')
    .map(P => P.n === 9 ? { ...P, escenario: RVSL + '09_tribuna_chivo_escalones_mirada_abajo_izquierda_v4.webp', mini: 'assets/escenarios/mini/river_vs_san_lorenzo_09.webp' }
      : P.n === 10 ? { ...P, escenario: RVSL + '10_duelo_banderas_san_lorenzo_sin_personajes_v1.webp', mini: 'assets/escenarios/mini/river_vs_san_lorenzo_10.webp' } : P),
    'el_chivo', '«Los trapos del Cuervo no se tocan. Vas a tener que pasar por encima mío.»');
  const SETS = {
    river:             { nombre: 'River Plate',   corto: 'RIVER',         niveles: PANTALLAS_RIVER },
    talleres:          { nombre: 'Talleres',      corto: 'TALLERES',      niveles: PROVISORIO('talleres') },   // v95
    central:           { nombre: 'Rosario Central', corto: 'CENTRAL',     niveles: PROVISORIO('central') },    // v95 (no se usa: desde v142 su estadio es visita_central)
    newells:           { nombre: "Newell's",      corto: 'NEWELLS',       niveles: PROVISORIO('newells') },    // v97 (no se usa: desde v143 su estadio es visita_newells)
    moron:             { nombre: 'Morón',         corto: 'MORÓN',         niveles: PROVISORIO('moron') },      // v101 (no se usa: desde v141 su estadio es visita_moron)
    chicago:           { nombre: 'Nueva Chicago', corto: 'CHICAGO',       niveles: PROVISORIO('chicago') },    // v101 (no se usa: desde v140 su estadio es visita_chicago)
    chacarita:         { nombre: 'Chacarita',     corto: 'CHACARITA',     niveles: PROVISORIO('chacarita') },  // v103 (no se usa: desde v139 su estadio es visita_chacarita)
    laferrere:         { nombre: 'Laferrere',     corto: 'LAFERRERE',     niveles: PROVISORIO('laferrere') },  // v104: sin estadio propio todavía
    belgrano:          { nombre: 'Belgrano',      corto: 'BELGRANO',      niveles: PANTALLAS_BELGRANO },   // v92
    racing:            { nombre: 'Racing Club',   corto: 'RACING',        niveles: PANTALLAS_RACING },
    independiente:     { nombre: 'Independiente', corto: 'INDEPENDIENTE', niveles: PANTALLAS_INDEPENDIENTE },
    boca:              { nombre: 'Boca Juniors',  corto: 'BOCA',          niveles: PANTALLAS_BOCA },
    san_lorenzo_boca:  { nombre: 'San Lorenzo',   corto: 'SAN LORENZO',   niveles: PANTALLAS_SL_BOCA,  pestana: 'VS BOCA',  enemigos: 'boca',  rival: 'Boca' },
    san_lorenzo_river: { nombre: 'San Lorenzo',   corto: 'SAN LORENZO',   niveles: PANTALLAS_SL_RIVER, pestana: 'VS RIVER', enemigos: 'river', rival: 'River' },
    // v64 — campaña de River (sede ≠ rival)
    campana_river_vs_san_lorenzo: { nombre: 'River Plate',   corto: 'RIVER',         niveles: CAMPANA_SL,            enemigos: 'san_lorenzo',   rival: 'San Lorenzo' },
    campana_racing:               { nombre: 'Racing Club',   corto: 'RACING',        niveles: CAMPANA_RACING,        enemigos: 'racing',        rival: 'Racing' },
    campana_independiente:        { nombre: 'Independiente', corto: 'INDEPENDIENTE', niveles: CAMPANA_INDEPENDIENTE, enemigos: 'independiente', rival: 'Independiente' },
    campana_boca:                 { nombre: 'Boca Juniors',  corto: 'BOCA',          niveles: CAMPANA_BOCA,          enemigos: 'boca',          rival: 'Boca', sede: 'boca' },
    // v106 — destinos VISITANTES nuevos (sede = club local, enemigos = sus barras)
    visita_san_lorenzo:           { nombre: 'San Lorenzo',   corto: 'SAN LORENZO',   niveles: VISITA_SL,             enemigos: 'san_lorenzo',   rival: 'San Lorenzo', sede: 'san_lorenzo' },
    visita_talleres:              { nombre: 'Talleres',      corto: 'TALLERES',      niveles: VISITA_TALLERES,       enemigos: 'talleres',      rival: 'Talleres', sede: 'talleres' },   // v107
    visita_laferrere:             { nombre: 'Laferrere',     corto: 'LAFERRERE',     niveles: VISITA_LAFERRERE,      enemigos: 'laferrere',     rival: 'Laferrere', sede: 'laferrere' },   // v138
    visita_chacarita:             { nombre: 'Chacarita',     corto: 'CHACARITA',     niveles: VISITA_CHACARITA,      enemigos: 'chacarita',     rival: 'Chacarita', sede: 'chacarita' },   // v139
    visita_chicago:               { nombre: 'Nueva Chicago', corto: 'CHICAGO',       niveles: VISITA_CHICAGO,        enemigos: 'chicago',       rival: 'Nueva Chicago', sede: 'chicago' },   // v140
    visita_moron:                 { nombre: 'Morón',         corto: 'MORÓN',         niveles: VISITA_MORON,          enemigos: 'moron',         rival: 'Morón', sede: 'moron' },   // v141
    visita_central:               { nombre: 'Rosario Central', corto: 'CENTRAL',     niveles: VISITA_CENTRAL,        enemigos: 'central',       rival: 'Rosario Central', sede: 'central' },   // v142
    visita_newells:               { nombre: "Newell's",      corto: 'NEWELLS',       niveles: VISITA_NEWELLS,        enemigos: 'newells',       rival: "Newell's", sede: 'newells' },   // v143
    visita_river:                 { nombre: 'River Plate',   corto: 'RIVER',         niveles: VISITA_RIVER,          enemigos: 'river',         rival: 'River', sede: 'river' },   // v133
    visita_belgrano:              { nombre: 'Belgrano',      corto: 'BELGRANO',      niveles: VISITA_BELGRANO,       enemigos: 'belgrano',      rival: 'Belgrano', sede: 'belgrano' }
  };
  SETS.campana_racing.sede = 'racing'; SETS.campana_independiente.sede = 'independiente';
  // Barras de los otros clubes: numeración de las carpetas (1 al 10, sin el 8). Animaciones en js/sprites_clubes.js.
  const NUMEROS_CLUB = [1, 2, 3, 4, 5, 6, 7, 9, 10];
  const NUMEROS_FIEL_GUERREROS = [1, 2, 3, 4, 5, 6, 7, 8, 10];   // v95: Talleres y Central tienen el 8 y NO el 9
  const poolClub = (club, apodo, nums = NUMEROS_CLUB) => nums.map(n => ({ id: `${club}_${String(n).padStart(2, '0')}`, tipo: 'comun', nombre: `${apodo} ${n}`,
    sprite: `assets/enemigos/clubes/${club}/barra_${n}/01_guardia.webp`, espejo: null, mira: 1, club }));
  const POOLS = { boca: POOL_BOCA, river: poolClub('river', 'Tablón'), racing: poolClub('racing', 'Academia'), independiente: poolClub('independiente', 'Rojo'),
                  san_lorenzo: poolClub('san_lorenzo', 'Cuervo'), belgrano: poolClub('belgrano', 'Pirata'),   // v92: + Belgrano
                  talleres: poolClub('talleres', 'Fiel', NUMEROS_FIEL_GUERREROS), central: poolClub('central', 'Guerrero', NUMEROS_FIEL_GUERREROS),   // v95
                  newells: poolClub('newells', 'Leproso', NUMEROS_FIEL_GUERREROS),   // v97: Leprosos 1–8 y 10
                  moron: poolClub('moron', 'Gallo', NUMEROS_FIEL_GUERREROS), chicago: poolClub('chicago', 'Torero', NUMEROS_FIEL_GUERREROS),
                  laferrere: poolClub('laferrere', 'Villero', NUMEROS_FIEL_GUERREROS),
                  chacarita: poolClub('chacarita', 'Funebrero', NUMEROS_FIEL_GUERREROS) };   // v139: Funebreros 1–8 y 10   // v104: Villeros 1–8 y 10   // v101: Gallos y Toreros 1–8 y 10
  const CLUBES = {
    river:         { nombre: 'River Plate',   corto: 'RIVER',         enemigos: 'boca',          rival: 'Boca',          sets: ['river'],
                     campana: ['campana_river_vs_san_lorenzo', 'campana_racing', 'campana_independiente', 'campana_boca'] },   // v64
    boca:          { nombre: 'Boca Juniors',  corto: 'BOCA',          enemigos: 'river',         rival: 'River',         sets: ['boca'] },
    racing:        { nombre: 'Racing Club',   corto: 'RACING',        enemigos: 'racing',        rival: 'Racing',        sets: ['racing'] },
    independiente: { nombre: 'Independiente', corto: 'INDEPENDIENTE', enemigos: 'independiente', rival: 'Independiente', sets: ['independiente'] },
    san_lorenzo:   { nombre: 'San Lorenzo',   corto: 'SAN LORENZO',   enemigos: 'boca',          rival: 'Boca',          sets: ['san_lorenzo_boca', 'san_lorenzo_river'] },
    belgrano:      { nombre: 'Belgrano',      corto: 'BELGRANO',      enemigos: 'belgrano',      rival: 'Belgrano',      sets: ['belgrano'] },   // v92
    talleres:      { nombre: 'Talleres',      corto: 'TALLERES',      enemigos: 'talleres',      rival: 'Talleres',      sets: ['talleres'] },   // v95: la Fiel
    central:       { nombre: 'Rosario Central', corto: 'CENTRAL',     enemigos: 'central',       rival: 'Rosario Central', sets: ['central'] },   // v95: los Guerreros
    newells:       { nombre: "Newell's Old Boys", corto: 'NEWELLS',     enemigos: 'newells',       rival: "Newell's",      sets: ['newells'] },   // v97: los Leprosos
    moron:         { nombre: 'Deportivo Morón', corto: 'MORÓN',       enemigos: 'moron',         rival: 'Morón',         sets: ['moron'] },     // v101: Los Borrachos de Morón
    chicago:       { nombre: 'Nueva Chicago', corto: 'CHICAGO',       enemigos: 'chicago',       rival: 'Nueva Chicago', sets: ['chicago'] },    // v101: La Banda de Chicago
    // v103 — CHACARITA (Funebreros). v139: sus barras ya están en el juego (chacarita_NN) y su estadio es destino de campaña (visita_chacarita).
    chacarita:     { nombre: 'Chacarita',     corto: 'CHACARITA',     enemigos: 'chacarita',     rival: 'Chacarita',     sets: ['chacarita'] },
    laferrere:     { nombre: 'Deportivo Laferrere', corto: 'LAFERRERE', enemigos: 'laferrere',   rival: 'Laferrere',     sets: ['laferrere'] }   // v104: Los Villeros (recorrido provisorio)
  };
  /* v106 — REGLA GENERAL: EL JUGADOR SIEMPRE ES VISITANTE. Elegir una barra = a quién representa el jugador, NO dónde empieza.
     DESTINOS = clubes locales con recorrido completo (sus 10 escenarios, sus barras y su jefe), en el orden vigente de la campaña
     (San Lorenzo → Racing → Independiente → Boca) más Belgrano. El club del jugador se EXCLUYE de sus destinos SIEMPRE: al armar la
     lista de cada club, al elegir/cambiar destino (configurar), al avanzar de estadio (js/campana.js) y al cargar lo guardado
     ('barra14.escenarios' o una campaña vieja): un destino del propio club se descarta y se usa el primero válido. */
  const DESTINOS = [
    { club: 'san_lorenzo',   set: 'visita_san_lorenzo',    nombre: 'San Lorenzo',   lugar: 'en el Nuevo Gasómetro' },
    { club: 'racing',        set: 'campana_racing',        nombre: 'Racing',        lugar: 'en el Cilindro' },
    { club: 'independiente', set: 'campana_independiente', nombre: 'Independiente', lugar: 'en la Doble Visera' },
    { club: 'boca',          set: 'campana_boca',          nombre: 'Boca',          lugar: 'en la Bombonera' },
    { club: 'belgrano',      set: 'visita_belgrano',       nombre: 'Belgrano',      lugar: 'en el Gigante de Alberdi' },
    { club: 'talleres',      set: 'visita_talleres',       nombre: 'Talleres',      lugar: 'en barrio Jardín' },   // v107
    { club: 'river',         set: 'visita_river',          nombre: 'River',         lugar: 'en el Monumental' },   // v133
    { club: 'laferrere',     set: 'visita_laferrere',      nombre: 'Laferrere',     lugar: 'en Gregorio de Laferrere' },   // v138
    { club: 'chacarita',     set: 'visita_chacarita',      nombre: 'Chacarita',     lugar: 'en San Martín' },   // v139
    { club: 'chicago',       set: 'visita_chicago',        nombre: 'Nueva Chicago', lugar: 'en Mataderos' },   // v140
    { club: 'moron',         set: 'visita_moron',          nombre: 'Morón',         lugar: 'en el Francisco Urbano' },   // v141
    { club: 'central',       set: 'visita_central',        nombre: 'Rosario Central', lugar: 'en Arroyito' },   // v142
    { club: 'newells',       set: 'visita_newells',        nombre: "Newell's",      lugar: 'en el Parque Independencia' }   // v143
  ];
  const normalClub = c => String(c || '').replace(/-/g, '_');
  // un juego de escenarios es válido para un club si NO es su sede y NO pelea contra sus propias barras
  const esVisitante = (club, setId) => { const S = SETS[setId]; return !!S && !!S.sede && S.sede !== normalClub(club) && S.enemigos !== normalClub(club); };
  const destinosDe = club => DESTINOS.filter(d => esVisitante(club, d.set));
  for (const [id, C] of Object.entries(CLUBES)) {
    C.sets = destinosDe(id).map(d => d.set);                         // menú de escenarios: solo destinos visitantes, en orden
    if (C.campana) C.campana = C.sets.slice();                         // campaña de River: los mismos destinos
    const primero = SETS[C.sets[0]]; C.enemigos = primero.enemigos; C.rival = primero.rival;
  }
  for (const [id, S] of Object.entries(SETS)) if (!S.pestana && S.sede) S.pestana = `EN ${S.corto}`;
  const clubDeId = id => { const c = String(id || '').replace(/-/g, '_'); return CLUBES[c] ? c : 'river'; };
  const activo = { club: 'river', set: 'river', enemigos: 'boca', rival: 'Boca' };
  // v69 — NIVEL 5 DE TODOS LOS RECORRIDOS (cada club, cada juego de escenarios y cada bloque de la campaña): SOLO los cuatro
  // policías, uno de cada tipo. Se quitan oleadas, barras animados, especial, guardaespaldas, jefe y espectador de ese nivel:
  // nada más puede generarse ahí. El escenario y el resto del nivel quedan igual. No agrega policías a ningún otro nivel.
  const POLICIAS_N5 = ['policia', 'policia_musculoso', 'policia_normal', 'policia_guia'];
  // v71 — NOMBRES DE NIVEL: regla global y permanente. El título visible de CUALQUIER nivel, de cualquier club, juego de
  // escenarios o bloque de campaña, es SOLO «NIVEL n» con n = número LOCAL del recorrido (1 a 10; cada bloque vuelve a 1).
  // Los nombres de calles/lugares viejos quedan como dato interno (P.lugar) y no se muestran en ninguna pantalla.
  // Para niveles o campañas nuevas: no escribir títulos propios; esta función los pisa siempre.
  const tituloNivel = n => `NIVEL ${n}`;
  const nombreGenerico = P => ({ ...P, lugar: P.lugar || P.nombre, nombre: tituloNivel(P.n) });
  const nivel5Policias = P => {
    if (P.n !== 5) return P;
    const { especialAlFinal, guardaespaldas, jefe, frase, espectador, ...resto } = P;
    return { ...resto, oleadas: [], animados: [], policias: POLICIAS_N5.slice() };
  };
  /* v150 — ESCALA HUMANA Y CORDÓN, calibrado escenario por escenario (puertas, ventanas, persianas, escalones de cada fondo).
     clave = fondo sin 'assets/escenarios/' ni extensión → [cordón, alto lejos, alto cerca]
       · cordón: y del borde de la calle (donde termina la vereda). Es el nuevo yMin: nadie pisa la vereda ni va hacia las casas.
         0 = no se toca el piso (populares 9/10: se pelea en los escalones como antes).
       · alto lejos: medición de puertas (0,8–0,85 × la puerta de calle más cercana); v154 lo usa × 1,25 (ver calibrar).
       · tercer valor: histórico de v150 (ya no se usa; v154 calcula el alto cerca en calibrar).
     Escala del motor = Perspectiva (lineal y acotada entre el cordón y 925). El daño, la vida, las velocidades y la tolerancia de
     profundidad de los golpes NO cambian (ver factorProf en js/juego.js). */
  const CALIBRACION = {
    'san_lorenzo/01_pasillo_villa_v1': [660, 165, 260],
    'san_lorenzo/02_calle_estadio_fondo_v1': [705, 165, 260],
    'san_lorenzo/03_casas_calle_estadio_lejos_v1': [705, 190, 260],
    'san_lorenzo/04_casas_estadio_cerca_v1': [708, 180, 260],
    'san_lorenzo/05_vereda_estadio_v1': [665, 135, 216],
    'san_lorenzo/06_lateral_solo_vereda_v1': [660, 135, 216],
    'san_lorenzo/07_dentro_predio_columnas_v1': [645, 140, 224],
    'san_lorenzo/08_pasillo_bajo_tribunas_v2_invertida': [605, 165, 260],
    'river_vs_san_lorenzo/09_tribuna_chivo_escalones_mirada_abajo_izquierda_v4': [0, 210, 270],
    'river_vs_san_lorenzo/10_duelo_banderas_san_lorenzo_sin_personajes_v1': [0, 210, 270],
    'racing/01_calle_lejana_v1': [700, 130, 208],
    'racing/02_plazoleta_barrio_v1': [700, 130, 208],
    'racing/03_tanque_copa_intercontinental_v1': [700, 130, 208],
    'racing/04_acercamiento_estadio_v1': [700, 140, 224],
    'racing/05_calle_lateral_estadio_v1': [700, 140, 224],
    'racing/06_lateral_cercano_sin_torre_v1': [700, 140, 224],
    'racing/07_vereda_lateral_estadio_v2_carteles': [700, 165, 260],
    'racing/08_entrada_puertas_24_25_v2_escaleras': [710, 170, 260],
    'campana/racing_09_cuatro_banderas_cacho_observando_v2': [0, 200, 260],
    'campana/racing_10_duelo_cuatro_banderas_sin_personajes_v3': [0, 200, 260],
    'independiente/01_calle_industrial_lejana_v1': [665, 140, 224],
    'independiente/02_galpones_acercamiento_v1': [660, 140, 224],
    'independiente/03_deposito_estadio_cercano_v1': [665, 125, 200],
    'independiente/04_barrio_casas_estadio_v1': [665, 140, 224],
    'independiente/05_barrio_esquina_estadio_v1': [660, 135, 216],
    'independiente/06_calle_frente_estadio_v1': [700, 130, 208],
    'independiente/07_lateral_alto_sin_frase_v1': [752, 125, 200],
    'independiente/08_lateral_accesos_escaleras_v1': [752, 125, 200],
    'campana/independiente_09_seis_banderas_gallego_observando_v2': [0, 200, 260],
    'campana/independiente_10_seis_banderas_sin_personajes_v2': [0, 200, 260],
    'boca/01_barrio_conventillos_lejana_v1': [700, 180, 260],
    'boca/02_barrio_acercamiento_v1': [700, 175, 260],
    'boca/03_barrio_estadio_cercano_v1': [700, 160, 256],
    'boca/04_pasillo_vertical_v2': [590, 110, 176],
    'boca/05_calle_lateral_estadio_v1': [735, 131, 210],
    'boca/06_lateral_blanco_frontal_v1': [670, 150, 240],
    'boca/07_esquina_estadio_v1': [730, 120, 192],
    'boca/08_esquina_entrada_principal_v1': [700, 113, 181],
    'campana/boca_09_barra_jose_cuatro_trapos_abuelo_v3': [0, 210, 270],
    'campana/boca_10_barra_jose_cuatro_trapos_sin_personajes_v3': [0, 210, 270],
    'belgrano/01': [670, 150, 240],
    'belgrano/02': [695, 150, 240],
    'belgrano/03': [740, 130, 208],
    'belgrano/04': [745, 130, 208],
    'belgrano/05': [705, 150, 240],
    'belgrano/06': [700, 150, 240],
    'belgrano/07': [700, 150, 240],
    'belgrano/08': [765, 140, 224],
    'belgrano/09_popular_tito_mira_abajo_izquierda_v2': [0, 200, 260],
    'belgrano/10_popular_final_sin_tito_v1': [0, 200, 260],
    'talleres/01': [730, 145, 232],
    'talleres/02': [730, 145, 232],
    'talleres/03': [745, 130, 208],
    'talleres/04': [745, 130, 208],
    'talleres/05': [750, 115, 184],
    'talleres/06': [745, 125, 200],
    'talleres/07': [750, 125, 200],
    'talleres/08': [780, 120, 192],
    'talleres/09': [0, 200, 260],
    'talleres/10': [0, 200, 260],
    'pantalla_01_calle_lejana': [665, 115, 184],
    'pantalla_02_frente_estadio': [665, 115, 184],
    'pantalla_03_lateral': [730, 145, 232],
    'pantalla_04_vereda_monumental': [600, 150, 240],
    'pantalla_05_vereda_monumental': [600, 150, 240],
    'pantalla_06_puerta_lejana': [600, 150, 240],
    'pantalla_07_frente_puerta_12': [600, 150, 240],
    'pantalla_08_escalera_ascenso': [430, 160, 280],
    'river/09': [0, 210, 270],
    'river/10': [0, 210, 270],
    'laferrere/01': [700, 145, 232],
    'laferrere/02': [730, 145, 232],
    'laferrere/03': [725, 150, 240],
    'laferrere/04': [725, 145, 232],
    'laferrere/05': [730, 150, 240],
    'laferrere/06': [645, 155, 248],
    'laferrere/07': [650, 155, 248],
    'laferrere/08': [665, 150, 240],
    'laferrere/09': [0, 210, 270],
    'laferrere/10': [0, 210, 270],
    'chacarita/01': [745, 140, 224],
    'chacarita/02': [745, 145, 232],
    'chacarita/03': [745, 140, 224],
    'chacarita/04': [760, 165, 260],
    'chacarita/05': [735, 150, 240],
    'chacarita/06': [750, 155, 248],
    'chacarita/07': [712, 155, 248],
    'chacarita/08': [765, 130, 208],
    'chacarita/09': [0, 200, 260],
    'chacarita/10': [0, 200, 260],
    'chicago/01': [760, 120, 192],
    'chicago/02': [760, 120, 192],
    'chicago/03': [745, 125, 200],
    'chicago/04': [680, 125, 200],
    'chicago/05': [696, 125, 200],
    'chicago/06': [690, 125, 200],
    'chicago/07': [680, 150, 240],
    'chicago/08': [682, 140, 224],
    'chicago/09': [0, 200, 260],
    'chicago/10': [0, 200, 260],
    'moron/01': [730, 155, 248],
    'moron/02': [730, 165, 260],
    'moron/03': [736, 150, 240],
    'moron/04': [746, 130, 208],
    'moron/05': [700, 140, 224],
    'moron/06': [672, 150, 240],
    'moron/07': [670, 145, 232],
    'moron/08': [684, 145, 232],
    'moron/09': [0, 200, 260],
    'moron/10': [0, 200, 260],
    'central/01': [736, 145, 232],
    'central/02': [736, 125, 200],
    'central/03': [734, 140, 224],
    'central/04': [740, 135, 216],
    'central/05': [740, 135, 216],
    'central/06': [736, 135, 216],
    'central/07': [690, 120, 192],
    'central/08': [725, 140, 224],
    'central/09': [0, 200, 260],
    'central/10': [0, 200, 260],
    'newells/01': [746, 145, 232],
    'newells/02': [746, 130, 208],
    'newells/03': [710, 150, 240],
    'newells/04': [650, 135, 216],
    'newells/05': [690, 140, 224],
    'newells/06': [705, 140, 224],
    'newells/07': [720, 120, 192],
    'newells/08': [700, 145, 232],
    'newells/09': [0, 200, 260],
    'newells/10': [0, 200, 260]
  };
  const calibrar = P => {
    const id = String(P.escenario || '').replace(/^assets\/escenarios\//, '').replace(/\.[a-z0-9]+$/i, ''), c = CALIBRACION[id];
    if (!c || !P.piso) return P;
    const [cordon, lejosPuerta] = c, piso = { ...P.piso };
    if (cordon) piso.yMin = cordon;
    // v154 — populares 9/10 (cordon 0): sin calle ni puertas → conservan su escala de siempre (sin reducción extra).
    if (!cordon) return P;
    // v154 — ESCALA HUMANA CORREGIDA. v150 comprimía demasiado la perspectiva (cerca = lejos × 1,6, tope 260 px): en primer plano los
    // personajes quedaban chicos frente a veredas y puertas. Ahora: lejos = 1,25 × lo medido en las puertas (una persona de 1,75 m junto
    // al cordón ≈ 0,9–1 de una puerta de 2 m que está más atrás, en la fachada) y cerca (y 925) = lejos × 2,2, acotado a 300–380 px
    // (perspectiva del suelo moderada; ni gigantes ni diminutos). Una sola reducción: este perfil reemplaza a NIV.escala.
    const lejos = Math.round(lejosPuerta * 1.25), cerca = Math.max(300, Math.min(380, Math.round(lejos * 2.2)));
    const Q = { ...P, piso, persp: { farY: piso.yMin, nearY: piso.yMax, farHeight: lejos, nearHeight: cerca } };
    if (cordon) {   // entradas e inicio siempre en la calle (los que entran por el costado no caminan por la vereda)
      Q.entradas = (P.entradas || []).map(e => e.y < cordon + 12 ? { ...e, y: cordon + 12 } : e);
      if (P.inicio && P.inicio.y < cordon + 30) Q.inicio = { ...P.inicio, y: cordon + 30 };
    }
    return Q;
  };
  function configurar(clubId, setId) {
    const club = clubDeId(clubId), C = CLUBES[club];
    // v106: solo destinos visitantes del club; cualquier otro (o uno guardado de antes, o el del propio club) → el primero válido
    const set = ((C.sets.includes(setId) || (C.campana || []).includes(setId)) && esVisitante(club, setId)) ? setId : C.sets[0], S = SETS[set];
    if (!esVisitante(club, set)) throw new Error(`[Visitante] ${club} no puede jugar en ${set}`);
    const enemigos = S.enemigos || C.enemigos, rival = S.rival || C.rival;
    // animados obligatorios: solo tienen sentido con el plantel de Boca en los escenarios de River (lo que ya existía)
    const lista = S.niveles.map(P => ({ ...P, oleadas: P.oleadas.slice(), animados: enemigos === 'boca' ? (P.animados || []).slice() : [] }))
      .map(nivel5Policias).map(nombreGenerico).map(calibrar);
    PANTALLAS.length = 0; lista.forEach(P => PANTALLAS.push(P));          // se cambia EN EL LUGAR: el motor guarda la referencia
    POOL_COMUNES.length = 0; POOLS[enemigos].forEach(d => POOL_COMUNES.push(d));
    Object.assign(activo, { club, set, enemigos, rival, sede: S.sede });
    try { localStorage.setItem('barra14.escenarios', set); } catch (e) {}
    return activo;
  }
  { let club = 'river', set = null;
    try { club = localStorage.getItem('barra14.barra') || 'river'; set = localStorage.getItem('barra14.escenarios'); } catch (e) {}
    configurar(club, set); }

  global.Niveles = { CALIBRACION, DESTINOS, destinosDe, esVisitante, tituloNivel, CLUBES, SETS, POOLS, activo, configurar, clubDeId, PANTALLAS, POOL_COMUNES, PLANTEL, ESPECIALES, ESCALADO, BASE, VIDA_COMUN, INCOMPATIBLES, statsEnemigo, sortearNivel, armarCamadas, camadaValida, pantalla, TOTAL: PANTALLAS.length };
})(typeof window !== 'undefined' ? window : globalThis);
