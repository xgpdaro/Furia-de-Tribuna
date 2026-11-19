/* =====================================================================
   v78 — BATALLA CAMPAL · primer combate de prueba: 50 ARGENTINOS contra 50 INGLESES (provisionales)
   ---------------------------------------------------------------------
   Motor propio y AISLADO de la campaña (no carga js/juego.js, js/campana.js ni js/ranking.js):
   no toca la barra elegida, la campaña, los trapos, el ranking ni los trucos de creador.
   Reutiliza: daño (ReglasCombate + Combate), defensa del jugador (Defensa), poder (Poder: carga 7 y lluvia),
   recuperadores (Damajuana), cuadros de los referentes (SPRITES_REFERENTES + sprites_pistola) y de las barras
   (SPRITES_ENEMIGOS de sprites_clubes: RACING = aliados provisionales · INDEPENDIENTE = sustituto visual de los ingleses).

   EQUIPOS (v80: exactamente 96 entidades, cada una con id único y facción explícita — nunca se deduce por la camiseta):
     ARGENTINA 36 = 1 jugador (el referente elegido) + 5 referentes con IA + 30 barras de Racing · INGLATERRA 60 = barras de Independiente.
   IA (v80): prioridad al rival más cercano que ya está al alcance; objetivo sostenido 0,6–1 s; golpe con preparación/impacto/
     recuperación y el siguiente a los 0,2–0,6 s; combos cortos; bloqueos breves con reacción y error, y contraataque; anti-cadena.
     Diagnóstico: BB_BATALLA.diagnostico() y ?debug=ia (estado, objetivo, distancia y motivo de cada uno en pantalla).
   ESCENARIO (v79): ROTONDA diurna `bonus_rotonda_monumento_sin_personajes_v1.webp` (2172 × 724, panorama 3:1, sin personajes).
     El fondo callejero al atardecer es SOLO del selector (index.html). Se camina únicamente sobre el ASFALTO CERCANO, delante de la
     isla del monumento (polígono PISO): isla, monumento, árboles, veredas, edificios y avenidas del horizonte quedan fuera.
     Capacidad medida (t76/capacidad_rotonda.js): ~411 000 px² caminables (1700–1830 × 232 px); con la separación mínima de la IA
     (46 × 15 px cerca) entran ~530 cuerpos y con 60 × 20, ~311 → los 100 pelean con aire.
   CÁMARA: zoom uniforme 1,7 (se ven 983 × 553 px del fondo, sin estirar); personajes de 120–150 px del fondo → 204–255 px en
     pantalla; sigue al jugador en horizontal dentro de los 2172 px del panorama, siempre abajo (asfalto cercano). La misma
     transformación sirve para dibujo, cámara y colisiones. Profundidad acotada (y 484–716) y el lejano mide el 80 % del cercano.
   RENDIMIENTO: las 100 entidades se simulan siempre (movimiento cada cuadro; decisiones de IA escalonadas cada 0,25–0,45 s);
     vecinos, objetivos y separación con rejilla espacial (celdas de 64 px); solo se recorta el DIBUJO fuera de cámara.
     Las imágenes se piden una vez por archivo y se guardan reducidas (lienzos compartidos por todas las unidades del mismo tipo).
   ===================================================================== */
