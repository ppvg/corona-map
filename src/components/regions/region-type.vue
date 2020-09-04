<script>
    import swatch from "../elements/swatch";
    import * as d3 from "d3";


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
                if ((this.type.tag === 'ggd' || this.type.tag === 'country') && !this.caseDataRequested){
                    this.loadCaseData();
                }
            },
            loadCaseData() {
                let url = window.config.dataUrl + 'data-dashboards/cases_ggd_agegroups.csv';
                this.$store.commit('ui/updateProperty', {key: 'caseDataRequested', value: true});
                d3.csv(url)
                    .then((data) => {
                        this.sortEntries(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            sortEntries(entries) {
                let ggds = this.ggds.map(ggd => {
                    return {ggd_code: ggd.ggd_code, report: []};
                });

                function getGgd(code) {
                    return ggds.find(ggd => ggd.ggd_code === code);
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

                function addPercentages(ggd) {
                    for (let day of ggd.report) {
                        for (let ageGroup of day.ageGroups) {
                            ageGroup.percentage = ageGroup.cases / day.total;
                        }
                    }
                }

                for (let entry of entries) {
                    let ggd, day, ageGroup, month;
                    //month = Number(entry.date.split('-')[1]);
                    // currently just a rough cut, todo based on current date
                    //if (month > 6) {
                        ggd = getGgd(entry.ggd_code);
                        if (ggd) {
                            day = getDay(ggd, entry.date);
                            day.total += Number(entry.cases);
                            day.ageGroups.push({
                                title: entry.age_group,
                                cases: Number(entry.cases)
                            });
                        } else {
                            console.log(entry);
                        }
                    //}
                }

                for (let ggdData of ggds) {
                    let ggd = this.$store.getters['ggds/getItemByProperty']('ggd_code', ggdData.ggd_code, true);
                    addPercentages(ggdData);

                    // if (ggd.ggd_code === 'GG3406') {
                    //     let x = 44;
                    //     console.log(ggd);
                    //     console.log(ggdData.report[x].date);
                    //     console.log(ggdData.report[x].total);
                    //     console.log(ggdData.report[x].ageGroups.map(a => {
                    //         return {...a};
                    //     }));
                    // }
                    this.$store.commit('ggds/updatePropertyOfItem', {item: ggd, property: 'report', value: ggdData.report});
                }

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