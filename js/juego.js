/* =====================================================================
   FURIA DE TRIBUNA (antes BARRA 14 / Barras Bravas) — Campaña de 10 niveles (beat 'em up 2D)
   ---------------------------------------------------------------------
   Usa: js/reglas_combate.js (daño del jugador), js/combate.js (golpes y
   vida), js/niveles.js (niveles, enemigos y escalado por nivel),
   js/sprites_referentes.js y js/sprites_enemigos.js (cuadros).
   Coordenadas del mundo = píxeles del escenario (1672 × 941).
   Controles PC: WASD / flechas mover · J = piña · K = patada.
   DEFENSA: mantener J + ATRÁS (atrás = el lado contrario al que mira). Ver js/defensa.js.
   Agarre AUTOMÁTICO: avanzar contra un rival de frente y bien pegado.
   En el agarre: J = piña del combo · J otra vez = cabezazo que lo derriba.
   Menú: ENTER = campaña · 1…9 y 0 = entrar directo a un nivel.
   Depuración: los cálculos de daño salen en la consola (F12).
   ===================================================================== */
(function () {
  'use strict';
  if (window.FDT_REINICIO) return;   // v199: F5 → vuelve al inicio (no arranca el juego mientras se va)
  const R = window.ReglasCombate, C = window.Combate, N = window.Niveles, D = window.Defensa, DC = D.CONFIG;
  const CG = C.COMBO_GOLPES;             // v43: combo izquierda → izquierda → derecha (valores en js/combate.js)
  const DJ = window.Damajuana.CONFIG;    // v44: damajuana (recuperar vida) — valores en js/damajuana.js
  // v58: el objeto de recuperación depende del club DEL JUGADOR (damajuana River · hamburguesa Independiente/Racing). null = no hay.
  const ITEM = (() => { let c = 'river'; try { c = localStorage.getItem('barra14.barra') || 'river'; } catch (e) {}
    // v94: un referente con la recuperación deshabilitada (arte pendiente: Gallego Emilio) no recibe objeto: no aparece ni se piden imágenes
    const s = R.leerSeleccion(), d = s && (window.SPRITES_REFERENTES || {})[s.id];
    if (d && d.recuperacionDeshabilitada) { console.info(`[Recuperación] deshabilitada para ${s.referenteName}: faltan sus poses`); return null; }
    return window.Damajuana.itemDe(c, s && s.id); })();   // v95: el referente puede tener su propio objeto (Central: choripán)

  /* ---------------- Configuración general ---------------- */
  const MUNDO = { w: 1672, h: 941 };
  // v52 — FURIA DE TRIBUNA: colores de marca (definidos en css/identidad.css, leídos por js/identidad.js)
  const ID = window.IDENTIDAD || { NOMBRE: 'FURIA DE TRIBUNA', hueso: '#F5F0E4', huesoSuave: '#D8D0BE', dorado: '#C9A44A', doradoClaro: '#FFE3A0', carbon: '#151515', carbonA: a => `rgba(21,21,21,${a})`, doradoA: a => `rgba(201,164,74,${a})` };
  const ALTO_PERSONAJE = 345;            // alto en píxeles del personaje a escala 1
  const VEL_JUGADOR = 300;               // px/s. TODO: aplicar Velocidad cuando exista la fórmula (R.modificadorVelocidad)
  const VEL_ENEMIGO = 150;
  const PROF_GOLPE = 42;
  const EXTRA_AVISO_N1_4 = 0.6;          // v195: «!» de los barras en los niveles 1 a 4 = 0,40 + 0,60 = 1,00 s (v71: +2,0 · v193: +1,6)
  const PREP_MAX = 2.0;                  // v193: tope de la preparación visible («!» → golpe) de cualquier enemigo, en s de juego activo
  const FACTOR_CAMINATA_BARRAS = 0.85;   // v193: barras comunes caminan al 85 % (150 → 127,5 px/s). Una sola vez, al crear el enemigo
  let trucosPartida = false;             // v72: la partida usó trucos de creador (CTRL+SHIFT+VVV / EEE) → no entra al ranking          // v71: s extra entre el aviso (¡!) y el golpe de los barras en los niveles 1 a 4                 // diferencia máxima de profundidad (eje Y) para que un golpe conecte
  const ALCANCE = { Trompadas: 150, Codazos: 110, Patadas: 190, Rodillazos: 120, Agarres: 95, Cabezazos: 95, pina: 150, patada: 185, cabezazo: 105 };
  const TIEMPO = { ataque: 0.30, impacto: 0.11, golpeAgarre: 0.22, dolorJugador: 0.35, invulnerable: 0.7,
                   dolorEnemigo: 0.28, preparacion: 0.40, recuperacion: 0.65,
                   golpeVisible: 0.28,                   // s que se ve el cuadro de piña/patada del enemigo antes de volver a guardia
                   introNivel: 1.8, introJefe: 4.2, superado: 2.4, fuera: 2.2,
                   chispa: 0.18, chispaBloqueo: 0.26 };
  /* Agarre automático + combo (V3). Los DAÑOS del combo y la ventana del 2.º J están en js/combate.js (COMBO_AGARRE). */
  const AGARRE = {
    distancia: 72,        // px (a escala 1) entre el jugador y el rival para que lo agarre
    profundidad: 28,      // diferencia máxima en Y: tienen que estar en la misma línea (los golpes admiten 42)
    empuje: 0.15,         // s que hay que seguir avanzando contra él (rozarlo no alcanza)
    separacion: 84,       // px (a escala 1) a los que queda el rival mientras está agarrado
    esperaPrimerJ: 1.5,   // s sin tocar J → lo suelta sin combo
    golpe: 0.26,          // s que dura la animación de cada golpe del combo
    impacto: 0.10,        // s dentro de esa animación en que conecta
    reagarre: 0.9         // s que tarda en poder volver a agarrar al mismo rival después de soltarlo
  };
  const DERRIBO = { caida: 0.35, suelo: 1.0, levantarse: 0.4, empuje: 70 };   // s, s, s, px
  const KO_ANIM = { reaccion: 0.12, caida: 0.30 };                              // derrota: reacción → caída → muerto
  /* v29 — El Abuelo: al vaciar la primera barra se arrodilla y se levanta UNA vez con la vida llena.
     Tiempos de juego (se congelan en pausa). Mientras dura no ataca ni recibe golpes. */
  const RECUPERACION = { arrodillado: 1.5, total: 2.0 };                        // s: 0–1,5 de rodillas · 1,5–2,0 vuelve a la guardia
  const ALTO_REF_ENEMIGO = 1300;         // alto (px del PNG 1122×1402) que equivale a ALTO_PERSONAJE
  const MAX_ATACANTES = 2;               // cuántos enemigos pueden encarar a la vez
  const PAUSA_ENTRE_ATAQUES = [0.9, 1.7]; // s (mín, máx) que espera un enemigo después de atacar (subirlo = más fácil)

  /* ---------------- Selección guardada ---------------- */
  const sel = R.leerSeleccion();
  // v40: el nombre del jugador tiene como máximo 10 caracteres visibles (también si quedó guardado uno más largo de antes)
  if (sel && window.Ranking) sel.playerName = window.Ranking.limitarNombre(sel.playerName) || sel.playerName;
  // v27: al volver al selector desde el juego NO se repite la intro (se muestra una vez por arranque)
  const volverAlSelector = metodo => { try { sessionStorage.setItem('bb.volverAlSelector', '1'); } catch (e) {} location[metodo]('index.html'); };
  if (!sel || !sel.playerName) { volverAlSelector('replace'); return; }
  // v57 — el referente tiene que pertenecer al club del jugador. Si no, se vuelve al selector:
  // nunca se arranca con un personaje de respaldo. Se valida con el id GUARDADO (no con el reemplazo de un retirado).
  { let club = 'river', guardado = null;
    try { club = localStorage.getItem('barra14.barra') || 'river'; guardado = JSON.parse(localStorage.getItem('referenteSeleccionado') || localStorage.getItem('personajeSeleccionado') || 'null'); } catch (e) {}
    if (!guardado || guardado.id !== sel.id || !R.referentePermitido(club, sel.id)) {
      console.warn(`[Referente] ${sel.id} no está disponible para ${club}: se vuelve al selector`);
      volverAlSelector('replace'); return;
    } }
  // v102 — referente elegido pero SIN animaciones (Chacarita: Muchinga, Chuky, Pajarito): no se arranca con poses de otro.
  if (R.referenteJugable && !R.referenteJugable(sel.id)) { console.warn(`[Referente] ${sel.id} todavía no tiene animaciones: se vuelve al selector`); volverAlSelector('replace'); return; }

  const cv = document.getElementById('juego'), g = cv.getContext('2d');
  cv.width = MUNDO.w; cv.height = MUNDO.h;

  /* ---------------- Carga de imágenes ---------------- */
  /* v45 — REGISTRO COMPARTIDO DE RECURSOS (antes: un `await cargar()` tras otro, de TODA la campaña, antes del selector).
     · Cada archivo se pide UNA vez (la misma promesa para todos los que lo piden: sin descargas ni decodificaciones dobles).
     · Cola con prioridad: 'alta' = lo que hace falta YA (nivel elegido) · 'baja' = precarga discreta del nivel siguiente.
     · Concurrencia limitada (no cientos de pedidos a la vez). Se decodifica antes de usar (sin tirones al dibujar por primera vez).
     · Tiempo máximo por archivo y un reintento; si igual falla, se informa (nunca espera para siempre). */
  /* v45 — Copias livianas: en la versión web los sprites pueden venir achicados (js/escala_arte.js). Todas las coordenadas
     (ref, pie, ancla, cajas) siguen en píxeles del ORIGINAL: anW/anH devuelven el tamaño original equivalente. Sin ese
     archivo (versión local) la escala es 1 y nada cambia. */
  const EA = window.ESCALA_ARTE || null;
  const escalaArte = src => EA && EA.carpetas.some(c => src.startsWith(c)) ? EA.k : 1;
  const SUFIJO_ARTE = EA && EA.version ? `?v=${EA.version}` : '';   // versión web: las copias livianas no se confunden con imágenes viejas en caché
  const anW = im => im.naturalWidth / (im._k || 1), anH = im => im.naturalHeight / (im._k || 1);
  const CARGA = { concurrencia: 6, concurrenciaBaja: 2, tiempoMax: 25000, reintentos: 1 };
  const registro = new Map(), colaAlta = [], colaBaja = [];
  let activos = 0, cargaStats = { pedidos: 0, listos: 0, errores: 0, bajas: 0 };
  function pedir(src, prioridad = 'alta') {
    let r = registro.get(src);
    if (r) {
      if (prioridad === 'alta' && r.prioridad === 'baja' && r.estado === 'cola') {   // ahora hace falta YA: pasa adelante
        const i = colaBaja.indexOf(r); if (i >= 0) colaBaja.splice(i, 1); r.prioridad = 'alta'; colaAlta.push(r); bombear();
      }
      return r.promesa;
    }
    r = { src, prioridad, estado: 'cola', img: null, intentos: 0 };
    r.promesa = new Promise(res => { r.resolver = res; });
    registro.set(src, r); cargaStats.pedidos++;
    (prioridad === 'alta' ? colaAlta : colaBaja).push(r); bombear();
    return r.promesa;
  }
  function bombear() {
    while (activos < CARGA.concurrencia && colaAlta.length) iniciar(colaAlta.shift());
    while (!colaAlta.length && activos < CARGA.concurrenciaBaja && colaBaja.length) iniciar(colaBaja.shift());
  }
  function iniciar(r) {
    activos++; r.estado = 'bajando'; const im = new Image(); im._k = escalaArte(r.src); let fin = false;
    const terminar = (ok, motivo) => {
      if (fin) return; fin = true; clearTimeout(reloj); activos--;
      if (ok) { r.estado = 'listo'; r.img = im; cargaStats.listos++; r.resolver(im); }
      else if (r.intentos++ < CARGA.reintentos) { r.estado = 'cola'; (r.prioridad === 'alta' ? colaAlta : colaBaja).unshift(r); }
      else { r.estado = 'error'; cargaStats.errores++; console.warn('[Arte] No cargó', r.src, `(${motivo})`); r.resolver(null); }
      bombear();
    };
    const reloj = setTimeout(() => terminar(false, 'tiempo agotado'), CARGA.tiempoMax);
    im.onload = () => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(() => terminar(true));
    im.onerror = () => terminar(false, 'error de red o archivo');
    const AT = window.ATLAS_ARTE && window.ATLAS_ARTE[r.src];   // v55 web: el cuadro viene dentro de un atlas → se recorta y se arma la imagen
    if (AT) { recortarAtlas(AT).then(url => { im.src = url; }, () => terminar(false, 'atlas')); return; }
    im.src = r.src + SUFIJO_ARTE;
  }
  const atlasCargados = new Map();
  function recortarAtlas([src, x, y, w, h, dx, dy, W, H]) {
    if (!atlasCargados.has(src)) atlasCargados.set(src, new Promise((ok, mal) => { const a = new Image(); a.onload = () => ok(a); a.onerror = mal; a.src = src + SUFIJO_ARTE; }));
    return atlasCargados.get(src).then(a => new Promise((ok, mal) => {
      const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d').drawImage(a, x, y, w, h, dx, dy, w, h);
      c.toBlob(b => b ? ok(URL.createObjectURL(b)) : mal(), 'image/png');
    }));
  }
  // Se elige otro nivel: la precarga opcional que todavía no arrancó se descarta (no compite con lo que hace falta ahora).
  function relegarPrecarga() {
    for (const r of colaBaja) { registro.delete(r.src); r.estado = 'cancelado'; r.resolver(null); cargaStats.bajas++; }
    colaBaja.length = 0;
  }
  // Lo que estaba en cola con prioridad alta pero ya no hace falta (otro nivel elegido, o se volvió al menú) pasa a baja.
  function relegarAlta(salvo = new Set()) {
    for (let i = colaAlta.length - 1; i >= 0; i--) { const r = colaAlta[i]; if (!salvo.has(r.src)) { colaAlta.splice(i, 1); r.prioridad = 'baja'; colaBaja.unshift(r); } }
  }
  const imgDe = src => { const r = registro.get(src); return r && r.estado === 'listo' ? r.img : null; };
  const listo = src => { const r = registro.get(src); return !!r && r.estado === 'listo'; };
  const cargar = src => pedir(src, 'alta');

  // Recorta el contenido real de una placa para apoyar los pies en el piso.
  function medir(img) {
    const pre = (window.CAJAS_ARTE || {})[(img.getAttribute('src') || '').split('?')[0]]; if (pre) return pre;
    const w = anW(img), h = anH(img), k = 0.25;   // v45: medido en px del ORIGINAL aunque la copia web venga achicada
    const c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k);
    const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, c.width, c.height);
    let d;
    try { d = x.getImageData(0, 0, c.width, c.height).data; } catch (e) { return { x0: 0, y0: 0, x1: w, y1: h }; } // archivo local sin permiso de lectura
    let x0 = c.width, y0 = c.height, x1 = 0, y1 = 0;
    for (let yy = 0; yy < c.height; yy++) for (let xx = 0; xx < c.width; xx++) {
      if (d[(yy * c.width + xx) * 4 + 3] > 60) { if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy; }
    }
    return { x0: x0 / k, y0: y0 / k, x1: (x1 + 1) / k, y1: (y1 + 1) / k };
  }

  // Silueta provisoria de enemigo (solo si faltara el PNG de un hincha).
  function silueta(img, caja) {
    const k = 0.35, c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    const x = c.getContext('2d'); x.drawImage(img, 0, 0, c.width, c.height);
    x.globalCompositeOperation = 'source-in'; x.fillStyle = '#123a8c'; x.fillRect(0, 0, c.width, c.height);
    const top = caja.y0 * k, alto = (caja.y1 - caja.y0) * k;
    x.globalCompositeOperation = 'source-atop'; x.fillStyle = '#f2c230'; x.fillRect(0, top + alto * 0.33, c.width, alto * 0.08);
    x.globalCompositeOperation = 'source-over';
    return { img: c, caja: { x0: caja.x0 * k, y0: caja.y0 * k, x1: caja.x1 * k, y1: caja.y1 * k }, mira: 1 };
  }

  /* ---------------- Nivel actual: piso y escala ---------------- */
  let NIV = null, PISO = null, ESCALA = null;
  const limitar = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  function usarNivel(n) {
    NIV = N.pantalla(n);
    const p = NIV.piso, par = v => Array.isArray(v) ? v : [v, v];
    PISO = { yMin: p.yMin, yMax: p.yMax, xMin: par(p.xMin), xMax: par(p.xMax) };
    ESCALA = { yLejos: p.yMin, yCerca: p.yMax, sLejos: NIV.escala[0], sCerca: NIV.escala[1] };
    // v68: si el fondo tiene perfil de perspectiva (js/perspectiva.js), el tamaño sale de ahí (acotado y continuo)
    // v150: cada escenario trae su propia calibración humana (NIV.persp, js/niveles.js → CALIBRACION); si no, el perfil viejo por archivo
    PERSP = NIV.persp && window.Perspectiva ? Perspectiva.validar(NIV.persp) : window.Perspectiva ? Perspectiva.perfilDe(NIV.escenario) : null;
  }
  let PERSP = null;
  const escalaEn = y => PERSP ? Perspectiva.escalaEn(y, PERSP, ALTO_PERSONAJE)
    : Math.max(0.3, ESCALA.sLejos + (y - ESCALA.yLejos) / (ESCALA.yCerca - ESCALA.yLejos) * (ESCALA.sCerca - ESCALA.sLejos));
  // v68: tolerancia de profundidad para golpes/agarres. En los planos lejanos de una escena en perspectiva (escala < 0,8) unos
  // pocos px de Y son mucha distancia real: la tolerancia se achica en la misma proporción. Con escala ≥ 0,8 queda igual que antes.
  // v150: con la escala humana nueva los cuerpos son más chicos, pero la tolerancia de profundidad (golpes, agarres, amenaza) se
  // mide con la escala de juego de siempre del nivel: así no cambia la dificultad (solo cambia el dibujo y el alcance en X).
  const escalaJuego = y => Math.max(0.3, ESCALA.sLejos + (y - ESCALA.yLejos) / (ESCALA.yCerca - ESCALA.yLejos) * (ESCALA.sCerca - ESCALA.sLejos));
  const factorProf = y => Math.min(1, escalaJuego(y) / 0.8);
  // bordes izquierdo/derecho del piso a esa profundidad (la escalera se angosta hacia arriba)
  const tPiso = y => limitar((y - PISO.yMin) / (PISO.yMax - PISO.yMin), 0, 1);
  const xMinEn = y => lerp(PISO.xMin[0], PISO.xMin[1], tPiso(y));
  const xMaxEn = y => lerp(PISO.xMax[0], PISO.xMax[1], tPiso(y));
  function encerrar(ent) { ent.y = limitar(ent.y, PISO.yMin, PISO.yMax); ent.x = limitar(ent.x, xMinEn(ent.y), xMaxEn(ent.y)); }
  const adentroDelPiso = ent => ent.y >= PISO.yMin && ent.y <= PISO.yMax && ent.x >= xMinEn(ent.y) && ent.x <= xMaxEn(ent.y);

  /* ---------------- Estado de la partida ---------------- */
  // estado: 'menu' · 'intro' · 'jugando' · 'conteo' (v39: bonus de vida) · 'superado' · 'perdido' · 'final' (prueba) · 'ranking' (v40: pantalla 11)
  let jugador, enemigos = [], cola = [], estado = 'menu', estadoT = 0, nivel = 1, fondos = {}, arteJugador,
      siluetas = [], sprites = {}, animEnemigos = {}, tiempo = 0, objetivoHUD = null, efectos = [], oleada = 0, totalRivales = 0;
  const teclas = new Set();
  let pausado = false, avisoT = 0;                // pausa del jugador (tecla P) · cartelito de volumen de música
  /* v35 — PODER (tecla L). Reglas en js/poder.js. La carga vive en la PARTIDA (no en el nivel):
     poderCarga = derrotas contadas (0…7, entero). poderCargaInicioNivel = la que tenía al empezar el nivel actual
     (para reintentar un nivel perdido sin quedarse con lo cargado en el intento fallido). */
  const PD = window.Poder;
  let poderCarga = 0, poderCargaInicioNivel = 0, poderActivo = null;
  const poderListo = () => poderCarga >= PD.CARGA_TOTAL;
  const poderDeshabilitado = () => { const d = sel && (window.SPRITES_REFERENTES || {})[sel.id]; return !!(d && d.poderDeshabilitado); };   // v94: arte pendiente
  /* v39 — PUNTAJE (valores en js/puntaje.js). Vive en la PARTIDA: se acumula entre niveles y al reintentar;
     una partida nueva arranca en 0. modoPartida: 'campaña' si arrancó en el nivel 1 y fue avanzando,
     'prueba' si se entró directo a otro nivel (no cuenta para el ranking). */
  const PT = window.Puntaje.PUNTOS;
  let puntaje = 0, modoPartida = 'campaña', nivelInicioPartida = 1;
  let ptsNivel = null;                                  // desglose del nivel actual (para el resumen)
  const nuevoDesglose = () => ({ danio: 0, bajas: 0, penal: 0, bonus: 0 });
  let conteo = null;                                     // secuencia de fin de nivel (bonus de vida)
  /* v40 — RANKING: una partida tiene id único. Cuenta como campaña completa solo si arrancó en el 1 y ganó los 10 niveles
     (se van anotando al terminar cada conteo). El resultado se registra UNA vez, al terminar el bonus del nivel 10. */
  let partidaId = null, nivelesGanados = new Set(), resultadoRanking = null, fondo11 = null;
  /* v44 — DAMAJUANA: dama = objeto en el piso ({ x, y, t }) o null · damaArmada = hay una oportunidad disponible
     (se gasta al aparecer; vuelve cuando la vida supera el umbral) · imgDama = imagen del objeto. */
  let dama = null, damaArmada = true, imgDama = null, cajaDama = null, damasCreadas = 0;
  const avisoMusica = () => { avisoT = 1.6; };

  function nuevoJugador() {
    const luch = C.crearJugador(sel);    // vida completa al empezar cada nivel (regla existente: cada pantalla arranca con la vida base)
    return { tipo: 'jugador', luch, x: NIV.inicio.x, y: NIV.inicio.y, face: 1, st: 'quieto', t: 0, inv: 0, golpeHecho: false,
             tecnica: null, agarrado: null, combo: null, empujando: null, empujeT: 0, recorrido: 0,
             jPendiente: null, giroPendiente: null, ataqueId: 0,     // defensa: piña y giro en espera de la tolerancia
             // v43: combo por botón (A = J piñas · B = K patadas). seq = próximo paso (0, 1, 2) · finAtaque = cuándo terminó su último golpe
             seq: { A: 0, B: 0 }, finAtaque: { A: -Infinity, B: -Infinity }, buffer: null, variante: null, extra: 1, botonAtaque: null, golpes: [] };
  }

  // Crea un enemigo con las estadísticas del NIVEL (siempre desde la base: no acumula al reintentar).
  /* v194 — SIN BLOQUEOS INDEFINIDOS. Con el turno de ataque (ficha) y sin estar preparando:
     · sin progreso real (quiere moverse > 8 px pero avanza < 25 % de su paso, medido después de los límites) durante 0,8 s → cambia de lado;
     · 4 s con el turno, parado o trabado, sin poder atacar → devuelve el turno (otro lo intenta) y vuelve a decidir. Mientras camina de verdad hacia su puesto, ese plazo no corre.
     También deja el motivo para el diagnóstico (BB_DEBUG.diagIA = true). */
  function vigilarTurno(e, p, s, dt, movido, dd, paso) {
    if (!e.ficha || e.st === 'preparar') { e.sinProg = 0; e.fichaT = 0; return; }
    if (dd > 8 && movido < paso * 0.25) e.sinProg = (e.sinProg || 0) + dt; else e.sinProg = Math.max(0, (e.sinProg || 0) - dt);
    // el plazo del turno corre solo mientras NO está caminando de verdad hacia su puesto (llegó y no puede pegar, o está trabado)
    if (movido < paso * 0.5) e.fichaT = (e.fichaT || 0) + dt;
    if (e.sinProg > 0.8) {
      e.ladoFijo = (e.x >= p.x ? -1 : 1); e.ladoFijoHasta = tiempo + 2; e.sinProg = 0; e.cambiosLado = (e.cambiosLado || 0) + 1;
      if (DIAG.ia) console.info(`[IA] ${e.luch.nombreHUD}: sin progreso con el turno → cambia de lado`);
    }
    if (e.fichaT > 4) {
      e.ficha = false; e.fichaT = 0; e.sinProg = 0; e.ladoFijo = 0; e.enfriar = Math.max(e.enfriar, 0.6); e.turnosDevueltos = (e.turnosDevueltos || 0) + 1;
      if (DIAG.ia) console.info(`[IA] ${e.luch.nombreHUD}: 4 s con el turno sin poder atacar → lo devuelve`);
    }
  }
  const registroAtaques = [];
  const DIAG = { ia: /[?&]debug=ia/.test(location.search) };   // v194: diagnóstico de IA (apagado; BB_DEBUG.diagIA = true o ?debug=ia)
  function motivoIA(e, p) {
    const s = escalaEn(e.y), tol = PROF_GOLPE * factorProf(e.y), alc = ALCANCE.patada * s, dx = Math.abs(p.x - e.x), dy = Math.abs(p.y - e.y);
    if (e.st === 'preparar') return 'preparando';
    if (!e.ficha) return e.enfriar > 0 ? 'enfriando' : 'sin turno (cupo lleno)';
    if (e.enfriar > 0) return 'enfriando';
    if (dx >= alc) return 'fuera de alcance';
    if (dy >= tol) return 'desalineado en profundidad';
    return 'listo';
  }
  const ALCANCE_CANCELA = 420;           // v193: px (escala 1). Más allá, el aviso se cancela (la patada llega a 185)
  /* v194 — MARCA DE TIEMPO POR INTENTO. Si un aviso se canceló (el jugador se alejó) y el mismo rival vuelve a avisar enseguida
     (< 1,5 s), es el MISMO intento: el plazo sigue contando desde el primer «!», pausa incluida (con al menos 0,3 s de aviso visible), en vez de
     empezar otros 2 s. Un golpe recibido sí corta el intento (después es un ataque nuevo). */
  function inicioAviso(e) {
    if (e.intento && tiempo - e.intento.cancelado < 1.5) { const t = Math.min(PREP_MAX - 0.3, e.intento.acumulado + (tiempo - e.intento.cancelado)); e.intento = null; return Math.max(0, t); }
    e.intento = null; return 0;
  }
  function cancelarPreparacion(e, motivo) {
    e.intento = { acumulado: (e.t || 0), cancelado: tiempo };
    e.st = 'acercarse'; e.t = 0; e.golpe = null; e.var = null; e.ficha = false; e.enfriar = Math.max(e.enfriar, 0.35);
    e.prepCanceladas = (e.prepCanceladas || 0) + 1; console.info(`[Aviso] ${e.luch.nombreHUD}: preparación cancelada (${motivo})`);
  }
  const esBarraComun = def => (def.tipo || 'comun') === 'comun' && !def.jefe && !def.especial;
  function crearEnemigo(def, entrada, i, entraEn) {
    const st = N.statsEnemigo(def.tipo || 'comun', nivel);
    const luch = C.crearEnemigo(def, st);
    return {
      tipo: 'enemigo', luch, x: entrada.x, y: entrada.y, face: entrada.x > MUNDO.w / 2 ? -1 : 1,
      st: 'esperaEntrar', t: 0, entraEn, carril: [-34, 30, -8, 16, -20, 40][i % 6],
      enfriar: 1 + Math.random(), golpe: null, golpeHecho: false, ficha: false, recorrido: 0,
      // v71: en los NIVELES 1 a 4 (número local del recorrido) los BARRAS comunes avisan su golpe (¡!) más tiempo antes de largarlo (v195: 0,6 s extra → 1,0 s en total):
      // preparación = la original + EXTRA_AVISO_N1_4. Se calcula al crear el enemigo desde la base (no se acumula al reintentar).
      // No aplica a especiales, policías ni jefes/referentes, ni del nivel 5 en adelante. El daño solo entra al terminar la preparación.
      tiempos: { preparacion: (st.preparacion || TIEMPO.preparacion) + (nivel <= 4 && !def.especial && !def.jefe ? EXTRA_AVISO_N1_4 : 0),
                 recuperacion: st.recuperacion || TIEMPO.recuperacion },
      jefe: !!def.jefe, especial: !!def.especial, agarrable: st.agarrable, dolor: st.dolor,
      // v193: velocidad de caminata propia (px/s a escala 1). Barras comunes (tipo 'comun', no jefes ni especiales) × 0,85;
      // referentes/jefes, policías y especiales sin cambio. velRefPaso = la velocidad con la que se diseñó su cadencia (la anterior).
      velCaminar: VEL_ENEMIGO * (def.jefe ? 0.8 : 1) * (esBarraComun(def) ? FACTOR_CAMINATA_BARRAS : 1), velRefPaso: VEL_ENEMIGO * (def.jefe ? 0.8 : 1),
      barraComun: esBarraComun(def),
      barrasExtra: (st.barras || 1) - 1, fase: 1,   // v29: El Abuelo = 1 barra extra (una sola recuperación)
      iaPolicia: def.tipo === 'policia', escudazosSeguidos: 0, golpesSinAccion: 0, carga: 0,   // v32: IA propia del policía · v69: los cuatro + carga del especial
      soloGolpe: def.soloGolpe || null, franja: def.alcance || null, distancia: def.distancia || 0,   // v34: GORDO ESCOBA (solo escobazo, pega con la paja)
      // defensa (js/defensa.js): se decide en el nivel actual, no se acumula al reintentar
      puedeCubrirse: D.enemigoPuedeCubrirse(def.id, nivel), jefeDefensa: D.esJefeDefensa(def.id),
      defPendiente: null, enfriarDef: 0, vistoAtaque: 0, impactos: [], cadenaEnfriar: 0, salidaCadena: false
    };
  }

  // Prepara el nivel `n` desde cero: jugador nuevo, rivales sorteados, oleadas.
  // partida: 'nueva' (menú, campaña de nuevo, entrada directa) · 'sigue' (pasar de nivel) · 'reintento' (después de perder)
  /* v45 — CARGA POR ETAPAS. Al elegir un nivel se sortean sus camadas y se pide SOLO lo que puede aparecer en esa partida:
     fondo del nivel, el protagonista (todas sus poses: golpes, combos, poder, damajuana), cada rival sorteado (con todos sus
     cuadros, incluidas caídas, bloqueos y la segunda vida/fase), especial / guardaespaldas / jefe, damajuana y, en el 10,
     el fondo de la pantalla 11. Mientras baja: pantalla de carga con «recursos listos / total». */
  let carga = null, cargaId = 0, minis = {}, fondoMenu = null, logoTitulo = null;
  /* v64 — CAMPAÑA DE RIVER (js/campana.js). Con River, el «menú» es el GALPÓN DE TROFEOS: todo lo que antes volvía al menú
     (Esc, pausa → Esc, perder → Esc, fin de bloque) vuelve al galpón. Los demás clubes siguen con su selector de escenarios. */
  const CAMP = (window.Campana && window.Campana.BLOQUES.length > 0) ? window.Campana : null;   // v109 · v197: campaña con los rivales de SU categoría (Primera 8 · Ascenso 3)
  const galpon = { piezas: {}, hover: null, foco: null, fondo: null, fondos: [], capas: {}, mate: null, ocluye: null, ref: null, sala: 0, mov: null, transicion: false, aviso: null, avisoT: 0, faltas: [] };   // v108: dos salas   // v52: logo del título del menú
  function armarCola(n) {
    const P = N.pantalla(n);
    const c = P.oleadas.length ? N.armarCamadas(n) : [];
    if (P.policias) c.push(P.policias.map(id => N.ESPECIALES[id]));   // v69: nivel 5 = los cuatro policías, una sola tanda (la unidad guía+perro cuenta 1)
    if (P.especialAlFinal) c.push([N.ESPECIALES[P.especialAlFinal]]);
    if (P.guardaespaldas) c.push([N.ESPECIALES[P.guardaespaldas]]);   // v30: el policía, solo; el Abuelo recién en la oleada siguiente
    if (P.jefe) c.push([N.ESPECIALES[P.jefe]]);
    return c;
  }
  const defFramesJugador = (window.SPRITES_REFERENTES || {})[sel.id];
  function archivosJugador() {
    if (!defFramesJugador) return [R.referentePorId(sel.id).image];
    const out = []; for (const f of Object.values(defFramesJugador.frames)) { out.push(f.src); if (f.espejo) out.push(f.espejo); } return out;
  }
  const defEnemigo = id => N.ESPECIALES[id] || N.POOL_COMUNES.find(d => d.id === id);
  function archivosEnemigo(id) {
    const d = defEnemigo(id), out = [];
    if (d && d.sprite) { out.push(d.sprite); if (d.espejo) out.push(d.espejo); }
    const A = (window.SPRITES_ENEMIGOS || {})[id];
    if (A) for (const m of Object.values(A.frames)) { out.push(m.src); if (m.espejo) out.push(m.espejo); }
    return out;
  }
  function manifiestoNivel(n, ids) {
    const P = N.pantalla(n), set = new Set([P.escenario, ...(ITEM ? [ITEM.img] : []), ...archivosJugador()]);
    for (const id of ids) archivosEnemigo(id).forEach(f => set.add(f));
    if (P.espectador) { const d = N.ESPECIALES.el_abuelo; set.add(d.sprite); }   // nivel 9: el Abuelo mira desde la tribuna
    if (n === N.TOTAL) set.add(window.Ranking.FONDO);                             // pantalla 11 al ganar el 10
    return [...set];
  }
  const idsDeCola = c => [...new Set(c.flat().map(d => d.id))];
  // Con los archivos ya en el registro, arma las estructuras que usa el dibujo (una vez por recurso; se reutilizan entre niveles).
  function armarRecursos(n, ids) {
    const P = N.pantalla(n); fondos[n] = imgDe(P.escenario);
    imgDama = imgDama || (ITEM ? imgDe(ITEM.img) : null);
    if (n === N.TOTAL) fondo11 = fondo11 || imgDe(window.Ranking.FONDO);
    if (!arteJugador || arteJugador.tipo !== 'frames') {
      if (defFramesJugador) {
        const imgs = {}, imgsEspejo = {};
        for (const [id, f] of Object.entries(defFramesJugador.frames)) { imgs[id] = imgDe(f.src); if (f.espejo) imgsEspejo[id] = imgDe(f.espejo); }
        if (imgs[defFramesJugador.anim.quieto[0]]) arteJugador = { tipo: 'frames', def: defFramesJugador, imgs, imgsEspejo };
      } else { const im = imgDe(R.referentePorId(sel.id).image); if (im) arteJugador = { img: im, caja: medir(im) }; }
    }
    const lista = P.espectador ? [...ids, 'el_abuelo'] : ids;
    for (const id of lista) {
      const d = defEnemigo(id);
      if (d && d.sprite && !sprites[id]) { const im = imgDe(d.sprite); if (im) sprites[id] = { img: im, caja: medir(im), altoRef: ALTO_REF_ENEMIGO, mira: d.mira || 1, imgEspejo: d.espejo ? imgDe(d.espejo) : null }; }
      const D = (window.SPRITES_ENEMIGOS || {})[id];
      if (D && !animEnemigos[id]) {
        const imgs = {}, imgsEspejo = {};
        for (const [f, m] of Object.entries(D.frames)) { imgs[f] = imgDe(m.src); if (m.espejo) imgsEspejo[f] = imgDe(m.espejo); }
        if (imgs[D.anim.quieto]) animEnemigos[id] = { def: D, imgs, imgsEspejo };
      }
    }
    if (sprites.el_abuelo && !abueloImg) { abueloImg = sprites.el_abuelo.img; abueloCaja = sprites.el_abuelo.caja; }
  }
  function prepararNivel(n, partida = 'nueva') {
    cortarPoder();
    const c = armarCola(n), ids = idsDeCola(c), archivos = manifiestoNivel(n, ids);
    const faltan = archivos.filter(f => !listo(f));
    if (!faltan.length) { armarRecursos(n, ids); arrancarNivel(n, partida, c); return; }
    relegarAlta(new Set(archivos)); relegarPrecarga();             // lo pedido para otro nivel y lo opcional no compiten con este
    const id = ++cargaId;
    carga = { id, n, partida, total: archivos.length, hechos: archivos.length - faltan.length, fallidos: [], t0: performance.now() };
    estado = 'cargando'; estadoT = 0; pausado = false; soltarTodo();
    console.info(`[Carga] nivel ${n}: ${faltan.length} de ${archivos.length} archivos por bajar (rivales: ${ids.join(', ') || 'ninguno'})`);
    Promise.all(faltan.map(f => pedir(f, 'alta').then(im => { if (carga && carga.id === id) { carga.hechos++; if (!im) carga.fallidos.push(f); } }))).then(() => {
      if (!carga || carga.id !== id || estado !== 'cargando') return;   // el jugador volvió al menú mientras cargaba
      if (carga.fallidos.length) { console.warn(`[Carga] nivel ${n}: fallaron ${carga.fallidos.length} archivos`, carga.fallidos); return; }   // queda la pantalla de error
      console.info(`[Carga] nivel ${n} listo en ${((performance.now() - carga.t0) / 1000).toFixed(2)} s`);
      carga = null; armarRecursos(n, ids); arrancarNivel(n, partida, c);
    });
  }
  function reintentarCarga() {
    if (!carga || !carga.fallidos.length) return;
    for (const f of carga.fallidos) registro.delete(f);           // se vuelven a pedir desde cero
    const { n, partida } = carga; carga = null; prepararNivel(n, partida);
  }
  // Precarga discreta del nivel siguiente: fondo + rivales fijos de ese nivel + especial / jefe. Prioridad baja, 2 a la vez.
  function precargarSiguiente(n) {
    if (n > N.TOTAL) return;
    const P = N.pantalla(n), ids = [...(P.animados || [])];
    for (const k of ['especialAlFinal', 'guardaespaldas', 'jefe']) if (P[k]) ids.push(P[k]);
    if (P.policias) ids.push(...P.policias);
    const archivos = manifiestoNivel(n, ids).filter(f => !registro.has(f));
    archivos.forEach(f => pedir(f, 'baja'));
    if (archivos.length) console.info(`[Carga] precarga discreta del nivel ${n}: ${archivos.length} archivos (prioridad baja)`);
  }
  function arrancarNivel(n, partida, colaNueva) {
    if (partida === 'nueva') {                         // v39: partida nueva = puntaje 0 (campaña si empieza en el 1)
      puntaje = 0; nivelInicioPartida = n; modoPartida = n === 1 ? 'campaña' : 'prueba';
      partidaId = window.Ranking.nuevoId(); nivelesGanados = new Set(); resultadoRanking = null;
    }
    ptsNivel = nuevoDesglose(); conteo = null;
    dama = null; damaArmada = true;                     // v44: nivel nuevo, reintento o partida nueva: sin objeto y con la oportunidad lista
    if (partida === 'campana') {                      // v64: entrada desde el galpón: puntaje y partida de la campaña guardados
      const E = CAMP.estado; puntaje = E.puntaje || 0; nivelInicioPartida = 1; modoPartida = 'campaña';
      partidaId = CAMP.asegurarPartida(() => window.Ranking.nuevoId()); nivelesGanados = new Set(); resultadoRanking = null;
    }
    if (partida === 'nueva') { poderCarga = 0; trucosPartida = false; }   // v72: partida nueva limpia = vuelve a poder entrar al ranking
    if (partida === 'campana') trucosPartida = CAMP.conTrucos;            // v72: la marca viaja con la campaña guardada
    else if (partida === 'reintento') poderCarga = poderCargaInicioNivel;
    poderCargaInicioNivel = poderCarga;
    nivel = n; usarNivel(n);
    jugador = nuevoJugador(); enemigos = []; objetivoHUD = null; efectos = []; oleada = 0;
    // v31: las camadas se arman completas acá (cantidad exacta, sin pares incompatibles) y quedan guardadas en la cola:
    // no se vuelven a sortear al dibujar. Mismo camino para campaña, entrada directa y reintento.
    cola = colaNueva;                                    // v45: sorteada en prepararNivel (sus recursos ya están cargados)
    totalRivales = cola.reduce((a, l) => a + l.length, 0);
    console.info(`[Nivel ${n}] ${NIV.nombre} · oleadas ${JSON.stringify(cola.map(l => l.map(d => d.id)))} · poder ${poderCarga}/${PD.CARGA_TOTAL} (${partida})`);
    siguienteOleada();
    estado = 'intro'; estadoT = 0; pausado = false; soltarTodo();
    // v149: en los niveles 9 y 10 suena la canción de la barra LOCAL de esa cancha (Niveles.activo.sede = el rival), si tiene una;
    // si no, el tema de siempre del nivel. Nunca depende de la barra ni del referente del jugador.
    const temaLocal = n >= 9 && N.activo && N.activo.sede ? 'local_' + N.activo.sede : null;
    if (window.Musica) Musica.tocar(temaLocal && Musica.TEMAS[temaLocal] ? temaLocal : n);   // tema desde el principio (entrar, pasar o reintentar)
    if (!videoLluvia) prepararMediosPoder();  // v45: la lluvia del poder (10 MB) recién cuando ya se puede jugar
    setTimeout(() => { if (estado === 'intro' || estado === 'jugando') precargarSiguiente(n + 1); }, 2500);
  }

  function siguienteOleada() {
    const lista = cola.shift(); if (!lista) return false;
    oleada++;
    lista.forEach((def, i) => {
      const ent = NIV.entradas[(i + oleada) % NIV.entradas.length];
      const e = crearEnemigo(def, { x: ent.x + (i % 2 ? 40 : 0), y: ent.y + (i % 3) * 18 }, i, i * 0.8);
      enemigos.push(e);
      console.info(`[Nivel ${nivel}] ${def.nombre}: vida ${e.luch.vidaMax} · piña ${e.luch.golpes.pina} · patada ${e.luch.golpes.patada}`);
    });
    if (lista.some(d => d.jefe || d.especial)) objetivoHUD = enemigos[enemigos.length - 1];
    return true;
  }

  const derrotado = e => e.st === 'ko' || e.st === 'fuera';
  const tFuera = e => e.jefe ? TIEMPO.fuera + 1.2 : TIEMPO.fuera;   // v87: el jefe queda tendido un poco más (se ve su pose final antes del cierre del nivel)
  const rivalesRestantes = () => enemigos.filter(e => !derrotado(e)).length + cola.reduce((a, l) => a + l.length, 0);

  /* ---------------- Entrada ---------------- */
  function irAlNivel(n) { prepararNivel(n); }

  /* v72 — TRUCOS DE CREADOR (pruebas). Mantener CTRL + SHIFT (cualquier lado) y pulsar 3 veces la misma letra física:
       V V V = ganar el BLOQUE entero del rival actual (campaña: galpón con sus trapos; sin campaña: final de los 10 niveles)
       E E E = ganar SOLO el nivel actual (flujo normal de victoria: conteo → superado / cierre del bloque en el 10)
     Pulsaciones físicas distintas (se ignora e.repeat), máx. 2 s entre una y otra; se reinicia al soltar CTRL/SHIFT, otra tecla,
     perder el foco o cambiar de pantalla. V y E se interrumpen entre sí. Solo en un nivel en curso (estado 'jugando', sin pausa,
     jugador vivo). La partida queda marcada: no entra al ranking. Sin menús ni botones. */
  const TRUCO = { letra: null, n: 0, t: 0, estado: null, enCurso: false };
  const reiniciarTruco = () => { TRUCO.letra = null; TRUCO.n = 0; TRUCO.t = 0; };
  const trucoPermitido = () => estado === 'jugando' && !pausado && !pausaConsola && jugador && jugador.st !== 'ko' && jugador.luch.vida > 0 && !carga && !TRUCO.enCurso;
  function limpiarNivelPorTruco() {
    cortarPoder(); cola.length = 0;                                   // sin oleadas ni refuerzos pendientes
    for (const e of enemigos) { e.st = 'fuera'; e.golpe = null; e.ficha = false; e.defPendiente = null; e.barrasExtra = 0; e.luch.vida = 0; }
    enemigos = []; objetivoHUD = null; efectos = []; dama = null;
    const p = jugador; if (p.agarrado || p.st === 'agarre') soltar(); soltarTodo();
    p.st = 'quieto'; p.t = 0; p.tecnica = null; p.jPendiente = null; p.giroPendiente = null; p.buffer = null; p.inv = 0;
  }
  function marcarTrucos() { trucosPartida = true; if (CAMP) CAMP.marcarTrucos(); }
  function trucoGanarNivel() {
    marcarTrucos(); limpiarNivelPorTruco();
    console.info(`[Truco] CTRL+SHIFT+EEE: ${N.tituloNivel(nivel)} ganado (flujo normal de victoria)`);
    empezarConteo();                                                  // UNA victoria: conteo → superado (o cierre del bloque en el 10)
  }
  function trucoGanarBloque() {
    marcarTrucos(); limpiarNivelPorTruco();
    const enCampana = CAMP && CAMP.bloqueActual() && N.activo.set === CAMP.bloqueActual().set;
    console.info(`[Truco] CTRL+SHIFT+VVV: bloque completo${enCampana ? ' (' + CAMP.bloqueActual().id + ')' : ''} desde ${N.tituloNivel(nivel)}`);
    for (const P of N.PANTALLAS) nivelesGanados.add(P.n);
    nivel = N.TOTAL; conteo = null;
    if (enCampana) { terminarNivelCampana(); return; }                // mismo cierre real: trapos del rival, galpón, CONTINUAR → bloque siguiente
    guardarResultado(false); registrarEnRanking('prueba'); estado = 'ranking'; estadoT = 0;   // sin campaña (otras barras): fin de los 10 niveles
  }
  /* v158 — CTRL + SHIFT + Y, Y, Y (antes T: CTRL+SHIFT+T es «reabrir pestaña» de Chrome): COMPLETAR TODA LA CAMPAÑA de la barra actual y llenar el galpón. Pulsaciones reales (sin e.repeat),
     máx. 1 s entre una y otra; se reinicia al soltar CTRL/SHIFT, con otra tecla, al cambiar de pantalla o perder el foco. Funciona en
     combate (se corta el nivel de forma controlada y se va al galpón), en el galpón (cualquier sala) y en las pantallas de nivel superado.
     No en campos de texto. Solo toca el progreso guardado de ESTA barra (su campaña), no estadísticas ni otras partidas. */
  const TRUCO_T = { n: 0, t: 0, enCurso: false };
  let avisoTruco = null;
  const reiniciarT = () => { TRUCO_T.n = 0; TRUCO_T.t = 0; };
  const enCampoTexto = e => { const el = e.target; return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName || '')); };
  const trucoTPermitido = () => !!CAMP && !carga && !TRUCO_T.enCurso && ['jugando', 'intro', 'superado', 'conteo', 'perdido', 'menu', 'final'].includes(estado) && !(estado === 'menu' && (galpon.mov || galpon.transicion));
  function trucoCompletarCampana() {
    marcarTrucos();
    const enCombate = estado !== 'menu';
    if (enCombate) { if (jugador) limpiarNivelPorTruco(); conteo = null; pausado = false; }
    const nuevos = CAMP.completarTodo(sel.id);
    console.info(`[Truco] CTRL+SHIFT+YYY: campaña de ${CAMP.CLUB} completa (${CAMP.vencidos().length} rivales de ${CAMP.CATEGORIA}, ${nuevos} nuevos) · trofeos: ${CAMP.trofeos().join(', ')}`);
    if (CAMP.terminada() && !CAMP.estado.registrado) { guardarResultado(true); registrarEnRanking('campaña'); CAMP.marcarRegistrado(); }   // con trucos: no entra al ranking
    const sala = estado === 'menu' ? galpon.sala : 0;
    if (CAMP.galpon) { cargarGalpon(); galpon.sala = sala; }
    galpon.aviso = null; estado = 'menu'; estadoT = 0; soltarTodo();
    if (enCombate && window.Musica) Musica.detener(false);
    avisoTruco = { texto: 'TRUCO ACTIVADO: CAMPAÑA Y GALPÓN COMPLETOS', t0: tiempo };
  }
  function dibujarAvisoTruco() {
    if (!avisoTruco) return; const t = tiempo - avisoTruco.t0; if (t > 2.6) { avisoTruco = null; return; }
    const a = Math.min(1, t / 0.15, (2.6 - t) / 0.4);
    g.save(); g.globalAlpha = a; g.font = 'bold 30px Verdana, sans-serif'; const w = g.measureText(avisoTruco.texto).width + 60;
    g.fillStyle = 'rgba(20,14,10,0.9)'; g.fillRect((MUNDO.w - w) / 2, 70, w, 60); g.strokeStyle = ID.dorado; g.lineWidth = 3; g.strokeRect((MUNDO.w - w) / 2, 70, w, 60); g.restore();
    g.save(); g.globalAlpha = a; texto(avisoTruco.texto, MUNDO.w / 2, 111, 30, ID.doradoClaro, 'center'); g.restore();
  }
  addEventListener('keydown', e => {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') return;
    if (e.code !== 'KeyY' || !(e.ctrlKey && e.shiftKey) || enCampoTexto(e)) { reiniciarT(); return; }
    e.preventDefault(); e.stopImmediatePropagation();                 // CTRL+SHIFT+Y no llega al juego ni al navegador
    if (e.repeat) return;                                             // mantener Y apretada no cuenta
    if (!trucoTPermitido()) { reiniciarT(); return; }
    const ahora = performance.now();
    if (TRUCO_T.n && ahora - TRUCO_T.t > 1000) TRUCO_T.n = 0;
    TRUCO_T.n++; TRUCO_T.t = ahora;
    if (TRUCO_T.n < 3) return;
    reiniciarT(); TRUCO_T.enCurso = true;                             // se consume antes de actuar: una sola ejecución
    try { trucoCompletarCampana(); } finally { setTimeout(() => { TRUCO_T.enCurso = false; }, 600); }
  }, true);
  addEventListener('keyup', e => { if (['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight'].includes(e.code)) reiniciarT(); }, true);
  addEventListener('blur', reiniciarT);
  addEventListener('keydown', e => {
    const fis = e.code;
    if (fis === 'ControlLeft' || fis === 'ControlRight' || fis === 'ShiftLeft' || fis === 'ShiftRight') return;   // los modificadores no cuentan ni cortan
    if (estado !== TRUCO.estado) { TRUCO.estado = estado; reiniciarTruco(); }
    if (!(e.ctrlKey && e.shiftKey) || (fis !== 'KeyV' && fis !== 'KeyE')) { reiniciarTruco(); return; }
    e.preventDefault(); e.stopImmediatePropagation();                 // la combinación no llega a los controles del juego ni al navegador
    if (!trucoPermitido()) { reiniciarTruco(); return; }
    if (e.repeat) return;                                             // mantener la letra apretada no cuenta
    const letra = fis === 'KeyV' ? 'V' : 'E', ahora = performance.now();
    if (TRUCO.letra !== letra || ahora - TRUCO.t > 2000) { TRUCO.letra = letra; TRUCO.n = 0; }
    TRUCO.n++; TRUCO.t = ahora;
    if (TRUCO.n < 3) return;
    reiniciarTruco(); TRUCO.enCurso = true;                           // se consume ANTES de actuar: una sola ejecución
    try { if (letra === 'V') trucoGanarBloque(); else trucoGanarNivel(); } finally { setTimeout(() => { TRUCO.enCurso = false; }, 400); }
  }, true);
  addEventListener('keyup', e => { if (['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight'].includes(e.code)) reiniciarTruco(); }, true);
  addEventListener('blur', reiniciarTruco);

  addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    // música (v25): en cualquier pantalla. M = silenciar/activar · − / + = volumen
    if (window.Musica && !e.repeat) {
      if (k === 'm') { Musica.alternarSilencio(); avisoMusica(); return; }
      if (k === '-' || k === '_') { Musica.cambiarVolumen(-0.1); avisoMusica(); return; }
      if (k === '+' || k === '=') { Musica.cambiarVolumen(+0.1); avisoMusica(); return; }
    }
    // pausa (v25): P durante el nivel. En pausa: P sigue, ESC vuelve al menú.
    if (pausado) {
      if (k === 'p' && !e.repeat) { pausado = false; if (window.Musica && estado !== 'conteo') Musica.reanudar(); }
      if (k === 'escape' && estado !== 'conteo') { pausado = false; soltarTodo(); estado = 'menu'; }   // v39: durante el conteo no se sale
      e.preventDefault(); return;
    }
    if (k === 'p' && !e.repeat && (estado === 'intro' || estado === 'jugando' || estado === 'conteo')) {
      pausado = true; soltarTodo(); if (window.Musica && estado !== 'conteo') Musica.pausar(); return;
    }
    if (estado === 'conteo') { e.preventDefault(); return; }          // v39: controles bloqueados mientras cuenta el bonus
    if (['w', 'a', 's', 'd', 'j', 'k', 'l', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
    if (estado === 'cargando') {                                     // v45: la carga no traba el teclado
      if (k === 'escape') { carga = null; estado = 'menu'; relegarAlta(); }   // lo que faltaba sigue de fondo, sin prioridad
      if (k === 'enter' && carga && carga.fallidos.length && carga.hechos >= carga.total) reintentarCarga();
      return;
    }
    if (estado === 'menu' && CAMP) {                                 // v64: galpón de trofeos
      if (k === 'tab') { e.preventDefault(); const L = botonesGalpon().map(x => x[0]); if (L.length) { const i = L.indexOf(galpon.foco); galpon.foco = L[(i + (e.shiftKey ? L.length - 1 : 1)) % L.length]; } return; }   // v109: foco de teclado
      if ((k === 'enter' || k === ' ') && !e.repeat && galpon.foco) { const f = galpon.foco; galpon.foco = null; accionGalpon(f); return; }
      if ((k === 'enter' || k === 'j' || k === ' ') && !e.repeat) continuarCampana();
      if (k === 'n' && !e.repeat) nuevaCampana();
      if ((k === 'arrowright' || k === 'd') && !e.repeat && CAMP.galpon) { galpon.foco = null; irASala(1); }   // v108: salas del galpón
      if ((k === 'arrowleft' || k === 'a') && !e.repeat && CAMP.galpon) { galpon.foco = null; irASala(0); }
      if (k === 'escape') volverAlSelector('assign');
      return;
    }
    if (estado === 'menu') {
      if (k === 'arrowleft' || k === 'a') { cambiarSet(-1); return; }   // v55: juego de escenarios (Boca y San Lorenzo)
      if (k === 'arrowright' || k === 'd') { cambiarSet(+1); return; }
      if (k === 'enter') irAlNivel(1);
      if (/^[0-9]$/.test(k)) irAlNivel(k === '0' ? 10 : +k);
      if (k === 'escape') volverAlSelector('assign');
      return;
    }
    if (estado === 'intro') { if (k === 'enter' && estadoT > 0.4) { estado = 'jugando'; estadoT = 0; } if (k === 'escape') { soltarTodo(); estado = 'menu'; } return; }
    if (estado === 'superado' && k === 'escape') { estado = 'menu'; return; }
    if (estado === 'superado') { if (k === 'enter') pasarDeNivel(); return; }
    if (estado === 'perdido') { if (k === 'enter') prepararNivel(nivel, 'reintento'); if (k === 'escape') estado = 'menu'; return; }
    if (estado === 'final') { if (k === 'enter' && !CAMP) prepararNivel(1, 'nueva'); if (k === 'escape' || (k === 'enter' && CAMP)) estado = 'menu'; return; }
    if (estado === 'ranking') { if (k === 'enter' && !CAMP) prepararNivel(1, 'nueva'); if (k === 'escape' || (k === 'enter' && CAMP)) estado = 'menu'; return; }   // v40: pantalla 11 · v64: en la campaña vuelve al galpón (no empieza otra)
    if (k === 'escape') { soltarTodo(); estado = 'menu'; return; }
    if (k === 'l') { if (!e.repeat) activarPoder(); return; }            // v35: una activación por pulsación (mantenerla no repite)
    // repetición automática: solo las direcciones vuelven a contar como apretadas (si se mantuvieron durante la pausa,
    // el jugador no queda trabado al seguir). Piña, patada y poder exigen una pulsación nueva.
    if (e.repeat) { if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) teclas.add(k); return; }
    teclas.add(k);
    if (k === 'j') pulsarPina();
    if (k === 'k') boton('B');
    const dir = ['a', 'arrowleft'].includes(k) ? -1 : ['d', 'arrowright'].includes(k) ? 1 : 0;
    if (dir) pulsarDireccion(dir);
  });
  addEventListener('keyup', e => teclas.delete(e.key.toLowerCase()));
  // teclas retenidas: se limpian al perder el foco, ocultar la pestaña, pausar, morir o cambiar de nivel
  function soltarTodo() { teclas.clear(); if (jugador) { jugador.jPendiente = null; jugador.giroPendiente = null; if (jugador.st === 'defensa') { jugador.st = 'quieto'; jugador.t = 0; } } }
  addEventListener('blur', soltarTodo);
  document.addEventListener('visibilitychange', () => { if (document.hidden) soltarTodo(); });
  // Menú con mouse / toque: las 10 casillas de nivel y el botón de campaña.
  cv.addEventListener('pointerdown', ev => {
    if (estado !== 'menu') return;
    const r = cv.getBoundingClientRect(), sc = Math.min(r.width / MUNDO.w, r.height / MUNDO.h);
    const ox = r.left + (r.width - MUNDO.w * sc) / 2, oy = r.top + (r.height - MUNDO.h * sc) / 2;
    const x = (ev.clientX - ox) / sc, y = (ev.clientY - oy) / sc;
    const dentro = B => x >= B.x && x <= B.x + B.w && y >= B.y && y <= B.y + B.h;
    if (CAMP) { if (galpon.mov) return; const hit = botonesGalpon().find(([, B]) => dentro(B)); if (hit) { galpon.foco = null; accionGalpon(hit[0]); } return; }   // v152: los paneles no son clicables   // v109   // v64: galpón
    for (const t of pestanasMenu()) if (x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.h) { cambiarSet(0, t.id); return; }   // v55
    for (const c of casillasMenu()) if (x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h) { irAlNivel(c.n); return; }
  });

  // v109: resaltado al pasar el cursor por los botones del galpón
  cv.addEventListener('pointermove', ev => {
    if (estado !== 'menu' || !CAMP) { if (galpon.hover) { galpon.hover = null; cv.style.cursor = ''; } return; }
    const r = cv.getBoundingClientRect(), sc = Math.min(r.width / MUNDO.w, r.height / MUNDO.h);
    const x = (ev.clientX - r.left - (r.width - MUNDO.w * sc) / 2) / sc, y = (ev.clientY - r.top - (r.height - MUNDO.h * sc) / 2) / sc;
    const hit = botonesGalpon().find(([, B]) => x >= B.x && x <= B.x + B.w && y >= B.y && y <= B.y + B.h);
    galpon.hover = hit ? hit[0] : null; cv.style.cursor = hit ? 'pointer' : '';
  });

  function pasarDeNivel() {
    if (nivel >= N.TOTAL) { estado = 'final'; estadoT = 0; return; }
    prepararNivel(nivel + 1, 'sigue');   // v35: la carga del poder pasa al nivel siguiente
  }

  /* ---------------- Jugador ---------------- */
  const libre = p => p.st === 'quieto' || p.st === 'camina';

  function boton(b) {
    const p = jugador;
    if (p.st === 'agarre') { if (b === 'A') jEnAgarre(); return; }   // en el agarre J es SOLO el combo (K no hace nada)
    if (p.st === 'ataque') { guardarBuffer(b); return; }               // v43: solo cuenta al final de la recuperación
    if (!libre(p)) return;                                             // rechazada: no avanza el combo
    empezarAtaque(b);
  }
  /* v43 — combo izquierda → izquierda → derecha. El paso, la imagen y el daño se fijan ACÁ, al empezar el golpe:
     el impacto usa lo guardado en el jugador (nunca vuelve a leer el contador, que ya avanzó). */
  function empezarAtaque(b) {
    const p = jugador;
    if (p.seq[b] && tiempo - p.finAtaque[b] > CG.reinicio) p.seq[b] = 0;   // más de 1 s sin golpes de este botón → vuelve al 1.º
    const paso = p.seq[b], variante = CG.secuencia[paso];
    p.seq[b] = (paso + 1) % CG.secuencia.length;                          // avanza aunque después no conecte
    p.tecnica = C.elegirTecnica(b); p.variante = variante; p.extra = C.extraDeVariante(variante); p.botonAtaque = b;
    p.paso = paso;                                                        // v83: elige la pose A / B / la de siempre (js/golpes_ab.js)
    p.st = 'ataque'; p.t = 0; p.golpeHecho = false; p.ataqueId++; p.buffer = null;
    p.golpes.push({ boton: b === 'A' ? 'J' : 'K', paso: paso + 1, variante, t: +tiempo.toFixed(3) }); if (p.golpes.length > 40) p.golpes.shift();
  }
  // Una sola pulsación guardada, y solo en los últimos CG.buffer s del golpe: no hay cola infinita ni golpes superpuestos.
  function guardarBuffer(b) {
    const p = jugador;
    if (p.st !== 'ataque' || p.buffer || p.t < TIEMPO.ataque - CG.buffer) return;
    p.buffer = b;
  }
  // Recibir un golpe, morir, cambiar de nivel o cerrar el nivel: sin golpes pendientes y el combo vuelve al 1.º.
  function reiniciarCombo(p) { if (!p) return; p.seq.A = 0; p.seq.B = 0; p.buffer = null; }

  /* ---- Defensa del jugador: mantener PIÑA (J) + ATRÁS ----
     ATRÁS = el lado contrario al que mira ANTES de apretar la dirección.
     La piña sola y el darse vuelta esperan `tolerancia` s: si en ese lapso llega la otra
     tecla, entra en defensa (sin piña y sin girar). Si no, sale la piña / se da vuelta. */
  const izqApretada = () => teclas.has('a') || teclas.has('arrowleft');
  const derApretada = () => teclas.has('d') || teclas.has('arrowright');
  const atrasApretada = p => p.face > 0 ? izqApretada() : derApretada();
  function pulsarPina() {
    const p = jugador;
    if (p.st === 'agarre') { jEnAgarre(); return; }
    if (intentarRecoger()) return;                     // v44: J cerca de la damajuana = recogerla (no hay piña ni combo)
    if (p.st === 'ataque') { guardarBuffer('A'); return; }   // v43: encadenar la próxima piña al terminar este golpe
    if (libre(p)) p.jPendiente = tiempo;            // la piña sale después de la tolerancia, si no se forma la combinación
  }
  function pulsarDireccion(dir) {
    const p = jugador;
    if (libre(p) && dir === -p.face) p.giroPendiente = { dir, t: tiempo };   // no se da vuelta todavía
  }
  function revisarDefensa() {
    const p = jugador;
    const combinacion = teclas.has('j') && atrasApretada(p);
    if (p.st === 'defensa') {
      if (!combinacion) { p.st = 'quieto'; p.t = 0; }  // al soltar, sale de defensa
      return p.st === 'defensa';
    }
    if (combinacion && libre(p)) {                    // solo cuando el estado de combate lo permite (no cancela un golpe comprometido)
      p.st = 'defensa'; p.t = 0; p.jPendiente = null; p.giroPendiente = null; p.empujando = null; p.empujeT = 0;
      console.info('[Defensa] jugador cubierto mirando a la', p.face > 0 ? 'derecha' : 'izquierda');
      return true;
    }
    return false;
  }

  /* ---- Agarre automático ---- */
  const agarrable = e => enJuego(e) && e.agarrable !== false && ['acercarse', 'esperar', 'preparar', 'golpear'].includes(e.st) && !(e.sinAgarre > 0);
  function revisarAgarre(mx, dt) {
    const p = jugador, s = escalaEn(p.y);
    const cand = mx ? enemigos.filter(e => agarrable(e) && (e.x - p.x) * mx > 0 && Math.abs(e.x - p.x) < AGARRE.distancia * s && Math.abs(e.y - p.y) < AGARRE.profundidad * factorProf(p.y))
                              .sort((a, b) => Math.abs(a.x - p.x) - Math.abs(b.x - p.x))[0] : null;
    if (!cand) { p.empujando = null; p.empujeT = 0; return false; }
    if (p.empujando !== cand) { p.empujando = cand; p.empujeT = 0; }
    p.empujeT += dt;
    if (p.empujeT < AGARRE.empuje) return false;
    agarrar(cand); return true;
  }

  function agarrar(e) {
    const p = jugador;
    p.face = e.x >= p.x ? 1 : -1;
    p.st = 'agarre'; p.t = 0; p.agarrado = e; p.combo = null; p.comboT = 0; p.golpeHecho = false; p.pinaHecha = false; p.pinaFin = 0; p.jGuardado = false;
    p.empujando = null; p.empujeT = 0;
    e.st = 'agarrado'; e.t = 0; soltarFicha(e); e.defPendiente = null;
    objetivoHUD = e;
    console.info('[Agarre] automático →', e.luch.nombreHUD);
  }

  function jEnAgarre() {
    const p = jugador;
    if (p.combo === 'cabezazo') return;
    if (p.combo === 'pina') { p.jGuardado = true; return; }
    if (!p.pinaHecha) iniciarGolpeCombo('pina');
    else if (tiempo - p.pinaFin <= C.comboDe(p.luch.referente).ventana) iniciarGolpeCombo('cabezazo');
  }
  function iniciarGolpeCombo(paso) { const p = jugador; p.combo = paso; p.comboT = 0; p.golpeHecho = false; p.jGuardado = false; }

  function actualizarAgarre(dt) {
    const p = jugador, e = p.agarrado, s = escalaEn(p.y);
    if (!e && !p.combo) { soltar(); return; }
    if (e) { if (p.y < PISO.yMin + 0.5) p.y = PISO.yMin + 0.5; e.x = p.x + p.face * AGARRE.separacion * s; e.y = p.y - 0.5; e.face = -p.face; }   // v150: el agarrado nunca queda sobre el cordón   // medio píxel atrás: el jugador se dibuja adelante
    if (p.combo) {
      p.comboT += dt;
      if (!p.golpeHecho && p.comboT >= AGARRE.impacto) {
        p.golpeHecho = true;
        e.origenDanio = 'normal';                       // v37: origen del último daño (decide si la derrota carga el poder)
        const vAntes = e.luch.vida;
        const d = C.golpeCombo(p.luch, e.luch, p.combo, pctContra(e)); log(d, e); chispa(e);
        sumarDanio(e, vAntes, 'pina');                  // v39: el combo del agarre sale con J → cuenta como piña
        if (p.combo === 'cabezazo' || e.luch.estaKO) { derribar(e, p.face); p.agarrado = null; }
      }
      if (p.comboT >= AGARRE.golpe) {
        const fue = p.combo; p.combo = null;
        if (!p.agarrado) { soltar(); return; }
        if (fue === 'pina') { p.pinaHecha = true; p.pinaFin = tiempo; if (p.jGuardado) iniciarGolpeCombo('cabezazo'); }
      }
      return;
    }
    const cfg = C.comboDe(p.luch.referente);
    if (!p.pinaHecha && p.t > AGARRE.esperaPrimerJ) { console.info('[Agarre] se soltó (no hubo piña)'); soltar(); }
    else if (p.pinaHecha && tiempo - p.pinaFin > cfg.ventana) { console.info('[Agarre] combo cancelado: no llegó el cabezazo'); soltar(); }
  }

  function soltar() {
    const p = jugador, e = p.agarrado;
    if (p.st === 'agarre') { p.st = 'quieto'; p.t = 0; }
    p.agarrado = null; p.combo = null; p.tecnica = null;
    if (e && e.st === 'agarrado') { e.st = 'dolor'; e.t = 0; e.x += p.face * 40; e.sinAgarre = AGARRE.reagarre; }
  }

  function log(d, e) {
    const nombre = d.combo ? (d.combo === 'pina' ? 'COMBO AGARRE · PIÑA' : 'COMBO AGARRE · CABEZAZO') : R.ETIQUETAS[d.ataque] + (d.variante ? ` ${d.variante === 'der' ? 'DERECHA' : 'izquierda'}` : '') + (d.especialidad ? ' ★' : '');
    const extra = d.extra && d.extra !== 1 ? ` × ${d.extra}` : '';
    console.info(`[Golpe] ${nombre}: ${d.base} × ${d.multiplicador}${extra} = ${+d.ofensivo.toFixed(3)} (aplicado ${+d.aplicado.toFixed(3)}) → ${e.luch.nombreHUD} queda con ${+e.luch.vida.toFixed(3)}/${e.luch.vidaMax}`);
  }

  function duracionDolor() {
    const d = arteJugador && arteJugador.tipo === 'frames' && arteJugador.def.tiempos && arteJugador.def.tiempos.dolor;
    return d ? d.reduce((a, b) => a + b, 0) : TIEMPO.dolorJugador;
  }

  function actualizarJugador(dt) {
    const p = jugador; p.t += dt; p.inv = Math.max(0, p.inv - dt);
    if (p.st === 'damajuana') {                           // v44: recoger → sostener → beber. Quieto, sin atacar ni cubrirse
      p.jPendiente = null; p.giroPendiente = null; p.buffer = null;
      if (p.t >= duracionRecogida()) terminarRecogida();
      encerrar(p); return;
    }
    if (p.st === 'poder') { p.jPendiente = null; p.giroPendiente = null; encerrar(p); return; }   // v35: da la orden (actualizarPoder lo libera)
    if (p.st === 'dolor' && p.t > duracionDolor()) { p.st = 'quieto'; p.t = 0; }
    if (p.st === 'ko') { p.jPendiente = null; p.giroPendiente = null; return; }
    if (revisarDefensa()) { encerrar(p); return; }     // cubierto: no camina, no ataca, conserva la orientación
    const tol = DC.jugador.tolerancia;
    if (p.jPendiente !== null && tiempo - p.jPendiente >= tol) { p.jPendiente = null; boton('A'); }   // no hubo combinación: sale la piña
    if (p.giroPendiente && tiempo - p.giroPendiente.t >= tol) p.giroPendiente = null;

    if (libre(p)) {
      let mx = (derApretada() ? 1 : 0) - (izqApretada() ? 1 : 0);
      if (p.giroPendiente && mx === p.giroPendiente.dir) mx = 0;   // espera la tolerancia antes de darse vuelta
      const my = (teclas.has('s') || teclas.has('arrowdown') ? 1 : 0) - (teclas.has('w') || teclas.has('arrowup') ? 1 : 0);
      const v = VEL_JUGADOR * R.modificadorVelocidad(p.luch);
      if (mx || my) {
        if (p.st !== 'camina') { p.recorrido = 0; if (!(tiempo - (p.ultPaso ?? -9) < 0.25)) p.relojPaso = 0; }   // v46: cada caminata arranca por el 1.er cuadro del ciclo · v92: el reloj de pasos solo vuelve a 0 tras frenar de verdad (> 0,25 s), no al darse vuelta
        const n = Math.hypot(mx, my), x0 = p.x, y0 = p.y; p.x += mx / n * v * dt; p.y += my / n * v * 0.62 * dt; p.st = 'camina';
        encerrar(p); const dd = Math.hypot(p.x - x0, p.y - y0); p.recorrido = (p.recorrido || 0) + dd;   // contra la pared no avanza el paso
        if (dd > 0.01) { p.relojPaso = (p.relojPaso || 0) + dt; p.ultPaso = tiempo; }   // v92: reloj PROPIO de la caminata (s de juego; la pausa no corre; cambiar de rumbo no lo reinicia)
        p.rumbo = mx ? 'lado' : (my > 0 ? 'abajo' : 'arriba');
        if (mx) p.face = mx;
      } else p.st = 'quieto';
      revisarAgarre(mx, dt);
    }
    if (p.st === 'ataque') {
      if (!p.golpeHecho && p.t >= TIEMPO.impacto) { p.golpeHecho = true; conectarJugador(); }
      if (p.t >= TIEMPO.ataque) {
        p.finAtaque[p.botonAtaque] = tiempo; p.st = 'quieto'; p.t = 0; p.tecnica = null; p.variante = null; p.extra = 1;
        const b = p.buffer; p.buffer = null;                                   // v43: la pulsación guardada sale ahora, si sigue valiendo
        if (b && !(teclas.has('j') && atrasApretada(p))) empezarAtaque(b);    // J + atrás = defensa: no se larga el golpe guardado
      }
    }
    if (p.st === 'agarre') actualizarAgarre(dt);
    encerrar(p);
  }

  // v83: alcance del golpe = el del cuadro que se dibuja (piña A/B, patada A/B); sin variante, el general de la técnica
  function alcanceJugador(p) {
    const G = window.GolpesAB, id = G && G.cuadroSecuencia(defFramesJugador, p.tecnica, p.paso);
    const a = id && G.alcanceCuadro(defFramesJugador, id, p.face); return a != null ? a : ALCANCE[p.tecnica];
  }
  function conectarJugador() {
    const p = jugador, s = escalaEn(p.y), alcance = alcanceJugador(p) * s;
    const blanco = enemigos.filter(e => enJuego(e) && golpeable(e) && Math.abs(e.y - p.y) < PROF_GOLPE * factorProf(p.y) && (e.x - p.x) * p.face > -20 && Math.abs(e.x - p.x) < alcance)
                           .sort((a, b) => Math.abs(a.x - p.x) - Math.abs(b.x - p.x))[0];
    if (!blanco) return;
    const cubierto = protegeEnemigo(blanco);
    blanco.origenDanio = 'normal';                    // v37: origen del último daño (decide si la derrota carga el poder)
    const vAntes = blanco.luch.vida;
    const d = p.luch.atacar(blanco.luch, p.tecnica, pctContra(blanco), p.extra); d.variante = p.variante; log(d, blanco); objetivoHUD = blanco;   // v43: ×1,10 si es la derecha
    sumarDanio(blanco, vAntes, window.Puntaje.tipoDe(p.tecnica));   // v39: piña ×2 · patada ×1, solo lo realmente quitado
    recibirGolpeEnemigo(blanco, p.face, cubierto);
  }

  /* ---- Defensa: una sola regla para todos los golpes (de frente o por la espalda) ---- */
  const protegeEnemigo = e => e.st === 'defensa' && e.t >= DC.ia.entrada && e.t < e.defT - DC.ia.salida;
  const pctContra = e => D.porcentajeDanio({ esJugador: false, idEnemigo: e.luch.def.id, nivel, cubriendose: protegeEnemigo(e) });
  const pctJugador = () => D.porcentajeDanio({ esJugador: true, nivel, cubriendose: jugador.st === 'defensa' });

  // Reacción del enemigo a un golpe del jugador (ya aplicado el daño una sola vez).
  function recibirGolpeEnemigo(e, dir, cubierto) {
    if (cubierto) {                                     // bloqueado: sin reacción de herida; solo el destello
      chispa(e, 'bloqueo'); e.x += dir * 8;
      const pct = pctContra(e);
      console.info(`[Bloqueo] ${e.luch.nombreHUD} se cubrió: daño normal ${+e.luch.ultimoNormal.toFixed(3)} × ${pct} % = ${+(e.luch.ultimoNormal * pct / 100).toFixed(3)} → queda con ${+e.luch.vida.toFixed(3)}`);
      if (e.luch.estaKO) tumbar(e);
      return;
    }
    chispa(e);
    if (e.luch.estaKO) { tumbar(e); return; }
    soltarFicha(e);
    if (e.iaPolicia) e.golpesSinAccion++;               // v32: el pedido de bloqueo espera al próximo punto válido (no se borra por el golpe)
    else e.defPendiente = null;
    // cadena de golpes: pasado el límite, los golpes siguientes ya no reinician la reacción
    const cad = e.jefeDefensa ? DC.cadena.jefe : DC.cadena.comun;
    const aplica = e.jefeDefensa || e.puedeCubrirse;
    e.impactos = e.impactos.filter(t => tiempo - t <= cad.ventana); e.impactos.push(tiempo);
    if (aplica && !e.salidaCadena && e.cadenaEnfriar <= 0 && e.impactos.length >= cad.impactos) {
      e.salidaCadena = true; e.impactos = []; e.cadenaEnfriar = cad.enfriamiento;
      console.info(`[Cadena] ${e.luch.nombreHUD}: ${cad.impactos} golpes seguidos → sale de la cadena`);
    }
    if (e.salidaCadena && e.st === 'dolor') return;     // no se reinicia: termina la reacción que tiene
    e.nDolor = (e.nDolor || 0) + 1;                       // v55: alterna las reacciones (barras de otros clubes: a / b / c)
    e.st = 'dolor'; e.t = 0; e.x += dir * 26;
  }

  /* ---------------- v44 — DAMAJUANA (recuperar vida) ---------------- */
  const duracionRecogida = () => DJ.tiempos.recoger + DJ.tiempos.sostener + DJ.tiempos.beber;
  const nivelTerminado = () => cola.length === 0 && enemigos.every(e => e.st === 'fuera');
  // Punto del piso más lejano del jugador, medido como RECORRIDO (en profundidad camina a 0,62 de la velocidad lateral).
  // El piso no tiene obstáculos: todo punto dentro de sus límites (con margen) es alcanzable en línea recta.
  function lugarDamajuana() {
    const p = jugador, M = DJ.margen, P = DJ.pasoGrilla, cand = [];
    for (let y = PISO.yMin + M.y; y <= PISO.yMax - M.y + 0.01; y += P.y) {
      const x0 = xMinEn(y) + M.x * escalaEn(y), x1 = xMaxEn(y) - M.x * escalaEn(y);
      for (let x = x0; x <= x1 + 0.01; x += P.x) {
        const recorrido = Math.hypot(x - p.x, (y - p.y) / 0.62);
        const tapada = enemigos.some(e => enJuego(e) && e.st !== 'ko' && Math.hypot(e.x - x, (e.y - y) * 2) < DJ.lejosDeEnemigos);
        cand.push({ x, y, recorrido, tapada });
      }
    }
    const libres = cand.filter(c => !c.tapada), lista = libres.length ? libres : cand;
    return lista.reduce((a, b) => b.recorrido > a.recorrido ? b : a);
  }
  // Se llama en cada cuadro de juego activo (la pausa no la llama): rearme, aparición y vencimiento.
  function actualizarDamajuana(dt) {
    const p = jugador; if (!p || estado !== 'jugando') return;
    const frac = p.luch.vida / p.luch.vidaMax;
    if (frac > DJ.umbral) damaArmada = true;            // regla de rearme (centralizada): volvió a superar el umbral (v71: 25 %)
    if (dama) {
      dama.t += dt;
      if (dama.t >= DJ.duracion) { console.info(`[Damajuana] venció a los ${DJ.duracion} s: desaparece (no vuelve hasta superar el ${DJ.umbral * 100} % y caer de nuevo)`); dama = null; }
      return;
    }
    if (!ITEM || !damaArmada || p.st === 'ko' || p.st === 'damajuana' || p.luch.vida <= 0 || frac > DJ.umbral || nivelTerminado()) return;   // v58: sin objeto del club, no aparece
    const l = lugarDamajuana();
    dama = { x: l.x, y: l.y, t: 0, n: ++damasCreadas }; damaArmada = false;
    console.info(`[Damajuana] aparece con vida ${+(frac * 100).toFixed(2)} % en (${Math.round(l.x)}, ${Math.round(l.y)}) · jugador en (${Math.round(p.x)}, ${Math.round(p.y)}) · recorrido ${Math.round(l.recorrido)} px`);
  }
  const cercaDeDama = p => dama && Math.abs(p.x - dama.x) <= DJ.zona.dx * escalaEn(dama.y) && Math.abs(p.y - dama.y) <= DJ.zona.dy;
  function intentarRecoger() {
    const p = jugador;
    if (!dama || estado !== 'jugando' || pausado || pausaConsola) return false;
    if (dama.t >= DJ.duracion) return false;                    // ya venció
    if (!['quieto', 'camina', 'ataque'].includes(p.st) || !cercaDeDama(p)) return false;   // lejos: J sigue siendo piña
    console.info(`[Damajuana] recogida a los ${dama.t.toFixed(2)} s con vida ${+p.luch.vida.toFixed(3)}/${p.luch.vidaMax}`);
    dama = null;                                                 // sale del piso y se cancela su plazo
    p.st = 'damajuana'; p.t = 0; p.tecnica = null; p.variante = null; p.extra = 1;
    p.jPendiente = null; p.giroPendiente = null; p.buffer = null; p.face = p.face || 1;
    for (const e of enemigos) if (!['ko', 'fuera', 'esperaEntrar', 'dolor', 'derribado', 'recuperando', 'agarrado'].includes(e.st)) {
      e.st = 'esperar'; e.t = 0; e.golpe = null; e.defPendiente = null; e.ficha = false;   // golpes en preparación: se cancelan
    }
    return true;
  }
  function terminarRecogida() {
    const p = jugador;
    p.luch.vida = p.luch.vidaMax;                                // exactamente al 100 %
    p.st = 'quieto'; p.t = 0; p.jPendiente = null; p.giroPendiente = null; p.buffer = null;
    teclas.delete('j');                                          // la J que quedó apretada no larga una piña ni arma la defensa
    for (const e of enemigos) if (e.st === 'esperar') {          // vuelven a actuar, con una espera nueva antes de atacar
      e.st = 'acercarse'; e.t = 0; e.golpe = null; e.ficha = false; e.enfriar = Math.max(e.enfriar, azar(DJ.reanudar));
    }
    console.info(`[Damajuana] terminó de beber: vida ${p.luch.vida}/${p.luch.vidaMax} (100 %)`);
  }
  function dibujarDamajuana() {
    if (!dama || !imgDama) return;
    const s = escalaEn(dama.y), k = ITEM.altoObjeto * s / (cajaDama.y1 - cajaDama.y0);
    const resta = Math.max(0, DJ.duracion - dama.t), urgente = resta < 2;
    const sube = Math.sin(tiempo * 5) * 3 * s;                   // leve rebote para que se note
    g.save(); g.globalAlpha = 0.35; g.fillStyle = '#000'; g.beginPath(); g.ellipse(dama.x, dama.y, 40 * s, 10 * s, 0, 0, 7); g.fill(); g.restore();
    g.save(); if (urgente && Math.floor(tiempo * 8) % 2 === 0) g.globalAlpha = 0.6;
    g.drawImage(imgDama, dama.x - cajaDama.cx * k, dama.y - cajaDama.y1 * k + sube, anW(imgDama) * k, anH(imgDama) * k);
    g.restore();
    // contador discreto: anillo que se vacía + segundos
    const cy = dama.y - ITEM.altoObjeto * s - 26 * s, r = 17 * s;
    g.save(); g.lineWidth = 4 * s; g.strokeStyle = 'rgba(5,9,20,0.7)'; g.fillStyle = 'rgba(5,9,20,0.6)';
    g.beginPath(); g.arc(dama.x, cy, r, 0, 7); g.fill(); g.stroke();
    g.strokeStyle = urgente ? '#ff6b5e' : '#ffd34f'; g.beginPath(); g.arc(dama.x, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * resta / DJ.duracion); g.stroke();
    g.font = `bold ${Math.round(17 * s)}px Verdana, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#ffffff';
    g.fillText(String(Math.ceil(resta)), dama.x, cy + 1); g.restore();
  }

  /* ---------------- Enemigos ---------------- */
  const enJuego = e => e.st !== 'esperaEntrar' && e.st !== 'fuera';
  const golpeable = e => !['ko', 'derribado', 'agarrado', 'fuera', 'esperaEntrar', 'recuperando'].includes(e.st);
  const soltarFicha = e => { e.ficha = false; };
  function tumbar(e) {
    if (e.st === 'recuperando') return;                    // ya está resolviendo su primera caída
    if (e.barrasExtra > 0) { arrodillar(e); return; }      // primera barra: NO es derrota (sin KO, sin victoria, sigue contando)
    soltarFicha(e); e.st = 'ko'; e.t = 0; e.defPendiente = null; e.golpe = null; console.info('[KO]', e.luch.nombreHUD);   // v43: sin ataque pendiente
    contarDerrota(e);
  }
  // v29: primera barra agotada → se arrodilla. La recuperación se consume en el acto (no puede repetirse).
  function arrodillar(e) {
    e.barrasExtra--; e.luch.vida = 0;                     // queda en 0: el daño que sobró no pasa a la segunda barra
    soltarFicha(e); e.st = 'recuperando'; e.t = 0; e.golpe = null; e.defPendiente = null;
    e.impactos = []; e.salidaCadena = false; e.sinAgarre = 0;
    if (jugador && jugador.agarrado === e) soltar();
    console.info(`[Jefe] ${e.luch.nombreHUD}: primera barra vacía → recuperación (${RECUPERACION.total} s)`);
  }
  function derribar(e, dir) {
    soltarFicha(e); e.st = 'derribado'; e.t = 0; e.caeDir = dir; e.x += dir * DERRIBO.empuje * escalaEn(e.y);
    if (e.adentro) encerrar(e);
    console.info(`[Derribo] ${e.luch.nombreHUD} al suelo${e.luch.estaKO ? ' (derrotado)' : ''}`);
  }

  function actualizarEnemigo(e, dt) {
    if (poderActivo && !poderActivo.aplicado && poderActivo.objetivos.includes(e)) return;   // v35: quietos hasta que caen las piedras
    e.t += dt; const p = jugador, s = escalaEn(e.y);
    if (p && p.st === 'damajuana') {                      // v44: mientras recoge y bebe, TODOS esperan en guardia
      if (e.st === 'esperaEntrar') { e.t -= dt; return; } // los que todavía no entraron tampoco avanzan
      // derrotados, caídos y aturdidos terminan su animación (no pegan); al salir de ella vuelven a quedar esperando
      if (!['ko', 'fuera', 'dolor', 'derribado', 'recuperando', 'agarrado'].includes(e.st)) {
        if (e.st !== 'esperar' || e.golpe) { e.st = 'esperar'; e.t = 0; }
        e.golpe = null; e.defPendiente = null; e.ficha = false; e.mx = 0; e.my = 0;   // sin golpe pendiente: nunca se completa
        return;
      }
    }
    if (e.st === 'esperaEntrar') { if (e.tEspera === undefined) e.tEspera = 0; e.tEspera += dt; if (e.tEspera >= e.entraEn) { e.st = 'acercarse'; e.t = 0; } return; }
    if (e.st === 'fuera' || e.st === 'agarrado') return;
    if (e.sinAgarre > 0) e.sinAgarre -= dt;
    if (e.enfriarDef > 0) e.enfriarDef -= dt;
    if (e.cadenaEnfriar > 0) e.cadenaEnfriar -= dt;
    if (e.st === 'ko') { if (e.t > tFuera(e)) e.st = 'fuera'; return; }            // derrotado: no ataca más
    if (e.st === 'recuperando') {                          // v29: no se mueve, no ataca, no recibe golpes; conserva hacia dónde mira
      if (e.t >= RECUPERACION.total) {
        e.luch.vida = e.luch.vidaMax; e.fase = 2; e.st = 'acercarse'; e.t = 0; e.enfriar = 0.6;
        console.info(`[Jefe] ${e.luch.nombreHUD} se levantó: fase 2 con ${e.luch.vida}/${e.luch.vidaMax}`);
      }
      return;
    }
    if (e.st === 'derribado') {
      if (e.luch.estaKO && e.t >= DERRIBO.caida && e.barrasExtra > 0) { arrodillar(e); return; }
      if (e.luch.estaKO && e.t >= DERRIBO.caida) { e.st = 'ko'; e.t = KO_ANIM.reaccion + KO_ANIM.caida; e.derribadoKO = true; console.info('[KO]', e.luch.nombreHUD); contarDerrota(e); return; }
      if (e.t >= DERRIBO.caida + DERRIBO.suelo + DERRIBO.levantarse) { e.st = 'acercarse'; e.t = 0; e.enfriar = 0.6; e.sinAgarre = AGARRE.reagarre; console.info('[Derribo]', e.luch.nombreHUD, 'se levantó'); }
      return;
    }
    if (e.st === 'dolor') {                                // la reacción se ve entera antes de volver a actuar
      if (e.t > duracionDolorEnemigo(e)) {
        e.t = 0; e.st = 'acercarse';
        if (e.salidaCadena) { e.salidaCadena = false; if (!entrarDefensa(e, true)) { e.st = 'retirada'; } }   // salida visible: se cubre o retrocede
      }
      return;
    }

    // v43: el policía queda comprometido hacia donde empezó el ataque (palo atrás → palo adelante): no se da vuelta en
    // medio del golpe, así el palo pega solo DELANTE de él y nunca a quien quedó detrás.
    const comprometido = e.iaPolicia && (e.st === 'preparar' || e.st === 'golpear');
    if (p.st !== 'ko' && !comprometido) e.face = p.x >= e.x ? 1 : -1;
    e.enfriar -= dt;

    if (e.st === 'defensa') {                              // entrada → mantiene → salida. No camina ni ataca mientras se cubre
      if (e.t >= e.defT) {
        e.st = 'acercarse'; e.t = 0; e.enfriarDef = azar(cfgIA(e).enfriamiento);
        e.enfriar = Math.max(e.enfriar, DC.ia.contraataqueTras);     // contraataque normal y anticipable, no inmediato
        console.info('[Defensa]', e.luch.nombreHUD, 'baja la guardia');
      }
      return;
    }
    if (e.st === 'retirada') {
      const cr = DC.cadena.retirada, dir = e.x >= p.x ? 1 : -1, x0 = e.x;
      e.x += dir * cr.velocidad * dt; if (e.adentro) encerrar(e); andar8(e, e.x - x0, 0, dt); e.recorrido += Math.abs(e.x - x0); e.mx = e.x - x0; e.my = 0; avanzarReloj(e, e.x - x0, 0, dt);
      if (e.t >= cr.duracion) { e.st = 'acercarse'; e.t = 0; e.enfriar = Math.max(e.enfriar, DC.ia.contraataqueTras); }
      return;
    }
    // ¿decide cubrirse? Un tiro de dado por cada golpe nuevo del jugador cerca (nunca por fotograma), con tiempo de reacción
    if (e.puedeCubrirse && p.ataqueId !== e.vistoAtaque) {
      e.vistoAtaque = p.ataqueId;
      const ia = cfgIA(e), s0 = escalaEn(e.y);
      if (e.iaPolicia) {                                 // v32: un sorteo por golpe; si después lo aturden, el pedido espera a que quede libre
        if (p.st === 'ataque' && e.enfriarDef <= 0 && e.defPendiente === null && amenaza(e, ia) && Math.random() < ia.probabilidad)
          e.defPendiente = tiempo + azar(ia.reaccion);
      } else
      if (p.st === 'ataque' && e.enfriarDef <= 0 && e.defPendiente === null && ['acercarse', 'esperar'].includes(e.st) &&
          Math.abs(p.x - e.x) < ia.distanciaAmenaza * s0 && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) * 1.5 && (e.x - p.x) * p.face > 0 &&
          Math.random() < ia.probabilidad) e.defPendiente = tiempo + azar(ia.reaccion);
    }
    if (e.iaPolicia && e.defPendiente !== null && tiempo - e.defPendiente > cfgIA(e).vencePedido) e.defPendiente = null;   // venció
    if (e.iaPolicia && e.defPendiente === null && e.golpesSinAccion >= cfgIA(e).forzarTrasImpactos && e.enfriarDef <= 0 &&
        ['acercarse', 'esperar'].includes(e.st) && amenaza(e, cfgIA(e))) {
      console.info(`[Defensa] ${e.luch.nombreHUD}: ${e.golpesSinAccion} golpes sin acción propia → se cubre`);
      if (entrarDefensa(e, false)) return;
    }
    if (e.defPendiente !== null && tiempo >= e.defPendiente) {
      e.defPendiente = null;
      if (['acercarse', 'esperar'].includes(e.st) && entrarDefensa(e, false)) return;   // ya cubierto: este fotograma no camina
    }

    if (e.st === 'preparar') {
      // v193: si el objetivo cayó o se fue lejos durante el aviso, se cancela (se quita el «!»): no pega a distancia ni queda colgado.
      const lejos = Math.abs(p.x - e.x) > ALCANCE_CANCELA * s || Math.abs(p.y - e.y) > PROF_GOLPE * factorProf(e.y) * 3;
      if (p.st === 'ko' || (lejos && !e.iaPolicia && !e.soloGolpe)) { cancelarPreparacion(e, p.st === 'ko' ? 'objetivo caído' : 'objetivo fuera de alcance'); return; }
      // v193: tope PREP_MAX medido desde el primer cuadro con «!»: si el próximo cuadro lo pasaría, larga en éste (nunca > 2,0 s)
      if (e.t >= (e.golpe === 'especial' ? DC.policia.especial.preparacion : e.tiempos.preparacion) || e.t + 0.05 > PREP_MAX + 1e-9) {   // v194: 0,05 = el dt máximo del bucle → nunca se pasa de 2,0 s aunque el cuadro siguiente sea más largo             // suelta el golpe: el daño se aplica UNA vez, cuando aparece el cuadro de ataque
        (e.prepHechas = e.prepHechas || []).push(+e.t.toFixed(3)); if (e.prepHechas.length > 20) e.prepHechas.shift();   // v193: registro (pruebas)
        e.st = 'golpear'; e.t = 0;
        const alc = alcanceEnemigo(e, e.golpe, e.var) * s * (e.jefe ? 1.1 : 1);   // v83: alcance de la variante (A/B) que se dibuja
        // v34: con franja propia (escobazo) conecta solo si el jugador está donde llega la PAJA, delante de él
        const fr = e.franja && e.franja[e.golpe], dxF = (p.x - e.x) * e.face;
        const llega = fr ? dxF >= fr[0] * s && dxF <= fr[1] * s : Math.abs(p.x - e.x) < alc && (p.x - e.x) * e.face > 0;
        // v194: registro de cada ataque (aviso → golpe = contacto: el daño se aplica en este mismo cuadro). Pruebas / diagnóstico.
        registroAtaques.push({ id: e.luch.def.id, aviso: e.prepHechas[e.prepHechas.length - 1], llega: !!(llega && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y)), dx: Math.round(Math.abs(p.x - e.x) / s), dy: Math.round(Math.abs(p.y - e.y)), t: +tiempo.toFixed(2), golpe: e.golpe, alc: Math.round(alc / s), frente: (p.x - e.x) * e.face > 0 });
        if (registroAtaques.length > 400) registroAtaques.shift();
        if (e.iaPolicia) {                                  // v43: registro del golpe (pruebas): una entrada por palazo/escudazo, nunca por cuadro
          e.ataquesHechos = (e.ataquesHechos || 0) + 1;
          if (e.golpe === 'especial') { e.carga = 0; e.especialesHechos = (e.especialesHechos || 0) + 1; }   // v69: consume la carga al soltarlo
          else e.carga = Math.min(DC.policia.especial.carga, e.carga + 1);
          console.info(`[Policía] ${e.luch.nombreHUD}: ${e.golpe === 'especial' ? 'GOLPE ESPECIAL' : e.golpe === 'pina' ? 'ataque primario' : 'ataque secundario'} (carga ${e.carga}/${DC.policia.especial.carga}) · distancia ${Math.round(dxF / s)} px (escala 1) · ${llega && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) ? 'en la zona' : 'fuera de la zona'}`);
        }
        if (p.st !== 'ko' && p.st !== 'poder' && p.st !== 'damajuana' && p.inv <= 0 && !invencibleDebug && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) && llega) {
          const cubierto = p.st === 'defensa';
          const r = C.golpeEnemigo(e.luch, p.luch, e.golpe, pctJugador());
          const nombreGolpe = e.soloGolpe ? 'Escobazo' : { pina: 'Piña', patada: 'Patada', cabezazo: 'Cabezazo', especial: 'Golpe especial' }[e.golpe];
          if (cubierto) {                                    // 0 de daño: sin herida, sin empujón, sigue cubierto
            console.info(`[Bloqueo] ${nombreGolpe} de ${e.luch.nombreHUD} (${r.danio}) → ${sel.playerName} se cubrió: recibe ${r.aplicado} (${(p.x - e.x) * p.face < 0 ? 'de frente' : 'por la espalda'})`);
            chispa(p, 'bloqueo');
          } else {
            console.info(`[Recibe] ${nombreGolpe} de ${e.luch.nombreHUD}: ${r.danio} → ${sel.playerName} queda con ${+r.vidaRestante.toFixed(3)} (estaba: ${p.st})`);
            chispa(p);
            if (r.ko) { if (p.agarrado || p.st === 'agarre') soltar(); p.st = 'ko'; p.t = 0; p.jPendiente = null; reiniciarCombo(p); penalizarMuerte(); }   // v39: −300 una vez
            else { if (p.st === 'agarre') soltar(); p.st = 'dolor'; p.t = 0; p.inv = TIEMPO.invulnerable; p.x += e.face * 30; p.jPendiente = null; reiniciarCombo(p); }   // v43: corta golpe y buffer
          }
        }
      }
      return;
    }
    if (e.st === 'golpear') { if (e.t > (e.golpe === 'especial' ? DC.policia.especial.recuperacion : e.tiempos.recuperacion)) { e.st = 'acercarse'; e.t = 0; e.ficha = false; e.golpesSinAccion = 0; e.enfriar = PAUSA_ENTRE_ATAQUES[0] + Math.random() * (PAUSA_ENTRE_ATAQUES[1] - PAUSA_ENTRE_ATAQUES[0]);
        // v83: los referentes rivales con golpes A/B a veces ENCADENAN (piña-piña, piña-patada, patada-piña): un solo golpe extra, con
        // la misma preparación (se puede bloquear o esquivar) y sin quedarse con la ficha de ataque.
        if (variantesDe(e) && !e.encadenado && Math.random() < COMBO_RIVAL.prob) { e.encadenado = true; e.enfriar = COMBO_RIVAL.pausa; e.ficha = true; } else e.encadenado = false;
      } return; }

    // acercarse / esperar su turno: solo MAX_ATACANTES encaran; el resto se queda a distancia (el jefe siempre encara)
    // v194: el turno libre va al que MÁS tiempo lleva esperándolo (antes, al primero de la lista: alguno podía esperar mucho).
    // v195: la distancia al jugador cuenta como espera en contra (cada 300 px = 1 s): uno que viene de lejos no le quita el turno
    // al que ya tiene al jugador al lado.
    if (!e.ficha && e.enfriar <= 0) e.esperaTurno = (e.esperaTurno || 0) + dt;
    const prioridadTurno = o => (o.esperaTurno || 0) - Math.abs(o.x - p.x) / 300;
    // v195: uno con turno que todavía está lejos (> 500 px, viene caminando) lo cede si hay otro listo cerca del jugador (< 300 px)
    if (e.ficha && !e.jefe && e.st !== 'preparar' && Math.abs(e.x - p.x) > 500 &&
        enemigos.some(o => o !== e && !o.ficha && o.enfriar <= 0 && golpeable(o) && enJuego(o) && ['acercarse', 'esperar'].includes(o.st) && Math.abs(o.x - p.x) < 300)) {
      e.ficha = false; e.fichaT = 0; e.esperaTurno = 0;
    }
    if (!e.ficha && e.enfriar <= 0 && (e.jefe || (enemigos.filter(o => o.ficha).length < MAX_ATACANTES &&
        !enemigos.some(o => o !== e && !o.ficha && o.enfriar <= 0 && golpeable(o) && enJuego(o) && ['acercarse', 'esperar'].includes(o.st) && prioridadTurno(o) > prioridadTurno(e))))) {
      e.ficha = true; e.fichaT = 0; e.sinProg = 0; e.esperaTurno = 0;
    }
    /* v194 — PUESTO DE ATAQUE ALCANZABLE. Antes el que tenía turno (ficha) apuntaba a 125 px del jugador y a «carril» px en
       profundidad (hasta 40) y además lo empujaba la separación con los otros (60 px en x, 40 en y). En los planos de atrás la
       tolerancia de profundidad del golpe baja a ~26–42 px y el alcance de la patada a 185 × escala: el puesto quedaba FUERA de lo que
       el golpe exige y, sobre todo con dos atacantes del mismo lado o contra una pared, se quedaban quietos con el turno tomado y
       los demás esperando ese turno para siempre. Ahora el que tiene turno: va a la línea del jugador (desvío ≤ 40 % de la
       tolerancia), sin empuje lateral de la separación; si el otro atacante ya ocupa su lado y el otro lado cabe en el piso, va
       al otro lado; si no avanza de verdad (desplazamiento medido) cambia de lado, y si en 4 s no consigue atacar, devuelve el turno. */
    const tolP = PROF_GOLPE * factorProf(e.y), dist = e.ficha ? (e.distancia || 125) * s : 290 * s;   // v34: el GORDO ESCOBA se para a la distancia de la escoba
    let lado = e.x >= p.x ? 1 : -1, tx, ty;
    if (e.ficha) {
      ty = limitar(p.y + limitar(e.carril, -0.4 * tolP, 0.4 * tolP), PISO.yMin, PISO.yMax);
      const cabe = l => { const x = p.x + l * dist; return x >= xMinEn(ty) + 8 && x <= xMaxEn(ty) - 8; };
      if (e.ladoFijo && tiempo < e.ladoFijoHasta) lado = e.ladoFijo;
      else {
        e.ladoFijo = 0;
        // v195: solo cambia de lado si SU puesto no entra en el piso (pared). Ya no se va al otro lado porque haya otro atacante:
        // eso lo hacía darse vuelta y alejarse cuando el jugador se le acercaba de golpe.
        if (!cabe(lado) && cabe(-lado) && Math.abs(e.x - p.x) > ALCANCE.patada * s) { lado = -lado; e.ladoFijo = lado; e.ladoFijoHasta = tiempo + 2; }
      }
      tx = limitar(p.x + lado * dist, xMinEn(ty) + 4, xMaxEn(ty) - 4);

      // dos atacantes del mismo lado (contra una pared): uno un poco arriba y otro un poco abajo, siempre dentro de la tolerancia
      const par = enemigos.find(o => o !== e && o.ficha && enJuego(o) && Math.hypot(o.x - e.x, o.y - e.y) < 95);
      if (par) ty = limitar(p.y + (enemigos.indexOf(e) < enemigos.indexOf(par) ? -0.4 : 0.4) * tolP, PISO.yMin, PISO.yMax);
    } else {
      // sin turno: espera a distancia, del lado donde ESE puesto entra en el piso (contra una pared, del otro lado)
      ty = limitar(p.y + e.carril, PISO.yMin, PISO.yMax);
      const cabe = l => { const x = p.x + l * dist; return x >= xMinEn(ty) + 8 && x <= xMaxEn(ty) - 8; };
      if (e.ladoFijo && tiempo < e.ladoFijoHasta) lado = e.ladoFijo;
      else if (!cabe(lado) && cabe(-lado)) { lado = -lado; e.ladoFijo = lado; e.ladoFijoHasta = tiempo + 2; }
      tx = p.x + lado * dist;
      for (const o of enemigos) if (o !== e && enJuego(o) && golpeable(o)) {
        const dx = e.x - o.x, dy = e.y - o.y, d = Math.hypot(dx, dy);
        if (d < 95 && d > 0.01) { tx += dx / d * 60; ty += dy / d * 40; }
      }
      ty = limitar(ty, PISO.yMin, PISO.yMax); tx = limitar(tx, xMinEn(ty) + 4, xMaxEn(ty) - 4);   // puesto siempre dentro del piso
    }
    /* v195 — NO SE ALEJA CUANDO EL JUGADOR SE LE ACERCA. Si el jugador se le vino encima (más cerca que su puesto), antes
       caminaba hacia atrás hasta recuperar su distancia (125 px con turno, 290 sin turno); con las caminatas de 8 direcciones eso
       se ve como que se da vuelta y se va. Ahora no retrocede en horizontal: se queda en el lugar (se alinea en profundidad) y,
       con turno, pega desde ahí. Solo se corre si el jugador queda prácticamente encima (< 45 px a escala). */
    if ((tx - e.x) * (e.x - p.x) > 0 && Math.abs(e.x - p.x) >= 45 * s) tx = e.x;
    const vx = tx - e.x, vy = ty - e.y, dd = Math.hypot(vx, vy), paso = e.velCaminar * dt;   // v193: barras comunes al 85 %
    e.puesto = [tx, ty];   // v194: diagnóstico
    const x0 = e.x, y0 = e.y;
    if (dd > 8) { e.x += vx / dd * Math.min(paso, dd); e.y += vy / dd * Math.min(paso * 0.7, dd); e.st = 'acercarse'; }
    else e.st = 'esperar';
    if (e.iaPolicia) {
      // v32: decide recién cuando el golpe llega. 70/30 entre ataque primario (palo / mordida en avance) y secundario
      // (escudo / puño / mordida extendida), máx. 2 secundarios seguidos. v69: cada policía tiene su FRANJA por golpe (def.alcance);
      // con la carga completa (7 ataques propios) el próximo golpe a tiro es el ESPECIAL.
      const A = DC.policia.ataque, dxF = (p.x - e.x) * e.face;
      const aTiro = gp => { if (!e.luch.golpes[gp]) return false; const fr = e.franja && e.franja[gp];
        return fr ? dxF >= fr[0] * s && dxF <= fr[1] * s * 0.95 : dxF > 0 && Math.abs(p.x - e.x) < ALCANCE[gp] * s * 0.95; };
      if (e.ficha && p.st !== 'ko' && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) && e.enfriar <= 0) {
        let gp = null;
        if (e.carga >= DC.policia.especial.carga && aTiro('especial') && (e.st === 'esperar' || (aTiro('pina') && aTiro('patada')))) gp = 'especial';
        else {
          const okP = aTiro('pina'), okS = aTiro('patada');
          // v32: no decide en cuanto entra el golpe más largo (antes salía siempre ese): espera a tener los dos a tiro
          // o a haber llegado a su distancia de pelea; recién ahí sortea.
          if (okP && okS) gp = Math.random() < A.probPalazo ? 'pina' : 'patada';
          else if (e.st === 'esperar') gp = okP ? 'pina' : okS ? 'patada' : null;
          if (gp === 'patada' && okP && e.escudazosSeguidos >= A.maxEscudazosSeguidos) gp = 'pina';
        }
        if (gp) {
          if (gp !== 'especial') e.escudazosSeguidos = gp === 'patada' ? e.escudazosSeguidos + 1 : 0;
          e.golpe = gp; e.st = 'preparar'; e.t = inicioAviso(e);
          console.info(`[Policía] ${e.luch.nombreHUD} decide ${gp}`);
        }
      }
    } else
    if (e.soloGolpe) {
      // v34: GORDO ESCOBA — un solo ataque (escobazo). Lo larga cuando el jugador queda dentro de la franja de la paja.
      const fr = e.franja[e.soloGolpe], dxF = (p.x - e.x) * e.face;
      if (e.ficha && p.st !== 'ko' && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) && dxF >= (fr[0] + 20) * s && dxF <= (fr[1] - 20) * s && e.enfriar <= 0) {
        e.golpe = e.soloGolpe; e.st = 'preparar'; e.t = inicioAviso(e);
      }
    } else
    // v194: decide con un 5 % de margen dentro del alcance y la tolerancia reales (antes, justo en el borde, el golpe salía y no llegaba)
    if (e.ficha && p.st !== 'ko' && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) * 0.95 && Math.abs(p.x - e.x) < ALCANCE.patada * s * 0.95 && e.enfriar <= 0) {
      e.golpe = Math.abs(p.x - e.x) > ALCANCE.pina * s * 0.9 || Math.random() < 0.3 ? 'patada' : 'pina';
      if (e.luch.golpes.cabezazo && Math.abs(p.x - e.x) < ALCANCE.cabezazo * s && Math.random() < 0.45) e.golpe = 'cabezazo';
      elegirVariante(e, Math.abs(p.x - e.x) / s);
      e.st = 'preparar'; e.t = inicioAviso(e);
    }
    // mientras entra desde fuera no se lo limita; una vez adentro del piso, no puede salir
    if (!e.adentro && adentroDelPiso(e)) e.adentro = true;
    if (e.adentro) encerrar(e);
    andar8(e, e.x - x0, e.y - y0, dt);                         // v192: caminata en 8 direcciones (solo River 1–4)
    vigilarTurno(e, p, s, dt, Math.hypot(e.x - x0, e.y - y0), dd, paso);   // v194: progreso real con el turno tomado
    e.recorrido += Math.hypot(e.x - x0, e.y - y0);            // los pasos avanzan con lo que camina
    if (Math.hypot(e.x - x0, e.y - y0) > 0.01) { e.mx = e.x - x0; e.my = e.y - y0;   // hacia dónde camina (para elegir paso de costado / de frente / de espaldas)
      // v92: tramo = distancia desde que ARRANCÓ a caminar (si estuvo más de 0,15 s sin moverse, empieza otro tramo: transición 02 → 03)
      if (e.ultMov == null || tiempo - e.ultMov > 0.15) e.tramo = 0;
      e.tramo = (e.tramo || 0) + Math.hypot(e.x - x0, e.y - y0); e.ultMov = tiempo;
      avanzarReloj(e, e.x - x0, e.y - y0, dt); }   // v93: reloj de caminata propio del rival (solo corre mientras se desplaza; la pausa no lo llama)
  }

  const azar = ([a, b]) => a + Math.random() * (b - a);
  /* v83 — variantes de golpe de los rivales que son referentes (Cacho, El Gallego, Cabeza de Poronga, El Abuelo: js/golpes_ab.js).
     Rota A → B → su golpe de siempre; si la elegida no llega a la distancia actual, prueba las otras (nunca una nueva por cuadro:
     se decide UNA vez al empezar el golpe). */
  const COMBO_RIVAL = { prob: 0.35, pausa: 0.14 };
  const variantesDe = e => { const D = (window.SPRITES_ENEMIGOS || {})[e.luch.def.id]; return D && D.variantes ? D : null; };
  function alcanceEnemigo(e, golpe, v) {
    const D = v && variantesDe(e), a = D && D.anim[golpe + v], m = a && D.frames[a[e.face < 0 ? 'izq' : 'der']];
    return m && m.alcance != null ? m.alcance : ALCANCE[golpe];
  }
  function elegirVariante(e, dist) {
    e.var = '';
    const D = variantesDe(e); if (!D || (e.golpe !== 'pina' && e.golpe !== 'patada')) return;
    e.cicloVar = e.cicloVar || { pina: 0, patada: 0 };
    const n = D.variantes.length, i0 = e.cicloVar[e.golpe]++;
    for (let k = 0; k < n; k++) { const v = D.variantes[(i0 + k) % n]; if (dist < alcanceEnemigo(e, e.golpe, v) * (e.jefe ? 1.1 : 1) * 0.95) { e.var = v; return; } }
    e.var = D.variantes[i0 % n];
  }
  const cfgIA = e => e.iaPolicia ? DC.policia.defensa : e.jefeDefensa ? DC.ia.jefe : DC.ia.comun;
  // v32: ¿el jugador amenaza a este enemigo? cerca, en la misma línea y mirándolo
  const amenaza = (e, ia) => { const p = jugador, s0 = escalaEn(e.y);
    return Math.abs(p.x - e.x) < ia.distanciaAmenaza * s0 && Math.abs(p.y - e.y) < PROF_GOLPE * factorProf(e.y) * 1.5 && (e.x - p.x) * p.face > 0; };
  // Entra en defensa si está disponible. porCadena: viene de una cadena de golpes (ignora el enfriamiento de la IA).
  function entrarDefensa(e, porCadena) {
    if (!e.puedeCubrirse) return false;
    if (!porCadena && e.enfriarDef > 0) return false;
    if (!e.jefeDefensa && enemigos.filter(o => o !== e && o.st === 'defensa' && !o.jefeDefensa).length >= DC.ia.comun.maxCubriendose) return false;
    soltarFicha(e); e.st = 'defensa'; e.t = 0; e.defT = DC.ia.entrada + azar(cfgIA(e).duracion) + DC.ia.salida; e.defPendiente = null; e.golpesSinAccion = 0;
    console.info(`[Defensa] ${e.luch.nombreHUD} se cubre${porCadena ? ' (salida de cadena)' : ''} · recibe ${D.porcentajeDanio({ idEnemigo: e.luch.def.id, nivel, cubriendose: true })} % del daño`);
    return true;
  }

  function duracionDolorEnemigo(e) { return e.dolor || (animEnemigos[e.luch.def.id] ? 0.34 : TIEMPO.dolorEnemigo); }

  /* ---------------- v35: PODER (tecla L) — lógica compartida por los tres personajes ---------------- */
  // Cada muerte DEFINITIVA por un ataque NORMAL del jugador suma una unidad (una sola vez por enemigo).
  // Agotar la primera vida de un especial no pasa por acá. v37: si el golpe que lo derrotó fue el PODER
  // (e.origenDanio === 'poder', marcado en aplicarPoder y conservado hasta que se confirma la muerte),
  // la derrota se procesa igual (KO, rivales, oleadas, victoria) pero NO suma carga.
  function contarDerrota(e) {
    if (e.contado) return; e.contado = true;
    sumarBaja(e);                                                     // v39: +100 una sola vez, sea cual sea el remate
    if (e.origenDanio === 'poder') { console.info(`[Poder] derrota de ${e.luch.nombreHUD} por el poder → no suma (carga ${poderCarga}/${PD.CARGA_TOTAL})`); return; }
    if (poderCarga < PD.CARGA_TOTAL) poderCarga++;
    console.info(`[Poder] derrota de ${e.luch.nombreHUD} → carga ${poderCarga}/${PD.CARGA_TOTAL}`);
  }
  /* ---- v39: PUNTAJE — se cuenta en los eventos reales (golpe aplicado, baja, muerte, cierre), nunca al dibujar ---- */
  // Daño real quitado por el jugador (antes − después, ya con bloqueo y sin pasar de lo que quedaba).
  function sumarDanio(e, vidaAntes, tipo) {
    const quitado = Math.max(0, vidaAntes - Math.max(0, e.luch.vida));
    if (quitado <= 0) return 0;
    const pts = quitado * PT.porUnidad[tipo];
    puntaje += pts; ptsNivel.danio += pts;
    console.info(`[Puntaje] ${tipo}: ${+quitado.toFixed(3)} de vida × ${PT.porUnidad[tipo]} = ${+pts.toFixed(3)} → total ${+puntaje.toFixed(3)}`);
    return pts;
  }
  function sumarBaja(e) {                                // se llama una sola vez por enemigo (contarDerrota tiene la guarda)
    puntaje += PT.baja; ptsNivel.bajas += PT.baja;
    console.info(`[Puntaje] baja definitiva de ${e.luch.nombreHUD}: +${PT.baja} → total ${+puntaje.toFixed(3)}`);
  }
  function penalizarMuerte() {
    const quita = Math.min(PT.muerte, puntaje);         // nunca debajo de 0: se descuenta solo lo que hay
    puntaje -= quita; ptsNivel.penal += quita;
    console.info(`[Puntaje] muerte del jugador: −${+quita.toFixed(3)} → total ${+puntaje.toFixed(3)}`);
  }
  const puntajeVisible = () => Math.floor(puntaje + 1e-6);
  // Resultado para un ranking futuro (no hay pantalla ni servicio de ranking todavía): queda en localStorage.
  function guardarResultado(completa) {
    const r = { nombre: sel.playerName, referente: sel.referenteName, puntaje: puntajeVisible(),
                condicion: completa ? 'campaña completa' : 'prueba', modo: modoPartida, desdeNivel: nivelInicioPartida, fecha: new Date().toISOString() };
    try { localStorage.setItem('barra14.ultimoResultado', JSON.stringify(r)); } catch (err) {}   // v40: el ranking va aparte (js/ranking.js)
    window.BB_RESULTADO = r;
    console.info('[Resultado]', JSON.stringify(r));
  }

  // v40: registra la partida en el ranking (una sola vez por partida; Ranking además no duplica por id)
  function registrarEnRanking(procedencia) {
    if (resultadoRanking && resultadoRanking.id === partidaId) return resultadoRanking;
    if (trucosPartida || (CAMP && CAMP.conTrucos)) {                  // v72: con trucos de creador NO se guarda nada en el ranking
      resultadoRanking = { estado: 'trucos', lista: window.Ranking.leer().lista, id: partidaId, total: puntajeVisible(), procedencia };
      console.info(`[Ranking] partida con trucos de creador: no se registra (puntaje ${resultadoRanking.total})`);
      return resultadoRanking;
    }
    try {
      resultadoRanking = window.Ranking.registrar({ id: partidaId, nombre: sel.playerName, referente: sel.referenteName, puntaje: puntajeVisible(), procedencia });
    } catch (err) {                                                   // nunca se traba la transición a la pantalla 11
      resultadoRanking = { estado: 'error', lista: [], mensaje: 'No se pudo guardar el puntaje en este navegador.' };
    }
    resultadoRanking.id = partidaId; resultadoRanking.total = puntajeVisible(); resultadoRanking.procedencia = procedencia;
    console.info(`[Ranking] ${resultadoRanking.estado} · puesto ${resultadoRanking.puesto} de ${resultadoRanking.cantidad} · ${resultadoRanking.total}`);
    return resultadoRanking;
  }
  function dibujarRanking() {
    const r = resultadoRanking || { lista: window.Ranking.leer().lista };
    let mensaje = null, aviso = null, resaltar = null;
    if (r.estado === 'nuevo' || r.estado === 'repetido') {           // v41: siempre se muestra puntaje final y posición
      if (r.puesto <= window.Ranking.MAX_VISIBLES) resaltar = r.id;
      mensaje = `Tu posición: ${r.puesto} de ${r.cantidad} · Puntaje: ${r.total}`;
    } else if (r.estado === 'fuera') mensaje = `Tu puntaje: ${r.total} · No ingresaste al top 50`;
    else if (r.estado === 'trucos') mensaje = `Tu puntaje: ${r.total} · Partida con trucos de creador: no entra al ranking`;   // v72
    else if (r.estado === 'error') { mensaje = `Tu puntaje: ${r.total}`; aviso = `${r.mensaje || 'No se pudo guardar el puntaje.'} El ranking no se modificó.`; }
    if (r.avisoDanado) aviso = 'El ranking guardado tenía datos dañados: se conservó lo que se pudo leer (copia en barra14.ranking.v1.danado).';
    window.Ranking.dibujarPantalla11(g, MUNDO.w, MUNDO.h, { fondo: fondo11, logo: logoTitulo, lista: r.lista, victoria: true, resaltarId: resaltar, mensaje, aviso,
                                                            etiqueta: r.procedencia === 'prueba' ? 'Partida de prueba' : null,
                                                            pie: CAMP ? `ENTER o ESC: volver ${CAMP.galpon ? 'al galpón' : 'a la campaña'}` : 'ENTER: nueva partida   ·   ESC: menú de niveles' });   // v64
  }

  /* ---- v39: secuencia de fin de nivel: de frente, la vida se convierte en puntos ---- */
  function empezarConteo() {
    const p = jugador, vmax = p.luch.vidaMax;
    const frac = Math.max(0, Math.min(1, p.luch.vida / vmax));
    const bonus = Math.round(PT.bonusVidaMax * frac);
    soltarTodo(); if (p.agarrado || p.st === 'agarre') soltar();
    reiniciarCombo(p);                                   // v43: cierre del nivel sin golpes pendientes
    if (dama) console.info('[Damajuana] el nivel cerró: se retira la damajuana'); dama = null;   // v44: no se recoge durante el conteo
    p.st = 'quieto'; p.t = 0; p.tecnica = null; p.jPendiente = null; p.giroPendiente = null; p.empujando = null; p.inv = 0;
    efectos = [];
    conteo = { t: 0, frac, bonus, acreditado: 0, dur: bonus > 0 ? PT.conteo.base + PT.conteo.porVidaCompleta * frac : 0, tick: 0, listo: false };
    estado = 'conteo'; estadoT = 0;
    console.info(`[Puntaje] nivel ${nivel} ganado · vida ${+p.luch.vida.toFixed(3)}/${vmax} → bonus ${bonus}`);
  }
  function actualizarConteo(dt) {
    const C0 = conteo; if (!C0) return;
    C0.t += dt;
    const tc = C0.t - PT.conteo.espera;
    const prog = C0.dur > 0 ? Math.max(0, Math.min(1, tc / C0.dur)) : 1;
    const objetivo = Math.round(C0.bonus * prog);
    if (objetivo > C0.acreditado) {                      // se acredita SOLO la diferencia: nunca se cobra dos veces
      const d = objetivo - C0.acreditado; C0.acreditado = objetivo; puntaje += d; ptsNivel.bonus += d;
      C0.tick -= dt; if (C0.tick <= 0) { sonidoConteo('tick'); C0.tick = PT.conteo.tick; }
    }
    if (prog >= 1 && !C0.listo) {
      C0.listo = true;
      if (C0.bonus > 0) sonidoConteo('fin');
      console.info(`[Puntaje] bonus de vida acreditado: +${C0.acreditado} · nivel: daño ${+ptsNivel.danio.toFixed(1)} · bajas ${ptsNivel.bajas} · penalización −${+ptsNivel.penal.toFixed(1)} · total ${puntajeVisible()}`);
      nivelesGanados.add(nivel);
      if (CAMP && CAMP.bloqueActual() && N.activo.set === CAMP.bloqueActual().set) { terminarNivelCampana(); return; }   // v64
      if (nivel >= N.TOTAL) {
        // v41 (etapa de pruebas): TODA victoria del nivel 10 se registra y abre la pantalla 11, también entrando directo.
        // La procedencia queda guardada ('campaña' = 1 al 10 en orden · 'prueba' = el resto) para separarlas más adelante.
        const completa = modoPartida === 'campaña' && nivelInicioPartida === 1 && N.PANTALLAS.every(P => nivelesGanados.has(P.n));
        if (completa) ganarBanderas();   // v106: banderas del club LOCAL (una sola vez por club del jugador)
        guardarResultado(completa);
        registrarEnRanking(completa ? 'campaña' : 'prueba');
        estado = 'ranking'; estadoT = 0;                                  // pantalla 11 (aunque falle el guardado: se avisa ahí)
        console.info(`[Campaña] nivel 10 ganado · ${completa ? 'campaña completa (1 al 10)' : 'partida de prueba'} → pantalla 11`);
      }
      else { estado = 'superado'; estadoT = 0; }
    }
  }
  // v64 — campaña de River: pantalla 1–9 ganada → se guarda dónde seguir; pantalla 10 ganada → bloque completo (una vez) → galpón.
  /* v106 — BANDERAS CONQUISTADAS (clubes sin galpón: todos menos River, que las guarda en su campaña de js/campana.js).
     Se registran SOLO al ganar el nivel 10 habiendo jugado el recorrido completo 1 → 10 en orden (el jefe ya fue derrotado: el nivel
     no se gana sin él). Elegir el club, entrar a sus escenarios, ganar la 9, perder o abandonar el duelo NO las conceden.
     Una sola vez por (club del jugador, club local): repetir la victoria no duplica nada. Clave 'barra14.trofeos.v1'. */
  const CLAVE_TROFEOS = 'barra14.trofeos.v1';
  const leerTrofeos = () => { try { return JSON.parse(localStorage.getItem(CLAVE_TROFEOS)) || {}; } catch (e) { return {}; } };
  function ganarBanderas() {
    const local = N.activo.sede; if (!local || !N.esVisitante(N.activo.club, N.activo.set)) return false;
    const T = leerTrofeos(), mios = T[N.activo.club] || (T[N.activo.club] = {});
    if (mios[local]) { console.info(`[Banderas] las de ${local} ya eran de ${N.activo.club}`); return false; }
    mios[local] = { fecha: Date.now(), referente: sel.id };
    try { localStorage.setItem(CLAVE_TROFEOS, JSON.stringify(T)); } catch (e) {}
    console.info(`[Banderas] ${N.activo.club} conquistó las banderas de ${local}`); return true;
  }
  const banderasDe = club => CAMP && club === CAMP.CLUB ? CAMP.trofeos() : Object.keys(leerTrofeos()[club] || {});   // v109: de la campaña
  function terminarNivelCampana() {
    const b = CAMP.bloqueActual();
    if (nivel < N.TOTAL) { CAMP.nivelGanado(nivel, puntaje); estado = 'superado'; estadoT = 0; return; }
    const primera = CAMP.completarBloque(b.id, puntaje);
    console.info(`[Campaña] bloque ${b.id} completo${primera ? '' : ' (ya estaba)'} · trofeos: ${CAMP.trofeos().join(', ')} · puntaje ${puntajeVisible()}`);
    if (CAMP.terminada() && !CAMP.estado.registrado) {   // resultado final: UNA sola vez, al terminar los cuatro bloques
      guardarResultado(true); registrarEnRanking('campaña'); CAMP.marcarRegistrado();
    }
    const Tg = CAMP.TROFEOS[b.rival];
    galpon.aviso = CAMP.terminada() ? null : !CAMP.galpon ? `¡Le ganaste a ${b.nombre}! Sus banderas ya son tuyas.` : (!Tg || !(Tg.capa || Tg.panel) ? `¡Le ganaste a ${b.nombre}! Sus banderas ya son ${CAMP.CLUB === 'river' ? 'del Tablón' : 'tuyas'}.` : `¡Le ganaste a ${b.nombre}! Sus trapos ya cuelgan en la ${Tg.sala ? 'otra sala' : 'sala principal'}.`); galpon.avisoT = 0;
    if (CAMP.galpon) cargarGalpon(); estado = 'menu'; estadoT = 0; pausado = false; soltarTodo();
    if (window.Musica) Musica.detener(false);
  }
  // CONTINUAR (botón dibujado en el fondo · Enter · J): idempotente, bloquea dobles pulsaciones durante la transición.
  function continuarCampana() {
    if (!CAMP || estado !== 'menu' || galpon.transicion || galpon.mov) return;   // v108: no mientras camina entre salas
    galpon.transicion = true; setTimeout(() => { galpon.transicion = false; }, 900);
    if (CAMP.terminada()) {                                   // cierre: resultados (ya registrados una vez); no arranca otro bloque
      if (!resultadoRanking && CAMP.conTrucos) resultadoRanking = { lista: window.Ranking.leer().lista, total: CAMP.estado.puntaje, estado: 'trucos', procedencia: 'campaña' };   // v72
      if (!resultadoRanking) resultadoRanking = { lista: window.Ranking.leer().lista, total: CAMP.estado.puntaje, estado: 'repetido', procedencia: 'campaña',
                                                 ...(() => { const L = window.Ranking.leer().lista; const i = L.findIndex(x => x.id === CAMP.estado.partidaId); return i >= 0 ? { puesto: i + 1, cantidad: L.length, id: CAMP.estado.partidaId } : { estado: 'fuera' }; })() };
      fondo11 = fondo11 || imgDe(window.Ranking.FONDO); if (!fondo11) pedir(window.Ranking.FONDO, 'alta').then(im => { fondo11 = im; });
      estado = 'ranking'; estadoT = 0; return;
    }
    const b = CAMP.bloqueActual();
    if (!b) { console.warn('[Campaña] ningún rival pendiente tiene escenarios todavía'); galpon.transicion = false; return; }   // v112: solo consola   // v109
    N.configurar(CAMP.CLUB || 'river', b.set);   // v133: el club del JUGADOR (antes fijo en River)
    for (const P of N.PANTALLAS) if (!minis[P.mini]) pedir(P.mini).then(im => { if (im) minis[P.mini] = im; });   // miniaturas de la pantalla de carga
    console.info(`[Campaña] bloque ${CAMP.indiceBloque() + 1}: ${b.nombre} ${b.lugar} · pantalla ${CAMP.estado.nivel}`);
    prepararNivel(CAMP.estado.nivel || 1, 'campana');
  }
  function nuevaCampana() {
    if (!CAMP || estado !== 'menu' || galpon.transicion || !CAMP.hayProgreso()) return;
    CAMP.nueva(sel.id); resultadoRanking = null; galpon.aviso = CAMP.galpon ? 'Campaña nueva: el galpón quedó vacío.' : 'Campaña nueva: cero rivales vencidos.'; galpon.avisoT = 0; console.info('[Campaña] nueva campaña');
  }
  /* v108 — Galpón en DOS SALAS. Capas: fondo de la sala → trofeos ganados de esa sala → hinchas que tapan → referente elegido.
     El referente sale de SUS imágenes: sentado con mate (CAMP.MATE) o sus poses de juego (guardia, caminata, de espaldas).
     Cambiar de sala no toca la campaña: ni avanza, ni premia, ni reinicia. */
  const BOTON_NUEVA = CAMP ? CAMP.BOTONES.nueva : { x: 30, y: 880, w: 250, h: 42 };
  const GAL = { fundido: 0.35, giro: 0.18, camino: 2.0 };   // segundos: levantarse (fundido entre sus sprites) · darse vuelta · caminar
  function cargarGalpon() {
    if (!CAMP || !CAMP.galpon) return;
    const fijar = (src, f) => { const im = imgDe(src); if (im) f(im); else pedir(src, 'alta').then(x => { if (x) f(x); }); };
    galpon.sala = 0; galpon.mov = null; galpon.faltas = [];
    galpon.fondoSrc = CAMP.SALAS[0].fondo; galpon.radio = null; galpon.ocluye = null; galpon.ocluyes = [];
    CAMP.SALAS.forEach((S, i) => {
      fijar(S.fondo, im => { galpon.fondos[i] = im; if (!i) galpon.fondo = im; });
      if (S.ocluye) fijar(S.ocluye.src, im => { galpon.ocluyes[i] = im; if (i) galpon.ocluye = im; });   // v157: una capa por sala
      if (S.radio && S.radio.src) fijar(S.radio.src, im => { galpon.radio = im; });
    });
    galpon.cajas = {};   // v199: cajones de la sala principal (sectores sin trofeo)
    for (const [r, C] of Object.entries(CAMP.CAJAS || {})) fijar(C.src, im => { galpon.cajas[r] = im; });
    const M = CAMP.MATE[sel.id]; galpon.mate = null;
    if (M) fijar(M.src, im => { galpon.mate = im; }); else galpon.faltas.push(`sentado con mate de ${sel.id}`);
    for (const club of Object.keys(CAMP.TROFEOS)) if (CAMP.TROFEOS[club].capa) fijar(CAMP.TROFEOS[club].capa, im => { galpon.capas[club] = im; });
    // v151: trofeos por piezas (trapos + instrumentos) de los rivales VENCIDOS: solo esos se piden y se dibujan
    for (const club of CAMP.trofeos()) { const D = CAMP.disponer && CAMP.disponer(club, CAMP.TROFEOS[club]); if (D) for (const o of [...D.trapos, ...D.inst]) fijar(o.src, im => { galpon.piezas[o.src] = im; }); }
    { const DP = CAMP.DOBLADAS_PENDIENTES || {}; const L = Object.keys(DP).filter(c => CAMP.trofeos().includes(c)); if (L.length) console.warn('[Galpón] banderas DOBLADAS pendientes (falta arte con volumen; no se muestran como cuadritos):\n · ' + L.map(c => c + ': ' + DP[c].join(', ')).join('\n · ')); }
    { const sinInst = Object.keys(CAMP.TROFEOS).filter(c => CAMP.TROFEOS[c].panel && CAMP.INSTRUMENTOS_FALTANTES(c)).map(c => CAMP.INSTRUMENTOS_FALTANTES(c));
      if (sinInst.length) console.warn('[Galpón] instrumentos PENDIENTES (espacio reservado, no se simulan):\n · ' + sinInst.join('\n · ')); }
    // poses del referente para el galpón (guardia, de espaldas, caminar de costado): las mismas imágenes del juego
    const D = defFramesJugador;
    if (!D) { galpon.faltas.push(`poses de ${sel.id}`); console.warn('[Galpón] el referente no tiene poses cargables:', sel.id); return; }
    const ids = new Set();
    for (const nom of ['quieto', 'quietoEspalda', 'caminaLadoDer', 'caminaLadoIzq']) for (const p of (D.anim[nom] || [])) {
      const id = typeof p === 'object' ? p.id : p; ids.add(id);
      const par = (D.pares || {})[id] || Object.keys(D.pares || {}).find(k => D.pares[k] === id); if (par) ids.add(par);
    }
    for (const nom of ['quietoEspalda', 'caminaLadoDer', 'caminaLadoIzq']) if (!(D.anim[nom] || []).length) galpon.faltas.push(`${nom} de ${sel.id}`);
    // v144 — galpones nuevos: sin imagen «sentado con mate», el referente queda PARADO junto a la silla con su propio cuadro de descanso
    // (sostener su recuperación: choripán, vino, fernet, hamburguesa…), nunca en guardia. Si no tiene ese cuadro, no se dibuja nada.
    if (CAMP.DESCANSO && !CAMP.MATE[sel.id]) { const d = (D.anim.damajuana || [])[1]; if (d) ids.add(typeof d === 'object' ? d.id : d); else galpon.faltas.push(`pose de descanso (sostener su recuperación) de ${sel.id}`); }
    const R = CAMP.REPOSO && CAMP.REPOSO[sel.id]; galpon.reposo = null;   // v111: brazos cruzados de perfil (imagen propia) o nada
    if (R && R.src) fijar(R.src, im => { galpon.reposo = im; });
    else galpon.faltas.push(`parado con brazos cruzados de perfil a la derecha de ${sel.id}${R && R.falta ? ` (${R.falta})` : ''}`);
    const A = { def: D, imgs: {}, imgsEspejo: {} }; galpon.ref = A;
    for (const id of ids) { const f = D.frames[id]; if (!f) continue; fijar(f.src, im => { A.imgs[id] = im; }); if (f.espejo) fijar(f.espejo, im => { A.imgsEspejo[id] = im; }); }
    if (galpon.faltas.length) console.warn('[Galpón] recursos faltantes:', galpon.faltas.join(' · '));
  }
  // un cuadro del referente (como dibujarFrames, pero con posición y alto propios del galpón)
  function dibujarRefGalpon(pose, x, y, alto, face, alpha = 1) {
    const A = galpon.ref; if (!A || pose == null) return false;
    let id, espejo = false;
    if (typeof pose === 'object') { id = pose.id; espejo = !!pose.espejo; }
    else {
      id = pose; const mira = A.def.frames[id] && A.def.frames[id].mira, dir = mira === 'der' ? 1 : mira === 'izq' ? -1 : 0;
      if (dir && dir !== face) { const P = A.def.pares || {}, par = P[id] || Object.keys(P).find(k => P[k] === id); if (par) id = par; else espejo = true; }
    }
    const m = A.def.frames[id]; let img = A.imgs[id]; if (!m || !img) return false;
    let ancla = m.ancla;
    if (espejo && A.imgsEspejo[id]) { img = A.imgsEspejo[id]; ancla = anW(img) - m.ancla; espejo = false; }
    const k = alto / A.def.altoReferencia[m.grupo], s = alto / ALTO_PERSONAJE;
    g.save(); g.globalAlpha = 0.35 * alpha; g.fillStyle = '#000'; g.beginPath(); g.ellipse(x, y, 70 * s, 14 * s, 0, 0, 7); g.fill(); g.restore();
    g.save(); g.globalAlpha = alpha; g.translate(x, y); g.scale(espejo ? -1 : 1, 1);
    g.drawImage(img, -ancla * k, -m.pie * k, anW(img) * k, anH(img) * k); g.restore();
    galpon.cuadro = id + (espejo ? '~' : '');
    return true;
  }
  // v144: pose parada de la sala principal sin mate: River conserva su guardia (todos sus referentes tienen mate); los galpones nuevos, el descanso
  const poseSala0 = () => { const D = galpon.ref && galpon.ref.def; if (!D || CAMP.SIN_DE_PIE) return null;   // v198: galpones del interior: solo sentado (si falta la imagen, la silla queda vacía)
    if (!CAMP.DESCANSO) return D.anim.quieto[0]; return (D.anim.damajuana || [])[1] || null; };
  const pasoGalpon = (nom, t) => { const L = galpon.ref && galpon.ref.def.anim[nom]; if (!L || !L.length) return null; const ms = msPaso(galpon.ref.def, nom) || 130; return L[Math.floor(t * 1000 / ms) % L.length]; };
  // v111: pose de descanso (brazos cruzados, perfil derecho) = imagen propia del referente; sin ella no se sustituye por nada
  const tieneReposo = () => !!galpon.reposo;
  function poseReposo() { return tieneReposo() ? 'reposo' : null; }
  function dibujarReposo(x, y, alto) {
    const im = galpon.reposo; if (!im) return false; const s = alto / ALTO_PERSONAJE, k = alto / anH(im);
    g.save(); g.globalAlpha = 0.35; g.fillStyle = '#000'; g.beginPath(); g.ellipse(x, y, 70 * s, 14 * s, 0, 0, 7); g.fill(); g.restore();
    g.drawImage(im, x - anW(im) * k / 2, y - alto, anW(im) * k, alto); galpon.cuadro = 'reposo'; return true;
  }
  function irASala(i) {
    if (!CAMP || estado !== 'menu' || galpon.mov || galpon.transicion || i === galpon.sala || !CAMP.SALAS[i]) return;
    galpon.mov = { de: galpon.sala, a: i, t0: tiempo }; galpon.aviso = null;
    console.info(`[Galpón] ${CAMP.SALAS[galpon.sala].nombre} → ${CAMP.SALAS[i].nombre} (${sel.id})`);
  }
  function dibujarSalaGalpon(i, ox) {
    const S = CAMP.SALAS[i], f = galpon.fondos[i]; if (!S) return;
    g.save(); g.translate(ox, 0);
    if (f) g.drawImage(f, 0, 0, MUNDO.w, MUNDO.h); else { g.fillStyle = ID.carbon; g.fillRect(0, 0, MUNDO.w, MUNDO.h); }
    if (i === 0 && CAMP.CAJAS) for (const [r, C] of Object.entries(CAMP.CAJAS)) {   // v199: cajones mientras el sector no exhibe instrumentos
      const im = galpon.cajas && galpon.cajas[r]; if (!im) continue;
      if (CAMP.trofeos().includes(r)) { const D = CAMP.disponer && CAMP.disponer(r, CAMP.TROFEOS[r]); if (D && D.inst && D.inst.length) continue; }
      g.drawImage(im, C.x, C.y, anW(im), anH(im));
    }
    for (const club of CAMP.trofeos()) { const T = CAMP.TROFEOS[club]; if (T && T.sala === i) dibujarTrofeo(club, T); }
    { const O = galpon.ocluyes && galpon.ocluyes[i]; if (S.ocluye && O) g.drawImage(O, S.ocluye.x, S.ocluye.y, anW(O), anH(O)); }   // v157: personas SIEMPRE delante de los trofeos
    if (S.radio && S.radio.src && galpon.radio) { g.drawImage(galpon.radio, S.radio.x, S.radio.y, anW(galpon.radio), anH(galpon.radio)); dibujarParlante(S.radio, galpon.radio); }
    else if (S.radio && !S.radio.src && f) dibujarParlante(S.radio, f);   // v144: radio dibujada en el fondo
    g.restore();
  }
  /* v121 — el tango del galpón «sale» de la radio: solo la membrana del parlante late apenas y salen ondas tenues que se desvanecen.
     Solo mientras el tango del galpón está sonando de verdad (no pausado ni silenciado, con botón o con M). Con «movimiento reducido»: quieta.
     El latido es una animación suave a ritmo de tango (≈ 2 por segundo): NO analiza el audio real. */
  const radioSonando = () => { const M = window.Musica, a = M && M._audio; return estado === 'menu' && !!a && M.nivel === 'galpon' && !a.paused && !a.muted && a.volume > 0; };
  function dibujarParlante(R, im) {
    galpon.radioActiva = radioSonando() && !movReducido.matches;
    if (!galpon.radioActiva) return;
    // v131: efecto bien visible: la membrana late (≈ 2 por segundo), salen ondas doradas y unas notitas musicales que suben y se desvanecen
    const P = R.parlante, t = tiempo, lat = Math.exp(-((t * 1.9) % 1) * 5);
    const s = 1 + 0.08 * lat;
    g.save(); g.beginPath(); g.arc(P.x, P.y, P.r * 0.95, 0, 7); g.clip();
    g.translate(P.x, P.y); g.scale(s, s); g.translate(-P.x, -P.y);
    if (R.src) g.drawImage(im, R.x, R.y, anW(im), anH(im)); else g.drawImage(im, 0, 0, MUNDO.w, MUNDO.h); g.restore();
    g.save(); g.lineCap = 'round';
    g.shadowColor = 'rgba(255,214,110,0.9)'; g.shadowBlur = 8;
    for (let k = 0; k < 4; k++) {
      const f = ((t * 0.9) + k / 4) % 1, rr = P.r * 1.2 + f * 70, a = (1 - f) * (0.55 + 0.35 * lat);
      g.strokeStyle = `rgba(255,226,150,${a.toFixed(3)})`; g.lineWidth = 4 - 2.5 * f;
      g.beginPath(); g.arc(P.x, P.y, rr, -2.0, 0.8); g.stroke();
    }
    g.shadowBlur = 6; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let k = 0; k < 3; k++) {                                     // notitas ♪ ♫ que salen del parlante
      const f = ((t * 0.45) + k / 3) % 1, x = P.x + 18 + f * 46 + Math.sin((t + k) * 3) * 6, y = P.y - 14 - f * 70, a = Math.sin(f * Math.PI) * 0.9;
      g.globalAlpha = a; g.fillStyle = '#FFE27A'; g.font = `bold ${16 + 6 * (1 - f) | 0}px Verdana, sans-serif`;
      g.fillText(k % 2 ? '♫' : '♪', x, y);
    }
    g.restore();
  }

  function dibujarMate(ox, alpha) {
    const M = CAMP.MATE[sel.id]; if (!M || !galpon.mate || alpha <= 0) return false;
    g.save(); g.globalAlpha = alpha; g.drawImage(galpon.mate, M.x + ox, M.y, anW(galpon.mate), anH(galpon.mate)); g.restore(); return true;
  }

  /* v151 — TROFEOS POR PIEZAS (v152: sin vista ampliada; los paneles son decorativos).
     dibujarTrofeo: trapos (con sombra suave, como colgados de la malla) e instrumentos sobre el estante, en el lugar que calcula
     Campana.disponer(). River (sala principal) conserva su capa original. */
  let huecosDebug = false;
  function dibujarTrofeo(club, T) {
    if (T.capa) { const im = galpon.capas[club]; if (im) g.drawImage(im, T.x, T.y, anW(im), anH(im)); return; }
    const D = CAMP.disponer(club, T); if (!D) return;
    g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 3; g.shadowOffsetX = 1.5; g.shadowOffsetY = 2.5;
    for (const o of D.trapos) { const im = galpon.piezas[o.src]; if (im) g.drawImage(im, o.x, o.y, o.w, o.h); }
    g.shadowBlur = 4; g.shadowOffsetX = 0; g.shadowOffsetY = 2;
    for (const o of D.inst) { const im = galpon.piezas[o.src]; if (im) g.drawImage(im, o.x, o.y, o.w, o.h); }
    g.restore();
    if (huecosDebug) {   // v152: solo para revisar (consola: BB_DEBUG.huecos = true) — zona reservada y lugar de cada instrumento pendiente
      g.save(); g.setLineDash([4, 3]); g.lineWidth = 1.5; g.strokeStyle = 'rgba(0,255,255,0.9)'; g.strokeRect(D.zona.x, D.zona.y0, D.zona.w, D.zona.y1 - D.zona.y0);
      g.strokeStyle = 'rgba(255,200,0,0.95)'; for (const o of D.huecos) g.strokeRect(o.x, o.y, o.w, o.h); g.restore();
    }
  }
  // v109: botones del galpón. «neon» = navegación entre salas: fondo rojo oscuro, letras blancas, borde rojo luminoso con resplandor
  // que sube y baja en ~2 s (fijo con «movimiento reducido»). El texto no pulsa. Cursor encima o foco de teclado (TAB) → más brillo y aro blanco.
  const movReducido = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { return { matches: false }; } })();
  function botonGalpon(B, txt, tipo, clave, pulsa = true) {
    const activo = galpon.hover === clave || galpon.foco === clave, lineas = B.lineas || [txt];
    g.save();
    if (tipo === 'neon') {   // v111: fondo blanco hueso, borde dorado y resplandor dorado que pulsa suave (~2 s; fijo con movimiento reducido)
      const pulso = !pulsa || movReducido.matches ? 0.5 : 0.5 + 0.5 * Math.sin(tiempo * Math.PI);   // v113: resplandor sutil
      g.shadowColor = activo ? ID.doradoClaro : ID.doradoA(0.6); g.shadowBlur = activo ? 12 : pulsa ? 3 + 5 * pulso : 4;
      const kk = B.k || 1;                                          // v115: escala del botón (galpón 70 %), fondo gris claro
      g.fillStyle = activo ? '#E4E4E1' : '#D2D2CE'; g.fillRect(B.x, B.y, B.w, B.h);
      g.lineWidth = (activo ? 5 : 4) * kk; g.strokeStyle = activo ? ID.doradoClaro : ID.dorado; g.strokeRect(B.x, B.y, B.w, B.h); g.strokeRect(B.x, B.y, B.w, B.h);
      g.shadowBlur = 0; g.lineWidth = 1.5 * kk; g.strokeStyle = ID.doradoBase; g.strokeRect(B.x + 5 * kk, B.y + 5 * kk, B.w - 10 * kk, B.h - 10 * kk);
    } else {
      g.fillStyle = tipo === 'fuerte' ? (activo ? 'rgba(150,26,32,0.96)' : 'rgba(122,18,24,0.92)') : (activo ? ID.carbonA(0.95) : ID.carbonA(0.85));
      g.fillRect(B.x, B.y, B.w, B.h);
      g.strokeStyle = activo ? ID.doradoClaro : ID.dorado; g.lineWidth = tipo === 'fuerte' ? 3 : 2; g.strokeRect(B.x, B.y, B.w, B.h);   // v111: todos los bordes dorados
    }
    if (galpon.foco === clave) { g.setLineDash([10, 6]); g.strokeStyle = ID.doradoClaro; g.lineWidth = 3; g.strokeRect(B.x - 7, B.y - 7, B.w + 14, B.h + 14); g.setLineDash([]); }
    g.restore();
    const tam = (tipo === 'neon' ? 27 : tipo === 'fuerte' ? 28 : 19) * (tipo === 'neon' ? (B.k || 1) : 1), alto = tam * 1.12, y0 = B.y + B.h / 2 - (lineas.length - 1) * alto / 2 + tam * 0.36;
    if (tipo === 'neon') {                                       // letras doradas con contorno oscuro dorado: se leen sobre el hueso
      g.save(); g.font = `bold ${tam}px Verdana, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.lineJoin = 'round';
      lineas.forEach((l, k) => { g.lineWidth = 3 * (B.k || 1); g.strokeStyle = ID.doradoOscuro; g.strokeText(l, B.x + B.w / 2, y0 + k * alto); g.fillStyle = ID.doradoBase; g.fillText(l, B.x + B.w / 2, y0 + k * alto); });
      g.restore();
    } else lineas.forEach((l, k) => texto(l, B.x + B.w / 2, y0 + k * alto, tam, '#ffffff', 'center'));
  }
  /* v109 — PANTALLA DE CAMPAÑA de las barras sin galpón propio (todas menos River): los 12 rivales en orden, con su estado.
     No reutiliza el galpón de River. Mismo CONTINUAR / NUEVA CAMPAÑA / TAB que el galpón. */
  function dibujarCampanaClub() {
    const f = fondoMenu; if (f) g.drawImage(f, 0, 0, MUNDO.w, MUNDO.h); else { g.fillStyle = ID.carbon; g.fillRect(0, 0, MUNDO.w, MUNDO.h); }
    velo(0.62);
    const C = N.CLUBES[N.activo.club], E = CAMP.estado, b = CAMP.bloqueActual(), fin = CAMP.terminada();
    texto(`CAMPAÑA DE ${C.corto} · ${CAMP.CATEGORIA === 'ascenso' ? 'ASCENSO' : 'PRIMERA'}`, MUNDO.w / 2, 92, 54, ID.dorado, 'center');
    texto(fin ? `¡CAMPAÑA COMPLETADA! Venciste a los ${CAMP.BLOQUES.length} rivales de ${CAMP.CATEGORIA === 'ascenso' ? 'el Ascenso' : 'Primera'}.` : b ? `Rival ${CAMP.indiceBloque() + 1} de ${CAMP.BLOQUES.length}: ${b.nombre.toUpperCase()} ${b.lugar}  ·  Nivel ${E.nivel || 1} de 10` : 'Los próximos rivales todavía no tienen escenarios',
          MUNDO.w / 2, 146, 26, ID.hueso, 'center');
    const x0 = 170, y0 = 210, colW = 680, filaH = 82;
    const porCol = Math.max(1, Math.ceil(CAMP.BLOQUES.length / 2)), unaCol = CAMP.BLOQUES.length <= 4;   // v197: 8 (Primera) o 3 (Ascenso)
    CAMP.BLOQUES.forEach((B, i) => {
      const x = unaCol ? (MUNDO.w - (colW - 40)) / 2 : x0 + (i < porCol ? 0 : colW), y = y0 + (unaCol ? i : i % porCol) * filaH, venc = E.completados.includes(B.id), act = b && B.id === b.id;
      g.fillStyle = act ? 'rgba(122,18,24,0.85)' : ID.carbonA(0.7); g.fillRect(x, y, colW - 40, filaH - 14);
      g.strokeStyle = act ? ID.doradoClaro : venc ? ID.dorado : ID.huesoSuave; g.lineWidth = act ? 3 : 1.5; g.strokeRect(x, y, colW - 40, filaH - 14);
      texto(`${i + 1}. ${B.nombre}`, x + 22, y + 44, 28, venc ? ID.dorado : ID.hueso);
      const est = venc ? 'VENCIDO · banderas ganadas' : act ? `ACTUAL · nivel ${E.nivel || 1} de 10` : B.jugable ? 'pendiente' : 'sin escenarios todavía';
      texto(est, x + colW - 64, y + 44, 20, venc ? ID.doradoClaro : act ? ID.hueso : ID.huesoSuave, 'right');
    });
    texto(galpon.aviso || 'ENTER: continuar  ·  TAB: botones  ·  N: nueva campaña  ·  ESC: volver al selector', MUNDO.w / 2, 744, 20, ID.huesoSuave, 'center');
    const BT = CAMP.BOTONES; botonGalpon(BT.continuar, 'CONTINUAR', 'fuerte', 'continuar');
    if (CAMP.hayProgreso() && !fin) botonGalpon(BT.nueva, 'NUEVA CAMPAÑA (N)', null, 'nueva');
  }
  // botones visibles en la sala actual, en orden de TAB
  function botonesGalpon() {
    if (!CAMP || galpon.mov) return [];
    const BT = CAMP.BOTONES, L = CAMP.galpon ? [galpon.sala === 0 ? ['otraSala', BT.otraSala] : ['volver', BT.volver], ['continuar', BT.continuar]] : [['continuar', BT.continuar]];
    if (CAMP.hayProgreso() && !CAMP.terminada()) L.push(['nueva', BT.nueva]);
    return L;
  }
  function accionGalpon(clave) {
    if (clave === 'otraSala') irASala(1); else if (clave === 'volver') irASala(0);
    else if (clave === 'continuar') continuarCampana(); else if (clave === 'nueva') nuevaCampana();
  }
  function dibujarGalpon() {
    if (!galpon.fondos[0]) { g.fillStyle = ID.carbon; g.fillRect(0, 0, MUNDO.w, MUNDO.h); texto('Cargando el galpón…', MUNDO.w / 2, MUNDO.h / 2, 28, ID.hueso, 'center'); return; }
    const W = MUNDO.w, S0 = CAMP.SALAS[0].referente, S1 = CAMP.SALAS[1].referente, mv = galpon.mov;
    if (mv) {                                                    // caminando entre salas: la cámara acompaña al referente
      const ida = mv.a > mv.de, t = tiempo - mv.t0, sentado = !!(CAMP.MATE[sel.id] && galpon.mate);
      if (!tieneReposo()) {                                      // v111: sin pose de descanso, solo se mueve la cámara; él sigue sentado
        const u = Math.max(0, Math.min(1, t / 1.2)), e = u * u * (3 - 2 * u), p = ida ? e : 1 - e;
        dibujarSalaGalpon(0, -p * W); if (!dibujarMate(-p * W, 1)) dibujarRefGalpon(poseSala0(), S0.pie.x - p * W, S0.pie.y, S0.alto, S0.mira || 1);
        dibujarSalaGalpon(1, (1 - p) * W);
        if (u >= 1) { galpon.sala = mv.a; galpon.mov = null; } return;
      }
      const tf = sentado ? GAL.fundido : 0, total = tf + GAL.giro + GAL.camino;
      const tc = ida ? t - tf : t - GAL.giro;                     // tiempo de caminata
      const u = Math.max(0, Math.min(1, tc / GAL.camino)), e = u * u * (3 - 2 * u), p = ida ? e : 1 - e;
      dibujarSalaGalpon(0, -p * W); dibujarSalaGalpon(1, (1 - p) * W);
      const seam = (1 - p) * W; if (seam > -60 && seam < W + 60) { const gr = g.createLinearGradient(seam - 50, 0, seam + 50, 0); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(0.5, 'rgba(0,0,0,0.75)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(seam - 50, 0, 100, MUNDO.h); }
      const A0 = ida ? S0 : S1, A1 = ida ? S1 : S0, face = ida ? 1 : -1;
      const x = A0.pie.x + (A1.pie.x - A0.pie.x) * e, y = A0.pie.y + (A1.pie.y - A0.pie.y) * e, h = A0.alto + (A1.alto - A0.alto) * e;
      if (ida && t < tf) {                                       // se levanta: del sentado a su guardia (sin inventar poses)
        const a = t / tf; dibujarMate(0, 1 - a); dibujarRefGalpon(poseSala0(), S0.pie.x, S0.pie.y, S0.alto, 1, a);   // TODO(arte): levantarse de la silla
      } else if (!ida && t < GAL.giro) {                         // se da vuelta y sale
        g.save(); g.translate(2 * S1.pie.x, 0); g.scale(-1, 1); dibujarReposo(S1.pie.x, S1.pie.y, S1.alto); g.restore();
      } else if (u < 1) {
        dibujarRefGalpon(pasoGalpon(ida ? 'caminaLadoDer' : 'caminaLadoIzq', Math.max(0, tc)), x, y, h, face);
      } else if (!ida && sentado && t < total + tf) {            // vuelve a sentarse
        const a = (t - GAL.giro - GAL.camino) / tf; dibujarRefGalpon(poseSala0(), S0.pie.x, S0.pie.y, S0.alto, -1, 1 - a); dibujarMate(0, a);
      } else {
        galpon.sala = mv.a; galpon.mov = null;
      }
      if (galpon.mov && u >= 1 && ida) { galpon.sala = mv.a; galpon.mov = null; }
      return;
    }
    const i = galpon.sala; dibujarSalaGalpon(i, 0);
    if (i === 0) { if (!dibujarMate(0, 1)) dibujarRefGalpon(poseSala0(), S0.pie.x, S0.pie.y, S0.alto, S0.mira); }
    else dibujarReposo(S1.pie.x, S1.pie.y, S1.alto);   // v111: brazos cruzados de perfil mirando los exhibidores (si falta: no se dibuja nada)
    // v112 — SIN cuadro informativo: el galpón no revela el próximo rival, su estadio, el número de rival/nivel ni los controles.
    // CONTINUAR sigue el orden guardado de la campaña. Los faltantes de recursos van solo a la consola de desarrollo (una vez).
    const fin = CAMP.terminada(), BT = CAMP.BOTONES;
    if (!galpon.avisoDev) { galpon.avisoDev = true; const se = CAMP.pendientesSinEscenarios ? CAMP.pendientesSinEscenarios() : [];
      if (se.length) console.warn('[Galpón] rivales sin escenarios todavía (se saltean hasta que existan):', se.map(x => x.id).join(', '));
      if (galpon.faltas.length) console.warn('[Galpón] recursos faltantes:', galpon.faltas.join(' · ')); }
    { // v110: «IR A LA OTRA SALA →» arriba de CONTINUAR, mismo borde derecho; la separación crece en pantallas chicas (≥ 12 px reales)
      const r = cv.getBoundingClientRect(), sc = Math.min(r.width / MUNDO.w, r.height / MUNDO.h) || 1, O = BT.otraSala, C = BT.continuar;
      const sep = Math.max(44, Math.min(64, 18 / sc)); O.x = C.x + C.w - O.w; O.y = C.y - sep - O.h; }   // v111: más separados
    botonGalpon(BT.continuar, 'CONTINUAR', 'neon', 'continuar', false);   // v113: mismo diseño hueso y dorado
    if (i === 0) botonGalpon(BT.otraSala, 'IR A LA OTRA SALA →', 'neon', 'otraSala'); else botonGalpon(BT.volver, '← VOLVER A LA SALA PRINCIPAL', 'neon', 'volver');
    if (CAMP.hayProgreso() && !fin) botonGalpon(BT.nueva, 'NUEVA CAMPAÑA (N)', null, 'nueva');
  }
  // Ruidito arcade sintetizado (WebAudio). Uno cada PT.conteo.tick s mientras suben los puntos, no uno por cuadro.
  let actx = null;
  function sonidoConteo(tipo) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const t0 = actx.currentTime, notas = tipo === 'fin' ? [[784, 0], [1175, 0.09]] : [[1320, 0]];
      for (const [f, d] of notas) {
        const o = actx.createOscillator(), gn = actx.createGain();
        o.type = 'square'; o.frequency.value = f;
        const largo = tipo === 'fin' ? 0.16 : 0.035;
        gn.gain.setValueAtTime(0.0001, t0 + d); gn.gain.exponentialRampToValueAtTime(0.06, t0 + d + 0.005);
        gn.gain.exponentialRampToValueAtTime(0.0001, t0 + d + largo);
        o.connect(gn).connect(actx.destination); o.start(t0 + d); o.stop(t0 + d + largo + 0.02);
      }
      window.BB_SONIDOS = (window.BB_SONIDOS || 0) + 1;
    } catch (err) {}
  }

  function activarPoder() {
    if (estado !== 'jugando' || pausado || pausaConsola) return;
    if (poderActivo) { console.info('[Poder] ya hay una activación en curso'); return; }
    if (poderDeshabilitado()) { console.info(`[Poder] ${sel.referenteName}: poder deshabilitado (faltan sus poses)`); return; }   // v94
    if (!poderListo()) { console.info(`[Poder] todavía no está cargado (${poderCarga}/${PD.CARGA_TOTAL})`); return; }
    const p = jugador; if (p.st === 'ko') return;
    if (p.st === 'damajuana') { console.info('[Poder] no se puede usar mientras toma de la damajuana'); return; }   // v44
    if (p.st === 'agarre' || p.agarrado) soltar();
    p.buffer = null;                                                  // v43: el poder no deja un golpe guardado para después
    poderCarga = 0;                                                   // se consume al COMENZAR
    // lista fija de objetivos: los que ya entraron al combate (no los que esperan para entrar ni las oleadas futuras)
    const objetivos = enemigos.filter(e => !['esperaEntrar', 'fuera', 'ko'].includes(e.st));
    const pres = PD.presentacionDe(sel.id);
    poderActivo = { t: 0, pres, objetivos, aplicado: false, lluvia: false, destello: 0 };
    p.st = 'poder'; p.t = 0; p.tecnica = null; p.jPendiente = null; p.giroPendiente = null; p.empujando = null; p.empujeT = 0;
    console.info(`[Poder] ${sel.referenteName} lo activa (${pres.tipo}) → ${objetivos.length} objetivos: ${objetivos.map(e => e.luch.nombreHUD).join(', ') || 'ninguno'}`);
  }
  function aplicarPoder(A) {
    for (const e of A.objetivos) {
      if (e.st === 'ko' || e.st === 'fuera') continue;                 // ya estaba derrotado
      if (e.st === 'recuperando') { console.info(`[Poder] ${e.luch.nombreHUD} está recuperándose: no pierde otra vida`); continue; }
      if (jugador.agarrado === e) soltar();
      const antes = +e.luch.vida.toFixed(3), primera = e.barrasExtra > 0;
      e.origenDanio = 'poder';                                          // v37: esta derrota no carga la barra
      e.luch.vida = 0;
      sumarDanio(e, antes, 'poder');                                    // v39: lo que le quitó el poder × 1 e.defPendiente = null; e.golpe = null; chispa(e);   // agota SOLO la vida actual, sin sobrante; el bloqueo no lo evita
      if (primera) arrodillar(e); else tumbar(e);
      console.info(`[Poder] ${e.luch.nombreHUD}: ${antes} → 0 · ${primera ? 'pierde la primera vida (se recupera con la segunda)' : 'derrotado'}`);
    }
  }
  function actualizarPoder(dt) {
    const A = poderActivo; if (!A) return;
    A.t += dt; A.destello = Math.max(0, A.destello - dt);
    if (jugador.st === 'poder' && A.t >= A.pres.quieto) { jugador.st = 'quieto'; jugador.t = 0; }
    if (A.pres.lluvia && !A.lluvia && A.t >= A.pres.lluvia.desde) { A.lluvia = true; arrancarLluvia(); }
    if (!A.aplicado && A.t >= A.pres.impacto) { A.aplicado = true; A.destello = 0.3; aplicarPoder(A); }
    if (A.t >= A.pres.duracion) cortarPoder();
  }
  function cortarPoder() {
    if (videoLluvia) { videoLluvia.pause(); }
    if (sonidoLluvia) { sonidoLluvia.pause(); }
    if (poderActivo && jugador && jugador.st === 'poder') { jugador.st = 'quieto'; jugador.t = 0; }
    poderActivo = null;
  }
  // Lluvia compartida (v36: Alan y Matute; después los demás): video con transparencia + sonido OGG (el video va mudo), congelados en pausa.
  let videoLluvia = null, sonidoLluvia = null;
  function prepararMediosPoder() {
    const L = PD.LLUVIA;                              // v36: la misma lluvia para los tres
    videoLluvia = document.createElement('video'); videoLluvia.muted = true; videoLluvia.playsInline = true; videoLluvia.preload = 'auto'; videoLluvia.src = L.video;
    videoLluvia.addEventListener('error', () => console.warn('[Poder] no se pudo cargar', L.video));
    sonidoLluvia = new Audio(L.sonido); sonidoLluvia.preload = 'auto'; sonidoLluvia.volume = 0.9;
  }
  function arrancarLluvia() {
    for (const m of [videoLluvia, sonidoLluvia]) { if (!m) continue; try { m.currentTime = 0; } catch (err) {} m.play().catch(() => {}); }
  }
  function sincronizarMediosPoder(congelado) {
    if (!poderActivo || !poderActivo.lluvia) return;
    for (const m of [videoLluvia, sonidoLluvia]) {
      if (!m) continue;
      if (congelado && !m.paused) m.pause();
      else if (!congelado && m.paused && !m.ended) m.play().catch(() => {});
    }
  }
  function dibujarPoder() {
    const A = poderActivo; if (!A) return;
    if (A.pres.tipo === 'lluvia' && A.lluvia && videoLluvia && videoLluvia.readyState >= 2) {
      const L = A.pres.lluvia, tl = A.t - L.desde, h = MUNDO.w * videoLluvia.videoHeight / videoLluvia.videoWidth;
      g.save(); g.globalAlpha = Math.max(0, Math.min(1, tl / 0.15, (L.dura - tl) / 0.4));
      g.drawImage(videoLluvia, 0, (MUNDO.h - h) / 2, MUNDO.w, h); g.restore();
    }
    if (A.destello > 0) { g.save(); g.globalAlpha = A.destello / 0.3 * 0.35; g.fillStyle = '#fff4dc'; g.fillRect(0, 0, MUNDO.w, MUNDO.h); g.restore(); }
  }

  /* ---------------- Efectos ---------------- */
  function chispa(ent, tipo = 'golpe') { efectos.push({ tipo, x: ent.x + (ent === jugador ? 0 : -ent.face * 20), y: ent.y - ALTO_PERSONAJE * escalaEn(ent.y) * 0.62, t: 0 }); }

  /* Señal provisoria de defensa (hasta tener la pose de brazos cruzados): un arco celeste
     a cada lado del cuerpo, porque protege de los dos lados. No es una animación. */
  // ¿tiene pose de bloqueo dibujada? (Alan, Matute, Cabeza de Poronga, El Abuelo). Los comunes todavía no.
  // v25.1: solo cuenta si las imágenes de bloqueo CARGARON (si faltan, se ve la guardia + arcos, nunca desaparece)
  const bloqueoCargadoRef = A => { const b = A.def.anim.bloqueo; return !!(b && A.imgs[b[0]] && (!A.def.pares[b[0]] || A.imgs[A.def.pares[b[0]]])); };
  const bloqueoCargadoEne = A => { const b = A.def.anim.bloqueo; return !!(b && A.imgs[b.der] && A.imgs[b.izq]); };
  const tienePoseBloqueo = ent => ent === jugador ? !!(arteJugador && arteJugador.tipo === 'frames' && bloqueoCargadoRef(arteJugador))
                                                  : !!(animEnemigos[ent.luch.def.id] && bloqueoCargadoEne(animEnemigos[ent.luch.def.id]));
  function dibujarGuardia(ent) {
    if (ent.st !== 'defensa' || tienePoseBloqueo(ent)) return;   // los arcos quedan solo como señal provisoria de los comunes
    const s = escalaEn(ent.y), h = ALTO_PERSONAJE * s, cy = ent.y - h * 0.55;
    const activa = ent === jugador || protegeEnemigo(ent);
    const a = (activa ? 0.55 : 0.25) + 0.15 * Math.sin(tiempo * 12);
    g.save(); g.globalAlpha = a; g.strokeStyle = '#8fd3ff'; g.lineWidth = 5 * s; g.lineCap = 'round';
    for (const lado of [-1, 1]) { g.beginPath(); g.ellipse(ent.x, cy, h * 0.26, h * 0.36, 0, lado > 0 ? -0.9 : Math.PI - 0.9, lado > 0 ? 0.9 : Math.PI + 0.9); g.stroke(); }
    g.restore();
  }

  /* ---------------- Dibujo: referentes (js/sprites_referentes.js) ---------------- */
  function frameDe(ent, A) {
    const an = A.def.anim, ciclo = (lista, fps) => lista[Math.floor(tiempo * fps) % lista.length];
    if (ent.st === 'damajuana' && an.damajuana) {                     // v44: recoger → sostener → beber
      const T = DJ.tiempos, i = ent.t < T.recoger ? 0 : ent.t < T.recoger + T.sostener ? 1 : 2;
      // v58: con 4 poses (hamburguesa: recoger → sostener → comer → masticar) la última etapa se reparte en dos mitades (mismo tiempo total)
      // v70: A.def.tiempos.tomar = parte de esa etapa para la 3.ª pose (El Gallego: tomar 70 % → bajar); sin dato, mitad y mitad
      if (i === 2 && an.damajuana.length > 3) { const fr = (A.def.tiempos && A.def.tiempos.tomar) || 0.5; return an.damajuana[ent.t < T.recoger + T.sostener + T.beber * fr ? 2 : 3]; }
      return an.damajuana[i];
    }
    if (estado === 'conteo' && an.quietoFrente) return an.quietoFrente[0];   // v39: de frente (guardia frontal) mientras cuenta
    if (estado === 'superado' || estado === 'final') return an.victoria[0];
    if (ent.st === 'ko') return an.koCaida && ent.t < 0.45 ? an.koCaida[0] : an.ko[0];   // v58: con caída dibujada (El Gallego): cae y queda tendido
    if (ent.st === 'dolor') {
      const ts = A.def.tiempos && A.def.tiempos.dolor;
      if (!ts || an.dolor.length < 2) return an.dolor[0];
      let acc = 0; for (let i = 0; i < an.dolor.length; i++) { acc += ts[i] || 0; if (ent.t < acc) return an.dolor[i]; }
      return an.dolor[an.dolor.length - 1];
    }
    if (ent.st === 'agarre') return ent.combo === 'pina' ? an.comboPina[0] : ent.combo === 'cabezazo' ? an.comboCabezazo[0] : an.agarrando[0];
    if (ent.st === 'poder') {                                         // v35/v36: poses de señal de cada personaje; sin poses propias → su guardia
      const P = poderActivo && poderActivo.pres, lista = an.poder;
      if (!lista || !P || !P.poses.length) return an.quieto[0];
      const fase = P.poses.find(x => poderActivo.t < x.hasta) || P.poses[P.poses.length - 1];
      return lista[fase.pose] || an.quieto[0];
    }
    if (ent.st === 'ataque' && an[ent.tecnica + 'Seq']) return an[ent.tecnica + 'Seq'][(ent.paso || 0) % an[ent.tecnica + 'Seq'].length];   // v83: A → B → la de siempre
    if (ent.st === 'ataque') return (ent.variante === 'der' && an[ent.tecnica + 'Der']) ? an[ent.tecnica + 'Der'][0] : an[ent.tecnica][0];   // v43: 3.er golpe = derecha
    if (ent.st === 'defensa') return bloqueoCargadoRef(A) ? an.bloqueo[0] : an.quieto[0];   // sin la imagen: guardia   // v24: pose de bloqueo (a la izquierda, su par propio)
    if (ent.st === 'camina') {
      const f = A.def.fps.camina;
      const z = A.def.zancada ? A.def.zancada * escalaEn(ent.y) : 0;
      // v92: con «pasoMs» el ciclo avanza por TIEMPO de caminata (reloj propio de la entidad, ms por cuadro); si no, por distancia (v46)
      // v93: «pasoMs» puede ser un número (todos los rumbos) o { nombreDeLaAnimación: ms } (solo esos rumbos)
      const paso = (lista, zz = z, nombre) => { const ms = msPaso(A.def, nombre); return ms ? lista[Math.floor((ent.relojPaso || 0) * 1000 / ms) % lista.length]
        : zz ? lista[Math.floor((ent.recorrido || 0) / zz) % lista.length] : ciclo(lista, f); };
      if (ent.rumbo === 'abajo' && an.caminaAbajo) return paso(an.caminaAbajo, z, 'caminaAbajo');
      if (ent.rumbo === 'arriba' && an.caminaArriba) return paso(an.caminaArriba, z, 'caminaArriba');
      // v46: de costado, ciclo de 4 cuadros avanzado por DISTANCIA recorrida (no depende de los FPS ni de la repetición del teclado)
      const zl = A.def.zancadaLado ? A.def.zancadaLado * escalaEn(ent.y) : z;
      return paso(ent.face < 0 ? an.caminaLadoIzq : an.caminaLadoDer, zl, ent.face < 0 ? 'caminaLadoIzq' : 'caminaLadoDer');
    }
    if (ent.rumbo === 'abajo') return an.quietoFrente[0];
    if (ent.rumbo === 'arriba') return an.quietoEspalda[0];
    return an.quieto[0];
  }

  const faltasAvisadas = new Set();
  // v93 — ms por cuadro de caminata de un personaje: número = todos los rumbos; objeto = solo las animaciones nombradas; sin dato = por distancia
  const msPaso = (D, nombre) => !D || !D.pasoMs ? 0 : typeof D.pasoMs === 'number' ? D.pasoMs : (D.pasoMs[nombre] || 0);
  let cuadroDibujado = null;
  function avisarFalta(A, id) { const src = A.def.frames[id] && A.def.frames[id].src; if (faltasAvisadas.has(src)) return; faltasAvisadas.add(src); console.warn('[Arte] falta la imagen', src, '→ se usa la guardia'); }
  const sombra = (ent, s, alpha, ancho = 70) => { g.save(); g.globalAlpha = 0.35 * alpha; g.fillStyle = '#000'; g.beginPath(); g.ellipse(ent.x, ent.y, ancho * s, 14 * s, 0, 0, 7); g.fill(); g.restore(); };

  function dibujarFrames(ent, A, alpha, soloQuieto) {
    let paso = soloQuieto ? A.def.anim.quieto[0] : frameDe(ent, A), id, espejo = false;
    const lado = ['der', 'izq'];
    if (typeof paso === 'object') { id = paso.id; espejo = !!paso.espejo; }
    else {
      id = paso; const mira = A.def.frames[id].mira;
      const dir = mira === 'der' ? 1 : mira === 'izq' ? -1 : 0;
      if (dir && dir !== ent.face) {
        const inverso = Object.keys(A.def.pares).find(k => A.def.pares[k] === id);
        const par = A.def.pares[id] || inverso;
        if (par) id = par; else espejo = true;
      }
    }
    const m = A.def.frames[id]; let img = A.imgs[id];
    if (!img) { avisarFalta(A, id); if (!soloQuieto) dibujarFrames(ent, A, alpha, true); return; }   // nunca desaparece: usa la guardia
    if (ent === jugador) cuadroDibujado = id + (espejo ? '~' : '');   // v83: depuración (cuadro realmente dibujado y si se espejó)
    let ancla = m.ancla;
    if (espejo && A.imgsEspejo[id]) { img = A.imgsEspejo[id]; ancla = anW(img) - m.ancla; espejo = false; }
    const s = escalaEn(ent.y), k = ALTO_PERSONAJE * s * (A.def.proporcion || 1) / A.def.altoReferencia[m.grupo];   // v150: proporcion = contextura/altura propia (Corea)
    let rot = 0, dx = 0;
    if (ent.st === 'dolor' && A.def.anim.dolor.length < 2) { rot = -0.07; dx = -6 * s; }
    const respira = (ent.st === 'quieto' && lado.includes(m.mira)) ? Math.sin(tiempo * 3.4) * 0.008 : 0;
    sombra(ent, s, alpha);
    g.save(); g.globalAlpha = alpha; g.translate(ent.x + dx * ent.face, ent.y);
    if (ent.st === 'ko' && !m.sinGiro) { const f = Math.min(1, ent.t / 0.35); g.rotate(-ent.face * f * Math.PI / 2 * 0.92); g.translate(0, -f * 10); }   // TODO(arte): caída del referente · v58: no se gira una caída/KO ya dibujada
    else g.rotate(rot * ent.face);
    g.scale(espejo ? -1 : 1, 1 - respira);
    g.drawImage(img, -ancla * k, -m.pie * k, anW(img) * k, anH(img) * k);
    g.restore();
  }

  /* ---------------- Dibujo: enemigos animados (js/sprites_enemigos.js) ----------------
     quieto → guardia · caminar → pasos 01/02 del lado al que mira, por distancia recorrida ·
     preparar → guardia · golpear → piña/patada y vuelve a guardia · dolor/agarrado → recibir golpe ·
     derribo → caída → suelo → caída (se levanta) → guardia · derrota → reacción → caída → muerto. */
  /* v190 — CAMINATA EN 8 DIRECCIONES (anim.camina8 = { E, SE, S, SW, W, NW, N, NE }: 8 cuadros cada una, 01 → 08 en loop).
     · Dirección = desplazamiento REAL (e.mx, e.my) suavizado, con histéresis: solo cambia si el rumbo se aleja más de 34° del
       centro de la dirección actual (los empujones y correcciones chicas no la hacen parpadear).
     · Fotograma por TIEMPO de caminata (e.relojPaso solo corre mientras se desplaza): 110 ms por cuadro; no se reinicia al
       cambiar de dirección ni cuadro a cuadro. Al frenar, poseEnemigo vuelve a la guardia de siempre. */
  const DIR8 = ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];
  function dir8(e) {
    const mx = e.mx || 0, my = e.my || 0, v = Math.hypot(mx, my);
    if (v > 0.05) { const a = 0.35; e.v8x = (e.v8x == null ? mx / v : e.v8x * (1 - a) + mx / v * a); e.v8y = (e.v8y == null ? my / v : e.v8y * (1 - a) + my / v * a); }
    if (e.v8x == null) return e.d8 != null ? e.d8 : (e.face < 0 ? 4 : 0);
    const ang = Math.atan2(e.v8y, e.v8x) * 180 / Math.PI, idx = ((Math.round(ang / 45) % 8) + 8) % 8;
    if (e.d8 == null) e.d8 = idx;
    else { let dif = Math.abs(ang - e.d8 * 45) % 360; if (dif > 180) dif = 360 - dif; if (dif > 34) e.d8 = idx; }
    return e.d8;
  }
  function pose8(e, D, C) {
    const L = C[DIR8[dir8(e)]], ms = D.pasoMs8 || 110;
    return L[Math.floor((e.relojPaso || 0) * 1000 / ms) % L.length];
  }
  /* v192 — CAMINATA FLUIDA EN 8 DIRECCIONES (solo modelos con def.camina8v2: River 1–4). Se calcula en la ACTUALIZACIÓN con el dt del
     bucle (tope 50 ms: volver de otra pestaña o de la pausa no adelanta pasos), nunca al dibujar:
     · Desplazamiento EFECTIVO (después de límites y empujones), en unidades de cuerpo: la profundidad se mueve al 70 % de la velocidad
       horizontal (así lo mueve la IA), por eso dy / 0,7 equivale al mismo recorrido en el piso; ÷ escalaEn(y) por la perspectiva.
     · Cadencia: 880 ms por ciclo a la velocidad normal en el MEDIO del piso; más cerca o más lejos se ajusta en proporción a lo
       recorrido (0,75×–1,35×), suavizada. Contra un límite no avanza: queda en reposo.
     · Caminar / reposo con histéresis (arranca > 30 % de la velocidad normal; frena < 12 % durante 0,12 s).
     · Dirección con histéresis (32° fuera del centro de la actual); arranque y giros de más de 100° toman el rumbo nuevo al instante.
     · Fase ÚNICA (ms dentro del ciclo) para las 8 direcciones + tabla de correspondencias por dirección (def.fase8: medida en los
       apoyos de cada ciclo); al girar sigue en el paso equivalente. Tras ≥ 0,35 s quieto, arranca desde el apoyo inicial. */
  /* v193 — reloj de los ciclos POR TIEMPO (pasoMs, p. ej. 180 ms): avanza con el desplazamiento EFECTIVO (después de límites y
     empujones) medido sobre el piso (profundidad / 0,7), en «segundos a la velocidad de diseño». A la velocidad anterior da
     exactamente lo mismo que antes (1 s por s); al 85 % da 0,85 s por s → el ciclo dura /0,85 (180 → 211,8 ms por cuadro) y el paso
     mide lo mismo; bloqueado no avanza. Tope 1,5 × dt (empujones). */
  function avanzarReloj(e, dx, dy, dt) {
    const v = e.velRefPaso || VEL_ENEMIGO;
    e.relojPaso = (e.relojPaso || 0) + Math.min(dt * 1.5, Math.hypot(dx, dy / 0.7) / v);
  }
  const AND8 = { velNormal: VEL_ENEMIGO * FACTOR_CAMINATA_BARRAS, profundidad: 0.7, rango: [0.75, 1.35], arranca: 0.30, arrancaT: 0.04, frena: 0.12, frenaT: 0.10, giro: 32, snap: 100, sostener: 0.05, reinicio: 0.35 };
  function andar8(e, dx, dy, dt) {
    const A = animEnemigos[e.luch.def.id], D = A && A.def; if (!D || !D.camina8v2 || dt <= 0) return;
    const s = escalaEn(e.y), gy = dy / AND8.profundidad, dist = Math.hypot(dx, gy) / s, v = dist / dt;
    if (tiempo - (e.w8ult || -9) > 0.2) { e.w8v = 0; e.w8on = false; e.w8q = 0; e.w8a = 0; }   // volvió de un golpe, una caída o la pausa
    e.w8ult = tiempo;
    e.w8v = (e.w8v || 0) + (v - (e.w8v || 0)) * (1 - Math.exp(-dt / 0.08));   // velocidad suavizada (exponencial exacta: igual a cualquier FPS)
    const sMed = PISO ? escalaEn((PISO.yMin + PISO.yMax) / 2) : 1, vRef = AND8.velNormal / sMed;
    const mueve = v > AND8.frena * vRef;
    if (!e.w8on) {   // arranca con desplazamiento real sostenido (no con un empujón de un fotograma)
      e.w8a = v > AND8.arranca * vRef ? (e.w8a || 0) + dt : 0;
      if (e.w8a >= AND8.arrancaT - 1e-6) { e.w8on = true; e.w8q = 0; e.w8nuevo = true;
        if (tiempo - (e.w8fin || -9) > AND8.reinicio) e.w8t = 0; }                     // tras una parada larga: desde el apoyo inicial
    } else if (!mueve) { e.w8q = (e.w8q || 0) + dt; if (e.w8q >= AND8.frenaT - 1e-6) { e.w8on = false; e.w8fin = tiempo; e.w8a = 0; } }
    else e.w8q = 0;
    // dirección: vector de piso suavizado (~60 ms) + histéresis de ángulo (32°) + permanencia (50 ms) para cambiar de cuadro.
    // Al arrancar toma el rumbo al instante; un giro grande (> 100°) también, pero solo si se sostiene 50 ms (la IA, junto al
    // objetivo, da tirones de un fotograma hacia atrás por la separación entre rivales: esos no dan vuelta al personaje).
    if (mueve) {
      const n = Math.hypot(dx, gy), ux = dx / n, uy = gy / n, aIdx = (x, y) => ((Math.round(Math.atan2(y, x) * 180 / Math.PI / 45) % 8) + 8) % 8;
      if (e.w8nuevo || e.w8x == null) { e.w8x = ux; e.w8y = uy; e.w8d = aIdx(ux, uy); e.w8g = 0; e.w8c = 0; }
      else if (e.w8x * ux + e.w8y * uy < Math.cos(AND8.snap * Math.PI / 180)) {
        e.w8g = (e.w8g || 0) + dt;
        if (e.w8g >= AND8.sostener - 1e-6) { e.w8x = ux; e.w8y = uy; e.w8d = aIdx(ux, uy); e.w8g = 0; e.w8c = 0; }
      } else {
        e.w8g = 0; const k = 1 - Math.exp(-dt / 0.06); e.w8x += (ux - e.w8x) * k; e.w8y += (uy - e.w8y) * k;
        const ang = Math.atan2(e.w8y, e.w8x) * 180 / Math.PI;
        let dif = Math.abs(ang - e.w8d * 45) % 360; if (dif > 180) dif = 360 - dif;
        if (dif > AND8.giro) { e.w8c = (e.w8c || 0) + dt; if (e.w8c >= AND8.sostener - 1e-6) { e.w8d = aIdx(e.w8x, e.w8y); e.w8c = 0; } }
        else e.w8c = 0;
      }
      if (e.w8on) e.w8nuevo = false;
    }
    // fase: ms dentro del ciclo, al ritmo de lo que realmente recorre, dentro del rango; sin desplazamiento no avanza
    if (e.w8on && mueve) {
      const ms = D.ms8 || [110, 110, 110, 110, 110, 110, 110, 110], ciclo = ms.reduce((a, b) => a + b, 0);
      const r = Math.min(AND8.rango[1], Math.max(AND8.rango[0], e.w8v / vRef));
      e.w8t = ((e.w8t || 0) + dt * 1000 * r) % ciclo;
    }
  }
  function pose8v2(e, D, C) {
    const dir = DIR8[e.w8d != null ? e.w8d : (e.face < 0 ? 4 : 0)], L = C[dir];
    const ms = D.ms8 || [110, 110, 110, 110, 110, 110, 110, 110];
    let t = e.w8t || 0, i = 0; while (i < 7 && t >= ms[i]) { t -= ms[i]; i++; }
    const off = (D.fase8 && D.fase8[dir]) || 0;
    return L[((i + off) % 8 + 8) % 8];
  }
  function poseEnemigo(e, D, A) {
    const an = { ...D.anim, dolor: D.anim.dolor || D.anim.quieto }, lado = e.face < 0 ? 'izq' : 'der';
    if (an.dolores) an.dolor = an.dolores[(e.nDolor || 0) % an.dolores.length];   // v55: reacción a / b / c según el golpe
    // v55: cayendo = desequilibrio a → b (si existe); si no, la pose de caída de siempre. frac = avance dentro de la caída (0…1)
    const cayendo = frac => an.desequilibrio ? an.desequilibrio[Math.min(an.desequilibrio.length - 1, Math.floor(frac * an.desequilibrio.length))] : (an.caida || an.koGirando);   // v26: sin cuadro de golpe recibido → guardia (se inclina al dibujar)
    // v29: de rodillas → guardia. v31: sin pose arrodillada (Cabeza de Poronga) usa SU pose de caída, provisoria.
    if (e.st === 'recuperando') return e.t < RECUPERACION.arrodillado ? (an.arrodillado ? an.arrodillado[lado] : (an.caida || an.quieto)) : an.quieto;
    if (e.st === 'ko') {
      const final = an.muerto || an.caida || an.koGirando;          // sin cuadro de KO: queda en la pose de caída (provisorio) · v56: Matute jefe, se voltea
      if (e.derribadoKO) return final;
      return e.t < KO_ANIM.reaccion ? an.dolor : e.t < KO_ANIM.reaccion + KO_ANIM.caida ? cayendo((e.t - KO_ANIM.reaccion) / KO_ANIM.caida) : final;
    }
    if (e.st === 'derribado') {
      const t = e.t, Dr = DERRIBO;
      if (t < Dr.caida) return t < 0.1 ? an.dolor : cayendo((t - 0.1) / (Dr.caida - 0.1));
      if (t < Dr.caida + Dr.suelo) return an.suelo || an.muerto || an.caida || an.koGirando;   // v47: 'suelo' propio (Cabeza de Poronga: su muerto es solo para la derrota final)  // en el piso
      return t < Dr.caida + Dr.suelo + Dr.levantarse * 0.6 ? (an.levantarse || an.caida) : an.quieto;   // se levanta (v69: pose propia si la tiene; no recupera vida)
    }
    if (e.st === 'defensa' && an.bloqueo && protegeEnemigo(e) && bloqueoCargadoEne(A)) return an.bloqueo[lado];   // v24: brazos cruzados mientras protege (al subir/bajar la guardia, la guardia)
    if (e.st === 'dolor' || e.st === 'agarrado') return an.dolor;
    if (e.st === 'preparar' && an.preparar && an.preparar[e.golpe]) return an.preparar[e.golpe];   // v32: policía levanta el palo antes del palazo
    if (e.st === 'golpear' && e.t < TIEMPO.golpeVisible) { const a = (e.var && an[e.golpe + e.var]) || an[e.golpe]; if (a) return typeof a === 'string' ? a : a[lado]; }   // v83: variante A/B
    if (an.camina8 && D.camina8v2) {                       // v192: estado de caminata calculado en la ACTUALIZACIÓN (andar8), no al dibujar
      const anda = e.st === 'acercarse' || e.st === 'retirada' || e.st === 'esperar';   // 'esperar' incluido: la IA alterna acercarse/esperar junto al objetivo
      if (anda && e.w8on && tiempo - (e.w8ult || -9) < 0.15) return pose8v2(e, D, an.camina8);
      if (e.st === 'acercarse' || e.st === 'retirada') return an.quieto;   // sin desplazamiento real (frenado o contra un límite): reposo
    }
    if ((e.st === 'acercarse' || e.st === 'retirada') && an.camina8) return pose8(e, D, an.camina8);   // v190: River 1–4, 8 direcciones
    if (e.st === 'acercarse' || e.st === 'retirada') {
      // de frente / de espaldas si camina sobre todo en profundidad y tiene esos cuadros; si no, de costado hacia donde mira
      const vertical = Math.abs(e.my || 0) > Math.abs(e.mx || 0) * 1.3;
      const lista = vertical && e.my > 0 && an.caminaAbajo ? an.caminaAbajo : vertical && e.my < 0 && an.caminaArriba ? an.caminaArriba : (e.face < 0 ? an.caminaIzq : an.caminaDer);
      const z = (lista === an.caminaDer || lista === an.caminaIzq) && D.zancadaLado ? D.zancadaLado : D.zancada;   // v47: ciclo de 4 de costado, avanzado por distancia
      // v92: barras con «caminaEntrada» (Belgrano 02 → 03): los primeros pasos de cada tramo de costado son la transición desde la guardia
      if (an.caminaEntrada && (lista === an.caminaDer || lista === an.caminaIzq)) {
        const i = Math.floor((e.tramo || 0) / (z * escalaEn(e.y)));
        if (i < an.caminaEntrada.length) return an.caminaEntrada[i];
        return lista[(i - an.caminaEntrada.length) % lista.length];
      }
      const nom = lista === an.caminaAbajo ? 'caminaAbajo' : lista === an.caminaArriba ? 'caminaArriba' : lista === an.caminaIzq ? 'caminaIzq' : 'caminaDer', ms = msPaso(D, nom);
      if (ms) return lista[Math.floor((e.relojPaso || 0) * 1000 / ms) % lista.length];   // v93: por tiempo (El Gallego de frente)
      return lista[Math.floor(e.recorrido / (z * escalaEn(e.y))) % lista.length];
    }
    return an.quieto;
  }

  function dibujarEnemigoAnimado(e, A, alpha) {
    let id = poseEnemigo(e, A.def, A);
    if (!A.imgs[id]) { avisarFalta(A, id); id = A.def.anim.quieto; }   // nunca desaparece: usa la guardia
    const m = A.def.frames[id];
    let img = A.imgs[id]; if (!img) return;
    const dir = m.mira === 'der' ? 1 : m.mira === 'izq' ? -1 : 0;     // frente/espalda: no se espeja
    let espejo = dir !== 0 && dir !== e.face, ancla = m.ancla;
    if (espejo && A.imgsEspejo[id]) { img = A.imgsEspejo[id]; ancla = anW(img) - m.ancla; espejo = false; }   // guardia con el 12 al derecho
    const s = escalaEn(e.y), k = ALTO_PERSONAJE * s / m.ref;
    let dx = 0, rot = 0;
    if (e.st === 'preparar') dx = -8 * s * Math.min(1, e.t / 0.15);   // se echa atrás: se ve venir el golpe
    if (!A.def.anim.dolor && id === A.def.anim.quieto && (e.st === 'dolor' || e.st === 'agarrado' || (e.st === 'ko' && e.t < KO_ANIM.reaccion)))
      { dx = -8 * s; rot = -0.06; }                                   // v26: golpe recibido provisorio (guardia inclinada, sin redibujar)
    sombra(e, s, alpha, m.acostado ? 150 : 70);
    g.save(); g.globalAlpha = alpha; g.translate(e.x + dx * e.face, e.y);
    // v69: el GOLPE ESPECIAL de un policía se anuncia con un brillo rojo que late durante toda la preparación (se ve venir)
    if (e.golpe === 'especial' && e.st === 'preparar') g.filter = `drop-shadow(0 0 ${Math.round(14 * s)}px rgba(255,60,30,${(0.65 + 0.35 * Math.sin(e.t * 18)).toFixed(2)})) brightness(1.12)`;
    // v56: sin caída ni KO dibujados (Matute jefe) → se voltea la pose, como al referente jugable (TODO arte)
    if (e.st === 'ko' && id === A.def.anim.koGirando && !A.def.anim.muerto && !A.def.anim.caida) {
      const f = Math.min(1, Math.max(0, e.t - KO_ANIM.reaccion) / 0.35); g.rotate(-e.face * f * Math.PI / 2 * 0.92); g.translate(0, -f * 10); }
    if (rot) g.rotate(rot * e.face);
    g.scale(espejo ? -1 : 1, 1);
    g.drawImage(img, -ancla * k, -m.pie * k, anW(img) * k, anH(img) * k);
    g.restore();
    if (e.st === 'preparar') aviso(e, s, 0.5 + 0.5 * Math.sin(e.t * 30));
  }

  /* ---------------- Dibujo: enemigos con imagen quieta (hinchas sin animar, especiales, jefe) ---------------- */
  function dibujarFigura(ent, arte, alpha = 1) {
    if (arte.tipo === 'frames') return dibujarFrames(ent, arte, alpha);
    const s = escalaEn(ent.y), c = arte.caja, alto = ALTO_PERSONAJE * s, k = alto / (arte.altoRef || (c.y1 - c.y0));
    const w = anW(arte.img) * k, h = anH(arte.img) * k;
    const mira = arte.mira || 1, girar = ent.face !== mira;
    const conEspejo = girar && arte.imgEspejo, img = conEspejo ? arte.imgEspejo : arte.img;
    const cx = (conEspejo ? anW(arte.img) - (c.x0 + c.x1) / 2 : (c.x0 + c.x1) / 2) * k, pie = c.y1 * k;
    let dx = 0, rot = 0, sy = 1;
    // "animación" provisoria: una sola imagen que se inclina y desliza (no son cuadros definitivos)
    const respira = Math.sin(tiempo * 3.4 + (ent.carril || 0)) * 0.008;
    if (ent.st === 'ataque' || (ent.st === 'agarre' && ent.combo)) { const f = ent.st === 'ataque' ? Math.sin(Math.min(1, ent.t / TIEMPO.ataque) * Math.PI) : Math.sin(Math.min(1, ent.comboT / AGARRE.golpe) * Math.PI); dx = 26 * f * s; rot = 0.05 * f; }
    if (ent.st === 'preparar') { const f = Math.min(1, ent.t / 0.2); dx = -14 * s * f; rot = -0.06 * f; }
    if (ent.st === 'golpear') { const f = Math.sin(Math.min(1, ent.t / 0.22) * Math.PI); dx = 30 * f * s; rot = 0.07 * f; }
    if (ent.st === 'dolor' || ent.st === 'agarrado') { dx = -8 * s; rot = -0.06; }
    if (ent.st === 'camina' || ent.st === 'acercarse' || ent.st === 'retirada') sy = 1 + Math.sin(tiempo * 14) * 0.012;
    sombra(ent, s, alpha);
    g.save(); g.globalAlpha = alpha; g.translate(ent.x + dx * ent.face, ent.y);
    const caido = caidaDe(ent);
    if (caido) { g.rotate(-ent.face * caido * Math.PI / 2 * 0.92); g.translate(0, -caido * 10); }
    else g.rotate(ent.face * rot);
    g.scale(girar && !conEspejo ? -1 : 1, sy * (1 - respira));
    // señales visuales provisorias del jefe / especial (no son animaciones): rojo al recibir daño, brillo al preparar
    if (ent.tipo === 'enemigo' && (ent.jefe || ent.especial)) {
      if (ent.st === 'dolor' || ent.st === 'agarrado') g.filter = 'sepia(1) saturate(6) hue-rotate(-35deg) brightness(0.95)';
      else if (ent.st === 'preparar') g.filter = `brightness(${1.15 + 0.25 * Math.sin(ent.t * 30)})`;
    }
    g.drawImage(img, -cx, -pie, w, h);
    g.filter = 'none';
    g.restore();
    if (ent.st === 'preparar' && ent.tipo === 'enemigo') aviso(ent, s, 0.5 + 0.5 * Math.sin(ent.t * 30));
  }

  // "!" sobre la cabeza mientras prepara el golpe (se ve venir y se puede esquivar)
  function aviso(e, s, a) {
    const y = e.y - ALTO_PERSONAJE * s - 26;
    g.save(); g.globalAlpha = Math.max(0.25, a); texto('!', e.x, y, Math.round(40 * s), e.jefe ? '#ff5a4a' : '#ffd34f', 'center'); g.restore();
  }

  function caidaDe(ent) {
    if (ent.st === 'ko') return ent.derribadoKO ? 1 : Math.min(1, ent.t / 0.35);
    if (ent.st !== 'derribado') return 0;
    const t = ent.t, D = DERRIBO;
    if (t < D.caida) return t / D.caida;
    if (t < D.caida + D.suelo) return 1;
    return Math.max(0, 1 - (t - D.caida - D.suelo) / D.levantarse);
  }

  /* ---------------- HUD y carteles ---------------- */
  function barra(x, y, w, h, pct, colores) {
    g.fillStyle = ID.carbon; g.fillRect(x - 4, y - 4, w + 8, h + 8);
    g.fillStyle = ID.hueso; g.fillRect(x - 2, y - 2, w + 4, h + 4);
    g.fillStyle = '#3a1116'; g.fillRect(x, y, w, h);
    const gr = g.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, colores[0]); gr.addColorStop(1, colores[1]);
    g.fillStyle = gr; g.fillRect(x, y, w * Math.max(0, pct) / 100, h);
  }

  function texto(t, x, y, tam, color = ID.hueso, al = 'left') {
    g.font = `bold ${tam}px Verdana, sans-serif`; g.textAlign = al; g.textBaseline = 'alphabetic';
    g.fillStyle = ID.carbon; g.fillText(t, x + 3, y + 3); g.fillStyle = color; g.fillText(t, x, y);
  }

  // v39 — bloque izquierdo más corto (−20 % de ancho, un poco más bajo) para dejar libre el centro (PUNTAJE / NIVEL / RIVALES)
  // El ancho se recalcula con la fuente real (en Windows, Verdana es más ancha): el texto más largo del bloque izquierdo
  // («PODER · L PARA ACTIVAR») tiene que terminar al menos MARGEN px antes de «RIVALES: 15» del centro.
  /* v54 — bloque central del HUD (todos los niveles): logo FURIA DE TRIBUNA chico arriba y, debajo, PUNTAJE / NIVEL / RIVALES.
     Coordenadas del mundo (1672 × 941): escala junto con el canvas, queda fijo a la pantalla (no hay cámara) y es el mismo para los 10 niveles.
     Logo: 236 px de ancho ≈ 220 px en una pantalla de 1550 px. Usa la imagen ya cargada para el menú (logoTitulo), una sola vez. */
  const HUD_BASE = { logoAncho: 236, logoArriba: 12, separacion: 8, tamPuntaje: 22, tamNivel: 22, tamRivales: 19, interlinea: 27 };
  const HUD_CENTRO = { ...HUD_BASE, k: 1 };
  // Pantallas chicas: el canvas entero se achica; el bloque central crece hasta ×1.35 para seguir leyéndose (el izquierdo se reacomoda en medirHUD).
  function ajustarHUDPantalla() {
    const r = cv.getBoundingClientRect(); if (!r.width) return;
    const sc = Math.min(r.width / MUNDO.w, r.height / MUNDO.h), k = Math.max(1, Math.min(1.35, 0.62 / sc));
    if (Math.abs(k - HUD_CENTRO.k) < 0.01) return;
    for (const c in HUD_BASE) HUD_CENTRO[c] = c === 'logoArriba' ? HUD_BASE[c] : HUD_BASE[c] * k;
    HUD_CENTRO.k = k; HUD.medido = false;
  }
  addEventListener('resize', ajustarHUDPantalla);
  const HUD = { x: 44, ancho: 512, anchoMax: 512, vidaY: 76, vidaAlto: 24, poderY: 114, poderAlto: 12, margen: 36, medido: false };
  function medirHUD() {
    const m = (t, s) => { g.font = `bold ${s}px Verdana, sans-serif`; return g.measureText(t).width; };
    const textoMasLargo = Math.max(m('100%', 20), m('PODER · L PARA ACTIVAR', 15), m('PODER 100%', 15));
    // v54: el bloque central ahora es logo + PUNTAJE/NIVEL/RIVALES; se reserva lo más ancho de los dos (con puntaje de 7 cifras)
    const bordeCentro = MUNDO.w / 2 - Math.max(HUD_CENTRO.logoAncho, m('PUNTAJE: 9999999', HUD_CENTRO.tamPuntaje), m('RIVALES: 15', HUD_CENTRO.tamRivales)) / 2;
    HUD.ancho = Math.round(Math.min(HUD.anchoMax, bordeCentro - HUD.margen - textoMasLargo - 14 - HUD.x));
    HUD.medido = true;
  }
  function hud() {
    const p = jugador.luch;
    if (!HUD.medido) { ajustarHUDPantalla(); medirHUD(); }
    const nombre = sel.playerName.toUpperCase();
    texto(nombre, HUD.x, 58, 34);                                              // SIEMPRE el nombre del jugador (tamaño y color de siempre)
    g.font = 'bold 34px Verdana, sans-serif'; const w = g.measureText(nombre).width;
    texto(`- Referente ${sel.referenteName}`, HUD.x + w + 12, 58, 18, ID.doradoClaro); // v39: «DARIO - Referente Alan» en una línea
    // durante el conteo la barra muestra la vida que todavía falta convertir (sin tocar la vida real: no hay muerte posible)
    const pctVida = conteo ? conteo.frac * 100 * (1 - (conteo.bonus ? conteo.acreditado / conteo.bonus : 1)) : p.porcentajeVida;
    barra(HUD.x, HUD.vidaY, HUD.ancho, HUD.vidaAlto, pctVida, ['#ffe066', '#e0a400']);
    texto(`${Math.ceil(pctVida)}%`, HUD.x + HUD.ancho + 14, HUD.vidaY + HUD.vidaAlto - 2, 20);
    // PODER — debajo de la vida, mismo borde izquierdo y ancho, más delgada, relleno naranja según la carga real
    const pct = Math.max(0, Math.min(100, poderCarga / PD.CARGA_TOTAL * 100));
    barra(HUD.x, HUD.poderY, HUD.ancho, HUD.poderAlto, pct, ['#ffb347', '#f26b0f']);
    const xp = HUD.x + HUD.ancho + 14, yp = HUD.poderY + HUD.poderAlto + 2;
    if (poderDeshabilitado()) texto('PODER: PRÓXIMAMENTE', xp, yp, 15, '#c9b89a');   // v94: el referente todavía no tiene su poder dibujado
    else if (poderListo()) {
      g.save(); g.globalAlpha = 0.7 + 0.3 * Math.sin(tiempo * 6);
      texto('PODER · L PARA ACTIVAR', xp, yp, 15, '#ffa64d'); g.restore();
    } else texto(`PODER ${Math.floor(pct)}%`, xp, yp, 15, '#ffc58a');
    // centro: PUNTAJE arriba de NIVEL arriba de RIVALES
    bloqueCentralHUD();
    const o = objetivoHUD && objetivoHUD.st !== 'fuera' ? objetivoHUD : null;
    if (o) {
      const L = o.jefe ? 560 : 420;
      texto(o.luch.nombreHUD.toUpperCase(), MUNDO.w - 44, 58, o.jefe ? 30 : 24, o.jefe ? ID.dorado : ID.hueso, 'right');
      barra(MUNDO.w - 44 - L, 74, L, o.jefe ? 26 : 22, o.luch.porcentajeVida, ['#ff7b6e', '#c9262b']);
      texto(`${Math.ceil(o.luch.vida)}/${Math.round(o.luch.vidaMax)}`, MUNDO.w - 44 - L - 12, 96, 18, ID.hueso, 'right');
    }
    if (estado === 'conteo' && conteo) {                                     // cartel del bonus mientras se convierte la vida
      texto(`BONUS DE VIDA  +${conteo.acreditado}`, MUNDO.w / 2, MUNDO.h * 0.30, 44, ID.dorado, 'center');
    }
  }

  // v54: logo + PUNTAJE / NIVEL / RIVALES, centrados. Sin panel de fondo: sombra suave en el logo y contorno negro en el texto.
  // v194: diagnóstico de IA sobre cada enemigo (solo con BB_DEBUG.diagIA = true o ?debug=ia): estado, turno, distancias, alcance, motivo
  let diagFps = { n: 0, t0: 0, fps: 0, juego: 0, T0: 0 };
  function dibujarDiagIA() {
    const p = jugador; if (!p) return;
    g.save();
    // FPS reales y segundos de juego por segundo real: por debajo de 20 FPS el juego va en cámara lenta (dt con tope de 50 ms)
    const ahora = performance.now(); diagFps.n++;
    if (ahora - diagFps.t0 > 1000) { diagFps.fps = diagFps.n * 1000 / (ahora - diagFps.t0); diagFps.juego = (tiempo - diagFps.T0) * 1000 / (ahora - diagFps.t0); diagFps.n = 0; diagFps.t0 = ahora; diagFps.T0 = tiempo; }
    g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(8, MUNDO.h - 40, 470, 32);
    texto(`DIAG IA · ${diagFps.fps.toFixed(0)} FPS · ${diagFps.juego.toFixed(2)} s de juego por s real`, 16, MUNDO.h - 17, 18, diagFps.juego < 0.95 ? '#ff8080' : '#a0ffa0');
    for (const e of enemigos) {
      if (!enJuego(e) || e.st === 'esperaEntrar') continue;
      const s = escalaEn(e.y), tol = PROF_GOLPE * factorProf(e.y), y = e.y - ALTO_PERSONAJE * s - 70;
      const l1 = `${e.st}${e.ficha ? ' · TURNO' : ''} · ${motivoIA(e, p)}`;
      const l2 = `dx ${Math.round(Math.abs(p.x - e.x))}/${Math.round(ALCANCE.patada * s)} · dy ${Math.round(Math.abs(p.y - e.y))}/${Math.round(tol)}`;
      const l3 = `${e.st === 'preparar' ? '«!» ' + e.t.toFixed(2) + ' s · ' : ''}sin progreso ${(e.sinProg || 0).toFixed(1)} s · turno ${(e.fichaT || 0).toFixed(1)} s · enfr ${Math.max(0, e.enfriar).toFixed(1)}`;
      g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(e.x - 170, y - 22, 340, 66);
      texto(l1, e.x, y, 15, e.ficha ? '#ffd34f' : '#ffffff', 'center'); texto(l2, e.x, y + 20, 14, '#cfe8ff', 'center'); texto(l3, e.x, y + 39, 13, '#ffc0c0', 'center');
    }
    g.restore();
  }
  function textoContorno(t, x, y, tam, color) {
    g.font = `bold ${tam}px Verdana, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    g.lineJoin = 'round'; g.lineWidth = 4; g.strokeStyle = 'rgba(0,0,0,0.85)'; g.strokeText(t, x, y);
    g.fillStyle = color; g.fillText(t, x, y);
  }
  function bloqueCentralHUD() {
    const H = HUD_CENTRO, cx = MUNDO.w / 2;
    let y = H.logoArriba;
    if (logoTitulo && logoTitulo.width) {
      const w = H.logoAncho, h = w * logoTitulo.height / logoTitulo.width;
      g.save(); g.shadowColor = 'rgba(0,0,0,0.55)'; g.shadowBlur = 8; g.shadowOffsetY = 2;
      g.drawImage(logoTitulo, cx - w / 2, y, w, h); g.restore();
      y += h + H.separacion;
    } else y += 6;                                                    // si el logo todavía no llegó, los datos quedan arriba
    y += H.tamPuntaje * 0.8;
    textoContorno(`PUNTAJE: ${puntajeVisible()}`, cx, y, H.tamPuntaje, ID.hueso);
    textoContorno(N.tituloNivel(nivel), cx, y + H.interlinea, H.tamNivel, ID.dorado);
    textoContorno(`RIVALES: ${rivalesRestantes()}`, cx, y + 2 * H.interlinea, H.tamRivales, ID.hueso);
    HUD_CENTRO.abajo = y + 2 * H.interlinea + 8;                     // para ubicar avisos debajo (música)
  }

  // v39: resumen del nivel recién cerrado
  function dibujarResumen(y) {
    if (!ptsNivel) return;
    const combate = Math.floor(ptsNivel.danio + ptsNivel.bajas + 1e-6);
    texto(`Combate: ${combate}   ·   Penalizaciones: ${ptsNivel.penal > 0 ? '−' + Math.ceil(ptsNivel.penal - 1e-6) : '0'}   ·   Bonus de vida: +${ptsNivel.bonus}   ·   Acumulado: ${puntajeVisible()}`,
          MUNDO.w / 2, y, 26, ID.doradoClaro, 'center');
  }
  function velo(a = 0.72) { g.fillStyle = ID.carbonA(a); g.fillRect(0, 0, MUNDO.w, MUNDO.h); }
  function cartel(titulo, sub, color) {
    velo();
    texto(titulo, MUNDO.w / 2, MUNDO.h / 2 - 20, 84, color, 'center');
    texto(sub, MUNDO.w / 2, MUNDO.h / 2 + 50, 28, ID.hueso, 'center');
  }

  function partirTexto(t, ancho, tam) {
    g.font = `bold ${tam}px Verdana, sans-serif`;
    if (g.measureText(t).width <= ancho) return [t];
    const pal = t.split(' '); let a = '';
    for (let i = 0; i < pal.length; i++) {
      const prueba = (a ? a + ' ' : '') + pal[i];
      if (g.measureText(prueba).width > ancho && a) return [a, pal.slice(i).join(' ')];
      a = prueba;
    }
    return [t];
  }

  function casillasMenu() {
    const out = [], W = 250, H = 120, gap = 26, x0 = (MUNDO.w - (5 * W + 4 * gap)) / 2;
    for (let i = 0; i < 10; i++) out.push({ n: i + 1, x: x0 + (i % 5) * (W + gap), y: 430 + Math.floor(i / 5) * (H + gap), w: W, h: H });
    return out;
  }

  /* v55 — SELECTOR DE ESCENARIO (antes «menú de niveles»): 10 escenarios del juego de escenarios activo, cada uno con su club.
     Si el club tiene más de un juego (Boca y San Lorenzo, provisorio), pestañas para cambiar: ← / → o clic. */
  const setsDelClub = () => N.CLUBES[N.activo.club].sets;
  function pestanasMenu() {
    const sets = setsDelClub(); if (sets.length < 2) return [];
    const W = sets.length >= 6 ? 222 : sets.length >= 5 ? 240 : 300, H = 42, gap = 18, x0 = (MUNDO.w - (sets.length * W + (sets.length - 1) * gap)) / 2;   // v106: hasta 5 destinos
    return sets.map((id, i) => ({ id, x: x0 + i * (W + gap), y: 368, w: W, h: H }));
  }
  function cambiarSet(paso, id) {
    const sets = setsDelClub(); if (sets.length < 2) return;
    const nuevo = id || sets[(sets.indexOf(N.activo.set) + paso + sets.length) % sets.length];
    if (nuevo === N.activo.set) return;
    N.configurar(N.activo.club, nuevo);
    console.info(`[Escenarios] ${N.SETS[nuevo].nombre} · rivales: barras de ${N.activo.rival}`);
  }
  function dibujarMenu() {
    const f = fondoMenu || fondos[1]; if (f) g.drawImage(f, 0, 0, MUNDO.w, MUNDO.h); else { g.fillStyle = ID.carbon; g.fillRect(0, 0, MUNDO.w, MUNDO.h); }
    velo(0.78);
    // v52: título = logo FURIA DE TRIBUNA (si todavía no cargó, el nombre en texto con los colores de marca)
    if (logoTitulo && logoTitulo.width) { const h = 178, w = logoTitulo.width * h / logoTitulo.height; g.drawImage(logoTitulo, (MUNDO.w - w) / 2, 16, w, h); }
    else texto(ID.NOMBRE, MUNDO.w / 2, 170, 80, ID.dorado, 'center');
    const C = N.CLUBES[N.activo.club];
    texto(`${sel.playerName.toUpperCase()} · ${sel.referenteName.toUpperCase()} · BARRA: ${C.nombre.toUpperCase()}`, MUNDO.w / 2, 232, 28, ID.hueso, 'center');
    texto('ELEGÍ EL ESCENARIO', MUNDO.w / 2, 292, 40, ID.dorado, 'center');
    texto(`ENTER: los 10 niveles en orden (así se ganan las banderas)   ·   1…9 y 0: entrar directo${pestanasMenu().length >= 5 ? '   ·   ← →: elegir rival' : ''}`, MUNDO.w / 2, 336, 22, ID.huesoSuave, 'center');
    const tabs = pestanasMenu();
    if (tabs.length) {
      for (const t of tabs) {
        const act = t.id === N.activo.set;
        g.fillStyle = act ? ID.dorado : ID.carbonA(0.7); g.fillRect(t.x, t.y, t.w, t.h);
        g.strokeStyle = act ? ID.doradoClaro : ID.dorado; g.lineWidth = 2; g.strokeRect(t.x, t.y, t.w, t.h);
        g.font = `bold ${tabs.length >= 6 ? 17 : 20}px Verdana, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';   // v107: hasta 6 destinos
        g.fillStyle = act ? ID.carbon : ID.hueso; g.fillText(N.SETS[t.id].pestana || `ESCENARIOS ${N.SETS[t.id].corto}`, t.x + t.w / 2, t.y + t.h / 2 + 1);
        g.textBaseline = 'alphabetic';
      }
      if (tabs.length < 5) texto('← → elegir rival', tabs[tabs.length - 1].x + tabs[tabs.length - 1].w + 18, 396, 18, ID.huesoSuave);   // v106: con 5 destinos va en la línea de ayuda
    } else texto(`ESCENARIOS DE ${N.SETS[N.activo.set].nombre.toUpperCase()}`, MUNDO.w / 2, 398, 24, ID.hueso, 'center');
    for (const c of casillasMenu()) {
      const P = N.pantalla(c.n);
      const mini = minis[P.mini] || fondos[c.n];                     // v45: miniatura liviana (no el fondo completo)
      if (mini) g.drawImage(mini, c.x, c.y, c.w, c.h); else { g.fillStyle = ID.carbon; g.fillRect(c.x, c.y, c.w, c.h); }
      g.strokeStyle = ID.dorado; g.lineWidth = 4; g.strokeRect(c.x, c.y, c.w, c.h);
      // v55: a qué club pertenece el escenario
      const etiqueta = N.CLUBES[P.club].corto; g.font = 'bold 14px Verdana, sans-serif'; const we = g.measureText(etiqueta).width + 14;
      g.fillStyle = ID.carbonA(0.85); g.fillRect(c.x + 6, c.y + 6, we, 22); g.fillStyle = ID.doradoClaro; g.textAlign = 'left'; g.textBaseline = 'middle';
      g.fillText(etiqueta, c.x + 13, c.y + 18); g.textBaseline = 'alphabetic';
      // nombre completo: si no entra en una línea, va en dos (sin cortar ni pisar la tarjeta de al lado)
      const lineas = partirTexto(N.tituloNivel(c.n), c.w - 20, 19);   // v71: solo «NIVEL n»
      const alto = lineas.length > 1 ? 58 : 40;
      g.fillStyle = ID.carbonA(0.62); g.fillRect(c.x, c.y + c.h - alto, c.w, alto);
      lineas.forEach((l, i) => texto(l, c.x + 10, c.y + c.h - alto + 27 + i * 23, 19, ID.hueso));
    }
    texto(`De visitante en ${N.SETS[N.activo.set].nombre}: barras de ${N.activo.rival}`, MUNDO.w / 2, 748, 26, ID.dorado, 'center');   // v106
    { const gan = banderasDe(N.activo.club).map(c => (N.DESTINOS.find(d => d.club === c) || { nombre: c }).nombre);
      texto(gan.length ? `Banderas conquistadas: ${gan.join(' · ')}` : 'Banderas conquistadas: ninguna todavía (ganá los 10 niveles de un rival)', MUNDO.w / 2, 840, 20, ID.huesoSuave, 'center'); }
    texto('ESC: volver a elegir referente   ·   P: pausa   ·   M: música sí/no   ·   − / +: volumen de la música', MUNDO.w / 2, 880, 22, ID.huesoSuave, 'center');
    dibujarAvisoMusica(782);   // v54/v55: el logo ocupa la parte de arriba; debajo de «Rivales»
  }


  function dibujarCarga() {
    const C = carga, n = C ? C.n : nivel, P = N.pantalla(n), f = minis[P.mini] || fondoMenu || galpon.fondo;
    if (f) g.drawImage(f, 0, 0, MUNDO.w, MUNDO.h); else { g.fillStyle = ID.carbon; g.fillRect(0, 0, MUNDO.w, MUNDO.h); }
    velo(0.8);
    texto(N.tituloNivel(n), MUNDO.w / 2, 330, 96, ID.dorado, 'center');
    // v71: sin nombre del lugar debajo de «NIVEL n»
    if (!C) return;
    const W = 760, x = (MUNDO.w - W) / 2, y = 470, frac = C.total ? C.hechos / C.total : 1;
    g.fillStyle = 'rgba(255,255,255,0.12)'; g.fillRect(x, y, W, 26);
    g.fillStyle = C.fallidos.length ? '#ff6b5e' : ID.dorado; g.fillRect(x, y, W * frac, 26);
    g.strokeStyle = ID.doradoA(0.8); g.lineWidth = 3; g.strokeRect(x, y, W, 26);
    texto(`Preparando el nivel · archivos listos: ${C.hechos - C.fallidos.length} de ${C.total}`, MUNDO.w / 2, y + 70, 26, ID.hueso, 'center');
    if (C.fallidos.length && C.hechos >= C.total) {
      texto(`No se pudieron bajar ${C.fallidos.length} archivos (revisá la conexión).`, MUNDO.w / 2, y + 130, 28, '#ff8a7a', 'center');
      texto('ENTER: reintentar   ·   ESC: volver al menú de niveles', MUNDO.w / 2, y + 180, 26, ID.huesoSuave, 'center');
    } else texto('ESC: volver al menú de niveles', MUNDO.w / 2, y + 120, 22, ID.huesoSuave, 'center');
  }

  const textoMusica = () => !window.Musica ? 'MÚSICA: no disponible' : Musica.silencio ? 'MÚSICA: SILENCIADA' : `MÚSICA: ${Math.round(Musica.volumen * 100)} %`;
  function dibujarAvisoMusica(y0 = 24) {   // v54: y0 = arriba del cartel (en partida va debajo del bloque central, en el menú debajo de las casillas)
    if (avisoT <= 0) return;
    g.save(); g.globalAlpha = Math.min(1, avisoT / 0.3);
    g.fillStyle = ID.carbonA(0.78); g.fillRect(MUNDO.w / 2 - 190, y0, 380, 56);
    texto(textoMusica(), MUNDO.w / 2, y0 + 38, 28, ID.dorado, 'center'); g.restore();
  }
  function dibujarPausa() {
    velo(0.7);
    const c = MUNDO.h / 2 - 60;
    texto('PAUSA', MUNDO.w / 2, c - 70, 96, ID.dorado, 'center');
    texto(textoMusica(), MUNDO.w / 2, c + 5, 34, ID.hueso, 'center');
    texto('P PARA CONTINUAR   ·   ESC: menú de niveles', MUNDO.w / 2, c + 70, 28, ID.hueso, 'center');
    texto('M: música sí/no   ·   − / +: volumen de la música', MUNDO.w / 2, c + 115, 24, ID.huesoSuave, 'center');
    // v39: franja informativa (controles y puntaje)
    const y0 = c + 150;
    g.fillStyle = 'rgba(255,255,255,0.07)'; g.fillRect(MUNDO.w / 2 - 620, y0, 1240, 206);
    g.fillStyle = ID.doradoA(0.55); g.fillRect(MUNDO.w / 2 - 620, y0, 1240, 3);
    texto('WASD: movimiento · J: piña · K: patada · L: poder', MUNDO.w / 2, y0 + 48, 26, ID.hueso, 'center');
    texto('¡Las piñas suman más puntos!', MUNDO.w / 2, y0 + 98, 32, ID.doradoClaro, 'center');
    texto('Cada golpe que quite vida con piña suma más que con patada o poder, incluido el golpe final.', MUNDO.w / 2, y0 + 140, 21, ID.hueso, 'center');
    if (ITEM) texto(`${ITEM.nombre}: aparece con ${Math.round(DJ.umbral * 100)}% de vida o menos. Tenés ${DJ.duracion} segundos para llegar y tocar J. Recupera toda la vida.`, MUNDO.w / 2, y0 + 182, 21, '#9fe08a', 'center');   // v44 · v58: el objeto del club
  }

  // v65 — presentación del bloque de campaña: «RIVER VS SAN LORENZO» (rival del set activo; sede ≠ rival)
  // v106: con la regla de visitante TODO recorrido es «<club del jugador> VS <local>»
  const rivalDeCampana = () => { const b = CAMP && CAMP.bloqueActual(); return b && b.set === N.activo.set ? `RIVAL ${CAMP.indiceBloque() + 1} DE ${CAMP.BLOQUES.length}` : ''; };   // v109 · v197
  const vsCampana = () => N.activo.sede ? `${rivalDeCampana() ? rivalDeCampana() + ' · ' : ''}${N.CLUBES[N.activo.club].corto} VS ${String(N.activo.rival).toUpperCase()}` : null;
  function dibujarIntro() {
    velo(0.6 + 0.2 * Math.max(0, 1 - estadoT));
    // v56: el jefe del nivel (El Abuelo o Matute): su guardia, su nombre y su frase. Mira hacia el texto (izquierda).
    const AJ = NIV.jefe && animEnemigos[NIV.jefe], JF = NIV.jefe && N.ESPECIALES[NIV.jefe];
    const retratoJefe = AJ ? AJ.imgs[AJ.def.anim.quieto] : (NIV.jefe === 'el_abuelo' ? abueloImg : null);   // nivel 10: manos libres, sin trapo
    if (NIV.jefe && retratoJefe) {
      const im = retratoJefe, h = 560, w = im.width * h / im.height;
      const miraDer = AJ && AJ.def.frames[AJ.def.anim.quieto].mira === 'der';
      g.save(); if (miraDer) { g.translate(2 * (MUNDO.w - 120) - w, 0); g.scale(-1, 1); }
      g.drawImage(im, MUNDO.w - w - 120, MUNDO.h - h - 40, w, h); g.restore();
      if (vsCampana()) texto(vsCampana(), 110, 130, 34, ID.doradoClaro);   // v65: RIVER VS <rival> en la campaña
      texto(`${N.tituloNivel(nivel)} DE 10`, 110, 200, 44, ID.dorado);   // v71: sin subtítulo con el nombre del lugar
      texto(JF.nombre.toUpperCase(), 110, 300, 96, ID.hueso);
      const palabras = NIV.frase.split(' '); let linea = '', y = 390;
      for (const p of palabras) { if ((linea + ' ' + p).length > 34) { texto(linea.trim(), 110, y, 34, ID.hueso); y += 50; linea = ''; } linea += ' ' + p; }
      texto(linea.trim(), 110, y, 34, ID.hueso);
      texto(`${JF.lema || ''} ENTER: ¡a pelear!`, 110, y + 90, 26, ID.huesoSuave);
    } else {
      if (vsCampana()) texto(vsCampana(), MUNDO.w / 2, MUNDO.h / 2 - 150, 52, ID.doradoClaro, 'center');   // v65
      texto(`${N.tituloNivel(nivel)} DE 10`, MUNDO.w / 2, MUNDO.h / 2 - 20, 110, ID.dorado, 'center');
    // v71: sin nombre del lugar debajo de «NIVEL n»
    }
  }

  function dibujarEspectador() {
    // Nivel 9: el Abuelo mira desde atrás con la bandera. Capa aparte (se puede cambiar su imagen sin tocar el fondo).
    const E = NIV.espectador; if (!E || !abueloImg) return;
    const c = abueloCaja, k = ALTO_PERSONAJE * E.escala / ALTO_REF_ENEMIGO;
    g.save(); g.globalAlpha = 0.35; g.fillStyle = '#000'; g.beginPath(); g.ellipse(E.x, E.y, 70 * E.escala, 12 * E.escala, 0, 0, 7); g.fill(); g.restore();
    g.drawImage(abueloImg, E.x - (c.x0 + c.x1) / 2 * k, E.y - c.y1 * k, anW(abueloImg) * k, anH(abueloImg) * k);
  }

  function dibujarEnemigo(e) {
    const id = e.luch.def.id;
    const alpha = e.st === 'ko' && e.t > tFuera(e) - 0.8 ? (Math.floor(tiempo * 12) % 2 ? 0.25 : 0.8) : 1;
    if (animEnemigos[id]) return dibujarEnemigoAnimado(e, animEnemigos[id], alpha);
    const arte = sprites[id] || siluetas[parseInt(id.slice(-2), 10) % siluetas.length];
    if (arte) dibujarFigura(e, arte, alpha);
  }

  // v68 — depuración de perspectiva (APAGADA en el juego normal): piso transitable, pies (ancla), alto/escala y alcance de golpe.
  let debugPersp = /[?&]debug=perspectiva\b/.test(location.search);
  function dibujarDebugPerspectiva(todos) {
    g.save(); g.lineWidth = 2; g.strokeStyle = '#00ff88'; g.fillStyle = 'rgba(0,255,136,.08)';
    g.beginPath(); g.moveTo(xMinEn(PISO.yMin), PISO.yMin); g.lineTo(xMaxEn(PISO.yMin), PISO.yMin);
    g.lineTo(xMaxEn(PISO.yMax), PISO.yMax); g.lineTo(xMinEn(PISO.yMax), PISO.yMax); g.closePath(); g.fill(); g.stroke();
    g.font = 'bold 16px monospace'; g.textAlign = 'left';
    for (const ent of todos) {
      const s = escalaEn(ent.y), h = ALTO_PERSONAJE * s;
      g.strokeStyle = ent === jugador ? '#ffe066' : '#ff6b6b'; g.beginPath();
      g.moveTo(ent.x - 14, ent.y); g.lineTo(ent.x + 14, ent.y); g.moveTo(ent.x, ent.y - 14); g.lineTo(ent.x, ent.y + 14);   // pies
      g.moveTo(ent.x + 30, ent.y); g.lineTo(ent.x + 30, ent.y - h); g.stroke();                                           // alto parado
      g.fillStyle = '#fff'; g.fillText(`${Math.round(h)}px ×${s.toFixed(2)}`, ent.x + 36, ent.y - h + 14);
      if (ent === jugador) {   // alcance del golpe y tolerancia de profundidad
        const al = ALCANCE[jugador.tecnica || 'pina'] * s, pr = PROF_GOLPE * factorProf(ent.y);
        g.strokeStyle = 'rgba(255,224,102,.8)'; g.strokeRect(ent.face > 0 ? ent.x : ent.x - al, ent.y - pr, al, pr * 2);
      }
    }
    g.fillStyle = '#fff'; g.fillText(PERSP ? `perspectiva: ${JSON.stringify(PERSP)}` : 'sin perfil: escala lineal del nivel', 20, MUNDO.h - 20);
    g.restore();
  }

  function dibujar() {
    if (estado === 'menu') { if (CAMP) { if (CAMP.galpon) dibujarGalpon(); else dibujarCampanaClub(); dibujarAvisoMusica(); dibujarAvisoTruco(); } else dibujarMenu(); return; }   // v64: River = galpón
    if (estado === 'cargando') { dibujarCarga(); dibujarAvisoMusica(); return; }   // v45
    if (estado === 'ranking') { dibujarRanking(); dibujarAvisoMusica(); return; }   // v40: pantalla 11 (no se dibuja el combate)
    g.drawImage(fondos[nivel], 0, 0, MUNDO.w, MUNDO.h);
    dibujarEspectador();                                                             // detrás de todos los luchadores
    dibujarDamajuana();                                                              // v44: objeto en el piso (debajo de los luchadores)
    const todos = window.Perspectiva ? Perspectiva.ordenarPorProfundidad([jugador, ...enemigos.filter(enJuego)])   // v68: más lejos primero, empates estables
                                     : [jugador, ...enemigos.filter(enJuego)].sort((a, b) => a.y - b.y);
    for (const ent of todos) {
      if (ent === jugador) {
        const parpadeo = jugador.inv > 0 && Math.floor(tiempo * 16) % 2 === 0;
        dibujarFigura(jugador, arteJugador, parpadeo ? 0.45 : 1);
      } else dibujarEnemigo(ent);
      dibujarGuardia(ent);
    }
    for (const f of efectos) {
      if (f.tipo === 'bloqueo') {                      // impacto bloqueado: aro celeste que se abre
        const a = 1 - f.t / TIEMPO.chispaBloqueo, r = 16 + f.t * 140;
        g.save(); g.globalAlpha = Math.max(0, a); g.strokeStyle = '#8fd3ff'; g.lineWidth = 6; g.translate(f.x, f.y);
        g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke();
        g.beginPath(); for (let i = 0; i < 4; i++) { const an = i * Math.PI / 2 + Math.PI / 4; g.moveTo(Math.cos(an) * r * 0.4, Math.sin(an) * r * 0.4); g.lineTo(Math.cos(an) * r * 0.9, Math.sin(an) * r * 0.9); } g.stroke(); g.restore();
        continue;
      }
      const a = 1 - f.t / TIEMPO.chispa, r = 18 + f.t * 160;
      g.save(); g.globalAlpha = Math.max(0, a); g.fillStyle = '#fff4c2'; g.translate(f.x, f.y);
      g.beginPath(); for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.45 : r, an = i / 10 * Math.PI * 2; g.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } g.fill(); g.restore();
    }
    if (debugPersp) dibujarDebugPerspectiva(todos);   // v68: solo con BB_DEBUG.perspectiva = true o ?debug=perspectiva
    dibujarPoder();
    hud();
    if (estado === 'intro') dibujarIntro();
    if (estado === 'superado') {
      cartel(`¡${N.tituloNivel(nivel)} SUPERADO!`, nivel < N.TOTAL ? `ENTER: seguir al nivel ${nivel + 1}` : 'ENTER: continuar', ID.dorado);
      dibujarResumen(MUNDO.h / 2 + 110);
    }
    if (estado === 'perdido') {
      cartel('PERDISTE', `ENTER: reintentar el nivel ${nivel}   ·   ESC: menú de niveles`, '#ff6b5e');
      texto(`PUNTAJE: ${puntajeVisible()}`, MUNDO.w / 2, MUNDO.h / 2 + 115, 34, ID.hueso, 'center');
    }
    if (estado === 'final') {
      velo(0.8);
      // v40: la victoria con tabla es la pantalla 11 (solo campañas completas). Esto es el cierre de una PRUEBA.
      texto('NIVEL 10 SUPERADO', MUNDO.w / 2, MUNDO.h / 2 - 60, 80, ID.dorado, 'center');
      texto('Sesión de prueba: este resultado no participa del ranking.', MUNDO.w / 2, MUNDO.h / 2 + 10, 30, ID.hueso, 'center');
      texto(nivelInicioPartida === 1 ? 'Campaña incompleta: no se jugaron los 10 niveles en orden' : `Prueba desde el nivel ${nivelInicioPartida}`, MUNDO.w / 2, MUNDO.h / 2 + 80, 28, ID.hueso, 'center');
      texto(`PUNTAJE FINAL: ${puntajeVisible()}`, MUNDO.w / 2, MUNDO.h / 2 + 140, 44, ID.hueso, 'center');
      dibujarResumen(MUNDO.h / 2 + 190);
      texto('ENTER: jugar la campaña de nuevo   ·   ESC: menú de niveles', MUNDO.w / 2, MUNDO.h / 2 + 250, 26, ID.huesoSuave, 'center');
    }
    if (DIAG.ia && (estado === 'jugando' || estado === 'intro')) dibujarDiagIA();
    if (pausado) dibujarPausa();
    dibujarAvisoMusica(HUD_CENTRO.abajo || 24);   // v54: debajo de PUNTAJE / NIVEL / RIVALES
  }

  /* ---------------- Bucle ---------------- */
  let ultimo = 0, pausaConsola = false, invencibleDebug = false, estadoMusica = null;   // solo desde la consola, para probar el recorrido   // pausa solo desde la consola: BB_DEBUG.pausa = true
  function bucle(ms) {
    const dt = Math.min(0.05, (ms - ultimo) / 1000 || 0); ultimo = ms;
    avisoT = Math.max(0, avisoT - dt);
    const pausaDebug = pausaConsola || pausado;      // la pausa del jugador congela igual que la de consola
    if (!pausaDebug) { tiempo += dt; estadoT += dt; }
    if (estado === 'intro' && !pausaDebug && estadoT > (NIV.jefe ? TIEMPO.introJefe : TIEMPO.introNivel)) { estado = 'jugando'; estadoT = 0; }
    if (poderActivo && estado !== 'jugando') cortarPoder();         // v35: perder, ganar o salir corta la activación
    sincronizarMediosPoder(pausaDebug);                              // v35: la pausa congela la lluvia (video y sonido)
    if (estado === 'superado' && !pausaDebug && estadoT > PT.conteo.resumen) pasarDeNivel();   // v39: más tiempo para leer el resumen
    if (estado === 'conteo' && !pausaDebug) actualizarConteo(dt);
    if (estado === 'jugando' && !pausaDebug) {
      actualizarPoder(dt);
      actualizarJugador(dt);
      for (const e of enemigos) actualizarEnemigo(e, dt);
      efectos.forEach(f => f.t += dt); efectos = efectos.filter(f => f.t < (f.tipo === 'bloqueo' ? TIEMPO.chispaBloqueo : TIEMPO.chispa));
      if (jugador.st === 'ko' && dama) { console.info('[Damajuana] murió: se retira'); dama = null; }   // v44: con vida 0 gana la muerte
      if (jugador.st === 'ko' && jugador.t > 2.4) { estado = 'perdido'; estadoT = 0; }   // v87: se llega a ver la pose final tendido antes del cartel
      else if (jugador.st !== 'damajuana' && enemigos.every(e => e.st === 'fuera')) {   // v44: el cierre espera a que termine de beber
        // no hay transición mientras queden oleadas, el especial o el jefe
        if (!siguienteOleada()) { console.info(`[Nivel ${nivel}] superado`); empezarConteo(); }   // v39: primero el conteo del bonus
      }
      if (estado === 'jugando') actualizarDamajuana(dt);              // v44: después del cierre (si el nivel terminó, no aparece)
    }
    // música: los temas de nivel suenan en 'intro' y 'jugando'. v68: el galpón de la campaña ('menu' con CAMP) tiene su tango
    // («Sangre maleva»): arranca DESDE EL PRINCIPIO cada vez que se entra al galpón y se corta al salir (CONTINUAR → carga → combate,
    // resultados, etc.). Solo se mira el CAMBIO de estado: dibujar, cambiar trofeos o textos no la reinicia.
    if (estado !== estadoMusica) {
      estadoMusica = estado;
      if (window.Musica) {
        if (estado === 'menu' && CAMP && CAMP.galpon) { if (Musica.activarSonido) Musica.activarSonido(); Musica.tocar('galpon'); }   // v131: siempre suena al entrar
        else if (estado !== 'intro' && estado !== 'jugando') Musica.detener(estado !== 'menu');
      }
    }
    dibujar();
    requestAnimationFrame(bucle);
  }

  /* ---------------- Arranque ---------------- */
  let abueloImg = null, abueloCaja = null;
  (function () {
    // v45: el selector de niveles se muestra YA. Solo se piden miniaturas livianas (prioridad alta, sin esperarlas) y,
    // detrás, las poses del protagonista elegido (las necesita cualquier nivel). Nada de los diez niveles completos.
    if (CAMP) { CAMP.iniciar(sel.id); if (CAMP.galpon) cargarGalpon(); console.info(`[Campaña] ${N.activo.club} con ${sel.referenteName} · completados: ${CAMP.estado.completados.join(', ') || 'ninguno'} · bloque ${CAMP.indiceBloque() + 1}`); }   // v64: el galpón primero
    // v191 — MODO DESARROLLADOR: sin pasar por el galpón, directo a la pelea contra el rival elegido (una sola vez al entrar)
    if (CAMP && CAMP.DEV) { const t0 = performance.now(), iv = setInterval(() => {
      if (estado === 'menu' && !galpon.transicion && !galpon.mov) { clearInterval(iv); console.info(`[Desarrollador] ${N.activo.club} vs ${CAMP.DEV.rival} · pantalla ${CAMP.estado.nivel}`); continuarCampana(); }
      else if (performance.now() - t0 > 20000) clearInterval(iv); }, 120); }
    if (!CAMP || !CAMP.galpon) pedir('assets/escenarios/mini/menu_fondo.webp').then(im => { fondoMenu = im; });
    pedir('assets/logos/furia_de_tribuna.webp').then(im => { logoTitulo = im; });   // v52
    // v55: miniaturas de todos los juegos de escenarios que puede elegir el club (River: 10 · Boca y San Lorenzo: 30)
    if (!CAMP) for (const sid of N.CLUBES[N.activo.club].sets) for (const P of N.SETS[sid].niveles) pedir(P.mini).then(im => { minis[P.mini] = im; });   // v64: con la campaña, las del bloque se piden al CONTINUAR
    archivosJugador().forEach(f => pedir(f, 'alta'));
    if (ITEM) cajaDama = { y0: ITEM.cajaObjeto.y0, y1: ITEM.cajaObjeto.y1, cx: (ITEM.cajaObjeto.x0 + ITEM.cajaObjeto.x1) / 2 };   // v58: del objeto del club   // v44: caja fija de la damajuana (px del original)
    console.info(`[Jugador] ${sel.playerName} con ${sel.referenteName} · Fuerza ${sel.stats.Fuerza} (×${sel.strengthMultiplier})`);
    usarNivel(1); jugador = nuevoJugador();
    const pedido = +new URLSearchParams(location.search).get('nivel');     // juego.html?nivel=7 entra directo
    if (pedido >= 1 && pedido <= N.TOTAL) prepararNivel(pedido); else estado = 'menu';
    // Solo para depurar desde la consola (no se ve en pantalla)
    window.BB_DEBUG = { get estado() { return estado; }, get jugador() { return jugador; }, get enemigos() { return enemigos; },
                       get nivel() { return nivel; }, get cola() { return cola; }, escala: y => escalaEn(y), poseEnemigo(e) { const A = e && animEnemigos[e.luch.def.id]; return A ? poseEnemigo(e, A.def, A) : null; },   // v47: cuadro de un enemigo animado
                       get cuadroDibujado() { return cuadroDibujado; }, andar8(e, dx, dy, dt) { andar8(e, dx, dy, dt); }, avanzarTiempo(dt) { tiempo += dt; }, get tiempo() { return tiempo; }, golpearEnemigo(e) { recibirGolpeEnemigo(e, jugador.x < e.x ? 1 : -1, false); }, get diagIA() { return DIAG.ia; }, set diagIA(v) { DIAG.ia = !!v; }, get registroAtaques() { return registroAtaques; }, get limites() { return { yMin: PISO.yMin, yMax: PISO.yMax, xMinEn, xMaxEn }; },   // v192: solo pruebas   // v83
                       get cuadroJugador() { if (!arteJugador || arteJugador.tipo !== 'frames') return null; const f = frameDe(jugador, arteJugador); return typeof f === 'object' ? (f.espejo ? f.id + '~' : f.id) : f; },   // v46: cuadro que se dibuja (~ = espejado)
                        irAlNivel, empezar() { if (estado === 'intro') { estado = 'jugando'; estadoT = 0; } },
                       get pausa() { return pausaConsola; }, set pausa(v) { pausaConsola = !!v; }, get pausado() { return pausado; },
                       get invencible() { return invencibleDebug; }, set invencible(v) { invencibleDebug = !!v; },
                       get poder() { return { carga: poderCarga, total: PD.CARGA_TOTAL, inicioNivel: poderCargaInicioNivel, activo: poderActivo ? { t: poderActivo.t, aplicado: poderActivo.aplicado, objetivos: poderActivo.objetivos.length, tipo: poderActivo.pres.tipo } : null }; },   // v35: solo lectura
                       pasarDeNivel, ganarBanderas, banderasDe, irASala, get campana() { return CAMP ? { ...CAMP.estado, bloque: CAMP.bloqueActual() && CAMP.bloqueActual().id, trofeos: CAMP.trofeos(), terminada: CAMP.terminada(), set: N.activo.set, transicion: galpon.transicion, fondoListo: !!galpon.fondo, fondo: galpon.fondoSrc, referente: sel.id, mate: !!galpon.mate, capas: Object.keys(galpon.capas), sala: galpon.sala, moviendo: !!galpon.mov, cuadro: galpon.cuadro, radio: !!galpon.radio, radioActiva: estado === 'menu' && galpon.sala === 0 && radioSonando() && !movReducido.matches, faltas: galpon.faltas, foco: galpon.foco, hover: galpon.hover, reposo: poseReposo(), refListo: !!(galpon.ref && galpon.ref.imgs[galpon.ref.def.anim.quieto[0]]) } : null; },   // v64
                       continuarCampana, nuevaCampana,
                       get perspectiva() { return debugPersp; }, set perspectiva(v) { debugPersp = !!v; },   // v68: depuración visual
                       get perfil() { return PERSP; }, get avisoTruco() { return avisoTruco && avisoTruco.texto; },
                       get galpon() { return { sala: galpon.sala, piezas: Object.keys(galpon.piezas).length, lista: Object.keys(galpon.piezas), mov: !!galpon.mov }; }, get huecos() { return huecosDebug; }, set huecos(v) { huecosDebug = !!v; },
                       ganarNivel() { if (estado === 'jugando' || estado === 'intro') { cola.length = 0; enemigos = []; empezarConteo(); } },   // v64: solo para pruebas (consola): gana la pantalla actual
                       cargarPoder() { poderCarga = PD.CARGA_TOTAL; },   // v56: solo para pruebas (consola): llena la barra de poder
                       get hudAncho() { return HUD.ancho; },
                       get damajuana() { return { activa: dama && { ...dama, restante: +(DJ.duracion - dama.t).toFixed(3) }, armada: damaArmada, creadas: damasCreadas, config: DJ }; },   // v44: solo lectura
                       get carga() { return { estado, carga: carga && { n: carga.n, hechos: carga.hechos, total: carga.total, fallidos: carga.fallidos.length }, registro: registro.size, activos, colaAlta: colaAlta.length, colaBaja: colaBaja.length, ...cargaStats }; },   // v45: solo lectura
                       get combo() { const p = jugador; return p && { seq: { ...p.seq }, finAtaque: { ...p.finAtaque }, buffer: p.buffer, variante: p.variante, extra: p.extra, golpes: p.golpes.slice() }; },   // v43: solo lectura
                       get ranking() { return { partidaId, nivelesGanados: [...nivelesGanados], resultado: resultadoRanking && { estado: resultadoRanking.estado, puesto: resultadoRanking.puesto, cantidad: resultadoRanking.cantidad, total: resultadoRanking.total } }; },   // v40: solo lectura
                       get puntaje() { return { total: puntaje, visible: puntajeVisible(), modo: modoPartida, desdeNivel: nivelInicioPartida, nivel: ptsNivel && { ...ptsNivel }, conteo: conteo && { ...conteo } }; } };   // v39: solo lectura
    requestAnimationFrame(ms => { ultimo = ms; bucle(ms); });
  })();
})();
