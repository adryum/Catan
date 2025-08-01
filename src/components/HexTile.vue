<script setup lang="ts">
import { GamePiece, HexPoint, HexSide} from '@/logic/models/Enums';
import { computed, onMounted, ref, useCssModule, type Ref } from 'vue';
import type { Hex } from '@/logic/repository/Hex';

const props = defineProps<{
    hex: Hex,
}>();

const container = ref<HTMLDivElement>()
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
    if (!container.value) return;
    setContainerData()
    
    setPointCoords(topPoint, HexPoint.Top, props.hex)
    setPointCoords(topRightPoint, HexPoint.TopRight, props.hex)
    setPointCoords(topLeftPoint, HexPoint.TopLeft, props.hex)
    setPointCoords(bottomPoint, HexPoint.Bottom, props.hex)
    setPointCoords(bottomRightPoint, HexPoint.BottomRight, props.hex)
    setPointCoords(bottomLeftPoint, HexPoint.BottomLeft, props.hex)

    setSideCoords(sideTopRight, HexSide.TopRight, props.hex)
    setSideCoords(sideRight, HexSide.Right, props.hex)
    setSideCoords(sideBottomRight, HexSide.BottomRight, props.hex)
    setSideCoords(sideBottomLeft, HexSide.BottomLeft, props.hex)
    setSideCoords(sideLeft, HexSide.Left, props.hex)
    setSideCoords(sideTopLeft, HexSide.TopLeft, props.hex)
})

function setPointCoords(
    refElement: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>,
    point: HexPoint, hex: Hex
) {
    if (!refElement.value) return;

    let pointCoords = hex.getRelativePointCoords(point)
    refElement.value.style.top = `${pointCoords.y}px`
    refElement.value.style.left = `${pointCoords.x}px`

    // centers point by 50% of size
    refElement.value.style.transform = `translateX(-50%) translateY(-50%)`
}

function setSideCoords(
    refElement: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>,
    side: HexSide, hex: Hex
) {
    if (!refElement.value) return;

    let sideCoords = hex.getRelativeSideCoords(side)
    refElement.value.style.top = `${sideCoords.y}px`
    refElement.value.style.left = `${sideCoords.x}px`

    // centers point by 50% of size
    refElement.value.style.transform = `translateX(-50%) translateY(-50%)`
}

function setContainerData() {
    if (!container.value) return

    container.value.style.width = props.hex.sizePx + 'px'
    container.value.style.height = props.hex.sizePx + 'px'

    container.value.style.top = props.hex.leftTopPosition.y + 'px'
    container.value.style.left = props.hex.leftTopPosition.x + 'px'
}


const s = useCssModule()
</script>

<template>
<div ref="container" :class='s.container'>
 
<!-- sides -->
 <div ref="sideTopLeft" :class="s.wallTop">
    <img :src="props.hex.sideInfo.get(HexSide.TopLeft)?.getPieceImage(HexSide.TopLeft)" alt="tile">
 </div>
 <div ref="sideTopRight" :class="s.wallTop" >
    <img  :src="props.hex.sideInfo.get(HexSide.TopRight)?.getPieceImage(HexSide.TopRight)"  alt="tile">
 </div>
 <div ref="sideRight" :class="s.wall" >
    <img :src="props.hex.sideInfo.get(HexSide.Right)?.getPieceImage(HexSide.Right)"  alt="tile">
 </div>
 <div ref="sideLeft" :class="s.wall" >
    <img  :src="props.hex.sideInfo.get(HexSide.Left)?.getPieceImage(HexSide.Left)"  alt="tile">
 </div>
 <div ref="sideBottomLeft" :class="s.wall" >
    <img  :src="props.hex.sideInfo.get(HexSide.BottomLeft)?.getPieceImage(HexSide.BottomLeft)"  alt="tile">
 </div>
 <div ref="sideBottomRight" :class="s.wall" >
    <img :src="props.hex.sideInfo.get(HexSide.BottomRight)?.getPieceImage(HexSide.BottomRight)"  alt="tile">
 </div>


 <!-- points -->
 <div ref="topPoint" :class="[s.topPoint ]">
    <img :src="props.hex.pointInfo.get(HexPoint.Top)?.getPieceImage()" alt="tile">
 </div>
 <div ref="topRightPoint" :class="s.point">
    <img :src="props.hex.pointInfo.get(HexPoint.TopRight)?.getPieceImage()" alt="tile">
 </div>
 <div ref="topLeftPoint" :class="s.point">
    <img :src="props.hex.pointInfo.get(HexPoint.TopLeft)?.getPieceImage()" alt="tile">
 </div>
 <div ref="bottomPoint" :class="s.point">
    <img :src="props.hex.pointInfo.get(HexPoint.Bottom)?.getPieceImage()" alt="tile">
 </div>
 <div ref="bottomRightPoint" :class="s.point">
    <img :src="props.hex.pointInfo.get(HexPoint.BottomRight)?.getPieceImage()" alt="tile">
 </div>
 <div ref="bottomLeftPoint" :class="s.point">
    <img :src="props.hex.pointInfo.get(HexPoint.BottomLeft)?.getPieceImage()" alt="tile">
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