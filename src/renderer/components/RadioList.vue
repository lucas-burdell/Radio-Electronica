<template>
  <div class="item-list">
    <v-progress-circular indeterminate v-if="loading" size="20" />
    <div class="item" v-for="(radio, index) in radios" :key="index" v-else>
      <v-btn icon text><v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon text><v-icon>mdi-trashcan</v-icon></v-btn>
      <span>{{ index + 1 }}. {{ radio.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Radio from "./Radio.vue";
export default Vue.extend({
  components: { Radio },
  props: {
    radios: {
      required: true,
      type: Array as PropType<Array<{ name: string }>>,
    },
    loading: { required: false, type: Boolean },
  },
  methods: {
    openDialog() {
      window.fileHelper.openPLSFileDialog();
    },
  },
});
</script>

<style scoped>
.item-list {
  flex: 1;
  max-height: 1vh;
  overflow-y: auto;
}

.item {
  width: 100%;
  height: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
