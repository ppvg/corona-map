<script>
    import city from "@/components/trends/city";

    export default {
        name: 'new-infection-cities',
        components: {
            city
        },
        props: {},
        computed: {
            newInfectionCities() {
                return this.$store.state.cities.all.filter(city => {
                    return city.hasNewInfection;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section new-infection-cities">
        <div class="section__header">
            Gemeentes met 0 besmettingen vorige week waar deze week een nieuwe
            besmetting is geconstateerd:
        </div>
        <div class="section__body">
            <div class="cities__list">
                <city
                    v-for="city in newInfectionCities"
                    :city="city"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .new-infection-cities {

    }
</style>