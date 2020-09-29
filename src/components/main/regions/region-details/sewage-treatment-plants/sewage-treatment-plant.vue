<script>
    import SewageTreatmentPlant from "@/classes/SewageTreatmentPlant";
    import rnaLevelsGraph from "./rna-levels-graph";

    export default {
        name: 'sewage-treatment-plant',
        components: {
            rnaLevelsGraph
        },
        props: {
            sewageTreatmentPlant: {
                type: SewageTreatmentPlant,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="sewage-treatment-plant">
        <div class="sewage-treatment-plant__name">
            Locatie: {{sewageTreatmentPlant.name}}
        </div>
        <div class="sewage-treatment-plant__graph">
            <rna-levels-graph
                :sewage-treatment-plant="sewageTreatmentPlant"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-treatment-plant {

        .sewage-treatment-plant__name {
            margin-bottom: 4px;
        }
    }
</style>