<script>
    import thresholds from '@/data/thresholds';
    import city from "./city";

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
            sets(){
                return this.thresholds.slice().reverse().map(threshold => {
                    return this.$store.state.cities.all.filter(city => {
                        return city.changedStatus && city.getThreshold() === threshold
                    }).map(city => {
                        let previousThreshold, mutation;
                        previousThreshold = city.getThreshold(1);
                        if (threshold.n > previousThreshold.n) {
                            mutation = '↑';
                        } else {
                            mutation = '↓'
                        }
                        return {
                            city,
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
            Gemeentes die van status veranderd zijn
        </div>
        <div class="section__body">
            <div
                v-for="set in sets"
                class="cities__list">
                <div
                    v-for="item in set"
                    class="city__container">
                    <city :city="item.city"/>
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