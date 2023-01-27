<template lang="pug">
.wrap.mx-auto(v-if="initialized")
  SettingForm(
    v-if="isSettingUp"
    :availableNumberLength="availableNumberLength"
    @submit="handleSettingFormSubmit"
  )

  template(v-else)
    .flex.flex-row.items-center(v-if="isPlaying")
      div(class="w-3/12 sm:text-sm") {{numberLength}} Digits

      .flex-grow.mr-2
        input.w-full.bg-black.border.border-white.px-2.py-1.text-base(
          placeholder="Type some numbers…"
          v-model="currentGuessInput"
          @keypress="inputNumber($event)"
        )

      button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
        :disabled="!guessInputValid"
        @click="guessNumber(currentGuessInput)"
        :class="{ 'hover:bg-white hover:text-black': guessInputValid, 'cursor-not-allowed': !guessInputValid }"
      ) Submit

    .flex.flex-row.items-center.justify-between(v-if="isFinished")
      div
        | Completed!
        | &nbsp;{{guesses.length}}&nbsp;
        template(v-if="guesses.length === 1")
          | Guess
        template(v-else)
          | Guesses

      button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
        @click="setupGame"
        class="hover:bg-white hover:text-black"
      ) New Game

    div(class="mt-12 sm:mt-8")
      GuessTable(:guesses="guesses")
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import GuessTable from '@/components/GuessTable.vue';
import SettingForm from '@/components/SettingForm.vue';

function hasCharCode(str: string, charCode: number) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

export default {
  name: 'GameBoard',
  components: {
    GuessTable,
    SettingForm,
  },
  setup() {
    const { dispatch, state } = useStore();
    const currentGuessInput = ref('');
    const numberLength = computed(() => state.numberLength);
    const numberToGuess = computed(() => state.numberToGuess);
    const availableNumberLength = computed(() => state.availableNumberLength);
    const guessed = computed(() => state.guessed);

    function guessNumber(guessInput: string) {
      dispatch('guessNumber', guessInput);
      currentGuessInput.value = '';
    }

    function inputNumber(event: KeyboardEvent) {
      const isNotNumeric = event.charCode < 48 || event.charCode > 57;
      const lengthExceeded = currentGuessInput.value.length >= numberLength.value;
      const isNotUnique = hasCharCode(currentGuessInput.value, event.charCode);

      if (event.charCode === 13 && currentGuessInput.value.length === numberLength.value) {
        guessNumber(currentGuessInput.value);
      } else if (isNotNumeric || lengthExceeded || isNotUnique) {
        event.preventDefault();
      }
    }

    function setupGame() {
      dispatch('restart');
    }

    function handleSettingFormSubmit(choosenNumberLength: number) {
      dispatch('generateNumber', choosenNumberLength);
    }

    return {
      currentGuessInput,
      numberLength,
      numberToGuess,
      availableNumberLength,
      guesses: computed(() => state.guesses),
      guessed,
      initialized: computed(() => state.initialized),
      guessInputValid: computed(() => currentGuessInput.value.length === numberLength.value),
      isSettingUp: computed(() => numberToGuess.value.raw.length < 1),
      isPlaying: computed(() => numberToGuess.value.raw && !guessed.value),
      isFinished: computed(() => guessed.value),
      guessNumber,
      inputNumber,
      setupGame,
      handleSettingFormSubmit,
    };
  },
};
</script>
