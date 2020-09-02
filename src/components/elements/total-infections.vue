<script>
    export default {
        name: 'total-infections',
        components: {},
        props: {},
        computed: {
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            cities() {
                return this.$store.state.cities.all;
            },
            n() {
                let n = 0;
                for (let city of this.cities) {
                    n += city.increaseDay;
                }
                return n;
            }
        },
        methods: {}
    }
</script>


<template>
    <span class="total-infections">
        (+{{n}})
    </span>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .total-infections {

    }
</style>