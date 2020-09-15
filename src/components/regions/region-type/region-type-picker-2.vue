<script>
    import City from "@/classes/City";
    import regionType from "./region-type";

    export default {
        name: 'region-type-picker-2',
        components: {
            regionType
        },
        computed: {
            types() {
                let city, store;
                city = this.city;
                store = this.$store;
                return [
                    {
                        label: 'Gemeente',
                        showRegion: false,
                        tag: 'city'
                    },
                    {
                        label: 'GGD',
                        showRegion: false,
                        tag: 'ggd'
                    },
                    {
                        label: 'Veiligheidsregio',
                        showRegion: false,
                        tag: 'sr'
                    },
                    {
                        label: 'Land',
                        showRegion: false,
                        tag: 'country'
                    }
                ]
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="region-type-picker-2">
        <region-type
            v-for="type in types"
            :type="type"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type-picker-2 {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        height: 24px;
        margin-top: 6px;
    }
</style>