<script>
    import newInfectionCities from "./new-infection-cities";
    import redRegions from "./red-regions";
    import changedStatusRegions from "./changed-status-regions";
    import thresholdRegions from "./threshold-regions";
    import thresholdTools from '@/tools/thresholds';
    import citiesWithSewageTreatmentPlant from "./cities-with-sewage-treatment-plant";

    export default {
        name: 'trends',
        components: {
            citiesWithSewageTreatmentPlant,
            thresholdRegions,
            newInfectionCities,
            redRegions,
            changedStatusRegions
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
            show() {
                return this.$store.state.settings.currentDateOffset < 2;
            },
            isAdmin() {
                return this.$store.state.ui.admin;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="trends panel">
        <div v-if="show">
            
            <threshold-regions/>
            <red-regions/>
<!--            <changed-status-regions/>-->
<!--            <new-infection-cities/>-->
            <cities-with-sewage-treatment-plant v-if="isAdmin"/>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>