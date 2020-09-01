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
        computed: {
            color() {
                return this.$store.state.ui.color;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{'background-color': threshold.color[color]}"
        class="swatch"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .swatch {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 2px;
        border: 1px solid #555;
    }
</style>