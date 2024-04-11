import { useStore } from '@/store';
import { IoCloseCircleOutline } from 'react-icons/io5';

export const DeleteButton = () => {
  const { resetTable } = useStore();

  return (
    <button
      className="w-fit bg-red-700 hover:bg-red-600 p-2 rounded-md flex flex-row gap-1 justify-center items-center transition-all"
      onClick={resetTable}
    >
      {' '}
      BORRAR
      <IoCloseCircleOutline size={30} />
    </button>
  );
};
