'use client';
import { Divider } from '@/components';
import clsx from 'clsx';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import * as XLSX from 'xlsx';

interface Props {}
interface Data {
  name: string;
  data: {}[];
}

export default function LoadPage() {
  const [data, setData] = useState<Data[]>([
    {
      name: 'Jugadores',
      data: [
        {
          ID: 1079,
          Apellido: 'Juan',
          Nombre: 'Cortes',
          Categoría: 20,
          Departamento: 'Córdoba',
          Nacimiento: 38270,
        },
        {
          ID: 1080,
          Apellido: 'Hector',
          Nombre: 'Escamilla',
          Categoría: 23,
          Departamento: 'Córdoba',
          Nacimiento: 36917,
        },
        {
          ID: 1081,
          Apellido: 'Maria Ines',
          Nombre: 'Blades',
          Categoría: 17,
          Departamento: 'Córdoba',
          Nacimiento: 38272,
        },
        {
          ID: 1082,
          Apellido: 'Leticia',
          Nombre: 'Granados',
          Categoría: 20,
          Departamento: 'Córdoba',
          Nacimiento: 38273,
        },
        {
          ID: 1083,
          Apellido: 'Franco',
          Nombre: 'Mellera',
          Categoría: 20,
          Departamento: 'Córdoba',
          Nacimiento: 38274,
        },
        {
          ID: 1084,
          Apellido: 'Domínico',
          Nombre: 'Tavella',
          Categoría: 18,
          Departamento: 'Córdoba',
          Nacimiento: 38275,
        },
      ],
    },
    {
      name: 'Resultados',
      data: [
        {
          Tiempo: 0.03144675925925926,
          ID: 1079,
          Apellido: 'Cortes',
          Nombre: 'Juan',
        },
        {
          Tiempo: 0.0734375,
          ID: 1082,
          Apellido: 'Granados',
          Nombre: 'Leticia',
        },
        {
          Tiempo: 0.11618055555555555,
          ID: 1081,
          Apellido: 'Blades',
          Nombre: 'Maria Ines',
        },
        {
          Tiempo: 0.1582175925925926,
          ID: 1084,
          Apellido: 'Tavella',
          Nombre: 'Domínico',
        },
        {
          Tiempo: 0.2002662037037037,
          ID: 1083,
          Apellido: 'Mellera',
          Nombre: 'Franco',
        },
        {
          Tiempo: 0.2452199074074074,
          ID: 1080,
          Apellido: 'Escamilla',
          Nombre: 'Hector',
        },
      ],
    },
  ]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');

  const handleSheetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSheet(e.target.value);
  };
  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColumn(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      setData([]);
      setSelectedSheet('');
      setSelectedColumn('');
      for (const i in workbook.SheetNames) {
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        if (parsedData) {
          setData((prevData: any) => [
            ...prevData,
            { name: sheetName, data: parsedData },
          ]);
          // setFileLoaded(true);
          // setUseFile(true);
        }
      }
    };
  };

  const sheetData = data.find((sheet) => sheet.name === selectedSheet);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log({ selectedSheet: selectedSheet })
  }, [selectedSheet]);
  useEffect(() => {
    console.log({ selectedColumn: selectedColumn })
  }, [selectedColumn]);
  useEffect(() => {
    console.log({ sheetData: sheetData })
  }, [sheetData]);

  return (
    <div
      className={clsx(
        // useFile && !fileLoaded ? 'inline' : 'hidden',
        'text-xl md:text-2xl text-center bg-gray-900 text-white absolute w-[90%] h-[90%] flex flex-col justify-center items-center rounded p-10 fade-in'
      )}
    >
      <div className='h-full flex flex-col gap-10 justify-center items-center'>
        <p>Selecciona un archivo Excel para cargar los participantes!</p>
        <form>
          <label className=''>
            <input
              onChange={handleFileUpload}
              type='file'
              accept='.xlsx, .xls'
              className='text-sm md:text-xl text-white w-fit
                file:me-4 file:py-2 file:px-4 file:transition-all
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-gray-900
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:file:bg-blue-200
                dark:hover:file:bg-blue-400
              '
            />
          </label>
        </form>
      </div>

      {data.length > 0 && (
        <>
          <form className='mx-auto flex flex-col md:flex-row gap-3 items-start md:items-end justify-center'>
            <div className='flex flex-col justify-center items-center'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Selecciona una Hoja del archivo
              </label>
              <select
                id='sheets'
                onChange={(e) => setSelectedSheet(e.target.value)}
                value={selectedSheet}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5
                            focus:ring-blue-500 focus:border-blue-500
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value='' disabled>
                  Selecciona una Hoja
                </option>
                {data.map((sheet) => (
                  <option key={sheet.name} value={sheet.name}>
                    {sheet.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Selecciona la Columna del valor &quot;identificador&quot;
              </label>

              <select
                id='sheets'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 
                           focus:ring-blue-500 focus:border-blue-500
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={(e) => setSelectedColumn(e.target.value)}
                value={selectedColumn}
                disabled={sheetData == undefined}
              >
                <option value='' disabled>
                  Selecciona una columna
                </option>
                {sheetData &&
                  Object.keys(sheetData.data[0]).map((column) => (
                    <option key={column} value={column}>
                      {column}
                    </option>
                  ))}
              </select>
            </div>

            <button type='submit' 
                    className="h-[45px] text-gray-700 bg-gray-300 w-[45px] flex justify-center items-center rounded-md hover:bg-white hover:text-black transition-all">
              <IoCheckmarkCircle size={30}/>
            </button>
          </form>
        </>
      )}
      <Divider />
      <div className='w-full flex justify-center items-center'>
        <Link href={'/'}>
          <button className='text-gray-900 bg-blue-200 p-4 rounded-md transition-all hover:bg-blue-400 cursor-pointer'>
            Usar sólo cronómetro
          </button>
        </Link>
      </div>
    </div>
  );
}
