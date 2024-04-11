import { formatTime, generateFileName } from '@/helpers';
import { Finisher } from '@/interfaces';
import * as XLSX from 'xlsx';

export const saveExcelFile = (finishers:Finisher[]) => {

  const dataSetted = finishers.map((finisher, idx) => {
    return {
      pos: idx+1,
      ...finisher,
      TIEMPO: formatTime(finisher.time).general
    }
  })

  const ws = XLSX.utils.json_to_sheet(dataSetted);

  // Aplicar estilos
  ws['!rows'] = [{ hpt: 20 }]; // Establecer la altura de la fila superior
  ws['!cols'] = [{ width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 15 }]; // Establecer el ancho de las columnas
  const range = XLSX.utils.decode_range(ws['!ref']); // Obtener el rango de la hoja de cálculo
  for (let R = range.s.r; R <= range.e.r; ++R) { // Iterar sobre las filas
    for (let C = range.s.c; C <= range.e.c; ++C) { // Iterar sobre las columnas
      const cell_address = { c: C, r: R }; // Dirección de la celda
      const cell_ref = XLSX.utils.encode_cell(cell_address); // Referencia de la celda
      const cell = ws[cell_ref]; // Obtener la celda

      // Aplicar borde grueso a toda la tabla
      if (!cell) continue; // Ignorar celdas vacías
      cell.s = { border: { top: { style: "thick" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } } };

      // Aplicar fondo a la parte superior
      if (cell_address.r === 0) cell.s.fill = { fgColor: { rgb: "FFFF00" } }; // Rellenar la celda con un color amarillo para la fila superior
    }
  }


  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws, 'RESULTADOS')


  XLSX.writeFile(wb, generateFileName() );
}