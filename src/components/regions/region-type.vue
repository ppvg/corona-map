<script>
    import swatch from "../elements/swatch";
    import $ from "jquery";
    import jqueryCsv from "jquery-csv";


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
            },
            caseDataRequested() {
                return this.$store.state.ui.caseDataRequested;
            },
            ggds() {
                return this.$store.state.ggds.all;
            }
        },
        methods: {
            select() {
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.type.tag});
                if (this.type.tag === 'ggd' && !this.caseDataRequested){
                    this.loadCaseData();
                }
            },
            loadCaseData() {
                let url = window.config.casesDataUrl + 'COVID-19_casus_landelijk.csv';
                this.$store.commit('ui/updateProperty', {key: 'caseDataRequested', value: true});
                console.log('loading case data');

                $.get(url, (data) => {
                    let options = {separator : ';'};
                    jqueryCsv.toObjects(data, options, (error, result) => {
                        this.sortEntries(result);
                    });
                });
            },
            sortEntries(entries) {
                let ggds = this.ggds.map(ggd => {
                    return {title: ggd.title, report: []};
                });

                function getGgd(title) {
                    return ggds.find(ggd => ggd.title === title);
                }

                function getDay(ggd, date) {
                    let day = ggd.report.find(day => day.date === date);
                    if (!day) {
                        day = {
                            date: date,
                            total: 0,
                            ageGroups: []};
                        ggd.report.push(day);
                    }
                    return day;
                }

                function findAgeGroup(day, ageGroupTitle) {
                    let ageGroup = day.ageGroups.find(ageGroup => ageGroup.title === ageGroupTitle);
                    if (!ageGroup) {
                        ageGroup = {title: ageGroupTitle, cases: 0};
                        day.ageGroups.push(ageGroup);
                    }
                    return ageGroup;
                }

                function addPercentages(ggd) {
                    for (let day of ggd.report) {
                        for (let ageGroup of day.ageGroups) {
                            ageGroup.percentage = ageGroup.cases / day.total;
                        }
                    }
                }

                for (let entry of entries) {
                    let ggd, day, ageGroup, month;
                    month = Number(entry.Date_statistics.split('-')[1]);
                    // currently just a rough cut, todo based on current date
                    if (month > 6) {
                        ggd = getGgd(entry.Municipal_health_service);
                        if (ggd) {
                            day = getDay(ggd, entry.Date_statistics);
                            ageGroup = findAgeGroup(day, entry.Agegroup);
                            ageGroup.cases++;
                            day.total++;
                        } else {
                            console.log(entry);
                        }
                    }
                }

                for (let ggdData of ggds) {
                    let ggd = this.$store.getters['ggds/getItemByProperty']('title', ggdData.title, true);
                    addPercentages(ggdData);
                    this.$store.commit('ggds/updatePropertyOfItem', {item: ggd, property: 'report', value: ggdData.report});
                }

                console.log(this.$store.state.ggds.all);

                this.$store.commit('ui/updateProperty', {key: 'caseDataLoaded', value: true});
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