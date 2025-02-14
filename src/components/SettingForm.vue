<template lang="pug">
form.flex.flex-row.items-center(@submit="handleClickOrSubmit")
  .grow(class="sm:text-sm") How many digits to guess?

  div.mr-2
    select.bg-black.border.border-white.py-1.text-base(
      v-model="numberLength"
      class="focus:border-white"
    )
      option(v-for="item in availableNumberLength" :value="item" :key="item") {{item}}

  button.border.border-white.cursor-pointer.uppercase.px-3.py-1.text-base.transition-all.duration-400(
    @click="handleClickOrSubmit"
    class="hover:bg-white hover:text-black"
  ) Start
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
} from 'vue';

export default defineComponent({
  name: 'SettingForm',
  props: {
    availableNumberLength: {
      type: Array,
      default() { return [4]; },
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const { availableNumberLength } = toRefs(props);
    const numberLength = ref(availableNumberLength.value[0]);

    function handleClickOrSubmit(event: Event) {
      event.preventDefault();
      emit('submit', numberLength.value);
    }

    return {
      handleClickOrSubmit,
      numberLength,
    };
  },
});
</script>
