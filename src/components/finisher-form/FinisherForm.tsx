"use client"
import { useState } from 'react';
import clsx from 'clsx';
import { useStore } from '@/store';

export const FinisherForm = () => {
  const [inputValue, setInputValue] = useState('');

  const { identifier } = useStore(state => state)


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ inputValue: inputValue });

    setInputValue('');
  };

  return (
    <form className='w-full max-w-sm' onSubmit={handleSubmit}>

      <div className='md:flex md:items-center mb-6 gap-4'>
        <div className='md:w-1/3'>
          <label className='block text-white font-bold text-3xl md:text-right mb-1 md:mb-0 pr-4'>
            {identifier.toUpperCase()}
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            className='text-xl bg-gray-200 appearance-none border-2 border-gray-200 rounded w-36 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='inline-full-name'
            type='text'
            placeholder='ABC'
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='md:flex md:items-center'>
        <div className='md:w-1/3'></div>
        <div className='md:w-2/3'>
          <button
            className={clsx( inputValue != '' && 'bg-green-700',
              'shadow bg-gray-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded transition-all ')}
            type='submit'
          >
            CARGAR
          </button>
        </div>
      </div>
    </form>
  );
};
