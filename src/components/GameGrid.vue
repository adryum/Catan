<script setup lang="ts">
import { useCssModule } from 'vue';

const s = useCssModule()
</script>

<template>
<div :class='s.container'>
    <slot>

    </slot>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    position: relative
    top: 100xp
    width: 500px
    height: 500px
    // left: 100px
    // top: 100px
    
  
    background: gray

    // .pointTop
    //     z-index: -1

    // .point
    //     z-index: 2

    // .wall
    //     z-index: 1

    // .wallTop
    //     z-index: -2

    // .tile
    //     z-index: 0
    //     width: 10cm
    //     height: 10cm
    //     background: red
    //     clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)

</style>