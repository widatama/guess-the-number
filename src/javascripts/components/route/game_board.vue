<template lang="pug">
div.c-game-board
  .c-game-board-setup(v-if="isSettingUp")
    div
      | How many digits can you guess?&emsp;
      select.c-select(v-model="numberLength", v-on:change="chooseNumberLength($event)")
        template(v-for="item in availableNumberLength")
          option(v-bind:value="item") {{item}}
    div
      button.c-button.u-fill(v-on:click="startGame(numberLengthInput)") Start

  template(v-else)
    .c-game-board-meta
      | {{numberLength}} Digits
    .c-game-board-guess-input-field(v-if="isPlaying")
      div
        input.c-input.u-fill(placeholder="Type your guess…", v-model="currentGuessInput", v-on:keypress="inputNumber($event)")
      button.c-button.u-fill(v-bind:disabled="!guessInputValid", v-on:click="guessNumber(currentGuessInput)") Submit

    .c-game-board-finished(v-if="isFinished")
      div
        strong
          | You win!
          | &nbsp;{{guesses.length}}&nbsp;
          template(v-if="guesses.length === 1")
            | Guess
          template(v-else)
            | Guesses

      button.c-button.u-fill(v-on:click="setupGame") New Game

    .c-game-board-guesses
      v-guess-table(v-bind:guesses="guesses", v-if="guesses.length > 0")

</template>

<script>
import { mapState } from 'vuex';
import GuessTable from '../game_board/guess_table.vue';

function hasCharCode(str, charCode) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

export default {
  name: 'v-game-board',
  components: {
    'v-guess-table': GuessTable,
  },
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
    guessInputValid() {
      return this.currentGuessInput.length === this.numberLength;
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
