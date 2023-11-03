import { Fragment } from "react";
import { useCounter } from "../hooks/counter";

export function AboutPage() {
  const { counter, increment, decrement } = useCounter();

  return (
    <Fragment>
      <h1>About</h1>
      <button onClick={decrement}>
        Decrement
      </button>
      <span>
        {counter}
      </span>
      <button onClick={increment}>
        Increment
      </button>
    </Fragment>
  );
}