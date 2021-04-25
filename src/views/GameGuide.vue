<template lang="pug">
.wrap.mx-auto
  p.leading-normal.mb-4 This is a very simple number guessing game.
  p.leading-normal.mb-4
   |  Some hidden&nbsp;
   code n
   |  digits of unique numbers will be generated at the beginning. Each digit could have a value of&nbsp;
   code 0–9
   | .
   strong  The goal is to guess all the hidden digits and their correct positions
   | .
  p.leading-normal.mb-4
   | Everytime a guess is made, there will be a response of&nbsp;
   code x
   |  and&nbsp;
   code y
   | .&nbsp;
   code x
   |  denotes how many digits are guessed correctly.&nbsp;
   code y
   |  denotes how many correct digits are in the correct position.
   strong
     |  The game is won when&nbsp;
     code x
     |  equals&nbsp;
     code y
     |  equals&nbsp;
     code n
     | .
</template>

<script>
export default {
  name: 'GameGuide',
};
</script>
