import { useStore } from '@/store';
import { DeleteButton, SaveButton, TableRow } from './components';

export const ResultsList = () => {
  const { identifier, finishers } = useStore();

  return (
    <div className='h-full w-full p-5 bg-[color:var(--dark)] rounded relative flex flex-col gap-3'>
      <h3 className='uppercase text-center text-3xl font-bold'>
        POSICIONES FINALES
      </h3>

      {finishers.length > 0 && (
        <>
          <div className='flex flex-col items-end text-[color:var(--white)]'>
            <div className='overflow-x-auto w-full'>
              <div className='inline-block min-w-full'>
                <div className='overflow-hidden'>
                  <table className='min-w-full text-center text-md font-light text-surface'>
                    <thead className=' border-b bg-[color:var(--white)] font-medium text-[color:var(--black)]'>
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
            <SaveButton />
            <DeleteButton />
          </div>
        </>
      )}
    </div>
  );
};
