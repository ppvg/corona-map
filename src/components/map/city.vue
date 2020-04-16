<script>
    import City from '@/classes/City';
    import postcode from "./postcode";
    import particle from "./particle";

    export default {
        name: 'city',
        components: {
            particle,
            postcode
        },
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            isParticles() {
                return this.$store.state.settings.mode === 'particles';
            }
        },
        methods: {}
    }
</script>


<template>
    <g class="city">
        <postcode
            v-for="(postcode, index) in city.postcodes"
            :city="city"
            :postcode="postcode"
            :index="index"/>


        <particle
                v-show="isParticles"
                v-for="admission in city.hospitalAdmissions"
                :admission="admission"
                :city="city"/>
    </g>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .city {

    }
</style>