<script>
    import positiveTests from "./tests/positive-tests";
    import sewageTreatmentPlants from "../sewage-treatment-plants/sewage-treatment-plants";
    import ageDistributionGraph from "./case-characteristics/age-distribution-graph";
    import _Region from "@/classes/_Region";
    import loader from "@/components/elements/loader";
    import ageDistributionGraphNormalised from "./case-characteristics/age-distribution-graph-normalised/age-distribution-graph-normalised";
    import ageDistributionTools from "./case-characteristics/age-distribution-graph-normalised/age-distribution-tools";
    import regionRelations from "./region-type/region-relations";
    import AdministeredTests from "./tests/administered-tests";

    export default {
        name: 'region-details',
        components: {
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
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            regionOfFocus() {
                return this.$store.getters['ui/currentRegion'];
            },
            period1() {
                let start, end, total;
                total = 0;
                start = 0; end = 7;
                for (let i = start, l = end; i < l; i++){
                    total += this.city.report.history[i];
                }
                return total;
            },
            period2() {
                let start, end, total;
                total = 0;
                start = 7; end = 14;
                for (let i = start, l = end; i < l; i++){
                    total += this.city.report.history[i];
                }
                return total;
            },
            showDetails() {
                return this.$store.state.ui.menu === 'city';
            },
            caseDataLoaded() {
                return this.$store.state.ui.caseDataLoaded;
            },
            caseDataRequested() {
                return this.$store.state.ui.caseDataRequested;
            },
            date() {
                return this.$store.getters['ui/dateString'];
            },
            hasDays() {
                return this.$store.state.maps.current.settings.testDataInterval === 1;
            },
            hasSewageTreatmentPlants() {
                return this.$store.state.maps.current.settings.hasSewageTreatmentPlants;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            showRelations() {
                return this.currentMap.settings.showRelations;
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
    <div
        :class="{'panel--active': showDetails}"
        class="region-details panel">
        <div class="region-details__header">
            <div
                :style="{'background': region.color}"
                class="dot"></div>
            <div class="region-details__title">
                {{regionOfFocus.title}}
            </div>
        </div>
        <div class="region-details__info">
            <div class="region-details__section">
                <region-relations
                    v-if="showRelations"
                    :region="region"/>
            </div>
            <div
                v-if="(regionOfFocus.regionType === 'ggd') && caseDataRequested"
                class="region-details__section">
                <div class="region-details__section-header">
                    Leeftijdsverdeling (beta)
                </div>
                <div class="age-distribution-graph__container">
                    <age-distribution-graph-normalised
                        v-if="caseDataLoaded"
                        :region="regionOfFocus"/>
                    <loader v-else/>
                </div>
                <age-distribution-tools/>
            </div>
            <div class="region-details__section">
                <div class="region-details__section-header">
                    Testen GGD
                </div>
                <positive-tests
                    :region="regionOfFocus"/>

                <administered-tests
                    v-if="currentMap.settings.hasAdministeredTests"
                    :region="region"/>
            </div>
            <div
                v-if="hasSewageTreatmentPlants"
                class="region-details__section">
                <div class="region-details__row">
                    <sewage-treatment-plants
                        :region="regionOfFocus"/>
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        Inwoners
                    </div>
                    <div class="region-details__value">
                        {{regionOfFocus.getTotalPopulation()}}
                    </div>
                </div>
            </div>
            <div class="region-details__section">
                <div v-if="hasDays" class="region-details__row">
                    <div class="region-details__label">
                        Toename vandaag
                    </div>
                    <div class="region-details__value">
                        {{format(regionOfFocus.getTotalIncreaseDay())}}
                    </div>
                </div>
                <div v-if="hasDays" class="region-details__row">
                    <div class="region-details__label">
                        Relatieve toename vandaag (per 100 dzd inw)
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(regionOfFocus.getTotalRelativeIncreasDay()))}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        Toename laatste 7 dagen
                    </div>
                    <div class="region-details__value">
                        {{format(regionOfFocus.getTotalIncreaseWeek())}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        Relatieve toename laatste 7 dagen (per 100 dzd inw)
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(regionOfFocus.getTotalRelativeIncreaseWeek()))}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-details {
        font-size: 15px;
        position: relative;

        .region-details__header {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;

            .dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }

        .region-details__info {

            .region-details__section {
                border-bottom: 1px solid #ddd;
                padding: 10px 0;

                .region-details__section-header {
                    font-weight: 700;
                    margin-bottom: 4px;
                }
            }

            .region-details__row {
                display: flex;
                //align-items: center;
                padding: 2px 0;

                .region-details__label {
                    width: 200px;
                }

                .region-details__value {
                    font-weight: 700;
                    font-family: Courier;
                    font-size: 20px;
                    text-align: right;
                    width: calc(100% - 200px);
                    position: relative;
                }
            }
        }

        .age-distribution-graph__container {
            height: 352px;
            position: relative;
            background: #fff;
            margin-bottom: 12px;
        }

        @include mobile() {
            font-size: 12px;

            .region-details__header {
                margin-top: 16px;
            }

            .region-details__info {

                .region-details__row {

                    .region-details__label {
                        width: 160px;
                    }

                    .region-details__value {
                        font-size: 18px;
                        width: calc(100% - 160px);
                    }

                }
            }
        }
    }
</style>