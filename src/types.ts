/**
 * A data record with keys of type string and values of any type.
 */
export type DataRecord = Record<string, any>;

/**
 * A valid key in the context.
 */
export type ContextKey = keyof DataRecord;

/**
 * Signature of a callback function to handle context events.
 * @template T - The type of the value associated with the context key.
 * @param {ContextKey} key - The context key affected by the event.
 * @param {T} value - The new value associated with the context key.
 */
export type ContextEventCallback = <T>(key: ContextKey, value: T) => void;

/**
 * Interface to define options for context data retrieval.
 */
export interface IInvalid {
  /**
   * Array of invalidValues for which the value will be considered invalid.
   * If not defined, the value will be tested for falsy value.
   */
  invalidValues?: any[];

  /**
   * Array of orInvalidValues for which the value will be considered invalid.
   * If provided, these values are always evaluated to determine invalidity.
   */
  orInvalidValues?: any[];

  /**
   * Specifies whether to throw an error when an invalid value is encountered by methods like getOrThrow, getIntOrThrow, and getBooleanOrThrow.
   * - If set to true (default), these methods will throw an error when attempting to retrieve an invalid value.
   * - If set to false, *OrThrow methods will throw an error only if the key is not found in the context.
   */
  throwOnInvalidValue?: boolean;

  /**
   * A flag indicating whether strict mode is enabled for methods like getBoolean*.
   * - If set to true, only the following values will be considered as true: 1, '1', true, 'true'.
   * - Any other value will be considered as false.
   */
  strict?: boolean;
}

/**
 * Interface to define options for context data retrieval, with support for default values and invalid values.
 * @template T - The type of the default value.
 */
export interface IGetContextData<T> extends IInvalid {
  /**
   * The default value to use if no value is associated with the context key.
   */
  defaultValue?: T;
}
