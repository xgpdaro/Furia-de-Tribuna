/* =====================================================================
   BARRA 14 — Damajuana: recuperación de vida (v44). Valores ajustables.
   El motor está en js/juego.js (busca «v44 — DAMAJUANA»).
   ---------------------------------------------------------------------
   REGLAS (PROMPT_CLAUDE_INTEGRAR_DAMAJUANA.md):
   · v71: Aparece UNA vez por episodio cuando la vida RESTANTE del protagonista queda en el 25 % o menos (vida > 0 y
     vida ≤ 25 % de la máxima), aunque un solo golpe lo lleve de más arriba directo a 8 % o 1 %. Con vida 0 gana la muerte.
   · Va al punto del piso más lejano del personaje (medido como recorrido: subir/bajar es más lento que ir de costado).
   · Dura 10 s de juego activo (v71: antes 7) (la pausa los congela). Si vence, desaparece y NO vuelve a aparecer hasta que la vida
     supere otra vez el umbral y vuelva a caer (rearme). Nunca hay más de una a la vez.
   · Se recoge con J estando encima o cerca (zona de abajo). Caminar encima NO la recoge. Fuera de la zona J es piña.
   · Recoger → sostener → beber. Desde que la levanta hasta que termina de beber: jugador intocable y quieto,
     enemigos esperando en guardia. Al terminar: vida al 100 % exacto. No suma puntos ni toca el poder.
   Tiempos en SEGUNDOS de juego. Distancias en px del mundo a escala 1 (se multiplican por la escala de profundidad).
   ===================================================================== */
