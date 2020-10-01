<script>
    import View from "@/classes/View";
    import redRegions from "./red-regions";
    import thresholdRegions from "./threshold-regions";
    import thresholdTools from '@/tools/thresholds';
    import citiesWithSewageTreatmentPlant from "./cities-with-sewage-treatment-plant";

    export default {
        name: 'trends',
        components: {
            citiesWithSewageTreatmentPlant,
            thresholdRegions,
            redRegions,
        },
        props: {
            view: {
                type: View,
                required: true
            }
        },
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
                return this.view.offset < 2;
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
            <threshold-regions
                :view="view"/>
            <red-regions
                :view="view"/>
        </div>
        <cities-with-sewage-treatment-plant
            v-if="isAdmin"
            :view="view"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trends {

    }
</style>