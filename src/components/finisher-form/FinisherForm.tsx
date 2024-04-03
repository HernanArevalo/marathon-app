"use client"
import { useState } from 'react';
import clsx from 'clsx';
import { useStore } from '@/store';


export const FinisherForm = () => {
  const identifier:any = useStore(state => state.identifier);
  const players = useStore<Array<{}>>(state => state.players);
  const { addFinisher } = useStore()

  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState<Boolean>(false);
  const [playersFiltered, setPlayersFiltered] = useState< Array<{}> >([])




  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setPlayersFiltered(players.filter((player) => player[identifier].toString().includes(newValue)))

    setShowOptions(newValue.length > 0);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (playersFiltered.length < 1 )return;

    if (playersFiltered.length > 0) {
      addFinisher(playersFiltered[0])
      setInputValue('');
    }

  };

  const handleOptionClick = (player:{}) => {
    addFinisher(player)
    setInputValue('');
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
            {showOptions && (
              <div className="absolute text-black bg-white border border-gray-300 rounded mt-1 w-32 z-10">
                {playersFiltered
                  .map((player, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionClick(player)}
                    >
                      {player[identifier]}
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