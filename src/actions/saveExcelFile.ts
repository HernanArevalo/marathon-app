import { formatTime, generateFileName } from '@/helpers';
import { Finisher } from '@/interfaces';
import * as XLSX from 'xlsx';

export const saveExcelFile = (finishers:Finisher[]) => {

  const dataSetted = finishers.map((finisher, idx) => {


    const formattedFinisher: { [key: string]: any } = {};
    Object.keys(finisher).forEach(key => {
      if (key !== 'time') {
        formattedFinisher[key.toUpperCase()] = finisher[key];
      }
    });
    return {
      POS: idx+1,
      ...formattedFinisher,
      TIEMPO: formatTime(finisher.time).general
    }
  }
  )

  const ws = XLSX.utils.json_to_sheet(dataSetted);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws, 'RESULTADOS')


  XLSX.writeFile(wb, generateFileName() );
}