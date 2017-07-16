<template lang="pug">
div
  | Intro
  br
  router-link(to="/game") New Game
  br
  router-link(to="/guide") Guide
</template>

<script>
export default {
  name: 'v-intro',
};
</script>
