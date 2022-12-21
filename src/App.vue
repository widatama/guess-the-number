<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
/* import { useStore } from 'vuex'; */

export default defineComponent({
  components: {
    RouterLink,
    RouterView,
  },
  setup() {},
});
</script>

<template lang="pug">
header
  nav
    RouterLink(to="/") Home
    | &ensp;
    RouterLink(to="/about") About

br
RouterView
</template>
