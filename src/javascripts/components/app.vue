<template lang="pug">
.c-app-container
  header.c-app-header
    h1.c-app-title Guess The Number

  main.c-app-content
    router-view
</template>

<script>
export default {
  name: 'guess-the-number',
  data() {
    return {
      msg: "Hello",
    };
  },
};
</script>
