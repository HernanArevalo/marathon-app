import { Finisher } from "@/interfaces";

export const sortByTime = (a:Finisher,b:Finisher) => {
  return a.time - b.time;
}