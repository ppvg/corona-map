<script>
    export default {
        name: 'color-set-picker',
        components: {},
        props: {},
        data() {
            return {
                colorSets: [
                    {
                        label: 'Standaard',
                        value: 'regular'
                    }, {
                        label: 'Variant 1',
                        value: 'colorblind1'
                    }, {
                        label: 'Variant 2',
                        value: 'colorblind2'
                    }, {
                        label: 'Variant 3',
                        value: 'variant3'
                    }
                ]
            }
        },
        computed: {
            activeColorSet: {
                get() {
                    return this.$store.state.ui.color;
                },
                set(value) {
                    this.$store.commit('ui/updateProperty', {key: 'color', value});

                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="color-set-picker">
        <select
            v-model="activeColorSet">
            <option
                v-for="colorSet in colorSets"
                :value="colorSet.value">
                {{colorSet.label}}
            </option>
        </select>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .color-set-picker {
        margin-top: 12px;
        display: flex;
        align-items: center;
        pointer-events: all;

        input {
            margin-right: 4px;
            margin-left: 0;

        }
    }
</style>