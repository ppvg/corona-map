<script>
    import newInfectionCities from "./new-infection-cities";
    import redCities from "./red-cities";
    import changedStatusCities from "./changed-status-cities";
    import thresholdCities from "./threshold-cities";
    import thresholdTools from '@/tools/thresholds';
    import citiesWithSewageTreatmentPlant from "./cities-with-sewage-treatment-plant";

    export default {
        name: 'trends',
        components: {
            citiesWithSewageTreatmentPlant,
            thresholdCities,
            newInfectionCities,
            redCities,
            changedStatusCities
        },
        props: {},
        data() {
            return {
                thresholds: thresholdTools.getThresholds()
            }
        },
        computed: {
            showTrends() {
                return this.$store.state.ui.menu === 'trends';
            },
            isCurrent() {
                return this.$store.state.settings.currentDateOffset < 2;
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
<!--  pas op, deze werkt niet met RIVM signaling system           -->
<!--            <new-infection-cities/>-->
            <cities-with-sewage-treatment-plant/>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>