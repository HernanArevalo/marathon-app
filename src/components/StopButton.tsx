import clsx from 'clsx';
import React from 'react'


interface Props {
  resetTimer: () => void;
}

export const StopButton = ({resetTimer}: Props) => {
  return (
    <button
    onClick={resetTimer}
    className='w-fit text-black uppercase font-bold p-5 bg-red-300 '
  >
    RESET
  </button>  )
}
