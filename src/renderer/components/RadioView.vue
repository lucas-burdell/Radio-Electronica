<template>
  <div class="main d-flex">
    <Radio :source="source" />
    <RadioList />
  </div>
</template>

<script lang="ts">
import Radio from "@/components/Radio.vue";
import RadioList from "@/components/RadioList.vue";
import Vue from "vue";
export default Vue.extend({
  components: { Radio, RadioList },
  data: () => ({
    source: "",
    loading: false,
    radios: [] as Array<{ name: string; source: string }>,
  }),
  created() {
    window.fileHelper.onNewPLSOpened((src) => (this.source = src));
  },
});
</script>

<style scoped>
.main {
  width: 100%;
  overflow-x: hidden;
}
</style>
