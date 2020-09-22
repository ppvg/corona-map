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
            currentMap() {
                return this.$store.state.maps.current;
            },
            types() {
                let region, store, levels;
                region = this.region;
                store = this.$store;
                levels = [
                    {
                        label: 'Stadsdeel',
                        showRegion: true,
                        getRegion() {
                            return region;
                        },
                        tag: 'district'
                    }, {
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
                    {
                        label: 'Veiligheidsregio',
                        showRegion: true,
                        getRegion() {
                            return store.getters['safetyRegions/getItemByProperty']('safetyRegion_code', region.safetyRegion_code, true);
                        },
                        tag: 'safety-region'
                    },
                    {
                        label: 'Provincie',
                        showRegion: true,
                        getRegion() {
                            return store.getters['provinces/getItemByProperty']('province_code', region.province_code, true);
                        },
                        tag: 'province'
                    },
                    {
                        label: 'Land',
                        showRegion: true,
                        getRegion() {
                            return store.getters['countries/getItemById'](region.country_id);
                        },
                        tag: 'country'
                    }
                ];
                return levels.filter(level => {
                    return this.currentMap.settings.regionTypes.indexOf(level.tag) > -1;
                })
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
        align-items: flex-start;
        height: 30px;
    }
</style>