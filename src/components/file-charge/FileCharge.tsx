'use client';
import clsx from 'clsx';
import { useState } from 'react';
import { Divider } from './components';

export const FileCharge = () => {
  const [useFile, setUseFile] = useState(true);
  const [fileLoaded, setFileLoaded] = useState(false);

  return (
    <div
      className={clsx(
        useFile ? 'inline' : 'hidden',
        'text-2xl text-center bg-blue-800 text-white absolute w-[90%] h-[90%] flex flex-col justify-center items-center rounded p-10'
      )}
    >
      <div className='h-full flex flex-col gap-10 justify-center items-center'>
        <p>Selecciona un archivo Excel para cargar los participantes!</p>
        <form>
          <label className='block'>
            <input
              type='file'
              accept='.xlsx, .xls'
              className='text-xl text-white
                file:me-4 file:py-2 file:px-4
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
      <div className='w-full h-full flex justify-center items-center'>
        <p>Usar solo cronómetro</p>
      </div>
    </div>
  );
};
