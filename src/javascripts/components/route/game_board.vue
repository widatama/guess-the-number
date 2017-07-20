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
      input(type="number", v-model="currentGuessInput", v-on:keypress="inputNumber($event)")

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

function hasCharCode(str, charCode) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

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
    inputNumber(event) {
      if (event.charCode === 13 && this.currentGuessInput.length === this.numberLength) {
        this.guessNumber(this.currentGuessInput);
      } else if (event.charCode < 48 || event.charCode > 57 || this.currentGuessInput.length >= this.numberLength || hasCharCode(this.currentGuessInput, event.charCode)) {
        event.preventDefault();
        
        return;
      }
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
