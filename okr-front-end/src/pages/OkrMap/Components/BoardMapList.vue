<template>
    <li class="tree-map">
       <ul v-for="(item, index) in data" :key="index">
           <board-map-item :itemInfo="item"></board-map-item>
       </ul>
    </li>
</template>
<script>
import BoardMapItem from './BoardMapItem'
export default {
    name: 'board-map-list',

    components: {
        BoardMapItem
    },

    props:{
        data: {
            type: [Object, Array],
            required: true
        }
    }
}
</script>
