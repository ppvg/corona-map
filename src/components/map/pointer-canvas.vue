<script>
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'pointer-canvas',
        components: {},
        props: {
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            }
        },
        computed: {
            canvas() {
                return document.getElementById('pointer-canvas');
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            hoverValue() {
                return this.$store.state.ui.hoverValue;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            currentRegion() {
                return this.$store.getters['ui/currentRegion'];
            },
        },
        methods: {
            showCurrentRegion() {
                let settings = {
                    key: 'map',
                    width: this.$store.state.settings.canvasWidth,
                    height: this.$store.state.settings.canvasHeight,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.$store.state.settings.zoom,
                    fill: false
                };
                this.clear();
                if (this.currentRegion) {
                    this.ctx.strokeStyle = '#000';
                    canvasTools.drawRegionContainer(this.ctx, this.currentRegion, settings);
                }
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
        },
        watch: {
            currentRegion: function () {
                this.showCurrentRegion();
            }
        }

    }
</script>


<template>
    <canvas
        id="pointer-canvas"
        :width="width"
        :height="height"></canvas>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    #pointer-canvas {
        pointer-events: none;
    }
</style>