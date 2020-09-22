<script>
    import region from "@/components/trends/region";

    export default {
        name: 'cities-with-sewage-treatment-plant',
        components: {
            region
        },
        props: {},
        computed: {
            regions() {
                return this.$store.state.cities.all.filter(city => {
                    return this.$store.state.sewageTreatmentPlants.all.filter(s => {
                        return s.city_code === city.identifier;
                    }).length > 0;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section cities-with-sewage-treatment-plant">
        <div class="section__header">
            Gemeentes met een rioolmeting
        </div>
        <div class="section__body">
            <div class="cities__list">
                <region
                    v-for="region in regions"
                    :region="region"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities-with-sewage-treatment-plant {

    }
</style>