import { Counter, FinisherForm, ResultsList, FileCharge } from '@/components';
import {  } from '@/components/file-charge/FileCharge';

export const metadata = {
  title: 'Marathon | Race',
  description: 'Marathon | Race',
};

export default function HomePage() {
  

  return (
    <div className='flex flex-row min-h-[100vh]'>
      <div className='relative w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>
        <FileCharge />
        <Counter />
        <FinisherForm />
      </div>
      <div className='w-[50%] min-h-[100vh] flex flex-col justify-center items-center p-5 gap-10'>
        <ResultsList />
      </div>
    </div>
  );
}
