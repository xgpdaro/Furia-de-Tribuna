/* =====================================================================
   v68 — PERSPECTIVA POR ESCENARIO (adaptado de PERSPECTIVA_BOCA/perspectiva.js)
   ---------------------------------------------------------------------
   · Coordenadas LÓGICAS del mundo (1672 × 941, las del fondo). Nunca CSS.
   · La altura del cuerpo depende SOLO de la profundidad del punto de apoyo
     de los pies (ent.y del motor): más arriba en el piso = más lejos = más chico.
     Interpolación lineal continua y ACOTADA entre farY y nearY (sin saltos).
   · farHeight / nearHeight = alto en px del cuerpo PARADO (lo que el motor
     llama ALTO_PERSONAJE × escala). Cada personaje se normaliza con su altura
     de referencia estable por grupo de cuadros (altoReferencia / ref del motor):
     agacharse, caer o pegar NO agranda al personaje.
   · No toca vida, daño ni velocidades. La física sigue en coordenadas de mundo;
     solo cambia el DIBUJO y las distancias que el motor ya multiplica por escala.
   · Perfiles calibrados mirando puertas, persianas y veredas de cada fondo
     (horizonte de la calle → alto humano). Los escenarios sin perfil siguen
     con su escala de siempre: no se copian estos números a otros estadios.
   ===================================================================== */
(function (root) {
  'use strict';
  // clave = archivo del fondo (sin carpeta ni extensión)
  const PERFILES = Object.freeze({
    // Calle en fuga hacia el fondo (horizonte ≈ y 630). Puerta de la casa izquierda: ~140 px con base en y 727 → persona ≈ 120 px.
    '05_calle_lateral_estadio_v1':       Object.freeze({ farY: 735, nearY: 925, farHeight: 131, nearHeight: 366 }),
    // Vista frontal del lateral: poca fuga. Persona junto al muro (y ≈ 670) ≈ 180 px, misma altura que el portón azul.
    '06_lateral_blanco_frontal_v1':      Object.freeze({ farY: 670, nearY: 925, farHeight: 180, nearHeight: 366 }),
    // Esquina con calle en fuga (horizonte ≈ y 635). Persianas de la derecha ~150 px con base en y 700.
    '07_esquina_estadio_v1':             Object.freeze({ farY: 730, nearY: 925, farHeight: 120, nearHeight: 366 }),
    // Plaza frente a la entrada principal (horizonte ≈ y 600). La entrada queda lejos: persona en el cordón (y 700) ≈ 113 px.
    '08_esquina_entrada_principal_v1':   Object.freeze({ farY: 700, nearY: 925, farHeight: 113, nearHeight: 366 }),
    // v91 — INDEPENDIENTE 7 y 8 (fachada frontal de la Doble Visera, piso de baldosas delante). El piso empieza al pie de la fachada
    // (y ≈ 750: base de persianas, rejas y escaleras). Referencias en ese plano: persianas ~190 px (≈ 3 m), policías dibujados
    // ~120 px, baranda de la valla ~70 px → una persona con los pies junto a la pared mide ≈ 122 px. Adelante, el tamaño de siempre.
    '07_lateral_alto_sin_frase_v1':      Object.freeze({ farY: 752, nearY: 925, farHeight: 122, nearHeight: 366 }),
    '08_lateral_accesos_escaleras_v1':   Object.freeze({ farY: 752, nearY: 925, farHeight: 122, nearHeight: 366 })
  });
  function finito(n, nombre) { if (!Number.isFinite(n)) throw new TypeError(nombre + ' debe ser un número finito'); return n; }
  function validar(p) {
    if (!p) throw new TypeError('Perfil de perspectiva ausente');
    for (const k of ['farY', 'nearY', 'farHeight', 'nearHeight']) finito(p[k], k);
    if (p.nearY <= p.farY || p.farHeight <= 0 || p.nearHeight < p.farHeight) throw new RangeError('Perfil de perspectiva inválido');
    return p;
  }
  // alto del cuerpo parado (px de mundo) con los pies en groundY
  function altoEn(groundY, perfil) {
    validar(perfil); finito(groundY, 'groundY');
    const t = Math.max(0, Math.min(1, (groundY - perfil.farY) / (perfil.nearY - perfil.farY)));
    return perfil.farHeight + (perfil.nearHeight - perfil.farHeight) * t;
  }
  // factor de escala del motor (1 = ALTO_PERSONAJE px). bodyRatio = diferencia física intencional (1 = normal).
  function escalaEn(groundY, perfil, altoBase, bodyRatio = 1) {
    finito(altoBase, 'altoBase'); finito(bodyRatio, 'bodyRatio');
    if (altoBase <= 0 || bodyRatio <= 0) throw new RangeError('Altura inválida');
    return altoEn(groundY, perfil) * bodyRatio / altoBase;
  }
  function perfilDe(escenario) {
    const id = String(escenario || '').split('/').pop().replace(/\.[a-z0-9]+$/i, '');
    return PERFILES[id] || null;
  }
  // orden de dibujo por profundidad del apoyo, estable en empates (no muta el estado de juego)
  function ordenarPorProfundidad(actores) {
    return actores.map((a, i) => ({ a, i })).sort((p, q) => p.a.y - q.a.y || p.i - q.i).map(o => o.a);
  }
  const api = { PERFILES, altoEn, escalaEn, perfilDe, validar, ordenarPorProfundidad };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Perspectiva = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
