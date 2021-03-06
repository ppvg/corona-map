<script>
    import mapTools from "./map-tools";
    import TimeSlider from "./time-slider";
    import downloadImage from "./download-image";
    import canvasTools from '@/tools/canvas';
    import PointerCanvas from "./pointer-canvas";
    import embedButton from "./embed-button";
    import $ from 'jquery';

    export default {
        name: 'map-tests',
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
            containerRegions() {
                return this.$store.getters['ui/regions'];
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                return this.$store.state[this.currentMap.module].all;
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
                for (let region of this.$store.state[this.currentMap.module].all) {
                    for (let path of region.paths) {
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
                    let x, y, region;
                    x = event.offsetX;
                    y = event.offsetY;
                    region = this.getRegionForPoint(x, y);
                    if (region) {
                        this.$store.commit(this.currentMap.module + '/setCurrent', region);
                        this.$store.commit('ui/updateProperty', {key: 'menu', value: 'city'});
                        this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    } else {
                        this.$store.commit(this.currentMap.module + '/setCurrent', null);
                    }
                }, false);
            },
            addHoverEvent() {
                this.canvas.addEventListener('mousemove', (event) => {
                    let x, y, region;
                    x = event.offsetX;
                    y = event.offsetY;
                    region = this.getRegionForPoint(x, y);
                    if (region) {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: region.title});
                    } else {
                        this.$store.commit('ui/updateProperty', {key: 'hoverValue', value: ''});
                    }
                }, false);
            },
            getRegionForPoint(x, y) {
                for (let region of this.regions) {
                    for (let path of region.paths) {
                        if (this.ctx.isPointInPath(path.storedPaths['map'], x, y)) {
                            return region;
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
                canvasTools.draw(this.ctx, this.containerRegions, settings);
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