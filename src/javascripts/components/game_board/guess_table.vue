<template lang="pug">
table.u-fill
  thead
    tr
      th
      th.u-align--right Digit
      th.u-align--right Position

  tbody
    tr(v-for="guess in guessesToShow")
      td.u-txt--monospace.u-align--right {{guess.guessInput}}
      td.u-txt--monospace.u-align--right {{guess.correctNumber}}
      td.u-txt--monospace.u-align--right {{guess.correctPosition}}

</template>

<script>
export default {
  name: 'v-guess-table',
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
