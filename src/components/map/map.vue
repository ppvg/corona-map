<script>
    import mapTools from "./map-tools";
    import TimeSlider from "./time-slider";
    import downloadImage from "./download-image";
    import canvasTools from '@/tools/canvas';
    import PointerCanvas from "./pointer-canvas";
    import embedButton from "./embed-button";
    import $ from 'jquery';

    export default {
        name: 'map-netherlands',
        components: {
            embedButton,
            PointerCanvas,
            downloadImage,
            TimeSlider,
            mapTools
        },
        props: {},
        computed: {
            width() {
                return this.$store.state.settings.canvasWidth;
            },
            height() {
                return this.$store.state.settings.canvasHeight;
            },
            regions() {
                switch(this.currentRegionType) {
                    case 'city':
                        return this.$store.state.cities.all;
                    case 'ggd':
                        return this.$store.state.ggds.all;
                    case 'sr':
                        return this.$store.state.safetyRegions.all;
                    case 'country':
                        return this.$store.state.countries.all;
                }
            },
            cities() {
                return this.$store.state.cities.all;
            },
            canvas() {
                return document.getElementById('main-canvas');
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            offset() {
                return this.$store.state.settings.currentDateOffset;
            },
            currentRegionType() {
                return this.$store.state.ui.currentRegionType
            },
            color() {
                return this.$store.state.ui.color;
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            gradient() {
                return this.$store.state.settings.gradient;
            },
            currentMap() {
                return this.$store.state.maps.current;
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

                $(window).resize(() => {
                    this.resize();
                });
            },
            resize() {
                this.measure();
                this.clearCache();
                setTimeout(() => {
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                    this.draw();
                });
            },
            clearCache() {
                for (let city of this.$store.state.cities.all) {
                    for (let path of city.paths) {
                        path.storedPaths = {};
                    }
                }
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
                this.$store.commit('settings/updateProperty', {key: 'canvasWidth', value: Math.round(ratio * height)});
                this.$store.commit('settings/updateProperty', {key: 'zoom', value: (height * this.currentMap.settings.map.zoom)});

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
                        this.$store.commit('ui/updateProperty', {key: 'menu', value: 'city'});
                        this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    } else {
                        this.$store.commit('ui/updateProperty', {key: 'currentCity', value: false});
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
                        if (this.ctx.isPointInPath(path.storedPaths['map'], x, y)) {
                            return city;
                        }
                    }
                }
                return null;
            },
            draw() {
                this.clear();
                let settings = {
                    key: 'map',
                    width: this.$store.state.settings.canvasWidth,
                    height: this.$store.state.settings.canvasHeight,
                    shiftX: 0,
                    shiftY: 0,
                    zoom: this.$store.state.settings.zoom,
                    fill: true
                };
                canvasTools.draw(this.ctx, this.regions, settings);
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
                handler: function() {
                    this.draw();
                }
            },
            currentRegionType: {
                handler: function() {
                    this.draw();
                }
            },
            color: {
                handler: function() {
                    this.draw();
                }
            },
            signalingSystem: {
                handler: function() {
                    this.draw();
                }
            },
            gradient: {
                handler: function() {
                    this.draw();
                }
            }
        }
    }
</script>


<template>
    <div class="map">
        <canvas id="main-canvas"></canvas>
        <pointer-canvas
            :width="width"
            :height="height"/>
        <map-tools/>
        <time-slider/>
        <embed-button/>
        <download-image/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;

        canvas {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        #main-canvas {
            z-index: 0;
        }

        #pointer-canvas {
            z-index: 1;
        }

        .map-tools {
            position: absolute;
            left: 0;
            top: 10px;
            z-index: 1;
        }

        .time-slider {
            position: absolute;
            left: 10px;
            bottom: 20px;
            z-index: 1;
        }

        .download-image {
            position: absolute;
            right: 10px;
            bottom: 20px;
            z-index: 1;
        }

        .embed-button {
            position: absolute;
            right: 44px;
            bottom: 20px;
            z-index: 1;
        }
    }
</style>