<script>
    import City from "@/classes/City";
    import trendLine from "./trend-line";
    import sewerageGraph from "../sewerage/sewerage-graph";

    export default {
        name: 'city-details',
        components: {
            sewerageGraph,
            trendLine
        },
        props: ['city'],
        computed: {
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
        class="city-details panel">
        <div
            v-if="city"
            class="city-details__header">
            <div
                :style="{'background': city.color}"
                class="dot"></div>
            <div
                :title="city.population"
                class="city-details__title">
                {{city.title}}
            </div>
        </div>
        <div
            v-if="city"
            class="city-details__info">
            <div class="city-details__section">
                <div class="city-details__row">
                    <div class="city-details__label">
                        Toename vandaag
                    </div>
                    <div class="city-details__value">
                        {{format(city.increaseDay)}}
                    </div>
                </div>
                <div class="city-details__row">
                    <div class="city-details__label">
                        Toename laatste 7 dagen
                    </div>
                    <div class="city-details__value">
                        {{format(city.getIncreaseWeek())}}
                    </div>
                </div>
                <div class="city-details__row">
                    <div class="city-details__label">
                        Relatieve toename laatste 7 dagen (per 100 dzd inw)
                    </div>
                    <div class="city-details__value">
                        {{format(Math.round(city.getRelativeIncreaseWeek()))}}
                    </div>
                </div>
            </div>
            <div class="city-details__section">
                <div class="city-details__row">
                    <trend-line :city="city"/>
                </div>
            </div>
            <div class="city-details__section">
                <div class="city-details__row">
                    <sewerage-graph
                        v-if="city.type === 'sewerage-area'"
                        :sewerage-area="city"/>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .city-details {
        font-size: 15px;
        position: relative;

        .city-details__header {
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

        .city-details__info {

            .city-details__section {
                margin-bottom: 20px;
            }

            .city-details__row {
                display: flex;
                //align-items: center;
                padding: 2px 0;

                .city-details__label {
                    width: 220px;
                }

                .city-details__value {
                    font-weight: 700;
                    font-family: Courier;
                    font-size: 20px;
                    text-align: right;
                    width: calc(100% - 220px);
                    position: relative;
                }
            }
        }

        @include mobile() {
            font-size: 12px;

            .city-details__header {
                margin-top: 16px;
            }

            .city-details__info {

                .city-details__row {

                    .city-details__label {
                        width: 160px;
                    }

                    .city-details__value {
                        font-size: 18px;
                        width: calc(100% - 160px);
                    }

                }
            }
        }
    }
</style>