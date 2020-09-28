<script>
    import compareItem from "./compare-item";
    import dateTools from '@/tools/date';

    export default {
        name: 'compare',
        components: {
            compareItem
        },
        props: {},
        data(){
            return {
                date1: null,
                date2: null,
                offsetAdministration: {
                    '1': null,
                    '2': null
                }
            }
        },
        computed: {
            routePath() {
                return window.location.href.split('#')[0];
            }
        },
        methods: {
            getDates() {
                let today, fourWeeksBack;
                today = dateTools.formatDate(this.$store.state.ui.today);
                fourWeeksBack = dateTools.formatDate( dateTools.getDateByOffset(28));
                if (this.$route.query.date1) {
                    this.date1 = this.$route.query.date1;
                } else {
                    this.date1 = fourWeeksBack;
                }
                if (this.$route.query.date2) {
                    this.date2 = this.$route.query.date2;
                } else {
                    this.date2 = today;
                }
            },
            administrateOffset(i, offset) {
                this.offsetAdministration[i] = offset;
            },
            updateQuery() {
                let url, date1, date2;
                date1 = dateTools.formatDate( dateTools.getDateByOffset(this.offsetAdministration['1']));
                date2 = dateTools.formatDate( dateTools.getDateByOffset(this.offsetAdministration['2']));
                url = this.routePath + '#/vergelijk?date1=' + date1 + '&date2=' + date2;
                history.pushState(
                    {},
                    null,
                    url
                );
            }
        },
        mounted() {
            this.getDates();
        }
    }
</script>


<template>
    <div class="compare">
        <div class="compare__items">
            <compare-item
                v-if="date1"
                :show-legend="true"
                :date-string="date1"
                :i="1"/>
            <compare-item
                v-if="date2"
                :show-legend="false"
                :date-string="date2"
                :i="2"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .compare {
        height: 100%;

        .compare__items {
            height: 100%;
            display: flex;

            .compare-item {
                width: 50%;
                height: 100%;
            }
        }
    }
</style>