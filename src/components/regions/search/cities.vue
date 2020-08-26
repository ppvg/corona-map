<script>
    import cityResult from "./city-result";

    export default {
        name: 'cities',
        components: {
            cityResult
        },
        props: {},
        computed: {
            searchValue() {
                return this.$store.state.ui.searchValue;
            },
            cities() {
                return this.$store.state.cities.all
                    .filter(city => this.searchValue.length > 0 && city.title.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
                    .sort((a,b) => (a.titleForSorting > b.titleForSorting) ? 1 : ((b.titleForSorting > a.titleForSorting) ? -1 : 0));
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="cities">
        <div
            v-if="cities.length > 0"
            class="cities__results">
            <city-result
                v-for="city in cities"
                :city="city"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities {
        position: relative;

        .cities__results {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            background: #fff;
            box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
            z-index: 2;
        }
    }
</style>