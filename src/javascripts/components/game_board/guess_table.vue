<template lang="pug">
table.u-fill
  thead
    tr
      th Guess
      th.u-align--right Digit
      th.u-align--right Position

  tbody
    tr(v-for="guess in guessesToShow")
      td.u-txt--monospace {{guess.guessInput}}
      td.u-txt--monospace.u-align--right {{guess.correctNumber}}
      td.u-txt--monospace.u-align--right {{guess.correctPosition}}

</template>

<script>
export default {
  name: 'VGuessTable',
  props: {
    guesses: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    guessesToShow() {
      return [...this.guesses].reverse();
    }
  },
};
</script>
