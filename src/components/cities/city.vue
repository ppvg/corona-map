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
        methods: {}
    }
</script>


<template>
    <div class="city">
        {{city.title}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .city {
        border-bottom: 1px solid $grey-1;
        padding: 2px;
        cursor: pointer;

        &:hover {
            background: $grey-1;
        }
    }
</style>