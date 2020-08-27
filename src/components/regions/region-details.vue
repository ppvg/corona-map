<script>
    import City from "@/classes/City";
    import testGraph from "./tests/test-graph";
    import sewageTreatmentPlants from "../sewage-treatment-plants/sewage-treatment-plants";
    import caseCharacteristics from "./case-characteristics/case-characteristics";
    import RegionTypePicker from "./region-type-picker";
    import _Region from "@/classes/_Region";

    export default {
        name: 'region-details',
        components: {
            RegionTypePicker,
            caseCharacteristics,
            sewageTreatmentPlants,
            testGraph
        },
        props: {
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            city() {
                return this.$store.state.ui.currentCity;
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
                {{region.title}}
            </div>
        </div>
        <div class="region-details__info">
            <div class="region-details__section">
                <region-type-picker
                    :city="city"/>
            </div>
<!--            <div class="region-details__section">-->
<!--                <case-characteristics-->
<!--                    :city="city"/>-->
<!--            </div>-->
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        Inwoners
                    </div>
                    <div class="region-details__value">
                        {{region.getTotalPopulation()}}
                    </div>
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__row">
                    <div class="region-details__label">
                        Toename vandaag
                    </div>
                    <div class="region-details__value">
                        {{format(region.getTotalIncreaseDay())}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        Toename laatste 7 dagen
                    </div>
                    <div class="region-details__value">
                        {{format(region.getTotalIncreaseWeek())}}
                    </div>
                </div>
                <div class="region-details__row">
                    <div class="region-details__label">
                        Relatieve toename laatste 7 dagen (per 100 dzd inw)
                    </div>
                    <div class="region-details__value">
                        {{format(Math.round(region.getTotalRelativeIncreaseWeek()))}}
                    </div>
                </div>
            </div>
            <div class="region-details__section">
                <div class="region-details__section-header">
                    Testen GGD
                </div>
                <test-graph :region="region"/>
            </div>
            <div
                v-if="region.regionType === 'city'"
                class="region-details__section">
                <div class="region-details__row">
                    <sewage-treatment-plants
                        :city="region"/>
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