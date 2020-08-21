<script>
    import City from "@/classes/City";
    import sewageTreatmentPlant from "./sewage-treatment-plant";

    export default {
        name: 'sewage-treatment-plants',
        components: {
            sewageTreatmentPlant
        },
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            sewageTreatmentPlants() {
                return this.$store.state.sewageTreatmentPlants.all.filter(s => {
                    return s.city_code === this.city.code;
                })
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-treatment-plants">
        <div class="city-details__section-header">
            Rioolmetingen RIVM
        </div>
        <div class="sewage-treatment-plants__list">
            <sewage-treatment-plant
                v-for="sewageTreatmentPlant in sewageTreatmentPlants"
                :sewage-treatment-plant="sewageTreatmentPlant"/>
        </div>


        <div
            v-if="sewageTreatmentPlants.length === 0"
            class="sewage-treatment-plants__note">
            Nog geen riooldata voor deze gemeente. Per 1 september volgen meer locaties (RIVM).
        </div>
        <div
            v-else
            class="sewage-treatment-plants__note">
            Note: het gebruik van de rioolmetingen-grafieken is nog experimenteeel.<br>
            We kijken nog naar de schaal van de grafieken en de koppeling van riool-meting-locatie aan
            een gemeente is op dit moment nog gedaan obv enkele aannames.
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-treatment-plants {

        .sewage-treatment-plants__list {
            margin-bottom: 10px;
        }

        .sewage-treatment-plants__note {
            margin-bottom: 8px;
            font-style: italic;
            font-size: 11px;
        }
    }
</style>