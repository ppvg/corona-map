<script>
    import city from "@/components/cities/city";

    export default {
        name: 'new-infection-cities',
        components: {
            city
        },
        props: {},
        computed: {
            areaName() {
                return this.$store.getters['areaName']
            },
            areas() {
                return this.$store.getters['areas']
            },
            newInfectionCities() {
                return this.areas.filter(area => {
                    return area.hasNewInfection;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="section new-infection-cities">
        <div class="section__header">
            {{areaName}} met 0 besmettingen vorige week waar deze week een nieuwe
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