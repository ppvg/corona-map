<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        name: 'time-slider',
        components: {
            VueSlider
        },
        props: {},
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
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{'width': (max * 10) + 'px'}"
        class="time-slider">
        <vue-slider
            v-model="currentDateOffset"
            :min="0"
            :max="max"
            :interval="1"
            :tooltip="'none'"
            :duration="0"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-slider {


        .vue-slider-rail {
            border-radius: 0;
        }
    }
</style>