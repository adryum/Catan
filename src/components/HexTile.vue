<script setup lang="ts">
import { Hex, HexPoint, HexSide } from '@/logic/Hex';
import type { TilePointInfo } from '@/logic/TilePointInfo';
import { onMounted, ref, useCssModule, type Ref } from 'vue';

const props = defineProps<{
    hexTile: Hex,
}>();

const hex = ref<HTMLDivElement>()
const topPoint = ref<HTMLDivElement>()
const topRightPoint = ref<HTMLDivElement>()
const topLeftPoint = ref<HTMLDivElement>()
const bottomPoint = ref<HTMLDivElement>()
const bottomRightPoint = ref<HTMLDivElement>()
const bottomLeftPoint = ref<HTMLDivElement>()

const sideTopRight = ref<HTMLDivElement>()
const sideRight = ref<HTMLDivElement>()
const sideBottomRight = ref<HTMLDivElement>()
const sideBottomLeft = ref<HTMLDivElement>()
const sideLeft = ref<HTMLDivElement>()
const sideTopLeft = ref<HTMLDivElement>()

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

    setSideCoords(sideTopRight, HexSide.TopRight, props.hexTile)
    setSideCoords(sideRight, HexSide.Right, props.hexTile)
    setSideCoords(sideBottomRight, HexSide.BottomRight, props.hexTile)
    setSideCoords(sideBottomLeft, HexSide.BottomLeft, props.hexTile)
    setSideCoords(sideLeft, HexSide.Left, props.hexTile)
    setSideCoords(sideTopLeft, HexSide.TopLeft, props.hexTile)
})

function setPointCoords(refElement: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>, point: HexPoint, hex: Hex) {
    if (!refElement.value) return;

    const rect = refElement.value.getBoundingClientRect();

    let coords = hex.getRelativePointCoords(point)
    refElement.value.style.top = `${coords.y}px`
    refElement.value.style.left = `${coords.x}px`

    // centers point by 50% of size
    refElement.value.style.transform = `translateX(-50%) translateY(-50%)`

    // console.log(point.toString());
    console.log(coords);
    
}

function setSideCoords(refElement: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>, side: HexSide, hex: Hex) {
    if (!refElement.value) return;

    const rect = refElement.value.getBoundingClientRect();

    let coords = hex.getRelativeSideCoords(side)
    refElement.value.style.top = `${coords.y}px`
    refElement.value.style.left = `${coords.x}px`

    // centers point by 50% of size
    refElement.value.style.transform = `translateX(-50%) translateY(-50%)`

    // console.log(point.toString());
    console.log(coords);
}

const s = useCssModule()
</script>

<template>
<div ref="hex" :class='s.container'>
 <div ref="topPoint" :class="[s.topPoint ]">
    <img :src="hexTile.pointInfo.get(HexPoint.Top)?.getPieceImage()" alt="tile">
 </div>

 <div ref="sideTopLeft" :class="s.wallTop" v-if="hexTile.pointInfo.isSideConnected(HexSide.TopLeft)">
    <img src="/src/assets/images/wallRightBottom.svg" alt="tile">
 </div>
 <div ref="sideTopRight" :class="s.wallTop" v-if="hexTile.pointInfo.isSideConnected(HexSide.TopRight)">
    <img src="/src/assets/images/wallLeftBottom.svg" alt="tile">
 </div>
 <div ref="sideRight" :class="s.wall" v-if="hexTile.pointInfo.isSideConnected(HexSide.Right)">
    <img src="/src/assets/images/wallVertical.svg" alt="tile">
 </div>
 <div ref="sideLeft" :class="s.wall" v-if="hexTile.pointInfo.isSideConnected(HexSide.Left)">
    <img src="/src/assets/images/wallVertical.svg" alt="tile">
 </div>
 <div ref="sideBottomLeft" :class="s.wall" v-if="hexTile.pointInfo.isSideConnected(HexSide.BottomLeft)">
    <img src="/src/assets/images/wallLeftBottom.svg" alt="tile">
 </div>
 <div ref="sideBottomRight" :class="s.wall" v-if="hexTile.pointInfo.isSideConnected(HexSide.BottomRight)">
    <img src="/src/assets/images/wallRightBottom.svg" alt="tile">
 </div>
 
 <div ref="topRightPoint" :class="s.point">
    <img :src="hexTile.pointInfo.get(HexPoint.TopRight)?.getPieceImage()" alt="tile">
 </div>
 <div ref="topLeftPoint" :class="s.point">
    <img :src="hexTile.pointInfo.get(HexPoint.TopLeft)?.getPieceImage()" alt="tile">
 </div>
 <div ref="bottomPoint" :class="s.point">
    <img :src="hexTile.pointInfo.get(HexPoint.Bottom)?.getPieceImage()" alt="tile">
 </div>
 <div ref="bottomRightPoint" :class="s.point">
    <img :src="hexTile.pointInfo.get(HexPoint.BottomRight)?.getPieceImage()" alt="tile">
 </div>
 <div ref="bottomLeftPoint" :class="s.point">
    <img :src="hexTile.pointInfo.get(HexPoint.BottomLeft)?.getPieceImage()" alt="tile">
 </div>

 <div id="tile" :class="s.tile">
    <img src="/src/assets/images/tileMesa.svg" alt="tile">
 </div>
 <!-- <div :class="s.info">{{ hexTile.keyInGrid }}</div> -->
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
img
    width: 100%
    height: 100%
.container
    position: absolute
    z-index: 1
 
    .wall
        position: absolute
        width: 80px
        height: 80px

    .wallTop
        position: absolute
        width: 80px
        height: 80px
        z-index: -2

    &:hover
     
        transition: .3s

    .info
        position: absolute
        z-index: 10
        font-size: 20px

    .tile
        width: 100%
        height: 100%


    .topPoint
        position: absolute
        width: 48px
        height: 48px
        opacity: 1
        z-index: -1

    .point
        position: absolute
        width: 48px
        height: 48px
        
        // background: red
        opacity: 1
</style>