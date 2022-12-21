import localforage from 'localforage';
import NumberEngine from "./NumberEngine";

const STORAGE_KEY = 'GTN_GAME_STATE';
const DEFAULT_STATE = {
  numberToGuess: {},
  numberLength: Math.min(...NumberEngine.availableNumberLength()),
  availableNumberLength: NumberEngine.availableNumberLength(),
  guesses: [],
  guessed: false,
};

class GameState {
  static default() {
    return DEFAULT_STATE;
  }

  static init() {
    const state = DEFAULT_STATE;

    return localforage.getItem(STORAGE_KEY).then(value => {
      if (value) {
        Object.assign(state, value);
      }

      return Promise.resolve(state);
    });
  }

  static storagePlugin(store) {
    store.subscribe((mutation, state) => {
      localforage.setItem(STORAGE_KEY, state);
    });
  }
}

export default GameState;
