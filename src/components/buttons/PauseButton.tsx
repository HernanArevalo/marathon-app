"use client"
import { useStore } from '@/store';
import clsx from 'clsx'

interface Props {
  toggleTimer: () => void;
}

export const PauseButton = ({toggleTimer}: Props) => {
  const { isRunning } = useStore();

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
