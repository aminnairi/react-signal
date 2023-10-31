import { Fragment } from "react";
import { useSignal } from "../hooks";
import { counterSignal } from "../signals/counter";

export function HomePage() {
  const [counter, setCounter] = useSignal(counterSignal);

  return (
    <Fragment>
      <h1>Home</h1>
      <button onClick={() => setCounter(counter - 1)}>
        Decrement
      </button>
      <span>
        {counter}
      </span>
      <button onClick={() => setCounter(counter + 1)}>
        Increment
      </button>
    </Fragment>
  );
}