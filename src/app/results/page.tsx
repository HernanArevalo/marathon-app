'use client';
// import { handleAddDataToExcel } from '@/actions/saveFile';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface pageParams {
  name: string;
  data: any[];
}

interface PlayerParams {
  id: number;
  apellido: string;
  nombre: string;
  categoria: 20;
  departamento: string;
  nacimiento: Date;
}

export default function ResultsPage() {
  const [data, setData] = useState<pageParams[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      for (const i in workbook.SheetNames) {
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        if (parsedData) {
          setData((prevData) => [
            ...prevData,
            { name: sheetName, data: parsedData },
          ]);
        }
      }
    };
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const DataBackup = [
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
  ];

  const handleOnExport = () => {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(DataBackup);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'MySheet1'),
      setTimeout(() => {
        XLSX.writeFile(workbook, 'libro1.xlsx');
      }, 1000);
  };

  // handleAddDataToExcel()

  return (
    <div className='p-2 flex flex-col mx-5 justify-center items-center gap-6'>
      <h1 className='text-center w-fit text-4xl '>RESULTADOS</h1>
      <input type='file' accept='.xlsx, .xls' onChange={handleFileUpload} />
      <button className='bg-red-200 text-red-950' onClick={handleOnExport}>
        Export
      </button>
      <div className='flex flex-col gap-2 justify-start items-start'>
        {data.length !== 0 &&
          data.map(({ name, data }) => (
            <div className='flex flex-col' key={name}>
              <h3>{name}</h3>
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
                          <tr key={index} className=''>
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
    </div>
  );
}
