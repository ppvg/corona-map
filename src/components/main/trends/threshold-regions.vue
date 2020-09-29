<script>
    import city from "@/components/main/trends/city";
    import swatch from "@/components/elements/swatch";

    export default {
        name: 'threshold-regions',
        components: {
            swatch,
            city
        },
        computed: {
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            thresholds() {
                return this.$store.state.signalingSystems.current.thresholds;
            },
            typeLabel() {
                return this.$store.getters['ui/typeLabel'](true).toLowerCase();
            },
            offset() {
                return this.$store.state.settings.currentDateOffset;
            }
        },
        methods: {
            getRegions(threshold) {
                let regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    return region.getThreshold(0, this.offset) === threshold;
                }).sort((a,b) => (a.getTotalRelativeIncreaseWeek(this.offset) < b.getTotalRelativeIncreaseWeek(this.offset)) ? 1 : ((b.getTotalRelativeIncreaseWeek(this.offset) < a.getTotalRelativeIncreaseWeek(this.offset)) ? -1 : 0));
            }
        }
    }
</script>


<template>
    <div class="section threshold-regions">
        <div class="section__header">
            Aantal {{typeLabel}} per signaalwaarde
        </div>
        <div class="section__body">
            <div
                v-for="threshold in thresholds"
                class="threshold-regions__row">
                <div class="threshold-regions__swatch">
                    <swatch :threshold="threshold"/>
                </div>
                <div class="threshold-regions__label">
                    {{getRegions(threshold).length}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .threshold-regions {

        .threshold-regions__row {
            display: flex;
            align-items: center;

            .threshold-regions__swatch {
                margin-right: 10px;
            }
        }
    }
</style>