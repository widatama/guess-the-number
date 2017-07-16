<template lang="pug">
div
  | Game Board
  br

  router-link(to="/guide") Guide

  template(v-if="isSettingUp")
    select(v-model="numberLength", v-on:change="chooseNumberLength($event)")
      template(v-for="item in availableNumberLength")
        option(v-bind:value="item") {{item}}
    button(v-on:click="startGame(numberLengthInput)") Start

  template(v-else)
    template(v-if="isPlaying")
      input(v-model="currentGuessInput", v-on:keyup.enter="guessNumber(currentGuessInput)")

    template(v-if="isFinished")
      | You Win, {{guesses.length}} Guesses

      button(v-on:click="setupGame") New Game

    table
      thead
        tr
          th Guess
          th Digit
          th Position
      tbody
        tr(v-for="guess in guesses")
          td {{guess.guessInput}}
          td {{guess.correctNumber}}
          td {{guess.correctPosition}}


</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'v-game-board',
  computed: {
    isSettingUp() {
      return this.gameStatuses[0] === this.currentGameStatus;
    },
    isPlaying() {
      return this.gameStatuses[1] === this.currentGameStatus;
    },
    isFinished() {
      return this.gameStatuses[2] === this.currentGameStatus;
    },
    ...mapState([
      'numberLength',
      'availableNumberLength',
      'guesses',
      'guessed',
    ]),
  },
  data: () => {
    return {
      currentGuessInput: '',
      numberLengthInput: 0,
      gameStatuses: ['setup', 'play', 'finished'],
      currentGameStatus: 'setup',
    };
  },
  methods: {
    chooseNumberLength(event) {
      this.numberLengthInput = parseInt(event.target.value, 10);
    },
    startGame(chosenNumberLength) {
      this.$store.dispatch('generateNumber', chosenNumberLength || this.numberLength);

      this.currentGameStatus = 'play';
    },
    guessNumber(guessInput) {
      this.$store.dispatch('guessNumber', guessInput);
      this.currentGuessInput = '';

      if (this.guessed) {
        this.currentGameStatus = 'finished';
      }
    },
    setupGame() {
      this.currentGameStatus = 'setup';

      this.$store.dispatch('restart');
    },
  },
};
</script>
