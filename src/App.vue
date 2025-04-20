<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Cell, SIZE, CELL, WALL, generateMaze, checkMaze } from './assets/maze.ts'
import MazeMap from './components/MazeMap.vue'

const states = ref<Cell[]>([])

onMounted(() => {
  let maze = generateMaze()
  while (true) {
    if (checkMaze(maze)) {
      states.value = maze
      return
    }
    maze = generateMaze()
  }
})
</script>

<template>
  <MazeMap :size="SIZE" :cell="CELL" :wall="WALL" :states="states" />
</template>
