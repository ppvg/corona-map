<script>
    import thresholdTools from '@/tools/thresholds';
    import colorSetPicker from "./color-set-picker";
    import signalingSystemPicker from "./signaling-system-picker";

    export default {
        name: 'map-legend',
        components: {
            signalingSystemPicker,
            colorSetPicker
        },
        props: {},
        computed: {
            colorSetting() {
                return this.$store.state.ui.color;
            },
            thresholds() {
                return this.$store.state.signalingSystems.current.thresholds;
            }
        },
        methods: {
            getNumber(threshold) {
                return thresholdTools.getNumber(threshold);
            }
        }
    }
</script>


<template>
    <div class="map-legend">
        <div
            v-for="threshold in thresholds"
            class="threshold">
            <div
                :style="{'background-color': threshold.color[colorSetting]}"
                class="threshold__swatch"></div>
            <div class="threshold__cases">
                {{getNumber(threshold)}}
            </div>
        </div>
        <color-set-picker/>
        <signaling-system-picker/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map-legend {
        pointer-events: none;

        .threshold {
            display: flex;
            align-items: center;
            padding: 2px 0;
            font-size: 9px;

            .threshold__swatch {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 4px;
                border: 1px solid #555;
            }
        }
    }
</style>