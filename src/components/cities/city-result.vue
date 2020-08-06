<script>
    import City from "@/classes/City";

    export default {
        name: 'city-result',
        components: {},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {},
        methods: {
            selectCity() {
                this.$store.commit('ui/updateProperty', {key: 'currentCity', value: this.city});
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="selectCity()"
        class="city-result">
        {{city.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .city-result {
        border-bottom: 1px solid $grey-1;
        padding: 14px 10px;
        cursor: pointer;

        &:hover {
            background: $grey-1;
        }
    }
</style>