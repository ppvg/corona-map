<script>
    import City from "@/classes/City";

    export default {
        name: 'city',
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
        class="city">
        {{city.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .city {
        border-bottom: 1px solid $grey-1;
        padding: 6px 10px;
        cursor: pointer;

        &:hover {
            background: $grey-1;
        }
    }
</style>