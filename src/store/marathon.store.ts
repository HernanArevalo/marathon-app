import { sortByTime, sortByIdentifier } from '@/helpers';
import { Finisher, Player } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  time: any;
  startTime: any;
  isRunning: Boolean;
  players: Player[];
  notFinishers: Player[];
  finishers: Finisher[];
  identifier: string;

  addFinisher: (player: Player) => void;
  setIdentifier: (id: string) => void;
  setPlayers: (players: Player[]) => void;
  setTime: (time: Date | number) => void;
  setIsRunning: (bool: Boolean) => void;
  resetTable: () => void;
  deleteFinisher: (player: Finisher) => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      time: 0,
      startTime: Date.now(),
      isRunning: false,
      players: [],
      notFinishers: [],
      finishers: [],
      identifier: '',

      // Methods
      addFinisher: (player) => {
        const { notFinishers, finishers, time, identifier } = get();

        const newFinisher = { ...player, time: time };

        set({ finishers: [...finishers, newFinisher].sort(sortByTime) });
        set({
          notFinishers: notFinishers.filter(
            (pj) =>
              pj[identifier as keyof typeof player] !==
              player[identifier as keyof typeof player]
          ),
        });
      },

      setIdentifier: (id) => {
        set({ identifier: id });
      },

      setPlayers: (playersParameter) => {
        set({ players: playersParameter });
        set({ notFinishers: playersParameter });
        set({ finishers: [] });
      },
      setTime: (newTime) => {
        const { startTime } = get();

        if (startTime == 0) {
          set({ startTime: Date.now() });
        }
        if (newTime == 0) {
          set({ startTime: 0 });
        }

        set({ time: newTime });
      },
      setIsRunning: (bool) => {
        set({ isRunning: bool });
      },
      resetTable: () => {
        const { players } = get();
        set({ notFinishers: [...players] });
        set({ finishers: [] });
      },
      deleteFinisher: (player) => {
        const { notFinishers, finishers, identifier, players } = get();

        set({
          finishers: finishers.filter(
            (pj) =>
              pj[identifier as keyof typeof player] !==
              player[identifier as keyof typeof player]
          ),
        });
        if ( players.some((pj) => pj[identifier] === player[identifier]) ) {
          set({
            notFinishers: [...notFinishers, player].sort(
              sortByIdentifier(identifier)
            ),
          });
        }
      },
    }),
    {
      name: 'marathon-app',
    }
  )
);
