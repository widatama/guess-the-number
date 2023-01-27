import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import GuessTable from '@/components/GuessTable.vue';
import type { Guess } from '@/modules/GameState';

describe('Zero condition', () => {
  test('Does not render anything', () => {
    const wrapper = mount(GuessTable);

    expect(wrapper.text()).toBe('');
  });
});

describe('With some guesses', () => {
  test('Renders guess', () => {
    const guess: Guess = { guessInput: '1234', correctNumber: 1, correctPosition: 1 };
    const wrapper = mount(GuessTable, {
      props: {
        guesses: [guess],
      },
    });

    expect(wrapper.find('[data-test="guessInput"]').text()).toBe(guess.guessInput);
    expect(wrapper.find('[data-test="correctNumber"]').text()).toBe(`${guess.correctNumber}`);
    expect(wrapper.find('[data-test="correctPosition"]').text()).toBe(`${guess.correctPosition}`);
  });
});
