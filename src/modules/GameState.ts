import localforage from 'localforage';
import NumberEngine from './NumberEngine';
import type { NumberToGuess } from './NumberEngine';

export type Guess = {
  guessInput: string;
  correctNumber: number;
  correctPosition: number;
  id?: number;
};

const STORAGE_KEY = 'GTN_GAME_STATE';
const DEFAULT_STATE: {
  numberToGuess: NumberToGuess;
  numberLength: number;
  availableNumberLength: number[];
  guesses: Guess[];
  guessed: boolean;
} = {
  numberToGuess: { raw: '', structured: {} },
  numberLength: Math.min(...NumberEngine.availableNumberLength()),
  availableNumberLength: NumberEngine.availableNumberLength(),
  guesses: [],
  guessed: false,
};

class GameState {
  static default() {
    return structuredClone(DEFAULT_STATE);
  }

  static init() {
    const state = structuredClone(DEFAULT_STATE);

    return localforage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        Object.assign(state, value);
      }

      return Promise.resolve(state);
    });
  }

  // static storagePlugin(store) {
    // store.subscribe((mutation, state) => {
      // localforage.setItem(STORAGE_KEY, state);
    // });
  // }
}

export default GameState;
