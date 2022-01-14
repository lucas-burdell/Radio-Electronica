<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer" />
      <v-app-bar-title>Eladio</v-app-bar-title>
    </v-app-bar>
    <v-main><RadioView /></v-main>
  </v-app>
</template>

<style scoped>
.centered {
  margin: 10em auto 10em auto;
}
</style>

<script lang="ts">
import Vue from "vue";
import RadioView from "./RadioView.vue";

export default Vue.extend({
  name: "App",

  components: {
    RadioView,
  },

  data: () => ({
    source: "",
    showDrawer: false,
    group: undefined,
  }),
});
</script>
