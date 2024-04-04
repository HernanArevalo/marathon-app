
interface Player {
  time: number;
  [key: string]: any;
}
export const sortByIdentifier = (identifier:any) => {
  return (a:{}, b:{}) => a[identifier as keyof typeof player] - b[identifier as keyof typeof player];
}