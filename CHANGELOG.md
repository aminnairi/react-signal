# Changelog

## Versions

- [`2.0.0`](#200)
- [`1.2.1`](#121)
- [`1.2.0`](#120)
- [`1.1.1`](#111)
- [`1.1.0`](#110)
- [`1.0.0`](#100)
- [`0.2.0`](#020)
- [`0.1.0`](#010)

## 2.0.0

- `value` property is now `fallback` for the `StorageSignal`, `LocalStorageSignal` and `SessionStorageSignal` classes their corresponding functions
- `validation` property is now `parse` in the `StorageSignal`, `LocalStorageSignal` and `SessionStorageSignal` classes their corresponding functions and is now used to parse the state instead of just validating it
- New function `createState`, `createSessionStorageState` and `createLocalStorageState` added to ease the creation of signals and their corresponding state

## 1.2.1

- Fixed bad published files

## 1.2.0

- Added hooks for better developer experience ([#27](https://github.com/aminnairi/react-signal/pull/27))

## 1.1.1

- Fix for the must call super before this error ([#25](https://github.com/aminnairi/react-signal/pull/25))

## 1.1.0

- Added an example for working with http request ([#18](https://github.com/aminnairi/react-signal/pull/18))
- Adedd a more complex example ([#19](https://github.com/aminnairi/react-signal/pull/19))
- Added a badge for the type definition ([#20](https://github.com/aminnairi/react-signal/pull/20))
- Added a badge for displaying the NPM version ([#21](https://github.com/aminnairi/react-signal/pull/21))
- Added the missing part of the type definition of the signal construction in the documentation ([#22](https://github.com/aminnairi/react-signal/pull/22))
- Added unit tests ([#23](https://github.com/aminnairi/react-signal/pull/23))

## 1.0.0

- Returning a getter only for the useSignal hook ([#9](https://github.com/aminnairi/react-signal/pull/9))
- Added a method for setting the value based on the previous value ([#10](https://github.com/aminnairi/react-signal/pull/10))

## 0.2.0

- Added storage signals ([#6](https://github.com/aminnairi/react-signal/pull/6))
- Added a constructor function ([#7](https://github.com/aminnairi/react-signal/pull/7))

## 0.1.0

- Initial release