<script>
    import cities from "./cities";

    export default {
        name: 'cities-panel',
        components: {
            cities
        },
        props: {},
        computed: {
            searchValue() {
                return this.$store.state.ui.searchValue;
            }
        },
        methods: {
            updateSearchValue(ev) {
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ev.target.value});
            }
        }
    }
</script>


<template>
    <div class="cities-panel">
        <input
            :value="searchValue"
            @keyup="updateSearchValue"
            placeholder="Zoek gemeente of klik op de kaart">
        <cities/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities-panel {

        input {
            width: 100%;
        }
    }
</style>