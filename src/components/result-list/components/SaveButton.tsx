import { saveExcelFile } from '@/actions';
import { useStore } from '@/store';
import { IoSaveOutline } from 'react-icons/io5';

export const SaveButton = () => {
  const { finishers } = useStore();

  return (
    <button
      className="w-fit bg-blue-700 hover:bg-blue-600 p-2 rounded-md min-w-[38px]  flex flex-row gap-1 justify-center items-center transition-all"
      onClick={() => saveExcelFile(finishers)}
    >
      GUARDAR
      <IoSaveOutline size={26} />
    </button>
  );
};
