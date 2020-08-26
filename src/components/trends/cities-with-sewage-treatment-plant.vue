<script>
    import city from "@/components/trends/city";

    export default {
        name: 'cities-with-sewage-treatment-plant',
        components: {
            city
        },
        props: {},
        computed: {
            cities() {
                return this.$store.state.cities.all.filter(city => {
                    return this.$store.state.sewageTreatmentPlants.all.filter(s => {
                        return s.city_code === city.code;
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
                <city
                    v-for="city in cities"
                    :city="city"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities-with-sewage-treatment-plant {

    }
</style>