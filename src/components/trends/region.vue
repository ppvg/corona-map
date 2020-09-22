<script>
    import _Region from "@/classes/_Region";
    import swatch from "@/components/elements/swatch";

    export default {
        name: 'region',
        components: {
            swatch
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
            }
        },
        methods: {
            selectRegion() {
                if (this.region.regionType === 'city' || this.region.regionType === 'district') {
                    this.$store.commit(this.currentMap.module + '/setCurrent', this.region);
                }
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="selectRegion()"
        class="region">
        <swatch :threshold="region.getThreshold()"/>

        <div class="region__title">
            {{region.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .regions__list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        .region__container {
            display: flex;
            align-items: center;
            margin-right: 4px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .region {
        display: flex;
        align-items: center;
        margin-right: 4px;
        cursor: pointer;

        &:last-child {
            margin-right: 0;
        }
    }
</style>