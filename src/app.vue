<script>
    import mapNetherlands from "./components/map/map";
    import cities from '@/data/cities';
    import ggds from '@/data/ggds';
    import safetyRegions from '@/data/safety-regions';
    import ageGroups from '@/data/age-groups';
    import citiesPanel from "./components/regions/search/cities-panel";
    import * as d3 from 'd3';
    import $ from 'jquery';
    import {format, sub } from 'date-fns';

    import credits from "./components/credits";
    import query from '@/components/elements/query';
    import headerMenu from "./components/header-menu";
    import trends from "./components/trends/trends";
    import regionDetails from "./components/regions/region-details";
    //import sewageTreatmentPlants from '@/data/sewage-treatment-plants'


    export default {
        name: 'app',
        components: {
            trends,
            headerMenu,
            credits,
            citiesPanel,
            mapNetherlands,
            regionDetails
        },
        props: {},
        mixins: [query],
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            },
            width() {
                return this.$store.state.settings.canvasWidth + 20;
            },
            lastDates() {
                let n, dates, today;
                n = (this.$store.state.settings.periodOfFocusLength * 2) + this.$store.state.settings.historyLength + 1;
                dates = [];
                today = this.$store.state.ui.today;
                for (let i = 0; i < n; i++) {
                    let date, formatted;
                    date = sub(today, {days: i}) ;
                    formatted = format(date, 'yyyy-MM-dd');
                    dates.unshift(formatted);
                }
                return dates;
            },
            showCredits() {
                return this.$store.state.ui.credits;
            },
            showMap() {
                return this.$store.state.ui.menu === 'map';
            },
            showCity() {
                return this.currentRegion;
            },
            currentRegion() {
                return this.$store.getters['ui/currentRegion'];
            }
        },
        methods: {
            init() {
                this.loadData();
            },
            loadData() {
                let url = window.config.dataUrl + 'data/municipality-totals.csv';
                this.$store.commit('cities/init', cities);
                this.$store.commit('ggds/init', ggds);
                this.$store.commit('safetyRegions/init', safetyRegions);
                this.$store.commit('ageGroups/init', ageGroups);

                d3.csv(url)
                    .then((data) => {

                        this.getDate(data);
                        for (let item of data) {
                            this.addReport(item);
                        }
                        let sewageMeasurementsUrl = window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json';
                        $.getJSON(sewageMeasurementsUrl, (measurements) => {
                            this.addSewageTreatmentPlants(measurements);
                            this.readQuery();
                            this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            loadProps() {
                // let safetyRegions = {};
                // let ggdRegions = {};
                // let vrs = [];
                // let ggds = [];
                // d3.csv('data/city_props.csv')
                //     .then((data) => {
                //         for (let item of data) {
                //             //
                //             // item.VR_code
                //             if (!ggdRegions[item.ggd_code]) {
                //                 ggdRegions[item.ggd_code] = {
                //                     ggd_code: item.ggd_code,
                //                     title: item.ggd_regio
                //                 }
                //             }
                //             if (!safetyRegions[item.VR_code]) {
                //                 safetyRegions[item.VR_code] = {
                //                     safetyRegion_code: item.VR_code,
                //                     title: item.veiligheidsregio
                //                 }
                //             }
                //         }
                //
                //         for (let key in safetyRegions) {
                //             vrs.push(safetyRegions[key])
                //         }
                //
                //         for (let key in ggdRegions) {
                //             ggds.push(ggdRegions[key])
                //         }
                //
                //         console.log(JSON.stringify(vrs));
                //         console.log(JSON.stringify(ggds));
                //
                //         // console.log(JSON.stringify(this.$store.state.cities.all.map(city => {
                //         //     let c = {...city};
                //         //     c.paths = city.paths.map(p => p.path);
                //         //     return c;
                //         // })));
                //     })

            },
            addSewageTreatmentPlants(sewageTreatmentPlants){
                this.$store.commit('sewageTreatmentPlants/init', sewageTreatmentPlants)
            },
            readQuery() {
                let city, cityString;
                if (this.$route.query.city) {
                    cityString = decodeURI(this.$route.query.city);
                    city = this.$store.getters['cities/getItemByProperty']('title', cityString, true);
                    if (city) {
                        this.$store.commit('ui/updateProperty', {key: 'currentCity', value: city});
                    }
                }
            },
            getDate(data) {
                let key, dateString, set, today;
                if (data.columns) {
                    key = data.columns[data.columns.length - 1];
                    set = key.split('Total_reported.');
                    if (set.length > 0) {
                        dateString = set[1];
                        today = new Date(dateString);
                        this.$store.commit('ui/updateProperty', {key: 'today', value: today});
                    }
                }
            },
            addReport(data) {
                let key, city, report, absoluteNumbers;
                absoluteNumbers = [];
                const convertToNumber = function(value) {
                    let numb = Number(value);
                    if (!isNaN(numb)) {
                        return numb;
                    } else {
                        return null;
                    }
                };

                report = {
                    increaseDay: convertToNumber(data['increase']),
                    increaseWeek: convertToNumber(data['increase.week']),
                    relativeIncreaseDay: convertToNumber(data['rel.increase']),
                    relativeIncreaseWeek: convertToNumber(data['rel.increase.week']),
                    history: []
                };
                for (let date of this.lastDates) {
                    let dateKey = 'Total_reported.' + date;
                    if (data[dateKey]) {
                        absoluteNumbers.push(Number(data[dateKey]));
                    }
                }
                for (let i = 0, l = absoluteNumbers.length; i < l; i++) {
                    if (i > 0) {
                        let value = absoluteNumbers[i] - absoluteNumbers[i - 1];
                        report.history.push(value);
                    }
                }
                key = data.Municipality_code;
                if (this.$store.state.cities.dict[key]) {
                    city = this.$store.state.cities.dict[key];
                    this.$store.commit('cities/updatePropertyOfItem', {item: city, property: 'report', value: report});
                    this.$store.commit('cities/updatePropertyOfItem', {item: city, property: 'population', value: convertToNumber(data.population)})
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
        <header-menu/>

        <div
            v-if="dataLoaded"
            class="content">

            <div
                :style="{'width': width + 'px'}"
                :class="{'panel--active': showMap}"
                class="map-container panel">
                <cities-panel v-if="dataLoaded"/>
                <map-netherlands v-if="dataLoaded"/>
            </div>

            <trends/>
            <region-details
                v-if="showCity"
                :region="currentRegion"/>
        </div>

        <credits v-if="showCredits"/>
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

                .map {
                    height: calc(100% - 40px);
                }
            }

            .trends {
                width: 300px;
            }

            .region-details {
                //14 * 20 + 32
                width: 450px;
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

                .left {
                    width: 100%;
                }

                .right {
                    position: absolute;
                    left: 100%;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    z-index: 1;
                    transition: all 0.5s ease;
                    padding: 20px;
                    pointer-events: none;

                    h1 {
                        display: none;
                    }

                    &.right--active {
                        left: 0;
                    }

                    .city-card {
                        pointer-events: all;
                    }
                }
            }
        }
    }
</style>