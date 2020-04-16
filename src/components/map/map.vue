<script>
    import city from "./city";

    export default {
        name: 'map-netherlands',
        components: {
            city
        },
        props: {},
        computed: {
            cities() {
                return this.$store.state.cities.all;
            },
            canvasWidth() {
                return this.$store.state.settings.canvasWidth;
            },
            canvasHeight() {
                return this.$store.state.settings.canvasHeight;
            }
        },
        methods: {}
    }
</script>


<template>
    <svg
        :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}"
        class="map">
        <city
            v-for="city in cities"
            :city="city"/>
    </svg>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {
        position: relative;
        width: 400px;
        height: 600px;
        background: #ddd;

        .image {
            position: absolute;
            left: 5px;
            top: 12px;
            opacity: 0;
        }
    }
</style>