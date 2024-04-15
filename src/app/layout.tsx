import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';

const inter = Kanit({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Marathon | Race',
  description: 'Aplicación para controlar y registrar los tiempos de los participantes en una carrera. Ingresando los datos de éstos desde un archivo excel, puedes ir ingresando su tiempo a medida que atraviesan la meta. Luego puedes guardar la tabla de tiempos en un nuevo archivo excel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const project_Version = process.env.npm_package_version

  return (
    <html lang='en'>
      <body className={`${inter.className} flex justify-center items-center`}>
        <span className="absolute text-gray-700 bottom-1 right-1">v. {project_Version}</span>
        {children}
      </body>
    </html>
  );
}
