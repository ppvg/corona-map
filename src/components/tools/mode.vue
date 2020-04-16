<script>
    import radio from "@/components/elements/radio";

    export default {
        name: 'mode',
        components: {
            radio
        },
        props: {},
        data() {
            return {
                modes: ['bubbles', 'particles']
            }
        },
        computed: {},
        methods: {
            isActive(mode) {
                return this.$store.state.settings.mode === mode;
            },
            setMode(mode) {
                this.$store.commit('settings/updateProperty', {key: 'mode', value: mode});
            }
        }
    }
</script>


<template>
    <div class="mode tool">
        <div
            v-for="mode in modes"
            @click="setMode(mode)"
            :class="{'radio__set--active': isActive(mode)}"
            class="radio__set">
            <radio/>
            <div class="radio___label">
                {{mode}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .mode {

    }
</style>