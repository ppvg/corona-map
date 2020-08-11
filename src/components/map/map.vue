<script>
    import mapLegend from "./map-legend";
    import TimeSlider from "./time-slider";
    import downloadImage from "./download-image";
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'map-netherlands',
        components: {
            downloadImage,
            TimeSlider,
            mapLegend
        },
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
            },
            offset() {
                return this.$store.state.settings.currentDateOffset;
            }
        },
        methods: {
            init() {
                this.measure();
                setTimeout(() => {
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                    this.addEvents();
                });
            },
            measure() {
                let height, ratio, windowWidth;
                height = this.$el.clientHeight;
                ratio = this.$store.state.settings.mapRatio;
                windowWidth = window.innerWidth - 20;
                // mobile
                if (windowWidth < 767) {
                    if (ratio * height > windowWidth) {
                        height = windowWidth / ratio;
                    }
                }
                this.$store.commit('settings/updateProperty', {key: 'canvasHeight', value: height});
                this.$store.commit('settings/updateProperty', {key: 'canvasWidth', value: ratio * height});
                this.$store.commit('settings/updateProperty', {key: 'zoom', value: (height / 2.9)});

            },
            addEvents() {
                this.addClickEvent();
                this.addHoverEvent();
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
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    }
                }, false);
            },
            addHoverEvent() {
                this.canvas.addEventListener('mousemove', (event) => {
                    let x, y, city;
                    x = event.offsetX;
                    y = event.offsetY;
                    city = this.getCityForPoint(x, y);
                    if (city) {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: city.title});
                    } else {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
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
                this.clear();
                canvasTools.draw(this.ctx, this.cities);
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
        },
        mounted() {
            this.init();
        },
        watch: {
            offset: {
                handler: function(newValue) {
                    this.draw();
                }
            }
        }
    }
</script>


<template>
    <div
        :style="{'width': width + 'px'}"
        class="map">
        <canvas id="canvas"></canvas>
        <map-legend/>
        <time-slider/>
        <download-image/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {
        display: flex;
        align-items: center;
        position: relative;

        canvas {
            position: relative;
            z-index: 0;
        }

        .map-legend {
            position: absolute;
            left: 0;
            top: 10px;
            z-index: 1;
        }

        .time-slider {
            position: absolute;
            left: 10px;
            bottom: 10px;
            z-index: 1;
        }

        .download-image {
            position: absolute;
            right: 10px;
            bottom: 10px;
            z-index: 1;
        }
    }
</style>