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

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws, 'resultados')


  XLSX.writeFile(wb, generateFileName() );
}