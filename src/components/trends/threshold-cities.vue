<script>
    import thresholds from '@/data/thresholds';
    import city from "@/components/cities/city";
    import Swatch from "../cities/swatch";

    export default {
        name: 'threshold-cities',
        components: {
            Swatch,
            city
        },
        data() {
            return {
                thresholds: thresholds.thresholds.slice().reverse()
            }
        },
        computed: {
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            areaName() {
                return this.$store.getters['areaName']
            },
            areas() {
                return this.$store.getters['areas']
            }
        },
        methods: {
            getAreas(threshold) {
                return this.areas.filter(city => {
                    return city.getThreshold() === threshold;
                }).sort((a,b) => (a.getRelativeIncreaseWeek() < b.getRelativeIncreaseWeek()) ? 1 : ((b.getRelativeIncreaseWeek() < a.getRelativeIncreaseWeek()) ? -1 : 0));
            },
        }
    }
</script>


<template>
    <div class="section threshold-cities">
        <div class="section__header">
            Aantal {{areaName}} per signaalwaarde
        </div>
        <div class="section__body">
            <div
                v-for="threshold in thresholds"
                class="threshold-cities__row">
                <div class="threshold-cities__swatch">
                    <swatch :threshold="threshold"/>
                </div>
                <div class="threshold-cities__label">
                    {{getAreas(threshold).length}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .threshold-cities {

        .threshold-cities__row {
            display: flex;
            align-items: center;

            .threshold-cities__swatch {
                margin-right: 10px;
            }
        }
    }
</style>