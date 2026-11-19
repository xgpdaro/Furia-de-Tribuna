/* =====================================================================
   BARRA 14 — Puntaje: valores ajustables (el motor está en js/juego.js)
   ---------------------------------------------------------------------
   ESCALA: se usan las MISMAS unidades de vida del juego (no hay vida normalizada 0–1).
   Ej.: un hincha del nivel 1 tiene 40 de vida, los jefes 180 por barra, el jugador 100.
   «Unidad de vida quitada» = cuánto bajó realmente la vida del enemigo con ese golpe,
   DESPUÉS de bloqueos y sin pasar de lo que le quedaba (si le quedan 5 y el golpe hace 30, cuenta 5).
   Internamente el puntaje guarda decimales; en pantalla se muestra sin decimales (redondeo hacia abajo).

   Qué golpe es cada cosa:
     piña   = botón J: Trompadas / Codazos y los golpes del combo del agarre (también salen con J)
     patada = botón K: Patadas / Rodillazos
     poder  = tecla L (lo que el poder le quita a cada enemigo)
   ===================================================================== */
(function (global) {
  'use strict';
  const PUNTOS = {
    porUnidad: { pina: 2, patada: 1, poder: 1 },   // puntos por cada unidad de vida quitada
    baja: 100,                                      // derrota DEFINITIVA de un enemigo (una sola vez, sin importar el remate)
    muerte: 300,                                    // se descuenta al morir el jugador (nunca deja el total debajo de 0)
    bonusVidaMax: 1000,                             // al ganar el nivel: round(1000 × vida restante / vida máxima)
    conteo: {                                       // animación del bonus de vida (tiempos de juego: la pausa los congela)
      base: 0.6, porVidaCompleta: 1.6,              // dura base + porVidaCompleta × fracción de vida (vida llena = 2,2 s)
      tick: 0.07,                                   // s entre ruiditos del conteo (no uno por cuadro)
      espera: 0.6,                                  // s quieto antes de empezar a contar
      resumen: 4.0                                  // s que se muestra el resumen del nivel antes de seguir solo (ENTER adelanta)
    }
  };
  const TECNICA = { Trompadas: 'pina', Codazos: 'pina', Agarres: 'pina', Cabezazos: 'pina', Patadas: 'patada', Rodillazos: 'patada' };
  const tipoDe = tecnica => TECNICA[tecnica] || 'pina';
  global.Puntaje = { PUNTOS, tipoDe };
})(typeof window !== 'undefined' ? window : globalThis);
