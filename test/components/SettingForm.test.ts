import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import SettingForm from '@/components/SettingForm.vue';

describe('Zero condition', () => {
  test('Renders a select box and a button', () => {
    const wrapper = mount(SettingForm);

    expect(wrapper.find('select')).toBeTruthy();
    expect(wrapper.find('button')).toBeTruthy();
  });
});

describe('With prop', () => {
  test('Renders a select box with correct amount of options', () => {
    const availableNumberLength = [4, 5, 6];
    const wrapper = mount(SettingForm, {
      props: {
        availableNumberLength,
      },
    });

    expect(wrapper.findAll('option').length).toBe(availableNumberLength.length);
  });
});

describe('Submit event', () => {
  test('Emits submit event when button is clicked', async () => {
    const availableNumberLength = [4, 5, 6];
    const wrapper = mount(SettingForm, {
      props: {
        availableNumberLength,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('submit')).toBeTruthy();
  });

  test('Emits selected number with submit', async () => {
    const availableNumberLength = [4, 5, 6];
    const wrapper = mount(SettingForm, {
      props: {
        availableNumberLength,
      },
    });

    await wrapper.find('select').setValue(availableNumberLength[1]);
    await wrapper.find('button').trigger('click');

    // @ts-ignore
    expect(wrapper.emitted('submit')[0][0]).toBe(availableNumberLength[1]);
  });
});
