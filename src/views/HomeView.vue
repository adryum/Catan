<script setup lang="ts">
import GameGrid from '@/components/GameGrid.vue'
import HexTile from '@/components/HexTile.vue';
import { Hex } from '@/logic/Hex';
import { TwoDGrid } from '@/logic/TwoDGrid';
import { createCssClass } from '@/logic/Utils';
import { ref } from 'vue';

const grid = new TwoDGrid({x: 5, y: 5}, 200);
const gameGrid = ref<InstanceType<typeof GameGrid>>()
const div = ref<HTMLDivElement>()

function createPointCubes() {
    grid.generateInteractablePointsCoords()

    console.table(grid.interactableGridPoint);
    

    grid.interactableGridPoint.forEach(group => {
         var elClass = createCssClass(`
            position: absolute;
            top: ${group.relativeCoords.y}px;
            left: ${group.relativeCoords.x}px;

            background: red;
            width: 48px;
            height: 48px;
            z-index: 10;

            transform: translateX(-50%) translateY(-50%)
        `)
        var child = document.createElement('div')
        child.classList.add(elClass)
        div.value?.appendChild(child)
    })

    
}
</script>

<template>
  <main>
    <GameGrid ref="gameGrid">
        <div ref="div" class="interactionGrid"></div>
        <div v-for="row in grid.tiles">
            <HexTile v-for="tile in row" :point-info="[]" :hex-tile="tile"/>

        </div>
    
    </GameGrid>
    <button class="button" @click="createPointCubes"></button>
  </main>
</template>

<style scoped lang="sass">
.button
    width: 500px
    height: 50px

.interactionGrid
    position: relative
    width: 100%
    height: 100%
</style>
