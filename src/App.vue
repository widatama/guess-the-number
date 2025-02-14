<template lang="pug">
header
  h1.wrap.mx-auto.tracking-widest.uppercase.text-lg(
    class="sm:mt-6 sm:mb-10 my-20"
  ) Guess The Number

.grow
  RouterView(v-slot="{ Component }")
    Transition(name="tr-fade" mode="out-in")
      component(:is="Component")

footer
  nav.wrap.my-10.mx-auto
    ul
      li.inline-block
        RouterLink(:to="{ name: 'Guide' }") Guide
      li.inline-block.ml-6(v-if="$route.name !== 'GameBoard'")
        RouterLink(:to="{ name: 'GameBoard' }")
          template(v-if="numberToGuess.raw")
            | Continue Game
          template(v-else)
            | New Game
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { computed, defineComponent, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import useMainStore from '@/stores/main';

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
  },
  setup() {
    const store = useMainStore();
    const { state } = storeToRefs(store);

    onMounted(async () => {
      await store.initialize();
    });

    return {
      numberToGuess: computed(() => state.value.numberToGuess),
    };
  },
});
</script>
