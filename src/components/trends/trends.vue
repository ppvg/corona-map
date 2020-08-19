<script>
    import newInfectionCities from "./new-infection-cities";
    import redCities from "./red-cities";
    import changedStatusCities from "./changed-status-cities";
    import thresholdCities from "./threshold-cities";
    import thresholds from '@/data/thresholds';

    export default {
        name: 'trends',
        components: {
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
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :class="{'panel--active': showTrends}"
        class="trends panel">
        <threshold-cities/>
        <red-cities/>
        <changed-status-cities/>
        <new-infection-cities/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>