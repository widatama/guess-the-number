import { defineStore } from 'pinia';
import { ref } from 'vue';

import GameState from '@/modules/GameState';
import type { Guess } from '@/modules/GameState';
import NumberEngine from '@/modules/NumberEngine';

const useMainStore = defineStore('main', () => {
  const state = ref(GameState.default());
  const initialized = ref(false);

  function generateNumber(chosenNumberLength: number) {
    const numberObj = new NumberEngine();
    numberObj.generateNumber(chosenNumberLength);

    state.value.numberLength = chosenNumberLength;
    state.value.numberToGuess = numberObj.numberToGuess;
  }

  function guessNumber(inpGuess: string) {
    const numberObj = new NumberEngine();
    const guessObj: Guess = {
      guessInput: '',
      correctNumber: 0,
      correctPosition: 0,
      id: new Date().valueOf(),
    };

    guessObj.guessInput = inpGuess;
    numberObj.setNumber(state.value.numberToGuess.raw);

    const guessResult = numberObj.guessNumber(inpGuess);

    guessObj.correctNumber = guessResult.correctNumber;
    guessObj.correctPosition = guessResult.correctPosition;

    state.value.guesses.unshift(guessObj);

    const allDigitsCorrect = guessObj.correctNumber === state.value.numberLength;
    const allPositionsCorrect = guessObj.correctPosition === state.value.numberLength;

    if (allDigitsCorrect && allPositionsCorrect) {
      state.value.guessed = true;
    }
  }

  async function initialize() {
    state.value = await GameState.init();
    initialized.value = true;
  }

  async function reset() {
    state.value = GameState.default();
  }

  return {
    initialized,
    state,
    generateNumber,
    guessNumber,
    initialize,
    reset,
  };
});

export default useMainStore;
