<script>
    export default {
        name: 'query',
        components: {},
        props: {},
        computed: {
            currentCity() {
                return this.$store.state.ui.currentCity;
            },
            routePath() {
                return window.location.href.split('#')[0];
            },
            query() {
                return this.currentCity ? '?city=' + encodeURI(this.currentCity.title) : ''
            },
            url() {
                return this.routePath + '#/' + this.query;
            },
        },
        methods: {
            updateQuery() {
                history.pushState(
                    {},
                    null,
                    this.url
                );
            }
        },
        watch: {
            query: function () {
                this.updateQuery();
            }
        }
    }
</script>


<template>
    <div class="query"></div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';
</style>