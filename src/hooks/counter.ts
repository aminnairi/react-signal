import { useCallback } from "react";
import { Signal, useSignal } from ".";

export const counterSignal = new Signal(0);

export const useCounter = () => {
  const counter = useSignal(counterSignal);

  const increment = useCallback(() => {
    counterSignal.next(oldCounter => oldCounter + 1);
  }, []);

  const decrement = useCallback(() => {
    counterSignal.next(oldCounter => oldCounter - 1);
  }, []);

  return {
    increment,
    decrement,
    counter
  };
};