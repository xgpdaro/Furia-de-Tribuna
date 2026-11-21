/* =====================================================================
   FURIA DE TRIBUNA — v64: CAMPAÑA DE RIVER y GALPÓN DE TROFEOS
   Solo para el jugador que elige River / Los Borrachos del Tablón.
   Recorrido: club → referente → GALPÓN (el elegido tomando mate) → CONTINUAR → bloque 1 … bloque 4 → galpón completo.
   Cada bloque = las 10 pantallas de su SEDE con las barras y el jefe de su RIVAL (sede y rival son datos separados).
   Completar un bloque = ganar su pantalla 10 (incluido su jefe). Recién ahí se agregan los trapos de ese rival.
   Estado guardado en localStorage (CLAVE): personaje, bloques completados, bloque y nivel actual, puntaje y partida.
   Los trofeos se DERIVAN de completados (no del estadio visitado ni de una imagen).
   El galpón se compone por capas ya preparadas (sin IA ni red): fondo + trapos de cada club ganado + personaje tomando mate.
   ===================================================================== */
(function (global) {
  'use strict';
  const CLAVE = 'barra14.campanaRiver.v1', CLAVE_ELEGIDO = 'barra14.campanaRiver.elegido';
  // Orden de COMBATE (no es el orden de la pared). set = juego de escenarios de js/niveles.js (CLUBES.river.campana).
  /* v106 — EL JUGADOR SIEMPRE ES VISITANTE: los bloques salen de Niveles.DESTINOS sin el club del jugador (River), en el orden vigente.
     El bloque de San Lorenzo ahora se juega en los escenarios de SAN LORENZO (set visita_san_lorenzo), no en el Monumental; conserva su id
     'river_vs_san_lorenzo' para que las campañas guardadas sigan valiendo. Se suma Belgrano al final (su trofeo: banderas de Belgrano). */
  const IDS_VIEJOS = { san_lorenzo: 'river_vs_san_lorenzo', racing: 'racing_vs_racing', independiente: 'independiente_vs_independiente', boca: 'boca_vs_boca', belgrano: 'belgrano_vs_belgrano' };
  const N = global.Niveles;
  /* v109 — ÓRDENES DEFINITIVOS DE CAMPAÑA DE LAS 13 BARRAS (configuración única). Cada barra enfrenta a las otras 12, en este orden.
     Ids reales del juego: river, boca, san_lorenzo, racing, independiente, belgrano, talleres, central, newells, chicago, chacarita, laferrere, moron.
     Un rival es JUGABLE solo si su estadio tiene recorrido completo en js/niveles.js (Niveles.DESTINOS: 10 escenarios aprobados, sus barras y su jefe).
     Los que todavía no lo tienen conservan su lugar en el orden, sin vencer; CONTINUAR va al primer rival jugable pendiente. */
  const ORDENES = {
    river:         ['laferrere', 'chacarita', 'chicago', 'moron', 'talleres', 'belgrano', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'boca'],
    boca:          ['laferrere', 'chacarita', 'chicago', 'moron', 'talleres', 'belgrano', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'river'],
    san_lorenzo:   ['laferrere', 'chacarita', 'chicago', 'moron', 'talleres', 'belgrano', 'central', 'newells', 'racing', 'independiente', 'river', 'boca'],
    racing:        ['laferrere', 'chacarita', 'chicago', 'moron', 'talleres', 'belgrano', 'central', 'newells', 'san_lorenzo', 'river', 'boca', 'independiente'],
    independiente: ['laferrere', 'chacarita', 'chicago', 'moron', 'talleres', 'belgrano', 'central', 'newells', 'san_lorenzo', 'river', 'boca', 'racing'],
    belgrano:      ['chicago', 'chacarita', 'laferrere', 'moron', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'river', 'boca', 'talleres'],
    talleres:      ['chicago', 'chacarita', 'laferrere', 'moron', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'river', 'boca', 'belgrano'],
    central:       ['chicago', 'chacarita', 'laferrere', 'moron', 'belgrano', 'talleres', 'san_lorenzo', 'racing', 'independiente', 'boca', 'river', 'newells'],
    newells:       ['chicago', 'chacarita', 'laferrere', 'moron', 'belgrano', 'talleres', 'san_lorenzo', 'racing', 'independiente', 'boca', 'river', 'central'],
    chicago:       ['belgrano', 'talleres', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'laferrere', 'moron', 'river', 'chacarita', 'boca'],
    chacarita:     ['belgrano', 'talleres', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'laferrere', 'moron', 'river', 'chicago', 'boca'],
    laferrere:     ['belgrano', 'talleres', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'river', 'boca', 'chacarita', 'moron', 'chicago'],
    moron:         ['belgrano', 'talleres', 'central', 'newells', 'san_lorenzo', 'racing', 'independiente', 'river', 'boca', 'laferrere', 'chicago', 'chacarita']
  };
  const NOMBRES = { river: ['River', 'en el Monumental'], boca: ['Boca', 'en la Bombonera'], san_lorenzo: ['San Lorenzo', 'en el Nuevo Gasómetro'],
    racing: ['Racing', 'en el Cilindro'], independiente: ['Independiente', 'en la Doble Visera'], belgrano: ['Belgrano', 'en el Gigante de Alberdi'],
    talleres: ['Talleres', 'en barrio Jardín'], central: ['Rosario Central', 'en el Gigante de Arroyito'], newells: ["Newell's", 'en el Coloso del Parque'],
    chicago: ['Nueva Chicago', 'en Mataderos'], chacarita: ['Chacarita', 'en San Martín'], laferrere: ['Laferrere', 'en Gregorio de Laferrere'], moron: ['Morón', 'en el Francisco Urbano'] };
  const CLUB = (N && N.activo && N.activo.club) || 'river';
  /* v197 — MODO HISTORIA EN DOS CATEGORÍAS. Cada barra enfrenta SOLO a las de su categoría (sin cruces, ni después de terminar).
     El orden dentro de la categoría es el de ORDENES (sin los de la otra categoría). Primera: 8 rivales · Ascenso: 3 rivales. */
  const CATEGORIAS = { primera: ['river', 'boca', 'racing', 'independiente', 'san_lorenzo', 'belgrano', 'talleres', 'central', 'newells'],
                       ascenso: ['moron', 'chicago', 'chacarita', 'laferrere'] };
  const categoriaDe = club => Object.keys(CATEGORIAS).find(c => CATEGORIAS[c].includes(club)) || null;
  const CATEGORIA = categoriaDe(CLUB);
  const DEST = N ? N.destinosDe(CLUB) : [];
  // bloque = un rival. id = id del club rival (estable). Las campañas viejas de River usaban otros ids: ver migrar().
  const BLOQUES = (ORDENES[CLUB] || []).filter(club => club !== CLUB && categoriaDe(club) === CATEGORIA).map(club => {
    const d = DEST.find(x => x.club === club), nm = NOMBRES[club] || [club, ''];
    return { id: club, sede: club, rival: club, set: d ? d.set : null, nombre: nm[0], lugar: d ? d.lugar : nm[1], jugable: !!d };
  });
  const ORDEN_RIVER = ORDENES.river;
  /* v108 — GALPÓN DE TROFEOS DE GUERRA de River en DOS SALAS (TROFEOS_DE_GUERRA/ENTREGA_RIVER_DOS_SALAS_FINAL).
     Estructura reutilizable por club (GALPONES[club]); por ahora solo River.
     · Sala principal (01_sala_principal.png): Boca · Racing · Independiente · San Lorenzo. El fondo trae los trofeos dibujados:
       se publica la sala VACÍA (vitrinas restauradas con la base vacía del galpón anterior, alineada y con el color igualado,
       sin tocar a los tres hinchas) + una CAPA por club recortada del original (trapos, bombos y redoblantes de ese club).
       Fondo vacío + las cuatro capas = la imagen original. Cada capa aparece solo con su bloque ganado.
     · Sala derecha (02_sala_derecha.png, sin cambios): ocho vitrinas vacías. Belgrano y Talleres con sus banderas originales
       (BANDERAS/<CLUB>/v1, Barrio Alberdi / Barrio Jardín más grandes). El resto todavía sin recursos (capa: null).
     · El referente elegido se dibuja aparte: sentado tomando mate en la silla vacía (capa propia) o parado observando en la otra sala.
     Coordenadas en el mundo 1672 × 941. */
  const SALAS = [
    { id: 'principal', nombre: 'Sala principal', fondo: 'assets/galpon/river_sala1_vacia.webp',
      // v121: radio vieja sobre la mesa, al lado del termo (recortada de galpon_river_sala_principal_con_radio_v1, misma cámara). Decoración fija.
      radio: { src: 'assets/galpon/river_radio.webp', x: 3, y: 635, parlante: { x: 75.5, y: 694.5, r: 14.7 } },
      referente: { pie: { x: 300, y: 905 }, alto: 460, mira: 1 } },               // de pie junto a la silla vacía (arranca y vuelve acá)
    // v197: sala derecha con DEPÓSITO PROPIO abajo (TROFEOS_DE_GUERRA/PRIMERA_DEPOSITOS_PROPIOS_v1/RIVER). Original: river_sala2.webp (respaldo).
    { id: 'derecha', nombre: 'Sala derecha', fondo: 'assets/galpon/river_sala2_deposito.webp',
      ocluye: { src: 'assets/galpon/river_sala2_ocluye_deposito.webp', x: 1430, y: 491 },   // hinchas parados delante del cuarto sector de abajo (recortados del fondo nuevo)
      referente: { pie: { x: 680, y: 800 }, alto: 302, pose: 'quietoEspalda' } }  // primer plano libre, de espaldas mirando los trofeos
  ];
  const BOTON = { x: 1436, y: 855, w: 210, h: 53, k: 0.7 };   // v115: botones del galpón al 70 % (mismo borde derecho e inferior que antes)
  // v109: navegación entre salas a la IZQUIERDA (sala principal: sobre la ventana, libre de la silla y las vitrinas; sala derecha: abajo, sobre los cajones),
  // CONTINUAR a la DERECHA. Ninguno pisa el cartel informativo (x 440–1340), las vitrinas ni los personajes.
  const BOTONES = { continuar: BOTON, otraSala: { x: 1436, y: 758, w: 210, h: 53, k: 0.7, lineas: ['IR A LA OTRA', 'SALA →'] },   // v110: a la DERECHA, sobre CONTINUAR, alineado por el borde derecho
                    volver: { x: 20, y: 863, w: 210, h: 53, k: 0.7, lineas: ['← VOLVER A LA', 'SALA PRINCIPAL'] },
                    nueva: { x: 1384, y: 14, w: 262, h: 42 } };
  const TROFEOS = {
    boca:          { sala: 0, capa: 'assets/galpon/river_sala1_boca.webp',          x: 238,  y: 262, banderas: ['b_copello', 'fiorito_centrado_sin_escudo', 'catan', 'villa_lugano'] },
    racing:        { sala: 0, capa: 'assets/galpon/river_sala1_racing.webp',        x: 560,  y: 262, banderas: ['villa_corina', 'dock_sud', 'berazategui', 'villa_lugano'] },
    independiente: { sala: 0, capa: 'assets/galpon/river_sala1_independiente.webp', x: 895,  y: 262, banderas: ['avellaneda', 'dock_sud', 'quilmes', 'moreno', 'merlo', 'pineyro'] },
    san_lorenzo:   { sala: 0, capa: 'assets/galpon/river_sala1_san_lorenzo.webp',   x: 1243, y: 262, banderas: ['boedo', 'almagro', 'bajo_flores', 'villa_lugano', 'barrio_rivadavia'] },
    belgrano:      { sala: 1, capa: 'assets/galpon/river_sala2_belgrano.webp',      x: 743,  y: 277, banderas: ['barrio_alberdi', 'villa_paez', 'barrio_san_martin', 'barrio_yofre', 'barrio_guinazu', 'villa_el_libertador', 'lejos_la_mas_popular'] },
    talleres:      { sala: 1, capa: 'assets/galpon/river_sala2_talleres.webp',      x: 948,  y: 277, banderas: ['barrio_jardin', 'las_violetas', 'barrio_jose_ignacio_diaz', 'villa_el_libertador', 'barrio_guemes', 'villa_boedo', 'villa_revol'] },
    // v133 — River como rival de las DEMÁS barras (BANDERAS/RIVER/v1: 13 barrios). River no tiene vitrina en su propio galpón (nunca es su rival).
    river:     { sala: -1, capa: null, banderas: ['nunez', 'belgrano', 'constitucion', 'palermo', 'ramos_mejia', 'beccar', 'moreno', 'merlo', 'villa_caraza', 'solano', 'budge', 'ciudadela', 'almagro'] },
    // Vitrinas ya dibujadas en la sala derecha, sin banderas originales todavía (y hoy no son destinos de River): TODO(arte)
    central:   { sala: 1, capa: 'assets/galpon/river_sala2_central.webp', x: 1160, y: 271, banderas: ['los_guerreros', 'arroyito', 'barrio_tablada', 'empalme_graneros'] },   // v142 (BANDERAS/ROSARIO_CENTRAL/ENTREGA_4_BANDERAS_v2; Cristalería descartada)
    newells:   { sala: 1, capa: 'assets/galpon/river_sala2_newells.webp', x: 1381, y: 268, banderas: ['villa_la_lata', 'fonavi', 'las_flores', 'saladillo', 'la_tablada', 'larrea', 'villa_la_ceramica', 'villa_gobernador_galvez'] },   // v143 (BANDERAS/NEWELLS/v1)
    chicago:   { sala: 1, capa: 'assets/galpon/river_sala2_chicago.webp', x: 743, y: 461, banderas: ['ciudad_oculta', 'los_perales', 'las_antenas', 'mataderos', 'la_tablada', 'la_pireli', 'villa_madero'] },   // v140 (BANDERAS/CHICAGO/v1, Ciudad Oculta y Los Perales principales)
    chacarita: { sala: 1, capa: 'assets/galpon/river_sala2_chacarita.webp', x: 948, y: 461, banderas: ['la_famosa_banda_de_san_martin', 'villa_maipu', 'barrio_libertador', 'loyola', 'jose_leon_suarez', 'villa_la_carcova', 'billinghurst', 'villa_martelli'] },   // v139 (BANDERAS/CHACARITA/v1, La Famosa Banda de San Martín principal)
    laferrere: { sala: 1, capa: 'assets/galpon/river_sala2_laferrere.webp', x: 1160, y: 461, banderas: ['la_79', 'la_familia_villera', 'ruta_21', 'san_pedro', 'la_palangana', 'altos_de_laferrere'] },   // v138 (BANDERAS/LAFERRERE/v1, La 79 principal)
    moron:     { sala: 1, capa: 'assets/galpon/river_sala2_moron.webp', x: 1381, y: 461, banderas: ['los_borrachos_de_moron', 'barrio_santa_laura', 'villa_san_jose', 'barrio_texalar', 'haedo', 'castelar', 'barrios_blanco', 'san_francisco'] }   // v141 (BANDERAS/MORON/v1, Los Borrachos de Morón principal)
  };
  // Desbloqueo por pantalla: preparado pero APAGADO (hoy se gana el lote entero del rival al completar su bloque).
  const DESBLOQUEO_POR_PANTALLA = null;
  // Referente sentado tomando mate en la silla vacía de la sala principal (capas transparentes de sus imágenes del galpón;
  // la silla del fondo nuevo coincide con la del galpón anterior). William: recortado de su galpón anterior (v108).
  const MATE = {
    matute:  { src: 'assets/galpon/mate_matute.webp',  x: 129, y: 499 },
    alan:    { src: 'assets/galpon/mate_alan.webp',    x: 139, y: 511 },
    william: { src: 'assets/galpon/mate_william.webp', x: 168, y: 552 }   // v173: bajado 18 px, apoyado en el asiento (antes flotaba)
  };
  /* v111 — POSE DE DESCANSO de la sala derecha: PARADO, quieto, BRAZOS CRUZADOS sobre el pecho, DE PERFIL mirando a la DERECHA
     (hacia los exhibidores), cara de costado, pies naturales, sin postura de combate. Una imagen propia de cada referente (su cara,
     cuerpo y ropa). NO se sustituye por caminar, guardia, brazos caídos ni vista de espaldas: sin esa imagen el referente se queda
     sentado en la sala principal y la cámara pasa sola a la otra sala.
     src: la imagen (transparente, recortada al cuerpo, pies en el borde de abajo). Hoy NINGUNO de los tres la tiene → src: null. */
  const REPOSO = {
    william: { src: null, falta: 'animaciones_nuevas/william/william_brazos_cruzados_perfil_derecha.png' },
    alan:    { src: null, falta: 'animaciones_nuevas/alan/alan_brazos_cruzados_perfil_derecha.png' },
    matute:  { src: null, falta: 'animaciones_nuevas/matute/matute_brazos_cruzados_perfil_derecha.png' }
  };
  /* v144 — GALPONES DOBLES de BOCA, SAN LORENZO, INDEPENDIENTE y RACING (TROFEOS_DE_GUERRA/<CLUB>: BOCA/ENTREGA_v3, SAN_LORENZO/ENTREGA_v2,
     INDEPENDIENTE/v1, RACING/v1 → 01_sala_principal_vacia / 02_sala_derecha_vacia). Fondos sin trofeos rivales; los propios del club ya están dibujados.
     Capas por rival (assets/galpon/<club>/<rival>.webp, en un atlas por galpón): las BANDERAS originales del rival (BANDERAS/<RIVAL>), montadas en
     la malla de SU vitrina (rects medidos en cada fondo, no copiados del galpón de River). Sala principal: los 4 rivales grandes que rotula cada fondo;
     sala 2: Belgrano, Talleres, Central, Newell's (arriba) y Chicago, Chacarita, Laferrere, Morón (abajo). Bombos/redoblantes rivales: TODO(arte) —
     no hay capas transparentes de instrumentos. ocluye = hinchas parados delante de las vitrinas de la sala 2 (recortados del mismo fondo).
     La radio ya está dibujada en cada sala principal: el latido del parlante usa el propio fondo (radio.src = null). */
  const TROFEOS_DE = club => Object.fromEntries(Object.entries(GALPON_CONF[club].trofeos).map(([r, t]) => [r, { ...t, capa: `assets/galpon/${club}/${r}.webp`, banderas: (TROFEOS[r] || {}).banderas || [] }]));
  const GALPON_CONF = {"boca":{"trofeos":{"river":{"sala":0,"x":289,"y":261},"racing":{"sala":0,"x":605,"y":261},"independiente":{"sala":0,"x":935,"y":263},"san_lorenzo":{"sala":0,"x":1259,"y":262},"belgrano":{"sala":1,"x":732,"y":262},"talleres":{"sala":1,"x":946,"y":270},"central":{"sala":1,"x":1156,"y":267},"newells":{"sala":1,"x":1379,"y":262},"chicago":{"sala":1,"x":733,"y":460},"chacarita":{"sala":1,"x":946,"y":459},"laferrere":{"sala":1,"x":1156,"y":459},"moron":{"sala":1,"x":1379,"y":459}},"ocluye":{"x":1420,"y":486}},"san_lorenzo":{"trofeos":{"river":{"sala":0,"x":328,"y":263},"boca":{"sala":0,"x":642,"y":264},"racing":{"sala":0,"x":951,"y":263},"independiente":{"sala":0,"x":1266,"y":263},"belgrano":{"sala":1,"x":651,"y":238},"talleres":{"sala":1,"x":897,"y":238},"central":{"sala":1,"x":1137,"y":238},"newells":{"sala":1,"x":1383,"y":237},"chicago":{"sala":1,"x":651,"y":436},"chacarita":{"sala":1,"x":891,"y":437},"laferrere":{"sala":1,"x":1130,"y":436},"moron":{"sala":1,"x":1383,"y":436}},"ocluye":{"x":1480,"y":474}},"independiente":{"trofeos":{"river":{"sala":0,"x":330,"y":265},"boca":{"sala":0,"x":641,"y":265},"racing":{"sala":0,"x":949,"y":266},"san_lorenzo":{"sala":0,"x":1273,"y":265},"belgrano":{"sala":1,"x":618,"y":276},"talleres":{"sala":1,"x":862,"y":275},"central":{"sala":1,"x":1107,"y":275},"newells":{"sala":1,"x":1351,"y":275},"chicago":{"sala":1,"x":618,"y":473},"chacarita":{"sala":1,"x":863,"y":473},"laferrere":{"sala":1,"x":1108,"y":473},"moron":{"sala":1,"x":1352,"y":473}},"ocluye":{"x":560,"y":497}},"racing":{"trofeos":{"river":{"sala":0,"x":330,"y":266},"boca":{"sala":0,"x":642,"y":266},"independiente":{"sala":0,"x":949,"y":266},"san_lorenzo":{"sala":0,"x":1274,"y":266},"belgrano":{"sala":1,"x":789,"y":299},"talleres":{"sala":1,"x":977,"y":299},"central":{"sala":1,"x":1169,"y":299},"newells":{"sala":1,"x":1368,"y":299},"chicago":{"sala":1,"x":789,"y":474},"chacarita":{"sala":1,"x":977,"y":474},"laferrere":{"sala":1,"x":1169,"y":474},"moron":{"sala":1,"x":1368,"y":474}},"ocluye":{"x":1488,"y":464}}};
  // v157 — capa de PRIMER PLANO por sala: todas las personas del fondo que quedan delante de los compartimentos (silueta completa,
  // recortada del mismo fondo): se dibuja SIEMPRE después de los trofeos.
  const OCLUYE = {"boca": [{"x": 643, "y": 574}, {"x": 27, "y": 428}], "san_lorenzo": [{"x": 968, "y": 562}, {"x": 0, "y": 378}], "independiente": [{"x": 755, "y": 600}, {"x": 12, "y": 496}], "racing": [{"x": 793, "y": 596}, {"x": 20, "y": 464}]};
  const SALAS_DE = (club, parlante) => [
    { id: 'principal', nombre: 'Sala principal', fondo: `assets/galpon/${club}/sala1.webp`, ocluye: { src: `assets/galpon/${club}/ocluye1.webp`, ...OCLUYE[club][0] }, radio: { src: null, parlante: { x: parlante[0], y: parlante[1], r: 16 } },
      referente: { pie: { x: 530, y: 900 }, alto: 410, mira: 1 } },   // parado junto a la silla libre (izquierda), mirando hacia la mesa
    // v197: sala derecha con DEPÓSITO PROPIO abajo (PRIMERA_DEPOSITOS_PROPIOS_v1/<CLUB>, en el atlas fondos3 en lugar de la sala vacía).
    // Sin capa de hinchas adelante: los de este fondo solo quedan delante de los sectores de abajo (depósito propio, sin trofeos encima).
    { id: 'derecha', nombre: 'Sala derecha', fondo: `assets/galpon/${club}/sala2.webp`,
      referente: { pie: { x: 680, y: 820 }, alto: 300 } }
  ];
  // v145 — referentes SENTADOS TOMANDO MATE en la silla de la izquierda (TROFEOS_DE_GUERRA/<CLUB>/MATE/*.png, recortados solo en la zona de la silla)
  const MATES_CLUBES = {"boca":{"cdp":{"src":"assets/galpon/boca/mate_cdp.webp","x":182,"y":572},"abuelo":{"src":"assets/galpon/boca/mate_abuelo.webp","x":173,"y":566},"manzanita":{"src":"assets/galpon/boca/mate_manzanita.webp","x":170,"y":568},"corea":{"src":"assets/galpon/boca/mate_corea.webp","x":173,"y":564}},"san_lorenzo":{"el_chivo":{"src":"assets/galpon/san_lorenzo/mate_el_chivo.webp","x":144,"y":534},"gallego_emilio_san_lorenzo":{"src":"assets/galpon/san_lorenzo/mate_gallego_emilio_san_lorenzo.webp","x":147,"y":529}},"independiente":{"el_gallego":{"src":"assets/galpon/independiente/mate_el_gallego.webp","x":146,"y":542}},"racing":{"cacho":{"src":"assets/galpon/racing/mate_cacho.webp","x":144,"y":540},"el_armenio":{"src":"assets/galpon/racing/mate_el_armenio.webp","x":179,"y":527}}};
  const GALPONES = { river: { salas: SALAS, trofeos: TROFEOS, mate: MATE, reposo: REPOSO, botones: BOTONES } };
  GALPONES.boca = { salas: SALAS_DE('boca', [75, 703]), trofeos: TROFEOS_DE('boca'), mate: MATES_CLUBES.boca, reposo: {}, botones: BOTONES, descanso: true };   // v144
  GALPONES.san_lorenzo = { salas: SALAS_DE('san_lorenzo', [81, 703]), trofeos: TROFEOS_DE('san_lorenzo'), mate: MATES_CLUBES.san_lorenzo, reposo: {}, botones: BOTONES, descanso: true };   // v144
  GALPONES.independiente = { salas: SALAS_DE('independiente', [74, 705]), trofeos: TROFEOS_DE('independiente'), mate: MATES_CLUBES.independiente, reposo: {}, botones: BOTONES, descanso: true };   // v144
  GALPONES.racing = { salas: SALAS_DE('racing', [76, 706]), trofeos: TROFEOS_DE('racing'), mate: MATES_CLUBES.racing, reposo: {}, botones: BOTONES, descanso: true };   // v144
  /* v151 — TROFEOS DE GUERRA REDISTRIBUIDOS (generado por t151/build151.py + datos151.py). Cada trapo es una imagen propia recortada a su
     diseño real (sin márgenes transparentes) y con el tono del galpón; el motor los ubica en la malla de cada exhibidor (disponer()).
     ARTE_TROFEOS.trapos[club] = { p: cuántos son principales, t: [[ancho, alto], …] } en el orden aprobado de BANDERAS/<CLUB>.
     ARTE_TROFEOS.inst[club] = [[tipo b=bombo · r=redoblante, ancho, alto], …]: SOLO los clubes con instrumentos recortables completos.
     PANELES[galpón].p[rival] = [sala, x, y, ancho, alto] = interior de la malla · estante = [techo, piso] del estante del medio (sala principal). */
  const ARTE_TROFEOS = {"trapos":{"river":{"p":1,"t":[[820,322],[440,161],[440,164],[440,169],[440,170],[440,167],[440,167],[440,158],[440,172],[440,158],[440,158],[440,152],[440,169]]},"boca":{"p":1,"t":[[820,260],[440,173],[440,119],[440,166]]},"racing":{"p":1,"t":[[820,240],[440,107],[440,122],[440,175]]},"independiente":{"p":1,"t":[[820,247],[440,176],[440,124],[440,174],[440,108],[440,142]]},"san_lorenzo":{"p":1,"t":[[820,273],[440,125],[440,197],[440,124],[440,153]]},"belgrano":{"p":1,"t":[[820,214],[440,181],[440,119],[440,284],[440,199],[232,300],[440,64]]},"talleres":{"p":1,"t":[[820,208],[440,208],[440,117],[440,175],[276,300],[440,128],[440,275]]},"central":{"p":1,"t":[[820,235],[440,171],[440,236],[440,232]]},"newells":{"p":1,"t":[[679,330],[440,146],[440,190],[440,173],[440,239],[440,177],[440,234],[440,166]]},"chicago":{"p":2,"t":[[820,238],[820,265],[440,190],[440,140],[308,300],[440,185],[440,211]]},"chacarita":{"p":1,"t":[[820,258],[440,219],[440,180],[440,139],[440,216],[317,300],[440,105],[440,213]]},"laferrere":{"p":1,"t":[[820,252],[440,171],[440,173],[299,300],[440,124],[440,199]]},"moron":{"p":1,"t":[[820,266],[440,166],[440,198],[440,219],[440,149],[440,192],[440,213],[440,217]]}},"inst":{"boca":[["b",184,194],["b",180,202],["b",198,200],["b",188,200],["r",126,76],["r",126,70],["r",134,80]],"san_lorenzo":[["b",182,196],["b",200,202],["b",158,214],["b",148,210],["b",196,206],["r",128,84],["r",128,88],["r",128,88]]}};
  const PANELES = {"boca":{"p":{"river":[0,289,261,302,218],"racing":[0,605,261,310,218],"independiente":[0,935,263,302,216],"san_lorenzo":[0,1259,262,332,216],"belgrano":[1,732,262,198,118],"talleres":[1,946,270,194,111],"central":[1,1156,267,208,113],"newells":[1,1379,262,205,117],"chicago":[1,733,460,197,112],"chacarita":[1,946,459,194,113],"laferrere":[1,1156,459,208,113],"moron":[1,1379,459,205,113]},"estante":[486,548]},"san_lorenzo":{"p":{"river":[0,328,263,293,216],"boca":[0,642,264,289,214],"racing":[0,951,263,301,215],"independiente":[0,1266,263,324,215],"belgrano":[1,651,238,228,107],"talleres":[1,897,238,222,107],"central":[1,1137,238,228,107],"newells":[1,1383,237,233,110],"chicago":[1,651,436,228,109],"chacarita":[1,891,437,228,108],"laferrere":[1,1130,436,236,109],"moron":[1,1383,436,233,109]},"estante":[486,547]},"independiente":{"p":{"river":[0,330,265,285,214],"boca":[0,641,265,283,214],"racing":[0,949,266,297,213],"san_lorenzo":[0,1273,265,311,213],"belgrano":[1,618,276,222,115],"talleres":[1,862,275,224,115],"central":[1,1107,275,223,115],"newells":[1,1351,275,231,115],"chicago":[1,618,473,223,88],"chacarita":[1,863,473,224,88],"laferrere":[1,1108,473,222,88],"moron":[1,1352,473,231,88]},"estante":[486,547]},"racing":{"p":{"river":[0,330,266,285,212],"boca":[0,642,266,281,213],"independiente":[0,949,266,297,212],"san_lorenzo":[0,1274,266,310,212],"belgrano":[1,789,299,174,112],"talleres":[1,977,299,175,112],"central":[1,1169,299,184,113],"newells":[1,1368,299,162,113],"chicago":[1,789,474,174,111],"chacarita":[1,977,474,175,111],"laferrere":[1,1169,474,183,111],"moron":[1,1368,474,151,112]},"estante":[486,549]},"river":{"p":{"belgrano":[1,745,281,181,99],"talleres":[1,950,281,188,99],"central":[1,1162,281,199,99],"newells":[1,1384,281,200,99],"chicago":[1,745,466,181,106],"chacarita":[1,950,466,188,106],"laferrere":[1,1162,466,199,106],"moron":[1,1384,466,200,106]},"estante":null}};
  // v155 — instrumentos de los demás clubes. 'g' = GRUPO (bombos + redoblantes juntos, recortados de la referencia
  // galpon_river_sala_derecha_trofeos_completos_v1 con autorización de Darío); b/r sueltos de Racing, Independiente y River = recortes de
  // los instrumentos PROPIOS dibujados en sus galpones (sala derecha). Laferrere: solo un par de redoblantes (su bombo está tapado).
  Object.assign(ARTE_TROFEOS.inst, {"belgrano":[["g",183,64]],"talleres":[["g",182,62]],"central":[["g",200,61]],"newells":[["g",199,63]],"chicago":[["g",172,52]],"chacarita":[["g",186,52]],"laferrere":[["g",45,45]],"moron":[["g",176,52]],"racing":[["b",174,180],["b",122,136],["r",62,26],["r",57,27]],"independiente":[["b",124,140],["b",98,118],["r",65,44],["r",55,45]],"river":[["b",96,137],["b",102,119],["r",48,33],["r",46,31]]});
  // v162 — River, Racing e Independiente: bombos (con cuerpo, en tres cuartos) y redoblantes recortados de sus PROPIOS galpones (sala
  // derecha, sin nadie delante), a su tamaño original. Reemplazan a los bombos «disco» de v155.
  Object.assign(ARTE_TROFEOS.inst, {"river":[["b",111,106],["b",81,103],["b",85,94],["b",96,137],["b",91,122],["b",102,119],["r",45,29],["r",37,24],["r",46,33],["r",34,22],["r",41,32],["r",46,31],["r",41,27]],"racing":[["b",178,188],["b",160,168],["b",148,152],["b",136,140],["r",62,26],["r",57,27],["r",57,27],["r",53,26],["r",62,29],["r",57,30]],"independiente":[["b",212,192],["b",167,171],["b",147,158],["b",128,148],["b",118,139],["b",111,132],["b",102,128],["r",69,39],["r",55,45],["r",49,41],["r",57,44],["r",53,42],["r",52,35],["r",52,36]]});
  // v163 — LAFERRERE: sus 6 banderas en versión TELA (colgadas con arrugas y ojales, recortadas de su propio nivel 10, mismos diseños
  // aprobados) y el grupo de instrumentos con un redoblante más (de la referencia). Se muestran TODAS sus banderas.
  ARTE_TROFEOS.trapos.laferrere = { p: 1, t: [[834, 241], [259, 128], [274, 131], [222, 140], [264, 132], [263, 124]] };
  ARTE_TROFEOS.inst.laferrere = [['g', 91, 45]];
  // v169 — NEWELL'S: sus 8 banderas en versión TELA (colgadas con arrugas y ojales, recortadas de su propio nivel 10, mismos diseños
  // aprobados), como Laferrere. Sus bombos y redoblantes NO cambian (aprobados).
  ARTE_TROFEOS.trapos.newells = { p: 1, t: [[302, 151], [299, 135], [296, 138], [295, 136], [300, 136], [292, 134], [318, 144], [332, 142]] };
  // v169 — clubes con telas «a lo grande» en la parte de arriba del panel (sala derecha, instrumentos abajo sin tocar):
  // el principal a la izquierda a toda la altura y las secundarias en una grilla de 2 filas a su derecha. Valor = cuántas secundarias.
  const TELAS_IZQ = { newells: 4 };
  // v170 — CENTRAL: sus 4 banderas en TELA (de su nivel 10). Principal apaisado (Los Guerreros) → a lo ancho arriba, como La 79 de
  // Laferrere, y debajo una fila con las secundarias. Valor = cuántas secundarias. Bombos y redoblantes sin tocar.
  ARTE_TROFEOS.trapos.central = { p: 1, t: [[1035, 229], [346, 181], [311, 178], [377, 182]] };
  const TELAS_ARRIBA = { central: 3 };
  // v171 — px que la malla empieza ARRIBA (+) o abajo (−) del panel registrado (medido en capturas de cada galpón): las banderas suben
  // hasta el cartel y tapan los ganchitos. River: franja con ganchos sobre todos los paneles · Boca/Belgrano: el cartel baja más.
  const TECHO_MALLA = { '1162,281': 12, '1384,281': 17, '745,281': 8, '950,281': 9, '745,466': 8, '950,466': 8, '1384,466': 8, '732,262': -11, '289,261': 6, '328,263': 8, '330,265': 9, '330,266': 9 };   // v175: + panel de River en la sala principal
  // v171 — clubes cuyas banderas LLENAN todo el espacio libre del panel (principal arriba a lo ancho + filas de secundarias)
  const TELAS_LLENAR = { belgrano: 1, talleres: 1, chicago: 1, chacarita: 1, moron: 1 };
  // v172 — secundarias elegidas por Darío (índices de BANDERAS/<CLUB>): Chicago → solo Las Antenas y La Tablada (sin Mataderos)
  const TELAS_SEC = { chicago: [2, 4], river: [1, 2, 3, 4] };
  // v175 — River (sala principal de los demás galpones): Núñez arriba tapando los ganchos y Belgrano, Constitución y Palermo grandes
  const PRINCIPAL_MAX = { chicago: 1 };   // elegidas por Darío con el principal al máximo
  TELAS_LLENAR.river = 1;
  /* Espacio libre para banderas: de lado a lado de la malla y desde el cartel hasta justo arriba de los instrumentos
     (o, con estante bajo propio, hasta el piso de la malla). */
  function zonaTelas(T, r) {
    const P = T.panel, techoInst = T.bajo ? P.y + P.h : r.inst.length ? Math.min(...r.inst.map(o => o.y)) : P.y + P.h * (1 - FRANJA_INST);
    const X0 = P.x + 1, Y0 = P.y + 2 - (TECHO_MALLA[P.x + ',' + P.y] || 0);
    return { X0, Y0, Wd: P.w - 2, Hd: techoInst - 2 - Y0 };
  }
  const PREF_TROFEOS = 'assets/galpon/trofeos/';
  // v159 — pilas COMPLETAS de redoblantes recortadas del galpón original de River (sin nadie delante): se suman a las de su club
  const PILAS = {};   // v162: la pila de Racing ya no hace falta (sus redoblantes sueltos vienen de su galpón)
  // v159 — secundarios COLGADOS como máximo (el resto: dobladas y apiladas → recurso PENDIENTE, no se muestran como cuadritos)
  const MAX_COLGADOS = { 0: 3, 1: 2 }, MAX_COLGADOS_CLUB = { laferrere: 5 };
  const DOBLADAS_PENDIENTES = {};
  ARTE_TROFEOS.drape = {"boca": [299, 214], "racing": [312, 214], "independiente": [327, 214], "san_lorenzo": [355, 214]};
  const BAJO = { boca: [490, 651], san_lorenzo: [490, 652], independiente: [489, 650], racing: [489, 650] };   // v161: compartimento ÚNICO y alto (se quitaron los dos estantes intermedios del fondo)
  const NATIVO = { boca: 0.5, san_lorenzo: 0.5 };   // sus piezas están guardadas al doble del tamaño original
  const BOMBOS_DISCO = [];   // solo hay bombos vistos de frente: pendientes (no se muestran)   // compartimento inferior (sala principal, ya sin cajas)
  /* v160 — PENDIENTE (no dar por corregida la sala derecha): fondos que necesitan compartimento inferior + estante intermedio reales
     (hoy solo un riel bajo la malla). Ver claude/inventario_trofeos_galpon.md del proyecto. Referencia: galpon_river_sala_derecha_trofeos_completos_v1.
     También pendientes: banderas colgadas/dobladas sueltas (un PNG por bandera) y bombos/redoblantes completos por club. */
  const FONDOS_PENDIENTES = { boca: 'sala2: los 8 sectores', racing: 'sala2: los 8 sectores', river: 'sala2: los 8 sectores',
    san_lorenzo: 'sala2: fila de arriba', independiente: 'sala2: fila de arriba' };
  const BAJO2 = { san_lorenzo: [549, 632], independiente: [565, 642] };                                        // estante bajo de la fila de abajo (sala derecha)
  const REPISA = { boca: 22, river: 22, san_lorenzo: 26, independiente: 18, racing: 10 };   // px del riel/estante bajo la malla (sala derecha)
  /* v152 — INSTRUMENTOS: espacio reservado en todos los paneles para 2 bombos + 2 redoblantes por club (PNG transparentes individuales
     a entregar en TROFEOS_DE_GUERRA/INSTRUMENTOS/<CLUB>/bombo_1.png, bombo_2.png, redoblante_1.png, redoblante_2.png).
     Integrados: Boca y San Lorenzo (recortes del galpón original de River, se conservan). PENDIENTES: el resto (no se simulan ni se
     recortan de la imagen de referencia). Al integrar un club: sumar sus medidas a ARTE_TROFEOS.inst[club] y sus imágenes al atlas. */
  const FRANJA_INST = 0.45;   // v162: la mitad de abajo de la malla es el compartimento de instrumentos (sala derecha)                                     // sala derecha: fracción de abajo de la malla para instrumentos
  const PLAN_INST = [['b', 115, 100], ['b', 115, 100], ['r', 170, 100], ['r', 170, 100]];   // proporciones nominales del plan
  const INSTRUMENTOS_ENTREGA = club => ['bombo_1', 'bombo_2', 'redoblante_1', 'redoblante_2'].map(n => `TROFEOS_DE_GUERRA/INSTRUMENTOS/${club.toUpperCase()}/${n}.png`);
  // Paneles: cada trofeo del galpón pasa a dibujarse por PIEZAS (trapos + instrumentos) en el interior de su exhibidor.
  // River conserva sus cuatro capas originales de la sala principal (trapos, bombos y redoblantes dibujados en el original): solo se amplían.
  for (const [club, G] of Object.entries(GALPONES)) {
    const conf = PANELES[club]; if (!conf) continue;
    for (const [rival, T] of Object.entries(G.trofeos)) {
      const q = conf.p[rival];
      if (club === 'river' && T.sala === 0 && T.capa) { T.original = true; continue; }
      if (!q) continue;
      T.sala = q[0]; T.panel = { x: q[1], y: q[2], w: q[3], h: q[4] }; T.capa = null;
      T.estante = q[0] === 0 && conf.estante ? { y0: conf.estante[0], y1: conf.estante[1] } : null; T.repisa = REPISA[club] || 0;
      T.bajo = q[0] === 0 ? BAJO[club] || null : (q[2] > 400 && BAJO2[club]) || null;
    }
  }
  /* v197 — GALPONES DE PRIMERA: los cuatro sectores de ABAJO de la sala derecha (antes Chicago, Chacarita, Laferrere y Morón) son ahora
     el DEPÓSITO PROPIO del club, dibujado en el fondo: se ve completo desde el principio y no es un trofeo. Se quitan esos cuatro
     trofeos de estos galpones (sin banderas, instrumentos ni nada encima). Los cuatro sectores siguen existiendo en el fondo para
     asignarlos más adelante a otros clubes de Primera. Regla: un galpón solo exhibe trofeos de rivales de SU categoría. */
  /* v198 — GALPONES DEL INTERIOR: ROSARIO CENTRAL, NEWELL'S, TALLERES y BELGRANO (TROFEOS_DE_GUERRA/CUATRO_GALPONES_INTERIOR_CONVERSACIONES_SERIAS_v4).
     La entrega trae las dos salas CON LA COLECCIÓN COMPLETA dibujada (todos los trofeos rivales ya en el fondo) y no hay fondos vacíos
     ni capas por rival. Para no mostrar conquistas que no se ganaron, el galpón de estos clubes se habilita RECIÉN con la campaña
     completa (aspecto final de la entrega); mientras tanto sigue la pantalla de campaña con la lista de rivales. Con los fondos vacíos
     (mismo encuadre) se pasa a aparición progresiva: orden de los sectores listo en SECTORES (izquierda a derecha).
     Referente: SOLO sentado en la silla vacía de la sala principal (MATE[referente], imagen sentada propia). Hoy no existe la imagen
     sentada de ninguno de sus referentes → la silla queda vacía; nunca se lo muestra de pie. En la sala trasera no aparece. */
  /* v200 — fondos INICIALES sin trofeos (TROFEOS_DE_GUERRA/CUATRO_GALPONES_INTERIOR_SIN_TROFEOS_CON_CAJAS_v2): la sala arranca vacía
     (adelante, con cajas en la parte baja de cada sector; atrás, el depósito propio siempre lleno). Al vencer a un rival, SOLO su sector
     toma la composición de la imagen completa v4 (sin tocarla): recorte de ese sector con máscara = donde las dos versiones difieren,
     así los hinchas que están delante quedan del fondo vacío, sin rectángulos ni personas duplicadas. Con los cuatro sectores de una
     sala ganados se muestra la imagen completa v4 tal cual. Las vacías miden 1670–1672 px: se dibujan en el mismo rectángulo (1672×941). */
  const PARCHES_INTERIOR = {"central": [{"newells": [222, 261], "talleres": [539, 261], "belgrano": [825, 261], "boca": [1116, 261]}, {"river": [671, 239], "racing": [895, 239], "independiente": [1132, 239], "san_lorenzo": [1363, 239]}], "newells": [{"central": [228, 261], "talleres": [547, 261], "belgrano": [878, 261], "river": [1227, 261]}, {"boca": [671, 239], "racing": [896, 239], "independiente": [1131, 239], "san_lorenzo": [1365, 239]}], "talleres": [{"belgrano": [228, 261], "newells": [541, 261], "central": [877, 261], "river": [1229, 261]}, {"boca": [671, 239], "racing": [902, 239], "independiente": [1134, 239], "san_lorenzo": [1373, 239]}], "belgrano": [{"talleres": [228, 261], "central": [543, 261], "newells": [878, 261], "boca": [1228, 261]}, {"river": [671, 239], "racing": [920, 239], "independiente": [1127, 239], "san_lorenzo": [1362, 239]}]};
  const SALAS_INTERIOR = club => [0, 1].map(k => ({ id: k ? 'derecha' : 'principal', nombre: k ? 'Sala trasera' : 'Sala principal',
    fondo: `assets/galpon/${club}/sala${k + 1}_vacia.webp`, completo: `assets/galpon/${club}/sala${k + 1}_completa.webp`,
    sectores: Object.fromEntries(Object.entries(PARCHES_INTERIOR[club][k]).map(([r, [x, y]]) => [r, { src: `assets/galpon/${club}/trofeo${k + 1}_${r}.webp`, x, y }])),
    referente: k ? { pie: { x: 680, y: 820 }, alto: 300 } : { pie: { x: 130, y: 760 }, alto: 360, mira: 1 } }));
  const SECTORES = {
    central:  { principal: ['newells', 'talleres', 'belgrano', 'boca'],  trasera: ['river', 'racing', 'independiente', 'san_lorenzo'] },
    newells:  { principal: ['central', 'talleres', 'belgrano', 'river'], trasera: ['boca', 'racing', 'independiente', 'san_lorenzo'] },
    talleres: { principal: ['belgrano', 'newells', 'central', 'river'], trasera: ['boca', 'racing', 'independiente', 'san_lorenzo'] },
    belgrano: { principal: ['talleres', 'central', 'newells', 'boca'],  trasera: ['river', 'racing', 'independiente', 'san_lorenzo'] }
  };
  // v201 — referentes SENTADOS con mate (REFERENTES_INTERIOR_11_SENTADOS_MATE_v1): capa recortada de cada escena (persona + su silla,
  // máscara = segmentación de la persona ∪ zona baja que cambió respecto del fondo vacío, para tapar la silla original corrida).
  const MATES_INTERIOR = {"central": {"pillin_central": {"src": "assets/galpon/central/mate_pillin_central.webp", "x": 85, "y": 538}, "el_rana_central": {"src": "assets/galpon/central/mate_el_rana_central.webp", "x": 87, "y": 523}, "chapero_central": {"src": "assets/galpon/central/mate_chapero_central.webp", "x": 85, "y": 515}}, "newells": {"pimpi_newells": {"src": "assets/galpon/newells/mate_pimpi_newells.webp", "x": 13, "y": 571}, "el_panadero_newells": {"src": "assets/galpon/newells/mate_el_panadero_newells.webp", "x": 25, "y": 551}}, "talleres": {"el_capo_talleres": {"src": "assets/galpon/talleres/mate_el_capo_talleres.webp", "x": 74, "y": 560}, "el_toro_talleres": {"src": "assets/galpon/talleres/mate_el_toro_talleres.webp", "x": 72, "y": 545}, "el_viejo_talleres": {"src": "assets/galpon/talleres/mate_el_viejo_talleres.webp", "x": 74, "y": 556}}, "belgrano": {"el_loco_tito": {"src": "assets/galpon/belgrano/mate_el_loco_tito.webp", "x": 179, "y": 569}, "gitano": {"src": "assets/galpon/belgrano/mate_gitano.webp", "x": 89, "y": 576}, "lucas": {"src": "assets/galpon/belgrano/mate_lucas.webp", "x": 178, "y": 574}}};
  /* v202 — TALLERES, sala delantera v5 (TALLERES_REFERENTES_MATE_COMPARTIDO_v5): una escena por referente con él ya sentado en una silla
     de adulto. Sin trofeos = <ref>_sentado_mate_v5 (la base exacta de la versión con trofeos); con trofeos = CON_TROFEOS/<ref>_con_trofeos_v5
     tal cual. Por sector: recorte con máscara de la versión con trofeos (las personas quedan del fondo). Sin capa de mate aparte. */
  const TALLERES_V5 = {"el_capo_talleres": {"belgrano": [228, 261], "newells": [540, 261], "central": [879, 261], "river": [1227, 261]}, "el_toro_talleres": {"belgrano": [228, 261], "newells": [539, 261], "central": [878, 261], "river": [1224, 261]}, "el_viejo_talleres": {"belgrano": [228, 261], "newells": [537, 261], "central": [878, 261], "river": [1227, 261]}};
  for (const club of Object.keys(SECTORES))
    GALPONES[club] = { salas: SALAS_INTERIOR(club), trofeos: {}, mate: MATES_INTERIOR[club] || {}, reposo: {}, botones: BOTONES, sinDePie: true, sectores: SECTORES[club] };   // v200: galpón desde el inicio (fondos vacíos)
  { const S0 = GALPONES.talleres.salas[0];   // v202
    S0.radio = { src: null, parlante: { x: 118, y: 712, r: 20 } };   // radio de la mesa lateral, junto al referente
    S0.porRef = Object.fromEntries(Object.entries(TALLERES_V5).map(([rid, L]) => [rid, {
      fondo: `assets/galpon/talleres/sala1_${rid}_vacia.webp`, completo: `assets/galpon/talleres/sala1_${rid}_completa.webp`,
      sectores: Object.fromEntries(Object.entries(L).map(([r, [x, y]]) => [r, { src: `assets/galpon/talleres/trofeo1_${rid}_${r}.webp`, x, y }])) }]));
    GALPONES.talleres.mate = {};   // el referente ya está dibujado en la escena
    // v209 — sin trofeos nítidos con fernet en la mesa central (TALLERES_DELANTERA_SIN_TROFEOS_v8), uno por referente
    S0.porRef.el_capo_talleres.fondo = 'assets/galpon/talleres/sala1_el_capo_talleres_vacia_v8.webp';
    S0.porRef.el_toro_talleres.fondo = 'assets/galpon/talleres/sala1_el_toro_talleres_vacia_v7.webp';
    S0.porRef.el_viejo_talleres.fondo = 'assets/galpon/talleres/sala1_el_viejo_talleres_vacia_v7.webp';
    // v203 — sala trasera con FERNET (TALLERES_TRASERA_FERNET_v5): completa = 02_sala_trasera_completa_fernet_v5 tal cual; la vacía se compone
    // con la sin trofeos v2 + la mesa de adelante de la versión fernet (fernet a la izquierda, sin mate del medio). Falta la vacía propia.
    // v210 — trasera con BOMBOS propios (LA / Malvinas arriba, F-I-E-L abajo): sin trofeos y completa bombos_v7, tal cual; revelado en los 4 compartimentos de arriba
    Object.assign(GALPONES.talleres.salas[1], { fondo: 'assets/galpon/talleres/sala2_vacia_bombos_v7.webp', completo: 'assets/galpon/talleres/sala2_completa_bombos_v7.webp',
      sectores: Object.fromEntries(Object.entries({"boca": [663, 241], "racing": [898, 241], "independiente": [1135, 241], "san_lorenzo": [1365, 241]}).map(([r, [x, y]]) => [r, { src: `assets/galpon/talleres/trofeo2_${r}_bombos_v7.webp`, x, y }])) });
  }
  { const S0 = GALPONES.belgrano.salas[0];   // v204 — BELGRANO, sala delantera v3/v1 (BELGRANO_SALA_DELANTERA_v3): escena propia por referente
    S0.radio = { src: null, parlante: { x: 118, y: 757, r: 26 } };   // radio de la mesa chica, junto al referente
    S0.porRef = Object.fromEntries(Object.entries({"el_loco_tito": {"talleres": [228, 261], "central": [562, 261], "newells": [878, 261], "boca": [1227, 261]}, "gitano": {"talleres": [228, 261], "central": [561, 261], "newells": [877, 261], "boca": [1229, 261]}, "lucas": {"talleres": [228, 261], "central": [545, 261], "newells": [881, 261], "boca": [1204, 261]}}).map(([rid, L]) => [rid, {
      fondo: `assets/galpon/belgrano/sala1_${rid}_vacia.webp`, completo: `assets/galpon/belgrano/sala1_${rid}_completa.webp`,
      sectores: Object.fromEntries(Object.entries(L).map(([r, [x, y]]) => [r, { src: `assets/galpon/belgrano/trofeo1_${rid}_${r}.webp`, x, y }])) }]));
    GALPONES.belgrano.mate = {};   // el referente ya está dibujado en la escena
    // v211 — trasera con BOMBOS propios (BELGRANO_SALA_TRASERA_v8): sin trofeos y con trofeos bombos_v8, tal cual; revelado en los 4 compartimentos de arriba
    Object.assign(GALPONES.belgrano.salas[1], { fondo: 'assets/galpon/belgrano/sala2_vacia_bombos_v8.webp', completo: 'assets/galpon/belgrano/sala2_completa_bombos_v8.webp',
      sectores: Object.fromEntries(Object.entries({"river": [663, 241], "racing": [905, 241], "independiente": [1126, 241], "san_lorenzo": [1373, 241]}).map(([r, [x, y]]) => [r, { src: `assets/galpon/belgrano/trofeo2_${r}_bombos_v8.webp`, x, y }])) });
  }
  { const S0 = GALPONES.central.salas[0];   // v212 — ROSARIO CENTRAL, sala delantera v5 (CENTRAL_SALA_DELANTERA_v5): escena propia por referente
    S0.radio = { src: null, parlante: { x: 450, y: 658, r: 30 } };   // radio de la mesa junto al referente
    S0.porRef = Object.fromEntries(Object.entries({"pillin_central": {"newells": [223, 265], "talleres": [534, 265], "belgrano": [831, 265], "boca": [1115, 265]}, "el_rana_central": {"newells": [223, 265], "talleres": [521, 265], "belgrano": [828, 265], "boca": [1113, 265]}, "chapero_central": {"newells": [223, 265], "talleres": [533, 265], "belgrano": [824, 265], "boca": [1106, 265]}}).map(([rid, L]) => [rid, {   // v213: fondos y recortes v6 (CENTRAL_SALA_DELANTERA_v6), sin compresión
      fondo: `assets/galpon/central/sala1_${rid}_vacia_v6.webp`, completo: `assets/galpon/central/sala1_${rid}_completa_v6.webp`,
      sectores: Object.fromEntries(Object.entries(L).map(([r, [x, y]]) => [r, { src: `assets/galpon/central/trofeo1_${rid}_${r}_v6.webp`, x, y }])) }]));
    GALPONES.central.mate = {};   // el referente ya está dibujado en la escena
    // v214 — trasera con BOMBOS propios (CENTRAL_SALA_TRASERA_v9): sin trofeos y con trofeos bombos_v9, tal cual y sin compresión; revelado en los 4 compartimentos de arriba
    Object.assign(GALPONES.central.salas[1], { fondo: 'assets/galpon/central/sala2_vacia_bombos_v9.webp', completo: 'assets/galpon/central/sala2_completa_bombos_v9.webp',
      sectores: Object.fromEntries(Object.entries({"river": [663, 241], "racing": [890, 241], "independiente": [1126, 241], "san_lorenzo": [1370, 241]}).map(([r, [x, y]]) => [r, { src: `assets/galpon/central/trofeo2_${r}_bombos_v9.webp`, x, y }])) });
  }
  { const S0 = GALPONES.newells.salas[0];   // v206 — NEWELL'S v7 (NEWELLS_GALPON_v7): delantera por referente (cartón de Toro abierto) y trasera con un solo mate
    S0.radio = { src: null, parlante: { x: 318, y: 662, r: 26 } };   // radio grande de la mesa chica, junto al referente
    S0.porRef = Object.fromEntries(Object.entries({"pimpi_newells": {"central": [228, 261], "talleres": [550, 261], "belgrano": [859, 261], "river": [1230, 261]}, "el_panadero_newells": {"central": [228, 261], "talleres": [552, 261], "belgrano": [859, 261], "river": [1251, 261]}}).map(([rid, L]) => [rid, {
      fondo: `assets/galpon/newells/sala1_${rid}_vacia_v7.webp`, completo: `assets/galpon/newells/sala1_${rid}_completa_v7.webp`,
      sectores: Object.fromEntries(Object.entries(L).map(([r, [x, y]]) => [r, { src: `assets/galpon/newells/trofeo1_${rid}_${r}_v7.webp`, x, y }])) }]));
    GALPONES.newells.mate = {};   // el referente ya está dibujado en la escena
    // v208 — trasera APROBADA (NEWELLS_SALA_TRASERA_APROBADA): sin trofeos v10 y con trofeos aprobada, tal cual; revelado solo en los 4 compartimentos de arriba
    Object.assign(GALPONES.newells.salas[1], { fondo: 'assets/galpon/newells/sala2_vacia_v10.webp', completo: 'assets/galpon/newells/sala2_completa_v10.webp',
      sectores: Object.fromEntries(Object.entries({"boca": [663, 241], "racing": [892, 241], "independiente": [1127, 241], "san_lorenzo": [1360, 241]}).map(([r, [x, y]]) => [r, { src: `assets/galpon/newells/trofeo2_${r}_v10.webp`, x, y }])) });
  }
  /* v199 — CAJONES de la sala principal (Boca, Racing, Independiente, San Lorenzo), como en el galpón de River: mientras un sector
     no tiene trofeo, abajo se ven los cajones de madera y el estante del fondo ORIGINAL de cada galpón (ENTREGA de cada club, recortados
     del mismo encuadre, solo la zona que cambia). Al ganar ese rival, los cajones se retiran y se exhiben sus instrumentos. */
  const CAJAS = (() => { const C = {"boca": {"river": [283, 479], "racing": [599, 479], "independiente": [929, 479], "san_lorenzo": [1253, 478]}, "racing": {"river": [324, 478], "boca": [636, 479], "independiente": [943, 478], "san_lorenzo": [1268, 478]}, "independiente": {"river": [324, 479], "boca": [635, 479], "racing": [943, 479], "san_lorenzo": [1267, 478]}, "san_lorenzo": {"river": [322, 479], "boca": [636, 478], "racing": [945, 478], "independiente": [1260, 478]}}, out = {};
    for (const [club, L] of Object.entries(C)) { out[club] = {}; for (const [r, [x, y]] of Object.entries(L)) out[club][r] = { src: `assets/galpon/${club}/cajas_${r}.webp`, x, y }; }
    return out; })();
  const DEPOSITO_PROPIO = ['river', 'boca', 'racing', 'independiente', 'san_lorenzo'];
  for (const club of DEPOSITO_PROPIO) { const G = GALPONES[club]; if (!G) continue;
    for (const r of Object.keys(G.trofeos)) if (categoriaDe(r) !== categoriaDe(club) || r === club) delete G.trofeos[r]; }
  /* v151 — DISTRIBUCIÓN de los trofeos de un exhibidor (coordenadas de mundo; la vista ampliada usa la misma, escalada).
     · Trapo principal (el primero aprobado; Chicago: los dos primeros) arriba, lo más grande posible a lo ancho, sin deformar.
     · Secundarios en 1 fila (1–2 trapos) o 2 filas (3 o más), todos con el mismo «peso» visual (área normalizada:
       un trapo cuadrado no queda gigante ni diminuto al lado de uno apaisado). Se prueban todos los cortes de fila y alturas del
       principal (que ocupa ≥ 78 % del ancho útil) y se elige el que deja los secundarios más grandes con el principal claramente mayor
       (≥ 1,35 × fila). Sin superposición.
     · Instrumentos (si el club tiene recortes completos): en el estante del medio, apoyados en su piso, bombos y redoblantes de a dos. */
  const cacheDisp = {};
  /* v163 — sector LLENO (sala derecha): principal a lo ancho arriba · fila de 3 secundarias · abajo, sobre el riel: secundaria,
     instrumentos y secundaria. Todo en el interior de la malla + riel, sin superponer, a escala común (sin agrandar de más). */
  function disponerLleno(rival, T) {
    const M = ARTE_TROFEOS.trapos[rival], P = T.panel, src = i => `${PREF_TROFEOS}${rival}_${String(i + 1).padStart(2, '0')}.webp`;
    const G = ARTE_TROFEOS.inst[rival][0], m = 3, gap = 3, X0 = P.x + m, Wd = P.w - 2 * m, Y0 = P.y + m, Y1 = T.bajo ? T.bajo[1] - 3 : P.y + P.h + (T.repisa || 0) - 2;   // con estante bajo propio (San Lorenzo, Independiente) se usa hasta su piso
    const t = M.t, filaA = [1, 2, 3], filaB = [4, 'g', 5];
    const dim = i => i === 'g' ? [G[1], G[2]] : t[i];
    // alturas relativas: principal hp, fila A ha, fila B hb (instrumentos a 1,25 × las telas de su fila); se busca la escala que llena el alto
    const anchoFila = (L, h) => L.reduce((a, i) => { const [w, hh] = dim(i), hi = i === 'g' ? h * 1.25 : h; return a + w * hi / hh; }, 0) + gap * (L.length - 1);
    let mejor = null;
    for (let ha = 10; ha <= 60; ha += 0.5) {
      const hb = ha, hp = Math.min(Wd * t[0][1] / t[0][0], (Y1 - Y0) - ha - hb * 1.25 - 2 * gap);
      if (hp < ha * 1.3) continue;
      if (anchoFila(filaA, ha) > Wd || anchoFila(filaB, hb) > Wd) continue;
      if (!mejor || ha > mejor.ha) mejor = { ha, hb, hp };
    }
    if (!mejor) return null;
    const trapos = [], inst = [];
    const libre = (Y1 - Y0) - mejor.hp - mejor.ha - mejor.hb * 1.25 - 2 * gap, sep = Math.max(0, libre / 3);
    let y = Y0 + sep * 0.5; const wp = mejor.hp * t[0][0] / t[0][1];
    trapos.push({ src: src(0), x: P.x + (P.w - wp) / 2, y, w: wp, h: mejor.hp }); y += mejor.hp + gap + sep;
    const fila = (L, h, base) => { const tot = anchoFila(L, h), hueco = (Wd - tot) / (L.length + 1); let x = X0 + hueco;
      for (const i of L) { const [w0, h0] = dim(i), hi = i === 'g' ? h * 1.25 : h, wi = w0 * hi / h0;
        const o = { src: i === 'g' ? `${PREF_TROFEOS}inst_${rival}_1.webp` : src(i), x, y: base ? Y1 - hi : y + (h - hi) / 2, w: wi, h: hi };
        (i === 'g' ? inst : trapos).push(i === 'g' ? { ...o, tipo: 'g' } : o); x += wi + gap + hueco; } };
    fila(filaA, mejor.ha, false); fila(filaB, mejor.hb, true);
    return { trapos, inst, huecos: [], zona: { x: P.x, w: P.w, y0: Y1 - mejor.hb * 1.25, y1: Y1 }, pendiente: false };
  }
  function telasIzq(rival, T, r) {
    const M = ARTE_TROFEOS.trapos[rival], P = T.panel, gap = 2, { X0, Y0, Wd, Hd } = zonaTelas(T, r);
    const src = i => `${PREF_TROFEOS}${rival}_${String(i + 1).padStart(2, '0')}.webp`, t = M.t, n = TELAS_IZQ[rival];
    const sec = t.slice(1, 1 + n).map((d, j) => ({ i: j + 1, a: d[0] / d[1] })), filas = [sec.slice(0, Math.ceil(n / 2)), sec.slice(Math.ceil(n / 2))];
    // a escala 1: principal de alto Hd; cada fila de la grilla, de alto (Hd - gap) / 2
    const hr = (Hd - gap) / 2, wp = Hd * t[0][0] / t[0][1], anchoF = L => L.reduce((a, o) => a + o.a * hr, 0) + gap * (L.length - 1);
    const wg = Math.max(...filas.map(anchoF)), k = Math.min(1, Wd / (wp + gap + wg));
    const tot = (wp + gap + wg) * k, x0 = X0 + (Wd - tot) / 2, y0 = Y0, out = [];   // v171: pegado arriba (tapa los ganchitos)
    out.push({ src: src(0), x: x0, y: y0, w: wp * k, h: Hd * k });
    filas.forEach((L, f) => { let x = x0 + (wp + gap) * k + (wg - anchoF(L)) * k / 2; const y = y0 + f * (hr + gap) * k;
      L.forEach(o => { const w = o.a * hr * k; out.push({ src: src(o.i), x, y, w, h: hr * k }); x += w + gap * k; }); });
    return out;
  }
  function telasArriba(rival, T, r) {
    // v170b — usa TODO el espacio libre del panel: de lado a lado de la malla y desde los ganchos hasta justo arriba de los bombos
    const M = ARTE_TROFEOS.trapos[rival], P = T.panel, gap = 2;
    const { X0, Y0, Wd, Hd } = zonaTelas(T, r);
    const src = i => `${PREF_TROFEOS}${rival}_${String(i + 1).padStart(2, '0')}.webp`, t = M.t, n = TELAS_ARRIBA[rival];
    const sec = t.slice(1, 1 + n).map((d, j) => ({ i: j + 1, a: d[0] / d[1] })), sa = sec.reduce((a, o) => a + o.a, 0);
    // principal lo más largo posible y la fila de abajo a la MITAD de su alto (legible); si el ancho no alcanza, se reparte
    let hp = Math.min(Wd * t[0][1] / t[0][0], (Hd - gap) / 1.5), hr = Math.min(Hd - gap - hp, (Wd - gap * (n - 1)) / sa);
    const out = [], wp = hp * t[0][0] / t[0][1], sobra = Math.max(0, Hd - gap - hp - hr);
    out.push({ src: src(0), x: X0 + (Wd - wp) / 2, y: Y0, w: wp, h: hp });
    const hueco = (Wd - sa * hr) / (n + 1); let x = X0 + hueco; const y = Y0 + hp + gap + sobra;
    sec.forEach(o => { const w = o.a * hr; out.push({ src: src(o.i), x, y, w, h: hr }); x += w + hueco; });
    return out;
  }
  /* v171 — LLENAR: principal(es) arriba lo más largo posible y debajo 1–3 filas de secundarias, buscando la combinación que cubre más
     espacio con todo legible (secundarias ≥ 18 px de alto, al menos 3) y el principal claramente mayor (1,3–2,2 × fila). Sin deformar ni superponer. */
  function telasLlenar(rival, T, r) {
    const M = ARTE_TROFEOS.trapos[rival], gap = 2, { X0, Y0, Wd, Hd } = zonaTelas(T, r), t = M.t;
    const src = i => `${PREF_TROFEOS}${rival}_${String(i + 1).padStart(2, '0')}.webp`, asp = i => t[i][0] / t[i][1];
    const pr = t.slice(0, M.p).map((_, i) => i), resto = TELAS_SEC[rival] || t.slice(M.p).map((_, j) => M.p + j), aP = pr.reduce((a, i) => a + asp(i), 0);
    const maxF = Hd > Wd * 0.7 ? 2 : 1;   // una fila de secundarias; dos solo si el panel es alto (estante bajo propio)
    let mejor = null;
    for (let nf = 1; nf <= maxF; nf++) for (let k = Math.min(3, resto.length); k <= Math.min(resto.length, nf * 3); k++) {   // filas de hasta 3, como La 79
      const filas = []; let q = 0; for (let f = 0; f < nf; f++) { const c = Math.ceil((k - q) / (nf - f)); filas.push(resto.slice(q, q + c)); q += c; }
      for (let hp = 10; hp <= Hd; hp += 0.5) {
        if (hp * aP + gap * (pr.length - 1) > Wd) break;
        let hr = (Hd - hp - gap * nf) / nf;
        for (const L of filas) hr = Math.min(hr, (Wd - gap * (L.length + 1)) / L.reduce((a, i) => a + asp(i), 0));
        if (!PRINCIPAL_MAX[rival]) hr = Math.min(hr, hp / 1.25);        // el principal siempre mayor que la fila (salvo elección de Darío: agrandar las suyas)
        if (hr < 16 || (!PRINCIPAL_MAX[rival] && hp > hr * 2.4)) continue;                      // secundarias legibles y el principal sin acaparar
        const area = hp * hp * aP + filas.reduce((a, L) => a + L.reduce((b, i) => b + hr * hr * asp(i), 0), 0);
        const sc = PRINCIPAL_MAX[rival] ? hp * 1e6 + area : area;      // elegidas: principal(es) al máximo y las suyas con todo lo que queda
        if (!mejor || sc > mejor.area) mejor = { area: sc, hp, hr, filas };
      }
    }
    if (!mejor) return null;
    const out = [], { hp, hr, filas } = mejor, sobra = Math.max(0, Hd - hp - (hr + gap) * filas.length);
    const pone = (L, h, y) => { const tot = L.reduce((a, i) => a + asp(i) * h, 0) + (L === pr ? gap * (L.length - 1) : 0), hueco = L === pr ? gap : (Wd - tot) / (L.length + 1);
      let x = L === pr ? X0 + (Wd - tot) / 2 : X0 + hueco; for (const i of L) { const w = asp(i) * h; out.push({ src: src(i), x, y, w, h }); x += w + hueco; } };
    pone(pr, hp, Y0); let y = Y0 + hp + gap + sobra / (filas.length + 1);
    for (const L of filas) { pone(L, hr, y); y += hr + gap + sobra / (filas.length + 1); }
    return out;
  }
  /* v177 — SALA DERECHA = COPIA EXACTA DEL GALPÓN DE RIVER (aprobado por Darío): en los otros galpones cada trofeo del fondo se arma
     igual que en River (mismas banderas, orden, tamaños relativos e instrumentos) y se lleva entero a su panel con UNA sola escala
     (sin deformar): las banderas pegadas arriba (tapan los ganchitos) y los instrumentos apoyados donde apoyan en ese galpón. */
  const cacheCopia = {};
  function disponer(rival, T) {
    const TR = GALPONES.river && GALPONES.river.trofeos[rival];
    if (!T || T.sala !== 1 || !TR || TR === T || TR.sala !== 1 || !TR.panel) return disponerPropio(rival, T);
    const clave = rival + '@' + T.panel.x + ',' + T.panel.y; if (cacheCopia[clave]) return cacheCopia[clave];
    const R = disponerPropio(rival, TR), L = disponerPropio(rival, T); if (!R || !L) return L;
    const caja = arr => arr.length ? { x0: Math.min(...arr.map(o => o.x)), y0: Math.min(...arr.map(o => o.y)), x1: Math.max(...arr.map(o => o.x + o.w)), y1: Math.max(...arr.map(o => o.y + o.h)) } : null;
    const todo = caja([...R.trapos, ...R.inst]), ct = caja(R.trapos), ci = caja(R.inst);
    const P = T.panel, top = zonaTelas(T, L).Y0, bot = L.inst.length ? Math.max(...L.inst.map(o => o.y + o.h)) : P.y + P.h, X0 = P.x + 1, Wd = P.w - 2;
    const k = Math.min(Wd / (todo.x1 - todo.x0), (bot - top) / (todo.y1 - todo.y0)), dx = X0 + (Wd - (todo.x1 - todo.x0) * k) / 2;
    const mapa = (o, ancla, y) => ({ ...o, x: dx + (o.x - todo.x0) * k, y: y + (o.y - ancla) * k, w: o.w * k, h: o.h * k });
    const trapos = R.trapos.map(o => mapa(o, ct.y0, top)), inst = ci ? R.inst.map(o => mapa(o, ci.y1, bot)) : [];
    return (cacheCopia[clave] = { ...L, trapos, inst, huecos: [], telas: true });
  }
  function disponerPropio(rival, T) {
    const r = disponerBase(rival, T);
    if (r && TELAS_IZQ[rival] && T && T.sala === 1 && !T.bajo && !r.telas) { r.trapos = telasIzq(rival, T, r); r.telas = true; }
    if (r && TELAS_LLENAR[rival] && T && (T.sala === 1 || rival === 'river') && !r.telas) { const L = telasLlenar(rival, T, r); if (L) r.trapos = L; r.telas = true; }
    if (r && TELAS_ARRIBA[rival] && T && T.sala === 1 && !T.bajo && !r.telas) { r.trapos = telasArriba(rival, T, r); r.telas = true; }
    return r;
  }
  function disponerBase(rival, T) {
    if (!T || !T.panel) return null;
    const clave = rival + '@' + T.panel.x + ',' + T.panel.y; if (cacheDisp[clave]) return cacheDisp[clave];
    if (MAX_COLGADOS_CLUB[rival] && T.sala === 1) return (cacheDisp[clave] = disponerLleno(rival, T));
    const M = ARTE_TROFEOS.trapos[rival]; if (!M) return null;
    const P = T.panel, m = Math.max(2, Math.round(P.w * 0.02)), X0 = P.x + m, Y0 = P.y + m + 2, Wd = P.w - 2 * m;
    // v152: zona de INSTRUMENTOS reservada en TODOS los paneles. Sala principal: el estante del medio (debajo de la malla).
    // Sala derecha (sin estante propio): la franja de abajo de la malla, apoyada en su riel → los trapos usan solo la parte de arriba.
    const zona = T.estante ? { x: P.x, w: P.w, y0: T.estante.y0, y1: T.estante.y1 } : { x: P.x, w: P.w, y0: P.y + P.h * (1 - FRANJA_INST), y1: P.y + P.h + (T.repisa || 0) - 2 };
    const Hd = (T.estante || T.bajo ? P.h : P.h * (1 - FRANJA_INST)) - 2 * m - 2;   // v157: con compartimento bajo, la malla entera es para trapos
    const gap = Math.max(3, Wd * 0.02), items = M.t.map(([w, h], i) => ({ src: `${PREF_TROFEOS}${rival}_${String(i + 1).padStart(2, '0')}.webp`, w, h }));
    const pr = items.slice(0, M.p), todos = items.slice(M.p), maxC = MAX_COLGADOS_CLUB[rival] ?? MAX_COLGADOS[T.sala] ?? 3, sec = todos.slice(0, maxC);
    if (todos.length > maxC) DOBLADAS_PENDIENTES[rival] = todos.slice(maxC).map(o => o.src.split('/').pop().replace('.webp', ''));
    const areas = sec.map(o => o.w * o.h).sort((a, b) => a - b), A0 = areas.length ? areas[areas.length >> 1] : 1;
    sec.forEach(o => { const b = Math.sqrt(A0 / (o.w * o.h)); o.nw = o.w * b; o.nh = o.h * b; });
    const cortes = (n, r) => { const out = []; const rec = (ini, quedan, acc) => { if (quedan === 1) { out.push([...acc, [ini, n]]); return; } for (let c = ini + 1; c <= n - quedan + 1; c++) rec(c, quedan - 1, [...acc, [ini, c]]); }; if (n >= r) rec(0, r, []); return out; };
    let mejor = null;
    const filasPosibles = !sec.length ? [0] : sec.length > 3 ? [2] : [1];   // v159: una sola fila de telas colgadas, de tamaño visible   // 2 filas; 3 si son muchos (River: 12)
    for (const r of filasPosibles) for (const F of (r ? cortes(sec.length, r) : [[]])) for (let f = sec.length ? 0.30 : 1; f <= (sec.length ? 0.66 : 1) + 1e-9; f += 0.02) {
      const kp = Math.min((Wd - gap * (pr.length - 1)) / pr.reduce((a, o) => a + o.w, 0), Hd * f / Math.max(...pr.map(o => o.h)));
      const hp = Math.max(...pr.map(o => o.h)) * kp;
      if (sec.length && kp * pr.reduce((a, o) => a + o.w, 0) < 0.78 * Wd && hp < 0.5 * Hd && f < 0.65) continue;   // el principal ocupa casi todo el ancho (o media altura si es alto)
      let ks = Infinity, hs = 0;
      if (r) {
        const Hs = Hd - hp - gap * r;
        const altoFilas = F.reduce((a, [i0, i1]) => a + Math.max(...sec.slice(i0, i1).map(o => o.nh)), 0);
        ks = Math.min(...F.map(([i0, i1]) => (Wd - gap * (i1 - i0 - 1)) / sec.slice(i0, i1).reduce((a, o) => a + o.nw, 0)), Hs / altoFilas);
        const nhMax = Math.max(...F.map(([i0, i1]) => Math.max(...sec.slice(i0, i1).map(o => o.nh))));
        ks = Math.min(ks, hp / 1.25 / nhMax);                         // los secundarios nunca le compiten al principal
        if (!(ks > 0)) continue;
        hs = nhMax * ks;
      }
      // desempate: filas parejas de ancho (no una fila con un solo trapo y otra llena)
      const anchos = r ? F.map(([i0, i1]) => sec.slice(i0, i1).reduce((a, o) => a + o.nw, 0)) : [0];
      const puntaje = (r ? hs + 0.3 * hp : hp) - 0.02 * (Math.max(...anchos) - Math.min(...anchos)) / (A0 ** 0.5);
      if (!mejor || puntaje > mejor.puntaje) mejor = { puntaje, kp, ks, F, hp };
    }
    if (!mejor) return null;
    const trapos = [];
    const DR = T.estante && ARTE_TROFEOS.drape[rival];
    if (DR) {   // v157: Boca, Racing, Independiente y San Lorenzo → sus trapos COLGADOS de verdad (con caída y pliegues), tal cual el galpón original
      const k = Math.min((P.w - 4) / DR[0], (P.h - 2) / DR[1]), w = DR[0] * k, h = DR[1] * k;
      trapos.push({ src: `assets/galpon/trofeos/colgados_${rival}.webp`, x: P.x + (P.w - w) / 2, y: P.y + 2, w, h, colgado: true });
    } else {
    // alturas reales usadas → el sobrante vertical se reparte entre los bloques (cuelgan parejos de los ganchos)
    const filas = mejor.F.map(([i0, i1]) => sec.slice(i0, i1));
    const altos = [mejor.hp, ...filas.map(L => Math.max(...L.map(o => o.nh)) * mejor.ks)];
    const libre = Math.max(0, Hd - altos.reduce((a, b) => a + b, 0) - gap * (altos.length - 1)), sep = libre / (altos.length + 1);
    let y = Y0 + Math.min(sep, gap * 2);
    const extra = altos.length > 1 ? (libre - Math.min(sep, gap * 2)) / altos.length : 0;
    const fila = (L, esc, alto) => {
      const ws = L.map(o => (o.nw || o.w) * esc), hs = L.map(o => (o.nh || o.h) * esc), suma = ws.reduce((a, b) => a + b, 0);
      const hueco = Math.min(gap * 3, (Wd - suma) / (L.length + 1)), x0 = X0 + (Wd - suma - hueco * (L.length - 1)) / 2;
      let x = x0; L.forEach((o, i) => { trapos.push({ src: o.src, x, y: y + (alto - hs[i]) / 2, w: ws[i], h: hs[i] }); x += ws[i] + hueco; });
    };
    fila(pr, mejor.kp, mejor.hp); y += mejor.hp + gap + extra;
    filas.forEach((L, i) => { fila(L, mejor.ks, altos[i + 1]); y += altos[i + 1] + gap + extra; });
    }
    // v157 — COMPARTIMENTOS DE ABAJO (sala principal: estante del medio + compartimento inferior sin cajas · sala derecha de San Lorenzo e
    // Independiente: estante bajo sin cajas). Bombos grandes apoyados en el piso del compartimento y pilas de redoblantes; lo que no entra
    // sube al estante del medio. Sin duplicar piezas: solo las que existen para ese club.
    if (T.bajo && ARTE_TROFEOS.inst[rival]) {
      const real = ARTE_TROFEOS.inst[rival], inst = [], niveles = [{ y0: T.bajo[0], y1: T.bajo[1] }];
      const Wmax = P.w * 0.96, g2 = 4;
      if (real[0][0] === 'g') {   // grupo recortado de la referencia: al piso del compartimento, sin agrandar de más
        const [, gw, gh] = real[0], N0 = niveles[0], k = Math.min((N0.y1 - N0.y0 - 2) / gh, Wmax / gw, 1.35), w = gw * k, h = gh * k;
        inst.push({ src: `${PREF_TROFEOS}inst_${rival}_1.webp`, tipo: 'g', x: P.x + (P.w - w) / 2, y: N0.y1 - h, w, h });
      } else {
        /* v161 — UN SOLO COMPARTIMENTO ALTO (sin estante del medio): bombos apilados de a dos sobre la base y una columna de redoblantes
           apilados al costado, como el galpón de River. Nunca más grandes que su tamaño original (×1,1): no se ven borrosos.
           Bombos de River, Racing e Independiente: solo existen vistos de frente (discos) → NO se muestran; quedan pendientes. */
        const N0 = niveles[0], H = N0.y1 - N0.y0 - 2, nat = NATIVO[rival] || 1;
        const piezas = real.map(([t, w, h], j) => ({ src: `${PREF_TROFEOS}inst_${rival}_${j + 1}.webp`, tipo: t, w, h, max: h * nat * 1.1 }))
          .filter(o => !(o.tipo === 'b' && BOMBOS_DISCO.includes(rival)));
        const bombos = piezas.filter(o => o.tipo === 'b'), redo = piezas.filter(o => o.tipo === 'r');
        if (PILAS[rival]) redo.unshift({ ...PILAS[rival], tipo: 'p', max: PILAS[rival].h * 1.1 });
        // v162: se prueban pilas de 2 o 3 bombos y 1 a 3 columnas de redoblantes; gana la que deja los bombos más grandes llenando el alto
        const relB = bombos.length ? bombos.reduce((a, o) => a + o.w / o.h, 0) / bombos.length : 0;
        const maxB = bombos.length ? Math.min(...bombos.map(o => o.max)) : 0;
        let mejorL = null;
        for (const nb of bombos.length ? [1, 2, 3] : [1]) for (const nr of redo.length ? [1, 2, 3] : [0]) {
          const ncol = Math.ceil(bombos.length / nb), porR = nr ? Math.ceil(redo.length / nr) : 0;
          let hb0 = bombos.length ? Math.min(H / nb, maxB) : 0;
          const hr0 = porR ? Math.min(H / porR, ...redo.map(o => o.max)) : 0;
          const wR0 = nr ? nr * (redo.reduce((a, o) => a + o.w / o.h, 0) / redo.length) * hr0 : 0, gp = g2 * (ncol + nr - 1);
          if (ncol && ncol * relB * hb0 + wR0 + gp > Wmax) hb0 = Math.max(0, (Wmax - wR0 - gp) / (ncol * relB));
          if (!ncol && wR0 + gp > Wmax) continue;
          const lleno = (hb0 * nb) / H, puntaje = hb0 + 0.25 * hr0 + 30 * Math.min(1, lleno) - (nb === 3 ? 6 : 0);
          if (hb0 >= 0 && (!mejorL || puntaje > mejorL.puntaje)) mejorL = { puntaje, nb, nr, hb0, hr0 };
        }
        const cols = []; for (let j = 0; j < bombos.length; j += mejorL.nb) cols.push(bombos.slice(j, j + mejorL.nb));
        const porCol = mejorL.nr ? Math.ceil(redo.length / mejorL.nr) : 0, colR = [];
        for (let j = 0; j < redo.length; j += porCol) colR.push(redo.slice(j, j + porCol));
        const hb = mejorL.hb0, hR = () => mejorL.hr0;
        const anchoB = c => Math.max(...c.map(o => o.w * hb / o.h)), anchoR = L => Math.max(...L.map(o => o.w * hR(o) / o.h));
        const wR = colR.reduce((a, L) => a + anchoR(L), 0), gaps = g2 * (cols.length + colR.length - 1);
        const k = 1; let total = cols.reduce((a, c) => a + anchoB(c), 0) + wR + gaps;
        let x = P.x + (P.w - total) / 2;
        for (const c of cols) { const wc = anchoB(c) * k; let yy = N0.y1;
          c.forEach(o => { const h = hb * k, w = o.w * h / o.h; inst.push({ src: o.src, tipo: 'b', x: x + (wc - w) / 2, y: yy - h, w, h, base: yy === N0.y1 }); yy -= h - 1; });
          x += wc + g2 * k; }
        for (const L of colR) { const wc = anchoR(L) * k; let yy = N0.y1;
          L.forEach(o => { const h = hR(o) * k, w = o.w * h / o.h; inst.push({ src: o.src, tipo: o.tipo, x: x + (wc - w) / 2, y: yy - h, w, h, base: yy === N0.y1 }); yy -= h - 1; });
          x += wc + g2 * k; }
      }
      return (cacheDisp[clave] = { trapos, inst, huecos: [], zona: { x: P.x, w: P.w, y0: Math.min(...niveles.map(n => n.y0)), y1: niveles[0].y1 }, pendiente: false });
    }
    // instrumentos en su zona: los reales (Boca, San Lorenzo y los que se integren) o, si faltan, los HUECOS del plan
    // (2 bombos + 2 redoblantes con proporciones nominales). Los huecos NO se dibujan en el juego: solo con BB_DEBUG.huecos.
    const inst = [], huecos = [], real = ARTE_TROFEOS.inst[rival], I = real || PLAN_INST, E = zona;
    {
      const H = E.y1 - E.y0 - 2, bombos = [], redo = [];
      if (real && real[0][0] === 'g') {   // grupo: una sola pieza apoyada en el estante, centrada, sin agrandar de más (no se ve borrosa)
        const [, gw, gh] = real[0], k = Math.min(H / gh, (E.w * 0.97) / gw, 1.1), w = gw * k, h = gh * k;
        inst.push({ src: `${PREF_TROFEOS}inst_${rival}_1.webp`, tipo: 'g', x: E.x + (E.w - w) / 2, y: E.y1 - h, w, h });
        return (cacheDisp[clave] = { trapos, inst, huecos, zona, pendiente: false });
      }
      I.forEach(([t, w, h], j) => (t === 'b' ? bombos : redo).push({ src: real ? `${PREF_TROFEOS}inst_${rival}_${j + 1}.webp` : `pendiente:${rival}/${t === 'b' ? 'bombo' : 'redoblante'}_${(t === 'b' ? bombos : redo).length + 1}`, tipo: t, w, h }));
      const dest = real ? inst : huecos;
      const hb = H, hr = H * 0.49, pilas = []; for (let j = 0; j < redo.length; j += 2) pilas.push(redo.slice(j, j + 2));
      const anchoB = bombos.map(o => o.w * hb / o.h), anchoP = pilas.map(L => Math.max(...L.map(o => o.w * hr / o.h)));
      const g2 = 3, total = anchoB.reduce((a, b) => a + b, 0) + anchoP.reduce((a, b) => a + b, 0) + g2 * (bombos.length + pilas.length - 1);
      const k = Math.min(1, (E.w * 0.94) / total), x0 = E.x + (E.w - total * k) / 2; let x = x0;
      bombos.forEach((o, j) => { const w = anchoB[j] * k, h = hb * k; dest.push({ src: o.src, tipo: o.tipo, x, y: E.y1 - h, w, h }); x += w + g2 * k; });
      pilas.forEach((L, j) => { let yy = E.y1; L.forEach(o => { const h = hr * k, w = o.w * h / o.h; dest.push({ src: o.src, tipo: o.tipo, x: x + (anchoP[j] * k - w) / 2, y: yy - h, w, h }); yy -= h; }); x += anchoP[j] * k + g2 * k; });
    }
    return (cacheDisp[clave] = { trapos, inst, huecos, zona, pendiente: !real });
  }
  // Recursos que FALTAN para mostrar los instrumentos de cada club rival (no se simulan): lista exacta.
  const INSTRUMENTOS_FALTANTES = club => ARTE_TROFEOS.inst[club] ? null : `${(NOMBRES[club] || [club])[0]}: ${INSTRUMENTOS_ENTREGA(club).join(', ')} (PENDIENTE)`;
  const _viejoFaltantes = club => ARTE_TROFEOS.inst[club] ? null :
    `bombos y redoblantes de ${(NOMBRES[club] || [club])[0]} en PNG transparente (TROFEOS_DE_GUERRA/INSTRUMENTOS/${club}/bombo_*.png y redoblante_*.png)`;
  const FONDO = SALAS[0].fondo, FONDOS = {}, fondoDe = () => FONDO;   // compatibilidad: ya no hay fondos con un referente dibujado

  /* v109 — GUARDADO por identificadores estables, una campaña por barra: 'barra14.campana.v2.<club>' =
     { v: 2, club, personaje, rival (club rival actual), nivel (1–10 dentro de ese rival), completados (clubes rivales vencidos), puntaje, … }.
     Los trofeos se DERIVAN de los rivales vencidos. Compatibilidad: la campaña vieja de River ('barra14.campanaRiver.v1', ids de bloque
     viejos) y las banderas ganadas por las demás barras ('barra14.trofeos.v1') se convierten UNA vez en rivales vencidos verificables;
     el nivel guardado solo se conserva si era del mismo rival que ahora toca. Las claves viejas no se borran. */
  /* v191 — MODO DESARROLLADOR (botón DESARROLLADOR del selector de barras): sessionStorage 'barra14.dev' = { club, rival, nivel }.
     Arranca directo contra ESE rival y en esa pantalla, con una partida aparte (clave «.dev»): la campaña real no se toca. */
  const DEV = (() => { try { const d = JSON.parse(sessionStorage.getItem('barra14.dev')); return d && d.club === CLUB && d.rival ? d : null; } catch (e) { return null; } })();
  const CLAVE2 = `barra14.campana.v2.${CLUB}` + (DEV ? '.dev' : '');
  const VIEJOS_A_CLUB = { river_vs_san_lorenzo: 'san_lorenzo', racing_vs_racing: 'racing', independiente_vs_independiente: 'independiente', boca_vs_boca: 'boca', belgrano_vs_belgrano: 'belgrano', talleres_vs_talleres: 'talleres' };
  const vacio = personaje => ({ v: 2, club: CLUB, personaje, rival: null, completados: [], nivel: 1, puntaje: 0, partidaId: null, registrado: false, creada: Date.now() });
  const leerJ = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  function guardar(e) { if (e) e.rival = (BLOQUES.find(b => b.jugable && !e.completados.includes(b.id)) || {}).id || null; try { localStorage.setItem(CLAVE2, JSON.stringify(e)); } catch (err) {} return e; }
  function migrar() {
    const out = vacio(null); let hay = false;
    if (CLUB === 'river') {
      const v = leerJ(CLAVE);
      if (v && v.v === 1 && Array.isArray(v.completados)) {
        hay = true; out.personaje = v.personaje; out.puntaje = v.puntaje || 0; out.partidaId = v.partidaId || null; out.trucos = !!v.trucos;
        out.completados = [...new Set(v.completados.map(id => VIEJOS_A_CLUB[id]).filter(c => c && ORDENES.river.includes(c)))];
        // el nivel viejo era del primer bloque pendiente del orden VIEJO (San Lorenzo, Racing, Independiente, Boca, Belgrano, Talleres)
        const viejoActual = ['san_lorenzo', 'racing', 'independiente', 'boca', 'belgrano', 'talleres'].find(c => !out.completados.includes(c));
        const nuevoActual = (BLOQUES.find(b => b.jugable && !out.completados.includes(b.id)) || {}).id;
        out.nivel = viejoActual && viejoActual === nuevoActual ? Math.max(1, Math.min(10, v.nivel || 1)) : 1;
      }
    }
    const T = leerJ('barra14.trofeos.v1'), mios = T && T[CLUB];                  // banderas ganadas antes (recorrido completo + jefe)
    if (mios) for (const local of Object.keys(mios)) if ((ORDENES[CLUB] || []).includes(local) && !out.completados.includes(local)) { out.completados.push(local); hay = true; }
    out.migrada = hay ? Date.now() : undefined;
    return hay ? out : null;
  }
  function leer() {
    const e = leerJ(CLAVE2);
    if (e && e.v === 2 && Array.isArray(e.completados)) {
      e.completados = e.completados.filter(c => (ORDENES[CLUB] || []).includes(c));
      // v197: las victorias contra la otra categoría NO se borran (quedan guardadas) pero no cuentan en esta campaña (validos()).
      // Si la partida estaba en medio de un rival que ya no es de su categoría, sigue desde el nivel 1 del próximo rival válido.
      if (e.rival && !BLOQUES.some(b => b.id === e.rival)) { e.migradaCategoria = { de: e.rival, nivel: e.nivel || 1, cuando: Date.now() }; e.nivel = 1; }
      return e;
    }
    return migrar();
  }
  let est = DEV ? null : leer(); if (est) guardar(est);
  const validos = () => est.completados.filter(id => BLOQUES.some(b => b.id === id));
  const api = {
    CLUB, ORDENES, NOMBRES, CLAVE: CLAVE2, CLAVE_VIEJA: CLAVE, CLAVE_ELEGIDO, BLOQUES, FONDO, FONDOS, fondoDe, BOTON, BOTONES, SALAS: (GALPONES[CLUB] || GALPONES.river).salas, GALPONES, TROFEOS: (GALPONES[CLUB] || GALPONES.river).trofeos, MATE: (GALPONES[CLUB] || GALPONES.river).mate, REPOSO: (GALPONES[CLUB] || GALPONES.river).reposo, DESCANSO: !!(GALPONES[CLUB] || {}).descanso, ORDEN_RIVER, DESBLOQUEO_POR_PANTALLA,
    FONDOS_PENDIENTES, DOBLADAS_PENDIENTES, disponer, ARTE_TROFEOS, PANELES, INSTRUMENTOS_FALTANTES, INSTRUMENTOS_ENTREGA, instrumentosPendientes: () => Object.keys(NOMBRES).filter(c => !ARTE_TROFEOS.inst[c]),
    // v198: con galpón propio; los del interior (soloCompleta), recién con la campaña completa
    get galpon() { const G = GALPONES[CLUB]; return !!G && (!G.soloCompleta || api.terminada()); },
    CAJAS: CAJAS[CLUB] || null,   // v199
    SIN_DE_PIE: !!(GALPONES[CLUB] || {}).sinDePie, SECTORES: (GALPONES[CLUB] || {}).sectores || null,
    CATEGORIAS, CATEGORIA, categoriaDe,   // v197
    vencidos() { return est ? validos() : []; },                                    // v144: River, Boca, San Lorenzo, Independiente y Racing tienen galpón propio
    get estado() { return est; },
    // Al entrar: si hay campaña guardada de esta barra, se CONTINÚA (aunque se elija otro referente de la misma barra: el referente
    // pasa a ser el elegido y no concede nada). Si no hay, empieza una NUEVA: rival 1, nivel 1, cero vencidos y cero trofeos.
    // Una campaña terminada queda terminada (no vuelve sola al rival 1): para empezar otra, NUEVA CAMPAÑA.
    iniciar(personaje) {
      let elegido = null; try { elegido = localStorage.getItem(CLAVE_ELEGIDO); localStorage.removeItem(CLAVE_ELEGIDO); } catch (e) {}
      // v198: la marca vieja de River no se aplica a otra barra (antes podía pasar el referente de River a otra campaña)
      const R = global.ReglasCombate, delClub = id => !R || !R.referentesDelClub || R.referentesDelClub(CLUB.replace(/_/g, '-')).some(r => r.id === id);
      const p = (elegido && delClub(elegido) ? elegido : null) || personaje;
      if (!est) est = vacio(p); else est.personaje = p;
      if (DEV && !DEV.usado) { DEV.usado = true; est.nivel = Math.min(10, Math.max(1, +DEV.nivel || 1)); }   // v191: pantalla elegida
      guardar(est); return est;
    },
    nueva(personaje) { est = guardar(vacio(personaje || (est && est.personaje))); return est; },
    bloqueActual() { if (DEV) return BLOQUES.find(b => b.id === DEV.rival && b.jugable) || null; return BLOQUES.find(b => b.jugable && !validos().includes(b.id)) || null; },
    DEV,   // el primer rival pendiente JUGABLE
    pendientesSinEscenarios() { return BLOQUES.filter(b => !b.jugable && !validos().includes(b.id)); },
    indiceBloque() { const b = api.bloqueActual(); return b ? BLOQUES.indexOf(b) : BLOQUES.length; },
    terminada() { return !!est && BLOQUES.length > 0 && BLOQUES.every(b => est.completados.includes(b.id)); },   // v197: todos los de su categoría
    hayProgreso() { return !!est && (validos().length > 0 || est.nivel > 1); },   // v197: solo victorias de su categoría
    trofeos() { return est ? BLOQUES.filter(b => est.completados.includes(b.id)).map(b => b.rival) : []; },
    esVisitante(id) { const b = BLOQUES.find(x => x.id === id); return !!b && b.sede !== CLUB && b.rival !== CLUB; },
    asegurarPartida(nuevoId) { if (!est.partidaId) { est.partidaId = nuevoId(); guardar(est); } return est.partidaId; },
    nivelGanado(n, puntaje) { est.nivel = Math.min(10, n + 1); est.puntaje = puntaje; guardar(est); },
    // nivel 10 ganado (jefe vencido): registra al rival UNA vez y pasa al siguiente rival, nivel 1. true solo la primera vez.
    completarBloque(id, puntaje) {
      if (!BLOQUES.some(b => b.id === id) || est.completados.includes(id)) return false;
      est.completados.push(id); est.nivel = 1; est.puntaje = puntaje; guardar(est); return true;
    },
    // v156 — TRUCO CTRL+SHIFT+YYY: todos los rivales de ESTA barra vencidos (solo los de su orden: nunca el propio club). Idempotente.
    completarTodo(personaje) {
      if (!est) est = vacio(personaje);
            const antesValidos = validos().length;
      est.completados = [...new Set([...est.completados, ...BLOQUES.map(b => b.id)])]; est.nivel = 1; est.trucos = true; guardar(est);   // v197: solo su categoría
      return validos().length - antesValidos;
    },
    marcarRegistrado() { est.registrado = true; guardar(est); },
    marcarTrucos() { if (!est.trucos) { est.trucos = true; guardar(est); } },
    get conTrucos() { return !!(est && est.trucos); }
  };
  global.Campana = api;
})(typeof window !== 'undefined' ? window : globalThis);
