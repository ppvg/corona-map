<script>
    import thresholds from '@/data/thresholds';
    import city from "@/components/cities/city";

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
            areaName() {
                return this.$store.getters['areaName'];
            },
            areas() {
                return this.$store.getters['areas'];
            },
            redCities() {
                return this.areas.filter(area => {
                    return area.getThreshold() === thresholds.thresholds[thresholds.thresholds.length - 1];
                }).sort((a,b) => (a.getRelativeIncreaseWeek() < b.getRelativeIncreaseWeek()) ? 1 : ((b.getRelativeIncreaseWeek() < a.getRelativeIncreaseWeek()) ? -1 : 0));
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
            {{areaName}} met meer dan {{n}} besmettingen per 100.000 inwoners
            in de laatste 7 dagen:
        </div>
        <div class="section__body">
            <div
                v-if="redCities.length > 0"
                class="cities__list">
                <div
                    v-for="city in redCities"
                    class="city__container">
                    <city :city="city"/>
                    <div class="city__info">
                        ({{Math.round(city.getRelativeIncreaseWeek())}})
                    </div>
                </div>
            </div>
            <div v-else>
                Geen
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