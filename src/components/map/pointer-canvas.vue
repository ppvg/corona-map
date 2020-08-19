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
            currentCity() {
                return this.$store.state.ui.currentCity;
            }
        },
        methods: {
            showCurrentCity() {
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
                if (this.currentCity) {
                    this.ctx.strokeStyle = '#000';
                    canvasTools.drawArea(this.ctx, this.currentCity, settings);
                }
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
        },
        watch: {
            currentCity: function () {
                this.showCurrentCity();
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
        position: absolute;
        z-index: 1;
        pointer-events: none;
    }
</style>