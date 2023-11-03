import { useCallback, useSyncExternalStore } from "react";

export type Subscriber = () => void;

export type Validation<Value> = (value: unknown) => value is Value;

export type StorageSignalConstructor<Value> = {
  storage: Storage,
  key: string,
  value: Value,
  validation: Validation<Value>
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
}

export class StorageSignal<Value> extends Signal<Value> {
  private key: string;
  private storage: Storage;

  public constructor({ storage, key, value, validation }: StorageSignalConstructor<Value>) {
    try {
      const storageValue = JSON.parse(storage.getItem(key) || "");

      if (validation(storageValue)) {
        super(storageValue);
      } else {
        super(value);
      }
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
  public constructor({ key, value, validation }: LocalStorageSignalConstructor<Value>) {
    super({
      storage: localStorage,
      key,
      value,
      validation
    });
  }
}

export class SessionStorageSignal<Value> extends StorageSignal<Value> {
  public constructor({ key, value, validation }: StorageSignalConstructor<Value>) {
    super({
      storage: sessionStorage,
      key,
      value,
      validation
    });
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