import Link from 'next/link';
import React from 'react';

export const ChargeExcelFileButton = () => {
  return (
    <Link href={'/load'}>
      <button
        className="bg-gray-500 text-white p-2 rounded-md cursor-pointer transition-all 
                hover:bg-gray-200 hover:text-black"
      >
        Cargar planilla de Excel
      </button>
    </Link>
  );
};
