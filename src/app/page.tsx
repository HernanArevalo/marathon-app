'use client';
import { Counter, FinisherForm, ResultsList, FileCharge } from '@/components';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [useFile, setUseFile] = useState(true);
  const [fileLoaded, setFileLoaded] = useState(false);
  const [file, setFile] = useState([]);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className='flex flex-col min-h-[100vh] md:flex-row'>
      <div className='relative md:w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>
        {useFile && !fileLoaded ? (
          <FileCharge
            useFile={useFile}
            setUseFile={setUseFile}
            fileLoaded={fileLoaded}
            setFileLoaded={setFileLoaded}
            file={file}
            setFile={setFile}
          />
        ) : (
          <>
            <button
              className='absolute top-10 left-10 bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                        hover:bg-gray-200 hover:text-black'
              onClick={() => {
                setFileLoaded(false);
              }}
            >
              Cargar otra tabla
            </button>
            <Counter />
            {fileLoaded ? (
              <FinisherForm />
            ) : (
              <button
                onClick={() => {
                  setUseFile(true);
                }}
                className='bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                              hover:bg-gray-200 hover:text-black'
              >
                Cargar planilla de Excel
              </button>
            )}
          </>
        )}
      </div>
      <div className='w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>
        <ResultsList />
      </div>
    </div>
  );
}
