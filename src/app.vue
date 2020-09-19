<script>
    import * as d3 from 'd3';
    import $ from 'jquery';

    import maps from '@/data/maps';
    import ggds from '@/data/ggds';
    import countries from '@/data/countries';
    import safetyRegions from '@/data/safety-regions';
    import ageGroups from '@/data/age-groups';
    import signalingSystems from '@/data/signaling-systems';

    import mapTests from "./components/map/map";
    import searchRegions from "./components/regions/search/search-regions";
    import credits from "./components/credits";
    import query from '@/components/elements/query';
    import headerMenu from "./components/header-menu";
    import trends from "./components/trends/trends";
    import regionDetails from "./components/regions/region-details";
    import embedPopup from "./components/embed/embed-popup";
    import regionTypePicker from "./components/regions/region-type/region-type-picker";


    export default {
        name: 'app',
        components: {
            regionTypePicker,
            embedPopup,
            trends,
            headerMenu,
            credits,
            searchRegions,
            mapTests,
            regionDetails
        },
        props: {},
        mixins: [query],
        data() {
            return {
                dateKeys: null
            }
        },
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            },
            width() {
                return this.$store.state.settings.canvasWidth + 20;
            },
            showCredits() {
                return this.$store.state.ui.credits;
            },
            showEmbedPopup() {
                return this.$store.state.ui.embedPopup;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            },
            showRegion() {
                return this.currentRegion;
            },
            currentRegion() {
                return this.currentMap && this.$store.state[this.currentMap.module].current;
            },
            currentMap() {
                return this.$store.state.maps.current;
            }
        },
        methods: {
            init() {
                this.pickMap();
            },
            pickMap() {
                let map;
                this.$store.commit('maps/init', maps);
                if (this.$route.query.map) {
                    map = this.$store.getters['maps/getItemByProperty']('title', this.$route.query.map, true);
                }
                if (map) {
                    this.$store.commit('maps/setCurrent', map);
                } else {
                    this.$store.commit('maps/setCurrent', this.$store.state.maps.all[0]);
                }
                this.$store.commit('ui/updateProperty', {key: 'currentRegionType', value: this.currentMap.settings.regionTypes[0]});
                this.loadData();
            },
            loadData() {
                this.$store.commit('signalingSystems/init', signalingSystems);
                this.$store.commit('signalingSystems/setCurrent', this.$store.state.signalingSystems.all[3]);
                this.$store.commit('countries/init', countries);
                this.$store.commit('ggds/init', ggds);
                this.$store.commit('safetyRegions/init', safetyRegions);
                this.$store.commit('ageGroups/init', ageGroups);
                this.loadRegions();
            },
            loadRegions() {
                $.getJSON(this.currentMap.url.regions, (regions) => {
                    let promises = [];
                    this.$store.commit(this.currentMap.module + '/init', regions);
                    if (this.currentMap.settings.hasTests) {
                        promises.push(this.loadTests);
                    }
                    if (this.currentMap.settings.hasAgeGroups) {
                        promises.push(this.loadAgeGroupsForCities);
                    }
                    if (this.currentMap.settings.hasSewageTreatmentPlants) {
                        promises.push(this.loadSewageTreatmentPlants);
                    }
                    if (promises.length === 0) {
                        this.readQuery();
                        this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                    } else {
                        Promise.all(promises.map(p => p()))
                            .then((result) => {
                                this.readQuery();
                                this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                            })
                            .catch(error => {
                                console.error(error)
                            });
                    }
                });
            },
            loadSewageTreatmentPlants() {
                return new Promise((resolve, reject) => {
                    $.getJSON(this.currentMap.url.sewageTreatmentPlants, (sewageTreatmentPlants) => {
                        this.$store.commit('sewageTreatmentPlants/init', sewageTreatmentPlants);
                        resolve();
                    });
                })
            },
            loadTests() {
                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.url.tests)
                        .then((data) => {
                            this.getDate(data.columns);
                            for (let item of data) {
                                this.addTests(item);
                            }
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
            },
            loadAgeGroupsForCities() {
                return new Promise((resolve, reject) => {
                    d3.csv(this.currentMap.url.ageGroups)
                        .then((result) => {
                            for (let item of result) {
                                let city = this.$store.getters['cities/getItemByProperty']('identifier', item.Gemeentecode, true);
                                if (city) {
                                    let cityAgeGroups = ageGroups.map(ageGroup => {
                                        let key = ageGroup.title;
                                        if (key === '10-19') {
                                            key = 'okt-19';
                                        }
                                        return {
                                            title: ageGroup.title,
                                            population: Number(item[key])
                                        }
                                    });
                                    this.$store.commit('cities/updatePropertyOfItem', {
                                        item: city,
                                        property: 'ageGroups',
                                        value: cityAgeGroups
                                    });
                                }
                            }
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            },

            readQuery() {
                let region, string;
                if (this.$route.query.region) {
                    string = decodeURI(this.$route.query.region);
                    region = this.$store.getters[this.currentMap.module + '/getItemByProperty']('title', string, true);
                    if (region) {
                        this.$store.commit(this.currentMap.module + '/setCurrent', region);
                    }
                }
                if (this.$route.query.admin) {
                    this.$store.commit('ui/updateProperty', {key: 'admin', value: true});
                }
            },
            getDate(columns) {
                let dates, today, first, last, totalLengthOfTestHistory;
                dates = [];

                for (let column of columns) {
                    if (column.indexOf('Total_reported.') > -1) {
                        let dateString, date;
                        dateString = column.split('Total_reported.')[1];
                        dates.push({
                            key: column,
                            dateString,
                            ms: new Date(dateString).getTime()
                        });
                    }
                }
                dates = dates.sort((a,b) => (a.ms > b.ms) ? 1 : ((b.ms > a.ms) ? -1 : 0));
                first = dates[0];
                last = dates[dates.length - 1];
                today = new Date(last.dateString);
                totalLengthOfTestHistory = (last.ms - first.ms) / (1000 * 3600 * 24 * this.currentMap.settings.testDataInterval);
                this.$store.commit('ui/updateProperty', {key: 'today', value: today});
                this.$store.commit('settings/updateProperty', {key: 'historyLength', value: totalLengthOfTestHistory});
                this.dateKeys = dates.map(d => d.key);
            },
            addTests(data) {
                let key, region, report, incidents;
                incidents = [];
                const convertToNumber = function(value) {
                    let numb = Number(value);
                    if (!isNaN(numb)) {
                        return numb;
                    } else {
                        return null;
                    }
                };

                report = {
                    history: []
                };

                for (let dateKey of this.dateKeys) {
                    if (data[dateKey]) {
                        let date, value;
                        date = dateKey.slice(15);
                        value = Number(data[dateKey]);
                        incidents.push({
                            ms: new Date(date).getTime(),
                            date,
                            value
                        });
                    }
                }
                if (this.currentMap.settings.testDataCumulative) {
                    for (let i = 0, l = incidents.length; i < l; i++) {
                        if (i > 0) {
                            let value = incidents[i].value - incidents[i - 1].value;
                            report.history.push({
                                ms: incidents[i].ms,
                                date: incidents[i].date,
                                value
                            });
                        }
                    }
                } else {
                    report.history = incidents;
                }
                key = data.Municipality_code;
                if (this.$store.state[this.currentMap.module].dict[key]) {
                    region = this.$store.state[this.currentMap.module].dict[key];
                    this.$store.commit(this.currentMap.module + '/updatePropertyOfItem', {item: region, property: 'report', value: report});
                    this.$store.commit(this.currentMap.module + '/updatePropertyOfItem', {item: region, property: 'population', value: convertToNumber(data.population)})
                } else {
                    console.log('not found ' + key);
                }
            },
            openCredits() {
                this.$store.commit('ui/updateProperty', {key: 'credits', value: true});
            }
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="app">
        <header-menu v-if="dataLoaded"/>

        <div
            v-if="dataLoaded"
            class="content">

            <div
                :style="{'width': width + 'px'}"
                :class="{'panel--active': showMap}"
                class="map-container panel">
                <search-regions v-if="dataLoaded"/>
                <region-type-picker/>
                <map-tests v-if="dataLoaded"/>
            </div>

            <trends/>
            <region-details
                v-if="showRegion"
                :region="currentRegion"/>
            <div
                v-else
                class="region-details region-details--mobile">
                Kies eerst een gemeente op de kaart.
            </div>
        </div>

        <credits v-if="showCredits"/>

        <embed-popup v-if="showEmbedPopup"/>

        <div
            @click="openCredits()"
            class="open-credits">
            Credits
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/index.scss';
    @import '@/styles/variables.scss';

    .app {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .header-menu {
            height: 48px;
        }

        .content {
            display: flex;
            height: calc(100% - 48px);

            .map-container {

                .cities-panel {
                    height: 40px;
                }

                .region-type-picker-2 {
                    margin-bottom: 6px;
                }

                .map {
                    height: calc(100% - 76px);
                }
            }

            .trends {
                width: 300px;
            }

            .region-details {
                // 7 * 70 + 32 + scrollbar
                width: 540px;
            }

            .region-details--mobile {
                padding: 20px;
                display: none;
            }
        }

        .open-credits {
            position: fixed;
            right: 10px;
            bottom: 6px;
            cursor: pointer;
            text-decoration: underline;
            text-align: right;
        }

        @include mobile() {

            .header-menu {
                height: 64px;
            }

            .content {
                display: block;
                position: relative;
                height: calc(100% - 64px);

                .region-details--mobile {
                    display: block;
                }
            }
        }
    }
</style>