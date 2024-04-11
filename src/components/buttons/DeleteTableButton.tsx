import { useStore } from '@/store';
import React from 'react';

export const DeleteTableButton = () => {
  const { players, setPlayers } = useStore();

  if (players.length > 0) {
  return (
    <button
      className="bg-gray-500 text-white p-2 cursor-pointer transition-all 
                  hover:bg-gray-200 hover:text-black"
      onClick={() => {
        setPlayers([]);
      }}
    >
      Eliminar tabla
    </button>
  );
  }
  return null
};
