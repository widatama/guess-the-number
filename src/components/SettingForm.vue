<template lang="pug">
form(class="flex flex-row items-center" @submit="handleClickOrSubmit")
  div(class="grow sm:text-sm") How many digits to guess?

  div(class="mr-2")
    select(
      v-model="numberLength"
      class="bg-black border border-white py-1 text-base cursor-pointer focus:border-white"
    )
      option(v-for="item in availableNumberLength" :value="item" :key="item") {{item}}

  button(
    @click="handleClickOrSubmit"
    class="border border-white cursor-pointer uppercase px-3 py-1 text-base transition-all duration-400 hover:bg-white hover:text-black"
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
