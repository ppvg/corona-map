<script>
    import regionType from './region-type';
    import _Region from "@/classes/_Region";

    export default {
        name: 'region-relations',
        components: {
            regionType
        },
        props: {
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            types() {
                let region, store;
                region = this.region;
                store = this.$store;
                return [
                    {
                        label: 'Gemeente',
                        showRegion: true,
                        getRegion() {
                            return region;
                        },
                        tag: 'city'
                    },
                    {
                        label: 'GGD',
                        showRegion: true,
                        getRegion() {
                            return store.getters['ggds/getItemByProperty']('ggd_code', region.ggd_code, true);
                        },
                        tag: 'ggd'
                    },
                    // {
                    //     label: 'Veiligheidsregio',
                    //     getRegion() {
                    //         return store.getters['safetyRegions/getItemByProperty']('safetyRegion_code', city.safetyRegion_code, true);
                    //     },
                    //     tag: 'sr'
                    // },
                    {
                        label: 'Land',
                        showRegion: true,
                        getRegion() {
                            return store.getters['countries/getItemById'](region.country_id);
                        },
                        tag: 'country'
                    }
                ]
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-relations">
        <region-type
            v-for="type in types"
            :type="type"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-relations {
        display: flex;
        flex-wrap: wrap;
    }
</style>