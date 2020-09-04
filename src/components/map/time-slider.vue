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
                }, 10)
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
                    :tooltip="'none'"
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

    .time-slider {
        display: flex;
        align-items: center;

        .vue-slider {
            margin-right: 20px;

            .vue-slider-rail {
                border-radius: 0;
            }
        }
    }
</style>