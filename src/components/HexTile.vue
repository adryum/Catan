<script setup lang="ts">
import { GamePiece, HexPoint, HexSide} from '@/logic/models/Enums';
import { computed, onMounted, ref, useCssModule, type Ref } from 'vue';
import { getPieceImage, type Hex } from '@/logic/repository/Hex';

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

const sideTopLeftImg = computed(() => {
    return getPieceImage(props.hex.sides[HexSide.TopLeft]!.gamePiece.piece, HexSide.TopLeft)!
})
const sideTopRightImg = computed(() => {
    return getPieceImage(props.hex.sides[HexSide.TopRight]!.gamePiece.piece, HexSide.TopRight)!
})
const sideRightImg = computed(() => {
    return getPieceImage(props.hex.sides[HexSide.Right]!.gamePiece.piece, HexSide.Right)!
})
const sideLeftImg = computed(() => {
    return getPieceImage(props.hex.sides[HexSide.Left]!.gamePiece.piece, HexSide.Left)!
})
const sideBottomLeftImg = computed(() => {
    return getPieceImage(props.hex.sides[HexSide.BottomLeft]!.gamePiece.piece, HexSide.BottomLeft)!
})
const sideBottomRightImg = computed(() => {
    return getPieceImage(props.hex.sides[HexSide.BottomRight]!.gamePiece.piece, HexSide.BottomRight)!
})

const s = useCssModule()
</script>

<template>
<div ref="container" :class='s.container'>
 
<!-- sides -->
 <div ref="sideTopLeft" :class="s.wallTop">
    <img v-if="sideTopLeftImg" :src="sideTopLeftImg" alt="side">
 </div>
 <div ref="sideTopRight" :class="s.wallTop" >
    <img v-if="sideTopRightImg" :src="sideTopRightImg" alt="side">
 </div>
 <div ref="sideRight" :class="s.wall" >
    <img v-if="sideRightImg" :src="sideRightImg" alt="side">
 </div>
 <div ref="sideLeft" :class="s.wall" >
    <img v-if="sideLeftImg" :src="sideLeftImg" alt="side">
 </div>
 <div ref="sideBottomLeft" :class="s.wall" >
    <img v-if="sideBottomLeftImg" :src="sideBottomLeftImg" alt="side">
 </div>
 <div ref="sideBottomRight" :class="s.wall" >
    <img v-if="sideBottomRightImg" :src="sideBottomRightImg" alt="side">
 </div>

 <!-- points -->
 <div ref="topPoint" :class="[s.topPoint ]">
    <img :src="getPieceImage(props.hex.getPoint(HexPoint.Top)?.gamePiece.piece)!" alt="tile">
 </div>
 <div ref="topRightPoint" :class="s.point">
    <img :src="getPieceImage(props.hex.getPoint(HexPoint.TopRight)?.gamePiece.piece)!" alt="tile">
 </div>
 <div ref="topLeftPoint" :class="s.point">
    <img :src="getPieceImage(props.hex.getPoint(HexPoint.TopLeft)?.gamePiece.piece)!" alt="tile">
 </div>
 <div ref="bottomPoint" :class="s.point">
    <img :src="getPieceImage(props.hex.getPoint(HexPoint.Bottom)?.gamePiece.piece)!" alt="tile">
 </div>
 <div ref="bottomRightPoint" :class="s.point">
    <img :src="getPieceImage(props.hex.getPoint(HexPoint.BottomRight)?.gamePiece.piece)!" alt="tile">
 </div>
 <div ref="bottomLeftPoint" :class="s.point">
    <img :src="getPieceImage(props.hex.getPoint(HexPoint.BottomLeft)?.gamePiece.piece)!" alt="tile">
 </div>

 <div id="tile" :style="hex.style.value" :class="s.tile">
    <img src="/src/assets/images/tileMesa.svg" alt="tile">
 </div>
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