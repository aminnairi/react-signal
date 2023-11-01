import { Signal, useSignal } from ".";

export const counterSignal = new Signal(0);

export const useCounter = () => {
  return useSignal(counterSignal);
};