(function () {
  'use strict';
  const R = window.ReglasCombate, C = window.Combate, D = window.Defensa, PD = window.Poder, DMJ = window.Damajuana;
  const ID = window.IDENTIDAD || { hueso: '#F5F0E4', huesoSuave: '#D8D0BE', dorado: '#C9A44A', doradoClaro: '#FFE3A0', carbon: '#151515', carbonA: a => `rgba(21,21,21,${a})` };

  /* ---------------- Configuración (ajustable) ---------------- */
  // v79 — el COMBATE usa la ROTONDA diurna (2172 × 724, panorama 3:1, sin personajes). El fondo callejero al atardecer queda
  // SOLO para el selector (index.html). Mundo = px del fondo; pantalla = canvas 1672 × 941. Una sola transformación (zoom
  // uniforme + desplazamiento de cámara) para dibujo, cámara y colisiones: el panorama nunca se estira a 16:9.
  const PANT = { w: 1672, h: 941 };                        // canvas (HUD y carteles)
  const MUNDO = { w: 2172, h: 724 };                       // = el fondo de combate, en px del fondo
  const FONDO = 'assets/fondos/bonus_rotonda_monumento_sin_personajes_v1.webp';
  const LOGO = 'assets/logos/furia_de_tribuna.webp';
  const ZOOM = 1.7;                                        // cámara: px de pantalla por px del fondo (ve 983 × 553 del fondo)
  // Piso caminable: ASFALTO CERCANO de la rotonda (px del fondo), DELANTE de la isla del monumento (su borde frontal está en
  // y ≈ 474): la isla, el monumento, los árboles, las veredas, los edificios y las avenidas del horizonte quedan fuera.
  // Bordes izquierdo/derecho por profundidad [y, x] (cordones de las veredas laterales), de lejos a cerca.
  const PISO = {
    yMin: 484, yMax: 716,
    izq: [[480, 152], [534, 180], [724, 238]],
    der: [[480, 2010], [534, 2004], [724, 1958]],
    margen: 12
  };
  // Alto del cuerpo PARADO en px del fondo: 120 al fondo del asfalto y 150 adelante (el lejano mide el 80 % del cercano,
  // como pide la prueba de escala de la rotonda: profundidad jugable poco profunda, sin miniaturas).
  const ALTO = { lejos: 120, cerca: 150, yLejos: 484, yCerca: 716 };
  const ALTO_PERSONAJE = 345;                              // alto a escala 1 del motor (las distancias de golpe están en esa escala)
  const ALCANCE = { Trompadas: 150, Patadas: 190, pina: 150, patada: 185, especial: 165 };   // v164: especial de los hooligans (37 → 39 → 40)   // = js/juego.js
  const PROF_GOLPE = 42;                                   // tolerancia de profundidad a escala 1 (= js/juego.js)
  const VEL = { jugador: 300, referente: 165, npc: 150 };  // px/s a escala 1 (= js/juego.js: 300 jugador · 150 enemigos)
  const TIEMPO = { ataque: 0.30, impacto: 0.11, dolorJugador: 0.45, invulnerable: 0.7, dolorNpc: 0.34, dolorRef: 0.45,
                   ko: 2.6, desvanecer: 0.8, intro: 1.6, finResultado: 1.4, chispa: 0.18, chispaBloqueo: 0.26 };
  const KO_ANIM = { reaccion: 0.12, caida: 0.30 };
  /* v80 — IA de pelea intensa. Tiempos en segundos; distancias a escala cercana (px del fondo) salvo que se indique.
     Ciclo de cada golpe: PREPARACIÓN (se ve la anticipación) → IMPACTO (el daño entra una sola vez) → RECUPERACIÓN.
     La próxima acción ofensiva llega entre 0,2 y 0,6 s después de terminar la recuperación (según el «ritmo» de cada uno). */
  const IA = {
    piensa: [0.12, 0.22],                                  // s entre decisiones de objetivo (escalonado por unidad)
    npc:       { preparacion: 0.28, recuperacion: 0.30, cadencia: [0.2, 0.6], pPatada: 0.30, pCombo: 0.35, pBloqueo: 0.42 },
    referente: { preparacion: 0.22, recuperacion: 0.28, cadencia: [0.2, 0.5], pPatada: 0.35, pCombo: 0.45, pBloqueo: 0.55 },
    combo: { pausa: [0.08, 0.16], extra: [1, 2] },          // combos cortos: 2 o 3 golpes (piña, piña, patada)
    bloqueo: { reaccion: [0.06, 0.16], dura: [0.30, 0.50], enfriar: [0.7, 1.3], contra: [0.04, 0.12], pctNpc: 30, pctRef: 20, olvido: 2.5 },
    aturdir: { cadena: 3, ventana: 1.6, escape: 1.0 },      // al 3.er golpe seguido: 1 s en que los golpes duelen pero no lo frenan
    retencion: [0.6, 1.0],                                 // s que se sostiene un objetivo (salvo que muera o aparezca otro pegado)
    cupo: 4, cupoJugador: 2,                               // atacantes cómodos por víctima (2 por lado); el resto busca otro rival
    distGolpe: 0.6,                                        // se para a este % del alcance (y nunca dentro de la separación entre rivales)
    separacion: { rx: 52, ry: 17 },                        // elipse mínima entre ALIADOS
    separacionRival: { rx: 34, ry: 12 },                   // elipse mínima entre RIVALES: menor que el alcance de piña (65) y patada (80)
    gentio: { rx: 95, ry: 40, peso: 18 },                  // penalidad por cuerpo alrededor del candidato (reparte la pelea)
    aire: 1.35,                                            // el que camina (sin pelear) mantiene × esta distancia con sus aliados
    celda: 64
  };
  const MAX_DIBUJO_FUERA = 160;                            // margen de recorte del dibujo fuera de cámara (px del fondo)
  const CACHE_REF = 300;                                   // alto en px de los lienzos reducidos (≥ lo que mide en pantalla)
  const RACING = ['racing_01', 'racing_02', 'racing_03', 'racing_04', 'racing_05', 'racing_06'];
  /* v164 — BARRAS BRAVAS VS HOOLIGANS: el lado inglés ya NO usa barras de Independiente (siguen intactos en el resto del juego).
     60 HOOLIGANS COMUNES (12 modelos repartidos con variedad) + 5 REFERENTES que aparecen por bajas de comunes:
     12 → Cass «The General» · 24 → Carlton Leach · 36 → One-Eyed Baz · 48 → F-Troop · 60 → Tony O'Neill. Uno por vez: si otro umbral
     llega con un referente en cancha, queda pendiente y entra en orden cuando termina el anterior. Sus muertes NO suman al contador.
     Victoria = los 60 comunes y los 5 referentes fuera de combate (js/sprites_hooligans.js: cuadros y poses). */
  const SH = window.SPRITES_HOOLIGANS || {};
  const HOOLIGANS = Array.from({ length: 12 }, (_, i) => `hooligan_${String(i + 1).padStart(2, '0')}`);
  const JEFES_ING = [ { id: 'cass', umbral: 12 }, { id: 'carlton', umbral: 24 }, { id: 'baz', umbral: 36 }, { id: 'ftroop', umbral: 48 }, { id: 'tony', umbral: 60 } ];
  /* v165 — IGUALDAD ENTRE BANDOS (configuración compartida, se arma con los valores efectivos del bando argentino de ESTA batalla):
     · comunes ingleses = barras comunes argentinos: NPC_STATS (vida, piña, patada); el especial pega como la patada (sin extra).
     · referentes ingleses = referentes argentinos: vida R.BALANCE.vidaBaseJugador y daño = promedio del daño real
       (R.danioOfensivo) de los referentes argentinos de la partida, por técnica. Mismo % de bloqueo, mismo dolor, misma velocidad. */
  let EQ_ = null; const eqCfg = () => EQ_ || (EQ_ = (() => {
    const refs = REFERENTES.filter(r => R.referentePorId(r.id));
    const prom = tec => refs.reduce((a, r) => a + R.danioOfensivo(R.referentePorId(r.id), tec), 0) / refs.length;
    return { comun: { vida: NPC_STATS.vida, pina: NPC_STATS.pina, patada: NPC_STATS.patada, especial: NPC_STATS.patada },
             referente: { vida: R.BALANCE.vidaBaseJugador, pina: prom('Trompadas'), patada: prom('Patadas'), especial: prom('Patadas') } };
  })());
  const HOOL = { aRef: 270, pEspecialNpc: 0.10, pEspecialJefe: 0.22, extraPrep: 0.22, extraRec: 0.18, derribo: 1.05, caidaDerribo: 0.32 };
  /* v81 — los NUEVE elegibles del selector (mismo orden). `original` = los seis referentes de la batalla acordada.
     En la pelea siempre hay 6 referentes argentinos: el elegido (jugador) + 5 originales sin duplicar. Si el elegido es William o
     Alan, entra él y se completan 5 de los originales: queda afuera Cabeza de Poronga (último original del selector y segundo de Boca). */
  const REFERENTES = [
    { id: 'pistola_gamez', nombre: 'Pistola Gamez', club: 'Vélez', item: 'carton_vino', original: true },
    { id: 'abuelo', nombre: 'El Abuelo', club: 'Boca', item: 'choripan', original: true },
    { id: 'el_gallego', nombre: 'El Gallego', club: 'Independiente', item: 'fernet', original: true },
    { id: 'cacho', nombre: 'Cacho', club: 'Racing', item: 'hamburguesa', original: true },
    { id: 'matute', nombre: 'Matute', club: 'River', item: 'damajuana', original: true },
    { id: 'cdp', nombre: 'Cabeza de Poronga', club: 'Boca', item: 'choripan', original: true },
    // v137 — se retiraron de ESTE modo William, Alan y El Chivo (siguen en sus clubes y en la campaña) y entraron Muchinga y Manzanita
    { id: 'muchinga_chacarita', nombre: 'Muchinga', club: 'Chacarita', item: 'vino' },   // su recuperación de Chacarita: vino de cartón
    { id: 'manzanita', nombre: 'Manzanita', club: 'Boca', item: 'choripan' }             // su recuperación de Boca: choripán
  ];
  const FUERA_SI_EXTRA = 'cdp';
  const CLAVE_SEL = 'batallaCampal.selectedReferentId';
  // Barras comunes (aliados e ingleses): los valores del NIVEL 1 de la campaña (js/niveles.js → statsEnemigo('comun', 1)).
  // Se copian acá para no cargar js/niveles.js: al cargarse guarda el juego de escenarios de la barra (barra14.escenarios).
  const NPC_STATS = { vida: 40, pina: 4, patada: 5 };
  const DJ = DMJ.CONFIG;

  /* ---------------- Selección (propia del modo) ---------------- */
  let refJugadorId = null;
  try { refJugadorId = localStorage.getItem(CLAVE_SEL); } catch (e) {}
  const forzado = new URLSearchParams(location.search).get('ref');   // pruebas: batalla.html?ref=cacho
  if (forzado && REFERENTES.some(r => r.id === forzado)) refJugadorId = forzado;
  if (!REFERENTES.some(r => r.id === refJugadorId)) { volverAlSelector(); return; }
  const INFO_J = REFERENTES.find(r => r.id === refJugadorId);
  /* v90 — pelean TODOS los referentes del modo (v96: nueve): el elegido desde el inicio + los otros 8, uno por umbral de bajas de NPC argentinos.
     Umbrales 8 · 20 · 28 · 35 · 40 · 55 · 70 · 80 (v96: se quitó el de 90 al retirar un referente). El 35 queda reservado para El Chivo; los demás se reparten en el orden del
     selector. Si el elegido es El Chivo, los otros ocho ocupan los ocho umbrales en el orden del selector.
     REFS_PARTIDA = [elegido, …en el orden de sus umbrales]. */
  const UMBRALES_REF = [12, 24, 36, 48], UMBRAL_CHIVO = 35;   // v168: 5 referentes argentinos = el jugador + 4 que entran a las 12/24/36/48 bajas de comunes argentinos   // un umbral por referente no elegido
  const ORDEN_UMBRAL = (() => {
    const otros = REFERENTES.filter(r => r.id !== refJugadorId);
    return otros.slice(0, UMBRALES_REF.length);   // v137: sin El Chivo, los no elegidos entran en el orden del selector
  })();
  const REFS_PARTIDA = [INFO_J, ...ORDEN_UMBRAL];
  const ITEM = DMJ.ITEMS[INFO_J.item] || null;

  function volverAlSelector() {
    try { sessionStorage.setItem('bb.volverABatalla', '1'); } catch (e) {}
    if (window.Musica) Musica.detener(false);
    location.assign('index.html');
  }

  const cv = document.getElementById('batallaCanvas'), g = cv.getContext('2d');
  cv.width = PANT.w; cv.height = PANT.h;

  /* ---------------- Utilidades de piso y escala ---------------- */
  const limitar = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  function cadena(c, y) {
    if (y <= c[0][0]) return c[0][1];
    for (let i = 1; i < c.length; i++) if (y <= c[i][0]) { const [y0, x0] = c[i - 1], [y1, x1] = c[i]; return lerp(x0, x1, (y - y0) / (y1 - y0)); }
    return c[c.length - 1][1];
  }
  /* v86 — disposición HORIZONTAL: RESERVA ARGENTINA → | COMBATE CENTRAL | ← RESERVA INGLESA, sobre el mismo plano del piso.
     Los 20 que pelean quedan acotados a la franja central; cada reserva espera en UNA fila (pies sobre la misma línea) a su lado,
     mirando al centro, y se extiende fuera de cámara (solo se dibujan los que se ven). */
  const COMBATE = { x0: 560, x1: 1612 };
  /* v88 — cada reserva es una HINCHADA reunida a su costado, detrás de su frente de combate: bloque compacto y ancho con
     varias filas de profundidad, posiciones escalonadas e irregulares (cabezas entre los de adelante), quietos en guardia
     mirando al centro. Cada suplente tiene SU lugar fijo (semilla) y no se mueve mientras espera; al entrar sale desde ahí. */
  const GRUPO = { filas: 7, y0: 494, y1: 702, hueco: 64, ancho: 440, semilla: { ARG: 8801, ING: 8802 } };
  const FILA = GRUPO;                                      // (nombre anterior en la API de depuración)
  const CAM_MARGEN = 520;                                  // la cámara puede asomarse hasta acá fuera de la cancha: se ve casi todo el grupo
  const xMinEn = y => Math.max(cadena(PISO.izq, y) + PISO.margen, COMBATE.x0), xMaxEn = y => Math.min(cadena(PISO.der, y) - PISO.margen, COMBATE.x1);
  const centroEn = y => (xMinEn(y) + xMaxEn(y)) / 2;
  function encerrar(e) { e.y = limitar(e.y, PISO.yMin, PISO.yMax); e.x = limitar(e.x, xMinEn(e.y), xMaxEn(e.y)); }
  const dentroDelPiso = (x, y) => y >= PISO.yMin && y <= PISO.yMax && x >= xMinEn(y) && x <= xMaxEn(y);
  // v84: por encima del piso (reservas al fondo y quienes bajan a la cancha) la escala sigue achicándose con la misma recta
  const altoEn = y => lerp(ALTO.lejos, ALTO.cerca, limitar((y - ALTO.yLejos) / (ALTO.yCerca - ALTO.yLejos), -1, 1));
  const escalaEn = y => altoEn(y) / ALTO_PERSONAJE;        // factor del motor (1 = 345 px)
  const relCerca = y => altoEn(y) / ALTO.cerca;            // 1 cerca · 0,75 lejos (separaciones)
  const azar = ([a, b]) => a + Math.random() * (b - a);

  /* ---------------- Carga de imágenes con lienzos reducidos compartidos ---------------- */
  const EA = window.ESCALA_ARTE || null;
  const escalaArte = src => EA && EA.carpetas.some(c => src.startsWith(c)) ? EA.k : 1;
  const SUFIJO = EA && EA.version ? `?v=${EA.version}` : '';
  const cache = new Map();                                 // src → { c, f, w0, h0 } (f = px del lienzo por px del ORIGINAL)
  const atlasImg = new Map();
  const cargaStats = { pedidos: 0, listos: 0, errores: 0, imagenesDecodificadas: 0 };
  const cola = []; let activos = 0;
  function cargarImagen(src) {
    return new Promise(ok => { const im = new Image(); im.onload = () => { cargaStats.imagenesDecodificadas++; ok(im); }; im.onerror = () => ok(null); im.src = src; });
  }
  function atlas(src) { if (!atlasImg.has(src)) atlasImg.set(src, cargarImagen(src + SUFIJO)); return atlasImg.get(src); }
  function pedirCuadro(src, refPx) {          // refPx = alto del cuerpo parado en px del original (define la reducción)
    if (cache.has(src)) return cache.get(src).promesa;
    const r = { promesa: null, listo: null };
    r.promesa = new Promise(ok => cola.push({ src, refPx, ok }));
    cache.set(src, r); cargaStats.pedidos++; bombear();
    return r.promesa;
  }
  function bombear() {
    while (activos < 6 && cola.length) {
      const t = cola.shift(); activos++;
      construir(t.src, t.refPx).then(v => {
        activos--; const r = cache.get(t.src); r.listo = v; if (v) cargaStats.listos++; else { cargaStats.errores++; console.warn('[Batalla] no cargó', t.src); }
        t.ok(v); bombear();
      });
    }
  }
  async function construir(src, refPx) {
    const k = escalaArte(src), f = Math.min(1, CACHE_REF / refPx);
    const AT = window.ATLAS_ARTE && window.ATLAS_ARTE[src];
    if (AT) {                                                  // versión web: el cuadro viene dentro de un atlas
      const [asrc, x, y, w, h, dx, dy, W, H] = AT, a = await atlas(asrc); if (!a) return null;
      const w0 = W / k, h0 = H / k, c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(w0 * f)); c.height = Math.max(1, Math.round(h0 * f));
      c.getContext('2d').drawImage(a, x, y, w, h, dx / k * f, dy / k * f, w / k * f, h / k * f);
      return aBitmap({ c, f, w0, h0 });
    }
    const im = await cargarImagen(src + SUFIJO); if (!im) return null;
    const w0 = im.naturalWidth / k, h0 = im.naturalHeight / k, c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w0 * f)); c.height = Math.max(1, Math.round(h0 * f));
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(im, 0, 0, c.width, c.height);
    return aBitmap({ c, f, w0, h0 });
  }
  // ImageBitmap: se dibuja más rápido que un canvas (el navegador lo deja listo para la placa de video)
  async function aBitmap(q) { if (window.createImageBitmap) { try { const b = await createImageBitmap(q.c); q.c = b; } catch (e) {} } return q; }
  const cuadro = src => { const r = cache.get(src); return r && r.listo; };

  /* ---------------- Arte: referentes y barras ---------------- */
  /* v82 — WILLIAM ya tiene sus 35 poses y su perfil en el juego (js/sprites_referentes.js · js/reglas_combate.js): se usan tal cual. */
  const refPorId = id => R.referentePorId(id);
  const DEF_REF = id => window.SPRITES_REFERENTES[id];
  const DEF_NPC = id => window.SPRITES_ENEMIGOS[id];
  function manifiesto() {
    const out = [];
    for (const r of REFS_PARTIDA) {                        // v90: los cuadros de todos los referentes del modo
      const A = DEF_REF(r.id); if (!A) { console.warn('[Batalla] sin cuadros para', r.id); continue; }
      for (const m of Object.values(A.frames)) { const ref = A.altoReferencia[m.grupo]; out.push([m.src, ref]); if (m.espejo) out.push([m.espejo, ref]); }
    }
    for (const id of RACING) { const A = DEF_NPC(id); for (const m of Object.values(A.frames)) out.push([m.src, m.ref]); }
    for (const id of [...HOOLIGANS, ...JEFES_ING.map(j => j.id)]) { const A = SH[id]; if (!A) { console.error('[Batalla] faltan los cuadros de', id); continue; } for (const m of Object.values(A.frames)) out.push([m.src, m.ref]); }
    return out;
  }

  /* ---------------- Estado ---------------- */
  let invencible = false;                                  // solo pruebas (consola)
  const registroGolpes = [];
  const perf = { sinFiguras: false, sinSombras: false };   // pruebas de rendimiento (consola)                               // pruebas: cada golpe aplicado (quién, a quién, serie del ataque)
  let entidades = [], jugador = null, estado = 'cargando', estadoT = 0, tiempo = 0, pausado = false, resultado = null;
  let efectos = [], vivos = { ARG: 0, ING: 0 }, totales = { ARG: 0, ING: 0 }, bajasContadas = 0, partidaN = 0;
  let poderCarga = 0, poderActivo = null, dama = null, damaArmada = true, imgFondo = null, imgLogo = null, imgItem = null;
  const cam = { x: 0, y: MUNDO.h - PANT.h / ZOOM, w: PANT.w / ZOOM, h: PANT.h / ZOOM };   // abajo del todo: se ve el asfalto cercano
  const teclas = new Set();
  const rendimiento = { muestras: [], fps: 0, actualizarMs: 0, dibujarMs: 0, dibujadas: 0, simuladas: 0, piensaPorSeg: 0, _piensa: 0, _t: 0 };

  /* ---------------- Creación de la partida (siempre desde cero) ---------------- */
  function rng(semilla) { let a = semilla >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  // Reparto inicial: dos grupos separados por una franja libre en el centro del corredor; sin superposición (elipse mínima).
  function repartir() {
    const azarS = rng(78050), puntos = { ARG: [], ING: [] }, todos = [], CUPO = { ARG: COMPOSICION.cancha + 1, ING: COMPOSICION.cancha };
    const falta = () => puntos.ARG.length < CUPO.ARG || puntos.ING.length < CUPO.ING;
    let rx = 60, ry = 20;   // posiciones iniciales con aire · franja libre de ~120 px en el centro · cada bando hasta 720 px del eje
    for (let ronda = 0; ronda < 8 && falta(); ronda++) {
      for (let i = 0; i < 60000 && falta(); i++) {
        const y = lerp(PISO.yMin + 4, PISO.yMax - 2, azarS()), x = lerp(xMinEn(y), xMaxEn(y), azarS()), f = relCerca(y), c = centroEn(y);
        const lado = x < c - 70 * f && x > c - 460 ? 'ARG' : x > c + 70 * f && x < c + 460 ? 'ING' : null; if (!lado || puntos[lado].length >= CUPO[lado]) continue;
        if (todos.some(p => { const fp = relCerca((p.y + y) / 2), dx = (p.x - x) / (rx * fp), dy = (p.y - y) / (ry * fp); return dx * dx + dy * dy < 1; })) continue;
        const p = { x, y }; puntos[lado].push(p); todos.push(p);
      }
      if (falta()) { rx *= 0.92; ry *= 0.92; console.info(`[Batalla] reparto: separación reducida a ${rx.toFixed(1)}×${ry.toFixed(1)}`); }
    }
    return { puntos, rx, ry };
  }
  let REPARTO = null;
  /* v84 — 100 CONTRA 100, con 10 CONTRA 10 EN CANCHA.
     ARGENTINA 100 = 9 referentes (el elegido + 8, v96) + 91 Racing · INGLATERRA 100 = barras de Independiente (sustituto visual).
     Estados por personaje (e.fase): 'reserva' (al fondo, sin IA, sin daño, sin colisión) → 'ingresando' (baja a la cancha por su
     lado; ocupa lugar; todavía no pelea ni recibe) → 'activo' → 'baja' (definitiva, una sola vez). Máximo 10 por equipo entre
     activos e ingresando: cada baja libera UN lugar y entra UN reemplazo (no son oleadas). Los referentes restantes se habilitan
     al llegar las bajas de NPC argentinos a UMBRALES_REF (uno por umbral, en el orden de la lista) y entran antes que un NPC. */
  const COMPOSICION = { ARG: 105, comunesARG: 100, ING: 100 + JEFES_ING.length, comunesING: 100, referentes: 1 + UMBRALES_REF.length, racing: 100, cancha: 10 };   // v168: 105 contra 105 (100 comunes + 5 referentes por bando; el jugador es 1 de los 5)   // v96: 9 referentes + 91 Racing (antes 10 + 90)
  const stats = { variantes: {}, pinas: 0, patadas: 0, ataques: 0, impactos: 0, fallos: 0, bloqueos: 0, bloqueosEfectivos: 0, sinReaccion: 0, contraataques: 0, combos: 0, escapes: 0, cambiosPorContacto: 0 };
  function nuevaEntidad(o) {
    return Object.assign({ x: 0, y: 0, face: 1, st: 'quieto', t: 0, objetivo: null, nAtk: 0, cd: azar([0.05, 0.5]), piensa: azar(IA.piensa),
      golpe: null, golpeHecho: false, recorrido: 0, mx: 0, my: 0, contado: false, inv: 0, nDolor: 0, sinProgreso: 0,
      retener: 0, ritmo: Math.random(), carril: Math.random() < 0.5 ? -1 : 1, combo: 0, golpeSig: null, reaccion: null, bloqCd: 0, bloqDura: 0,
      bloqSeguidos: 0, ultBloq: -9, contra: false, cadena: 0, tCadena: -9, escape: 0, tOcioso: 0, diag: null }, o);
  }
  /* Reservas: una fila por equipo. Puesto 0 = el más cercano a la cancha. La fila se corre hacia adelante cuando alguien entra. */
  // Lugares del grupo: filas de profundidad escalonadas (medio paso de corrimiento alterno) con desvíos irregulares fijos.
  function lugaresGrupo(f, n) {
    const az = rng(GRUPO.semilla[f]), filas = GRUPO.filas, porFila = Math.ceil(n / filas), paso = GRUPO.ancho / porFila, out = [];
    for (let r = 0; r < filas; r++) for (let c = 0; c < porFila; c++) {
      const y = limitar(lerp(GRUPO.y0, GRUPO.y1, r / (filas - 1)) + (az() - 0.5) * 26, PISO.yMin + 4, PISO.yMax);
      const d = GRUPO.hueco + (c + (r % 2 ? 0.5 : 0) + (az() - 0.5) * 0.95) * paso + (r % 3) * 6;   // distancia desde el borde de la cancha
      out.push({ x: f === 'ARG' ? COMBATE.x0 - d : COMBATE.x1 + d, y, d });
    }
    return out;
  }
  let colaRefs = [], umbralIdx = 0, bajasNpcArg = 0, registroIngresos = [], damaEspera = 0;
  let colaJefes = [], jefeIdx = 0, bajasComunesING = 0, apariciones = [], estadoJefe = {};   // estadoJefe: esperando → pendiente → aparecido → derrotado   // v164: referentes hooligans (por bajas de COMUNES ingleses)
  function revisarJefesING() {
    while (jefeIdx < JEFES_ING.length && bajasComunesING >= JEFES_ING[jefeIdx].umbral) {
      const J = JEFES_ING[jefeIdx], e = entidades.find(x => x.jefeH === J.id);
      if (e && e.fase === 'oculto' && estadoJefe[J.id] === 'esperando') { estadoJefe[J.id] = 'pendiente'; colaJefes.push(e); }
      console.info(`[Batalla] ${bajasComunesING} hooligans comunes derrotados (umbral ${J.umbral}): pendiente ${e ? e.nombre : J.id}`);
      jefeIdx++;
    }
  }
  const jefeEnCancha = () => entidades.some(x => x.jefeH && (x.fase === 'activo' || x.fase === 'ingresando'));
  function crearPartida() {
    partidaN++; cortarPoder();
    entidades = []; efectos = []; dama = null; damaArmada = true; poderCarga = 0; resultado = null; pausado = false; teclas.clear();
    bajasContadas = 0; tiempo = 0; estadoT = 0; registroGolpes.length = 0;
    colaRefs = []; umbralIdx = 0; bajasNpcArg = 0; registroIngresos = []; colaJefes = []; jefeIdx = 0; bajasComunesING = 0; apariciones = []; estadoJefe = Object.fromEntries(JEFES_ING.map(j => [j.id, 'esperando'])); espectador = false; damaEspera = 0;
    if (!REPARTO) REPARTO = repartir();
    const P = { ARG: REPARTO.puntos.ARG.slice(), ING: REPARTO.puntos.ING.slice() };
    // jugador: cerca del frente aliado y de la cámara
    P.ARG.sort((a, b) => Math.hypot(a.x - (centroEn(a.y) - 110), (a.y - 660) * 1.5) - Math.hypot(b.x - (centroEn(b.y) - 110), (b.y - 660) * 1.5));
    const pj = P.ARG.shift();
    const stNpc = NPC_STATS;
    jugador = nuevaEntidad({ id: `ARG-J-${refJugadorId}`, faccion: 'ARG', clase: 'jugador', refId: refJugadorId, nombre: INFO_J.nombre, x: pj.x, y: pj.y, face: 1, fase: 'activo',
      luch: new C.Luchador({ nombreHUD: INFO_J.nombre, referente: refPorId(refJugadorId), vidaMax: R.BALANCE.vidaBaseJugador, esJugador: true }),
      seq: { A: 0, B: 0 }, finAtaque: { A: -Infinity, B: -Infinity }, buffer: null, jPendiente: null, giroPendiente: null, tecnica: null, variante: null, extra: 1, ataqueId: 0 });
    entidades.push(jugador);
    const npc = (f, i, arte, nombre) => nuevaEntidad({ id: `${f}-N-${String(i + 1).padStart(3, '0')}`, faccion: f, clase: 'npc', arte, nombre, face: f === 'ARG' ? 1 : -1,
      luch: new C.Luchador({ nombreHUD: nombre, vidaMax: stNpc.vida }), golpes: { pina: stNpc.pina, patada: stNpc.patada } });
    const racing = [...Array(COMPOSICION.racing)].map((_, i) => npc('ARG', i, RACING[i % RACING.length], `Racing ${i + 1}`));
    // v164: 60 comunes con los 12 modelos mezclados (orden fijo por semilla: nunca dos iguales seguidos) + 5 referentes en reserva
    const azH = rng(16400 + partidaN), modelos = [];
    for (let k = 0; k < Math.ceil(COMPOSICION.comunesING / HOOLIGANS.length); k++) { const L = HOOLIGANS.slice(); for (let i = L.length - 1; i > 0; i--) { const j = Math.floor(azH() * (i + 1)); [L[i], L[j]] = [L[j], L[i]]; } if (modelos.length && modelos[modelos.length - 1] === L[0]) L.push(L.shift()); modelos.push(...L); }
    const ingleses = [...Array(COMPOSICION.comunesING)].map((_, i) => Object.assign(npc('ING', i, modelos[i], `Hooligan ${i + 1}`), { hool: modelos[i], golpes: { ...eqCfg().comun } }));
    const jefesING = JEFES_ING.map((j, i) => nuevaEntidad({ id: `ING-R-${j.id}`, faccion: 'ING', clase: 'npc', jefeH: j.id, hool: j.id, nombre: (SH[j.id] || {}).nombre || j.id, face: -1,
      luch: new C.Luchador({ nombreHUD: (SH[j.id] || {}).nombre || j.id, vidaMax: eqCfg().referente.vida }), golpes: { pina: eqCfg().referente.pina, patada: eqCfg().referente.patada, especial: eqCfg().referente.especial } }));
    const refs = REFS_PARTIDA.slice(1).map(r => nuevaEntidad({ id: `ARG-R-${r.id}`, faccion: 'ARG', clase: 'referente', refId: r.id, nombre: r.nombre, face: 1,
      luch: new C.Luchador({ nombreHUD: r.nombre, referente: refPorId(r.id), vidaMax: R.BALANCE.vidaBaseJugador }) }));
    // en cancha al empezar: el elegido + 9 Racing contra 10 ingleses
    racing.slice(0, COMPOSICION.cancha).forEach((e, i) => Object.assign(e, { fase: 'activo', x: P.ARG[i].x, y: P.ARG[i].y }));   // v168: 10 comunes + el jugador
    ingleses.slice(0, COMPOSICION.cancha).forEach((e, i) => Object.assign(e, { fase: 'activo', x: P.ING[i].x, y: P.ING[i].y }));
    // reservas: dos hinchadas reunidas. Los 8 referentes, en el sector del grupo más cercano a la cancha (filas del medio);
    // los Racing y los ingleses repartidos por el resto del bloque (mezcla fija por semilla, no por cuadro)
    const resARG = [...refs, ...racing.slice(COMPOSICION.cancha)], resING = ingleses.slice(COMPOSICION.cancha);
    // v165: los referentes ingleses NO están en la hinchada ni en cancha al empezar: quedan OCULTOS hasta su umbral
    jefesING.forEach(e => Object.assign(e, { fase: 'oculto', x: MUNDO.w + 300, y: (PISO.yMin + PISO.yMax) / 2, face: -1, st: 'quieto' }));
    for (const [f, lista] of [['ARG', resARG], ['ING', resING]]) {
      const L = lugaresGrupo(f, lista.length), az = rng(GRUPO.semilla[f] + 7);
      const medio = (GRUPO.y0 + GRUPO.y1) / 2, prefRef = L.slice().sort((a, b) => (a.d + Math.abs(a.y - medio) * 1.5) - (b.d + Math.abs(b.y - medio) * 1.5));
      const usados = new Set(), lugar = new Map();
      lista.filter(e => e.clase === 'referente' || e.jefeH).forEach((e, i) => { lugar.set(e, prefRef[i]); usados.add(prefRef[i]); });
      const resto = L.filter(l => !usados.has(l)); for (let i = resto.length - 1; i > 0; i--) { const j = Math.floor(az() * (i + 1)); [resto[i], resto[j]] = [resto[j], resto[i]]; }
      lista.filter(e => e.clase !== 'referente' && !e.jefeH).forEach((e, i) => lugar.set(e, resto[i]));
      lista.forEach((e, i) => { const P = lugar.get(e); Object.assign(e, { fase: 'reserva', orden: i, x: P.x, y: P.y, lugar: { x: P.x, y: P.y }, face: f === 'ARG' ? 1 : -1, st: 'quieto', recorrido: 0 }); });
    }
    entidades.push(...refs, ...racing, ...ingleses, ...jefesING);
    contDama.apariciones = 0; contDama.consumos = 0;
    for (const k in stats) stats[k] = 0; stats.variantes = {};
    totales = { ARG: entidades.filter(e => e.faccion === 'ARG').length, ING: entidades.filter(e => e.faccion === 'ING').length };
    vivos = { ...totales };
    const ids = new Set(entidades.map(e => e.id)), N = COMPOSICION.ARG + COMPOSICION.ING;
    const refsIds = entidades.filter(e => e.refId).map(e => e.refId);
    if (entidades.length !== N || ids.size !== N || totales.ARG !== COMPOSICION.ARG || totales.ING !== COMPOSICION.ING || new Set(refsIds).size !== COMPOSICION.referentes || refsIds.length !== COMPOSICION.referentes)
      console.error('[Batalla] composición inválida', totales, entidades.length, ids.size, refsIds);
    console.info(`[Batalla] partida ${partidaN}: jugador ${INFO_J.nombre} · ARGENTINA ${totales.ARG} (${COMPOSICION.referentes} referentes + ${racing.length} Racing) · INGLATERRA ${totales.ING} · en cancha ${cancha('ARG')} contra ${cancha('ING')}`);
    camaraSeguir(true);
    estado = 'intro'; estadoT = 0;
    ocultarResultado();
    if (window.Musica) Musica.tocar(10);                     // tema existente (nivel 10) con el gestor de siempre: una sola pista
  }
  const canchaComunes = f => { let n = 0; for (const e of entidades) if (e.faccion === f && e.clase === 'npc' && !e.jefeH && (e.fase === 'activo' || e.fase === 'ingresando')) n++; return n; };
  const canchaComunesING = () => { let n = 0; for (const e of entidades) if (e.faccion === 'ING' && !e.jefeH && (e.fase === 'activo' || e.fase === 'ingresando')) n++; return n; };
  const cancha = f => { let n = 0; for (const e of entidades) if (e.faccion === f && (e.fase === 'activo' || e.fase === 'ingresando')) n++; return n; };
  const enReserva = f => { let n = 0; for (const e of entidades) if (e.faccion === f && e.fase === 'reserva') n++; return n; };
  /* Umbrales de referentes: se revisan TODOS los alcanzados y no procesados (no se exige igualdad exacta); cada uno habilita
     exactamente un referente, en el orden de la lista sin el elegido, y queda en cola de entrada (sin duplicados). */
  function revisarUmbrales() {
    while (umbralIdx < UMBRALES_REF.length && bajasNpcArg >= UMBRALES_REF[umbralIdx]) {
      const r = REFS_PARTIDA[umbralIdx + 1], e = r && entidades.find(x => x.refId === r.id);   // REFS_PARTIDA ya está en orden de umbral
      if (e && e.fase === 'reserva' && !colaRefs.includes(e)) colaRefs.push(e);
      console.info(`[Batalla] ${bajasNpcArg} bajas de NPC argentinos (umbral ${UMBRALES_REF[umbralIdx]}): se habilita ${r.nombre}`);
      umbralIdx++;
    }
  }
  /* Reposición: mientras un equipo tenga menos de 10 entre activos e ingresando y le queden reservas, entra el siguiente
     (Argentina: primero los referentes habilitados; después los NPC). Uno por lugar libre, nunca más de 10. */
  let ingresoInstantaneo = false;
  function reponer() {
    // v165: un referente inglés pendiente entra YA (no ocupa lugar de los 10 comunes), nunca dos a la vez, en orden
    if (colaJefes.length && !jefeEnCancha()) {
      const e = colaJefes.shift(); estadoJefe[e.jefeH] = 'aparecido';
      apariciones.push({ id: e.jefeH, bajasComunes: bajasComunesING, t: +tiempo.toFixed(2) });
      const y = PISO.yMin + 30 + Math.random() * (PISO.yMax - PISO.yMin - 60); e.x = xMaxEn(y) + 140; e.y = y; e.fase = 'reserva';
      iniciarIngreso(e); console.info(`[Batalla] ENTRA ${e.nombre} (${bajasComunesING} hooligans comunes derrotados)`);
    }
    // v168: referentes argentinos habilitados entran YA, aparte de los 10 comunes (no los frena el referente inglés activo)
    while (colaRefs.length) { const e = colaRefs.shift(); iniciarIngreso(e); console.info(`[Batalla] ENTRA ${e.nombre} (${bajasNpcArg} bajas de comunes argentinos)`); }
    for (const f of ['ARG', 'ING']) {
      let libres = COMPOSICION.cancha - canchaComunes(f);   // v168: los referentes no ocupan lugares de comunes
      while (libres > 0) {
        let e = null;
        {                                           // sale alguno de los más cercanos a la cancha, de cualquier fila (no una cola)
          const borde = f === 'ARG' ? COMBATE.x0 : COMBATE.x1;
          const cand = entidades.filter(x => x.faccion === f && x.fase === 'reserva' && x.clase === 'npc' && !x.jefeH).sort((a, b) => Math.abs(a.x - borde) - Math.abs(b.x - borde)).slice(0, 6);
          e = cand.length ? cand[Math.floor(Math.random() * cand.length)] : null;
        }
        if (!e) break;
        iniciarIngreso(e); libres--;
      }
    }
  }
  function puntoDeEntrada(e) {
    // por su lado de la cancha (argentinos por la izquierda, ingleses por la derecha), en un hueco libre
    let mejor = null;
    for (let k = 0; k < 14; k++) {
      const y = PISO.yMin + 12 + Math.random() * (PISO.yMax - PISO.yMin - 24), dx = 30 + Math.random() * 230;
      const x = e.faccion === 'ARG' ? xMinEn(y) + dx : xMaxEn(y) - dx;
      let d = Infinity;
      for (const o of entidades) if (o !== e && (o.fase === 'activo' || o.fase === 'ingresando') && enPie2(o)) { const p = o.fase === 'ingresando' ? o.destinoIngreso : o; d = Math.min(d, Math.hypot(p.x - x, (p.y - y) * 2.5)); }
      if (!mejor || d > mejor.d) mejor = { x, y, d };
      if (d > 70) break;
    }
    return mejor;
  }
  const enPie2 = e => e.st !== 'ko' && e.st !== 'fuera';
  function iniciarIngreso(e) {
    e.fase = 'ingresando'; e.st = 'acercarse'; e.t = 0; e.objetivo = null; e.recorrido = 0;
    e.destinoIngreso = puntoDeEntrada(e);
    registroIngresos.push({ id: e.id, f: e.faccion, clase: e.clase, t: +tiempo.toFixed(2), bajasNpcArg });
    if (ingresoInstantaneo) { e.x = e.destinoIngreso.x; e.y = e.destinoIngreso.y; activar(e); }
  }
  function activar(e) { e.fase = 'activo'; e.st = 'esperar'; e.t = 0; e.cd = azar([0.1, 0.4]); e.piensa = 0; encerrar(e); }
  function actualizarIngreso(e, dt) {
    const T = e.destinoIngreso, vel = (e.clase === 'npc' && !e.jefeH ? VEL.npc : VEL.referente) * escalaEn(e.y) * 1.8;
    const dx = T.x - e.x, dy = T.y - e.y, d = Math.hypot(dx, dy); e.t += dt;
    if (d < 4) { activar(e); return; }
    const paso = Math.min(vel * dt, d), x0 = e.x, y0 = e.y;
    e.x += dx / d * paso; e.y += dy / d * paso; e.face = Math.abs(dx) > 2 ? (dx > 0 ? 1 : -1) : e.face;
    const dd = Math.hypot(e.x - x0, e.y - y0); e.recorrido += dd; e.mx = e.x - x0; e.my = e.y - y0; pasoReloj(e, dd, dt);
  }
  /* v92 — RELOJ DE CAMINATA por entidad (referentes con «pasoMs»): suma tiempo de juego SOLO mientras se desplaza (la pausa no corre),
     no se reinicia al cambiar de rumbo. Eje dominante con histéresis: pasa a vertical si |dy| > 1,3·|dx| y vuelve a lateral si
     |dx| > 1,3·|dy|; en el medio conserva el anterior (las diagonales no parpadean entre perfil y frente). */
  function pasoReloj(e, dd, dt, dx = e.mx, dy = e.my) {
    if (dd > 0.01) e.relojPaso = (e.relojPaso || 0) + dt; else return;
    const ax = Math.abs(dx || 0), ay = Math.abs(dy || 0);
    if (ay > ax * 1.3) e.ejeV = true; else if (ax > ay * 1.3) e.ejeV = false;
  }
  /* ---------------- Rejilla espacial ---------------- */
  const rejilla = new Map();
  const claveCelda = (cx, cy) => cx * 1000 + cy;
  function armarRejilla() {
    rejilla.clear();
    for (const e of entidades) {
      if (!enPie(e)) continue;
      const k = claveCelda(Math.floor(e.x / IA.celda), Math.floor(e.y / IA.celda));
      let l = rejilla.get(k); if (!l) rejilla.set(k, l = []); l.push(e);
    }
  }
  function vecinos(x, y, r, fn) {
    const c0 = Math.floor((x - r) / IA.celda), c1 = Math.floor((x + r) / IA.celda), f0 = Math.floor((y - r) / IA.celda), f1 = Math.floor((y + r) / IA.celda);
    const g0 = Math.max(f0, Math.floor(PISO.yMin / IA.celda) - 1), g1 = Math.min(f1, Math.floor(PISO.yMax / IA.celda) + 1);   // solo filas del piso
    for (let cx = c0; cx <= c1; cx++) for (let cy = g0; cy <= g1; cy++) { const l = rejilla.get(claveCelda(cx, cy)); if (l) for (const o of l) fn(o); }
  }
  const enPie = e => e.fase === 'activo' && e.st !== 'ko' && e.st !== 'fuera';   // v84: reservas e ingresos no pelean ni son objetivo
  const rival = (a, b) => a.faccion !== b.faccion;

  /* ---------------- Daño (una sola aplicación por víctima y por ataque) ---------------- */
  function golpeable(v) {
    if (!enPie(v)) return false;
    if (v === jugador && (invencible || v.inv > 0 || v.st === 'poder' || v.st === 'damajuana' || estado !== 'jugando')) return false;
    return true;
  }
  function aplicar(atacante, victima, danio, tipo) {
    if (!golpeable(victima) || !rival(atacante, victima)) return false;   // sin fuego amigo
    // cubierto: el jugador con su defensa, o una unidad de IA bloqueando DE FRENTE al atacante
    const bloqIA = victima !== jugador && victima.st === 'bloquear' && (atacante.x - victima.x) * victima.face >= -4;
    const cubierto = (victima === jugador && victima.st === 'defensa') || bloqIA;
    const pct = !cubierto ? 100 : victima === jugador ? D.porcentajeDanio({ esJugador: true, cubriendose: true }) : victima.clase === 'npc' && !victima.jefeH ? IA.bloqueo.pctNpc : IA.bloqueo.pctRef;
    victima.luch.recibir(danio, pct);
    registroGolpes.push({ a: atacante.id, fa: atacante.faccion, v: victima.id, fv: victima.faccion, serie: atacante === jugador ? atacante.ataqueId : atacante.serie, danio, pct, t: +tiempo.toFixed(3) });
    if (registroGolpes.length > 4000) registroGolpes.shift();
    victima.ultimoAtacante = atacante.id;
    efectos.push({ tipo: cubierto ? 'bloqueo' : 'golpe', x: victima.x, y: victima.y - altoEn(victima.y) * 0.62, t: 0 });
    if (victima.luch.estaKO) { derrotar(victima, atacante, tipo); return true; }
    if (cubierto) { if (bloqIA) { stats.bloqueosEfectivos++; victima.t = Math.max(victima.t, victima.bloqDura - 0.08); } return true; }   // bloqueó: contraataca enseguida
    if (victima !== jugador) {                                              // anti-cadena: al 3.er golpe seguido «escapa» 1 s (duele, no frena)
      if (tiempo - victima.tCadena > IA.aturdir.ventana) victima.cadena = 0;
      victima.cadena++; victima.tCadena = tiempo;
      if (victima.escape > 0) return true;
      if (victima.cadena >= IA.aturdir.cadena && victima.hool) {   // v164: hooligan → cae (30) y se levanta (32); los golpes duelen pero no lo frenan
        victima.escape = HOOL.derribo + 0.05; victima.cadena = 0; stats.escapes++; victima.combo = 0; victima.golpeSig = null; victima.reaccion = null; victima.tFinRec = null;
        victima.golpe = null; victima.golpeHecho = false; victima.st = 'derribo'; victima.t = 0; victima.nDolor++;
        victima.x += (victima.x >= atacante.x ? 1 : -1) * 18 * relCerca(victima.y); encerrar(victima); return true; }
      if (victima.cadena >= IA.aturdir.cadena) { victima.escape = IA.aturdir.escape + TIEMPO.dolorNpc; victima.cadena = 0; stats.escapes++; }
      victima.combo = 0; victima.golpeSig = null; victima.reaccion = null; victima.tFinRec = null;
    }
    victima.golpe = null; victima.golpeHecho = false;                       // golpe en preparación: se anula
    victima.st = 'dolor'; victima.t = 0; victima.nDolor++;
    victima.x += (victima.x >= atacante.x ? 1 : -1) * 10 * relCerca(victima.y); encerrar(victima);
    if (victima === jugador) { victima.inv = TIEMPO.invulnerable; victima.buffer = null; victima.jPendiente = null; victima.seq.A = victima.seq.B = 0; }
    return true;
  }
  // Derrota DEFINITIVA: se cuenta una sola vez (guarda `contado`), sin ataques pendientes; el cuerpo ya no bloquea ni actúa.
  function derrotar(v, atacante, origen) {
    if (v.contado) return; v.contado = true;
    v.st = 'ko'; v.t = 0; v.golpe = null; v.objetivo = null; v.buffer = null; v.fase = 'baja';   // libera su lugar en cancha
    vivos[v.faccion]--; bajasContadas++;
    if (v.faccion === 'ARG' && v.clase === 'npc') { bajasNpcArg++; revisarUmbrales(); }
    if (v.faccion === 'ING' && v.clase === 'npc' && !v.jefeH) { bajasComunesING++; revisarJefesING(); }   // v164: los referentes no suman
    if (v.jefeH) estadoJefe[v.jefeH] = 'derrotado';   // solo NPC argentinos cuentan para los referentes
    // v86: en Batalla Campal no hay poder especial (no se carga)
    console.info(`[Batalla] KO ${v.id} (${v.faccion}) por ${atacante ? atacante.id : '—'}${origen === 'poder' ? ' (poder)' : ''} · ARGENTINA ${vivos.ARG}/${totales.ARG} · INGLATERRA ${vivos.ING}/${totales.ING}`);
    if (v === jugador && dama) dama = null;
  }

  /* ---------------- IA v80: pelea intensa y distribuida ----------------
     Todo se mide desde los PIES (e.x, e.y = apoyo sobre el piso): distancia horizontal al rival y diferencia de profundidad.
     Sin cola global: cada unidad decide sola (escalonado cada 0,12–0,22 s) y pelea apenas tiene un rival al alcance. */
  const cfgDe = e => e.clase === 'npc' && !e.jefeH ? IA.npc : IA.referente;
  const tecDe = (e, tipo) => e.clase === 'npc' ? tipo : (tipo === 'pina' ? 'Trompadas' : 'Patadas');
  function alcanceDe(e, tipo) {
    if (e.clase === 'npc') return ALCANCE[tipo];
    return ALCANCE[tipo === 'pina' ? 'Trompadas' : tipo === 'patada' ? 'Patadas' : tipo];
  }
  function franjaDe(e, tecnica) {      // Pistola: el remerazo pega con la tela (franja delante de la cadera)
    const A = e.clase !== 'npc' && DEF_REF(e.refId); const fr = A && A.alcance && A.alcance[tecnica];
    return fr || null;
  }
  const tolProf = e => PROF_GOLPE * escalaEn(e.y) * 1.1;  // misma franja de profundidad que usa el golpe
  /* v83 — golpes A/B (js/golpes_ab.js): cuadro de la secuencia J/K para un paso y su alcance propio (px a escala 1, según
     hacia dónde mira). La variante de siempre (3.er paso: piña / remerazo / patada) conserva su alcance o su franja. */
  function cuadroVariante(e, tipo, idx) {
    if (idx == null || e.clase === 'npc' || !window.GolpesAB) return null;
    return GolpesAB.cuadroSecuencia(DEF_REF(e.refId), tecDe(e, tipo), idx);
  }
  function alcanceVariante(e, tipo, idx) { const id = cuadroVariante(e, tipo, idx); return id ? GolpesAB.alcanceCuadro(DEF_REF(e.refId), id, e.face) : null; }
  const nVariantes = (e, tipo) => { const A = e.clase !== 'npc' && DEF_REF(e.refId), l = A && A.anim[tecDe(e, tipo) + 'Seq']; return l ? l.length : 0; };
  function puedeGolpear(e, v, tipo, idx) {
    if (!v || !golpeable(v)) return false;
    const s = escalaEn(e.y), dxF = (v.x - e.x) * e.face, tec = tecDe(e, tipo);
    if (Math.abs(v.y - e.y) > PROF_GOLPE * s * 1.1) return false;
    const av = alcanceVariante(e, tipo, idx);
    if (av != null) return dxF > 0 && dxF < av * s;
    const fr = franjaDe(e, tec);
    if (fr) return dxF >= fr[0] * s && dxF <= fr[1] * s;
    return dxF > 0 && dxF < alcanceDe(e, tipo) * s;
  }
  function alcanceMax(e) { const s = escalaEn(e.y), fr = franjaDe(e, 'Patadas'); return (fr ? fr[1] : alcanceDe(e, 'patada')) * s; }
  const enContacto = (e, o) => Math.abs(o.y - e.y) <= tolProf(e) && Math.abs(o.x - e.x) <= alcanceMax(e);
  const vetado = o => o === jugador && jugador.st === 'damajuana';
  /* v85 — un referente con variantes llega si ALGUNA de sus variantes llega (cada una con su alcance real). Si quiere piña y desde
     ahí solo llega la patada, insiste en acercarse un momento (0,4 s) antes de cambiar: con piñas cortas (William) no termina
     pateando siempre desde lejos y usa las tres piñas. */
  function factible(e, v, tipo) {
    const nv = nVariantes(e, tipo);
    if (!nv) return puedeGolpear(e, v, tipo);
    for (let k = 0; k < nv; k++) if (puedeGolpear(e, v, tipo, k)) return true;
    return false;
  }
  function tipoFactible(e, v, pref) {
    if (factible(e, v, pref)) { e.prefFalla = null; return pref; }
    const otro = pref === 'pina' ? 'patada' : 'pina';
    if (!factible(e, v, otro)) return null;
    if (pref === 'pina' && e.clase !== 'npc' && nVariantes(e, 'pina')) {
      if (e.prefFalla == null) e.prefFalla = tiempo;
      if (tiempo - e.prefFalla < 0.4) return null;
    }
    e.prefFalla = null; return otro;
  }
  const elegirTipo = e => Math.random() < cfgDe(e).pPatada ? 'patada' : 'pina';
  function cadencia(e) { const c = cfgDe(e).cadencia; return lerp(c[0], c[1], 0.6 * e.ritmo + 0.4 * Math.random()); }
  // Rival al alcance AHORA (adelante o atrás, alineado en profundidad): el más pegado.
  function rivalPegado(e, excluir) {
    let mejor = null, dm = Infinity;
    vecinos(e.x, e.y, alcanceMax(e) + 4, o => {
      if (o === excluir || !rival(e, o) || !golpeable(o) || vetado(o) || !enContacto(e, o)) return;
      const d = Math.abs(o.x - e.x) + Math.abs(o.y - e.y) * 2;
      if (d < dm) { dm = d; mejor = o; }
    });
    return mejor;
  }
  // Objetivo: el rival al alcance tiene prioridad absoluta; si no, el más cercano, repartiendo (los que ya tienen muchos encima pesan más).
  // Cuerpos en pie alrededor de un rival (sin contar a quien elige): cuanto más amontonado, menos atractivo para el que llega.
  function gentio(o, e) {
    const f = relCerca(o.y), rx = IA.gentio.rx * f, ry = IA.gentio.ry * f; let n = 0;
    vecinos(o.x, o.y, rx, q => { if (q !== o && q !== e && Math.abs(q.x - o.x) < rx && Math.abs(q.y - o.y) < ry) n++; });
    return n;
  }
  function elegirObjetivo(e) {
    let mejor = null, puntaje = Infinity;
    const actual = e.objetivo && enPie(e.objetivo) ? e.objetivo : null;
    for (const radio of [320, 900, 2400]) {
      vecinos(e.x, e.y, radio, o => {
        if (!rival(e, o) || !enPie(o) || vetado(o)) return;
        let d = Math.hypot(o.x - e.x, (o.y - e.y) * 2.2);
        const contacto = enContacto(e, o);
        if (contacto) d -= 600;
        else {
          const atk = o.nAtk - (o === actual ? 1 : 0), cupo = o === jugador ? IA.cupoJugador : IA.cupo;
          d += atk * 45 + (atk >= cupo ? 400 : 0) + gentio(o, e) * IA.gentio.peso;   // reparto + evita meterse en el montón
                  }
        if (o === actual) d -= 60;                            // histéresis: no cambia por centímetros
        if (d < puntaje) { puntaje = d; mejor = o; }
      });
      if (mejor) break;
    }
    return mejor;
  }
  function pensar(e) {
    rendimiento._piensa++;
    const o = e.objetivo, valido = o && enPie(o) && !vetado(o);
    if (!(valido && e.retener > 0 && e.sinProgreso < 1.2)) {   // sostiene el objetivo 0,6–1 s salvo que muera o no pueda llegar
      const n = elegirObjetivo(e);
      if (n !== o) { e.tFinRec = null; e.retener = azar(IA.retencion); e.sinProgreso = 0; e.golpeSig = null; e.combo = 0; } else e.retener = azar(IA.retencion) * 0.5;
      e.objetivo = n;
    }
    planificarPuesto(e);
  }
  function planificarPuesto(e) {
    const v = e.objetivo; if (!v) return;
    const f = relCerca(v.y); let lado = e.x >= v.x ? 1 : -1; const n = { 1: 0, '-1': 0 };
    vecinos(v.x, v.y, 110 * f, a => { if (a !== e && a.objetivo === v && enPie(a) && !rival(a, e)) n[a.x >= v.x ? 1 : -1]++; });
    if (n[lado] >= 2 && n[-lado] < 2 && !enContacto(e, v)) lado = -lado;   // ese lado ya tiene dos: va al otro (sin dar vueltas si ya pega)
    e.lado = lado; e.carrilUsado = n[lado] > 0 ? e.carril : 0;
    if (!e.golpeSig) e.tipoGolpe = elegirTipo(e);
  }
  // Puesto de pelea junto a la víctima (se recalcula cada cuadro: la víctima se mueve). Nunca dentro de la elipse entre rivales.
  function puesto(e, v) {
    const f = relCerca(v.y), s = escalaEn(v.y), tipo = e.golpeSig || e.tipoGolpe || 'pina', fr = franjaDe(e, tecDe(e, tipo));
    const dist = fr ? (fr[0] + fr[1]) / 2 * s : Math.max(IA.separacionRival.rx * f + 5, alcanceDe(e, tipo) * s * IA.distGolpe);
    return { x: v.x + (e.lado || 1) * dist, y: limitar(v.y + (e.carrilUsado || 0) * 9 * f, PISO.yMin + 4, PISO.yMax - 2) };
  }
  /* Defensa de la IA: quien empieza a preparar un golpe AVISA a su víctima. La víctima, si está libre y sin enfriamiento de
     bloqueo, lo «ve» con cierta probabilidad (que se reduce a la mitad con cada bloqueo seguido: no hay bloqueos infinitos) y
     bloquea tras un tiempo de reacción; si reacciona tarde, el golpe entra. Al terminar el bloqueo contraataca enseguida. */
  const libreIA = e => e.st === 'esperar' || e.st === 'acercarse' || e.st === 'ajustar' || e.st === 'quieto';
  function avisarAmenaza(a, v) {
    if (!v || v === jugador || !enPie(v) || v.reaccion || !libreIA(v) || v.bloqCd > 0) return;
    if (tiempo - v.ultBloq > IA.bloqueo.olvido) v.bloqSeguidos = 0;
    if (Math.random() >= cfgDe(v).pBloqueo * Math.pow(0.5, v.bloqSeguidos)) { stats.sinReaccion++; return; }
    v.reaccion = { t: azar(IA.bloqueo.reaccion), a };
  }
  function iniciarBloqueo(e, a) {
    e.tFinRec = null; e.st = 'bloquear'; e.t = 0; e.bloqDura = azar(IA.bloqueo.dura); e.face = a.x >= e.x ? 1 : -1;
    e.golpe = null; e.combo = 0; e.golpeSig = null; e.bloqSeguidos++; e.ultBloq = tiempo; e.tOcioso = 0; stats.bloqueos++;
  }
  const ritmoLog = [];                                     // diagnóstico: pausa real entre el fin de la recuperación y el golpe siguiente
  function empezarGolpe(e, tipo) {
    if (e.tFinRec != null) { ritmoLog.push({ id: e.id, gap: +(tiempo - e.tFinRec).toFixed(3), tipo: e.golpeSig ? 'combo' : e.contra ? 'contra' : 'normal' }); if (ritmoLog.length > 3000) ritmoLog.shift(); }
    e.tFinRec = null;
    if (!e.golpeSig) { if (Math.random() < cfgDe(e).pCombo) { e.combo = Math.round(azar(IA.combo.extra)); stats.combos++; } else e.combo = 0; }
    e.golpeSig = null; e.golpe = tipo; e.st = 'preparar'; e.t = 0; e.golpeHecho = false; e.tOcioso = 0;
    if (e.hool) {   // v164: hooligans → piña A/B/codazo, patada A/B y a veces el especial (37 → 39 → 40, nunca cura)
      if (tipo === 'pina' && Math.random() < (e.jefeH ? HOOL.pEspecialJefe : HOOL.pEspecialNpc) && puedeGolpear(e, e.objetivo, 'especial')) e.golpe = 'especial';
      const vs = e.golpe === 'pina' ? ['A', 'B', 'codazo'] : e.golpe === 'patada' ? ['A', 'B'] : [null];
      e.varH = vs[(e.cicloH = (e.cicloH || 0) + 1) % vs.length];
      if (e.golpe === 'especial') stats.especiales = (stats.especiales || 0) + 1;
    }
    // v83: referente con golpes A/B → rota A → B → el de siempre; si esa no llega a la distancia actual, prueba las otras.
    // Se decide UNA vez al empezar (nunca por cuadro) y el impacto usa el alcance de ESA variante.
    e.varIdx = null;
    const nv = nVariantes(e, tipo);
    if (nv) {
      e.cicloVar = e.cicloVar || { pina: 0, patada: 0 }; const i0 = e.cicloVar[tipo]++;
      e.varIdx = i0 % nv;
      for (let k = 0; k < nv; k++) if (puedeGolpear(e, e.objetivo, tipo, (i0 + k) % nv)) { e.varIdx = (i0 + k) % nv; break; }
      stats.variantes[e.varIdx] = (stats.variantes[e.varIdx] || 0) + 1;
    }
    if (e.contra) { stats.contraataques++; e.contra = false; }
    stats.ataques++; if (tipo === 'pina') stats.pinas++; else stats.patadas++;
    avisarAmenaza(e, e.objetivo);
  }
  function diag(e, motivo, v) {
    const d = e.diag || (e.diag = {});
    d.objetivo = v ? v.id : e.objetivo ? e.objetivo.id : null; d.estado = e.st; d.motivo = motivo; d.cd = +Math.max(0, e.cd).toFixed(2);
    const w = v || e.objetivo; d.dx = w ? Math.round(Math.abs(w.x - e.x)) : null; d.dy = w ? Math.round(Math.abs(w.y - e.y)) : null;
  }
  function moverHacia(e, tx, ty, vel, dt) {
    const dx = tx - e.x, dy = ty - e.y, d = Math.hypot(dx, dy);
    let mx = 0, my = 0;
    if (d > 3) { const paso = Math.min(vel * dt, d); mx = dx / d * paso; my = dy / d * Math.min(paso * 0.7, Math.abs(dy)); }
    return [mx, my];
  }
  // Separación suave: ALIADOS con la elipse grande; RIVALES con una menor que el alcance (si no, nunca podrían pegarse).
  function separacion(e, dt, soloAliados, aire = 1) {
    const f = relCerca(e.y); let px = 0, py = 0;
    vecinos(e.x, e.y, IA.separacion.rx * f * aire + 8, o => {
      if (o === e) return;
      const riv = rival(e, o); if (riv && soloAliados) return;
      const S = riv ? IA.separacionRival : IA.separacion, k = riv ? 1 : aire, rx = S.rx * f * k, ry = S.ry * f * k;
      const dx = e.x - o.x, dy = e.y - o.y, nx = dx / rx, ny = dy / ry, d2 = nx * nx + ny * ny;
      if (d2 >= 1) return;
      if (d2 < 1e-6) { px += (Math.random() - 0.5) * rx; py += (Math.random() - 0.5) * ry; return; }
      const d = Math.sqrt(d2), fuerza = (1 - d);
      px += nx / d * fuerza * rx; py += ny / d * fuerza * ry;
    });
    const lim = 140 * f * dt;                                // empuje máximo por cuadro: nadie se teletransporta
    return [limitar(px * 5 * dt, -lim, lim), limitar(py * 5 * dt, -lim * 0.5, lim * 0.5)];
  }
  /* Separación dura (seis pasadas por cuadro, con la rejilla): dos cuerpos en pie nunca quedan dentro de la elipse mínima
     (la de aliados o la de rivales). Quien está golpeando o bloqueando cede poco (no lo sacan del alcance); el que camina cede más;
     el jugador no es empujado. Contra un borde del piso, el resto del solape lo absorbe el otro. Los caídos no cuentan. */
  const firmeza = x => x === jugador ? 0 : (x.st === 'preparar' || x.st === 'golpear' || x.st === 'bloquear') ? 0.25 : 1;
  function resolverSolapes() {
    for (let pasada = 0; pasada < 6; pasada++) {
      armarRejilla();
      for (const e of entidades) {
        if (!enPie(e)) continue;
        vecinos(e.x, e.y, IA.separacion.rx + 4, o => {
          if (o === e || o.id < e.id) return;                // cada par una sola vez
          const S = rival(e, o) ? IA.separacionRival : IA.separacion;
          const f = relCerca((e.y + o.y) / 2), rx = S.rx * f, ry = S.ry * f;
          const dx = e.x - o.x, dy = e.y - o.y, nx = dx / rx, ny = dy / ry, d2 = nx * nx + ny * ny;
          if (d2 >= 1) return;
          let d = Math.sqrt(d2), ux, uy;
          if (d < 1e-4) { const a = (e.id.charCodeAt(e.id.length - 1) * 2.399) % 6.283; ux = Math.cos(a); uy = Math.sin(a); d = 0; }
          else { ux = nx / d; uy = ny / d; }
          const fe = firmeza(e), fo = firmeza(o), we = fe + fo > 0 ? fe / (fe + fo) : 0.5, wo = 1 - we, solape = (1 - d);
          e.x += ux * solape * rx * we; e.y += uy * solape * ry * we;
          o.x -= ux * solape * rx * wo; o.y -= uy * solape * ry * wo;
          encerrar(e); encerrar(o);
          const nx2 = (e.x - o.x) / rx, ny2 = (e.y - o.y) / ry, d2b = nx2 * nx2 + ny2 * ny2;
          if (d2b < 1) {
            const db = Math.sqrt(d2b) || 1e-3, resto = 1 - db, ux2 = nx2 / db || ux, uy2 = ny2 / db || uy;
            const mueve = o === jugador ? e : e === jugador ? o : (Math.random() < 0.5 ? e : o), sg = mueve === e ? 1 : -1;
            mueve.x += sg * ux2 * resto * rx; mueve.y += sg * uy2 * resto * ry; encerrar(mueve);
          }
        });
      }
    }
  }
  function actualizarIA(e, dt) {
    e.t += dt;
    if (e.st === 'ko') { if (e.t > TIEMPO.ko) { e.st = 'fuera'; e.t = 0; } return; }
    if (e.st === 'fuera') return;
    if (estado !== 'jugando') return;
    e.cd -= dt; e.retener -= dt; e.bloqCd -= dt; if (e.escape > 0) e.escape -= dt;
    const cfg = cfgDe(e), v = e.objetivo;
    if (e.st === 'derribo') {                                   // v164: tirado y levantándose (no camina ni ataca)
      if (e.t > HOOL.derribo) { e.st = 'esperar'; e.t = 0; e.cd = Math.max(e.cd, azar([0.15, 0.3])); }
      diag(e, 'derribado'); return;
    }
    if (e.st === 'dolor') {
      if (e.t > (e.clase === 'npc' && !e.jefeH ? TIEMPO.dolorNpc : TIEMPO.dolorRef)) { e.st = 'esperar'; e.t = 0; e.cd = Math.max(e.cd, azar([0.12, 0.3])); }
      const [sx, sy] = separacion(e, dt, false); e.x += sx; e.y += sy; encerrar(e); e.tOcioso = 0; diag(e, 'aturdido'); return;
    }
    if (e.reaccion) {                                          // reacción pendiente: bloquea si el golpe todavía viene
      e.reaccion.t -= dt;
      if (e.reaccion.t <= 0) { const a = e.reaccion.a; e.reaccion = null;
        if (enPie(a) && libreIA(e) && (a.st === 'preparar' || (a === jugador && a.st === 'ataque' && !a.golpeHecho))) iniciarBloqueo(e, a); }
    }
    if (e.st === 'bloquear') {
      if (e.t >= e.bloqDura) { e.st = 'esperar'; e.t = 0; e.bloqCd = azar(IA.bloqueo.enfriar); e.cd = Math.min(e.cd, azar(IA.bloqueo.contra)); e.contra = true; }
      diag(e, 'bloqueando'); return;
    }
    if (e.st === 'preparar') {
      if (!v || !enPie(v) || vetado(v)) { e.st = 'esperar'; e.t = 0; e.golpe = null; e.combo = 0; e.golpeSig = null; return; }
      if (e.t >= cfg.preparacion + (e.golpe === 'especial' ? HOOL.extraPrep : 0)) {
        e.st = 'golpear'; e.t = 0; e.golpeHecho = true; e.serie = (e.serie || 0) + 1;       // el daño entra UNA vez, en el impacto
        let ok = false;
        if (puedeGolpear(e, v, e.golpe, e.varIdx)) ok = e.clase === 'npc' ? aplicar(e, v, e.golpes[e.golpe], e.golpe)
                                                                : aplicar(e, v, R.danioOfensivo(e.luch.referente, tecDe(e, e.golpe)), tecDe(e, e.golpe));
        if (ok) stats.impactos++; else stats.fallos++;
      }
      diag(e, 'atacando'); return;
    }
    if (e.st === 'golpear') {
      if (e.t > cfg.recuperacion + (e.golpe === 'especial' ? HOOL.extraRec : 0)) {
        e.st = 'esperar'; e.t = 0; e.golpe = null; e.tFinRec = tiempo;
        if (e.combo > 0 && v && enPie(v)) { e.combo--; e.golpeSig = e.combo === 0 ? 'patada' : 'pina'; e.cd = azar(IA.combo.pausa); }
        else { e.combo = 0; e.golpeSig = null; e.cd = cadencia(e); }
      }
      diag(e, 'recuperando'); return;
    }
    // libre: decidir, acomodarse y pegar
    e.piensa -= dt;
    if (e.piensa <= 0 || !v || !enPie(v) || vetado(v)) { e.piensa = azar(IA.piensa); pensar(e); }
    let w = e.objetivo, tipo = null, pegadoSinGolpe = false;
    if (w) { e.face = w.x >= e.x ? 1 : -1; tipo = tipoFactible(e, w, e.golpeSig || e.tipoGolpe || 'pina'); }
    if (!tipo) {                                               // su objetivo no está a tiro: ¿hay otro rival pegado? pelea con ese
      const o = rivalPegado(e, w);
      if (o) {
        const f0 = e.face; e.face = o.x >= e.x ? 1 : -1;
        const t2 = tipoFactible(e, o, e.tipoGolpe || 'pina');
        if (t2) { e.tFinRec = null; if (w) stats.cambiosPorContacto++; e.objetivo = w = o; tipo = t2; e.retener = azar(IA.retencion); e.golpeSig = null; e.combo = 0; planificarPuesto(e); }
        else { e.face = f0; pegadoSinGolpe = true; }
      }
    }
    const s = escalaEn(e.y), base = (e.clase === 'npc' && !e.jefeH ? VEL.npc : VEL.referente) * s;
    // al trote (×1,8) si su rival está lejos: menos tiempo caminando, más tiempo peleando
    const vel = base * (w && Math.abs(w.x - e.x) > 300 ? 1.8 : 1);
    let mx = 0, my = 0, motivo;
    if (tipo) {                                                // al alcance y alineado: se planta y pega
      e.sinProgreso = 0; e.tOcioso = 0;
      if (e.cd <= 0) { empezarGolpe(e, tipo); diag(e, 'atacando'); return; }
      motivo = e.contra ? 'contraataque' : 'pausa entre golpes';
      // en la pausa, si el golpe que quiere tirar (p. ej. piña) no llega desde acá, da medio paso al puesto: alterna piña y patada
      const pref = e.golpeSig || e.tipoGolpe || 'pina';
      let ax = 0, ay = 0; if (tipo !== pref) { const P = puesto(e, w); [ax, ay] = moverHacia(e, P.x, P.y, vel * 0.5, dt); }
      const [sx, sy] = separacion(e, dt, true); e.x += ax + sx; e.y += ay + sy; encerrar(e);
      const paso = Math.hypot(ax, ay); e.recorrido += paso; pasoReloj(e, paso, dt, ax, ay);
      e.st = paso > 0.02 ? 'ajustar' : 'esperar'; diag(e, paso > 0.02 ? 'medio paso para ' + (pref === 'pina' ? 'la piña' : 'la patada') : motivo); return;
    }
    if (w) {
      const P = puesto(e, w), dx = Math.abs(w.x - e.x), dy = Math.abs(w.y - e.y);
      if (!golpeable(w)) motivo = 'víctima invulnerable';
      if (dx <= alcanceMax(e) && dy > tolProf(e)) {            // cerca pero desalineado: ajuste corto en profundidad (sin rodear)
        motivo = motivo || 'desalineado'; [mx, my] = moverHacia(e, e.x + limitar(P.x - e.x, -10, 10), P.y, vel, dt);
      } else { motivo = motivo || (dx > alcanceMax(e) ? 'fuera de alcance' : 'acomodándose'); [mx, my] = moverHacia(e, P.x, P.y, vel, dt); }
    } else motivo = 'sin objetivo';
    if (pegadoSinGolpe) { e.tOcioso += dt; motivo += ' (rival pegado sin golpe posible)'; } else e.tOcioso = 0;
    const [sx, sy] = separacion(e, dt, false, IA.aire);           // caminando: más aire con los aliados (no se apilan)
    const x0 = e.x, y0 = e.y;
    e.x += mx + sx; e.y += my + sy; encerrar(e);
    const recorrido = Math.hypot(e.x - x0, e.y - y0);
    e.recorrido += recorrido;
    if (recorrido > 0.05) { e.mx = e.x - x0; e.my = e.y - y0; }
    pasoReloj(e, recorrido, dt);
    e.st = Math.hypot(mx, my) > 0.02 ? (motivo === 'desalineado' ? 'ajustar' : 'acercarse') : 'esperar';
    if (e.st === 'acercarse') e.tFinRec = null;                // si tuvo que caminar, la pausa ya no mide el ritmo de golpe
    if (w && Math.hypot(mx, my) > 0.02 && recorrido < vel * dt * 0.15) e.sinProgreso += dt; else e.sinProgreso = Math.max(0, e.sinProgreso - dt);
    diag(e, motivo, w);
  }

  /* ---------------- Jugador (controles del juego) ---------------- */
  const CG = C.COMBO_GOLPES, TOL = D.CONFIG.jugador.tolerancia;
  const libre = p => p.st === 'quieto' || p.st === 'camina';
  const izq = () => teclas.has('a') || teclas.has('arrowleft'), der = () => teclas.has('d') || teclas.has('arrowright');
  const atras = p => p.face > 0 ? izq() : der();
  function empezarAtaque(b) {
    const p = jugador;
    if (p.seq[b] && tiempo - p.finAtaque[b] > CG.reinicio) p.seq[b] = 0;
    const paso = p.seq[b], variante = CG.secuencia[paso]; p.seq[b] = (paso + 1) % CG.secuencia.length;
    p.tecnica = C.elegirTecnica(b); p.variante = variante; p.extra = C.extraDeVariante(variante); p.botonAtaque = b;
    p.paso = paso;                                                       // v83: pose A / B / la de siempre
    p.st = 'ataque'; p.t = 0; p.golpeHecho = false; p.ataqueId++; p.buffer = null;
    // la IA que está delante y al alcance «ve venir» el golpe del jugador (puede bloquearlo si reacciona a tiempo)
    const s = escalaEn(p.y), alc = alcanceJugador(p) * s;
    vecinos(p.x, p.y, alc + 20, o => { if (rival(p, o) && enPie(o) && Math.abs(o.y - p.y) <= PROF_GOLPE * s * 1.1 && (o.x - p.x) * p.face > -10 && Math.abs(o.x - p.x) <= alc) avisarAmenaza(p, o); });
  }
  function boton(b) { const p = jugador; if (p.st === 'ataque') { if (!p.buffer && p.t >= TIEMPO.ataque - CG.buffer) p.buffer = b; return; } if (libre(p)) empezarAtaque(b); }
  function pulsarPina() {
    const p = jugador;
    if (intentarRecoger()) return;
    if (p.st === 'ataque') { boton('A'); return; }
    if (libre(p)) p.jPendiente = tiempo;
  }
  function alcanceJugador(p) { const av = alcanceVariante(p, p.tecnica === 'Patadas' ? 'patada' : 'pina', p.paso); return av != null ? av : (ALCANCE[p.tecnica] || ALCANCE.Patadas); }
  function conectarJugador() {
    const p = jugador, s = escalaEn(p.y), av = alcanceVariante(p, p.tecnica === 'Patadas' ? 'patada' : 'pina', p.paso);
    const fr = av != null ? null : franjaDe(p, p.tecnica), alc = alcanceJugador(p) * s;   // v83: A/B con su alcance; el remerazo, con su franja
    let blanco = null, mejor = Infinity;
    vecinos(p.x, p.y, alc + 40, o => {
      if (!rival(p, o) || !golpeable(o)) return;
      const dxF = (o.x - p.x) * p.face;
      if (Math.abs(o.y - p.y) > PROF_GOLPE * s * 1.1) return;
      if (fr ? (dxF < fr[0] * s || dxF > fr[1] * s) : (dxF < -20 * s || Math.abs(o.x - p.x) > alc)) return;
      if (Math.abs(dxF) < mejor) { mejor = Math.abs(dxF); blanco = o; }
    });
    if (!blanco) return;
    // ReglasCombate: base × Fuerza (o daño fijo) × variante del combo (×1,10 la derecha). `aplicar` lo resuelve UNA sola vez.
    aplicar(p, blanco, R.danioOfensivo(p.luch.referente, p.tecnica) * p.extra, p.tecnica);
  }
  function actualizarJugador(dt) {
    const p = jugador; p.t += dt; p.inv = Math.max(0, p.inv - dt);
    if (p.st === 'ko') return;
    if (estado !== 'jugando') return;
    if (p.st === 'damajuana') { if (p.t >= DJ.tiempos.recoger + DJ.tiempos.sostener + DJ.tiempos.beber) { p.luch.vida = p.luch.vidaMax; p.st = 'quieto'; p.t = 0; teclas.delete('j'); contDama.consumos++; damaEspera = 0; } return; }
    if (p.st === 'poder') return;
    if (p.st === 'dolor') { if (p.t > TIEMPO.dolorJugador) { p.st = 'quieto'; p.t = 0; } else return; }
    // defensa: mantener J + ATRÁS
    const combinacion = teclas.has('j') && atras(p);
    if (p.st === 'defensa') { if (!combinacion) { p.st = 'quieto'; p.t = 0; } else return; }
    else if (combinacion && libre(p)) { p.st = 'defensa'; p.t = 0; p.jPendiente = null; p.giroPendiente = null; return; }
    if (p.jPendiente !== null && tiempo - p.jPendiente >= TOL) { p.jPendiente = null; boton('A'); }
    if (p.giroPendiente && tiempo - p.giroPendiente.t >= TOL) p.giroPendiente = null;
    if (libre(p)) {
      let mx = (der() ? 1 : 0) - (izq() ? 1 : 0);
      if (p.giroPendiente && mx === p.giroPendiente.dir) mx = 0;
      const my = (teclas.has('s') || teclas.has('arrowdown') ? 1 : 0) - (teclas.has('w') || teclas.has('arrowup') ? 1 : 0);
      const v = VEL.jugador * R.modificadorVelocidad(p.luch) * escalaEn(p.y);
      if (mx || my) {
        if (p.st !== 'camina') { p.recorrido = 0; if (!(tiempo - (p.ultPaso ?? -9) < 0.25)) p.relojPaso = 0; }   // v92: el reloj de pasos solo vuelve a 0 tras frenar de verdad (no al darse vuelta)
        const n = Math.hypot(mx, my), x0 = p.x, y0 = p.y; p.x += mx / n * v * dt; p.y += my / n * v * 0.62 * dt; p.st = 'camina';
        encerrar(p); const dd = Math.hypot(p.x - x0, p.y - y0); p.recorrido += dd; if (dd > 0.01) { p.relojPaso = (p.relojPaso || 0) + dt; p.ultPaso = tiempo; }
        p.rumbo = mx ? 'lado' : (my > 0 ? 'abajo' : 'arriba'); if (mx) p.face = mx;
      } else p.st = 'quieto';
    }
    if (p.st === 'ataque') {
      if (!p.golpeHecho && p.t >= TIEMPO.impacto) { p.golpeHecho = true; conectarJugador(); }
      if (p.t >= TIEMPO.ataque) {
        p.finAtaque[p.botonAtaque] = tiempo; p.st = 'quieto'; p.t = 0; p.tecnica = null; p.variante = null; p.extra = 1;
        const b = p.buffer; p.buffer = null; if (b && !(teclas.has('j') && atras(p))) empezarAtaque(b);
      }
    }
  }

  /* ---------------- Poder (tecla L): reglas de js/poder.js ---------------- */
  let videoLluvia = null, sonidoLluvia = null;
  const PODER_EN_BATALLA = false;
  function activarPoder() {
    const p = jugador;
    if (!PODER_EN_BATALLA) return;                           // v86: desactivado en este modo
    if (estado !== 'jugando' || pausado || poderActivo || poderCarga < PD.CARGA_TOTAL || !enPie(p) || p.st === 'damajuana') return;
    poderCarga = 0;
    // objetivos: los ingleses en pie que están DENTRO DE LA CÁMARA al activarlo (equivalente a «los que ya entraron al combate»)
    const objetivos = entidades.filter(e => e.faccion === 'ING' && enPie(e) && e.x >= cam.x && e.x <= cam.x + cam.w);
    const pres = PD.presentacionDe(refJugadorId);
    poderActivo = { t: 0, pres, objetivos, aplicado: false, lluvia: false, destello: 0 };
    p.st = 'poder'; p.t = 0; p.tecnica = null; p.jPendiente = null; p.buffer = null;
    if (!videoLluvia) { videoLluvia = document.createElement('video'); videoLluvia.muted = true; videoLluvia.playsInline = true; videoLluvia.preload = 'auto'; videoLluvia.src = PD.LLUVIA.video;
      sonidoLluvia = new Audio(PD.LLUVIA.sonido); sonidoLluvia.volume = 0.9; }
    console.info(`[Batalla] poder de ${INFO_J.nombre}: ${objetivos.length} objetivos en cámara`);
  }
  function actualizarPoder(dt) {
    const A = poderActivo; if (!A) return;
    A.t += dt; A.destello = Math.max(0, A.destello - dt);
    if (jugador.st === 'poder' && A.t >= A.pres.quieto) { jugador.st = 'quieto'; jugador.t = 0; }
    if (!A.lluvia && A.t >= A.pres.lluvia.desde) { A.lluvia = true; for (const m of [videoLluvia, sonidoLluvia]) { try { m.currentTime = 0; } catch (e) {} m.play().catch(() => {}); } }
    if (!A.aplicado && A.t >= A.pres.impacto) {
      A.aplicado = true; A.destello = 0.3;
      for (const e of A.objetivos) if (enPie(e)) { e.luch.vida = 0; derrotar(e, jugador, 'poder'); }   // una vez por objetivo
    }
    if (A.t >= A.pres.duracion) cortarPoder();
  }
  function cortarPoder() {
    for (const m of [videoLluvia, sonidoLluvia]) if (m) m.pause();
    if (poderActivo && jugador && jugador.st === 'poder') { jugador.st = 'quieto'; jugador.t = 0; }
    poderActivo = null;
  }

  /* ---------------- Recuperador del referente del jugador (reglas de js/damajuana.js) ---------------- */
  /* v86 — recuperación REPETIBLE: cada vez que el jugador queda vivo con 25 % o menos aparece su objeto CERCA de él, dentro de la
     cancha (nunca entre las reservas). Uno a la vez; al consumirlo recupera toda la vida y el sistema queda listo para la próxima.
     Si vence sin recogerlo y sigue con 25 % o menos, vuelve a aparecer tras una breve espera (no cada cuadro). La pausa lo congela
     (esta función no corre en pausa) y tras la derrota definitiva no aparece más. */
  const DAMA_ESPERA = 2.0;
  function actualizarDama(dt) {
    const p = jugador; if (!ITEM || estado !== 'jugando') return;
    const frac = p.luch.vida / p.luch.vidaMax;
    if (dama) { dama.t += dt; if (dama.t >= DJ.duracion) { dama = null; damaEspera = DAMA_ESPERA; console.info(`[Batalla] ${ITEM.nombre} venció sin recogerse`); } return; }
    if (damaEspera > 0) { damaEspera -= dt; return; }
    if (!enPie(p) || p.st === 'damajuana' || p.luch.vida <= 0 || frac > DJ.umbral) return;
    let mejor = null;
    for (let y = PISO.yMin + 12; y <= PISO.yMax - 10; y += 12) for (let x = xMinEn(y) + 30; x <= xMaxEn(y) - 30; x += 16) {
      const rec = Math.hypot(x - p.x, (y - p.y) / 0.62); if (rec < 70 || rec > 320) continue;
      let tapada = false; vecinos(x, y, 50, o => { if (o !== p && Math.hypot(o.x - x, (o.y - y) * 2) < 45) tapada = true; });
      const puntaje = Math.abs(rec - 140) + (tapada ? 1000 : 0);   // cerca (≈ 140 px de recorrido) y en un lugar libre
      if (!mejor || puntaje < mejor.puntaje) mejor = { x, y, puntaje };
    }
    if (!mejor) { const y = limitar(p.y, PISO.yMin + 12, PISO.yMax - 10); mejor = { x: limitar(p.x + (p.x < centroEn(y) ? 140 : -140), xMinEn(y) + 30, xMaxEn(y) - 30), y }; }
    dama = { x: mejor.x, y: mejor.y, t: 0 }; damaArmada = false; contDama.apariciones++;
    console.info(`[Batalla] ${ITEM.nombre} en (${Math.round(dama.x)}, ${Math.round(dama.y)}) con vida ${(frac * 100).toFixed(1)} %`);
  }
  const contDama = { apariciones: 0, consumos: 0 };
  function intentarRecoger() {
    const p = jugador;
    if (!dama || estado !== 'jugando' || pausado || !['quieto', 'camina', 'ataque'].includes(p.st)) return false;
    if (Math.abs(p.x - dama.x) > DJ.zona.dx * escalaEn(dama.y) || Math.abs(p.y - dama.y) > DJ.zona.dy * relCerca(dama.y)) return false;
    dama = null; p.st = 'damajuana'; p.t = 0; p.tecnica = null; p.jPendiente = null; p.buffer = null;
    for (const e of entidades) if (e.objetivo === jugador && (e.st === 'preparar' || e.st === 'golpear')) { e.st = 'esperar'; e.t = 0; e.golpe = null; }
    return true;
  }

  /* ---------------- Cámara ---------------- */
  let espectador = false;
  function camaraSeguir(instante) {
    let fx = jugador.x;
    if (espectador) {                                      // v84: jugador fuera → la cámara sigue el centro de la pelea
      let n = 0, sx = 0; for (const e of entidades) if (enPie(e)) { sx += e.x; n++; }
      if (n) fx = sx / n;
    }
    const objetivo = limitar(fx - cam.w / 2, Math.max(0, COMBATE.x0 - CAM_MARGEN), Math.min(MUNDO.w, COMBATE.x1 + CAM_MARGEN) - cam.w);
    cam.x = instante ? objetivo : lerp(cam.x, objetivo, 0.12);
  }

  /* ---------------- Entrada ---------------- */
  const TECLAS_JUEGO = ['w', 'a', 's', 'd', 'j', 'k', 'l', 'p', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '];
  function alPresionar(e) {
    const k = e.key.toLowerCase();
    if (window.Musica && !e.repeat) {
      if (k === 'm') { Musica.alternarSilencio(); return; }
      if (k === '-' || k === '_') { Musica.cambiarVolumen(-0.1); return; }
      if (k === '+' || k === '=') { Musica.cambiarVolumen(+0.1); return; }
    }
    if (estado === 'errorFondo') { if (k === 'enter') reintentarFondo(); if (k === 'escape') volverAlSelector(); return; }
    if (estado === 'fin') { if (resultadoVisible()) { if (k === 'escape') { e.preventDefault(); volverAlSelector(); } } return; }
    if (TECLAS_JUEGO.includes(k)) e.preventDefault();
    if (pausado) {
      if (k === 'p' && !e.repeat) { pausado = false; if (window.Musica) Musica.reanudar(); }
      if (k === 'escape') volverAlSelector();
      return;
    }
    if (k === 'escape' && !e.repeat && espectador && estado === 'jugando') { e.preventDefault(); volverAlSelector(); return; }   // v84: mirando → ESC sale
    if ((k === 'p' || k === 'escape') && !e.repeat && (estado === 'jugando' || estado === 'intro')) { pausado = true; teclas.clear(); if (jugador) { jugador.jPendiente = null; if (jugador.st === 'defensa') jugador.st = 'quieto'; } if (window.Musica) Musica.pausar(); return; }
    if (estado !== 'jugando') return;
    if (k === 'l') return;                                   // v86: sin poder especial en Batalla Campal
    if (e.repeat) { if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) teclas.add(k); return; }
    teclas.add(k);
    if (k === 'j') pulsarPina();
    if (k === 'k') boton('B');
    const dir = ['a', 'arrowleft'].includes(k) ? -1 : ['d', 'arrowright'].includes(k) ? 1 : 0;
    if (dir && libre(jugador) && dir === -jugador.face) jugador.giroPendiente = { dir, t: tiempo };
  }
  const alSoltar = e => teclas.delete(e.key.toLowerCase());
  const soltarTodo = () => { teclas.clear(); if (jugador) { jugador.jPendiente = null; if (jugador.st === 'defensa') { jugador.st = 'quieto'; jugador.t = 0; } } };
  // Un solo juego de listeners para toda la página (las partidas nuevas o reintentos NO agregan otros).
  addEventListener('keydown', alPresionar); addEventListener('keyup', alSoltar); addEventListener('blur', soltarTodo);
  document.addEventListener('visibilitychange', () => { if (document.hidden) soltarTodo(); });
  const resEl = document.getElementById('resultado'), resTitulo = document.getElementById('resTitulo'), resDetalle = document.getElementById('resDetalle');
  const btnReintentar = document.getElementById('resReintentar'), btnVolver = document.getElementById('resVolver');
  btnReintentar.addEventListener('click', () => { if (estado === 'fin') crearPartida(); });
  btnVolver.addEventListener('click', volverAlSelector);
  const resultadoVisible = () => !resEl.hidden;
  function mostrarResultado() {
    const gano = resultado === 'victoria';
    resTitulo.textContent = gano ? '¡VICTORIA!' : 'DERROTA'; resTitulo.className = gano ? '' : 'derrota';
    resDetalle.textContent = gano ? `Los ${totales.ING} ingleses quedaron fuera de combate. Argentina terminó con ${vivos.ARG} de ${totales.ARG}${enPie(jugador) ? '' : ` (${INFO_J.nombre} cayó en la pelea)`}.`
                                  : `Cayeron los ${totales.ARG} argentinos. Inglaterra terminó con ${vivos.ING} de ${totales.ING}.`;
    resEl.hidden = false; btnReintentar.focus();
  }
  function ocultarResultado() { resEl.hidden = true; }

  /* ---------------- Bucle (compartido: sin timers por personaje) ---------------- */
  let ultimo = 0;
  let congelado = false;   // v167: solo pruebas (consola): congela la simulación sin cartel de pausa
  function bucle(ms) {
    const dt = Math.min(0.05, (ms - ultimo) / 1000 || 0); ultimo = ms;
    const t0 = performance.now();
    if (estado !== 'cargando' && !pausado && !congelado) { tiempo += dt; estadoT += dt; actualizar(dt); }
    const t1 = performance.now();
    dibujar();
    const t2 = performance.now();
    medir(dt, t1 - t0, t2 - t1);
    requestAnimationFrame(bucle);
  }
  function actualizar(dt) {
    if (estado === 'intro' && estadoT >= TIEMPO.intro) { estado = 'jugando'; estadoT = 0; }
    armarRejilla();
    for (const e of entidades) e.nAtk = 0;
    for (const e of entidades) if (enPie(e) && e.objetivo && enPie(e.objetivo)) e.objetivo.nAtk++;
    actualizarPoder(dt);
    if (jugador) actualizarJugador(dt);
    let sim = 0;
    if (estado === 'jugando') reponer();
    for (const e of entidades) {
      if (e === jugador || e.fase === 'reserva' || e.fase === 'oculto') continue;   // v165: referentes ingleses ocultos hasta su umbral                       // reservas: quietas en su lugar, sin IA ni colisiones
      if (e.fase === 'ingresando') { if (estado === 'jugando') actualizarIngreso(e, dt); continue; }
      actualizarIA(e, dt); if (e.fase === 'activo') sim++;
    }
    rendimiento.simuladas = sim + (enPie(jugador) ? 1 : 0);
    if (!espectador && jugador.st === 'ko' && estado === 'jugando') { espectador = true; console.info('[Batalla] el jugador quedó fuera: modo espectador'); }
    if (estado === 'jugando') resolverSolapes();
    efectos.forEach(f => f.t += dt); efectos = efectos.filter(f => f.t < (f.tipo === 'bloqueo' ? TIEMPO.chispaBloqueo : TIEMPO.chispa));
    actualizarDama(dt);
    camaraSeguir(false);
    if (estado === 'jugando') {
      // gana quien elimina a los 100 rivales (activos + ingresando + reservas = 0); el jugador derrotado mira hasta el final
      if (vivos.ING <= 0) { resultado = 'victoria'; estado = 'fin'; estadoT = 0; cortarPoder(); console.info('[Batalla] VICTORIA'); }
      else if (vivos.ARG <= 0) { resultado = 'derrota'; estado = 'fin'; estadoT = 0; cortarPoder(); console.info('[Batalla] DERROTA'); }
      if (estado === 'fin' && window.Musica) Musica.detener(true);
    }
    if (estado === 'fin' && !resultadoVisible() && estadoT >= TIEMPO.finResultado) mostrarResultado();
  }
  function medir(dt, actMs, dibMs) {
    const R0 = rendimiento; if (dt > 0) { R0.muestras.push(dt); if (R0.muestras.length > 120) R0.muestras.shift(); }
    const prom = R0.muestras.reduce((a, b) => a + b, 0) / (R0.muestras.length || 1);
    R0.fps = prom ? 1 / prom : 0; R0.actualizarMs = lerp(R0.actualizarMs, actMs, 0.1); R0.dibujarMs = lerp(R0.dibujarMs, dibMs, 0.1);
    R0._t += dt; if (R0._t >= 1) { R0.piensaPorSeg = R0._piensa / R0._t; R0._piensa = 0; R0._t = 0; }
  }

  /* ---------------- Dibujo ---------------- */
  function frameRef(e, A) {
    const an = A.def.anim;
    if (e.st === 'damajuana' && an.damajuana) {
      const T = DJ.tiempos, i = e.t < T.recoger ? 0 : e.t < T.recoger + T.sostener ? 1 : 2;
      if (i === 2 && an.damajuana.length > 3) { const fr = (A.def.tiempos && A.def.tiempos.tomar) || 0.5; return an.damajuana[e.t < T.recoger + T.sostener + T.beber * fr ? 2 : 3]; }
      return an.damajuana[i];
    }
    if (e.st === 'ko' || e.st === 'fuera') return an.koCaida && e.t < 0.45 && e.st === 'ko' ? an.koCaida[0] : an.ko[0];
    if (e.st === 'dolor') {
      const ts = A.def.tiempos && A.def.tiempos.dolor; if (!ts || an.dolor.length < 2) return an.dolor[0];
      let acc = 0; for (let i = 0; i < an.dolor.length; i++) { acc += ts[i] || 0; if (e.t < acc) return an.dolor[i]; } return an.dolor[an.dolor.length - 1];
    }
    if (e.st === 'poder') { const P = poderActivo && poderActivo.pres, l = an.poder; if (!l || !P) return an.quieto[0]; const fase = P.poses.find(x => poderActivo.t < x.hasta) || P.poses[P.poses.length - 1]; return l[fase.pose] || an.quieto[0]; }
    if (e.st === 'ataque' && an[e.tecnica + 'Seq']) return an[e.tecnica + 'Seq'][(e.paso || 0) % an[e.tecnica + 'Seq'].length];   // v83
    if (e.st === 'ataque') return (e.variante === 'der' && an[e.tecnica + 'Der']) ? an[e.tecnica + 'Der'][0] : an[e.tecnica][0];
    if (e.st === 'golpear' && e.t < 0.28) { const tc = e.golpe === 'patada' ? 'Patadas' : 'Trompadas';   // v83: la variante elegida al empezar
      return (e.varIdx != null && an[tc + 'Seq']) ? an[tc + 'Seq'][e.varIdx % an[tc + 'Seq'].length] : an[tc][0]; }
    if (e.st === 'defensa' || e.st === 'bloquear') return an.bloqueo[0];
    const camina = e.st === 'camina' || e.st === 'acercarse' || e.st === 'ajustar';
    if (camina) {
      const vertical = e === jugador ? e.rumbo !== 'lado' : A.def.pasoMs ? !!e.ejeV : Math.abs(e.my) > Math.abs(e.mx) * 1.3;   // v92: eje con histéresis (pasoReloj)
      const msP = nombre => !A.def.pasoMs ? 0 : typeof A.def.pasoMs === 'number' ? A.def.pasoMs : (A.def.pasoMs[nombre] || 0);   // v93: número o por animación
      const abajo = e === jugador ? e.rumbo === 'abajo' : e.my > 0;
      const z = A.def.zancada * escalaEn(e.y), zl = (A.def.zancadaLado || A.def.zancada) * escalaEn(e.y);
      const paso = (l, zz, nombre) => { const ms = msP(nombre); return ms ? l[Math.floor((e.relojPaso || 0) * 1000 / ms) % l.length] : l[Math.floor(e.recorrido / zz) % l.length]; };   // v92/v93: por tiempo con «pasoMs»
      if (vertical && abajo && an.caminaAbajo) return paso(an.caminaAbajo, z, 'caminaAbajo');
      if (vertical && !abajo && an.caminaArriba) return paso(an.caminaArriba, z, 'caminaArriba');
      return paso(e.face < 0 ? an.caminaLadoIzq : an.caminaLadoDer, zl, e.face < 0 ? 'caminaLadoIzq' : 'caminaLadoDer');
    }
    if (e === jugador && e.rumbo === 'abajo' && e.st === 'quieto') return an.quietoFrente[0];
    if (e === jugador && e.rumbo === 'arriba' && e.st === 'quieto') return an.quietoEspalda[0];
    return an.quieto[0];
  }
  const sombra = (e, alpha, ancho = 30) => { if (perf.sinSombras) return; const f = relCerca(e.y); g.save(); g.globalAlpha = 0.33 * alpha; g.fillStyle = '#000'; g.beginPath(); g.ellipse(e.x, e.y, ancho * f, 6 * f, 0, 0, 7); g.fill(); g.restore(); };
  function dibujarRef(e, alpha) {
    const A = { def: DEF_REF(e.refId) };
    let paso = frameRef(e, A), id, espejo = false;
    if (typeof paso === 'object') { id = paso.id; espejo = !!paso.espejo; }       // cuadro con espejo explícito (como js/juego.js)
    else {
      id = paso; const m0 = A.def.frames[id] || A.def.frames[A.def.anim.quieto[0]], dir = m0.mira === 'der' ? 1 : m0.mira === 'izq' ? -1 : 0;
      if (!A.def.frames[id]) id = A.def.anim.quieto[0];
      if (dir && dir !== e.face) { const inv = Object.keys(A.def.pares).find(k => A.def.pares[k] === id), par = A.def.pares[id] || inv; if (par) id = par; else espejo = true; }
    }
    const m = A.def.frames[id]; e.dibujado = id + (espejo ? '~' : '');   // v83: depuración (cuadro realmente dibujado)
    let q = cuadro(m.src), ancla = m.ancla;
    if (!q) { q = cuadro(A.def.frames[A.def.anim.quieto[0]].src); if (!q) return; }
    if (espejo && m.espejo && cuadro(m.espejo)) { q = cuadro(m.espejo); ancla = q.w0 - m.ancla; espejo = false; }
    const k = altoEn(e.y) / A.def.altoReferencia[m.grupo];
    sombra(e, alpha);
    g.save(); g.globalAlpha = alpha; g.translate(e.x, e.y);
    if ((e.st === 'ko' || e.st === 'fuera') && !m.sinGiro) { const f = Math.min(1, e.t / 0.35); g.rotate(-e.face * f * Math.PI / 2 * 0.92); }
    if (e.st === 'preparar') g.translate(-6 * relCerca(e.y) * e.face, 0);
    g.scale(espejo ? -1 : 1, 1);
    g.drawImage(q.c, -ancla * k, -m.pie * k, q.c.width * k / q.f, q.c.height * k / q.f);
    g.restore();
  }
  function poseNpc(e, D0) {
    const an = { ...D0.anim, dolor: D0.anim.dolor || D0.anim.quieto };
    if (an.dolores) an.dolor = an.dolores[e.nDolor % an.dolores.length];
    const cayendo = fr => an.desequilibrio ? an.desequilibrio[Math.min(an.desequilibrio.length - 1, Math.floor(fr * an.desequilibrio.length))] : (an.caida || an.quieto);
    if (e.st === 'ko' || e.st === 'fuera') { const final = an.muerto || an.caida || an.quieto; if (e.st === 'fuera') return final; return e.t < KO_ANIM.reaccion ? an.dolor : e.t < KO_ANIM.reaccion + KO_ANIM.caida ? cayendo((e.t - KO_ANIM.reaccion) / KO_ANIM.caida) : final; }
    if (e.st === 'dolor') return an.dolor;
    if (e.st === 'golpear' && e.t < 0.28) { const a = an[e.golpe]; if (a) return typeof a === 'string' ? a : a[e.face < 0 ? 'izq' : 'der']; }
    if (e.st === 'bloquear' && an.bloqueo) { const b = an.bloqueo; return typeof b === 'string' ? b : b[e.face < 0 ? 'izq' : 'der']; }
    if (e.st === 'acercarse' || e.st === 'ajustar') { const l = e.face < 0 ? an.caminaIzq : an.caminaDer, z = (D0.zancadaLado || D0.zancada) * escalaEn(e.y); return l[Math.floor(e.recorrido / z) % l.length]; }
    return an.quieto;
  }
  /* v164 — pose de un HOOLIGAN (común o referente) según su estado. Direcciones: 'izq'/'der' = hacia dónde actúa en pantalla.
     Caminata por distancia (zancada × escala): de costado 05-06-07-06 / 08-09-10-09; si el movimiento es sobre todo en profundidad
     (con histéresis), de frente 11-12-13-12 (bajando) o de espaldas 14-15-16-15 (subiendo). */
  const ladoH = e => e.face < 0 ? 'izq' : 'der';
  function poseHool(e, A) {
    const an = A.anim, t = e.t, lado = ladoH(e);
    if (e.st === 'ko' || e.st === 'fuera') {
      if (t < KO_ANIM.reaccion && e.st === 'ko') return an.dolores[e.nDolor % 3];
      if (an.derrota && (e.st === 'fuera' || t > KO_ANIM.reaccion + 0.45)) return an.ko && t < KO_ANIM.reaccion + 0.9 && e.st === 'ko' ? an.ko : an.derrota;   // Cass: 31 → 33
      return an.caida;
    }
    if (e.st === 'derribo') return t < HOOL.caidaDerribo ? an.caida : an.levantarse;
    if (e.st === 'dolor') return an.dolores[e.nDolor % 3];
    if (e.escape > 0 && e.st !== 'preparar' && e.st !== 'golpear' && e.st !== 'bloquear') return an.tambaleo;
    if (e.st === 'preparar') {
      if (e.golpe === 'especial') return an.especial.preparar;
      return an.quieto[lado];
    }
    if (e.st === 'golpear') {
      if (e.golpe === 'especial') return t < 0.12 && an.especial.impulso ? an.especial.impulso : t < 0.3 ? an.especial.impacto : an.especial.recuperar;
      if (t < 0.28) { const G = an[e.golpe]; const v = G && (G[e.varH] || G.A); if (v) return v[lado]; }
      return an.quieto[lado];
    }
    if (e.st === 'bloquear') return an.bloqueo[lado];
    if (e.st === 'acercarse' || e.st === 'ajustar' || e.fase === 'ingresando') {
      const s = escalaEn(e.y), vert = !!e.ejeV;
      if (vert) { const L = (e.my || 0) > 0 ? an.caminaFrente : an.caminaEspalda; return L[Math.floor(e.recorrido / (A.zancada * s)) % L.length]; }
      const L = e.face < 0 ? an.caminaIzq : an.caminaDer; return L[Math.floor(e.recorrido / (A.zancadaLado * s)) % L.length];
    }
    return an.quieto[lado];
  }
  function dibujarHool(e, alpha) {
    const A = SH[e.hool]; if (!A) return;
    let id = poseHool(e, A), m = A.frames[id], q = m && cuadro(m.src);
    if (!q) { id = A.anim.quieto[ladoH(e)]; m = A.frames[id]; q = cuadro(m.src); if (!q) return; }
    e.dibujado = id;
    const dir = m.mira === 'der' ? 1 : m.mira === 'izq' ? -1 : 0, espejo = dir !== 0 && dir !== e.face;   // solo 27-32 y 37-40 (miran a la derecha)
    const k = altoEn(e.y) * (e.jefeH ? 1.05 : 1) / m.ref;
    const acostado = false;   // v166: la caída (30) ya es horizontal: no se rota ni se achica; al desaparecer solo baja la opacidad
    sombra(e, alpha, (e.st === 'ko' || e.st === 'fuera') ? 55 : e.jefeH ? 34 : 30);
    g.save(); g.globalAlpha = alpha; g.translate(e.x, e.y);
    if (acostado) { const f = Math.min(1, Math.max(0, (e.st === 'fuera' ? 1 : (e.t - KO_ANIM.reaccion) / 0.35))); g.rotate(-e.face * f * Math.PI / 2 * 0.9); }
    if (e.st === 'preparar') g.translate(-6 * relCerca(e.y) * e.face, 0);
    g.scale(espejo ? -1 : 1, 1);
    g.drawImage(q.c, -m.ancla * k, -m.pie * k, q.c.width * k / q.f, q.c.height * k / q.f);
    g.restore();
  }
  function dibujarNpc(e, alpha) {
    const D0 = DEF_NPC(e.arte); let id = poseNpc(e, D0);
    let m = D0.frames[id], q = cuadro(m.src);
    if (!q) { id = D0.anim.quieto; m = D0.frames[id]; q = cuadro(m.src); if (!q) return; }
    const dir = m.mira === 'der' ? 1 : m.mira === 'izq' ? -1 : 0, espejo = dir !== 0 && dir !== e.face;
    const k = altoEn(e.y) / m.ref;
    sombra(e, alpha, m.acostado ? 60 : 30);
    g.save(); g.globalAlpha = alpha; g.translate(e.x, e.y);
    if (e.st === 'preparar') g.translate(-6 * relCerca(e.y) * e.face, 0);
    g.scale(espejo ? -1 : 1, 1);
    g.drawImage(q.c, -m.ancla * k, -m.pie * k, q.c.width * k / q.f, q.c.height * k / q.f);
    g.restore();
  }
  function texto(t, x, y, tam, color = ID.hueso, al = 'left') {
    g.font = `bold ${tam}px Verdana, sans-serif`; g.textAlign = al; g.textBaseline = 'alphabetic';
    g.fillStyle = ID.carbon; g.fillText(t, x + 2, y + 2); g.fillStyle = color; g.fillText(t, x, y);
  }
  function barra(x, y, w, h, pct, c0, c1) {
    g.fillStyle = ID.carbon; g.fillRect(x - 3, y - 3, w + 6, h + 6); g.fillStyle = ID.hueso; g.fillRect(x - 1, y - 1, w + 2, h + 2);
    g.fillStyle = '#3a1116'; g.fillRect(x, y, w, h);
    const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, c0); gr.addColorStop(1, c1); g.fillStyle = gr; g.fillRect(x, y, w * limitar(pct, 0, 100) / 100, h);
  }
  function dibujarDama() {
    if (!dama || !imgItem) return;
    const q = imgItem, s = escalaEn(dama.y), cj = ITEM.cajaObjeto, k = ITEM.altoObjeto * s / (cj.y1 - cj.y0), resta = Math.max(0, DJ.duracion - dama.t);
    const sube = Math.sin(tiempo * 5) * 3 * s;
    g.save(); g.globalAlpha = 0.35; g.fillStyle = '#000'; g.beginPath(); g.ellipse(dama.x, dama.y, 18 * relCerca(dama.y), 5 * relCerca(dama.y), 0, 0, 7); g.fill(); g.restore();
    g.save(); if (resta < 2 && Math.floor(tiempo * 8) % 2 === 0) g.globalAlpha = 0.6;
    g.drawImage(q.c, dama.x - (cj.x0 + cj.x1) / 2 * k, dama.y - cj.y1 * k + sube, q.c.width * k / q.f, q.c.height * k / q.f); g.restore();
    const cy = dama.y - ITEM.altoObjeto * s - 16, r = 9;
    g.save(); g.lineWidth = 2.5; g.fillStyle = 'rgba(5,9,20,0.65)'; g.beginPath(); g.arc(dama.x, cy, r, 0, 7); g.fill();
    g.strokeStyle = resta < 2 ? '#ff6b5e' : '#ffd34f'; g.beginPath(); g.arc(dama.x, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * resta / DJ.duracion); g.stroke();
    g.font = 'bold 10px Verdana'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff'; g.fillText(String(Math.ceil(resta)), dama.x, cy + 0.5); g.restore();
  }
  function dibujar() {
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = ID.carbon; g.fillRect(0, 0, PANT.w, PANT.h);
    if (estado === 'cargando') { dibujarCarga(); return; }
    if (estado === 'errorFondo') {
      texto('NO SE PUDO CARGAR EL ESCENARIO', PANT.w / 2, 400, 52, '#ff8a7a', 'center');
      texto('La rotonda de la Batalla Campal no bajó (revisá la conexión).', PANT.w / 2, 470, 28, ID.hueso, 'center');
      texto('ENTER o tocar la pantalla: reintentar   ·   ESC: volver al selector', PANT.w / 2, 530, 24, ID.huesoSuave, 'center');
      return;
    }
    // fondo: solo el recorte visible (no se escala la imagen entera en cada cuadro)
    if (imgFondo) g.drawImage(imgFondo, cam.x, cam.y, cam.w, cam.h, 0, 0, PANT.w, PANT.h);
    g.setTransform(ZOOM, 0, 0, ZOOM, -cam.x * ZOOM, -cam.y * ZOOM);
    if (debugPiso) dibujarPiso();
    dibujarDama();
    const visibles = entidades.filter(e => e.fase !== 'oculto' && !(e.st === 'fuera' && e.t > TIEMPO.desvanecer) && e.x > cam.x - MAX_DIBUJO_FUERA && e.x < cam.x + cam.w + MAX_DIBUJO_FUERA);
    visibles.sort((a, b) => a.y - b.y || (a.st === 'ko' || a.st === 'fuera' ? -1 : 0) - (b.st === 'ko' || b.st === 'fuera' ? -1 : 0));
    // los caídos se dibujan primero (en el piso), los de pie por profundidad de los pies
    const caidos = visibles.filter(e => e.st === 'ko' || e.st === 'fuera'), dePie = visibles.filter(e => e.st !== 'ko' && e.st !== 'fuera');
    for (const e of [...caidos, ...dePie]) {
      let alpha = 1;
      if (e.st === 'fuera') alpha = Math.max(0, 1 - e.t / TIEMPO.desvanecer);
      if (e === jugador && e.inv > 0 && Math.floor(tiempo * 16) % 2 === 0) alpha = 0.5;
      if (perf.sinFiguras) continue;
      if (e.hool) dibujarHool(e, alpha); else if (e.clase === 'npc') dibujarNpc(e, alpha); else dibujarRef(e, alpha);
      if (e.st === 'preparar' && e.objetivo === jugador) { g.save(); g.globalAlpha = 0.5 + 0.5 * Math.sin(e.t * 30); texto('!', e.x, e.y - altoEn(e.y) - 8, 18, '#ffd34f', 'center'); g.restore(); }
    }
    rendimiento.dibujadas = visibles.length;
    // marcas: jugador (flecha dorada) y referentes aliados (nombre chico)
    for (const e of dePie) {
      if (e === jugador) {   // marca del jugador: flecha dorada que late + «VOS», para no perderse entre 100
        const y = e.y - altoEn(e.y) - 8 - Math.abs(Math.sin(tiempo * 4)) * 4; g.save(); g.fillStyle = ID.doradoClaro; g.strokeStyle = ID.carbon; g.lineWidth = 2;
        g.beginPath(); g.moveTo(e.x - 11, y - 14); g.lineTo(e.x + 11, y - 14); g.lineTo(e.x, y); g.closePath(); g.fill(); g.stroke(); g.restore();
        texto('VOS', e.x, y - 18, 11, ID.doradoClaro, 'center'); }
      else if (e.jefeH && e.fase !== 'reserva') { g.save(); g.globalAlpha = 0.95; texto(e.nombre.toUpperCase(), e.x, e.y - altoEn(e.y) * 1.04 - 6, 9, '#ff9b9b', 'center'); g.restore(); }
      else if (e.clase === 'referente' && e.fase !== 'reserva') { g.save(); g.globalAlpha = 0.9; texto(e.nombre.toUpperCase(), e.x, e.y - altoEn(e.y) - 6, 8, '#bfe3ff', 'center'); g.restore(); }
    }
    if (debugIA) dibujarDiagnostico(dePie);
    for (const f of efectos) {
      g.save(); g.translate(f.x, f.y);
      if (f.tipo === 'bloqueo') { const a = 1 - f.t / TIEMPO.chispaBloqueo; g.globalAlpha = Math.max(0, a); g.strokeStyle = '#8fd3ff'; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 8 + f.t * 70, 0, 7); g.stroke(); }
      else { const a = 1 - f.t / TIEMPO.chispa, r = 8 + f.t * 70; g.globalAlpha = Math.max(0, a); g.fillStyle = '#fff4c2'; g.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, an = i / 10 * Math.PI * 2; g.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } g.fill(); }
      g.restore();
    }
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (poderActivo) {
      const A = poderActivo;
      if (A.lluvia && videoLluvia && videoLluvia.readyState >= 2) { const tl = A.t - A.pres.lluvia.desde, h = PANT.w * videoLluvia.videoHeight / videoLluvia.videoWidth;
        g.save(); g.globalAlpha = Math.max(0, Math.min(1, tl / 0.15, (A.pres.lluvia.dura - tl) / 0.4)); g.drawImage(videoLluvia, 0, (PANT.h - h) / 2, PANT.w, h); g.restore(); }
      if (A.destello > 0) { g.save(); g.globalAlpha = A.destello / 0.3 * 0.35; g.fillStyle = '#fff4dc'; g.fillRect(0, 0, PANT.w, PANT.h); g.restore(); }
    }
    hud();
    if (estado === 'intro') { g.fillStyle = ID.carbonA(0.35); g.fillRect(0, 0, PANT.w, PANT.h); texto('BATALLA CAMPAL', PANT.w / 2, PANT.h / 2 - 30, 84, ID.doradoClaro, 'center'); texto(`ARGENTINA ${totales.ARG}  VS  ${totales.ING} INGLATERRA · ${COMPOSICION.cancha} CONTRA ${COMPOSICION.cancha} EN CANCHA · ¡A PELEAR!`, PANT.w / 2, PANT.h / 2 + 34, 30, ID.hueso, 'center'); }
    if (pausado) {
      g.fillStyle = ID.carbonA(0.72); g.fillRect(0, 0, PANT.w, PANT.h);
      texto('PAUSA', PANT.w / 2, PANT.h / 2 - 90, 96, ID.dorado, 'center');
      texto('P: seguir   ·   ESC: volver al selector de Batalla Campal', PANT.w / 2, PANT.h / 2 - 10, 28, ID.hueso, 'center');
      texto('WASD / flechas: mover · J: piña · K: patada · J + atrás: cubrirse · J sobre el objeto: recuperar vida', PANT.w / 2, PANT.h / 2 + 50, 24, ID.huesoSuave, 'center');
      if (ITEM) texto(`${ITEM.nombre}: aparece con ${Math.round(DJ.umbral * 100)} % de vida o menos · ${DJ.duracion} s para recogerlo con J`, PANT.w / 2, PANT.h / 2 + 92, 22, '#9fe08a', 'center');
      texto('M: música sí/no · − / +: volumen', PANT.w / 2, PANT.h / 2 + 130, 22, ID.huesoSuave, 'center');
    }
    if (debugIA) { const d = window.BB_BATALLA.diagnostico(); texto(`IA · ataques ${d.stats.ataques} · impactos ${d.stats.impactos} · bloqueos ${d.stats.bloqueos} (${d.stats.bloqueosEfectivos} efectivos) · contras ${d.stats.contraataques} · combos ${d.stats.combos} · ocioso máx ${d.maxOcioso.toFixed(1)} s`, 20, PANT.h - 48, 18, '#8fd3ff'); }
    if (debugFps) texto(`${rendimiento.fps.toFixed(0)} FPS · act ${rendimiento.actualizarMs.toFixed(1)} ms · dib ${rendimiento.dibujarMs.toFixed(1)} ms · ${rendimiento.dibujadas} dibujadas / ${rendimiento.simuladas} simuladas`, 20, PANT.h - 20, 18, '#9fe08a');
  }
  function hud() {
    const p = jugador, x = 40;
    texto(INFO_J.nombre.toUpperCase(), x, 54, 32);
    g.font = 'bold 32px Verdana'; const w = g.measureText(INFO_J.nombre.toUpperCase()).width;
    texto(INFO_J.club.toUpperCase(), x + w + 12, 54, 18, ID.doradoClaro);
    barra(x, 70, 420, 22, p.luch.porcentajeVida, '#ffe066', '#e0a400');
    texto(`${Math.ceil(p.luch.porcentajeVida)}%`, x + 432, 89, 20);
    // v86: sin barra de poder (en Batalla Campal no hay poder especial)
    // centro: logo y contadores (sobrevivientes / total)
    const cx = PANT.w / 2;
    if (imgLogo) { const lw = 200, lh = lw * imgLogo.height / imgLogo.width; g.drawImage(imgLogo, cx - lw / 2, 8, lw, lh); }
    // v84: por equipo, supervivientes totales (activos + ingresando + reserva) · en cancha (máx. 10) · en reserva
    const yC = 120;
    g.fillStyle = ID.carbonA(0.7); g.fillRect(cx - 560, yC - 32, 1120, 100);
    texto(`ARGENTINA ${vivos.ARG}/${totales.ARG}`, cx - 20, yC, 28, '#8fd0ff', 'right');
    texto('·', cx, yC, 28, ID.hueso, 'center');
    texto(`${vivos.ING}/${totales.ING} INGLATERRA`, cx + 20, yC, 28, '#ff8f8f', 'left');
    const cm = f => { let a = 0, r = 0, ref = 0; for (const e of entidades) { if (e.faccion !== f || e.contado) continue;
        if (e.clase === 'npc' && !e.jefeH) { if (e.fase === 'activo' || e.fase === 'ingresando') a++; else if (e.fase === 'reserva') r++; } else ref++; } return { a, r, ref }; };
    const cA = cm('ARG'), cI = cm('ING');
    texto(`Comunes ${cA.a + cA.r}/${COMPOSICION.comunesARG} (${cA.a} en cancha · ${cA.r} en reserva) · Referentes ${cA.ref}/${COMPOSICION.referentes}`, cx - 20, yC + 32, 16, '#cfe8ff', 'right');
    texto(`Comunes ${cI.a + cI.r}/${COMPOSICION.comunesING} (${cI.a} en cancha · ${cI.r} en reserva) · Referentes ${cI.ref}/${JEFES_ING.length}`, cx + 20, yC + 32, 16, '#ffd0d0', 'left');
    texto(`Hooligans abatidos ${bajasComunesING}/${COMPOSICION.comunesING} · Referentes ingleses vencidos ${entidades.filter(x => x.jefeH && x.contado).length}/${JEFES_ING.length}`, cx, yC + 60, 16, '#ffd0d0', 'center');   // v164
    if (espectador && estado === 'jugando') { g.fillStyle = ID.carbonA(0.7); g.fillRect(cx - 360, PANT.h - 92, 720, 56);
      texto(`${INFO_J.nombre.toUpperCase()} QUEDÓ FUERA · MIRANDO LA BATALLA · ESC: salir`, cx, PANT.h - 54, 24, ID.doradoClaro, 'center'); }
    texto('BATALLA CAMPAL · PRUEBA', PANT.w - 40, 54, 22, ID.dorado, 'right');
    texto('P: pausa', PANT.w - 40, 82, 16, ID.huesoSuave, 'right');
  }
  function dibujarCarga() {
    if (imgFondo) { const ch = imgFondo.naturalHeight, cw = ch * PANT.w / PANT.h; g.drawImage(imgFondo, (imgFondo.naturalWidth - cw) / 2, 0, cw, ch, 0, 0, PANT.w, PANT.h); g.fillStyle = ID.carbonA(0.75); g.fillRect(0, 0, PANT.w, PANT.h); }   // recorte central, sin estirar
    texto('BATALLA CAMPAL', PANT.w / 2, 360, 84, ID.doradoClaro, 'center');
    const tot = Math.max(1, cargaTotal), hechos = cargaStats.listos + cargaStats.errores, W = 760, x = (PANT.w - W) / 2;
    g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(x, 470, W, 24); g.fillStyle = ID.dorado; g.fillRect(x, 470, W * hechos / tot, 24);
    texto(`Preparando ${COMPOSICION.ARG + COMPOSICION.ING} combatientes · ${hechos} de ${tot} cuadros`, PANT.w / 2, 540, 26, ID.hueso, 'center');
  }
  let debugPiso = /[?&]debug=piso\b/.test(location.search), debugFps = /[?&]debug=fps\b/.test(location.search), debugIA = /[?&]debug=ia\b/.test(location.search);
  // ?debug=ia (temporal): estado · motivo sobre cada unidad, línea a su objetivo (rojo si está al alcance) y totales abajo
  const COLOR_ESTADO = { preparar: '#ffd34f', golpear: '#ff7a3a', bloquear: '#8fd3ff', dolor: '#ff6b6b', esperar: '#d8d0be', acercarse: '#9fe08a', ajustar: '#c69cff' };
  function dibujarDiagnostico(lista) {
    g.save(); g.lineWidth = 1 / ZOOM * 1.5;
    for (const e of lista) {
      if (e === jugador || !e.diag) continue;
      const o = e.objetivo;
      if (o && enPie(o)) { g.strokeStyle = enContacto(e, o) ? 'rgba(255,80,80,.7)' : 'rgba(255,255,255,.25)'; g.beginPath(); g.moveTo(e.x, e.y - 4); g.lineTo(o.x, o.y - 4); g.stroke(); }
      texto(`${e.st} · ${e.diag.motivo}`, e.x, e.y + 11, 6, COLOR_ESTADO[e.st] || ID.hueso, 'center');
      if (e.diag.dx != null) texto(`${e.diag.dx}/${e.diag.dy} cd ${e.diag.cd}`, e.x, e.y + 18, 5, ID.huesoSuave, 'center');
    }
    g.restore();
  }
  function dibujarPiso() {
    g.save(); g.strokeStyle = '#00ff88'; g.lineWidth = 2 / ZOOM; g.fillStyle = 'rgba(0,255,136,.12)'; g.beginPath();
    for (let y = PISO.yMin; y <= PISO.yMax; y += 4) g.lineTo(xMinEn(y), y);
    for (let y = PISO.yMax; y >= PISO.yMin; y -= 4) g.lineTo(xMaxEn(y), y);
    g.closePath(); g.fill(); g.stroke(); g.restore();
  }

  /* ---------------- Arranque ---------------- */
  let cargaTotal = 0;
  // El fondo de COMBATE (rotonda) es obligatorio: si no carga se muestra el error y se puede reintentar (nunca se usa otro fondo).
  let fondoError = false;
  function cargarFondo() { fondoError = false; return cargarImagen(FONDO + SUFIJO).then(im => { imgFondo = im; fondoError = !im; if (!im) console.warn('[Batalla] no cargó el fondo de combate', FONDO); return im; }); }
  function reintentarFondo() { if (estado !== 'errorFondo') return; estado = 'cargando'; cargarFondo().then(im => { if (im) crearPartida(); else estado = 'errorFondo'; }); }
  const pedidoFondo = cargarFondo();
  cargarImagen(LOGO).then(im => { imgLogo = im; });
  const lista = manifiesto();
  cargaTotal = lista.length + (ITEM ? 1 : 0);
  const pedidos = lista.map(([src, ref]) => pedirCuadro(src, ref));
  if (ITEM) pedidos.push(pedirCuadro(ITEM.img, ITEM.cajaObjeto.y1 - ITEM.cajaObjeto.y0).then(q => { imgItem = q; }));
  const tCarga = performance.now();
  Promise.all([...pedidos, pedidoFondo]).then(() => {
    atlasImg.clear();                                         // los atlas ya se recortaron: se liberan
    console.info(`[Batalla] ${cargaStats.listos} cuadros listos (${cargaStats.errores} errores) en ${((performance.now() - tCarga) / 1000).toFixed(2)} s · fondo ${imgFondo ? 'rotonda ' + imgFondo.naturalWidth + '×' + imgFondo.naturalHeight : 'NO CARGÓ'}`);
    if (!imgFondo) { estado = 'errorFondo'; return; }
    crearPartida();
  });
  cv.addEventListener('pointerdown', reintentarFondo);
  requestAnimationFrame(ms => { ultimo = ms; bucle(ms); });

  /* ---------------- Depuración / pruebas (consola) ---------------- */
  window.BB_BATALLA = {
    get estado() { return estado; }, get pausado() { return pausado; }, get resultado() { return resultado; }, get partida() { return partidaN; },
    get vivos() { return { ...vivos }; }, get totales() { return { ...totales }; }, get bajas() { return bajasContadas; },
    get jugador() { return jugador; }, get entidades() { return entidades; }, get camara() { return { ...cam }; }, get poder() { return { carga: poderCarga, activo: !!poderActivo }; },
    get dama() { return dama && { ...dama }; }, get recuperacion() { return { ...contDama, espera: damaEspera, item: ITEM && ITEM.nombre }; }, zonaCombate: COMBATE, fila: FILA, get rendimiento() { const r = rendimiento; return { fps: r.fps, actualizarMs: r.actualizarMs, dibujarMs: r.dibujarMs, dibujadas: r.dibujadas, simuladas: r.simuladas, piensaPorSeg: r.piensaPorSeg }; },
    get carga() { return { ...cargaStats, total: cargaTotal, cache: cache.size }; },
    get fondo() { return { src: FONDO, cargado: !!imgFondo, ancho: imgFondo && imgFondo.naturalWidth, alto: imgFondo && imgFondo.naturalHeight, error: fondoError, url: imgFondo && imgFondo.src }; },
    get golpes() { return registroGolpes.slice(); }, perf, get config() { return { IA, ALTO, ZOOM, PISO, ALCANCE, PROF_GOLPE, COMPOSICION }; },
    piso: { xMinEn, xMaxEn, yMin: PISO.yMin, yMax: PISO.yMax, dentro: dentroDelPiso }, escala: altoEn, reparto: () => REPARTO,
    resumen() { const c = {}; for (const e of entidades) { const k = `${e.faccion}:${e.clase}${e.arte ? ':' + e.arte.split('_')[0] : ''}`; c[k] = (c[k] || 0) + 1; } return c; },
    empezar() { if (estado === 'intro') { estado = 'jugando'; estadoT = 0; } },
    set invencible(v) { invencible = !!v; }, get invencible() { return invencible; },
    debugMatar(faccion, n = Infinity) { let k = 0; for (const e of entidades) if (e.faccion === faccion && enPie(e) && e !== jugador && k < n) { e.luch.vida = 0; derrotar(e, null, 'prueba'); k++; } return k; },
    debugMatarJugador() { jugador.luch.vida = 0; derrotar(jugador, null, 'prueba'); },
    composicion: COMPOSICION, get info() { return { ...INFO_J }; }, referentes: REFERENTES.map(r => ({ ...r })),
    // v84: estado de la rotación 10 contra 10
    get rotacion() { const c = f => ({ total: vivos[f], cancha: cancha(f), activos: entidades.filter(e => e.faccion === f && enPie(e)).length,
        ingresando: entidades.filter(e => e.faccion === f && e.fase === 'ingresando').length, reserva: enReserva(f) });
      return { ARG: c('ARG'), ING: c('ING'), bajasNpcArg, umbralIdx, colaRefs: colaRefs.map(e => e.refId), espectador,
               refsEnCancha: entidades.filter(e => e.refId && (e.fase === 'activo' || e.fase === 'ingresando')).map(e => e.refId),
               refsHabilitados: REFS_PARTIDA.slice(1, 1 + umbralIdx).map(r => r.id), ordenUmbral: ORDEN_UMBRAL.map((r, i) => [UMBRALES_REF[i], r.id]), ingresos: registroIngresos.slice() }; },
    set ingresoInstantaneo(v) { ingresoInstantaneo = !!v; }, get ingresoInstantaneo() { return ingresoInstantaneo; },
    debugMatarId(id) { const e = entidades.find(x => x.id === id); if (!e || !enPie(e)) return false; e.luch.vida = 0; derrotar(e, null, 'prueba'); return true; },
    get tiempo() { return tiempo; },
    // v164: referentes hooligans
    get igualdad() { return JSON.parse(JSON.stringify(eqCfg())); },
    get conteo() { const c = f => ({ comunes: entidades.filter(e => e.faccion === f && e.clase === 'npc' && !e.jefeH).length, referentes: entidades.filter(e => e.faccion === f && (e.clase !== 'npc' || e.jefeH)).length,
        comunesEnCancha: canchaComunes(f), reservas: enReserva(f), jugadores: entidades.filter(e => e === jugador).length }); return { ARG: c('ARG'), ING: c('ING'), bajasNpcArg, refsArgEnCancha: entidades.filter(e => e.faccion === 'ARG' && e.clase === 'referente' && (e.fase === 'activo' || e.fase === 'ingresando')).map(e => e.refId) }; },
    get hooligans() { return { estados: { ...estadoJefe }, bajasComunes: bajasComunesING, jefeIdx, pendientes: colaJefes.map(e => e.jefeH), apariciones: apariciones.slice(),
        enCancha: entidades.filter(x => x.jefeH && (x.fase === 'activo' || x.fase === 'ingresando')).map(x => x.jefeH),
        vencidos: entidades.filter(x => x.jefeH && x.contado).map(x => x.jefeH), modelos: [...new Set(entidades.filter(x => x.faccion === 'ING' && !x.jefeH).map(x => x.hool))],
        sinHool: entidades.filter(x => x.faccion === 'ING' && !x.hool).length }; },
    debugMatarComunesING(n = 1) { let k = 0; for (const e of entidades) if (e.faccion === 'ING' && !e.jefeH && enPie(e) && k < n) { e.luch.vida = 0; derrotar(e, null, 'prueba'); k++; } return k; },
    debugMatarJefeING() { const e = entidades.find(x => x.jefeH && enPie(x)); if (!e) return null; e.luch.vida = 0; derrotar(e, null, 'prueba'); return e.jefeH; },
    debugPoseHool(id) { const e = entidades.find(x => x.id === id); return e && e.dibujado; },
    reiniciar() { crearPartida(); }, set congelado(v) { congelado = !!v; }, get congelado() { return congelado; },
    poseRef(e = jugador) { if (!e || !e.refId) return null; const f = frameRef(e, { def: DEF_REF(e.refId) }); return typeof f === 'object' ? f.id : f; },   // v92: solo lectura (pruebas de caminata)
    debugMatarNpcArg(n = 1) { let k = 0; for (const e of entidades) if (e.faccion === 'ARG' && e.clase === 'npc' && enPie(e) && k < n) { e.luch.vida = 0; derrotar(e, null, 'prueba'); k++; } return k; }, ritmo: () => ritmoLog.slice(), enContacto: (a, b) => enContacto(a, b), puedeGolpear: (a, b, t) => puedeGolpear(a, b, t),
    debugDejar(ids) { let k = 0; for (const e of entidades) if (e !== jugador && enPie(e) && !ids.includes(e.id)) { e.luch.vida = 0; derrotar(e, null, 'prueba'); k++; } return k; },
    get stats() { return { ...stats }; },
    // Diagnóstico temporal de la IA: cuántos hay en cada estado, por qué no pega cada uno y si alguien quedó «ocioso» pegado a un rival.
    diagnostico() {
      const porEstado = {}, porMotivo = {}, filas = []; let maxOcioso = 0, ociosos = 0, enContactoN = 0, peleando = 0;
      for (const e of entidades) {
        if (e === jugador || !enPie(e)) continue;
        porEstado[e.st] = (porEstado[e.st] || 0) + 1;
        const m = e.diag ? e.diag.motivo : '—'; porMotivo[m] = (porMotivo[m] || 0) + 1;
        if (e.tOcioso > maxOcioso) maxOcioso = e.tOcioso; if (e.tOcioso > 1) ociosos++;
        if (e.objetivo && enPie(e.objetivo) && enContacto(e, e.objetivo)) enContactoN++;
        if (e.st === 'preparar' || e.st === 'golpear' || e.st === 'bloquear' || e.st === 'dolor') peleando++;
        filas.push({ id: e.id, st: e.st, objetivo: e.objetivo ? e.objetivo.id : null, ...(e.diag || {}), ocioso: +e.tOcioso.toFixed(2) });
      }
      return { porEstado, porMotivo, maxOcioso, ociosos, enContacto: enContactoN, peleando, stats: { ...stats }, filas };
    },
    set debugIA(v) { debugIA = !!v; }, get debugIA() { return debugIA; },
    cargarPoder() { poderCarga = PD.CARGA_TOTAL; }, get poderHabilitado() { return PODER_EN_BATALLA; }, set debugFps(v) { debugFps = !!v; }, set debugPiso(v) { debugPiso = !!v; },
    listeners: 'únicos (keydown/keyup/blur/visibilitychange una sola vez por página)'
  };
})();
