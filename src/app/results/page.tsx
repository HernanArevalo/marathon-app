"use client"
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'

interface pageParams {
    name: string,
    data: any[]
}



interface PlayerParams {
  id: number,
  apellido: string,
  nombre: string,
  categoria: 20,
  departamento: string,
  nacimiento: Date

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
      const workbook = XLSX.read(data, { type: "binary" });

      for (const i in workbook.SheetNames) {
        const sheetName = workbook.SheetNames[i];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        
        if ( parsedData ) {
          setData((prevData) => ([
            ...prevData, 
            { name: sheetName,
              data: parsedData
            }
          ]))
        }
      }
    };
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  const DataBackup = [
    {
        "name": "Jugadores",
        "data": [
            {
                "Clave": 1079,
                "Apellido": "Juan",
                "Nombre": "Cortes",
                "Categoría": 20,
                "Departamento": "Córdoba",
                "Nacimiento": 38270
            },
            {
                "Clave": 1080,
                "Apellido": "Hector",
                "Nombre": "Escamilla",
                "Categoría": 23,
                "Departamento": "Córdoba",
                "Nacimiento": 36917
            },
            {
                "Clave": 1081,
                "Apellido": "Maria Ines",
                "Nombre": "Blades",
                "Categoría": 17,
                "Departamento": "Córdoba",
                "Nacimiento": 38272
            },
            {
                "Clave": 1082,
                "Apellido": "Leticia",
                "Nombre": "Granados",
                "Categoría": 20,
                "Departamento": "Córdoba",
                "Nacimiento": 38273
            },
            {
                "Clave": 1083,
                "Apellido": "Franco",
                "Nombre": "Mellera",
                "Categoría": 20,
                "Departamento": "Córdoba",
                "Nacimiento": 38274
            },
            {
                "Clave": 1084,
                "Apellido": "Domínico",
                "Nombre": "Tavella",
                "Categoría": 17,
                "Departamento": "Córdoba",
                "Nacimiento": 38275
            }
        ]
    },
    {
        "name": "Resultados",
        "data": [
            {
                "Tiempo": 0.03144675925925926,
                "Clave": 1079,
                "Nombre": "Juan",
                "Apellido": "Cortes"
            },
            {
                "Tiempo": 0.0734375,
                "Clave": 1082,
                "Nombre": "Leticia",
                "Apellido": "Granados"
            },
            {
                "Tiempo": 0.11618055555555555,
                "Clave": 1081,
                "Nombre": "Maria Ines",
                "Apellido": "Blades"
            },
            {
                "Tiempo": 0.1582175925925926,
                "Clave": 1084,
                "Nombre": "Domínico",
                "Apellido": "Tavella"
            },
            {
                "Tiempo": 0.2002662037037037,
                "Clave": 1083,
                "Nombre": "Franco",
                "Apellido": "Mellera"
            },
            {
                "Tiempo": 0.2452199074074074,
                "Clave": 1080,
                "Nombre": "Hector",
                "Apellido": "Escamilla"
            }
        ]
    }
  ]


  return (
    <div className="p-2 flex flex-col mx-5 justify-center items-center gap-6">
      <h1 className="text-center w-fit text-4xl ">RESULTADOS</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
        <div className="flex flex-col gap-2 justify-start items-start">
        { data.length !== 0 &&
          data.map(({ name, data }) => (
            <div className="flex flex-col" key={name}>
            <h3>{name}</h3>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table
                    className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                    <thead
                      className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                      <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                      </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))
        }
        </div>

    </div>




  );
}