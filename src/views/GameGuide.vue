<template lang="pug">
.wrap.mx-auto
  p.leading-normal.mb-4
    | This is a very simple number guessing game.
    | Think of it as a slightly more difficult Wordle with numbers.
  p.leading-normal.mb-4
    | Some hidden #[code.italic n] digits of unique numbers will be generated at the beginning.
    |  Each digit could have a value of #[code.italic 0–9].
    |  #[strong The goal is to guess all the hidden digits and their correct positions].
  p.leading-normal.mb-4
    | Whenever a guess is made, there will be a response of #[code.italic x] and #[code.italic y].
    |  #[code.italic x] denotes how many digits are guessed correctly and
    |  #[code.italic y] denotes how many correct digits are in correct position.
    |  The game is won when&nbsp;
    strong
      | #[code.italic x] equals #[code.italic y] equals #[code.italic n].
    |  Or in other words &nbsp;
    |  #[strong when all the correct digits and their positions are guessed].
</template>

<script lang="ts">
export default {
  name: 'GameGuide',
};
</script>
