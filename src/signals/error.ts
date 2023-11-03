import { Signal } from "../hooks";

export const errorSignal = new Signal<Error | null>(null);