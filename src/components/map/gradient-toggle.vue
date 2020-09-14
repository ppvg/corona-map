<script>
    export default {
        name: 'gradient-toggle',
        components: {},
        props: {},
        computed: {
            gradient: {
                get() {
                    return this.$store.state.settings.gradient;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'gradient', value: !this.gradient});
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="gradient-toggle">
        <input
            type="checkbox"
            v-model="gradient"/> Kleurverloop
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .gradient-toggle {
        pointer-events: all;
        display: flex;
        align-items: center;
        margin-top: 2px;
    }
</style>