import { Signal } from "../hooks";

export type User = {
  id: number,
  username: string
}

export const userSignal = new Signal<User | null>(null);