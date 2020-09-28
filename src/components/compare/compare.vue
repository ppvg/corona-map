<script>
    import compareItem from "./compare-item";

    export default {
        name: 'compare',
        components: {
            compareItem
        },
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="compare">
        <div class="compare__items">
            <compare-item
                :show-legend="true"/>
            <compare-item
                :show-legend="false"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .compare {
        height: 100%;

        .compare__items {
            height: 100%;
            display: flex;

            .compare-item {
                width: 50%;
                height: 100%;
            }
        }
    }
</style>