<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'
    import TimeTools from "./time-tools";

    export default {
        name: 'time-slider',
        components: {
            TimeTools,
            VueSlider
        },
        props: {},
        computed: {
            currentDateOffset: {
                get() {
                    return this.historyLength - this.$store.state.settings.currentDateOffset;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: (this.historyLength - value)});
                }
            },
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            date() {
                return this.$store.getters['ui/dateString'];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="time-slider">

        <div class="vue-slider__container">
            <vue-slider
                v-model="currentDateOffset"
                :min="0"
                :max="historyLength"
                :interval="1"
                :tooltip-formatter="date"
                :duration="0"/>
        </div>

        <time-tools/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    $slider-color: #000;

    .time-slider {
        display: flex;
        align-items: center;
        pointer-events: none;
        width: calc(100% - 90px)!important;

        .vue-slider__container {
            width: calc(100% - 120px);
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
    }
</style>