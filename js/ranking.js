/* =====================================================================
   BARRA 14 — Ranking local: top 50 guardado, top 15 visible (pantalla 11)
   ---------------------------------------------------------------------
   DÓNDE SE GUARDA: en el almacenamiento del navegador (localStorage), clave 'barra14.ranking.v1'.
   Es LOCAL: pertenece a ese navegador, a ese perfil y a ese origen (la carpeta del juego abierta como
   archivo). No se comparte entre computadoras. Borrar los datos del navegador borra el ranking.
   El acceso directo ABRIR_JUEGO_CON_MUSICA.bat usa un perfil fijo de Chrome/Edge (ver el .bat).

   Reglas: se guardan como máximo los 50 mejores (de mayor a menor). En empate queda primero el que ya
   estaba (orden estable). Con 50 guardados, un puntaje menor o igual al puesto 50 no se guarda.
   Cada partida tiene un id único: aunque se repita el evento final, se registra una sola vez.
   Los nombres se dibujan como TEXTO en un canvas (nunca como HTML).
   ===================================================================== */
(function (global) {
  'use strict';
  // v52: colores de marca FURIA DE TRIBUNA (js/identidad.js); respaldo si no cargó
  const ID = () => window.IDENTIDAD || { hueso: '#F5F0E4', huesoSuave: '#D8D0BE', dorado: '#C9A44A', doradoClaro: '#FFE3A0', carbon: '#151515', carbonA: a => `rgba(21,21,21,${a})`, doradoA: a => `rgba(201,164,74,${a})` };
  const CLAVE = 'barra14.ranking.v1', CLAVE_VIEJA = 'barra14.ranking', CLAVE_DANADO = 'barra14.ranking.v1.danado';
  const MAX_GUARDADOS = 50, MAX_VISIBLES = 15, MAX_NOMBRE = 12, MAX_REFERENTE = 24;

  /* ---- Nombres: caracteres VISIBLES (no parte letras acentuadas ni emojis compuestos) ---- */
  const segmentador = (typeof Intl !== 'undefined' && Intl.Segmenter) ? new Intl.Segmenter('es', { granularity: 'grapheme' }) : null;
  const caracteres = s => segmentador ? Array.from(segmentador.segment(String(s)), x => x.segment) : Array.from(String(s));
  const cortar = (s, n) => caracteres(s).slice(0, n).join('');
  // Mientras se escribe: quita los espacios del principio y corta a 10 (los del final se quitan al confirmar).
  const limitarAlEscribir = s => cortar(String(s).replace(/^\s+/, ''), MAX_NOMBRE);   // los espacios del principio no cuentan (se quitan)
  // Nombre definitivo: sin espacios al principio ni al final, espacios internos simples, máximo 12 (v180).
  const limitarNombre = s => cortar(String(s == null ? '' : s).trim().replace(/\s+/g, ' '), MAX_NOMBRE).trim();
  function validarNombre(s) {
    const nombre = limitarNombre(s);
    if (!nombre) return { ok: false, nombre: '', error: 'Ingresá tu nombre para continuar' };
    return { ok: true, nombre };
  }

  const dosDig = n => String(n).padStart(2, '0');
  const fechaDe = d => `${dosDig(d.getDate())}/${dosDig(d.getMonth() + 1)}/${d.getFullYear()}`;   // DD/MM/AAAA (día local)
  const nuevoId = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

  // Valida un registro leído (puede venir dañado o de una versión vieja). Devuelve null si no sirve.
  function normalizar(e, i) {
    if (!e || typeof e !== 'object') return null;
    const nombre = limitarNombre(e.nombre);
    const puntaje = Number(e.puntaje);
    if (!nombre || !Number.isFinite(puntaje) || puntaje < 0) return null;
    let id = typeof e.id === 'string' && /^[A-Za-z0-9_-]{4,64}$/.test(e.id) ? e.id : null;
    let fecha = typeof e.fecha === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(e.fecha) ? e.fecha : null;
    if (!fecha && typeof e.fecha === 'string' && !isNaN(Date.parse(e.fecha))) fecha = fechaDe(new Date(e.fecha));   // formato v39 (ISO)
    if (!id) {   // registros viejos sin id: uno estable a partir de sus datos (la migración no duplica)
      const base = `${nombre}|${puntaje}|${e.fecha || ''}|${i}`; let h = 0;
      for (const ch of base) h = (h * 31 + ch.codePointAt(0)) >>> 0;
      id = 'm' + h.toString(36);
    }
    // procedencia (v41): 'campaña' (1 al 10 en orden) o 'prueba' (entrada directa a un nivel). Hoy entran las dos;
    // queda guardado para poder separarlas más adelante.
    const procedencia = e.procedencia === 'campaña' || e.procedencia === 'prueba' ? e.procedencia : 'campaña';
    return { id, nombre, referente: cortar(typeof e.referente === 'string' ? e.referente : '', MAX_REFERENTE),
             puntaje: Math.floor(puntaje), fecha: fecha || '--/--/----', procedencia };
  }
  function ordenar(lista) {   // de mayor a menor; en empate, el que ya estaba antes queda primero (estable)
    return lista.map((e, i) => [e, i]).sort((a, b) => b[0].puntaje - a[0].puntaje || a[1] - b[1]).map(x => x[0]);
  }
  function limpiar(arr) {
    const vistos = new Set(), out = [];
    arr.forEach((e, i) => { const n = normalizar(e, i); if (n && !vistos.has(n.id)) { vistos.add(n.id); out.push(n); } });
    return ordenar(out).slice(0, MAX_GUARDADOS);
  }

  /* ---- Lectura: nunca rompe el juego. problema: null · 'danado' · 'sin-acceso' ---- */
  function leer() {
    let raw;
    try { raw = global.localStorage.getItem(CLAVE); } catch (err) { return { lista: [], problema: 'sin-acceso' }; }
    if (raw == null) {
      // migración de la lista de la v39 (sin límite ni id) → se pasa una sola vez y se borra la clave vieja
      let vieja = null; try { vieja = global.localStorage.getItem(CLAVE_VIEJA); } catch (err) {}
      if (vieja) {
        try {
          const lista = limpiar(JSON.parse(vieja));
          global.localStorage.setItem(CLAVE, JSON.stringify(lista));
          global.localStorage.removeItem(CLAVE_VIEJA);
          return { lista, problema: null };
        } catch (err) {}
      }
      return { lista: [], problema: null };
    }
    try {
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return { lista: [], problema: 'danado', raw };
      const lista = limpiar(arr);
      return { lista, problema: lista.length < arr.length ? 'danado-parcial' : null, raw };
    } catch (err) { return { lista: [], problema: 'danado', raw }; }
  }

  /* ---- Registro de una partida terminada ----
     r = { id, nombre, referente, puntaje }. Devuelve { estado, puesto, cantidad, lista, mensaje }:
       'nuevo'    → guardado (puesto 1…50)
       'repetido' → esa partida ya estaba (no se duplica)
       'fuera'    → no entró al top 50 (no se guarda nada)
       'error'    → no se pudo guardar (el juego sigue; se avisa) */
  function registrar(r) {
    const reg = normalizar({ ...r, fecha: r.fecha || fechaDe(new Date()) }, 0);
    const L = leer();
    if (!reg) return { estado: 'error', puesto: null, cantidad: L.lista.length, lista: L.lista, mensaje: 'Datos de la partida inválidos: no se guardaron.' };
    const ya = L.lista.findIndex(e => e.id === reg.id);
    if (ya >= 0) return { estado: 'repetido', puesto: ya + 1, cantidad: L.lista.length, lista: L.lista, id: reg.id };
    // posición: después de todos los que tienen igual o más puntaje (los anteriores ganan el empate)
    let pos = L.lista.findIndex(e => e.puntaje < reg.puntaje); if (pos < 0) pos = L.lista.length;
    if (pos >= MAX_GUARDADOS) return { estado: 'fuera', puesto: null, cantidad: L.lista.length, lista: L.lista, id: reg.id };
    const lista = L.lista.slice(); lista.splice(pos, 0, reg); lista.length = Math.min(lista.length, MAX_GUARDADOS);
    try {
      if (L.problema && L.problema.startsWith('danado') && L.raw != null) {      // no se pisa en silencio: se guarda una copia de lo dañado
        try { if (global.localStorage.getItem(CLAVE_DANADO) == null) global.localStorage.setItem(CLAVE_DANADO, L.raw); } catch (err) {}
      }
      global.localStorage.setItem(CLAVE, JSON.stringify(lista));
      const verif = leer();                                  // se confirma releyendo
      if (!verif.lista.some(e => e.id === reg.id)) throw new Error('no quedó guardado');
      return { estado: 'nuevo', puesto: pos + 1, cantidad: lista.length, lista, id: reg.id, avisoDanado: L.problema && L.problema.startsWith('danado') };
    } catch (err) {
      return { estado: 'error', puesto: pos + 1, cantidad: lista.length, lista, id: reg.id, mensaje: 'No se pudo guardar el puntaje en este navegador.' };
    }
  }

  /* ---- Pantalla 11 (la misma desde el final de la campaña y desde el selector) ----
     g: contexto 2D de un canvas de W×H (el juego usa 1672×941). o = {
       fondo: Image, lista, victoria: bool, resaltarId, mensaje, aviso, pie } */
  function dibujarPantalla11(g, W, H, o) {
    g.save();
    // v69: fondo = la imagen COMPLETA del inicio (tribuna_golpe_1986_arcade), entera y sin deformar ("contain"):
    // relleno oscuro en los márgenes si hiciera falta y un velo suave SOLO sobre el fondo para leer la tabla.
    g.fillStyle = ID().carbon; g.fillRect(0, 0, W, H);
    if (o.fondo && o.fondo.width) {
      const iw = o.fondo.naturalWidth || o.fondo.width, ih = o.fondo.naturalHeight || o.fondo.height, k = Math.min(W / iw, H / ih);
      const dw = iw * k, dh = ih * k; g.drawImage(o.fondo, (W - dw) / 2, (H - dh) / 2, dw, dh);
      g.fillStyle = 'rgba(0,0,0,0.38)'; g.fillRect((W - dw) / 2, (H - dh) / 2, dw, dh);
    }
    const t = (txt, x, y, tam, color, al = 'left', peso = 'bold') => {
      g.font = `${peso} ${tam}px Verdana, sans-serif`; g.textAlign = al; g.textBaseline = 'alphabetic';
      g.fillStyle = ID().carbon; g.fillText(txt, x + 3, y + 3); g.fillStyle = color; g.fillText(txt, x, y);
    };
    const filas = (o.lista || []).slice(0, MAX_VISIBLES);
    const PW = 960, PX = (W - PW) / 2, FILA = 26, MARGEN = 12;
    /* v42: el panel se arma como una COLUMNA de bloques, cada uno con su altura reservada.
       Nada se dibuja «encima» de otro: primero se calcula la altura total y después se pinta. */
    const ajustar = (txt, tam, peso, max) => {           // achica la letra si el texto no entra en el ancho
      let f = tam; g.font = `${peso} ${f}px Verdana, sans-serif`;
      while (f > 14 && g.measureText(txt).width > max) { f--; g.font = `${peso} ${f}px Verdana, sans-serif`; }
      return f;
    };
    const TIT = 'Ganaste, te llevaste todos los trapos';
    const fTit = o.victoria ? ajustar(TIT, 36, 'bold', PW - 60) : 0;
    const B = [];                                         // bloques: [alto, dibujar(yArriba)]
    B.push([18, null]);                                   // margen superior
    if (o.victoria) B.push([fTit + 14, y0 => t(TIT, W / 2, y0 + fTit, fTit, ID().dorado, 'center')]);
    const fSub = o.victoria ? 28 : 34;
    B.push([fSub + 10, y0 => t('Tabla de Posiciones', W / 2, y0 + fSub, fSub, ID().hueso, 'center')]);
    if (o.etiqueta) B.push([24, y0 => t(o.etiqueta, W / 2, y0 + 16, 15, ID().huesoSuave, 'center', 'normal')]);   // v42: línea propia, centrada
    const C = { pos: PX + 40, nom: PX + 200, pun: PX + 640, fec: PX + PW - 40 };
    B.push([MARGEN, null]);
    B.push([26, y0 => {
      const yb = y0 + 17;
      t('POSICIÓN', C.pos, yb, 17, ID().dorado); t('NOMBRE', C.nom, yb, 17, ID().dorado);
      t('PUNTAJE', C.pun, yb, 17, ID().dorado, 'right'); t('FECHA', C.fec, yb, 17, ID().dorado, 'right');
      g.fillStyle = ID().doradoA(0.6); g.fillRect(PX + 24, y0 + 24, PW - 48, 2);
    }]);
    B.push([6, null]);
    B.push([Math.max(1, filas.length) * FILA, y0 => {
      if (!filas.length) { t('Todavía no hay puntajes registrados', W / 2, y0 + 20, 22, ID().huesoSuave, 'center', 'normal'); return; }
      filas.forEach((e, i) => {
        const yt = y0 + i * FILA, yb = yt + 20, nuevo = o.resaltarId && e.id === o.resaltarId;
        if (nuevo) { g.fillStyle = ID().doradoA(0.38); g.fillRect(PX + 20, yt, PW - 40, FILA - 2); }
        else if (i % 2) { g.fillStyle = 'rgba(255,255,255,0.05)'; g.fillRect(PX + 20, yt, PW - 40, FILA - 2); }
        const col = nuevo ? '#ffffff' : ID().hueso;
        t(`${i + 1}º`, C.pos, yb, 19, nuevo ? ID().dorado : ID().doradoClaro);
        t(e.nombre, C.nom, yb, 19, col);                   // texto plano dibujado en el canvas
        t(String(e.puntaje), C.pun, yb, 19, col, 'right');
        t(e.fecha, C.fec, yb, 19, col, 'right');
      });
    }]);
    if (o.mensaje) { const f = ajustar(o.mensaje, 22, 'bold', PW - 60);
      B.push([MARGEN + 4, null]); B.push([f + 10, y0 => t(o.mensaje, W / 2, y0 + f, f, ID().dorado, 'center')]); }
    if (o.aviso) { const f = ajustar(o.aviso, 17, 'bold', PW - 60);
      B.push([6, null]); B.push([f + 10, y0 => t(o.aviso, W / 2, y0 + f, f, '#ff8a7a', 'center')]); }
    if (o.pie) { B.push([MARGEN, null]); B.push([30, y0 => t(o.pie, W / 2, y0 + 21, 20, ID().huesoSuave, 'center')]); }
    if (o.espacioBoton) { B.push([MARGEN, null]); B.push([o.espacioBoton, null]); }
    B.push([14, null]);                                   // margen inferior
    const PH = B.reduce((s, b) => s + b[0], 0);
    // v69: logo FURIA DE TRIBUNA arriba y centrado, en su propia capa; la tabla debajo, SIN superponerse.
    // El logo usa el lugar que queda libre (entre 70 y 190 px de alto); si no entra ni chico, no se dibuja (la tabla manda).
    const logo = o.logo && o.logo.width ? o.logo : null, MARG = 14;
    let PY = Math.max(12, H - 12 - PH);
    if (logo) {
      const lw = logo.naturalWidth || logo.width, lh = logo.naturalHeight || logo.height;
      const libre = H - PH - 3 * MARG, alto = Math.min(190, libre, (PW + 120) * lh / lw);
      if (alto >= 70) {
        const ancho = alto * lw / lh; g.drawImage(logo, (W - ancho) / 2, MARG, ancho, alto);
        PY = Math.max(MARG + alto + MARG, Math.round((MARG + alto + MARG + H - 12 - PH) / 2));   // centrado en lo que queda debajo del logo
      }
    }
    g.fillStyle = ID().carbonA(0.82); g.fillRect(PX, PY, PW, PH);
    g.strokeStyle = ID().doradoA(0.9); g.lineWidth = 3; g.strokeRect(PX, PY, PW, PH);
    let y = PY; const cajas = [];
    for (const [alto, dib] of B) { if (dib) { dib(y); cajas.push([y, alto]); } y += alto; }
    g.restore();
    return { x: PX, y: PY, w: PW, h: PH, cajas,           // cajas: [arriba, alto] de cada bloque dibujado (para verificar)
             boton: o.espacioBoton ? { cx: W / 2, cy: PY + PH - 14 - o.espacioBoton / 2 } : null };
  }
  const FONDO = 'assets/fondos/tribuna_golpe_1986_arcade.webp';   // v69: el MISMO fondo completo del inicio (antes: telón de Boca)
  const LOGO = 'assets/logos/furia_de_tribuna.webp';

  global.Ranking = { CLAVE, MAX_GUARDADOS, MAX_VISIBLES, MAX_NOMBRE, FONDO, LOGO, caracteres, limitarAlEscribir, limitarNombre,
                     validarNombre, leer, registrar, nuevoId, fechaDe, dibujarPantalla11, _normalizar: normalizar };
})(typeof window !== 'undefined' ? window : globalThis);
