import { useSyncExternalStore } from "react";

export type Subscriber = () => void;

export type Parser<Value> = (value: unknown) => Value;

export type SignalConstructor<Value> = () => Signal<Value>

export type Update<Value> = (oldValue: Value) => Value;

export type StorageSignalConstructor<Value> = {
  storage: Storage,
  key: string,
  value: Value,
  parse: Parser<Value>
}

export type LocalStorageSignalConstructor<Value> = Omit<StorageSignalConstructor<Value>, "storage">

export type SessionStorageSignalConstructor<Value> = Omit<StorageSignalConstructor<Value>, "storage">

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

  public next(update: Update<Value>): void {
    this.emit(update(this.value));
  }
}

export class StorageSignal<Value> extends Signal<Value> {
  private key: string;
  private storage: Storage;

    try {
      const storageValue = JSON.parse(storage.getItem(key) || "");

      super(parse(storageValue));
    } catch {
      super(value);
    }

    this.key = key;
    this.storage = storage;
  }

  public override emit(newValue: Value): void {
    this.storage.setItem(this.key, JSON.stringify(newValue));
    super.emit(newValue);
  }

  public remove(): void {
    this.storage.removeItem(this.key);
  }
}

export class LocalStorageSignal<Value> extends StorageSignal<Value> {
  public constructor({ key, fallback, parse }: LocalStorageSignalConstructor<Value>) {
    super({
      storage: localStorage,
      key,
      value,
      parse
    });
  }
}

export class SessionStorageSignal<Value> extends StorageSignal<Value> {
    super({
      storage: sessionStorage,
      key,
      value,
      parse
    });
  }
}

export const useSignal = <Value>(signal: Signal<Value>): Value => {
  const state = useSyncExternalStore(signal.subscribe.bind(signal), signal.getValue.bind(signal));

  return state;
}

export const useSignalConstructor = <Value>(signalConstructor: SignalConstructor<Value>) => {
  return useSignal(signalConstructor());
}

export function isSetSignalConstructor<Value>(input: unknown): input is ((oldValue: Value) => Value) {
  return typeof input === "function";
}

export type SetStateFunction<Value> = (valueOrConstructor: Value | ((oldValue: Value) => Value)) => void

export type UseStateFunction<Value> = () => [Value, SetStateFunction<Value>];

export function createState<Value>(initialValue: Value): UseStateFunction<Value> {
  const signal = new Signal(initialValue);

  function useState(): [Value, SetStateFunction<Value>] {
    const signalValue = useSignal(signal);

    function setState(valueOrConstructor: Value | ((oldValue: Value) => Value)): void {
      if (isSetSignalConstructor<Value>(valueOrConstructor)) {
        signal.next(previousValue => {
          return valueOrConstructor(previousValue);
        });
        return;
      }

      signal.emit(valueOrConstructor);
    }

    return [signalValue, setState];
  }

  return useState;
}

export type SetLocalStorageStateFunction<Value> = (value: Value | ((oldValue: Value) => Value)) => void;

export type RemoveLocalStorageStateFunction = () => void;

export function isSetLocalStorageSignalConstructor<Value>(input: unknown): input is ((oldValue: Value) => Value) {
  return typeof input === "function";
}

export function createLocalStorageState<Value>(options: LocalStorageSignalConstructor<Value>) {
  const signal = new LocalStorageSignal(options);

  function useLocalStorageState(): [Value, SetLocalStorageStateFunction<Value>, RemoveLocalStorageStateFunction] {
    const signalValue = useSignal(signal);

    function setLocalStorageState(valueOrConstructor: Value | ((oldValue: Value) => Value)): void {
      if (isSetLocalStorageSignalConstructor<Value>(valueOrConstructor)) {
        signal.next(oldValue => {
          return valueOrConstructor(oldValue);
        })
        return;
      }

      signal.emit(valueOrConstructor);
    }

    function removeLocaleStorageState() {
      signal.remove();
    }

    return [signalValue, setLocalStorageState, removeLocaleStorageState];
  }

  return useLocalStorageState;
}

export type SetSessionStorageStateFunction<Value> = (value: Value | ((oldValue: Value) => Value)) => void;

export type RemoveSessionStorageStateFunction = () => void;

export function isSetSessionStorageSignalConstructor<Value>(input: unknown): input is ((oldValue: Value) => Value) {
  return typeof input === "function";
}

export function createSessionStorageState<Value>(options: SessionStorageSignalConstructor<Value>) {
  const signal = new SessionStorageSignal(options);

  function useSessionStorageState(): [Value, SetSessionStorageStateFunction<Value>, RemoveSessionStorageStateFunction] {
    const signalValue = useSignal(signal);

    function setSessionStorageState(valueOrConstructor: Value | ((oldValue: Value) => Value)): void {
      if (isSetSessionStorageSignalConstructor<Value>(valueOrConstructor)) {
        signal.next(oldValue => {
          return valueOrConstructor(oldValue);
        })
        return;
      }

      signal.emit(valueOrConstructor);
    }

    function removeSessionStorageState() {
      signal.remove();
    }

    return [signalValue, setSessionStorageState, removeSessionStorageState];
  }

  return useSessionStorageState;
}