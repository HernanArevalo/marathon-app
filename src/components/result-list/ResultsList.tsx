import { saveExcelFile } from '@/actions';
import { useStore } from '@/store';
import { IoCloseCircleOutline, IoSaveOutline } from 'react-icons/io5';
import { TableRow } from './components';

export const ResultsList = () => {
  const { resetTable, identifier, finishers } = useStore();

  return (
    <div className='h-full w-full p-5 bg-zinc-900 rounded relative'>
      <h3 className='uppercase text-center text-3xl font-bold'>
        POSICIONES FINALES
      </h3>

      {finishers.length > 0 && (
        <>
          <div className='flex flex-col items-end'>
            <div className='overflow-x-auto w-full'>
              <div className='inline-block min-w-full py-2'>
                <div className='overflow-hidden'>
                  <table className='min-w-full text-center text-md font-light text-surface dark:text-white border-spacing-2'>
                    <thead className=' border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800 '>
                      <tr>
                        <th className=''>TIEMPO</th>
                        <th className='uppercase'>{identifier}</th>
                        {Object.keys(finishers[0]).some(
                          (key) => key.toLowerCase() === 'apellido'
                        ) && <th className=''>APELLIDO</th>}
                        {Object.keys(finishers[0]).some(
                          (key) => key.toLowerCase() === 'nombre'
                        ) && <th className=''>NOMBRE</th>}
                      </tr>
                    </thead>
                    <tbody className='gap-2'>
                      {finishers.map((player) => (
                        <TableRow key={player.id} player={player} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <button
              className='w-fit bg-blue-700 p-1 rounded-md min-w-[38px]  flex flex-row gap-1 justify-center items-center'
              onClick={() => saveExcelFile(finishers)}
            >
              GUARDAR
              <IoSaveOutline size={26} />
            </button>
            <button
              className='w-fit bg-red-700 p-1 rounded-md flex flex-row gap-1 justify-center items-center'
              onClick={resetTable}
            >
              {' '}
              BORRAR
              <IoCloseCircleOutline size={30} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
