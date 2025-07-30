<script setup lang="ts">
import { Hex, HexPoint, HexSide } from '@/logic/Hex';
import { GamePiece, type TilePointInfo } from '@/logic/TilePointInfo';
import type { PointGroup } from '@/logic/TwoDGrid';
import { onMounted, ref, useCssModule, type Ref } from 'vue';

const props = defineProps<{
    group: PointGroup,
}>();

const point = ref<HTMLDivElement>()

const s = useCssModule()
</script>

<template>
<div ref="point" @click="group.setPointPiece(GamePiece.Tower)" :class='s.container'>

</div>
</template>

<style module lang='css'>
.container {
    position: absolute;
    top: v-bind('$props.group.relativeCoords.y  + "px"');
    left: v-bind('$props.group.relativeCoords.x + "px"') ;

    height: 48px;
    width: 48px;

    background: red;
    opacity: .4;
    z-index: 5;   
    transform: translateX(-50%) translateY(-50%)
}
</style>