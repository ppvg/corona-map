<script>
    export default {
        name: 'total-infections',
        components: {},
        props: {},
        computed: {
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            regions() {
                return this.$store.state[this.currentMap.module].all;
            },
            n() {
                let n = 0;
                for (let region of this.regions) {
                    n += region.increaseDay;
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