<template lang="pug">
div
  | Game Board
  | {{numberLength}}
  br
  button(v-on:click="generateNumber") Generate
  br
  input(v-model="currentGuess", v-on:keyup.enter="guessNumber(currentGuess)")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'v-game-board',
  computed: mapState([
    'numberLength',
    'guesses',
    'guessed',
  ]),
  data: () => {
    return {
      currentGuess: '',
    };
  },
  methods: {
    generateNumber() {
      this.$store.dispatch('generateNumber');
    },
    guessNumber(guessInput) {
      this.$store.dispatch('guessNumber', guessInput);
      this.currentGuess = '';
    },
  },
};
</script>
