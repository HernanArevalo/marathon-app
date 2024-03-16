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
              isRunning ? 'bg-yellow-300' : 'bg-green-300',
              'w-[185px] text-black uppercase font-bold p-5'
            )}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>  )
}
