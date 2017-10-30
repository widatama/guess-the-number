<template lang="pug">
div
  p
   | This is a simple guess the number game. Given&nbsp;
   code n
   |  digits of unique number,
   strong  your task is to guess the correct digit for each position
   | .
  p
   | Every time you guess, there will be a response of&nbsp;
   code x
   |  and&nbsp;
   code y
   | .&nbsp;
   code x
   |  denotes how many digits you guessed correctly.&nbsp;
   code y
   |  denotes how many correct digits are in the correct position.
   strong
     |  You win when&nbsp;
     code x
     |  equals&nbsp;
     code y
     |  equals&nbsp;
     code n
     | .
  p
    router-link(to="/game")
      template(v-if="numberToGuess.raw")
        | Continue Game
      template(v-else)
        | New Game
    
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'v-guide',
  computed: {
    ...mapState([
      'numberToGuess',
    ]),
  },
};
</script>
