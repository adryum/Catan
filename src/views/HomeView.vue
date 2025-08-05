<script setup lang="ts">
import GameGrid from '@/components/GameGrid.vue'
import HexTile from '@/components/HexTile.vue';
import InteractionPoint from '@/components/InteractionPoint.vue';
import InteractionSide from '@/components/InteractionSide.vue';
import { h, onMounted, ref, render } from 'vue';
import { GameManager } from '@/logic/repository/GameManager';
import { GamePiece, PlayerTeam } from '@/logic/models/Enums';
import type { PiecePositionOnHex } from '@/logic/repository/PiecePositionOnHex';

var gameManager: GameManager = new GameManager(
    { x: 4, y: 4 },
)

const gameGrid = ref<HTMLDivElement>()
const div = ref<HTMLDivElement>()

function setSidePiece(partOfHex: PiecePositionOnHex) {
    gameManager.setPiece(GamePiece.Wall, PlayerTeam.Red, partOfHex)
}

function setPointPiece(partOfHex: PiecePositionOnHex) {
    gameManager.setPiece(GamePiece.Tower, PlayerTeam.Red, partOfHex)
}
</script>

<template>
  <main class="container">
    <div ref="gameGrid" class="gameGrid" v-if="gameManager.grid">
        <div ref="div" class="interactionGrid">
            <InteractionPoint @click="setPointPiece(point)" v-for="point in gameManager.grid.gridPoints.value" :point="point" />
            <InteractionSide @click="setSidePiece(side)" v-if="gameManager.grid.gridSides.value.length > 0" v-for="side in gameManager.grid.gridSides.value" :side="side" />
        </div>
<!--  @mouseleave="grid.unHighLight(hex.keyInGrid.x, hex.keyInGrid.y)" @mouseenter="grid.highlightHex(hex.keyInGrid.x, hex.keyInGrid.y)" -->
        <div v-for="row in gameManager.grid.hexTiles">
            <HexTile v-for="hex in row.arr" :hex="hex"/>
        </div>
    </div>
    <div>Longest Road: {{ gameManager.longestRoad }}</div>
    <div>Placed Pieces: {{ gameManager.placedPieces }}</div>
    <button class="button" @click=""></button>
    <button class="button" @click=""></button>
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
