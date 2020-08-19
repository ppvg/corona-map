<script>
    export default {
        name: 'swatch',
        components: {},
        props: {
            threshold: {
                type: Object,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :style="{'background-color': threshold.color}"
        class="swatch"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .swatch {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 2px;
    }
</style>