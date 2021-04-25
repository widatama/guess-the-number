<template lang="pug">
.wrap.mx-auto(v-if="initialized")
  .flex.flex-row.items-center(v-if="isSettingUp")
    .flex-grow(class="sm:text-sm") How many digits to guess?

    div.mr-2
      select.bg-black.border.border-white.py-1.text-base(
        :value="numberLength"
        @change="chooseNumberLength($event)"
        class="focus:border-white"
      )
        option(v-for="item in availableNumberLength" :value="item" :key="item") {{item}}

    button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
      @click="startGame(numberLengthInput)"
      class="hover:bg-white hover:text-black"
    ) Start

  template(v-else)
    .flex.flex-row.items-center(v-if="isPlaying")
      div(class="w-3/12 sm:text-sm") {{numberLength}} Digits

      .flex-grow.mr-2
        input.w-full.bg-black.border.border-white.px-2.py-1.text-base(
          placeholder="Type some numbers…"
          v-model="currentGuessInput"
          @keypress="inputNumber($event)"
        )

      button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
        :disabled="!guessInputValid"
        @click="guessNumber(currentGuessInput)"
        :class="{ 'hover:bg-white hover:text-black': guessInputValid, 'cursor-not-allowed': !guessInputValid }"
      ) Submit

    .flex.flex-row.items-center.justify-between(v-if="isFinished")
      div
        | Completed!
        | &nbsp;{{guesses.length}}&nbsp;
        template(v-if="guesses.length === 1")
          | Guess
        template(v-else)
          | Guesses

      button.border.border-white.uppercase.px-3.py-1.text-base.transition-all.duration-400(
        @click="setupGame"
        class="hover:bg-white hover:text-black"
      ) New Game

    div(class="mt-12 sm:mt-8")
      v-guess-table(:guesses="guesses" v-if="guesses.length > 0")
</template>

<script>
import { mapState } from 'vuex';
import GuessTable from '@/components/GuessTable.vue';

function hasCharCode(str, charCode) {
  const strFromCharCode = String.fromCharCode(charCode);

  return str.includes(strFromCharCode);
}

export default {
  name: 'GameBoard',
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
      this.numberLengthInput = Math.min(...this.availableNumberLength);
      this.$store.dispatch('restart');
    },
  },
};
</script>
