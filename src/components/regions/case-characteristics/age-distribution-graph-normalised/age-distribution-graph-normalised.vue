<script>
    import GGD from "@/classes/GGD";
    import Country from "@/classes/Country";
    import ageGroups from "@/data/age-groups";
    import ageGroup from "./age-group";

    export default {
        name: 'age-distribution-graph-normalised',
        components: {
            ageGroup
        },
        data() {
            return {
                ageGroups: ageGroups.slice().reverse()
            }
        },
        props: {
            region: {
                type: GGD | Country,
                required: true
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="age-distribution-graph-normalised">
        <age-group
            v-for="ageGroup in ageGroups"
            :age-group="ageGroup"
            :region="region"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-graph-normalised {

    }
</style>