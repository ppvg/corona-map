<script>
    import city from "./city";

    export default {
        name: 'cities',
        components: {
            city
        },
        props: {},
        computed: {
            cities() {
                return this.$store.state.cities.all
                    .sort((a,b) => (a.titleForSorting > b.titleForSorting) ? 1 : ((b.titleForSorting > a.titleForSorting) ? -1 : 0));
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="cities">
        <city
            v-for="city in cities"
            :city="city"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities {

    }
</style>