<template lang="pug">
form.flex.flex-row.items-center(@submit="handleClickOrSubmit")
  div(class="w-3/12 sm:text-sm" data-test="text") {{numberLength}} Digits

  .flex-grow.mr-2
    input.w-full.bg-black.border.border-white.px-2.py-1.text-base(
      placeholder="Type some numbers…"
      v-model="guessInput"
      @keypress="handleKeypress($event)"
    )

  button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
    :disabled="!guessInputLengthValid"
    @click="handleClickOrSubmit"
    :class="buttonClasses"
  ) Submit
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  toRefs,
} from 'vue';

function hasCharCode(str: string, charCode: number) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

export default defineComponent({
  name: 'GuessForm',
  props: {
    numberLength: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { numberLength } = toRefs(props);
    const guessInput = ref('');
    const guessInputLengthValid = computed(() => guessInput.value.length === numberLength.value);
    const buttonClasses = computed(() => ({
      'hover:bg-white hover:text-black': guessInputLengthValid.value,
      'cursor-not-allowed': !guessInputLengthValid.value,
    }));

    function handleClickOrSubmit(event: Event) {
      event.preventDefault();
      emit('submit', guessInput.value);
      guessInput.value = '';
    }

    function handleKeypress(event: KeyboardEvent) {
      const isNotNumeric = event.charCode < 48 || event.charCode > 57;
      const lengthExceeded = guessInput.value.length >= numberLength.value;
      const isNotUnique = hasCharCode(guessInput.value, event.charCode);

      if (event.charCode === 13 && guessInputLengthValid.value) {
        handleClickOrSubmit(event);
      } else if (isNotNumeric || lengthExceeded || isNotUnique) {
        event.preventDefault();
      }
    }

    return {
      buttonClasses,
      guessInput,
      guessInputLengthValid,
      handleKeypress,
      handleClickOrSubmit,
    };
  },
});
</script>
