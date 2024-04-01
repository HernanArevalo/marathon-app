'use client';
import { Counter, FinisherForm, ResultsList } from '@/components';
import { useStore } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';

export default function HomePage() {
  const { players, setPlayers } = useStore();

  return (
    <div className='flex flex-col justify-center items-center min-h-[100vh] md:flex-row w-full fade-in'>
      <div
        className={clsx(
          'relative w-full md:w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'
        )}
      >
        {players.length > 0 && (
          <div className='absolute top-10 left-10 flex gap-3'>
            <Link href={'/load'}>
              <button
                className=' bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                hover:bg-gray-200 hover:text-black'
              >
                Cargar otra tabla
              </button>
            </Link>
            <button
              className='bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                hover:bg-gray-200 hover:text-black'
              onClick={() => {
                setPlayers([]);
              }}
            >
              Eliminar la tabla
            </button>
          </div>
        )}
        <Counter />
        {players.length > 0 ? (
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

      {players.length > 0 && (
        <div className='w-[100%] md:w-[50%] h-[100vh] flex flex-col justify-center items-center p-5'>
          <ResultsList />
        </div>
      )}
    </div>
  );
}
