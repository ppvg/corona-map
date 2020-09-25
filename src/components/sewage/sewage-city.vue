<script>
    import City from "@/classes/City";
    import sewageCityPositiveTests from "./sewage-city-positive-tests";
    import sewageCitySewage from "./sewage-city-sewage";

    export default {
        name: 'sewage-city',
        components: {
            sewageCitySewage,
            sewageCityPositiveTests
        },
        props: {
            city: {
                type: City,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            sewages() {
                return this.$store.state.sewageTreatmentPlants.all.filter(s => {
                    return s.city_code === this.city.identifier;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-city">
        <div class="sewage-city__title">
            {{city.title}}
        </div>
        <div class="sewage-city__content">
            <sewage-city-positive-tests
                    :city="city"
                    :settings="settings"/>

            <sewage-city-sewage
                v-for="sewage in sewages"
                :sewage="sewage"
                :city="city"
                :settings="settings"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-city {
        display: flex;
        border-bottom: 1px solid #000;
        padding: 4px 0;

        .sewage-city__title {
            width: 100px;
            padding: 10px;
        }

        &:last-child {
            border-bottom: 0;
        }
    }
</style>