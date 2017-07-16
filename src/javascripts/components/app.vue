<template lang="pug">
div
  | Guess the number

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
