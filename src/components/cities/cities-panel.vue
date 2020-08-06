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
            },
            hoverValue() {
                return this.$store.state.ui.hoverValue;
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
        <div
            v-if="hoverValue.length > 0"
            class="hover-value">{{hoverValue}}</div>
        <cities/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities-panel {
        position: relative;

        input {
            width: 100%;
        }

        .hover-value {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 36px;
            background: #ddd;
            padding: 10px;
            display: flex;
            align-items: center;
            z-index: 1;
        }
    }
</style>