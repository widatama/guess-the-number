<template lang="pug">
.wrap.mx-auto(v-if="initialized")
  Transition(name="tr-fade" mode="out-in")
    SettingForm(
      v-if="isSettingUp"
      :availableNumberLength="availableNumberLength"
      @submit="handleSettingFormSubmit"
    )

    div(v-else)
      Transition(name="tr-fade" mode="out-in")
        GuessForm(
          v-if="isPlaying"
          :numberLength="numberLength"
          @submit="handleGuessFormSubmit"
        )

        .flex.flex-row.items-center.justify-between(v-else-if="isFinished")
          div
            | Completed!
            | &nbsp;{{guesses.length}}&nbsp;
            template(v-if="guesses.length === 1")
              | Guess
            template(v-else)
              | Guesses

          button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
            @click="handleNewGameClick"
            class="hover:bg-white hover:text-black"
          ) New Game

      div(class="mt-12 sm:mt-8")
        GuessTable(:guesses="guesses")
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import GuessForm from '@/components/GuessForm.vue';
import GuessTable from '@/components/GuessTable.vue';
import SettingForm from '@/components/SettingForm.vue';

export default {
  name: 'GameBoard',
  components: {
    GuessForm,
    GuessTable,
    SettingForm,
  },
  setup() {
    const { dispatch, state } = useStore();
    const numberLength = computed(() => state.numberLength);
    const numberToGuess = computed(() => state.numberToGuess);
    const availableNumberLength = computed(() => state.availableNumberLength);
    const guessed = computed(() => state.guessed);

    function handleGuessFormSubmit(guessInput: string) {
      dispatch('guessNumber', guessInput);
    }

    function handleSettingFormSubmit(choosenNumberLength: number) {
      dispatch('generateNumber', choosenNumberLength);
    }

    function handleNewGameClick() {
      dispatch('restart');
    }

    return {
      numberLength,
      numberToGuess,
      availableNumberLength,
      guesses: computed(() => state.guesses),
      guessed,
      initialized: computed(() => state.initialized),
      isSettingUp: computed(() => numberToGuess.value.raw.length < 1),
      isPlaying: computed(() => numberToGuess.value.raw && !guessed.value),
      isFinished: computed(() => guessed.value),
      handleGuessFormSubmit,
      handleSettingFormSubmit,
      handleNewGameClick,
    };
  },
};
</script>
