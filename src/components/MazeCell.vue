<script setup lang="ts">
import { type Cell, SIZE, CELL } from '../assets/maze.ts'
import StartIcon from './StartIcon.vue'
import TargetIcon from './TargetIcon.vue'

defineProps<{
  cell: number
  wall: number
  state: Cell
}>()
</script>

<template>
  <div
    :class="{
      'maze-cell': true,
      'maze-cell-top': state.value & 1,
      'maze-cell-right': state.value & 2,
      'maze-cell-bottom': state.value & 4,
      'maze-cell-left': state.value & 8,
    }"
  >
    <StartIcon class="icon" v-if="state.index === 0" />
    <TargetIcon class="icon" v-if="state.index === SIZE * SIZE - 1" />
  </div>
</template>

<style scoped>
.maze-cell {
  width: calc(v-bind(cell) * 1px);
  height: calc(v-bind(cell) * 1px);
  border: calc(v-bind(wall) * 1px) solid var(--color-border-hover);
  display: flex;
  justify-content: center;
  align-items: center;
}

.maze-cell-top {
  border-top-width: 0 !important;
}

.maze-cell-right {
  border-right-width: 0 !important;
}

.maze-cell-bottom {
  border-bottom-width: 0 !important;
}

.maze-cell-left {
  border-left-width: 0 !important;
}

.icon {
  width: calc(v-bind(CELL- 16) * 1px);
  height: calc(v-bind(CELL- 16) * 1px);
}
</style>
