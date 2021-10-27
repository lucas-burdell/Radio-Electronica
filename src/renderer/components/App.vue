<template>
  <v-app>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <div class="centered d-flex justify-center">
        <div class="flex-column justify-center align-center">
          <Radio :source="source" />
          <v-btn @click="openDialog">Open PLS File</v-btn>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.centered {
  margin: 10em auto 10em auto;
}
</style>

<script lang="ts">
import Radio from "./Radio.vue";
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {
    Radio,
  },

  data: () => ({
    source: "",
  }),
  methods: {
    openDialog() {
      window.fileHelper.openPLSFileDialog();
    },
  },
  created() {
    window.fileHelper.onNewPLSOpened((src) => (this.source = src));
  },
});
</script>
