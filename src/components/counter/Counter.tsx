'use client';
import { useEffect, useRef, useState } from 'react';
import { orbitron } from '@/lib';
import { PauseButton, StopButton } from '@/components';
import { useStore } from '@/store';

export const Counter = () => {
  const { time, startTime, setTime } = useStore();
  const { isRunning, setIsRunning } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    if (isRunning && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  
    setIsLoaded(true)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  function formatTime(milliseconds: number) {
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
  }

  return (
    <>
      <div className='flex flex-col w-full gap-3'>
        <h1 className='text-3xl md:text-5xl font-bold w-full text-left'>
          TIMER
        </h1>
        <div
          className={`${orbitron.className} md:font-bold md:text-6xl
                      font-bold text-4xl text-center bg-white text-black w-full p-3 flex flex-row justify-center`}
        >
          <span className='min-w-[70px] md:min-w-[101px]'>
            {formatTime(time).hours}
          </span>
          <span>:</span>
          <span className='min-w-[70px] md:min-w-[101px]'>
            {formatTime(time).minutes}
          </span>
          <span>:</span>
          <span className='min-w-[70px] md:min-w-[101px]'>
            {formatTime(time).seconds}
          </span>
          <span>.</span>
          <div className='min-w-[89px] md:w-[151px]'>
            {formatTime(time).millisecondsPart}
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-10 text-4xl md:text-5xl'>
        <PauseButton toggleTimer={toggleTimer}/>
        <StopButton resetTimer={resetTimer} />
      </div>
    </>
  );
};
