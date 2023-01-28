import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import GuessForm from '@/components/GuessForm.vue';

describe('Renders', () => {
  test('Renders text, input box and button', () => {
    const wrapper = mount(GuessForm, {
      props: { numberLength: 1 },
    });

    expect(wrapper.find('[data-test="text"]').text()).toBe('1 Digits');
    expect(wrapper.find('input')).toBeTruthy();
    expect(wrapper.find('button')).toBeTruthy();
  });
});

describe('Submit event', () => {
  test('Cannot submit if input is not valid', async () => {
    const wrapper = mount(GuessForm, {
      props: { numberLength: 1 },
    });

    await wrapper.find('input').trigger('keydown', { key: 'enter' });

    expect(wrapper.emitted('submit')).toBeFalsy();
    expect(wrapper.find('button').attributes('disabled')).toBe('');
  });

  test('Can submit if input is valid', async () => {
    const wrapper = mount(GuessForm, {
      props: { numberLength: 1 },
    });

    await wrapper.find('input').setValue('1');
    await wrapper.find('button').trigger('click');

    // @ts-ignore
    expect(wrapper.emitted('submit')[0][0]).toBe('1');
    expect(wrapper.find('button').attributes('disabled')).toBeFalsy();
  });
});
