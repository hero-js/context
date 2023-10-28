<<<<<<< HEAD
# @hero-js/context

A utility module for managing contextual data within your Node.js applications.

## Installation

You can install this module using npm:

```bash
npm install @hero-js/context
```

## Usage

Here's how you can use this module in your Node.js application:

```javascript
// Import the Context class
const Context = require('@hero-js/context');

// Create a new context instance
const myContext = Context.create('MyContext');

// Set a value in the context
myContext.set('userId', 123);

// Retrieve a value from the context
const userId = myContext.get('userId');

console.log(`User ID: ${userId}`);
```

## Features

- Create and manage named contexts.
- Set and retrieve data within a context.
- Handle default values for missing data.
- Optional support for strict mode in boolean retrieval.

## API

### `Context.create(name: string): Context`

Creates a new context instance with the given name.

### `Context.createVolatileContext(): Context`

Creates a volatile context with a randomly generated name.

### `context.set<T>(key: string, value: T): void`

Sets a value for a specific key in the context.

### `context.get<T>(key: string, options: IGetContextData<T>): T | false | undefined`

Retrieves a value associated with a specific key in the context. Supports default values and optional invalid value checks.

### `context.getOrThrow<T>(key: string, options: IInvalid): T | false`

Retrieves a value from the context and throws an error if not found or if the value is invalid.

### `context.getInt(key: string, options: IGetContextData<number>): number | undefined`

Retrieves an integer value from the context, with optional invalid value checks.

### `context.getIntOrThrow(key: string, options: IInvalid): number`

Retrieves an integer value from the context and throws an error if not found or if the value is invalid.

### `context.getBoolean(key: string, options: IGetContextData<boolean>): boolean | undefined`

Retrieves a boolean value from the context, with optional strict mode for boolean checks.

### `context.getBooleanOrThrow(key: string, options: IInvalid): boolean`

Retrieves a boolean value from the context and throws an error if not found or if the value is invalid.

## License

This module is licensed under the MIT License. See the [LICENSE](https://github.com/hero-js/context/blob/main/LICENSE) file for details.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the guidelines in [CONTRIBUTING](https://github.com/hero-js/hero/blob/main/CONTRIBUTING.md).

## Changelog

For a history of changes to this module, see the [CHANGELOG](https://github.com/hero-js/context/blob/main/CHANGELOG.md) file.

## Support

If you have any questions or encounter issues, please open a GitHub issue.
=======
# context
A utility module for managing contextual data within your Node.js applications.
>>>>>>> 4a15f6595bedeb9bf5e124dc0a4497f39fde5792
