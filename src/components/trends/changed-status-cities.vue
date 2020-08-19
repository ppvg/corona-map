<script>
    import thresholds from '@/data/thresholds';
    import city from "@/components/cities/city";

    export default {
        name: 'changed-status-cities',
        components: {
            city
        },
        props: {},
        data() {
            return {
                thresholds: thresholds.thresholds
            }
        },
        computed: {
            areaName() {
                return this.$store.getters['areaName']
            },
            areas() {
                return this.$store.getters['areas']
            },
            sets(){
                return this.thresholds.slice().reverse().map(threshold => {
                    return this.areas.filter(area => {
                        return area.changedStatus && area.getThreshold() === threshold
                    }).map(area => {
                        let previousThreshold, mutation;
                        previousThreshold = area.getThreshold(1);
                        if (threshold.n > previousThreshold.n) {
                            mutation = '↑';
                        } else {
                            mutation = '↓'
                        }
                        return {
                            area,
                            mutation
                        }
                    })
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section changed-status-cities">
        <div class="section__header">
            {{areaName}} die van status veranderd zijn
        </div>
        <div class="section__body">
            <div
                v-for="set in sets"
                v-if="set.length > 0"
                class="cities__list">
                <div
                    v-for="item in set"
                    class="city__container">
                    <city :city="item.area"/>
                    <div
                        v-if="item.mutation === '↓'"
                        class="city__mutation">
                        ({{item.mutation}})
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .section {
        margin-bottom: 20px;

        .section__header {
            margin-bottom: 6px;
            font-weight: 700;
        }
    }
</style>