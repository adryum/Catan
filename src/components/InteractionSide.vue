<script setup lang="ts">
import { GamePiece } from '@/logic/models/Enums';
import type { SideGroup } from '@/logic/view/SideGroup';
import { onMounted, ref, useCssModule, type Ref } from 'vue';

const props = defineProps<{
    group: SideGroup,
}>();

const point = ref<HTMLDivElement>()

const s = useCssModule()
</script>

<template>
<div ref="point" @click="group.setSidePiece(GamePiece.Wall)" :class='s.container'>

</div>
</template>

<style module lang='css'>
.container {
    position: absolute;
    top: v-bind('$props.group.relativeCoords.y  + "px"');
    left: v-bind('$props.group.relativeCoords.x + "px"') ;

    height: 64px;
    width: 64px;

    background: blue;
    opacity: .4;
    z-index: 5;   
    transform: translateX(-50%) translateY(-50%)
}
</style>