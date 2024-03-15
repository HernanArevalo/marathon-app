'use client';

import { FinisherForm, PauseButton, StopButton, ResultsList } from '@/components';
import { Orbitron } from 'next/font/google';
import { useRef, useState } from 'react';

const orbitron = Orbitron({
  weight: ['400','500','600','700','800','900'],
  subsets: ['latin'],
});

export default function HomePage() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  const toggleTimer = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');
    return { hours, minutes, seconds, millisecondsPart };
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target !== null) {
      setInputValue(event.target.value);
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('Valor del input:', inputValue);
  };

  return (
    <div className='flex flex-row min-h-[100vh]'>
      <div className='w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>

        <div className='flex flex-col w-fit gap-3'>
          <h1 className='text-5xl font-bold w-full text-left'>MARATON</h1>
          <div className={`${orbitron.className} font-bold text-6xl text-center bg-white text-black w-fit p-3 flex flex-row`}>
            <span className='min-w-[101px]'>{formatTime(time).hours}</span>
            <span>:</span>
            <span className='min-w-[101px]'>{formatTime(time).minutes}</span>
            <span>:</span>
            <span className='min-w-[101px]'>{formatTime(time).seconds}</span>
            <span>.</span>
            <div className='w-[151px] relative'>
              {formatTime(time).millisecondsPart}
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-10 text-5xl'>
          <PauseButton toggleTimer={toggleTimer} isRunning={isRunning} />
          <StopButton resetTimer={resetTimer} />
        </div>

        <div>
          <FinisherForm />
        </div>
      </div>
      <div className='w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>
        <ResultsList />
      </div>
    </div>
  );
}
