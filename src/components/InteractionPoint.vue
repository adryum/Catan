<script setup lang="ts">
import { GamePiece, NeighbourHex } from '@/logic/models/Enums';
import type { GridPoint } from '@/logic/repository/GridPoint';
import type { PointGroup } from '@/logic/view/PointGroup';
import { onMounted, ref, useCssModule, type Ref } from 'vue';

const props = defineProps<{
    point: GridPoint,
}>();

const point = ref<HTMLDivElement>()

function highlightRelatedHexes() {
    props.point.hexes.forEach(hex => {
        // console.log(hex);
        
        // hex.setStyle('opacity: 0.5')
    })

    // props.point.hexes[NeighbourHex.First]?.setStyle('background: green;')
    // props.point.hexes[NeighbourHex.Second]?.setStyle('background: red;')
    // props.point.hexes[NeighbourHex.Third]?.setStyle('background: blue;')
}

function unHighlightRelatedHexes() {
    props.point.hexes.forEach(hex => {
        // hex.setStyle('opacity: 1')
    })
}

const s = useCssModule()
</script>

<template>
<div ref="point"  @mouseenter="highlightRelatedHexes" @mouseleave="unHighlightRelatedHexes" :class='s.container'>

</div>
</template>

<style module lang='css'>
.container {
    position: absolute;
    top: v-bind('$props.point.coords.y  + "px"');
    left: v-bind('$props.point.coords.x + "px"') ;

    height: 48px;
    width: 48px;

    background: red;
    opacity: .4;
    z-index: 5;   
    transform: translateX(-50%) translateY(-50%)
}
</style>