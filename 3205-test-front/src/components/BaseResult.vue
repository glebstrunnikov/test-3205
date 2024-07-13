<template>
  <div class="result-wrapper">
    <p class="result-item">{{ email }}, {{ number }}</p>
  </div>
</template>

<script setup>
const props = defineProps(["email", "number"]);
</script>
<style lang="sass" scoped>
p
  margin: 4px
</style>

