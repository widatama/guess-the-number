<template lang="pug">
div
  p(v-if="numberToGuess.raw")
    router-link(to="/game") Continue Game
  p(@click="setupGame")
    router-link(to="/game") New Game
  p
    router-link(to="/guide") Guide
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'v-intro',
  computed: {
    ...mapState([
      'numberToGuess',
      'guessed',
    ]),
  },
  methods: {
    setupGame() {
      this.$store.dispatch('restart');
    },
  },
};
</script>
