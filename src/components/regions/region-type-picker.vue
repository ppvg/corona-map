<script>
    import City from "@/classes/City";
    import regionType from './region-type';

    export default {
        name: 'region-type-picker',
        components: {
            regionType
        },
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            types() {
                let city, store;
                city = this.city;
                store = this.$store;
                return [
                    {
                        label: 'Gemeente',
                        getRegion() {
                            return city;
                        },
                        tag: 'city'
                    },
                    {
                        label: 'GGD',
                        getRegion() {
                            return store.getters['ggds/getItemByProperty']('ggd_code', city.ggd_code, true);
                        },
                        tag: 'ggd'
                    },
                    // {
                    //     label: 'Veiligheidsregio',
                    //     getRegion() {
                    //         return store.getters['safetyRegions/getItemByProperty']('safetyRegion_code', city.safetyRegion_code, true);
                    //     },
                    //     tag: 'sr'
                    // }
                ]
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-type-picker">
        <region-type
            v-for="type in types"
            :type="type"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type-picker {
        display: flex;
        flex-wrap: wrap;
    }
</style>