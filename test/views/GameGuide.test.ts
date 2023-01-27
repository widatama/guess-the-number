import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

import GameGuide from '@/views/GameGuide.vue';

describe('Guide view', () => {
  test('Renders guide content', () => {
    const wrapper = mount(GameGuide);

    expect(wrapper.text().length).toBeTruthy();
  });
});
