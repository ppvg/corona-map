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
                this.addClickEvent();
            },
            addClickEvent() {
                this.canvas.addEventListener('click', (event) => {
                    let x, y, city;
                    x = event.offsetX;
                    y = event.offsetY;
                    city = this.getCityForPoint(x, y);
                    if (city) {
                        this.$store.commit('ui/updateProperty', {key: 'currentCity', value: city});
                        this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                    }
                }, false);
            },
            getCityForPoint(x, y) {
                for (let city of this.cities) {
                    for (let path of city.paths) {
                        if (this.ctx.isPointInPath(path.ctxPath, x, y)) {
                            return city;
                        }
                    }
                }
                return null;
            },
            draw() {
                for (let city of this.cities) {
                    this.drawCity(city);
                }
            },
            drawCity(city) {
                for (let path of city.paths) {
                    this.ctx.fillStyle = city.color;
                    this.drawPath(path);
                }
            },
            drawPath(path) {
                this.ctx.fill(path.ctxPath);
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