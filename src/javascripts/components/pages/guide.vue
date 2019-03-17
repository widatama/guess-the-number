<template lang="pug">
.c-game-board
  div
    p This is a very simple guess the number game.
    p
     |  You are given a hidden&nbsp;
     code n
     |  digits of unique numbers, each digit could have a value of&nbsp;
     code 0–9
     | .
     strong  Your goal is to guess all the digits and their correct positions
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

  footer.c-app-footer
    nav
      ul.c-nav-list
        li.c-nav-list__item
          router-link(to="/")
            template(v-if="numberToGuess.raw")
              | Continue Game
            template(v-else)
              | New Game
    
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'VGuide',
  computed: {
    ...mapState([
      'numberToGuess',
    ]),
  },
};
</script>
