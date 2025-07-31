<script setup lang="ts">
import GameGrid from '@/components/GameGrid.vue'
import HexTile from '@/components/HexTile.vue';
import InteractionPoint from '@/components/InteractionPoint.vue';
import InteractionSide from '@/components/InteractionSide.vue';
import { Hex } from '@/logic/Hex';
import { TwoDGrid } from '@/logic/TwoDGrid';
import { createCssClass } from '@/logic/Utils';
import { h, ref, render } from 'vue';

const grid = new TwoDGrid({x: 5, y: 5}, 200);
const gameGrid = ref<InstanceType<typeof GameGrid>>()
const div = ref<HTMLDivElement>()

function createPointCubes() {
    grid.generateInteractablePointsCoords()
}
function createSideCubes() {
    grid.generateInteractableSideCoords()
}

</script>

<template>
  <main class="container">
    <GameGrid ref="gameGrid">
        <div ref="div" class="interactionGrid">
            <InteractionPoint v-for="group in grid.interactableGridPoint.value" :group="group" />
            <InteractionSide v-for="group in grid.interactableGridSides.value" :group="group" />
        </div>
        <div v-for="row in grid.tiles">
            <HexTile v-for="tile in row" :point-info="[]" :hex-tile="tile"/>

        </div>
    
    </GameGrid>
    <button class="button" @click="createPointCubes"></button>
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

.interactionGrid
    position: relative
    width: 100%
    height: 100%
</style>
