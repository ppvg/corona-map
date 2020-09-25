<script>
    export default {
        name: 'query',
        components: {},
        props: {},
        computed: {
            currentRegion() {
                return this.$store.state.ui.currentRegion;
            },
            routePath() {
                return window.location.href.split('#')[0];
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            query() {
                let query = '?';
                query += this.currentMap ? ('map=' + encodeURI(this.currentMap.title)) : '';
                if (this.currentRegion) {
                    if (this.currentMap) {
                        query += '&';
                    }
                    query += this.currentRegion ? ('region=' + encodeURI(this.currentRegion.title)) : '';
                }
                //console.log(this.currentRegion, query);
                return query;
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
                if (this.$route.name !== 'riool') {
                    this.updateQuery();
                }
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