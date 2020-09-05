<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        name: 'time-slider',
        components: {
            VueSlider
        },
        props: {},
        data() {
            return {
                playing: false,
                timer: null
            }
        },
        computed: {
            currentDateOffset: {
                get() {
                    return this.max - this.$store.state.settings.currentDateOffset;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: (this.max - value)});
                }
            },
            max() {
                return this.$store.state.settings.historyLength;
            },
            isAtEnd() {
                return this.$store.state.settings.currentDateOffset === 0;
            },
            date() {
                return this.$store.getters['ui/dateString'];
            }
        },
        methods: {
            rewind() {
                this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: this.max});
            },
            play() {
                this.playing = true;
                this.timer = setInterval(() => {
                    if (this.$store.state.settings.currentDateOffset > 0) {
                        this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: (this.$store.state.settings.currentDateOffset -1)});
                    } else {
                        this.stop();
                    }
                }, 50)
            },
            stop() {
                this.playing = false;
                clearInterval(this.timer);
            }
        }
    }
</script>


<template>
    <div class="time-slider">

        <div
            :style="{'width': (max * 2) + 'px'}"
            class="vue-slider__container">
            <vue-slider
                    v-model="currentDateOffset"
                    :min="0"
                    :max="max"
                    :interval="1"
                    :tooltip-formatter="date"
                    :duration="0"/>
        </div>


        <div
            v-if="isAtEnd"
            @click="rewind()"
            class="icon-button">
            <img src="assets/img/tools/redo.svg">
        </div>

        <div
            v-if="!playing && !isAtEnd"
            @click="play()"
            class="icon-button">
            <img src="assets/img/tools/play.svg">
        </div>

        <div
            v-if="playing"
            @click="stop()"
            class="icon-button">
            <img src="assets/img/tools/stop.svg">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    $slider-color: #000;

    .time-slider {
        display: flex;
        align-items: center;
        pointer-events: none;

        .icon-button {
            pointer-events: all;
        }

        .vue-slider {
            margin-right: 20px;

            .vue-slider-rail {
                border-radius: 0;
                height: 2px;
                pointer-events: all;

                .vue-slider-process {
                    background: $slider-color;
                }

                .vue-slider-dot-handle {
                    background: $slider-color;
                    box-shadow: none;
                    pointer-events: all;
                }

                .vue-slider-dot-tooltip {

                    .vue-slider-dot-tooltip-inner {
                        background: $slider-color;
                        font-size: 11px;
                        padding: 4px 8px;

                        &:after {
                            border-top-color: $slider-color;
                        }
                    }
                }
            }
        }

        @include mobile() {
            width: calc(100% - 80px)!important;
        }
    }
</style>