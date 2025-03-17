<template lang="pug">
Transition(name="tr-fade")
  table(class="w-full font-mono" v-if="guesses.length > 0")
    thead(class="border-b border-gray")
      tr
        th(class="text-left") Guess
        th(class="text-right") Digit
        th(class="text-right") Position

    TransitionGroup(name="trg-slide" tag="tbody")
      tr(v-for="guess in guesses" :key="guess.id || 0")
        td(class="pt-2" data-test="guessInput") {{guess.guessInput}}
        td(class="text-right pt-2" data-test="correctNumber") {{guess.correctNumber}}
        td(class="text-right pt-2" data-test="correctPosition") {{guess.correctPosition}}
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
