<script>
    import swatch from "../elements/swatch";
    export default {
        name: 'region-type',
        components: {
            swatch
        },
        props: {
            type: {
                type: Object,
                required: true
            }
        },
        computed: {
            isActive() {
                return this.$store.state.ui.currentRegionType === this.type.tag;
            }
        },
        methods: {
            select() {
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.type.tag});
            }
        }
    }
</script>


<template>
    <div
        @click="select()"
        :class="{'region-type--current': isActive}"
        class="region-type">
        <swatch
            :threshold="type.getRegion().getThreshold()"/>
        <div class="region-type__value">
            {{type.getRegion().title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .region-type {
        display: flex;
        align-items: center;
        font-size: 10px;
        margin-right: 12px;
        border-bottom: 1px solid transparent;
        cursor: pointer;
        position: relative;

        &:after {
            content: '»';
            position: absolute;
            right: -8px;
        }

        &:last-child {
            margin-right: 0;

            &:after {
                display: none;
            }
        }

        .region-type__label {
            margin-right: 3px;
        }

        &.region-type--current {
            border-bottom: 1px solid #000;
        }
    }
</style>