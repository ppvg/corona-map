<script>
    export default {
        name: 'color-set-picker',
        components: {},
        props: {},
        data() {
            return {
                colorSets: [
                    {
                        label: 'Stoplicht',
                        value: 'regular'
                    }, {
                        label: 'Kleurenblind (?)',
                        value: 'colorblind1'
                    }, {
                        label: 'Verloop 1',
                        value: 'colorblind2'
                    }, {
                        label: 'Verloop 2',
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
        pointer-events: all;
    }
</style>