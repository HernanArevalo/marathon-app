import { formatTime } from '@/helpers';
import { Finisher } from '@/interfaces';
import { useStore } from '@/store';
import { IoClose } from 'react-icons/io5';

interface Props {
  player: Finisher,
  idx: number
}

export const TableRow = ({player, idx}: Props) => {
  const { identifier, deleteFinisher } = useStore();

  return (
    <tr
      key={player[identifier as keyof typeof player]}
      className='box-content text-[color:var(--white)] border-y-4 border-y-[color:var(--dark)]'
    >
      <td className='bg-[color:var(--light)] capitalize font-normal'>{idx+1}</td>
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
      <td className='bg-[color:var(--light)] capitalize border-r-2 border-[color:var(--dark)] font-bold'>{player[identifier]}</td>
      {'apellido' in player && (
        <td className='bg-[color:var(--light)] capitalize font-normal'>{player.apellido}</td>
      )}
      {'nombre' in player && (
        <td className='bg-[color:var(--light)] capitalize font-normal'>{player.nombre}</td>
      )}
      <td className='flex justify-center items-center'>
        <button
          className='bg-red-800 rounded-md h-[24px] p-1'
          onClick={() => {
            deleteFinisher(player);
          }}
        >
          <IoClose size={15} />
        </button>
      </td>
    </tr>
  );
};
