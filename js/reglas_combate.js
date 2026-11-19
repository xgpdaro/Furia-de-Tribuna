/* =====================================================================
   BARRAS BRAVAS — Reglas de combate (FUENTE ÚNICA DE VERDAD)
   ---------------------------------------------------------------------
   Todo lo que define a los referentes y al daño vive acá. El selector
   (index.html) y el combate (js/combate.js) leen de este archivo.
   Si hay que cambiar un número, se cambia SOLO acá.
   Reglas aprobadas: docs/PROMPT_CLAUDE_COMBATE_V14.md
   ===================================================================== */
(function (global) {
  'use strict';

  // ---- Técnicas: todos los referentes pueden hacer todas ----------------
  const ATAQUES = ['Trompadas', 'Patadas', 'Rodillazos', 'Codazos', 'Cabezazos', 'Agarres'];

  // Etiqueta corta que muestra la ficha técnica del selector
  const ETIQUETAS = {
    Trompadas: 'PUÑOS', Patadas: 'PATADAS', Rodillazos: 'RODILLAS',
    Codazos: 'CODOS', Cabezazos: 'CABEZA', Agarres: 'AGARRE'
  };

  // ---- Daño base -------------------------------------------------------
  const DANIO_NO_ESPECIALIDAD = 4;          // cualquier ataque que no sea especialidad
  const DANIO_ESPECIALIDAD = {              // solo si el ataque ES especialidad
    Trompadas: 7, Patadas: 9, Rodillazos: 6, Codazos: 6, Cabezazos: 7, Agarres: 8
  };

  // ---- Fuerza: multiplica TODOS los ataques ----------------------------
  const MULTIPLICADOR_FUERZA = { 3: 1.00, 4: 1.10, 5: 1.25 };

  // ---- Balance general (docs/game_balance.json) ------------------------
  const BALANCE = {
    vidaBaseJugador: 100,                   // 100 %
    vidaEnemigoInicialPct: 30,              // enemigos iniciales ≈ 30 % de la vida base del jugador
    largoMaximoNombre: 12                   // recomendado por el paquete de diseño
  };

  // ---- Los seis referentes fijos --------------------------------------
  // (Textos y stats copiados tal cual del selector v14 aprobado.)
  const REFERENTES = [
    { id:'sandokan', title:'Sandokan', origin:'Zona Norte',
      description:'Referente de perfil callejero y de combate cercano.',
      specialty:'Especialista en peleas callejeras.',
      bio:'Peleador de barrio, fuerte en el cuerpo a cuerpo y en situaciones de pelea cerrada. Se destaca por su estilo frontal y de contacto.',
      specialtyMoves:['Trompadas','Cabezazos','Agarres'],
      image:'assets/01_sandokan.webp', stats:{Fuerza:4,Aguante:2,Velocidad:5} },
    { id:'alan', title:'Alan', origin:'Belgrano',
      description:'Peleador técnico, versátil y completo.',
      specialty:'Especialista en artes marciales / Peleador completo.',
      bio:'Su diferencial es la técnica: puede desenvolverse de pie, en el suelo, en la calle o en un ring. Maneja con solvencia golpes, agarres y combinaciones.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      danioFijo:{ Trompadas:8, Patadas:7 },   // v32: daño FINAL de piña y patada (no se multiplica por Fuerza)
      image:'assets/02_alan.webp', stats:{Fuerza:4,Aguante:3,Velocidad:5} },
    { id:'loco_mingo', title:'Loco Mingo', origin:'Abasto',
      description:'Rápido, frontal y de mucho movimiento.',
      specialty:'Especialista en combate frontal y trompadas.',
      bio:'Referente de liderazgo y de ir al frente. Se mueve rápido por el escenario y su principal fortaleza está en las manos: zurda y derecha.',
      specialtyMoves:['Trompadas','Patadas'],
      image:'assets/03_loco_mingo.webp', stats:{Fuerza:3,Aguante:3,Velocidad:5} },
    { id:'el_diariero', title:'El Diariero', origin:'Belgrano',
      description:'Hombre de barrio, líder natural y bien tribunero.',
      specialty:'Especialista en peleas de tribuna y barrio.',
      bio:'Referente con experiencia de tribuna y calle, reconocido por su liderazgo y manejo de la hinchada. Sus fortalezas principales son las piñas y las patadas.',
      specialtyMoves:['Trompadas','Patadas','Cabezazos'],
      image:'assets/04_el_diariero.webp', stats:{Fuerza:3,Aguante:4,Velocidad:4} },
    { id:'matute', title:'Matute', origin:'Banda de Palermo',
      description:'Referente de barrio, frontal y con códigos de la calle.',
      specialty:'Fundador de Los Borrachos del Tablón.',
      bio:'Ligado a Palermo y Plaza Armenia. Se le atribuye haber dado el nombre Los Borrachos del Tablón a la barra. Sus fortalezas de combate son las trompadas y los cabezazos.',
      specialtyMoves:['Trompadas','Rodillazos','Cabezazos'],
      danioFijo:{ Trompadas:10, Patadas:5 },  // v32
      image:'assets/05_matute.webp', stats:{Fuerza:5,Aguante:5,Velocidad:2} },
    // v58 — EL GALLEGO (Independiente). Atributos de pelea EXACTAMENTE iguales a los de Alan (especialidades, daños fijos y
    // estadísticas copiados de su entrada; Alan no se toca). Identidad, nombre, club e imágenes propias.
    { id:'el_gallego', title:'El Gallego', origin:'Avellaneda',
      description:'Grandote y buen peleador, de campera roja con capucha.',
      specialty:'Referente de la barra de Independiente / Peleador completo.',
      bio:'Grandote de campera roja de Independiente, jean azul y zapatos. Pelea igual de completo que Alan: golpes, agarres y combinaciones.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],   // = Alan
      danioFijo:{ Trompadas:8, Patadas:7 },                                                    // = Alan
      image:'assets/referentes/el_gallego/el_gallego_guardia_derecha.webp', stats:{Fuerza:4,Aguante:3,Velocidad:5} },   // = Alan
    // v59 — CACHO (Racing / La Guardia Imperial). No se le definió un perfil de pelea propio: se usan las REGLAS GENERALES
    // vigentes para referentes, sin daños fijos ni ventajas. Fuerza 3 = multiplicador neutro ×1,00; las seis técnicas como
    // especialidad = tabla base DANIO_ESPECIALIDAD tal cual (piña 7, patada 9, rodilla 6, codo 6, cabeza 7, agarre 8).
    // Aguante y Velocidad no modifican nada hoy (fórmulas pendientes); se muestran en 3, el valor medio.
    // Combo de agarre y tiempos del poder: los valores «porDefecto» de combate.js y poder.js. TODO(Darío): definir su perfil.
    { id:'cacho', title:'Cacho', origin:'Avellaneda',
      description:'Grandote curtido de la Guardia Imperial, de musculosa de Racing.',
      specialty:'Referente de la barra de Racing.',
      bio:'Hombre grande y de mucha calle, con la musculosa celeste y blanca de Racing, cadenita, jean y zapatos. Pelea con lo que tiene a mano: piñas, patadas, codazos y agarres.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/cacho/cacho_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v60 — CABEZA DE PORONGA y EL ABUELO (Boca / La 12). Se REUTILIZA su configuración vigente: los daños de sus golpes como
    // enemigos (js/niveles.js → BASE: piña 5, patada 6, cabezazo 7, los mismos para los dos) pasan a danioFijo; el resto de
    // las técnicas siguen las reglas generales (Fuerza 3 = ×1,00, sin especialidad). NO se trae nada exclusivo de jefe:
    // ni su vida de jefe, ni la segunda vida, ni el +20 % del Abuelo en el nivel 10, ni su bloqueo especial.
    // Combo de agarre y tiempos del poder: los «porDefecto». TODO(Darío): si querés otro perfil, se cambia acá.
    { id:'cdp', title:'Cabeza de Poronga', origin:'La 12',
      description:'Pesado, en cuero y de jean, con la muñequera azul y oro.',
      specialty:'Referente de la barra de Boca.',
      bio:'Gordo grandote de la 12, siempre en cuero. Pega piñas, patadas y unos cabezazos que hacen honor a su apodo.',
      specialtyMoves:['Trompadas','Patadas','Cabezazos'], danioFijo:{Trompadas:5,Patadas:6,Cabezazos:7},
      image:'assets/enemigos/especiales/cabeza_de_poronga/cdp_guardia_original.webp', retratoMira:'izq', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'abuelo', title:'El Abuelo', origin:'La 12',
      description:'El jefe de la 12: pelo blanco, camisa a rayas y mano pesada.',
      specialty:'Referente de la barra de Boca.',
      bio:'El que manda en la 12 y cuida el trapo. Veterano, duro y curtido: piña, patada y cabezazo.',
      specialtyMoves:['Trompadas','Patadas','Cabezazos'], danioFijo:{Trompadas:5,Patadas:6,Cabezazos:7},
      image:'assets/enemigos/especiales/el_abuelo/abuelo_guardia_combate.webp', retratoMira:'izq', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v63 — EL CHIVO (San Lorenzo / Cuervos). Sin perfil propio definido: REGLAS GENERALES vigentes para referentes (igual que Cacho):
    // Fuerza 3 = ×1,00, las seis técnicas como especialidad = tabla base (piña 7, patada 9, rodilla 6, codo 6, cabeza 7, agarre 8),
    // sin daños fijos. Combo de agarre y tiempos del poder: «porDefecto». TODO(Darío): definir su perfil si querés otro.
    { id:'el_chivo', title:'El Chivo', origin:'Boedo',
      description:'Robusto y curtido, con la camisa azulgrana del Ciclón.',
      specialty:'Referente de la barra de San Lorenzo.',
      bio:'Hombre maduro y morrudo de la barra del Cuervo, de camisa a rayas azules y rojas, jean y zapatos. Pelea con piñas, patadas, codazos y agarres.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_chivo/el_chivo_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v92 — BELGRANO (Los Piratas): El Loco Tito, Gitano y Lucas. Sin perfil propio definido: REGLAS GENERALES vigentes (igual que
    // Cacho y El Chivo): Fuerza 3 = ×1,00, las seis técnicas como especialidad = tabla base, sin daños fijos. TODO(Darío): perfiles propios.
    { id:'el_loco_tito', title:'El Loco Tito', origin:'Alberdi',
      description:'Morrudo y de pelo largo, con la chomba celeste y el jean.',
      specialty:'Referente de la barra de Belgrano.',
      bio:'Panzón, de melena y pura calle, siempre al frente de los Piratas. Pelea con piñas, patadas, codazos y agarres. Se recupera con un fernet con coca.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_loco_tito/el_loco_tito_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'gitano', title:'Gitano', origin:'Alberdi',
      description:'Fornido, de pelo corto peinado para atrás y camiseta negra con la V celeste.',
      specialty:'Referente de la barra de Belgrano.',
      bio:'Morrudo y de mandíbula ancha, de jean y zapatillas negras. Pega piñas, patadas, codazos y agarres. Se recupera con un fernet con coca.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/gitano/gitano_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'lucas', title:'Lucas', origin:'Alberdi',
      description:'Serio, rapado y de barba corta, con chaleco celeste sobre el buzo gris.',
      specialty:'Referente de la barra de Belgrano.',
      bio:'Concentrado y de pocas palabras, con pantalón deportivo de franjas blancas. Pelea con piñas, patadas, codazos y agarres. Se recupera con un fernet con coca.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/lucas/lucas_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v94 — GALLEGO EMILIO (San Lorenzo). ID propio: NO es El Gallego de Independiente (id el_gallego). Sin perfil propio definido:
    // REGLAS GENERALES vigentes (igual que El Chivo): Fuerza 3 = ×1,00, las seis técnicas como especialidad = tabla base, sin daños fijos.
    // Poder (empujón de hombro) y recuperación (cartón de vino) DESHABILITADOS hasta que llegue el arte que falta (js/sprites_referentes.js).
    { id:'gallego_emilio_san_lorenzo', title:'Gallego Emilio', origin:'Boedo',
      description:'Robusto y panzón, de piluso claro y camiseta azul y roja.',
      specialty:'Referente de la barra de San Lorenzo.',
      bio:'Morrudo de la barra del Cuervo, con su piluso, jean y zapatillas oscuras. Pelea con piñas, patadas, codazos y agarres.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/gallego_emilio/gallego_emilio_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v95 — TALLERES (la Fiel) y ROSARIO CENTRAL (Guerreros): tres referentes cada uno. Sin perfil propio definido: REGLAS GENERALES
    // (como El Chivo): Fuerza 3, las seis técnicas como especialidad = tabla base, sin daños fijos. Recuperación: fernet (Talleres) y
    // choripán (Central). Poder: la presentación de siempre con sus 4 poses de carga de hombro (js/poder.js).
    { id:'el_capo_talleres', title:'El Capo', origin:'Barrio Jardín',
      description:'Morocho y canoso, de camperón azul largo sobre buzo blanco.',
      specialty:'Referente de la Fiel (Talleres).',
      bio:'El que conduce a la Fiel. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un fernet.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_capo/el_capo_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_toro_talleres', title:'El Toro', origin:'Barrio Jardín',
      description:'En cuero, tatuado, de short azul y zapatillas.',
      specialty:'Referente de la Fiel (Talleres).',
      bio:'Puro músculo y tatuajes. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un fernet.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_toro/el_toro_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_viejo_talleres', title:'El Viejo', origin:'Barrio Jardín',
      description:'Panzón, de camiseta a rayas azules y blancas, bermuda y ojotas.',
      specialty:'Referente de la Fiel (Talleres).',
      bio:'Veterano de mil batallas, con el tatuaje en la pierna derecha. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un fernet.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_viejo/el_viejo_base_zapatillas.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'pillin_central', title:'Pillin', origin:'Arroyito',
      description:'Rapado, de camperón acolchado azul con líneas amarillas.',
      specialty:'Referente de los Guerreros (Rosario Central).',
      bio:'Referente de los Guerreros. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/pillin/pillin_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_rana_central', title:'El Rana', origin:'Arroyito',
      description:'Camperita azul con líneas amarillas sobre camisa blanca a rayas.',
      specialty:'Referente de los Guerreros (Rosario Central).',
      bio:'Referente de los Guerreros. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_rana/el_rana_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'chapero_central', title:'Chapero', origin:'Arroyito',
      description:'Musculosa amarilla con líneas azules y el cigarrillo en la boca.',
      specialty:'Referente de los Guerreros (Rosario Central).',
      bio:'Referente de los Guerreros. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/chapero/chapero_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v97 — NEWELL'S (Leprosos): Pimpi y El Panadero (v98: la imagen base de El Panadero, espejada para que mire a la derecha como pidió Darío; su ropa es simétrica). Reglas generales (como Talleres y Central); se recuperan con el vino de cartón;
    // poder = carga de hombro en 4 poses. Retrato del selector: su imagen base (personajes/NEWELLS/<NOMBRE>/00_base.webp).
    { id:'pimpi_newells', title:'Pimpi', origin:'Rosario',
      description:'Morrudo, de piluso rojo y negro, buzo blanco con hombros negros y zapatillas rojas.',
      specialty:"Referente de los Leprosos (Newell's).",
      bio:'Referente de la Lepra. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un vino de cartón.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/pimpi/pimpi_00_base.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_panadero_newells', title:'El Panadero', origin:'Rosario',
      description:'Pelo peinado para atrás, camperón negro con mangas rojas y pantalón con tres tiras rojas.',
      specialty:"Referente de los Leprosos (Newell's).",
      bio:'Referente de la Lepra. Pelea con piñas, patadas, codazos y agarres, y carga de hombro. Se recupera con un vino de cartón.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_panadero/el_panadero_00_base_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v98 — MANZANITA (La 12 / Boca), exclusivo de Boca. Reglas generales (como los referentes v95/v97); poder = embestida de hombro en
    // 4 poses; se recupera con el choripán de Boca (Damajuana: POR_CLUB.boca). Retrato del selector: su guardia derecha (pose 01).
    { id:'manzanita', title:'Manzanita', origin:'La Boca',
      description:'Gordito y cachetón, pelirrojo, de camiseta azul con franja amarilla, jean oscuro y zapatos negros.',
      specialty:'Referente de La 12 (Boca).',
      bio:'Referente de La 12. Pelea con piñas, patadas, codazos y agarres, y embiste de hombro. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/manzanita/manzanita_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v99 — COREA (La 12 / Boca), exclusivo de Boca. Mismas reglas que Manzanita: generales, embestida de hombro en 4 poses y choripán
    // de Boca. Retrato del selector: 01_guardia_derecha. Pendiente: confirmar la pose 08 (caminar a la derecha, pie izquierdo adelante).
    { id:'corea', title:'Corea', origin:'La Boca',
      description:'Corpulento, de traje beige con camisa negra, sombrero negro y zapatos negros.',
      specialty:'Referente de La 12 (Boca).',
      bio:'Referente de La 12. Pelea con piñas, patadas, codazos y agarres, y embiste de hombro. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/corea/corea_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v101 — MORÓN (Los Borrachos de Morón): El Abuelo de Morón y El Gordo Cadena (damajuana) · NUEVA CHICAGO (La Banda de Chicago): El Paraguayo,
    // El Colo (versión actualizada, más robusta) y El Tarta (choripán). Reglas generales, poder = carga corporal en 4 poses. Retrato: guardia derecha.
    { id:'el_abuelo_moron', title:'El Abuelo de Morón', origin:'Morón',
      description:'Veterano de la barra de Morón.',
      specialty:'Referente de Los Borrachos de Morón.',
      bio:'Referente de Los Borrachos de Morón. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con la damajuana.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_abuelo_moron/el_abuelo_moron_selector_v2.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_gordo_cadena', title:'El Gordo Cadena', origin:'Morón',
      description:'Grandote de lentes negros.',
      specialty:'Referente de Los Borrachos de Morón.',
      bio:'Referente de Los Borrachos de Morón. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con la damajuana.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_gordo_cadena/el_gordo_cadena_selector_v2.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_paraguayo', title:'El Paraguayo', origin:'Mataderos',
      description:'Referente de la Banda de Chicago.',
      specialty:'Referente de La Banda de Chicago.',
      bio:'Referente de La Banda de Chicago. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_paraguayo/el_paraguayo_selector_v2.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_colo', title:'El Colo', origin:'Mataderos',
      description:'Grandote y robusto, de la Banda de Chicago.',
      specialty:'Referente de La Banda de Chicago.',
      bio:'Referente de La Banda de Chicago. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_colo/el_colo_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_tarta', title:'El Tarta', origin:'Mataderos',
      description:'Tatuado, de la Banda de Chicago.',
      specialty:'Referente de La Banda de Chicago.',
      bio:'Referente de La Banda de Chicago. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con un choripán.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_tarta/el_tarta_selector_v2.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v102 — CHACARITA (Funebreros). Solo imagen base de cada uno (personajes/CHACARITA/…): Muchinga v1, Chuky v2, Pajarito v2.
    // v103: con sus 44 animaciones propias (animaciones_nuevas/REFERENTES_CHACARITA_RACING_4_v1) ya se juegan. El retrato del selector sigue siendo su imagen base.
    { id:'muchinga_chacarita', title:'Muchinga', origin:'San Martín',
      description:'Canoso, de campera deportiva roja y negra.',
      specialty:'Referente de los Funebreros (Chacarita).',
      bio:'Referente de los Funebreros de Chacarita. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con el cartón de vino TORO.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/muchinga_chacarita/muchinga_base_v1.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'chuky_chacarita', title:'Chuky', origin:'San Martín',
      description:'Morocho y fornido, de remera roja, blanca y negra.',
      specialty:'Referente de los Funebreros (Chacarita).',
      bio:'Referente de los Funebreros de Chacarita. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con el cartón de vino TORO.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/chuky_chacarita/chuky_base_v2.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'pajarito_chacarita', title:'Pajarito', origin:'San Martín',
      description:'Pelo gris al ras y barba gris, con la camiseta a bastones.',
      specialty:'Referente de los Funebreros (Chacarita).',
      bio:'Referente de los Funebreros de Chacarita. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con el cartón de vino TORO.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/pajarito_chacarita/pajarito_base_v2.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v103 — EL ARMENIO (Racing / La Guardia Imperial). 44 poses propias; recuperación con la hamburguesa de cancha (la de Cacho).
    { id:'el_armenio', title:'El Armenio', origin:'Avellaneda',
      description:'Grandote de gorra y remera negra, de la Guardia Imperial.',
      specialty:'Referente de la barra de Racing.',
      bio:'Referente de La Guardia Imperial. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con una hamburguesa de cancha.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_armenio/el_armenio_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v104 — LAFERRERE (Los Villeros): El Tuerto y El Manco, 44 poses propias cada uno; se recuperan con el cartón de vino TORO.
    { id:'el_tuerto', title:'El Tuerto', origin:'Laferrere',
      description:'De camiseta verde y blanca y pantalón negro largo.',
      specialty:'Referente de Los Villeros.',
      bio:'Referente de Los Villeros de Laferrere. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con el cartón de vino TORO.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_tuerto/el_tuerto_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    { id:'el_manco', title:'El Manco', origin:'Laferrere',
      description:'De camiseta verde y blanca y bermuda negra.',
      specialty:'Referente de Los Villeros.',
      bio:'Referente de Los Villeros de Laferrere. Pelea con piñas, patadas, codazos y agarres, y carga con el cuerpo. Se recupera con el cartón de vino TORO.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/el_manco/el_manco_01_guardia_derecha.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} },
    // v78 — PISTOLA GAMEZ (Vélez en BATALLA CAMPAL). Sin perfil propio definido: REGLAS GENERALES vigentes (igual que Cacho y El Chivo):
    // Fuerza 3 = ×1,00, las seis técnicas como especialidad = tabla base, sin daños fijos. El REMERAZO es su golpe de mano (Trompadas).
    // NO está en IDS_SELECCIONABLES ni en REFERENTES_POR_CLUB: no aparece en ningún selector de campaña (solo en Batalla Campal).
    { id:'pistola_gamez', title:'Pistola Gamez', origin:'Liniers',
      description:'En cuero, short negro y la remera argentina en la mano izquierda.',
      specialty:'Referente de Vélez (Batalla Campal).',
      bio:'Pelea a remerazos con la camiseta argentina y a patadas. Se recupera con un cartón de vino.',
      specialtyMoves:['Trompadas','Patadas','Rodillazos','Codazos','Cabezazos','Agarres'],
      image:'assets/referentes/pistola_gamez/pistola_gamez_tarjeta.webp', stats:{Fuerza:3,Aguante:3,Velocidad:3} }
  ];
  /* v82 — WILLIAM (River). Pelea como ALAN: se ARMA desde su entrada real (copia profunda de especialidades, daños fijos, Fuerza y
     Aguante; Alan no se toca). Velocidad 4 (la que tiene desde v82). Identidad, textos e imagen propios. */
  {
    const base = id => JSON.parse(JSON.stringify(REFERENTES.find(r => r.id === id)));
    const alan = base('alan');
    REFERENTES.push(Object.assign(alan, {
      id:'william', title:'William', origin:'Núñez',
      description:'Rubio, musculoso y de lentes negros, con la camiseta blanca de la banda roja.',
      specialty:'Referente de River / Peleador completo.',
      bio:'Pelea con la técnica completa de Alan —golpes, agarres y combinaciones— y se mueve rápido. Se recupera con la damajuana.',
      image:'assets/referentes/william/william_01_guardia_derecha.webp',
      stats:{ ...alan.stats, Velocidad: 4 }
    }));
  }


  /* v135 — ATRIBUTOS DEFINITIVOS (Referentes_atributos_editables.xlsx, hoja «Referentes»): 33 referentes, valores 1–5 tal cual.
     Orden: [Fuerza, Aguante, Velocidad, Puños, Rodillas, Cabeza, Patadas, Codos, Agarre]. Reemplazan los stats iguales de antes.
     En combate: Fuerza usa la tabla vigente (3 = ×1,00 · 4 = ×1,10 · 5 = ×1,25; los daños fijos de Alan, Matute y William no
     la llevan). Aguante, Velocidad y el nivel 1–5 de cada especialidad se guardan y se muestran, pero NO tienen fórmula aprobada
     (ver modificadorAguante / modificadorVelocidad): el daño de cada golpe sigue la regla de especialidad sí/no vigente. */
  const ATRIBUTOS_EXCEL = {
    william: [5, 5, 5, 5, 5, 5, 5, 5, 5],   // river:william · William
    alan: [5, 5, 4, 5, 4, 4, 5, 5, 5],   // river:alan · Alan
    matute: [5, 4, 3, 4, 2, 3, 3, 3, 5],   // river:matute · Matute
    cdp: [5, 5, 4, 5, 3, 5, 4, 4, 5],   // boca:cabeza_de_poronga · Cabeza de Poronga
    abuelo: [3, 4, 3, 5, 2, 4, 3, 2, 5],   // boca:el_abuelo · El Abuelo
    manzanita: [4, 4, 4, 5, 4, 4, 4, 4, 5],   // boca:manzanita · Manzanita
    corea: [5, 5, 5, 5, 5, 5, 5, 5, 5],   // boca:corea · Corea
    el_chivo: [3, 3, 4, 4, 3, 5, 4, 4, 5],   // san_lorenzo:el_chivo · El Chivo
    gallego_emilio_san_lorenzo: [4, 5, 4, 5, 4, 4, 5, 3, 5],   // san_lorenzo:gallego_emilio · El Gallego Emilio
    cacho: [4, 5, 5, 4, 3, 5, 4, 4, 5],   // racing:cacho · Cacho de Ciudadela
    el_armenio: [4, 5, 4, 5, 4, 4, 5, 3, 5],   // racing:el_armenio · El Armenio
    el_gallego: [5, 5, 5, 4, 3, 5, 4, 4, 5],   // independiente:el_gallego · El Gallego
    el_loco_tito: [4, 5, 3, 5, 4, 4, 5, 3, 5],   // belgrano:loco_tito · El Loco Tito
    gitano: [4, 5, 4, 4, 3, 5, 4, 4, 5],   // belgrano:gitano · Gitano
    lucas: [4, 4, 4, 5, 4, 4, 5, 3, 5],   // belgrano:lucas · Lucas
    el_capo_talleres: [4, 4, 4, 4, 3, 5, 4, 4, 5],   // talleres:el_capo · El Capo
    el_toro_talleres: [4, 5, 4, 5, 4, 4, 5, 3, 5],   // talleres:el_toro · El Toro
    el_viejo_talleres: [4, 3, 3, 4, 3, 5, 4, 4, 5],   // talleres:el_viejo · El Viejo
    pillin_central: [5, 5, 4, 5, 4, 4, 5, 3, 5],   // central:pillin · Pillín
    el_rana_central: [4, 4, 3, 4, 3, 5, 4, 4, 5],   // central:el_rana · El Rana
    chapero_central: [4, 4, 5, 5, 4, 4, 5, 3, 5],   // central:chapero · Chapero
    pimpi_newells: [5, 4, 4, 4, 3, 5, 4, 4, 5],   // newells:pimpi · Pimpi
    el_panadero_newells: [4, 4, 3, 5, 4, 4, 5, 3, 5],   // newells:el_panadero · El Panadero
    el_paraguayo: [5, 4, 5, 4, 3, 5, 4, 4, 5],   // chicago:el_paraguayo · El Paraguayo
    el_colo: [4, 4, 4, 5, 4, 4, 5, 3, 5],   // chicago:el_colo · El Colo
    el_tarta: [4, 3, 5, 4, 3, 5, 4, 4, 5],   // chicago:el_tarta · El Tarta
    muchinga_chacarita: [5, 4, 4, 5, 4, 4, 5, 3, 5],   // chacarita:muchinga · Muchinga
    pajarito_chacarita: [4, 4, 4, 4, 3, 5, 4, 4, 5],   // chacarita:pajarito · Pajarito
    chuky_chacarita: [5, 4, 5, 5, 4, 4, 5, 3, 5],   // chacarita:chuky · Chuky
    el_tuerto: [4, 5, 4, 4, 3, 5, 4, 4, 5],   // laferrere:el_tuerto · El Tuerto
    el_manco: [4, 5, 5, 5, 4, 4, 5, 3, 5],   // laferrere:el_manco · El Manco
    el_abuelo_moron: [4, 4, 5, 4, 3, 5, 4, 4, 5],   // moron:el_abuelo_moron · El Abuelo de Morón
    el_gordo_cadena: [5, 5, 3, 5, 4, 4, 5, 3, 5],   // moron:el_gordo_cadena · El Gordo Cadena
  };
  for (const [id, v] of Object.entries(ATRIBUTOS_EXCEL)) {
    const r = REFERENTES.find(x => x.id === id); if (!r) throw new Error(`[Atributos] referente inexistente: ${id}`);
    r.stats = { Fuerza: v[0], Aguante: v[1], Velocidad: v[2] };
    r.especialidades = { Trompadas: v[3], Rodillazos: v[4], Cabezazos: v[5], Patadas: v[6], Codazos: v[7], Agarres: v[8] };
  }

  // ---- Referentes que se pueden ELEGIR (v23: solo tres) ------------------
  // Sandokan, Loco Mingo y El Diariero quedan en REFERENTES (datos y arte se conservan)
  // pero ya no aparecen en el selector. Para volver a sumarlos, agregar su id acá.
  // v105 — retratos del selector de El Gordo Cadena, El Abuelo de Morón, El Paraguayo y El Tarta: PNG corregidos
  // (personajes/RETRATOS_MORON_CHICAGO_CORREGIDOS_v2/*_selector_v2.png, alfa restaurada). Ruta propia SOLO para el selector: el combate sigue con sus 44 poses.
  const IDS_SELECCIONABLES = ['william', 'alan', 'matute', 'el_gallego', 'cacho', 'cdp', 'abuelo', 'el_chivo', 'el_loco_tito', 'gitano', 'lucas', 'gallego_emilio_san_lorenzo', 'el_capo_talleres', 'el_toro_talleres', 'el_viejo_talleres', 'pillin_central', 'el_rana_central', 'chapero_central', 'pimpi_newells', 'el_panadero_newells', 'manzanita', 'corea', 'el_abuelo_moron', 'el_gordo_cadena', 'el_paraguayo', 'el_colo', 'el_tarta', 'muchinga_chacarita', 'chuky_chacarita', 'pajarito_chacarita', 'el_armenio', 'el_tuerto', 'el_manco'];   // v104: + Laferrere   // v103: + El Armenio (Racing) · v102: + Chacarita (sin animaciones todavía)   // v101: + Morón y Chicago   // v97: + Newell's · v98: + Manzanita (Boca)   // v95: + Talleres y Central · v92: + Belgrano (solo con Belgrano) · v94: + Gallego Emilio (solo San Lorenzo)   // v63: + El Chivo (solo San Lorenzo)   // v60: + Cabeza de Poronga y El Abuelo (solo Boca)   // v59: + Cacho (solo Racing)   // v58: + El Gallego (solo Independiente: ver REFERENTES_POR_CLUB)
  const REEMPLAZO_RETIRADO = 'alan';     // si una partida guardada tiene uno retirado, se usa este

  // ---- Cálculos --------------------------------------------------------
  const referentePorId = id => REFERENTES.find(r => r.id === id) || null;
  const SELECCIONABLES = IDS_SELECCIONABLES.map(referentePorId);
  const esSeleccionable = id => IDS_SELECCIONABLES.includes(id);
  const esEspecialidad = (ref, ataque) => (ref.specialtyMoves || []).includes(ataque);
  // v135: especialidades 1–5 del Excel aprobado (Referentes_atributos_editables.xlsx). Sin dato → null (no se inventa)
  const especialidadesDe = ref => Object.fromEntries(ATAQUES.map(x => [x, ref && ref.especialidades && ref.especialidades[x] != null ? ref.especialidades[x] : null]));

  /* v57 — REFERENTES POR CLUB: única fuente para el selector (index.html) y para validar el inicio de la partida (js/juego.js).
     La clave es el club DEL JUGADOR (el elegido en el selector de barras), no el rival ni el estadio.
     Cada referente aparece solo en su club. Los clubes con lista vacía todavía no tienen referentes: el selector lo
     muestra y no deja jugar (no se usa un personaje de respaldo). */
  const REFERENTES_POR_CLUB = { river: ['william', 'alan', 'matute'], boca: ['cdp', 'abuelo', 'manzanita', 'corea'], racing: ['cacho', 'el_armenio'], independiente: ['el_gallego'], san_lorenzo: ['el_chivo', 'gallego_emilio_san_lorenzo'], belgrano: ['el_loco_tito', 'gitano', 'lucas'], talleres: ['el_capo_talleres', 'el_toro_talleres', 'el_viejo_talleres'], central: ['pillin_central', 'el_rana_central', 'chapero_central'], newells: ['pimpi_newells', 'el_panadero_newells'], moron: ['el_abuelo_moron', 'el_gordo_cadena'], chicago: ['el_paraguayo', 'el_colo', 'el_tarta'], chacarita: ['muchinga_chacarita', 'chuky_chacarita', 'pajarito_chacarita'], laferrere: ['el_tuerto', 'el_manco'] };   // v102   // v101   // v97: Newell's   // v95   // v92: Belgrano, en este orden   // v58: El Gallego, único de Independiente · v59: Cacho, único de Racing · v60: Boca = Cabeza de Poronga y El Abuelo · v63: San Lorenzo = El Chivo · v96: River = William + Alan + Matute
  const clubNormal = club => String(club || '').replace(/-/g, '_');
  const idsDelClub = club => (REFERENTES_POR_CLUB[clubNormal(club)] || []).filter(id => IDS_SELECCIONABLES.includes(id));
  const referentesDelClub = club => idsDelClub(club).map(referentePorId).filter(Boolean);
  const referentePermitido = (club, id) => idsDelClub(club).includes(id);
  // v102 — un referente sin animaciones (jugable:false) se puede ver y elegir en el selector, pero no arranca partida.
  const referenteJugable = id => { const r = referentePorId(id); return !!r && r.jugable !== false; };

  /* v32 — danioFijo: si el referente define el daño de un ataque (piña/patada), ESE es el daño final normal
     (sin bloqueo): no se le aplica la Fuerza encima. El resto de los ataques siguen con base × Fuerza. */
  const danioFijoDe = (ref, ataque) => ref.danioFijo && ref.danioFijo[ataque] != null ? ref.danioFijo[ataque] : null;
  function danioBase(ref, ataque) {
    if (!ATAQUES.includes(ataque)) throw new Error(`Ataque desconocido: ${ataque}`);
    const fijo = danioFijoDe(ref, ataque); if (fijo != null) return fijo;
    return esEspecialidad(ref, ataque) ? DANIO_ESPECIALIDAD[ataque] : DANIO_NO_ESPECIALIDAD;
  }

  function multiplicadorFuerza(ref) {
    const f = ref.stats && ref.stats.Fuerza;
    if (!(f in MULTIPLICADOR_FUERZA)) throw new Error(`Fuerza sin multiplicador definido: ${f}`);
    return MULTIPLICADOR_FUERZA[f];
  }

  // daño_ofensivo = daño_base_del_ataque × multiplicador_de_fuerza  (sin redondear)
  const multiplicadorAtaque = (ref, ataque) => danioFijoDe(ref, ataque) != null ? 1 : multiplicadorFuerza(ref);   // v32
  const danioOfensivo = (ref, ataque) => danioBase(ref, ataque) * multiplicadorAtaque(ref, ataque);

  /* ---- AGUANTE y VELOCIDAD: fórmulas TODAVÍA NO DEFINIDAS ------------
     Quedan los "enchufes" listos. Hoy no modifican nada a propósito.
     TODO(Darío): definir cuánto reduce el Aguante el daño recibido.
     TODO(Darío): definir cómo afecta la Velocidad (movimiento / ritmo). */
  const modificadorAguante = (defensor, danio) => danio;        // sin efecto hasta definir la fórmula
  const modificadorVelocidad = (luchador) => 1;                  // sin efecto hasta definir la fórmula

  // ---- Selección que guarda el selector y lee el combate ---------------
  const CLAVE_GUARDADO = 'referenteSeleccionado';
  const CLAVE_GUARDADO_ANTERIOR = 'personajeSeleccionado';      // se mantiene por compatibilidad

  function armarSeleccion(ref, playerName) {
    const damage = Object.fromEntries(ATAQUES.map(a => [a, danioBase(ref, a)]));
    const strengthMultiplier = multiplicadorFuerza(ref);
    const effectiveDamage = Object.fromEntries(ATAQUES.map(a => [a, danioOfensivo(ref, a)]));
    return {
      version: 15,
      playerName,                           // lo que escribió el jugador → va en el HUD
      id: ref.id, slot: REFERENTES.indexOf(ref) + 1,
      referenteName: ref.title,             // el referente elegido
      characterName: ref.title,             // alias viejo, se conserva
      origin: ref.origin,
      stats: { ...ref.stats },
      specialty: ref.specialty,
      specialtyMoves: [...ref.specialtyMoves],
      damage, strengthMultiplier, effectiveDamage
    };
  }

  function guardarSeleccion(sel) {
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(sel));
      localStorage.setItem(CLAVE_GUARDADO_ANTERIOR, JSON.stringify(sel));
      return true;
    } catch (e) { return false; }
  }

  // Lee lo guardado y lo RECALCULA con las reglas actuales (por si cambió un número).
  function leerSeleccion() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(CLAVE_GUARDADO) || localStorage.getItem(CLAVE_GUARDADO_ANTERIOR)); } catch (e) {}
    if (!s) return null;
    // referente retirado o desconocido → Alan (no se rompe la carga). v96: la selección vieja se reescribe con el reemplazo
    // (migración: queda guardado un referente válido y se conserva el nombre del jugador).
    const ref = referentePorId(esSeleccionable(s.id) ? s.id : REEMPLAZO_RETIRADO);
    if (!ref) return null;
    const sel = armarSeleccion(ref, s.playerName || '');
    if (sel.id !== s.id) guardarSeleccion(sel);
    return sel;
  }

  /* v96 — REFERENTES RETIRADOS: un personaje quitado del juego no deja datos guardados rotos. Al cargar este archivo (lo cargan
     index.html, juego.html y batalla.html antes que el resto) se reescriben UNA vez, en el almacenamiento del navegador, los datos
     que lo nombran: selección del referente (se conserva el nombre del jugador), selección de Batalla Campal, campaña en curso
     (se conservan trofeos, nivel y puntaje) y el nombre del referente en el ranking. Todo pasa al reemplazo indicado. */
  const RETIRADOS = [{ id: 'he_man', reemplazo: 'alan' }];
  const clave = t => String(t || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const reemplazoDe = id => { const r = RETIRADOS.find(x => clave(x.id) === clave(id)); return r ? r.reemplazo : null; };
  (function migrarGuardados() {
    let ls; try { ls = global.localStorage; if (!ls) return; } catch (e) { return; }
    const leerJSON = k => { try { return JSON.parse(ls.getItem(k)); } catch (e) { return null; } };
    const escribir = (k, v) => { try { ls.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {} };
    try {
      for (const k of [CLAVE_GUARDADO, CLAVE_GUARDADO_ANTERIOR]) {          // selección del referente
        const s = leerJSON(k), r = s && reemplazoDe(s.id), ref = r && referentePorId(r);
        if (ref) escribir(k, armarSeleccion(ref, s.playerName || ''));
      }
      { const v = ls.getItem('batallaCampal.selectedReferentId'), r = reemplazoDe(v);   // Batalla Campal
        if (r) escribir('batallaCampal.selectedReferentId', r); }
      { const e = leerJSON('barra14.campanaRiver.v1'), r = e && reemplazoDe(e.personaje);   // campaña en curso
        if (r) escribir('barra14.campanaRiver.v1', { ...e, personaje: r });
        const el = ls.getItem('barra14.campanaRiver.elegido'), r2 = reemplazoDe(el);
        if (r2) escribir('barra14.campanaRiver.elegido', r2);
        for (let i = 0; i < ls.length; i++) { const k = ls.key(i); if (!k || !k.startsWith('barra14.campana.v2.')) continue;   // v109: campañas de las 13 barras
          const c = leerJSON(k), r3 = c && reemplazoDe(c.personaje); if (r3) escribir(k, { ...c, personaje: r3 }); } }
      for (const k of ['barra14.ranking.v1', 'barra14.ranking']) {           // ranking: nombre del referente de cada registro
        const L = leerJSON(k); if (!Array.isArray(L)) continue; let cambio = false;
        const out = L.map(e => { const r = e && reemplazoDe(e.referente), ref = r && referentePorId(r);
          if (!ref) return e; cambio = true; return { ...e, referente: ref.title }; });
        if (cambio) escribir(k, out);
      }
    } catch (e) { /* nunca rompe la carga */ }
  })();

  global.ReglasCombate = {
    ATAQUES, ETIQUETAS, DANIO_NO_ESPECIALIDAD, DANIO_ESPECIALIDAD, MULTIPLICADOR_FUERZA, BALANCE, REFERENTES,
    SELECCIONABLES, IDS_SELECCIONABLES, REEMPLAZO_RETIRADO, esSeleccionable,
    REFERENTES_POR_CLUB, referentesDelClub, referentePermitido, referenteJugable,   // v57 · v102
    referentePorId, reemplazoDe, esEspecialidad, especialidadesDe, danioBase, multiplicadorFuerza, multiplicadorAtaque, danioOfensivo,
    modificadorAguante, modificadorVelocidad,
    armarSeleccion, guardarSeleccion, leerSeleccion
  };
})(typeof window !== 'undefined' ? window : globalThis);
