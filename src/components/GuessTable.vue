<template lang="pug">
table.w-full.font-mono(v-if="guesses.length > 0")
  thead.border-b.border-gray
    tr
      th.text-left Guess
      th.text-right Digit
      th.text-right Position

  tbody
    tr(v-for="guess in guesses")
      td.pt-2(data-test="guessInput") {{guess.guessInput}}
      td.text-right.pt-2(data-test="correctNumber") {{guess.correctNumber}}
      td.text-right.pt-2(data-test="correctPosition") {{guess.correctPosition}}
</template>

<script lang="ts">
export default {
  name: 'GuessTable',
  props: {
    guesses: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
