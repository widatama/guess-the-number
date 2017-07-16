import Vue from 'vue';
import Vuex from 'vuex';
import NumberEngine from '../modules/numberEngine';

const store = new Vuex.Store({
  state: {
    numberToGuess: {},
    numberLength: 4,
    guesses: [],
    guessed: false,
  },
  mutations: {
    UPDATE_VARIABLE(state, { label, value }) {
      Vue.set(state, label, value);
    },
    ADD_GUESS(state, newGuess) {
      state.guesses.push(newGuess);
    },
  },
  actions: {
    generateNumber({ commit, state }) {
      const numberObj = new NumberEngine();

      numberObj.generateNumber(state.numberLength);

      commit('UPDATE_VARIABLE', { label: 'numberToGuess', value: numberObj.numberToGuess });
    },
    guessNumber({ commit, state }, guessInput) {
      const numberObj = new NumberEngine();
      const guessObj = {};

      guessObj.guessInput = guessInput;

      numberObj.setNumber(state.numberToGuess.raw);

      const guessResult = numberObj.guessNumber(guessInput);

      guessObj.correctNumber = guessResult.correctNumber;
      guessObj.correctPosition = guessResult.correctPosition;

      commit('ADD_GUESS', guessObj);

      if (guessObj.correctNumber === state.numberLength
        && guessObj.correctPosition === state.numberLength) {
        commit('UPDATE_VARIABLE', { label: 'guessed', value: true });
      }
    },
  },
});

export default store;
