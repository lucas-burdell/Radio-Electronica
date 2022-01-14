<template>
  <div class="main">
    <div class="list">
      <RadioList :radios="radios" @play="radio = $event" />
    </div>
    <div class="divider"></div>
    <div class="radio">
      <RadioPlayer :radio="radio" />
    </div>
  </div>
</template>

<script lang="ts">
import { Radio } from "#/SharedTypes";
import RadioPlayer from "@/components/RadioPlayer.vue";
import RadioList from "@/components/RadioList.vue";
import Vue from "vue";
export default Vue.extend({
  components: { RadioPlayer, RadioList },
  data: () => ({
    radio: undefined as Radio | undefined,
    loading: false,
    radios: [] as Array<Radio>,
  }),
  async created() {
    window.fileHelper.onNewPLSOpened(async (src) => {
      this.radios = await window.radioService.GetList();
      console.log("new list!", this.radios);
    });
    this.radios = await window.radioService.GetList();
  },
});
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 20rem 1em 2fr;
}
.radio {
  margin: 1rem 3rem;
}
.divider {
  border-left: 1px solid #bbb;
  height: 100%;
  margin: auto;
}
.list {
  overflow-y: auto;
}
</style>
