<script>
    import _Region from "@/classes/_Region";
    import View from "@/classes/View";

    import positiveTests from "./tests/positive-tests";
    import sewageTreatmentPlants from "./sewage-treatment-plants/sewage-treatment-plants";
    import ageDistributionGraph from "./case-characteristics/age-distribution-graph";
    import ageDistributionGraphNormalised from "./case-characteristics/age-distribution-graph-normalised/age-distribution-graph-normalised";
    import ageDistributionTools from "./case-characteristics/age-distribution-graph-normalised/age-distribution-tools";
    import regionRelations from "./../region-type/region-relations";
    import AdministeredTests from "./tests/administered-tests";
    import regionTrend from "./region-trend";

    import loader from "@/components/elements/loader";
    import RegionDetailsHead from "./region-details-head";

    export default {
        name: 'region-details-short',
        components: {
            RegionDetailsHead,
            regionTrend,
            AdministeredTests,
            regionRelations,
            ageDistributionTools,
            ageDistributionGraphNormalised,
            loader,
            ageDistributionGraph,
            sewageTreatmentPlants,
            positiveTests
        },
        props: {
            view: {
                type: View,
                required: true
            },
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            showTrend() {
                return this.$store.state.signalingSystems.current.title === 'WHO' && this.currentMap.settings.testDataInterval * this.$store.state.settings.historyLength >= 14 ;
            },
            regionOfFocus() {
                return this.$store.getters['ui/getRegionOfFocus'](this.region);
            },
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {
            format(value) {
                if (value > 0) {
                    return '+' + value;
                } else {
                    return value;
                }
            }
        }
    }
</script>


<template>
    <div class="region-details">
        <div class="region-card">
            <region-details-head
                :view="view"
                :region="regionOfFocus"/>

            <region-trend
                v-if="showTrend"
                :view="view"
                :region="regionOfFocus"
                :show-verdict="false"/>


            <div class="region-details__info">
                <div class="region-details__section">
                    <div class="region-details__row">
                        <div class="region-details__label">
                            Inwoners
                        </div>
                        <div class="region-details__value">
                            {{regionOfFocus.getTotalPopulation()}}
                        </div>
                    </div>
                    <div class="region-details__row">
                        <div class="region-details__label">
                            Relatieve toename laatste 7 dagen (per 100.000 inw)
                        </div>
                        <div class="region-details__value">
                            {{format(Math.round(regionOfFocus.getTotalRelativeIncreaseWeek(view.offset)))}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

</style>