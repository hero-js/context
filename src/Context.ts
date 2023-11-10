import { DataRecord, IGetContextData, IInvalid } from './types';

/**
 * A class for managing a context of data within an application.
 * @class
 */
export default class Context {
  private data: DataRecord = {};

  private static store = new WeakMap();

  /**
   * Create a new context instance with the given name.
   * @param {string} name - The name to identify the context.
   * @returns {Context} - A new Context instance.
   */
  public static create(name: string): Context {
    const context = new Context(name);

    Context.store.set(context, {});

    return context;
  }

  /**
   * Create a volatile context with a randomly generated name.
   * @returns {Context} - A new volatile Context instance.
   */
  public static createVolatileContext(): Context {
    const name = Math.random().toString(36).substring(3);

    return Context.create(name);
  }

  /**
   * Construct a Context instance with a given name.
   * @param {string} name - The name of the context.
   */
  constructor(private name: string) {}

  private get getContext() {
    return Context.store.get(this) as DataRecord;
  }

  private throwError(key: string) {
    throw new Error(
      `Data with key "${key}" not found in context "${this.name}"`
    );
  }

  private throwInvalidValueError(key: string) {
    throw new Error(
      `Invalid value was found for the key "${key}" in the context "${this.name}"`
    );
  }

  private testInvalidValue(
    value: any,
    invalidValues: IInvalid['invalidValues'] = []
  ) {
    return invalidValues.includes(value);
  }

  /**
   * Set a value for a specific key in the context.
   * @template T - The type of the value to set.
   * @param {string} key - The key associated with the value.
   * @param {T} value - The value to set.
   */
  public set<T>(key: string, value: T): void {
    this.getContext[key] = value;
  }

  /**
   * Get a value associated with a specific key in the context.
   * @template T - The expected type of the value.
   * @param {string} key - The key associated with the value.
   * @param {IGetContextData<T>} [options] - Options for data retrieval.
   * @returns {T|undefined} - The retrieved value, or the default value if specified, or `false` if invalid.
   */
  public get<T>(
    key: string,
    options: IGetContextData<T> = {}
  ): T | undefined {
    const { defaultValue, invalidValues = [], orInvalidValues = [] } = options;
    const value: T = this.getContext[key];

    let test = this.testInvalidValue(value, orInvalidValues);

    if (test) return defaultValue;

    if (invalidValues.length === 0) return value ?? defaultValue;

    test = this.testInvalidValue(value, invalidValues);

    return test ? defaultValue : value;
  }

  /**
   * Get a value associated with a specific key in the context or throw an error if not found.
   * @template T - The expected type of the value.
   * @param {string} key - The key associated with the value.
   * @param {IInvalid} [options] - Options for data retrieval, including invalid values.
   * @returns {T} - The retrieved value.
   * @throws {Error} - If the value is not found in the context.
   */
  getOrThrow<T = any>(
    key: string,
    options: IInvalid = {}
  ): T {
    const {
      orInvalidValues = [],
      invalidValues = [],
      throwOnInvalidValue = true,
    } = options;
    const value = this.get<T>(key, options);

    if (!value) throw this.throwError(key);

    const test = this.testInvalidValue(
      value,
      invalidValues.concat(orInvalidValues)
    );

    if (test && throwOnInvalidValue) throw this.throwInvalidValueError(key);
    return value;
  }

  /**
   * Get an integer value associated with a specific key in the context.
   * @param {string} key - The key associated with the value.
   * @param {IGetContextData<number>} [options] - Options for data retrieval, including invalid values.
   * @returns {number|undefined} - The retrieved integer value, or `undefined` if not found.
   */
  getInt(
    key: string,
    options: IGetContextData<number> = { orInvalidValues: [NaN] }
  ): number | undefined {
    const value = this.get(key, options);

    if (!value) return value;

    return parseInt(String(value), 10);
  }

  /**
   * Get an integer value associated with a specific key in the context or throw an error if not found.
   * @param {string} key - The key associated with the value.
   * @param {IInvalid} [options] - Options for data retrieval, including invalid values.
   * @returns {number} - The retrieved integer value.
   * @throws {Error} - If the value is not found in the context.
   */
  getIntOrThrow(key: string, options: IInvalid = {}): number {
    const {
      orInvalidValues = [NaN],
      invalidValues = [],
      throwOnInvalidValue = true,
    } = options;
    const value = this.getInt(key, options);

    if (value === undefined) throw this.throwError(key);

    const test = this.testInvalidValue(
      value,
      invalidValues.concat(orInvalidValues)
    );

    if (test && throwOnInvalidValue) throw this.throwInvalidValueError(key);
    return value;
  }

  /**
   * Get a boolean value associated with a specific key in the context.
   * @param {string} key - The key associated with the value.
   * @param {IGetContextData<boolean>} [options] - Options for data retrieval, including invalid values.
   * @returns {boolean|undefined} - The retrieved boolean value, or `undefined` if not found.
   */
  getBoolean(
    key: string,
    options: IGetContextData<boolean> & { strict?: boolean } = {}
  ): boolean | undefined {
    const { strict = false } = options;
    const value = this.get(key, options);

    if (value === undefined) return value;

    if (strict && ![1, '1', true, 'true'].includes(value)) return false;

    return value ? true : false;
  }

  /**
   * Get a boolean value associated with a specific key in the context or throw an error if not found.
   * @param {string} key - The key associated with the value.
   * @param {IInvalid} [options] - Options for data retrieval, including invalid values.
   * @returns {boolean} - The retrieved boolean value.
   * @throws {Error} - If the value is not found in the context.
   */
  getBooleanOrThrow(key: string, options: IInvalid = {}): boolean {
    const {
      orInvalidValues = [],
      invalidValues = [],
      throwOnInvalidValue = true,
    } = options;
    const value = this.getBoolean(key, options);

    if (value === undefined) throw this.throwError(key);

    const test = this.testInvalidValue(
      value,
      invalidValues.concat(orInvalidValues)
    );

    if (test && throwOnInvalidValue) throw this.throwInvalidValueError(key);
    return value;
  }
}
