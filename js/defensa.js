/* =====================================================================
   BARRAS BRAVAS — Defensa (cubrirse): configuración y reglas de daño
   ---------------------------------------------------------------------
   TODO lo ajustable de la defensa vive acá. El motor (js/juego.js) lo lee.
   Tiempos en SEGUNDOS (no dependen de los FPS). Las probabilidades se tiran
   UNA vez por evento (cuando el jugador arranca un golpe cerca, cuando el
   enemigo recibe una cadena de golpes), nunca por fotograma.

   Regla de daño (pedido v23):
     daño normal = el que ya calculaba el juego (base × Fuerza para el jugador,
                   base × escalado del nivel para los enemigos)
     daño final  = daño normal × % de la tabla ÷ 100   (una sola vez, sin redondear,
                   sin mínimo de 1: 0 % es exactamente 0)
   ===================================================================== */
(function (global) {
  'use strict';

  const CONFIG = {
    /* ---- % del daño normal que entra MIENTRAS se cubre ---- */
    jugadorPct: 0,                                  // jugador: todos los niveles, por delante y por detrás
    jefesPct: { cabeza_de_poronga: 0, el_abuelo: 0, matute: 0, el_chivo: 0, cacho: 0, el_gallego: 0, el_loco_tito: 0, el_toro: 0, el_tuerto_jefe: 0, muchinga_jefe: 0, el_paraguayo_jefe: 0, el_gordo_cadena_jefe: 0, pillin_jefe: 0, pimpi_jefe: 0, el_tano: 30, el_flaco: 30 },   // v232: El Tano y EL FLACO se cubren en cualquier nivel (IA de jefe) y bloqueando reciben el 30 %   // v107: + El Toro   // v106: + El Loco Tito (jefe de Belgrano)   // v64: jefes de la campaña de River = bloqueo del Abuelo   // v56: Matute jefe = mismo bloqueo que El Abuelo
    // por ID estable. Tienen prioridad sobre la tabla de comunes
    //            nivel:  1     2     3     4   5   6   7   8   9  10
    comunesPct:     [null, null, null, null, 60, 50, 40, 40, 30, 20, 10],   // null = en ese nivel NO se cubren

    /* ---- Control del jugador: mantener PIÑA (J) + ATRÁS ---- */
    jugador: {
      tolerancia: 0.10     // s entre una tecla y la otra para reconocer la combinación (en cualquier orden).
                           // Es también la demora de la piña sola y del darse vuelta (para no confundirlas).
    },

    /* ---- IA de los enemigos (valores iniciales CONSERVADORES, provisorios) ---- */
    /* ---- v32: POLICÍA (nivel 10). Valores iniciales propuestos, ajustables. Tiempos de juego (respetan la pausa). ---- */
    policia: {
      // v69 — PODER ESPECIAL de los cuatro policías, con los valores de los referentes del juego:
      //   carga: 7 (= Poder.CARGA_TOTAL de los referentes) — acá cuenta sus propios ataques ejecutados.
      //   preparación 1,10 s (= la señal completa del poder de Matute, mano arriba → orden): se ve venir y se puede esquivar.
      //   recuperación 1,20 s (queda expuesto después) · daño = 2 × patada del Abuelo (js/niveles.js → statsEnemigo('policia')).
      //   Un solo impacto por ejecución, solo si conecta en su franja y en la misma línea.
      especial: { carga: 7, preparacion: 1.10, recuperacion: 1.20 },
      ataque: {
        probPalazo: 0.70,          // cuando los dos ataques están a tiro: 70 % palazo, 30 % escudazo (un sorteo por decisión)
        maxEscudazosSeguidos: 2    // después de 2 escudazos seguidos, el próximo es palazo
      },
      defensa: {
        distanciaAmenaza: 230,     // px a escala 1: golpe del jugador más cerca que esto, de frente al policía = amenaza
        probabilidad: 0.60,        // un sorteo por cada golpe del jugador (nunca por fotograma)
        reaccion: [0.15, 0.15],    // s hasta levantar el escudo
        duracion: [0.70, 0.70],    // s que el escudo protege
        enfriamiento: [0.90, 0.90],// s sin poder volver a cubrirse, desde que termina el bloqueo
        forzarTrasImpactos: 2,     // 2 golpes recibidos sin acción propia → se cubre en la próxima oportunidad válida (si hay amenaza)
        vencePedido: 0.60          // s: si un pedido de bloqueo no pudo cumplirse (estaba aturdido), se descarta
      }
    },

    ia: {
      comun: {
        distanciaAmenaza: 230,   // px (a escala 1): si el jugador arranca un golpe más cerca que esto, lo considera
        probabilidad: 0.30,      // chance de decidir cubrirse ante esa amenaza (se tira una vez por golpe del jugador)
        reaccion: [0.22, 0.40],  // s que tarda en cubrirse después de ver la amenaza (nunca instantáneo)
        duracion: [0.70, 1.10],  // s que mantiene la guardia
        enfriamiento: [2.6, 4.0],// s antes de poder volver a cubrirse
        maxCubriendose: 1        // cuántos comunes pueden estar cubiertos a la vez
      },
      jefe: {                    // Cabeza de Poronga y El Abuelo
        distanciaAmenaza: 250,
        probabilidad: 0.45,
        reaccion: [0.16, 0.30],
        duracion: [0.80, 1.20],
        enfriamiento: [1.8, 2.8]
      },
      entrada: 0.12,             // s que tarda en levantar la guardia (todavía NO protege)
      salida: 0.15,              // s que tarda en bajarla (ya NO protege: se lo puede golpear)
      contraataqueTras: 0.35     // s mínimos después de bajar la guardia antes de poder preparar un golpe
    },

    /* ---- Salida de las cadenas de golpes (que no se los pueda trabar para siempre) ----
       Si recibe `impactos` golpes dentro de `ventana` s, los golpes siguientes ya no
       reinician su reacción: termina la que tiene y sale cubriéndose (o retrocediendo
       si no puede cubrirse). Después, `enfriamiento` s sin poder volver a usarla. */
    cadena: {
      jefe:  { impactos: 3, ventana: 1.6, enfriamiento: 3.0 },
      comun: { impactos: 4, ventana: 1.6, enfriamiento: 4.0 },   // solo desde el nivel en que los comunes se cubren
      retirada: { duracion: 0.45, velocidad: 220 }               // si no puede cubrirse: retrocede (px/s)
    }
  };

  const esJefeDefensa = id => Object.prototype.hasOwnProperty.call(CONFIG.jefesPct, id);

  // ¿Este enemigo puede cubrirse en este nivel?
  function enemigoPuedeCubrirse(idEnemigo, nivel) {
    if (esJefeDefensa(idEnemigo)) return true;
    return CONFIG.comunesPct[nivel] != null;
  }

  // % del daño normal que recibe el objetivo. 100 si no se está cubriendo.
  function porcentajeDanio({ esJugador, idEnemigo, nivel, cubriendose }) {
    if (!cubriendose) return 100;
    if (esJugador) return CONFIG.jugadorPct;
    if (esJefeDefensa(idEnemigo)) return CONFIG.jefesPct[idEnemigo];     // excepción de los jefes: prioridad
    const pct = CONFIG.comunesPct[nivel];
    return pct == null ? 100 : pct;                                       // en niveles 1–3 no deberían estar cubiertos
  }

  // Daño final (exacto). Se multiplica por el % entero y se divide por 100 para no arrastrar
  // errores de coma flotante (10 × 30 / 100 = 3 exacto; 10 × 0.3 daría 3.0000000000000004).
  const aplicarPorcentaje = (danioNormal, pct) => danioNormal * pct / 100;

  global.Defensa = { CONFIG, esJefeDefensa, enemigoPuedeCubrirse, porcentajeDanio, aplicarPorcentaje };
})(typeof window !== 'undefined' ? window : globalThis);
