import { Player } from '../interfaces/interfaces';


export const sortByIdentifier = (identifier:string) => {
  return (a:Player, b:Player) => a[identifier as keyof typeof a] - b[identifier as keyof typeof b];
}