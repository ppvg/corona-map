<script>
    import city from "@/components/trends/city";
    import swatch from "@/components/elements/swatch";

    export default {
        name: 'threshold-cities',
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
            type() {
                switch(this.$store.state.ui.currentRegionType) {
                    case 'city':
                        return 'gemeentes';
                    case 'ggd':
                        return 'ggds';
                    case 'sr':
                        return "veiligheidsregio's";
                    case 'country':
                        return "landen";
                }
            }
        },
        methods: {
            getRegions(threshold) {
                let regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    return region.getThreshold() === threshold;
                }).sort((a,b) => (a.getTotalRelativeIncreaseWeek() < b.getTotalRelativeIncreaseWeek()) ? 1 : ((b.getTotalRelativeIncreaseWeek() < a.getTotalRelativeIncreaseWeek()) ? -1 : 0));
            },
        }
    }
</script>


<template>
    <div class="section threshold-cities">
        <div class="section__header">
            Aantal {{type}} per signaalwaarde
        </div>
        <div class="section__body">
            <div
                v-for="threshold in thresholds"
                class="threshold-cities__row">
                <div class="threshold-cities__swatch">
                    <swatch :threshold="threshold"/>
                </div>
                <div class="threshold-cities__label">
                    {{getRegions(threshold).length}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .threshold-cities {

        .threshold-cities__row {
            display: flex;
            align-items: center;

            .threshold-cities__swatch {
                margin-right: 10px;
            }
        }
    }
</style>