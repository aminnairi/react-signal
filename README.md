# @aminnairi/react-signal

Signal Library for React

[![npm (scoped)](https://img.shields.io/npm/v/%40aminnairi/react-signal)](https://www.npmjs.com/package/@aminnairi/react-signal)
[![npm type definitions](https://img.shields.io/npm/types/%40aminnairi%2Freact-signal)](https://www.github.com/aminnairi/react-signal)
[![Coverage status](https://img.shields.io/coverallsCoverage/github/aminnairi/react-signal)](https://coveralls.io/github/aminnairi/react-signal?branch=development)


## Summary

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Uninstallation](#uninstallation)
- [API](#api)
  - [Signal](#signal)
  - [useSignal](#usesignal)
  - [useSignalConstructor](#usesignalconstructor)
  - [LocalStorageSignal](#localstoragesignal)
  - [SessionStorageSignal](#sessionstoragesignal)
  - [StorageSignal](#storagesignal)
- [Usage](#usage)
  - [Custom hook](#custom-hook)
  - [Computed value](#computed-value)
  - [HTTP requests](#http-requests)
  - [Object](#object)
- [Contributing](#contributing)
- [Issues](#issues)
- [Security](#security)
- [License](#license)
- [Changelog](#changelog)
- [Code of Conduct](#code-of-conduct)

[Back to summary](#summary)

## Introduction

Welcome to our Signal Library for React! This library provides a robust signal management system to enhance your React applications. With this library, you can easily manage and propagate changes in your application's state using signals. It is designed with simplicity and efficiency in mind, offering an alternative to the tedious creation of React Contexts for sharing state between components.

[Back to summary](#summary)

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

[Back to summary](#summary)

## Installation

```bash
npm install @aminnairi/react-signal
```

[Back to summary](#summary)

## Uninstallation

```bash
npm uninstall @aminnairi/react-signal
```

[Back to summary](#summary)

## API

### Signal

```typescript
type Subscriber = () => void;
type Update<Value> = (oldValue: Value) => Value;

class Signal<Value> {
    private subscribers;
    private value;
    constructor(initialValue: Value);
    emit(newValue: Value): void;
    getValue(): Value;
    subscribe(newSubscriber: Subscriber): () => void;
    next(update: Update<Value>): void;
}
```

The `Signal` class is the core component of the library. It represents a signal that can be used to manage state changes and notify components when the state is updated. You can create instances of the `Signal` class to represent different pieces of state in your application.

```typescript
import { Signal } from "@aminnairi/react-signal";

export const countSignal = new Signal(0);
```

```typescript
import { Signal } from "@aminnairi/react-signal";

export type User = {
  id: string,
  email: string,
  age: number
}

export const usersSignal = new Signal<Array<User>>([]);
```

[Back to summary](#summary)

### useSignal

```typescript
const useSignal: <Value>(signal: Signal<Value>) => Value;
```

The `useSignal` hook is used to integrate a `Signal` instance with a functional component. It returns the current value of the signal and a function to update the signal's value. This hook makes it easy to work with signals in your React components.

```tsx
import React, { Fragment, useCallback } from "react";
import { useSignal } from "@aminnairi/react-signal";
import { countSignal } from "../signals/count";

function Counter() {
  const count = useSignal(countSignal);

  const increment = useCallback(() => {
    countSignal.emit(count + 1);
  }, [count]);

  const decrement = useCallback(() => {
    countSignal.next(oldCount => oldCount - 1);
  }, []);

  return (
    <Fragment>
      <p>Count: {count}</p>
      <button onClick={increment}>
        Increment
      </button>
      <button onClick={decrement}>
        Decrement
      </button>
    </Fragment>
  );
}
```

[Back to summary](#summary)

### useSignalConstructor

```typescript
type SignalConstructor<Value> = () => Signal<Value>;

const useSignalConstructor: <Value>(signalConstructor: SignalConstructor<Value>) => Value;
```

The `useSignalConstructor` function is used to create and initialize a `Signal` instance within a functional component. It accepts a `SignalConstructor` as its parameter, which defines the initial value of the signal and an optional validation function. This hook is especially useful for managing state in your React components.

```tsx
import { Capacitor } from "@capacitor/core";
import { Signal, useSignalConstructor } from "@aminnairi/react-signal";

export const HomePage = () => {
  const title = useSignalConstructor(() => {
    const platform = Capacitor.getPlatform();

    if (pltaform === "ios") {
      return new Signal("Welcome, iOS user!");
    }

    if (pltaform === "android") {
      return new Signal("Welcome, Android user!");
    }

    return new Signal("Welcome, user!");
  });

  return title;
};
```

In this example, the `useSignalConstructor` hook is used to create and initialize a `Signal` instance with an initial value of `0`. The `countSignal` represents the state, and `setCount` is the function to update its value.

[Back to summary](#summary)

### LocalStorageSignal

```typescript
type Validation<Value> = (value: unknown) => value is Value;

type StorageSignalConstructor<Value> = {
    storage: Storage;
    key: string;
    value: Value;
    validation: Validation<Value>;
};

type LocalStorageSignalConstructor<Value> = Omit<StorageSignalConstructor<Value>, "storage">;

class LocalStorageSignal<Value> extends StorageSignal<Value> {
  constructor({ key, value, validation }: LocalStorageSignalConstructor<Value>);
}
```

The `LocalStorageSignal` is another feature of the `@aminnairi/react-signal` library that offers built-in local storage persistence for managing state variables. Local storage allows you to store data on the user's device even after they close the browser. With the `LocalStorageSignal`, you can define a key, an initial value, and an optional validation function to ensure the stored data is of the correct type.

```typescript
import { LocalStorageSignal } from "@aminnairi/react-signal";

export type Theme = "light" | "dark"

export const themeSignal = new LocalStorageSignal<Theme>({
  key: "theme", 
  value: "dark",
  validation: (value): value is Theme => {
    return value === "dark" || value === "light"
  }
});
```

```tsx
import { Fragment, useCallback } from "react";
import { useSignal } from "@aminnairi/react-signal";
import { themeSignal } from "../signals/theme";

export const ThemePage = () => {
  const theme = useSignal(themeSignal);

  const toggleTheme = useCallback(() => {
    themeSignal.emit(theme === "light" ? "dark" : "light");
  }, [theme]);

  const reset = useCallback(() => {
    themeSignal.reset();
  }, []);

  return (
    <Fragment>
      <button onClick={toggleTheme}>
        Toggle theme ({theme})
      </button>
      <button onClick={reset}>
        Clear storage
      </button>
    </Fragment>
  );
}
```

In this example, we create a `themeSignal` that is stored in local storage under the key "theme." This allows you to persist and manage the theme of your application across different user sessions, providing a seamless user experience.

[Back to summary](#summary)

### SessionStorageSignal

```typescript
type Validation<Value> = (value: unknown) => value is Value;

type StorageSignalConstructor<Value> = {
    storage: Storage;
    key: string;
    value: Value;
    validation: Validation<Value>;
};

type SessionStorageSignalConstructor<Value> = Omit<StorageSignalConstructor<Value>, "storage">;

class SessionStorageSignal<Value> extends StorageSignal<Value> {
  constructor({ key, value, validation }: StorageSignalConstructor<Value>);
}
```

The `SessionStorageSignal` is a feature of the `@aminnairi/react-signal` library that allows you to manage state variables with built-in session storage persistence. Session storage is similar to local storage, but the data is only available for the duration of a single page session. When you create a `SessionStorageSignal`, you can define a key, an initial value, and an optional validation function to ensure the stored data is of the correct type.

```typescript
import { SessionStorageSignal } from "@aminnairi/react-signal";

export type Theme = "light" | "dark"

export const themeSignal = new SessionStorageSignal<Theme>({
  key: "theme", 
  value: "dark",
  validation: (value): value is Theme => {
    return value === "dark" || value === "light"
  }
});
```

```tsx
import { Fragment, useCallback } from "react";
import { useSignal } from "@aminnairi/react-signal";
import { themeSignal } from "../signals/theme";

export const ThemePage = () => {
  const theme = useSignal(themeSignal);

  const toggleTheme = useCallback(() => {
    themeSignal.emit(theme === "light" ? "dark" : "light");
  }, [theme]);

  const reset = useCallback(() => {
    themeSignal.reset();
  }, []);

  return (
    <Fragment>
      <button onClick={toggleTheme}>
        Toggle theme ({theme})
      </button>
      <button onClick={reset}>
        Clear storage
      </button>
    </Fragment>
  );
}
```

In this example, we create a `themeSignal` that is stored in session storage under the key "theme." It allows you to persist and manage the theme of your application across different user sessions.

[Back to summary](#summary)

### StorageSignal

```typescript
type Validation<Value> = (value: unknown) => value is Value;

type StorageSignalConstructor<Value> = {
    storage: Storage;
    key: string;
    value: Value;
    validation: Validation<Value>;
};

class StorageSignal<Value> extends Signal<Value> {
    private key;
    private storage;
    constructor({ storage, key, value, validation }: StorageSignalConstructor<Value>);
    emit(newValue: Value): void;
    remove(): void;
}
```

The `StorageSignal` is a versatile feature of the `@aminnairi/react-signal` library that enables you to manage state variables with custom storage solutions. It's not limited to local storage or session storage; you can use it with any storage implementation that adheres to the Storage interface. With the `StorageSignal`, you can specify the storage, key, initial value, and an optional validation function to ensure the stored data is of the correct type.

```typescript
import { StorageSignal } from "@aminnairi/react-signal";

export type Theme = "light" | "dark"

export class MyStorage implements Storage {
  //...
}

const myStorage = new MyStorage();

export const themeSignal = new StorageSignal<Theme>({
  storage: myStorage,
  key: "theme", 
  value: "dark",
  validation: (value): value is Theme => {
    return value === "dark" || value === "light"
  }
});
```

```tsx
import { Fragment, useCallback } from "react";
import { useSignal } from "@aminnairi/react-signal";
import { themeSignal } from "../signals/theme";

export const ThemePage = () => {
  const theme = useSignal(themeSignal);

  const toggleTheme = useCallback(() => {
    themeSignal.emit(theme === "light" ? "dark" : "light");
  }, [theme]);

  const reset = useCallback(() => {
    themeSignal.reset();
  }, []);

  return (
    <Fragment>
      <button onClick={toggleTheme}>
        Toggle theme ({theme})
      </button>
      <button onClick={reset}>
        Clear storage
      </button>
    </Fragment>
  );
}
```

In this example, we create a `themeSignal` that uses a custom storage solution (in this case, `MyStorage`) to persist and manage the theme of your application. This approach allows you to use your own storage solution while still benefiting from the features of the `StorageSignal`.

[Back to summary](#summary)

## Usage

### Custom hook

If you're looking to efficiently manage state in your React applications, the `@aminnairi/react-signal` library provides a powerful tool. One of the key features it offers is the ability to create custom hooks for shared state management. In the provided example, we have a custom hook named `useCounter`.

With `useCounter`, you can effortlessly access and modify a shared state variable across multiple components. This state is encapsulated within a `Signal` object, which ensures reactivity and synchronization among components that utilize this hook. This approach simplifies state management, making it easier for you to maintain and share state variables without the need for prop drilling.

```tsx
import { useCallback } from "react";
import { Signal, useSignal } from "@aminnairi/react-signal";

export const counterSignal = new Signal(0);

export const useCounter = () => {
  const counter = useSignal(counterSignal);

  const increment = useCallback(() => {
    counterSignal.emit(counter + 1);
  }, [counter]);

  const decrement = useCallback(() => {
    counterSignal.emit(counter - 1);
  }, [counter]);

  return {
    counter,
    increment,
    decrement
  };
};
```

```tsx
import { Fragment } from "react";
import { useCounter } from "../hooks/counter";

export const AboutPage = () => {
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
};
```

```tsx
import { Fragment } from "react";
import { useCounter } from "../hooks/counter";

export const HomePage = () => {
  const { counter, increment, decrement } = useCounter();

  return (
    <Fragment>
      <h1>Home</h1>
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
};
```

[Back to summary](#summary)

### Computed value

The library allows you to create computed values, which are values that depend on other state variables and automatically update when their dependencies change. In the example, we demonstrate how to use the `useSignal` hook to create a computed value, `doubleCounter`.

By initializing a `Signal` object for the `counter` state and using the `useMemo` hook, you can compute `doubleCounter`, which is always double the value of `counter`. The great advantage here is that `doubleCounter` will automatically recalculate whenever `counter` changes, ensuring that it always reflects the correct value based on its dependencies.

To further enhance performance, you can define functions like `increment` and `decrement` using the `useCallback` hook, which optimizes these functions so that they are recreated only when necessary, based on their dependencies.

```tsx
import { Fragment, useCallback, useMemo } from "react";
import { Signal, useSignal } from "@aminnairi/react-signal";

const counterSignal = new Signal(0);

export const HomePage = () => {
  const counter = useSignal(counterSignal);
  const doubleCounter = useMemo(() => counter * 2, [counter]);

  const increment = useCallback(() => {
    counterSignal.emit(counter + 1);
  }, [counter]);

  const decrement = useCallback(() => {
    counterSignal.emit(counter - 1);
  }, [counter]);

  return (
    <Fragment>
      <button onClick={decrement}>
        Decrement
      </button>
      <span>{counter} (double is {doubleCounter})</span>
      <button onClick={increment}>
        Increment
      </button>
    </Fragment>
  );
}
```

[Back to summary](#summary)

### HTTP requests

In this section, we showcase a practical example of utilizing the React Signal library to manage HTTP requests and state in a React component. The code snippets illustrate the creation and use of signals for handling loading indicators, error messages, and user data.

The first three code snippets demonstrate the creation of signals for error handling, loading indicators, and user data, respectively. Each signal instance is initialized with an initial value and will be used to manage the corresponding state throughout the component's lifecycle.

The final code snippet presents a React component called `UserPage`, which utilizes these signals to orchestrate an HTTP request. It also showcases how signals are leveraged to manage loading and error states gracefully, ensuring a smooth user experience. The use of signals simplifies the handling of asynchronous operations and state transitions, resulting in cleaner and more maintainable code.


```typescript
import { Signal } from "@aminnairi/react-signal";

export const errorSignal = new Signal<Error | null>(null);
```

```typescript
import { Signal } from "@aminnairi/react-signal";

export const loadingSignal = new Signal(false);
```

```typescript
import { Signal } from "@aminnairi/react-signal";

export type User = {
  id: number,
  username: string
}

export const userSignal = new Signal<User | null>(null);
```

```tsx
import { useEffect } from "react";
import { useSignal } from "@aminnairi/react-signal";
import { userSignal } from "../signals/users";
import { loadingSignal } from "../signals/loading";
import { errorSignal } from "../signals/error";

export const UserPage = () => {
  const user = useSignal(userSignal);
  const loading = useSignal(loadingSignal);
  const error = useSignal(errorSignal);

  useEffect(() => {
    errorSignal.emit(null);
    loadingSignal.emit(true);

    fetch("https://jsonplaceholder.typicode.com/users/1").then(response => {
      return response.json();
    }).then(user => {
      userSignal.emit({
        id: user.id,
        username: user.username
      });
    }).catch(error => {
      errorSignal.emit(error);
    }).finally(() => {
      loadingSignal.emit(false);
    });
  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  if (error) {
    return error.message;
  }

  if (!user) {
    return (
      <p>No user found</p>
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
        </tr>
      </tbody>
    </table>
  );
};
```

### Object

In this example, we demonstrate how to use the library for managing registration-related state in a React component. The code showcases the creation of a `registerSignal` signal instance, which is used to manage email and password fields within a registration form. This library simplifies the process of handling user input and keeping the component's state synchronized with minimal effort.

```typescript
import { Signal } from "@aminnairi/react-signal";

export const registerSignal = new Signal({
  email: "",
  password: ""
});
```

```tsx
import { ChangeEventHandler, useCallback } from "react";
import { useSignal } from "@aminnairi/react-signal"
import { registerSignal } from "../signals/register";

export const RegisterPage = () => {
  const register = useSignal(registerSignal);

  const setEmail: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    registerSignal.next(oldRegister => {
      return {
        ...oldRegister,
        email: event.target.value
      }
    });
  }, []);

  const setPassword: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    registerSignal.next(oldRegister => {
      return {
        ...oldRegister,
        password: event.target.value
      }
    });
  }, []);

  return (
    <form>
      <input
        type="email"
        value={register.email}
        onChange={setEmail} />
      <input
        type="password"
        value={register.password}
        onChange={setPassword} />
    </form>
  );
}
```

## Contributing

The `CONTRIBUTING.md` file contains guidelines and instructions for individuals who want to contribute to this project. Whether you're interested in reporting bugs, suggesting improvements, or submitting code changes, the contributing guide provides valuable information on how to get involved. We welcome contributions from the community and appreciate your efforts to help make this project better.

[Back to summary](#summary)

## Issues

The `issues` section is where you can view and track the current issues, bug reports, and feature requests related to this project. It serves as a central place for users and contributors to discuss and report problems, share ideas, and provide feedback. If you encounter an issue or have a suggestion, please check the issues section to see if it's already been raised or to submit a new issue.

[Back to summary](#summary)

## Security

The `SECURITY.md` file outlines our security policy and provides guidance on how to report security vulnerabilities in this project. We take security seriously and encourage responsible disclosure of any security issues you may discover. Please review this section for details on how to report security concerns and how we handle them.

[Back to summary](#summary)

## License

The `LICENSE` file contains information about the licensing terms and conditions for using this project. It specifies how the project's code can be used, modified, and distributed. It's important to review and understand the project's license to ensure compliance with its terms.

[Back to summary](#summary)

## Changelog

The `CHANGELOG.md` file provides a detailed history of changes, updates, and new features in this project. It's a useful resource for understanding the evolution of the software and identifying what has been added or fixed in each release.

[Back to summary](#summary)

## Code of Conduct

The `CODE_OF_CONDUCT.md` outlines the expectations and behavior we uphold in this project's community. It sets guidelines for respectful and inclusive interactions among contributors, users, and maintainers. We encourage everyone to review and adhere to the code of conduct to foster a welcoming and productive environment.

[Back to summary](#summary)