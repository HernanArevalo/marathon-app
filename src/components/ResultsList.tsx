

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


export const ResultsList = () => {


  return (
    <div className="h-full w-full p-5 bg-zinc-900 rounded">
      <h3 className="uppercase text-center text-3xl font-bold">POSICIONES FINALES</h3>

      {DataBackup.length !== 0 &&
          DataBackup.map(({ name, data }) => (
            <div className='flex flex-col' key={name}>
              <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                  <div className='overflow-hidden'>
                    <table className='min-w-full text-center text-sm font-light text-surface dark:text-white border-spacing-2'>
                      <thead className=' border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800 '>
                        <tr>
                          {Object.keys(data[0]).map((key) => (
                            <th className='' key={key}>
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className='gap-2'>
                        {data.map((item, index) => (
                          <tr key={index} className='border-b-2 border-gray-700 pb-2'>
                            {Object.values(item).map((value: any, index) => (
                              <td key={index} className='bg-gray-800'>
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
      
    </div>
  )
}
