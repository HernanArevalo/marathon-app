import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State{
  time: any,
  startTime: any,
  isRunning: Boolean,
  players: {}[],
  notFinishers: {}[],
  finishers: {}[],
  identifier: string,
  
  addFinisher: (player: Object) => void;
  setIdentifier: (id: string) => void;
  setPlayers: (players: {}[]) => void;
  setTime: (time: Date|number) => void;
  setIsRunning: (bool:Boolean) => void;
  resetTable: () => void;
  
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
        const { notFinishers, finishers, time, startTime, identifier } = get();

        const newFinisher = {...player, time: time }

        set({ finishers: [...finishers, newFinisher]})
        set({ notFinishers: notFinishers.filter(pj => pj[identifier as keyof typeof player] !== player[identifier as keyof typeof player])})
      },

      setIdentifier: (id) => {
        set({identifier: id})
      },

      setPlayers: (playersParameter) => {
        set({players: playersParameter})
        set({notFinishers: playersParameter})
        set({finishers: []})
        
      },
      setTime: (newTime) => {
        const { startTime } = get()

        if(startTime == 0){
          set({startTime: Date.now()})
        }
        if(newTime == 0){
          set({startTime: 0})
        }
        
        set({time: newTime})
      },
      setIsRunning: (bool) => {

        set({isRunning: bool})
      },
      resetTable: () => {
        const { players } = get();
        set({notFinishers: [...players]})
        set({finishers: []})
      }

    }),
    {
      name: 'marathon-app'
    }
  )
)
