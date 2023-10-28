import Context from '../Context';

describe('Context', () => {
  let context: Context;

  beforeEach(() => {
    context = Context.create('testContext');
  });

  it('should set and get values correctly', () => {
    context.set('key1', 'value1');

    const value = context.get('key1');

    expect(value).toBe('value1');
  });

  it('should handle default values correctly', () => {
    const value = context.get('undefinedKey', { defaultValue: 'defaultValue' });

    expect(value).toBe('defaultValue');
  });

  it('should handle invalid values correctly', () => {
    context.set('key2', 'invalidValue');

    const value = context.get('key2', { invalidValues: ['invalidValue'] });

    expect(value).toBe(false);
  });

  it('should handle orInvalidValues correctly', () => {
    context.set('key3', 'invalidValue');

    const value = context.get('key3', {
      orInvalidValues: ['invalidValue'],
      defaultValue: 'defaultValue',
    });

    expect(value).toBe('defaultValue');
  });

  it('should throw an error for non-existing keys', () => {
    expect(() => context.getOrThrow('nonExistentKey')).toThrowError(
      'Data with key "nonExistentKey" not found in context "testContext"'
    );
  });

  it('should handle getInt correctly', () => {
    context.set('numericKey', 42);

    const value = context.getInt('numericKey');

    expect(value).toBe(42);
  });

  it('should handle getIntOrThrow correctly', () => {
    context.set('nonNumericKey', 'notANumber');

    console.log('int throw');
    expect(() => context.getIntOrThrow('nonNumericKey')).toThrowError(
      'Invalid value was found for the key "nonNumericKey" in the context "testContext"'
    );
  });

  it('should handle getBoolean correctly', () => {
    context.set('booleanKey', true);

    const value = context.getBoolean('booleanKey');

    expect(value).toBe(true);
  });

  it('should handle strict mode correctly', () => {
    context.set('strictValue', true);

    const strictValue = context.getBoolean('strictValue', { strict: true });

    expect(strictValue).toBe(true);

    context.set('nonBooleanValue', 'false');

    const nonBooleanValue = context.getBoolean('nonBooleanValue', {
      strict: true,
    });

    expect(nonBooleanValue).toBe(false);
  });

  it('should handle getBooleanOrThrow correctly', () => {
    context.set('nonBooleanKey', 'notABoolean');

    expect(context.getBooleanOrThrow('nonBooleanKey')).toBe(true);

    context.set('nonBooleanStrictKey', 'notABoolean');

    expect(
      context.getBooleanOrThrow('nonBooleanStrictKey', { strict: true })
    ).toBe(false);
  });
});
