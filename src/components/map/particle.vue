<script>
    import Admission from "@/classes/Admission";
    import City from "@/classes/City";
    import coordinatesTool from "@/tools/coordinates";

    export default {
        name: 'particle',
        components: {},
        props: {
            admission: {
                type: Object,
                required: true
            },
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            lat() {
                return this.city.getRandomLat();
            },
            long() {
                return this.city.getRandomLong();
            },
            top() {
                return this.canvasHeight - coordinatesTool.getBottom(this.lat, this.zoom, this.canvasHeight);
            },
            left() {
                return coordinatesTool.getLeft(this.long, this.zoom, this.canvasWidth, this.mapRatio);
            },
            zoom() {
                return this.$store.state.settings.zoom;
            },
            canvasWidth() {
                return this.$store.state.settings.canvasWidth;
            },
            canvasHeight() {
                return this.$store.state.settings.canvasHeight;
            },
            mapRatio() {
                return this.$store.state.settings.mapRatio;
            },
            currentTime() {
                let date = new Date(this.$store.state.settings.dateStart);
                date.setDate(date.getDate() + this.$store.state.settings.currentDateOffset);
                return date.getTime();
            },
            isVisible() {
                return this.admission.getTime <= this.currentTime;
            }
        },
        methods: {}
    }
</script>


<template>
    <circle
            :transform="'translate(' + left + ' ' + top + ')'"
        :class="{'particle--visible': isVisible}"
        class="particle"/>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .particle {
        fill: rgba(255,0,0,0.5);
        r: 1;
        opacity: 0;
        transition: all 0.2s ease;

        &.particle--visible {
            opacity: 1
        }
    }
</style>