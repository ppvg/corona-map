<script>
    import newInfectionCities from "./new-infection-cities";
    import redCities from "./red-cities";
    import changedStatusCities from "./changed-status-cities";

    export default {
        name: 'trends',
        components: {
            newInfectionCities,
            redCities,
            changedStatusCities
        },
        props: {},
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