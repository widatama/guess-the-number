import Vue from 'vue';
import Vuex from 'vuex';
import NumberEngine from '../modules/numberEngine';
import GameState from '../modules/gameState';

const store = new Vuex.Store({
  state: Object.assign({ initialized: false }, GameState.default()),
  plugins: [GameState.storagePlugin],
  mutations: {
    INITIALIZE(state, initialState) {
      Object.assign(state, initialState);
    },
    UPDATE_VARIABLE(state, { label, value }) {
      Vue.set(state, label, value);
    },
    ADD_GUESS(state, newGuess) {
      state.guesses.push(newGuess);
    },
  },
  actions: {
    initialize({ commit }) {
      GameState.init().then((initialState) => {
        commit('INITIALIZE', initialState);
        commit('UPDATE_VARIABLE', { label: 'initialized', value: true });
      });
    },
    generateNumber({ commit }, chosenNumberLength) {
      const numberObj = new NumberEngine();
      numberObj.generateNumber(chosenNumberLength);

      commit('UPDATE_VARIABLE', { label: 'numberLength', value: chosenNumberLength });
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
    restart({ commit }) {
      commit('UPDATE_VARIABLE', { label: 'guessed', value: false });
      commit('UPDATE_VARIABLE', { label: 'guesses', value: [] });
      commit('UPDATE_VARIABLE', { label: 'numberToGuess', value: {} });
    },
  },
});

export default store;
