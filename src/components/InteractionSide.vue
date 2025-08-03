<script setup lang="ts">
import type { GridSide } from '@/logic/repository/GridSide';
import { ref, useCssModule } from 'vue';

const props = defineProps<{
    side: GridSide,
}>();

const point = ref<HTMLDivElement>()
function highlightRelatedHexes() {
    props.side.hexes.forEach(hex => {
        // console.log(hex);
        
        hex.style = 'opacity: 0.5'
    })

    // props.point.hexes[NeighbourHex.First]?.setStyle('background: green;')
    // props.point.hexes[NeighbourHex.Second]?.setStyle('background: red;')
    // props.point.hexes[NeighbourHex.Third]?.setStyle('background: blue;')
}

function unHighlightRelatedHexes() {
    props.side.hexes.forEach(hex => {
        hex.style = 'opacity: 1'

    })
}
const s = useCssModule()
</script>

<template>
<div ref="point" @click="console.log(side)" @mouseenter="highlightRelatedHexes" @mouseleave="unHighlightRelatedHexes"  :class='s.container'>

</div>
</template>

<style module lang='css'>
.container {
    position: absolute;
    top: v-bind('$props.side.coords.y  + "px"');
    left: v-bind('$props.side.coords.x + "px"') ;

    height: 64px;
    width: 64px;

    background: blue;
    opacity: .4;
    z-index: 5;   
    transform: translateX(-50%) translateY(-50%)
}
</style>