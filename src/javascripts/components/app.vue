<template lang="pug">
div
  | {{msg}}
  br
  | Guess the number
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
