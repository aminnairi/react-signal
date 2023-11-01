import { Fragment } from "react";
import { useCounter } from "../hooks/counter";

export function HomePage() {
  const [counter, setCounter] = useCounter();

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