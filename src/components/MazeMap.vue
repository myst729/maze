<script setup lang="ts">
import { type Cell } from '../assets/maze.ts'
import MazeCell from './MazeCell.vue'

defineProps<{
  size: number
  cell: number
  wall: number
  states: Cell[]
}>()
</script>

<template>
  <div class="maze">
    <MazeCell v-for="(state, i) in states" :key="i" :cell="cell" :wall="wall" :state="state" />
  </div>
</template>

<style scoped>
.maze {
  display: grid;
  grid-template-columns: repeat(v-bind(size), 1fr);
  grid-template-rows: repeat(v-bind(size), 1fr);
  width: calc((v-bind(size * cell + wall * 2)) * 1px);
  height: calc((v-bind(size * cell + wall * 2)) * 1px);
  border: calc(v-bind(wall) * 1px) solid var(--color-border-hover);
}
</style>
