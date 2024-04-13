import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';

const inter = Kanit({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Marathon | Race',
  description: 'Marathon | Race',
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
