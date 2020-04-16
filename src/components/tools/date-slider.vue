<script>
    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/default.css'

    export default {
        name: 'date-slider',
        components: {
            VueSlider
        },
        props: {},
        computed: {
            currentDateOffset: {
                get() {
                    return this.$store.state.settings.currentDateOffset;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value});
                }
            },
            max() {
                return this.$store.getters['settings/getMax'];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="date-slider">
        <vue-slider
            v-model="currentDateOffset"
            :min="0"
            :max="max"
            :interval="1"
            :tooltip="'none'"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .date-slider {

    }
</style>