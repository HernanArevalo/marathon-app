import { formatTime } from '@/helpers';
import { Finisher } from '@/interfaces';
import { useStore } from '@/store';
import { IoClose } from 'react-icons/io5';

interface Props {
  player: Finisher
}

export const TableRow = ({player}: Props) => {
  const { identifier, deleteFinisher } = useStore();

  return (
    <tr
      key={player[identifier as keyof typeof player]}
      className='border-b-2 border-gray-700 box-content'
    >
      <td className='flex flex-row gap-1 justify-center'>
        <span className='min-w-[20px]'>{formatTime(player.time).hours}</span>
        <span>:</span>
        <span className='min-w-[20px]'>{formatTime(player.time).minutes}</span>
        <span>:</span>
        <span className='min-w-[20px]'>{formatTime(player.time).seconds}</span>
        <span>.</span>
        <span className='min-w-[27.34px]'>
          {formatTime(player.time).millisecondsPart}
        </span>
      </td>
      <td className='bg-gray-800 capitalize'>{player[identifier]}</td>
      {'apellido' in player && (
        <th className='bg-gray-800 capitalize'>{player.apellido}</th>
      )}
      {'nombre' in player && (
        <th className='bg-gray-800 capitalize'>{player.nombre}</th>
      )}
      <th className='flex justify-center items-center'>
        <button
          className='bg-red-800 rounded-md h-[24px] p-1'
          onClick={() => {
            deleteFinisher(player);
          }}
        >
          <IoClose size={15} />
        </button>
      </th>
    </tr>
  );
};
