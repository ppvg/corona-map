<script>
    import newInfectionCities from "./new-infection-cities";
    import redCities from "./red-cities";
    import changedStatusCities from "./changed-status-cities";
    import thresholdCities from "./threshold-cities";
    import thresholds from '@/data/thresholds';
    import CitiesWithSewageTreatmentPlant
        from "./cities-with-sewage-treatment-plant";

    export default {
        name: 'trends',
        components: {
            CitiesWithSewageTreatmentPlant,
            thresholdCities,
            newInfectionCities,
            redCities,
            changedStatusCities
        },
        props: {},
        data() {
            return {
                thresholds: thresholds.thresholds
            }
        },
        computed: {
            showTrends() {
                return this.$store.state.ui.menu === 'trends';
            },
            isCurrent() {
                return this.$store.state.settings.currentDateOffset === 0;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="trends panel">
        <div v-if="isCurrent">
            <threshold-cities/>
            <red-cities/>
            <changed-status-cities/>
            <new-infection-cities/>
            <cities-with-sewage-treatment-plant/>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>