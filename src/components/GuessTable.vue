<template lang="pug">
table.w-full.font-mono
  thead.border-b.border-gray
    tr
      th.text-left Guess
      th.text-right Digit
      th.text-right Position

  tbody
    tr(v-for="guess in guessesToShow")
      td.pt-2 {{guess.guessInput}}
      td.text-right.pt-2 {{guess.correctNumber}}
      td.text-right.pt-2 {{guess.correctPosition}}
</template>

<script>
export default {
  name: 'GuessTable',
  props: {
    guesses: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    guessesToShow() {
      return this.guesses;
    }
  },
};
</script>
