import { formatTime } from "@/helpers";
import { useStore } from "@/store";


const DataBackup = [
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
];

interface Player {
  [key: string]: any;
}

export const ResultsList = () => {
  const identifier:any = useStore(state => state.identifier)
  const finishers:Player[] = useStore(state => state.finishers)


  return (
    <div className="h-full w-full p-5 bg-zinc-900 rounded">
      <h3 className="uppercase text-center text-3xl font-bold">POSICIONES FINALES</h3>

      {finishers.length > 0 &&
            <div className='flex flex-col'>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full text-center text-sm font-light text-surface dark:text-white border-spacing-2'>
                      <thead className=' border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800 '>
                        <tr>
                            <th className=''>
                              TIEMPO
                            </th>
                            <th className='uppercase'>
                              {identifier}
                            </th>
                            { 'apellido' in finishers[0] &&
                              <th className=''>
                                APELLIDO
                              </th>
                            }
                            { 'nombre' in finishers[0] &&
                              <th className=''>
                                NOMBRE
                              </th>
                            }
                        </tr>
                      </thead>
                      <tbody className='gap-2'>
                        {finishers.map((player) => (
                          <tr key={player[identifier as keyof typeof player]} className='border-b-2 border-gray-700 pb-2'>
                              <td className='flex flex-row gap-1 justify-center'>
                                <span className=''>
                                  {formatTime(player.time).hours}
                                </span>
                                <span>:</span>
                                <span className=''>
                                  {formatTime(player.time).minutes}
                                </span>
                                <span>:</span>
                                <span className=''>
                                  {formatTime(player.time).seconds}
                                </span>
                                <span>.</span>
                                <span className=''>
                                  {formatTime(player.time).millisecondsPart}
                                </span>
                              </td>
                              <td className='bg-gray-800 capitalize'>
                                {player[identifier]}
                              </td>
                              { 'apellido' in player &&
                              <th className='bg-gray-800 capitalize'>
                                {player.apellido}
                              </th>
                            }
                            { 'nombre' in player &&
                              <th className='bg-gray-800 capitalize'>
                                {player.nombre}
                              </th>
                            }

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          }
      
    </div>
  )
}
