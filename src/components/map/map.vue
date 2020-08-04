<script>
    import coordinatesTool from "@/tools/coordinates";

    export default {
        name: 'map-netherlands',
        components: {},
        props: {},
        computed: {
            width() {
                return this.$store.state.settings.canvasWidth;
            },
            height() {
                return this.$store.state.settings.canvasHeight;
            },
            cities() {
                return this.$store.state.cities.all;
            },
            testCity() {
                return this.cities.find(city => city.title === 'Goeree-Overflakkee')
            },
            canvas() {
                return document.getElementById('canvas');
            },
            ctx() {
                return this.canvas.getContext('2d');
            }
        },
        methods: {
            init() {
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.draw();
            },
            draw() {
                for (let city of this.cities) {
                    this.drawCity(city);
                }
            },
            drawCity(city) {
                for (let path of city.paths) {
                    this.drawPath(path.path);
                }
            },
            drawPath(path) {
                let ctx, pathWithoutStart;
                ctx = this.ctx;
                ctx.beginPath();
                ctx.moveTo(...path[0].translated);
                pathWithoutStart = path.slice(1);
                for (let point of pathWithoutStart) {
                    ctx.lineTo(...point.translated);
                }
                ctx.fill();
            }
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div
        :style="{'width': width + 'px', 'height': height + 'px'}"
        class="map">
        <canvas id="canvas"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {

        canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>