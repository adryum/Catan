<script setup lang="ts">
import GameGrid from '@/components/GameGrid.vue'
import { TwoDGrid } from '@/logic/TwoDGrid';
import { ref } from 'vue';

const grid = new TwoDGrid({x: 5, y: 5}, 1);
const gridElement = ref<InstanceType<typeof GameGrid>>()
// gridElement.value.

function generateGrid() {
    grid.createGrid()
    console.log(grid.tiles);
    
}
</script>

<template>
  <main>
    <GameGrid ref="grid"/>
    <button class="button" @click="generateGrid"></button>
  </main>
</template>

<style scoped lang="sass">
.button
    width: 500px
    height: 50px
</style>
