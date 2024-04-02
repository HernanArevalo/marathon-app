'use client';
import clsx from 'clsx';
import * as XLSX from 'xlsx';
import { Divider } from '..';

interface Props {
  useFile: boolean;
  setUseFile: Function;
  fileLoaded: boolean;
  setFileLoaded: Function;
  file: Array<{}>;
  setFile: Function;
}

export const FileCharge = ({
  useFile, setUseFile,
  fileLoaded, setFileLoaded,
  file,
  setFile,
}: Props) => {

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
  
    if (!files || files.length === 0) return;
  
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
  
      setFile([]);
      for (const i in workbook.SheetNames) {
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
  
        if (parsedData) {
          const lowercaseData = parsedData.map((item: any) => {
            const lowercaseItem: any = {};
            Object.keys(item).forEach((key) => {
              lowercaseItem[key.toLowerCase()] = item[key].toString().toLowerCase();
            });
            return lowercaseItem;
          });
  
          setFile((prevData: Array<{}>) => [
            ...prevData,
            { name: sheetName, data: lowercaseData },
          ]);
          setFileLoaded(true);
          setUseFile(true);
        }
      }
    };
  };
  


  return (
    <div
      className={clsx(
        useFile && !fileLoaded ? 'inline' : 'hidden',
        'text-2xl text-center bg-blue-800 text-white absolute w-[90%] h-[90%] flex flex-col justify-center items-center rounded p-10'
      )}
    >
      <div className='h-full flex flex-col gap-10 justify-center items-center'>
        <p>Selecciona un archivo Excel para cargar los participantes!</p>
        <form>
          <label className='block'>
            <input
              onChange={handleFileUpload}
              type='file'
              accept='.xlsx, .xls'
              className='text-xl text-white
                file:me-4 file:py-2 file:px-4 file:transition-all
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-blue-900
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:file:bg-blue-200
                dark:hover:file:bg-blue-400
              '
            />
          </label>
        </form>
      </div>
      <Divider />
      <div className='w-full flex justify-center items-center'>
        <button
          className='text-blue-900 bg-blue-200 p-4 rounded-md transition-all hover:bg-blue-400 cursor-pointer'
          onClick={() => {
            setUseFile(false);
          }}
        >
          Usar sólo cronómetro
        </button>
      </div>
    </div>
  );
};
