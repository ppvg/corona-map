<script>
    import mapNetherlands from "./components/map/map";
    import tools from "./components/tools/tools";
    import cities from '@/data/areas.json';
    import CitiesPanel from "./components/cities/cities-panel";

    export default {
        name: 'app',
        components: {
            CitiesPanel,
            tools,
            mapNetherlands
        },
        props: {},
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            }
        },
        methods: {
            init() {
                let wh, ratio;
                wh = window.innerHeight - 100;
                ratio = wh / 500;
                this.$store.commit('settings/updateProperty', {key: 'canvasHeight', value: wh});
                this.$store.commit('settings/updateProperty', {key: 'canvasWidth', value: ratio * 400});
                this.$store.commit('settings/updateProperty', {key: 'zoom', value: ratio * 145});

                this.loadCsv();
            },
            loadCsv() {
                this.$store.commit('cities/init', cities.features);
                this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
            },

        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="app">
        <map-netherlands v-if="dataLoaded"/>
        <cities-panel v-if="dataLoaded"/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .app {
        display: flex;
    }
</style>