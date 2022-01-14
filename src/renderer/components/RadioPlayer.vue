<template>
  <div class="big">
    <h2>{{ radio && radio.name }}</h2>
    <v-btn block @click="togglePlay" v-if="!playing" color="primary" :disabled="!radio"
      >Play</v-btn
    >
    <v-btn block @click="togglePlay" v-else color="secondary">Stop</v-btn>
    <audio ref="audio" />
    <v-slider
      v-model="volume"
      label="Volume"
      thumb-color="primary"
      :max="100"
      :min="0"
    ></v-slider>
  </div>
</template>

<script lang="ts">
import { Radio } from "#/SharedTypes";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    radio: { type: Object as PropType<Radio>, required: false },
  },
  data: () => ({
    playing: false,
    volume: 100,
  }),
  computed: {
    audio(): HTMLAudioElement {
      return this.$refs["audio"] as HTMLAudioElement;
    },
  },
  methods: {
    togglePlay() {
      if (!this.playing) {
        this.audio.src = this.radio.url;
        this.audio.play();
        this.playing = true;
      } else {
        this.audio.pause();
        this.playing = false;
      }
    },
  },
  watch: {
    volume() {
      this.audio.volume = Number((this.volume / 100).toFixed(2));
    },
    radio() {
      this.audio.pause();
      this.playing = false;
    },
  },
});
</script>

<style scoped>
.big {
  width: 100%;
}
.big > * {
  margin-top: 3em;
}
</style>
