<script>
    import thresholds from '@/data/thresholds';

    export default {
        name: 'map-legend',
        components: {},
        props: {},
        data() {
            return {
                thresholds: thresholds.thresholds,
                colorblind: this.$store.state.ui.color === 'colorblind1'
            }
        },
        computed: {
            colorSetting() {
                return this.$store.state.ui.color;
            }
        },
        methods: {
            getNumber(threshold) {
                return thresholds.getNumber(threshold);
            }
        },
        watch: {
            colorblind: {
                handler: function(newValue) {
                    let value = this.colorblind ? 'colorblind1' : 'regular';
                    this.$store.commit('ui/updateProperty', {key: 'color', value});

                }
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
        <div class="map-legend__colorblind">
            <input
                type="checkbox"
                v-model="colorblind"> Kleurenblind
        </div>
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

        .map-legend__colorblind {
            margin-top: 12px;
            pointer-events: all;
            display: flex;
            align-items: center;

            input {
                margin-right: 4px;
                margin-left: 0;
            }
        }
    }
</style>