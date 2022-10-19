<template>
  <banner></banner>
  <recommendlist></recommendlist>
</template>

<script>
import banner from "./banner/index.vue";
import recommendlist from "./recommendList/index.vue";
export default {
  name: "FoundMusic",
  components: { banner, recommendlist },
};
</script>

<style>
</style>