export const generateFileName = () => {
  const fecha = new Date();

  // Obtener la fecha actual en el formato deseado: DD-MM-YYYY
  const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getFullYear()}`;

  // Obtener la hora actual en el formato deseado: HH-MM
  const horaFormateada = `${fecha.getHours().toString().padStart(2, '0')}-${fecha.getMinutes().toString().padStart(2, '0')}`;

  // Generar el nombre completo del archivo
  const nombreArchivo = `Resultados-${fechaFormateada}-${horaFormateada}.xlsx`;

  return nombreArchivo;

}