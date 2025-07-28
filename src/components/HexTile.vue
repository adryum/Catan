<script setup lang="ts">
import { Hex, HexPoint, HexSide } from '@/logic/Hex';
import type { TilePointInfo } from '@/logic/TilePointInfo';
import { onMounted, ref, useCssModule, type Ref } from 'vue';

const props = defineProps<{
    hexTile: Hex,
    pointInfo: TilePointInfo[]
}>();

const hex = ref<HTMLDivElement>()
const topPoint = ref<HTMLDivElement>()
const topRightPoint = ref<HTMLDivElement>()
const topLeftPoint = ref<HTMLDivElement>()
const bottomPoint = ref<HTMLDivElement>()
const bottomRightPoint = ref<HTMLDivElement>()
const bottomLeftPoint = ref<HTMLDivElement>()

onMounted(() => {
    if (!hex.value) return;

    props.hexTile.setHexElement(hex.value)
    console.log(hex.value);
    console.log(props.hexTile.parentElement);
    

    setPointCoords(topPoint, HexPoint.Top, props.hexTile)
    setPointCoords(topRightPoint, HexPoint.TopRight, props.hexTile)
    setPointCoords(topLeftPoint, HexPoint.TopLeft, props.hexTile)
    setPointCoords(bottomPoint, HexPoint.Bottom, props.hexTile)
    setPointCoords(bottomRightPoint, HexPoint.BottomRight, props.hexTile)
    setPointCoords(bottomLeftPoint, HexPoint.BottomLeft, props.hexTile)
})

function setPointCoords(refElement: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>, point: HexPoint, hex: Hex) {
    if (!refElement.value) return;

    const rect = refElement.value.getBoundingClientRect();

    let coords = hex.getRelativePointCoords(point)
    refElement.value.style.top = `${coords.y - rect.height / 2}px`
    refElement.value.style.left = `${coords.x - rect.width / 2}px`

    // console.log(point.toString());
    console.log(coords);
    
}

const s = useCssModule()
</script>

<template>
<div ref="hex" :class='s.container'>
 <div ref="topPoint" :class="s.point"></div>

 <div id="wallTopLeft" v-if="pointInfo.isSideConnected(HexSide.TopLeft)"></div>
 <div id="wallTopRight" v-if="pointInfo.isSideConnected(HexSide.TopRight)"></div>
 <div id="wallRight" v-if="pointInfo.isSideConnected(HexSide.Right)"></div>
 <div id="wallLeft" v-if="pointInfo.isSideConnected(HexSide.Left)"></div>
 <div id="wallBottomLeft" v-if="pointInfo.isSideConnected(HexSide.BottomLeft)"></div>
 <div id="wallBottomRight" v-if="pointInfo.isSideConnected(HexSide.BottomRight)"></div>
 
 <div ref="topRightPoint" :class="s.point"></div>
 <div ref="topLeftPoint" :class="s.point"></div>
 <div ref="bottomPoint" :class="s.point"></div>
 <div ref="bottomRightPoint" :class="s.point"></div>
 <div ref="bottomLeftPoint" :class="s.point"></div>

 <div id="tile" :class="s.tile">
    <img src="/src/assets/images/tileMesa.png" alt="tile">
 </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    position: relative
    width: 500px
    height: 500px

    .tile
        width: 500px
        height: 500px

        img
            width: 100%
            height: 100%
          

    .point
        position: absolute
        width: 100px
        height: 100px
        z-index: 2
        background: red


    
</style>