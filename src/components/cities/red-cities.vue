<script>
    import thresholds from '@/data/thresholds';
    import city from "./city";

    export default {
        name: 'red-cities',
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
            redCities() {
                return this.$store.state.cities.all.filter(city => {
                    return city.threshold === this.thresholds[this.thresholds.length - 1];
                }).sort((a,b) => (a.relativeIncreaseWeek < b.relativeIncreaseWeek) ? 1 : ((b.relativeIncreaseWeek < a.relativeIncreaseWeek) ? -1 : 0));
            },
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section red-cities">
        <div class="section__header">
            Gemeentes met meer dan {{n}} besmettingen per 100.000 inwoners
            in de laatste 7 dagen:
        </div>
        <div class="section__body">
            <div class="cities__list">
                <div
                    v-for="city in redCities"
                    class="city__container">
                    <city :city="city"/>
                    <div class="city__info">
                        ({{Math.round(city.relativeIncreaseWeek)}})
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