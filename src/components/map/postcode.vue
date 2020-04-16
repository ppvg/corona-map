<script>
    import bulb from "./bulb";
    import City from "@/classes/City";
    import coordinatesTool from "@/tools/coordinates";

    export default {
        name: 'postcode',
        components: {
            bulb
        },
        props: {
            postcode: {
                type: Object,
                required: true
            },
            city: {
                type: City,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        computed: {
            top() {
                return this.canvasHeight - coordinatesTool.getBottom(this.postcode.latitude, this.zoom, this.canvasHeight);
            },
            left() {
                return coordinatesTool.getLeft(this.postcode.longitude, this.zoom, this.canvasWidth, this.mapRatio);
            },
            shiftX() {
                return this.$store.state.settings.shiftX;
            },
            shiftY() {
                return this.$store.state.settings.shiftY;
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
            isBubbles() {
                return this.$store.state.settings.mode === 'bubbles';
            }
        },
        methods: {}
    }
</script>


<template>
    <g
        :transform="'translate(' + left + ' ' + top + ')'"
        class="postcode">
        <circle class="postcode__circle"/>
        <bulb
            v-show="index === 0 && isBubbles"
            :city="city"/>
    </g>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .postcode {

        .postcode__circle {
            r: 2;
            fill: rgba(0,0,0,0.1);
        }
    }
</style>