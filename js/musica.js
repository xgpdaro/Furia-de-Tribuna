/* =====================================================================
   BARRAS BRAVAS — Música de los niveles (v25)
   ---------------------------------------------------------------------
   · Un SOLO reproductor (<audio>) para todo el juego: al cambiar de nivel
     se detiene el tema anterior y se cambia la fuente. Nunca hay dos.
   · Se carga solo el tema del nivel actual (no se decodifican los diez).
     Al salir del nivel se libera la fuente.
   · Bucle con el mecanismo del navegador (audio.loop).
   · Ganancia de reproducción por tema (los archivos NO se modifican):
     se igualan a ≈ -17 LUFS medidos con ffmpeg (ebur128). Nunca > 1.
   · Volumen y silencio de MÚSICA guardados en localStorage. No afectan
     otros sonidos (el juego por ahora no tiene efectos de sonido).
   · Errores de carga/reproducción: se avisa por consola y el juego sigue.
     Nivel 7: si el navegador no reproduce OPUS se usa la copia convertida
     a AAC (una sola vez, sin reintentos infinitos).
   ===================================================================== */
(function (global) {
  'use strict';

  const CARPETA = 'assets/audio/niveles/';
  // nivel → archivo(s) en orden de preferencia, con su ganancia de reproducción
  //   ganancia = 10^((-17 - LUFS medido) / 20), tope 1
  const TEMAS = {
    1:  [{ src: 'nivel_1.mp4', tipo: 'audio/mp4', ganancia: 0.82 }],   // -15.3 LUFS
    2:  [{ src: 'nivel_2.mp4', tipo: 'audio/mp4', ganancia: 1.00 }],   // -17.5
    3:  [{ src: 'nivel_3.mp4', tipo: 'audio/mp4', ganancia: 0.99 }],   // -17.1
    4:  [{ src: 'nivel_4.mp4', tipo: 'audio/mp4', ganancia: 0.93 }],   // -16.4
    5:  [{ src: 'nivel_5.mp4', tipo: 'audio/mp4', ganancia: 0.97 }],   // -16.7
    6:  [{ src: 'nivel_6.mp4', tipo: 'audio/mp4', ganancia: 0.94 }],   // -16.5
    7:  [{ src: 'nivel_7_compatible.mp4', tipo: 'audio/mp4', ganancia: 0.41 }], // -9.2 (copia MP3 · v104: se quitó el .ogg duplicado para hacer lugar en la versión web)
    8:  [{ src: 'nivel_8.mp4', tipo: 'audio/mp4', ganancia: 0.39 }],   // -8.7
    9:  [{ src: 'nivel_9.mp4', tipo: 'audio/mp4', ganancia: 0.68 }],   // -13.7
    10: [{ src: 'nivel_10.mp4', tipo: 'audio/mp4', ganancia: 0.32 }],   // -7.1
    // v68: galpón TROFEOS DE GUERRA — «Sangre maleva» (De Angelis / Larroca), archivo aportado. -20.1 LUFS → ganancia 1 (tope).
    //      M4A original primero; si el navegador no lo reproduce, copia MP3 convertida desde ese mismo archivo.
    galpon: [{ ruta: 'assets/audio/menus/galpon_sangre_maleva.mp4', tipo: 'audio/mp4', ganancia: 1.00 }],   // v104: solo la copia MP3 (el .mp4 duplicado se quitó por espacio)
    // v149 — NIVELES 9 Y 10: canción de la barra LOCAL (el rival de esa cancha), los MISMOS archivos de los selectores de referentes
    //        (sin duplicarlos). La elige js/juego.js por Niveles.activo.sede, nunca por la barra ni el referente del jugador.
    local_boca:          [{ ruta: 'assets/audio/menus/selector_boca_la12_quiero_ver.mp3', tipo: 'audio/mpeg', ganancia: 0.72 }],            // -14.2 LUFS · «Quiero ver a La 12»
    local_racing:        [{ ruta: 'assets/audio/menus/selector_racing_mi_buen_amigo.mp4', tipo: 'audio/mp4', ganancia: 0.52 }],             // -11.3 · «Racing mi buen amigo»
    local_independiente: [{ ruta: 'assets/audio/menus/selector_independiente_yo_soy_del_rojo.mp4', tipo: 'audio/mp4', ganancia: 0.51 }],    // -11.2 · «Yo soy del Rojo»
    local_san_lorenzo:   [{ ruta: 'assets/audio/menus/selector_san_lorenzo_senores_soy_de_boedo.mp4', tipo: 'audio/mp4', ganancia: 0.74 }], // -14.4 · «Señores soy de Boedo»
    local_talleres:      [{ ruta: 'assets/audio/menus/selector_talleres_vos_sos_mi_pasion.mp4', tipo: 'audio/mp4', ganancia: 0.67 }],  // v182: -13.5 · «Talleres vos sos mi pasión» (m4a aportado, sin recodificar)
    local_belgrano:      [{ ruta: 'assets/audio/menus/selector_belgrano_la_mejor_cancion.mp4', tipo: 'audio/mp4', ganancia: 0.49 }],  // v183: -10.8 · «La mejor canción de hinchadas del mundo la tiene Belgrano» (m4a aportado, sin recodificar)
    local_chicago:       [{ ruta: 'assets/audio/menus/selector_chicago_yo_de_bebe.mp4', tipo: 'audio/mp4', ganancia: 0.22 }],  // v184: -3.7 · «Yo de bebé» Los Pibes de Chicago (m4a aportado, sin recodificar)
    local_laferrere:     [{ ruta: 'assets/audio/menus/selector_laferrere_loop.mp4', tipo: 'audio/mp4', ganancia: 0.54 }],   // v186: corte de Darío para loop (WAV aportado → AAC 192k en MP4, por espacio) · -11.6 · «Faso, vino y pala es la banda de Laferrere» (m4a aportado, sin recodificar)
    local_newells:       [{ ruta: 'assets/audio/menus/selector_newells_en_todos_lados.mp4', tipo: 'audio/mp4', ganancia: 0.68 }],   // v187: -13.7 · «En todos lados la vas a ver» (m4a aportado, sin recodificar)
    local_central:       [{ ruta: 'assets/audio/menus/selector_central_canalla_te_prometo.mp4', tipo: 'audio/mp4', ganancia: 0.48 }]   // v188: -10.6 · «Canalla te prometo» (corte WAV de Darío 00:07–01:15 → AAC 128k, por espacio)
  };

  const CLAVE = 'barrasBravas.musica';
  const prefs = { volumen: 0.8, silencio: false };
  try { Object.assign(prefs, JSON.parse(localStorage.getItem(CLAVE)) || {}); } catch (e) { /* sin localStorage: queda en memoria */ }
  prefs.volumen = Math.min(1, Math.max(0, +prefs.volumen || 0)); prefs.silencio = !!prefs.silencio;
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(prefs)); } catch (e) { /* idem */ } };

  const audio = new Audio();
  audio.loop = true; audio.preload = 'auto';
  let nivel = 0, opcion = 0, ganancia = 1, pausada = false, oculta = false, esperandoGesto = false, fundido = null;
  const estadoDebug = { reproducciones: 0, errores: [], bloqueos: 0 };

  const aplicarVolumen = (factor = 1) => { audio.volume = Math.min(1, prefs.volumen * ganancia * factor); audio.muted = prefs.silencio; };
  const cortarFundido = () => { if (fundido) { clearInterval(fundido); fundido = null; } };

  function elegirOpcion(n, desde) {
    const ops = TEMAS[n] || [];
    for (let i = desde; i < ops.length; i++) if (i === ops.length - 1 || audio.canPlayType(ops[i].tipo)) return i;
    return -1;
  }

  let generacion = 0;   // v68: cada cambio de tema/parada la incrementa; una promesa play() atrasada de otra pantalla se ignora
  function intentarPlay() {
    if (!nivel || pausada || oculta) return;
    const gen = generacion, p = audio.play();
    if (p && p.catch) p.catch(err => {
      if (gen !== generacion || !nivel) return;            // ya se cambió de pantalla: no se reintenta nada
      if (err && err.name === 'NotAllowedError') {       // el navegador pide un gesto: se reintenta UNA vez en la próxima tecla/clic
        esperandoGesto = true; estadoDebug.bloqueos++;
        console.info('[Música] el navegador bloqueó el inicio automático; arranca con la próxima tecla o clic');
      } else if (err && err.name !== 'AbortError') console.warn('[Música] no se pudo reproducir:', err.message || err);
    });
  }

  function cargarOpcion(n, i) {
    const t = TEMAS[n][i]; opcion = i; ganancia = t.ganancia; generacion++;
    audio.src = t.ruta ? encodeURI(t.ruta) : CARPETA + encodeURIComponent(t.src).replace(/%2F/g, '/');
    aplicarVolumen(); estadoDebug.reproducciones++;
    console.info(`[Música] ${typeof n === 'number' ? 'nivel ' + n : n}: ${t.ruta || t.src} (ganancia ${t.ganancia})`);
    intentarPlay();
  }

  audio.addEventListener('error', () => {
    if (!nivel) return;                                  // error al vaciar la fuente: se ignora
    const t = TEMAS[nivel][opcion];
    const sig = elegirOpcion(nivel, opcion + 1);
    const nom = x => x.ruta || x.src;
    estadoDebug.errores.push(nom(t));
    if (sig > opcion) { console.warn(`[Música] no se pudo cargar ${nom(t)}; uso ${nom(TEMAS[nivel][sig])}`); cargarOpcion(nivel, sig); }
    else { console.warn(`[Música] no se pudo cargar ${nom(t)}; «${nivel}» sigue sin música`); liberar(); }
  });

  function liberar() { nivel = 0; generacion++; audio.pause(); audio.removeAttribute('src'); audio.load(); }

  // Arranca el tema del nivel n DESDE EL PRINCIPIO (entrar, pasar de nivel o reintentar).
  function tocar(n) {
    cortarFundido(); pausada = false;
    if (!TEMAS[n]) { detener(); return; }
    const i = elegirOpcion(n, 0);
    if (nivel === n && i === opcion && audio.getAttribute('src')) {   // mismo tema: se rebobina, no se crea otro
      audio.currentTime = 0; aplicarVolumen(); intentarPlay(); return;
    }
    audio.pause(); nivel = n; cargarOpcion(n, i);
  }

  // Detiene la música del nivel (menú, victoria, derrota, final). Con fundido corto opcional.
  function detener(conFundido) {
    cortarFundido(); esperandoGesto = false; pausada = false;
    if (!nivel) return;
    if (!conFundido || audio.paused) { liberar(); return; }
    let f = 1;
    fundido = setInterval(() => { f -= 0.1; if (f <= 0) { cortarFundido(); liberar(); } else aplicarVolumen(f); }, 40);
  }

  function pausar() { if (!nivel) return; pausada = true; cortarFundido(); aplicarVolumen(); audio.pause(); }
  function reanudar() { if (!nivel) return; pausada = false; intentarPlay(); }   // sigue desde la misma posición

  function cambiarVolumen(delta) { prefs.volumen = Math.round(Math.min(1, Math.max(0, prefs.volumen + delta)) * 10) / 10; if (delta > 0) prefs.silencio = false; aplicarVolumen(); guardar(); }
  function alternarSilencio() { prefs.silencio = !prefs.silencio; aplicarVolumen(); guardar(); }
  // v131: el galpón arranca SIEMPRE con música (sin silencio y con volumen audible); para no escucharla, la tecla M
  function activarSonido() { prefs.silencio = false; if (prefs.volumen < 0.3) prefs.volumen = 0.8; aplicarVolumen(); guardar(); }

  // Desbloqueo por gesto del usuario: si el navegador frenó el autoplay, se reintenta en la próxima interacción.
  const gesto = () => { if (esperandoGesto) { esperandoGesto = false; intentarPlay(); } };
  addEventListener('keydown', gesto, true); addEventListener('pointerdown', gesto, true);
  // Pestaña oculta: el juego se congela (requestAnimationFrame se detiene), la música también.
  document.addEventListener('visibilitychange', () => { oculta = document.hidden; if (oculta) audio.pause(); else intentarPlay(); });

  global.Musica = {
    TEMAS, tocar, detener, pausar, reanudar, cambiarVolumen, alternarSilencio, activarSonido,
    get volumen() { return prefs.volumen; }, get silencio() { return prefs.silencio; },
    get nivel() { return nivel; },
    // solo para depurar/probar desde la consola
    get debug() { return { nivel, src: audio.getAttribute('src'), paused: audio.paused, tiempo: audio.currentTime, volumen: audio.volume,
                           muted: audio.muted, loop: audio.loop, pausada, esperandoGesto, ...estadoDebug }; },
    _audio: audio
  };
})(typeof window !== 'undefined' ? window : globalThis);
