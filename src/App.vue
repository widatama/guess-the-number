<template lang="pug">
header
  h1.wrap.mx-auto.tracking-widest.font-thin.uppercase.text-lg(
    class="sm:mt-6 sm:mb-10 my-20"
  ) Guess The Number

.flex-grow
  router-view

footer
  nav.wrap.my-10.mx-auto
    ul
      li.inline-block.mr-6
        router-link(to="/")
          template(v-if="numberToGuess.raw")
            | Continue Game
          template(v-else)
            | New Game
      li.inline-block
        router-link(to="/guide") Guide
</template>

<script>
import { mapState } from 'vuex';

export default {
  Name: 'App',
  computed: {
    ...mapState([
      'numberToGuess',
    ]),
  },
  created() {
    this.$store.dispatch('initialize');
  },
};
</script>
