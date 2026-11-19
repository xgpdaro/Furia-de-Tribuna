/* FURIA DE TRIBUNA — colores de marca para el canvas (v52).
   Lee las variables de css/identidad.css (la única fuente). Si la hoja no cargó, usa los mismos valores de respaldo. */
(function () {
  const RESPALDO = { hueso: '#F5F0E4', huesoSuave: '#D8D0BE', dorado: '#C9A44A', doradoBase: '#B58C35', doradoClaro: '#FFE3A0',
                     doradoOscuro: '#5A4518', carbon: '#151515', carbonRgb: '21,21,21', doradoRgb: '201,164,74' };
  const VAR = { hueso: '--fdt-hueso', huesoSuave: '--fdt-hueso-suave', dorado: '--fdt-dorado', doradoBase: '--fdt-dorado-base',
                doradoClaro: '--fdt-dorado-claro', doradoOscuro: '--fdt-dorado-oscuro', carbon: '--fdt-carbon',
                carbonRgb: '--fdt-carbon-rgb', doradoRgb: '--fdt-dorado-rgb' };
  const I = { NOMBRE: 'FURIA DE TRIBUNA' };
  let css = null; try { css = getComputedStyle(document.documentElement); } catch (e) {}
  for (const k in VAR) { const v = css && css.getPropertyValue(VAR[k]).trim(); I[k] = v || RESPALDO[k]; }
  I.carbonA = a => `rgba(${I.carbonRgb},${a})`;    // carbón con transparencia (velos y paneles)
  I.doradoA = a => `rgba(${I.doradoRgb},${a})`;
  window.IDENTIDAD = I;
})();
