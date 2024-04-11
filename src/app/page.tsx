'use client';
import { Counter, FinisherForm, ResultsList } from '@/components';
import { ChargeTableButton, DeleteTableButton } from '@/components/buttons';
import { useStore } from '@/store';
import clsx from 'clsx';

export default function HomePage() {
  const { players } = useStore();

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] md:flex-row w-full fade-in">
      <div
        className={clsx(
          players.length > 0 ? 'md:w-[50%]' : 'md:w-[70%]',
          'relative w-full min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'
        )}
      >
        <div className="absolute top-10 left-10 flex gap-3">
          <ChargeTableButton />
          <DeleteTableButton />
        </div>
        <Counter />
        <FinisherForm />
      </div>

      <ResultsList />
    </div>
  );
}
