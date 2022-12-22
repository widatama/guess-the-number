import { describe, expect, test } from 'vitest';

import Engine, { DEFAULT_NUMBER_LENGTH } from '@/modules/NumberEngine';

describe('Instantiation', () => {
  const engine = new Engine();

  test('Engine instance created', () => {
    expect(engine).toBeTruthy();
  });

  test('Engine instance has number length by default', () => {
    expect(engine.numberLength).toBeTruthy();
  });

  test('Engine instance has empty number to guess', () => {
    expect(engine.numberToGuess).toEqual({
      raw: '',
      structured: {},
    });
  });
});

describe('Generating number', () => {
  const engine = new Engine();

  engine.generateNumber();

  test('Engine can generate number', () => {
    expect(engine.numberToGuess.raw.length).toBe(DEFAULT_NUMBER_LENGTH);
  });

  test('Structured number is generated correctly', () => {
    [...engine.numberToGuess.raw].forEach((numChar, idx) => {
      expect(engine.numberToGuess.structured[numChar]).toBe(idx);
    });
  });
});

describe('Setting number', () => {
  const engine = new Engine();
  const VALID_NUMBER = '0736';
  const invalidFn0 = () => {
    engine.setNumber();
  };
  const invalidFn1 = () => {
    engine.setNumber('abc');
  };
  const invalidFn2 = () => {
    engine.setNumber('1123');
  };

  test('Set number argument cannot be empty', () => {
    expect(invalidFn0).toThrowError();
  });

  test('Set number argument has to be number', () => {
    expect(invalidFn1).toThrowError();
  });

  test('Set number argument has to have unique digits', () => {
    expect(invalidFn2).toThrowError();
  });

  engine.setNumber(VALID_NUMBER);

  test('Can set number with valid argument', () => {
    expect(engine.numberToGuess.raw).toEqual(VALID_NUMBER);
  });
});

describe('Guessing number', () => {
  const engine = new Engine();
  const VALID_NUMBER = '8519';

  test('Number has to be generated before guessing', () => {
    expect(engine.guessNumber).toThrowError();
  });

  engine.setNumber(VALID_NUMBER);

  const invalidFn0 = () => {
    engine.guessNumber();
  };
  const invalidFn1 = () => {
    engine.guessNumber('89a');
  };
  const invalidFn2 = () => {
    engine.guessNumber('5589');
  };
  const invalidFn3 = () => {
    engine.guessNumber('589');
  };

  test('Guess number argument cannot be empty', () => {
    expect(invalidFn0).toThrowError();
  });

  test('Guess number argument has to be number', () => {
    expect(invalidFn1).toThrowError();
  });

  test('Guess number argument has to have unique digits', () => {
    expect(invalidFn2).toThrowError();
  });

  test('Guess number argument has to have the same length as number to guess', () => {
    expect(invalidFn3).toThrowError();
  });
});
