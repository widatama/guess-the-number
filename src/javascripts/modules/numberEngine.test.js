import tape from 'tape';

import Engine from './numberEngine';

tape('Number Engine', test => {
  test.plan(4);

  test.test('Instantiation', assert => {
    const engine = new Engine();

    assert.ok(engine, 'Engine instance created');
    assert.ok(engine.numberLength, 'Engine instance has default number length');
    assert.deepEqual(engine.numberToGuess, {}, 'Engine instance has empty number to guess');

    assert.end();
  });

  test.test('Number generation', assert => {
    const engine = new Engine();

    assert.ok(engine.generateNumber(), 'Engine can generate number');
    assert.ok(engine.numberToGuess.raw, 'Number generated successfully');
    assert.notDeepEqual(engine.numberToGuess.structured, {}, 'Number generated successfully');

    assert.end();
  });

  test.test('Number setting', assert => {
    const engine = new Engine();
    const invalidFn0 = () => {
      engine.setNumber();
    };
    const invalidFn1 = () => {
      engine.setNumber('abc');
    };
    const invalidFn2 = () => {
      engine.setNumber('1123');
    };
    const VALID_NUMBER = '0736';

    assert.throws(invalidFn0, /not valid/, 'Set number argument cannot be empty');
    assert.throws(invalidFn1, /not valid/, 'Set number argument has to be number');
    assert.throws(invalidFn2, /not valid/, 'Set number argument has to have unique digits');

    engine.setNumber(VALID_NUMBER);

    assert.equal(engine.numberToGuess.raw, VALID_NUMBER, 'Set number success');

    assert.end();
  });

  test.test('Number guessing', assert => {
    const engine = new Engine();
    const VALID_NUMBER = '8519';

    assert.throws(engine.guessNumber, 'Number has to be generated before guessing');

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

    assert.throws(invalidFn0, 'Guess number argument cannot be empty');
    assert.throws(invalidFn1, 'Guess number argument has to be number');
    assert.throws(invalidFn2, 'Guess number argument has to have unique digits');
    assert.throws(
      invalidFn3,
      'Guess number argument has to have the same length as number to guess',
    );

    assert.end();
  });
});
