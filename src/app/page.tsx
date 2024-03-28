'use client';
import { Counter, FinisherForm, ResultsList, FileCharge } from '@/components';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [listLoaded, setListLoaded] = useState(false);
  const [list, setFile] = useState([]);

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh] md:flex-row w-full fade-in'>

      <div className='relative w-full md:w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>
          { listLoaded &&
            <Link href={'/load'}>
              <button
                className='absolute top-10 left-10 bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                          hover:bg-gray-200 hover:text-black'
              >
                Cargar otra tabla
              </button>
            </Link>

          }
          <Counter />
          {listLoaded ? (
            <FinisherForm />
          ) : (
            <Link href={'/load'}>
              <button
                className='bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                hover:bg-gray-200 hover:text-black'
              >
                Cargar planilla de Excel
              </button>
            </Link>
          )}
      </div>
      
      { listLoaded &&
      <div className='w-[100%] md:w-[50%] h-[100vh] flex flex-col justify-center items-center p-5'>
        <ResultsList />
      </div>
      }

    </div>
  );
}
