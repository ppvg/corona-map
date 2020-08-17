<script>
    import thresholds from '@/data/thresholds';

    export default {
        name: 'map-legend',
        components: {},
        props: {},
        data() {
            return {
                thresholds: thresholds.thresholds
            }
        },
        computed: {},
        methods: {
            getNumber(threshold) {
                return thresholds.getNumber(threshold);
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
                :style="{'background-color': threshold.color}"
                class="threshold__swatch"></div>
            <div class="threshold__cases">
                {{getNumber(threshold)}}
            </div>
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
    }
</style>