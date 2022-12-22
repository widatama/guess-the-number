import { createStore } from 'vuex';

import GameState from '@/modules/GameState';
import type { Guess } from '@/modules/GameState';
import NumberEngine from '@/modules/NumberEngine';
import type { NumberToGuess } from '@/modules/NumberEngine';

export default createStore({
  state: {
    initialized: false,
    ...GameState.default(),
  },
  mutations: {
    INITIALIZE(state, initialState) {
      // eslint-disable-next-line
      state = initialState;
    },
    UPDATE_INITIALIZED(state, value: boolean) {
      state.initialized = value;
    },
    UPDATE_NUMBERLENGTH(state, value: number) {
      state.numberLength = value;
    },
    UPDATE_NUMBERTOGUESS(state, value: NumberToGuess) {
      state.numberToGuess = value;
    },
    UPDATE_GUESSED(state, value: boolean) {
      state.guessed = value;
    },
    UPDATE_GUESSES(state, value: Guess[]) {
      state.guesses = value;
    },
    ADD_GUESS(state, newGuess: Guess) {
      state.guesses.unshift(newGuess as never);
    },
  },
  actions: {
    initialize({ commit }) {
      GameState.init().then((initialState) => {
        commit('INITIALIZE', initialState);
        commit('UPDATE_INITIALIZED', true);
      });
    },
    generateNumber({ commit }, chosenNumberLength) {
      const numberObj = new NumberEngine();
      numberObj.generateNumber(chosenNumberLength);

      commit('UPDATE_NUMBERLENGTH', chosenNumberLength);
      commit('UPDATE_NUMBERTOGUESS', numberObj.numberToGuess);
    },
    guessNumber({ commit, state }, guessInput) {
      const numberObj = new NumberEngine();
      const guessObj: Guess = {
        guessInput: '',
        correctNumber: 0,
        correctPosition: 0,
      };

      guessObj.guessInput = guessInput;

      numberObj.setNumber(state.numberToGuess.raw);

      const guessResult = numberObj.guessNumber(guessInput);

      guessObj.correctNumber = guessResult.correctNumber;
      guessObj.correctPosition = guessResult.correctPosition;

      commit('ADD_GUESS', guessObj);

      if (
        guessObj.correctNumber === state.numberLength
        && guessObj.correctPosition === state.numberLength
      ) {
        commit('UPDATE_GUESSED', true);
      }
    },
    restart({ commit, state }) {
      commit('UPDATE_VARIABLE', {
        label: 'numberLength',
        value: Math.min(...state.availableNumberLength),
      });
      commit('UPDATE_GUESSED', false);
      commit('UPDATE_GUESSES', []);
      commit('UPDATE_NUMBERTOGUESS', { raw: '', structured: {} });
    },
  },
});
