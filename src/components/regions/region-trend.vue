<script>
    import _Region from "@/classes/_Region";
    import PositiveTests from "./tests/positive-tests";
    import thresholdTool from "@/tools/thresholds";

    export default {
        name: 'region-trend',
        components: {PositiveTests},
        props: {
            region: {
                type: _Region,
                required: true
            }
        },
        data() {
            return {
                verdicts: [
                    {
                        id: 1,
                        title: 'Veilig (indien BCO actief blijft)'
                    }, {
                        id: 2,
                        title: 'Waakzaam'
                    }, {
                        id: 3,
                        title: 'Ernstig, alle zeilen bijzetten om tij te keren'
                    }, {
                        id: 4,
                        title: 'Zeer ernstig'
                    }, {
                        id: 5,
                        title: 'Situatie lijkt onomkeerbaar, lockdown onafwendbaar'
                    },

                    // {
                    //     id: 6,
                    //     title: 'Grote problemen, maar dalende trend'
                    // }, {
                    //     id: 7,
                    //     title: 'Ernstig, maar dalende trend'
                    // },

                    {
                        id: 8,
                        title: 'NNB'
                    }
                ]
            }
        },
        computed: {
            verdict() {
                if (this.thresholdIndex === 0) {
                    return this.verdicts[0];
                } else if (
                    (this.thresholdIndex < 3 && this.citySize < 3)
                ) {
                    return this.verdicts[1];
                } else if (
                    (this.thresholdIndex === 3 && this.citySize === 1) ||
                    (this.thresholdIndex === 4 && this.citySize === 1) ||
                    (this.thresholdIndex === 3 && this.citySize > 1)
                ) {
                    return this.verdicts[2];
                } else if (this.thresholdIndex === 4 && this.change === 0) {
                    if (this.citySize === 3) {
                        return this.verdicts[4];
                    } else {
                        return this.verdicts[3];
                    }
                } else if (
                    (this.thresholdIndex === 5 && this.citySize === 1) ||
                    (this.thresholdIndex === 4 && this.citySize > 1)
                ) {
                    return this.verdicts[3];
                } else {
                    return this.verdicts[5];
                }
            },
            citySize() {
                let population = this.region.getTotalPopulation();
                if (population < 50000) {
                    return 1;
                } else if (population < 200000) {
                    return 2;
                } else {
                    return 3;
                }
            },
            thresholds() {
                return thresholdTool.getThresholds();
            },
            threshold() {
                return this.region.getThreshold();
            },
            thresholdIndex() {
                return this.thresholds.indexOf(this.threshold);
            },
            thresholdPreviousWeekIndex() {
                return this.thresholds.indexOf(this.region.getThreshold(7));
            },
            change() {
                return this.thresholdIndex - this.thresholdPreviousWeekIndex;
            },
            background() {
                return this.region.color;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-trend">
        <div class="region-trend__positive-tests">
            <positive-tests
                    :region="region"
                    :weeks="1"
                    :height="50"
                    :zoom="0.75"
                    :thresholds="false"
                    :padding-bottom="0"
                    :padding-right="0"/>
        </div>


        <div class="region-trend__verdict">
            {{verdict.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-trend {
        display: flex;

        .region-trend__positive-tests {
            background: #ddd;
            margin-bottom: 8px;
            margin-right: 8px;

            .positive-tests {

            }
        }
    }
</style>