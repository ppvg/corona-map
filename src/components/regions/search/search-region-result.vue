<script>
    import _Region from "@/classes/_Region";

    export default {
        name: 'search-region-result',
        components: {},
        props: {
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {
            select() {
                this.$store.commit(this.currentMap.module + '/setCurrent', this.region);
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
                this.$store.commit('ui/updateProperty', {key: 'menu', value: 'city'});
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        class="search-region-result">
        {{region.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .search-region-result {
        border-bottom: 1px solid $grey-1;
        padding: 14px 10px;
        cursor: pointer;

        &:hover {
            background: $grey-1;
        }
    }
</style>