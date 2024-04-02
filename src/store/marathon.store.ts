import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State{
  time: any,
  startTime: any,
  isRunning: Boolean,
  players: {}[],
  finishers: {}[],
  identifier: string,
  
  addFinisher: (player: Object) => void;
  addPlayersList: (players: {}[]) => void;
  setIdentifier: (id: string) => void;
  setPlayers: (players: {}[]) => void;
  setTime: (time: Date|number) => void;
  setIsRunning: (bool:Boolean) => void;
  
}


export const useStore = create<State>()(
  persist(
    (set, get) => ({
      time: 0,
      startTime: Date.now(),
      isRunning: false,
      players: [],
      finishers: [],
      identifier: '',

      // Methods
      addFinisher: (player) => {
        const { finishers, startTime } = get();

        const newFinisher = {...player, time: Date.now() - startTime}

        set({ finishers: [...finishers, newFinisher]})
      },

      addPlayersList: (players) => {
        set({ players: [...players] })
      },

      setIdentifier: (id) => {
        set({identifier: id})
      },

      setPlayers: (playersParameter) => {

        set({players: playersParameter})
      },
      setTime: (newTime) => {
        const { startTime, time } = get()

        if(startTime == 0){
          set({startTime: Date.now()})
        }
        if(newTime == 0){
          set({startTime: 0})
        }
        
        set({time: newTime})
      },
      setIsRunning: (bool) => {
        const { isRunning } = get();

        set({isRunning: bool})
      }

    }),
    {
      name: 'marathon-app'
    }
  )
)
