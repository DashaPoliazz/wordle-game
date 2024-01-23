export enum MESSAGE_TYPE {
  WIN = "WIN",
  LOSE = "LOSE",
}
export type Maybe<T> = T | null;
export interface IConfigOption {
  title: string;
  description: string;
  isChecked: boolean;
}
