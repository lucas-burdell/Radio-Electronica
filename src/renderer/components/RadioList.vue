<template>
  <div class="container">
    <v-progress-circular indeterminate v-if="loading" size="20" />
    <div class="item-list" v-else-if="radios.length > 0">
      <div class="item" v-for="(radio, index) in radios" :key="index">
        <v-btn icon small class="icon-btn"><v-icon small>mdi-pencil</v-icon></v-btn>
        <v-btn icon small class="icon-btn"><v-icon small>mdi-delete</v-icon></v-btn>
        <v-btn dense text class="item-text" @click="play(radio)"
          ><p class="item-text-inner">{{ index + 1 }}. {{ radio.name }}</p></v-btn
        >
      </div>
    </div>
    <div v-else>
      <h3 class="empty">No Radios Found</h3>
    </div>
    <v-divider />
    <v-btn @click="openDialog" color="primary" depressed class="add-btn"
      ><v-icon>mdi-plus</v-icon> Add Radio</v-btn
    >
  </div>
</template>

<script lang="ts">
import { Radio } from "#/SharedTypes";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    radios: {
      required: true,
      type: Array as PropType<Array<Radio>>,
    },
    loading: { required: false, type: Boolean },
  },
  methods: {
    play(radio: Radio): void {
      this.$emit("play", radio);
    },
    openDialog() {
      window.fileHelper.openPLSFileDialog();
    },
  },
});
</script>

<style scoped>
.item-list {
  margin: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.container {
  display: flex;
  flex-direction: column;
}

.add-btn {
  margin-top: 1em;
}

.item {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}

.item-text {
  width: 100%;
  flex: 0 1 auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
}

.item-text-inner {
  width: 15em;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
}

.empty {
  margin: 1em;
  color: var(--v-gray-base);
  text-align: center;
}
</style>