(function (global) {
  'use strict';
  const CONFIG = {
    umbral: 0.25,                 // v71: fracción de vida RESTANTE: aparece con 25 % o menos (antes 15 %). Se evalúa después de cada daño (cada cuadro)
    duracion: 10.0,               // v71: s que queda disponible en el piso (7 + 3) · la pausa los congela
    zona: { dx: 85, dy: 34 },     // tolerancia para recogerla con J: distancia horizontal (×escala) y de profundidad
    tiempos: { recoger: 0.3, sostener: 0.3, beber: 1.0 },   // poses 01 · 02 · 03 (al terminar la 03: vida al 100 %)
    rearme: 'superarUmbral',      // regla inicial: la oportunidad vuelve cuando la vida supera el umbral
    // Lugar de aparición: dentro del piso, con este margen a los bordes (para que se vea entera y se pueda alcanzar)
    margen: { x: 70, y: 14 },
    pasoGrilla: { x: 20, y: 10 }, // resolución con que se buscan los puntos candidatos
    lejosDeEnemigos: 60,          // evita quedar tapada por un enemigo parado encima (si se puede)
    // Objeto en el piso: alto en px a escala 1. Medido por el ancho del vidrio: en las poses de RECOGER la damajuana equivale
    // a 123–145 px y en SOSTENER a 97–102 px (diferencia de las imágenes, ver LEEME v44). 120 queda entre ambas, cerca de recoger.
    altoObjeto: 120,
    cajaObjeto: { x0: 241, y0: 74, x1: 1064, y1: 1128 },   // contenido real de assets/objetos/damajuana_v1.webp (px): apoya la base en el suelo
    reanudar: [0.9, 1.6]          // s que esperan los enemigos antes de volver a atacar al terminar de beber
  };
  /* v58 — OBJETO DE RECUPERACIÓN POR CLUB (el del club DEL JUGADOR). Mismas reglas, tiempos y vida para todos (CONFIG de arriba);
     solo cambia el dibujo del piso y su tamaño. La damajuana era exclusiva de River; v101: también Morón (pedido de Darío).
     · hamburguesa de cancha (Racing e Independiente): en las poses de El Gallego mide ~27 px de alto a escala 1; en el piso se
       dibuja a 40 px para que se distinga en la pantalla (solo tamaño del dibujo, ajustable). caja = contenido real del PNG (px del original).
     · choripán (Boca, v60): en las poses de Cabeza de Poronga y El Abuelo mide ~40 px de alto a escala 1 → se dibuja a 40 px.
     · vino tinto de cartón TORO (San Lorenzo, v63): en las poses de El Chivo mide ~45 px de alto a escala 1 → se dibuja a 45 px. */
  const ITEMS = {
    damajuana:   { nombre: 'Damajuana', img: 'assets/objetos/damajuana_v1.webp', altoObjeto: CONFIG.altoObjeto, cajaObjeto: CONFIG.cajaObjeto },
    hamburguesa: { nombre: 'Hamburguesa de cancha', img: 'assets/objetos/hamburguesa_cancha_v1.webp', altoObjeto: 40, cajaObjeto: { x0: 55, y0: 197, x1: 1493, y1: 830 } },
    choripan:    { nombre: 'Choripán', img: 'assets/objetos/choripan_v1.webp', altoObjeto: 40, cajaObjeto: { x0: 25, y0: 47, x1: 1512, y1: 983 } },
    vino:        { nombre: 'Vino tinto de cartón', img: 'assets/objetos/vino_toro_v1.webp', altoObjeto: 45, cajaObjeto: { x0: 186, y0: 71, x1: 911, y1: 1365 } },
    // v70 — Independiente: fernet con coca en la mitad de una botella plástica cortada (hielo y espuma). En las poses de El Gallego
    // el vaso mide ~40 px de alto a escala 1 → se dibuja a 40 px. caja = contenido real del PNG.
    // v72: en el PISO se dibuja al DOBLE (80 px) para que se distinga; la zona de recogida no cambia y el vaso en la mano de El Gallego tampoco.
    // v78 — PISTOLA GAMEZ (Batalla Campal): cartón de vino propio (animaciones_nuevas/pistola_gamez/RECURSOS/carton_vino_item.webp).
    // En sus poses el cartón mide ~45 px de alto a escala 1 (como el vino de El Chivo) → se dibuja a 45 px. No está en POR_CLUB:
    // no es de ninguna barra; lo asigna js/batalla.js al referente.
    carton_vino: { nombre: 'Cartón de vino', img: 'assets/objetos/carton_vino_pistola_v1.webp', altoObjeto: 45, cajaObjeto: { x0: 185, y0: 70, x1: 912, y1: 1367 } },
    fernet:      { nombre: 'Fernet con coca', img: 'assets/objetos/fernet_coca_botella_cortada_v2.webp', altoObjeto: 80, cajaObjeto: { x0: 259, y0: 192, x1: 1009, y1: 1108 } }
  };
  const POR_CLUB = { river: 'damajuana', boca: 'choripan', independiente: 'fernet', racing: 'hamburguesa', san_lorenzo: 'vino', belgrano: 'fernet', talleres: 'fernet', central: 'vino', newells: 'vino', moron: 'damajuana', chicago: 'choripan', chacarita: 'vino', laferrere: 'vino' };   // v104: Laferrere (Villeros, El Tuerto, El Manco) = cartón de vino TORO   // v102: Chacarita = vino TORO (el de sus barras, FUNEBREROS_ORIGINALES_v1)   // v101: Morón = damajuana original · Chicago = choripán original   // v97: Newell's (Leprosos, Pimpi, El Panadero) = vino de cartón TORO   // v95: Talleres = fernet · Central (sus barras) = vino de cartón
  // v95 — OBJETO POR REFERENTE (tiene prioridad sobre el del club): los tres referentes de Central toman CHORIPÁN (sus poses 41–44).
  const POR_REFERENTE = { pillin_central: 'choripan', el_rana_central: 'choripan', chapero_central: 'choripan' };   // v92: Belgrano = fernet con coca (vaso de botella cortada, el mismo objeto)   // v70: Independiente = fernet   // v60: + Boca · v63: + San Lorenzo
  const itemDe = (club, refId) => ITEMS[(refId && POR_REFERENTE[refId]) || POR_CLUB[String(club || 'river').replace(/-/g, '_')]] || null;   // v95: + referente
  global.Damajuana = { CONFIG, ITEMS, POR_CLUB, POR_REFERENTE, itemDe };
})(typeof window !== 'undefined' ? window : globalThis);
