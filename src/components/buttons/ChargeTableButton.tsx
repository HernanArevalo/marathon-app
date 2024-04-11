"use client"
import { useStore } from '@/store';
import Link from 'next/link';

export const ChargeTableButton = () => {
  const { players } = useStore();

  if (players.length > 0) {
    return (
    <Link href={'/load'}>
      <button
        className=" bg-gray-500 text-white p-2 cursor-pointer transition-all 
                hover:bg-gray-200 hover:text-black"
      >
        Cargar otra tabla
      </button>
    </Link>
  );
  }
  return null
};
