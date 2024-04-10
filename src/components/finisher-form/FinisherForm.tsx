"use client"
import { useState } from 'react';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Player } from '@/interfaces';

export const FinisherForm = () => {
  const { identifier, notFinishers, players } = useStore();
  const { addFinisher } = useStore();

  const [inputValue, setInputValue] = useState('');
  const [playersFiltered, setPlayersFiltered] = useState<Player[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setPlayersFiltered(
      notFinishers.filter((player: Player) =>
        player[identifier].toString().includes(newValue)
      )
    );
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (playersFiltered.length < 1 )return;

    if (playersFiltered.length > 0) {
      addFinisher(playersFiltered[0])
      setInputValue('');
      setPlayersFiltered([])
    }

  };

  const handleOptionClick = (player:{}) => {
    addFinisher(player)
    setInputValue('');
    setPlayersFiltered([])
  }


  return (
    <form className='w-full max-w-sm' onSubmit={handleSubmit}>
      <div className='md:flex md:items-center mb-6 gap-4'>
        <div className='md:w-1/3'>
          <label className='block text-white font-bold text-3xl md:text-right mb-1 md:mb-0 pr-4'>
            {identifier.toUpperCase()}
          </label>
        </div>
        <div className='md:w-2/3'>
          <div className="relative">
            <input
              className='text-xl bg-gray-200 appearance-none border-2 border-gray-200 rounded w-36 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
              id='inline-full-name'
              type='text'
              placeholder='123'
              value={inputValue}
              onChange={handleInputChange}
            />
            {playersFiltered.length > 0 && (
              <div className="absolute text-black bg-white border border-gray-300 rounded mt-1 w-32 z-10">
                {playersFiltered
                  .map((player, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick(player)}
                    >
                      {player[identifier as keyof typeof player]}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className={clsx(inputValue !== '' && 'bg-green-700', 'shadow bg-gray-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded transition-all')}
            type='submit'
          >
            CARGAR
          </button>
        </div>
      </div>
    </form>
  );
}