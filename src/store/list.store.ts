import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State{
  players: {}[],
  finishers: {}[],
  identifier: string,

  addFinisher: (player: Object) => void;
  addPlayersList: (players: {}[]) => void;
  setIdentifier: (id: string) => void;
  setPlayers: (players: {}[]) => void;

}


export const useStore = create<State>()(
  persist(
    (set, get) => ({
      players: [],
      finishers: [],
      identifier: '',

      // Methods
      addFinisher: (player) => {
        const { finishers } = get();

        set({ finishers: [...finishers, player]})
      },

      addPlayersList: (players) => {
        set({ players: [...players] })
      },

      setIdentifier: (id) => {
        const { identifier } = get()

        set({identifier: id})
      },

      setPlayers: (playersParameter) => {
        const { players } = get()

        set({players: playersParameter})
      },

    }),
    {
      name: 'marathon-app'
    }
  )
)
