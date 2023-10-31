# @aminnairi/react-signal

Signal Library for React

## Introduction

Welcome to our Signal Library for React! This library provides a robust signal management system to enhance your React applications. With this library, you can easily manage and propagate changes in your application's state using signals. It is designed with simplicity and efficiency in mind, offering an alternative to the tedious creation of React Contexts for sharing state between components.

## Features

- **Simple and Lightweight:** Our signal management library is designed to be lightweight and straightforward. It won't add unnecessary complexity to your React application.
- **React Framework Agnostic:** Whether you're using React with Material UI, TailwindCSS, BootstrapCSS, or any other UI framework, our library can seamlessly integrate into your project. It doesn't impose any specific UI framework requirements.
- **Efficient State Propagation:** Easily manage state updates by emitting signals. With this library, you can efficiently notify components about changes in your application's state.
- **Dynamic Signaling:** Signal emission allows for dynamic updates across your React components. It's a powerful tool for creating interactive and responsive user interfaces.
- **TypeScript Support:** Our library is written in TypeScript, providing you with strong type safety and improved code quality and maintainability.
- **Customizable and Extensible**: The library is designed to be customizable and extensible. You can adapt it to your specific project needs and build on top of it as your application requirements evolve.
- **Performance Optimized**: We use efficient algorithms and techniques to ensure that signal management remains performant, even in applications with complex state structures.
- **No External Dependencies**: Our library doesn't rely on external dependencies, reducing the risk of version conflicts and ensuring a seamless integration into your React project.
- **Open Source**: This library is open source, allowing you to contribute to its development, report issues, and benefit from a collaborative community of users.
- **Clear and Concise API**: We provide a straightforward API with clear and concise functions, making it easy for developers of all skill levels to use and understand.
- **Community Support:** Join a community of developers who use this library for their signal management needs. Get help, share your insights, and learn from others in the community.
- **Documentation and Examples:** We provide extensive documentation and examples to help you get started quickly and make the most of the library's features.
- **Continuous Updates:** We're committed to maintaining and improving this library. Expect continuous updates and improvements to ensure compatibility with the latest React technologies and best practices.

With our Signal Library for React, you'll have a powerful tool at your disposal to manage state changes, create responsive, dynamic user interfaces, and simplify the process of sharing state between components without the need for complex React Context setups. Whether you're a beginner or an experienced developer, this library will streamline your React application development process. Join our community and start enhancing your React projects today!

## Installation

```bash
npm install @aminnairi/react-signal
```

## Uninstallation

```bash
npm uninstall @aminnairi/react-signal
```

## API

### Signal

```typescript
type Subscriber = () => void;

class Signal<Value> {
  private subscribers;
  private value;

  public constructor(initialValue: Value);

  public emit(newValue: Value): void;
  public getValue(): Value;
  public subscribe(newSubscriber: Subscriber): () => void;
}
```

The `Signal` class is the core component of the library. It represents a signal that can be used to manage state changes and notify components when the state is updated. You can create instances of the `Signal` class to represent different pieces of state in your application.

```typescript
export const countSignal = new Signal(0);

export type User = {
  id: string,
  email: string,
  age: number
}

export const usersSignal = new Signal<Array<User>>([]);
```

## useSignal

```typescript
const useSignal: <Value>(signal: Signal<Value>) => [Value, (value: Value) => void];
```

The `useSignal` hook is used to integrate a `Signal` instance with a functional component. It returns the current value of the signal and a function to update the signal's value. This hook makes it easy to work with signals in your React components.

```tsx
import React, { useCallback } from 'react';
import { Signal } from '@aminnairi/react-signal';
import { countSignal } from "../signals/count";

function Counter() {
  const [count, setCount] = useSignal(countSignal);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}
```

## License

See [`LICENSE`](./LICENSE).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).