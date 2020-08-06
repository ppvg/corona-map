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
                })
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
            Gemeentes met meer dan {{n}} besmetting per 100.000 duizend inwoners
            in de laatste 7 dagen:
        </div>
        <div class="section__body">
            <div class="cities__list">
                <city
                v-for="city in redCities"
                :city="city"/>
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