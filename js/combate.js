/* =====================================================================
   BARRAS BRAVAS — Sistema de daño (usa js/reglas_combate.js)
   ---------------------------------------------------------------------
   Esta etapa cubre SOLO: quién pega, con qué ataque, cuánto daño hace
   (base × Fuerza) y cuánta vida le queda al que recibe.
   Movimiento, hitboxes, IA y oleadas son etapas siguientes.
   ===================================================================== */
(function (global) {
  'use strict';
  const R = global.ReglasCombate;
  if (!R) throw new Error('Falta cargar js/reglas_combate.js antes de js/combate.js');

  class Luchador {
    /* nombreHUD: lo que se muestra en la barra (para el jugador, SU nombre).
       referente: objeto de R.REFERENTES, o null para un enemigo genérico. */
    constructor({ nombreHUD, referente = null, vidaMax, esJugador = false }) {
      this.nombreHUD = nombreHUD;
      this.referente = referente;
      this.vidaMax = vidaMax;
      this.vida = vidaMax;              // se guarda con decimales; el HUD redondea
      this.esJugador = esJugador;
    }
    get estaKO() { return this.vida <= 0; }
    get porcentajeVida() { return Math.max(0, this.vida) / this.vidaMax * 100; }

    // Calcula el daño que ESTE luchador hace con un ataque (sin aplicarlo).
    danioDe(ataque) {
      if (!this.referente) throw new Error('Este luchador no tiene referente: definí su daño aparte.');
      return R.danioOfensivo(this.referente, ataque);
    }

    /* ÚNICA resolución de daño de TODOS los golpes (piña, patada, codazo, cabezazo,
       combo del agarre y golpes de los enemigos), vengan de adelante o de atrás.
       1) daño normal = ofensivo con el Aguante (enchufado, hoy sin efecto)
       2) daño final  = normal × pctBloqueo ÷ 100 (js/defensa.js), UNA sola vez,
          sin redondear y sin mínimo: 0 % es exactamente 0. */
    recibir(danioOfensivo, pctBloqueo = 100) {
      const normal = R.modificadorAguante(this, danioOfensivo);
      const danio = pctBloqueo === 100 ? normal : normal * pctBloqueo / 100;
      this.vida = Math.max(0, this.vida - danio);
      this.ultimoNormal = normal;
      return danio;
    }

    // Golpea a otro luchador y devuelve el detalle del cálculo.
    // v43: extra = multiplicador de la VARIANTE del golpe (1 = izquierda · 1.10 = derecha del combo). Se aplica ANTES del bloqueo.
    atacar(objetivo, ataque, pctBloqueo = 100, extra = 1) {
      const ref = this.referente;
      const detalle = {
        ataque,
        especialidad: R.esEspecialidad(ref, ataque),
        base: R.danioBase(ref, ataque),
        multiplicador: R.multiplicadorAtaque(ref, ataque),  // v32: 1 si el ataque tiene daño fijo
        extra                                                 // v43: variante del combo (sin redondear: 8 × 1.10 = 8.8 exacto)
      };
      detalle.ofensivo = detalle.base * detalle.multiplicador * extra;
      detalle.pctBloqueo = pctBloqueo;
      detalle.aplicado = objetivo.recibir(detalle.ofensivo, pctBloqueo);
      detalle.vidaRestante = objetivo.vida;
      detalle.ko = objetivo.estaKO;
      return detalle;
    }
  }

  // Crea al jugador a partir de lo guardado por el selector.
  function crearJugador(seleccion) {
    const ref = R.referentePorId(seleccion.id);
    return new Luchador({
      nombreHUD: seleccion.playerName,    // SIEMPRE el nombre del jugador, nunca el del referente
      referente: ref,
      vidaMax: R.BALANCE.vidaBaseJugador,
      esJugador: true
    });
  }

  /* ---- Enemigos (hinchas, especiales y jefe) ---------------------------
     Vida y daño ya vienen calculados para el nivel por Niveles.statsEnemigo
     (base del tipo × escalado del nivel). Acá no se vuelve a escalar nada.
     Solo usan dos golpes: piña y patada. */
  function crearEnemigo(def, stats) {
    const e = new Luchador({ nombreHUD: def.nombre, vidaMax: stats.vida });
    e.def = def;
    e.golpes = { pina: stats.pina, patada: stats.patada };
    if (stats.cabezazo) e.golpes.cabezazo = stats.cabezazo;   // solo especiales con cuadro de cabezazo
    if (stats.especial) e.golpes.especial = stats.especial;   // v69: golpe especial de los policías
    return e;
  }
  // Golpe de un enemigo común al jugador. El Aguante del jugador queda enchufado (hoy sin efecto).
  function golpeEnemigo(enemigo, jugador, tipo, pctBloqueo = 100) {
    const danio = enemigo.golpes[tipo];
    if (danio == null) throw new Error(`Los enemigos comunes no tienen el golpe "${tipo}"`);
    const aplicado = jugador.recibir(danio, pctBloqueo);
    return { tipo, danio, pctBloqueo, aplicado, vidaRestante: jugador.vida, ko: jugador.estaKO };
  }

  /* ---- Dos botones de ataque ----------------------------------------
     J (A) = Trompadas · K (B) = Patadas. Nada más: listo para dos botones en mobile.
     El agarre NO tiene botón: es automático (ver COMBO_AGARRE y js/juego.js).
     TODO(diseño): cuándo sale Codazo en vez de Trompada, o Rodillazo en vez
     de Patada (distancia, secuencia, especialidad). Hoy sale siempre la primera. */
  const BOTONES = { A: ['Trompadas', 'Codazos'], B: ['Patadas', 'Rodillazos'] };
  function elegirTecnica(boton) { return BOTONES[boton][0]; }

  /* ---- v43: COMBO izquierda → izquierda → derecha (J y K, los tres protagonistas) ----
     Cada botón lleva SU contador (una patada no avanza las piñas ni al revés). El paso se decide al EMPEZAR el golpe.
     Valores iniciales ajustables. Tiempos de juego: la pausa los congela. */
  const COMBO_GOLPES = {
    secuencia: ['izq', 'izq', 'der'],  // 1.º y 2.º = izquierda original aprobada · 3.º = derecha nueva; después vuelve a empezar
    extraDerecha: 1.10,                 // la derecha hace exactamente +10 % del daño de la izquierda del mismo personaje y tipo
    reinicio: 1.0,                      // s sin golpes de ESE botón, contados desde que terminó su recuperación → vuelve al 1.º
    buffer: 0.15                        // s finales de la recuperación en que se guarda UNA pulsación para encadenar
  };
  const extraDeVariante = v => v === 'der' ? COMBO_GOLPES.extraDerecha : 1;

  /* ---- Combo de agarre (V3) ------------------------------------------
     Agarre automático → J = piña → J (dentro de la ventana) = cabezazo que derriba.
     Daños FIJOS del combo, para balancear acá. No tocan el Cabezazo base global (7).
     aplicaFuerza: false = se usan tal cual (7 y 10, total 17) como pide el prompt V3.
     TODO(Darío): confirmar si la Fuerza también multiplica el combo. */
  const COMBO_AGARRE = {
    porDefecto: { pina: 7, cabezazo: 10, ventana: 1.0, aplicaFuerza: false },  // TODO(diseño): valores de los otros referentes
    alan:       { pina: 7, cabezazo: 10, ventana: 1.0, aplicaFuerza: false },
    el_gallego: { pina: 7, cabezazo: 10, ventana: 1.0, aplicaFuerza: false }   // v58: = Alan
  };
  COMBO_AGARRE.william = { ...COMBO_AGARRE.alan };   // v82: William = Alan (copia: no comparte el objeto)
  const comboDe = ref => COMBO_AGARRE[(ref && ref.id)] || COMBO_AGARRE.porDefecto;

  // Aplica un golpe del combo (paso = 'pina' | 'cabezazo') y devuelve el detalle.
  function golpeCombo(atacante, objetivo, paso, pctBloqueo = 100) {
    const cfg = comboDe(atacante.referente);
    const base = cfg[paso], multiplicador = cfg.aplicaFuerza ? R.multiplicadorFuerza(atacante.referente) : 1;
    const d = { ataque: paso === 'pina' ? 'Agarres' : 'Cabezazos', combo: paso, especialidad: false, base, multiplicador, ofensivo: base * multiplicador };
    d.pctBloqueo = pctBloqueo;
    d.aplicado = objetivo.recibir(d.ofensivo, pctBloqueo);
    d.vidaRestante = objetivo.vida; d.ko = objetivo.estaKO;
    return d;
  }

  global.Combate = { Luchador, crearJugador, crearEnemigo, golpeEnemigo, BOTONES, elegirTecnica, COMBO_GOLPES, extraDeVariante, COMBO_AGARRE, comboDe, golpeCombo };
})(typeof window !== 'undefined' ? window : globalThis);
