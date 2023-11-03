import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { LocalStorageSignal, SessionStorageSignal, Signal, StorageSignal, useSignal, useSignalConstructor } from ".";
import { useEffect } from "react";

test("Creating a signal in a component", () => {
  const Component = () => {
    const counter = useSignal(new Signal(10));

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")
});

test("Should work when emiting a value", () => {
  const counterSignal = new Signal(0);

  const Component = () => {
    const counter = useSignal(counterSignal);

    useEffect(() => {
      counterSignal.emit(10);
    }, []);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")
});

test("Should work when emiting a next value", () => {
  const counterSignal = new Signal(5);

  const Component = () => {
    const counter = useSignal(counterSignal);

    useEffect(() => {
      counterSignal.next(value => value + 5);
    }, []);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")
});

test("Should work when using a storage", () => {
  const counterSignal = new StorageSignal({
    storage: localStorage,
    key: "counter",
    value: 10,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")

  localStorage.removeItem("counter");
});

test("Should fallback to the original value of the storage if the stored value is invalid", () => {
  localStorage.setItem("counter", "bonjour le france");

  const counterSignal = new StorageSignal({
    storage: localStorage,
    key: "counter",
    value: 100,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("100")

  localStorage.removeItem("counter");
});

test("Should fallback to the original value of the storage if the stored value is wrong", () => {
  localStorage.setItem("counter", "null");

  const counterSignal = new StorageSignal({
    storage: localStorage,
    key: "counter",
    value: 100,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("100")

  localStorage.removeItem("counter");
});

test("Should work when the value of the storage is good", () => {
  localStorage.setItem("counter", "10");

  const counterSignal = new StorageSignal({
    storage: localStorage,
    key: "counter",
    value: 100,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")

  localStorage.removeItem("counter");
});

test("Should work when emiting from a storage", () => {
  const counterSignal = new StorageSignal({
    storage: localStorage,
    key: "counter",
    value: 10,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    useEffect(() => {
      counterSignal.emit(20);
    }, []);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("20")

  localStorage.removeItem("counter");
});

test("Should work when removing the value from a storage", () => {
  const counterSignal = new StorageSignal({
    storage: localStorage,
    key: "counter",
    value: 10,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    useEffect(() => {
      counterSignal.remove();
    }, []);

    return (
      <p>{counter}</p>
    );
  }

  render(<Component />);

  expect(localStorage.getItem("counter")).toEqual(null)
});

test("Should work with local storage signal", () => {
  const counterSignal = new LocalStorageSignal({
    key: "counter",
    value: 10,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")
});

test("Should work with session storage signal", () => {
  const counterSignal = new SessionStorageSignal({
    key: "counter",
    value: 10,
    validation: (value: unknown): value is number => typeof value === "number"
  });

  const Component = () => {
    const counter = useSignal(counterSignal);

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("10")
});

test("Should work with a signal constructor", () => {
  const counterSignal = new Signal(0);

  const Component = () => {
    const counter = useSignalConstructor(() => {
      return counterSignal;
    });

    return (
      <p>{counter}</p>
    );
  }

  const rendered = render(<Component />);

  expect(rendered.container.innerText).toEqual("0")
});