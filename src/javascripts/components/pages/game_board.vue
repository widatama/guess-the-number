<template lang="pug">
.c-game-board(v-if="initialized")
  div
    .c-game-board-setup(v-if="isSettingUp")
      div
        | How many digits to guess?

      div
        select.c-select.u-fill(v-model="numberLength", v-on:change="chooseNumberLength($event)")
          template(v-for="item in availableNumberLength")
            option(v-bind:value="item") {{item}}

      button.c-button.u-fill(v-on:click="startGame(numberLengthInput)") Start

    template(v-else)
      .c-game-board-guess-input-field(v-if="isPlaying")
        div
          | {{numberLength}} Digits
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

  footer.c-app-footer
    nav
      ul.c-nav-list
        li.c-nav-list__item
          router-link(to="/guide") Guide
        li.c-nav-list__item(v-if="isPlaying", v-on:click="setupGame")
          router-link(to="/") New Game

</template>

<script>
import { mapState } from 'vuex';
import GuessTable from '../game_board/guess_table.vue';

function hasCharCode(str, charCode) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

export default {
  name: 'VGameBoard',
  components: {
    'v-guess-table': GuessTable,
  },
  data() {
    return {
      currentGuessInput: '',
      numberLengthInput: 0,
    };
  },
  computed: {
    isSettingUp() {
      return !this.numberToGuess.raw;
    },
    isPlaying() {
      return this.numberToGuess.raw && !this.guessed;
    },
    isFinished() {
      return this.guessed;
    },
    guessInputValid() {
      return this.currentGuessInput.length === this.numberLength;
    },
    ...mapState([
      'numberToGuess',
      'numberLength',
      'availableNumberLength',
      'guesses',
      'guessed',
      'initialized',
    ]),
  },
  methods: {
    chooseNumberLength(event) {
      this.numberLengthInput = parseInt(event.target.value, 10);
    },
    startGame(chosenNumberLength) {
      this.$store.dispatch('generateNumber', chosenNumberLength || this.numberLength);
    },
    inputNumber(event) {
      if (event.charCode === 13 && this.currentGuessInput.length === this.numberLength) {
        this.guessNumber(this.currentGuessInput);
      } else if (event.charCode < 48 || event.charCode > 57 || this.currentGuessInput.length >= this.numberLength || hasCharCode(this.currentGuessInput, event.charCode)) {
        event.preventDefault();
        
        
      }
    },
    guessNumber(guessInput) {
      this.$store.dispatch('guessNumber', guessInput);
      this.currentGuessInput = '';
    },
    setupGame() {
      this.$store.dispatch('restart');
    },
  },
};
</script>
