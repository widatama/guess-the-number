<template lang="pug">
.wrap.mx-auto(v-if="initialized")
  .flex.flex-row.items-center(v-if="isSettingUp")
    .flex-grow(class="sm:text-sm") How many digits to guess?

    div.mr-2
      select.bg-black.border.border-white.py-1.text-base(
        :value="numberLength"
        @change="chooseNumberLength($event)"
        class="focus:border-white"
      )
        option(v-for="item in availableNumberLength" :value="item" :key="item") {{item}}

    button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
      @click="startGame(numberLengthInput)"
      class="hover:bg-white hover:text-black"
    ) Start

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

function hasCharCode(str: string, charCode: number) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

export default {
  name: 'GameBoard',
  components: {
    GuessTable,
  },
  setup() {
    const { dispatch, state } = useStore();
    const currentGuessInput = ref('');
    const numberLengthInput = ref(0);
    const numberLength = computed(() => state.numberLength);
    const numberToGuess = computed(() => state.numberToGuess);
    const availableNumberLength = computed(() => state.availableNumberLength);
    const guessed = computed(() => state.guessed);

    function chooseNumberLength(event: Event) {
      const target = event.target as HTMLSelectElement;
      numberLengthInput.value = parseInt(target.value, 10);
    }

    function startGame(chosenNumberLength: number) {
      dispatch('generateNumber', chosenNumberLength || numberLength.value);
    }

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
      numberLengthInput.value = Math.min(...availableNumberLength.value);
      dispatch('restart');
    }

    return {
      currentGuessInput,
      numberLengthInput,
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
      chooseNumberLength,
      startGame,
      guessNumber,
      inputNumber,
      setupGame,
    };
  },
};
</script>
