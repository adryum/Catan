<script setup lang="ts">
import GameGrid from '@/components/GameGrid.vue'
import HexTile from '@/components/HexTile.vue';
import { Hex } from '@/logic/Hex';
import { TwoDGrid } from '@/logic/TwoDGrid';
import { ref } from 'vue';

const grid = new TwoDGrid({x: 5, y: 5}, 200);
const gridElement = ref<InstanceType<typeof GameGrid>>()
// gridElement.value.

function generateGrid() {
    console.log(grid.tiles);
}
</script>

<template>
  <main>
    <GameGrid ref="game-grid">
        <div v-for="row in grid.tiles">
            <HexTile v-for="tile in row" :point-info="[]" :hex-tile="tile"/>

        </div>
    
    </GameGrid>
    <button class="button" @click="generateGrid"></button>
  </main>
</template>

<style scoped lang="sass">
.button
    width: 500px
    height: 50px
</style>
