'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { IoCheckmarkCircle } from 'react-icons/io5';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

import { Divider } from '@/components';
import { useStore } from '@/store';

interface Data {
  name: string;
  data: {}[];
}

export default function LoadPage() {
  const [data, setData] = useState<Data[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [selectedColumn, setSelectedColumn] = useState<string>('');

  const router = useRouter();

  const { setIdentifier, setPlayers } = useStore();

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedSheet == '' || selectedColumn == '') return;

    if (data.some((sheet) => sheet.name == selectedSheet)) {
      const players: any = data.find(
        (sheet) => sheet.name == selectedSheet
      )?.data;
      setIdentifier(selectedColumn);
      setPlayers(players);
    }
    router.push('/');
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
          const lowercaseData = parsedData.map((item: any) => {
            const lowercaseItem: any = {};
            Object.keys(item).forEach((key) => {
              lowercaseItem[key.toLowerCase()] = item[key].toString();
            });
            return lowercaseItem;
          });
  
          setData((prevData: any) => [
            ...prevData,
            { name: sheetName, data: lowercaseData },
          ]);
  
        }
      }
    };
  };
  

  const sheetData = data.find((sheet) => sheet.name === selectedSheet);

  useEffect(() => {}, [selectedColumn]);

  return (
    <div
      className={clsx(
        // useFile && !fileLoaded ? 'inline' : 'hidden',
        'text-xl md:text-2xl text-center bg-[color:var(--dark)] text-[color:var(--white)] absolute w-[90%] h-[90%] flex flex-col justify-center items-center rounded p-10 fade-in'
      )}
    >
      <div className='h-full flex flex-col gap-10 justify-center items-center'>
        <p>Selecciona un archivo Excel para cargar los participantes!</p>
        <input
          onChange={handleFileUpload}
          type='file'
          accept='.xlsx, .xls'
          className='text-sm md:text-xl text-[color:var(--white)] w-fit
            file:me-4 file:py-2 file:px-4 file:transition-all
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-red-600 file:text-[color:var(--dark)]
            hover:file:bg-red-700
            file:disabled:opacity-50 file:disabled:pointer-events-none
            dark:file:bg-red-100
            dark:hover:file:bg-red-400
          '
        />
      </div>

      {data.length > 0 && (
        <>
          <form
            className='mx-auto flex flex-col md:flex-row gap-3 items-start md:items-end justify-center'
            onSubmit={handleIdentifierChange}
          >
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Selecciona una Hoja del archivo
            </label>
            <select
              id='sheets'
              onChange={(e) => setSelectedSheet(e.target.value)}
              value={selectedSheet}
              className='bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 
                           focus:ring-red-500 focus:border-red-500
                             dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
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
            <div className='flex flex-col justify-center items-center'></div>
            <label className='block mb-2 text-sm font-medium text-red-900 dark:text-white'>
              Selecciona el valor &quot;identificador&quot;
            </label>

            <select
              id='sheets'
              className='bg-gray-50 border border-gray-300 text-gray-00 text-sm rounded-lg block w-full p-2.5 
                           focus:ring-red-500 focus:border-red-500
                             dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500'
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
            <div className='flex flex-col'></div>

            <button
              type='submit'
              className='h-[45px] text-red-700 bg-red-300 w-[45px] flex justify-center items-center rounded-md hover:bg-red-800 hover:text-red-200 transition-all'
            >
              <IoCheckmarkCircle size={30} />
            </button>
          </form>
        </>
      )}
      <Divider />
      <div className='w-full flex justify-center items-center'>
        <Link href={'/'}>
          <button className='text-[color:var(--dark)] bg-red-200 p-4 rounded-md transition-all hover:bg-red-400 cursor-pointer'>
            Usar sólo cronómetro
          </button>
        </Link>
      </div>
    </div>
  );
}
