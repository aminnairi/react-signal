import { useCallback, useSyncExternalStore } from "react";

export type Subscriber = () => void;

export class Signal<Value> {
  private subscribers: Array<Subscriber>;
  private value: Value;

  public constructor(initialValue: Value) {
    this.value = initialValue;
    this.subscribers = [];
  }

  public emit(newValue: Value): void {
    this.value = newValue;

    this.subscribers.forEach(listener => {
      listener();
    });
  }

  public getValue(): Value {
    return this.value;
  }

  public subscribe(newSubscriber: Subscriber) {
    this.subscribers.push(newSubscriber);

    return () => {
      const foundSubscriberIndex = this.subscribers.findIndex(subscriber => subscriber === newSubscriber);
      this.subscribers.splice(foundSubscriberIndex, 1);
    }
  }
}

export const useSignal = <Value>(signal: Signal<Value>): [Value, (value: Value) => void] => {
  const state = useSyncExternalStore(signal.subscribe.bind(signal), signal.getValue.bind(signal));

  const setState = useCallback((value: Value) => {
    signal.emit(value);
  }, [signal]);

  return [
    state,
    setState
  ];
}