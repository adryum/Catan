<script setup lang="ts">
import GameGrid from '@/components/GameGrid.vue'
import HexTile from '@/components/HexTile.vue';
import InteractionPoint from '@/components/InteractionPoint.vue';
import InteractionSide from '@/components/InteractionSide.vue';
import { HexUI } from '@/logic/view/HexUI';
import { HexGrid } from '@/logic/repository/HexGrid';
import { createCssClass } from '@/logic/utils/Utils';
import { h, onMounted, ref, render } from 'vue';

var grid: HexGrid = new HexGrid(
    { x: 4, y: 4 },
    200
)

const gameGrid = ref<HTMLDivElement>()
const div = ref<HTMLDivElement>()

function createPointCubes() {
    // grid.generateInteractablePointsCoords()
}
function createSideCubes() {
    // grid.highlightHex(2, 0)
    console.log(
     grid.hexTiles);
}
</script>

<template>
  <main class="container">
    <div ref="gameGrid" class="gameGrid">
        <div ref="div" class="interactionGrid">
            <InteractionPoint  v-for="point in grid.gridPoints.value" :point="point" />
            <InteractionSide v-if="grid.gridSides.value.length > 0" v-for="group in grid.gridSides.value" :side="group" />
        </div>
<!--  @mouseleave="grid.unHighLight(hex.keyInGrid.x, hex.keyInGrid.y)" @mouseenter="grid.highlightHex(hex.keyInGrid.x, hex.keyInGrid.y)" -->
        <div v-for="row in grid.hexTiles">
            <HexTile v-for="hex in row.arr" :point-info="[]" :hex="hex"/>
        </div>
    </div>
    <button class="button" @click=""></button>
    <button class="button" @click="createSideCubes"></button>
  </main>
</template>

<style scoped lang="sass">
.container
    display: flex
    flex-direction: column
.button
    width: 500px
    height: 50px

.gameGrid 
    position: relative
    height: 1300px

.interactionGrid
    position: relative
    width: 100%
    height: 100%
</style>
