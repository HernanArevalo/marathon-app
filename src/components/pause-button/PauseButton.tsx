"use client"
import clsx from 'clsx'

interface Props {
  isRunning: boolean;
  toggleTimer: () => void;
}

export const PauseButton = ({toggleTimer, isRunning}: Props) => {
  return (
          <button
            onClick={toggleTimer}
            className={clsx(
              isRunning ? 'bg-yellow-300 hover:bg-yellow-400' : 'bg-green-300 hover:bg-green-400',
              'w-[145px] md:w-[185px] text-black uppercase font-bold p-5 transition-all'
            )}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>  )
}
