<script>
    import mapNetherlands from "./components/map/map";
    import cities from '@/data/areas.json';
    import citiesPanel from "./components/cities/cities-panel";
    import cityCard from "./components/cities/city-card";
    import * as d3 from 'd3';
    import {format, sub } from 'date-fns'
    import { nl } from 'date-fns/locale'
    import redCities from "./components/cities/red-cities";
    import newInfectionCities from "./components/cities/new-infection-cities";
    import credits from "./components/credits";


    export default {
        name: 'app',
        components: {
            credits,
            newInfectionCities,
            redCities,
            cityCard,
            citiesPanel,
            mapNetherlands
        },
        props: {},
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            },
            currentCity() {
                return this.$store.state.ui.currentCity;
            },
            width() {
                return this.$store.state.settings.canvasWidth + 20;
            },
            lastDates() {
                let n, dates, today;
                n = this.$store.state.ui.historyLength + 1;
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
            todayString() {
                return this.$store.state.ui.today ? format(this.$store.state.ui.today, 'EEEE d MMMM', {locale: nl} ) : '';
            },
            showCredits() {
                return this.$store.state.ui.credits;
            }
        },
        methods: {
            init() {
                this.loadData();
            },
            loadData() {
                //let url = 'https://github.com/mzelst/covid-19/blob/master/data/municipality-today.csv';
                let url = window.config.dataUrl + 'data/municipality-today.csv';
                this.$store.commit('cities/init', cities.features);
                d3.csv(url)
                    .then((data) => {
                        this.getDate(data);
                        for (let item of data) {
                            this.addReport(item);
                        }
                        this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            getDate(data) {
                let key, dateString, set, today;
                if (data.columns) {
                    key = data.columns[data.columns.length - 5];
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
        <div
            v-if="dataLoaded"
            class="content">
            <div
                :style="{'width': width + 'px'}"
                class="left">
                <cities-panel v-if="dataLoaded"/>
                <map-netherlands v-if="dataLoaded"/>
            </div>


            <div
                :class="{'right--active': currentCity}"
                class="right">
                <h1>
                    Corona status {{todayString}}
                </h1>
                <city-card :city="currentCity"/>
                <div class="general-info">
                    <red-cities/>
                    <new-infection-cities/>

                </div>
            </div>
        </div>
        <credits v-if="showCredits"/>
        <div
            @click="openCredits();"
            class="open-credits">
            Credits
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .app {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .content {
            display: flex;
            height: 100%;

            .left {
                padding: 10px;
                height: 100%;

                .cities-panel {
                    height: 40px;
                }

                .map {
                    height: calc(100% - 40px);
                }
            }

            .right {
                width: 350px;
                height: 100%;
                padding: 10px;
                overflow: auto;

                .city-card {
                    display: none;
                }

                &.right--active {

                    .city-card {
                        display: block;
                    }
                }

                h1 {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 900;
                    line-height: 1.1;
                    margin-bottom: 20px;
                }
            }
        }

        .open-credits {
            position: fixed;
            right: 10px;
            bottom: 10px;
            cursor: pointer;
            text-decoration: underline;
        }

        @include mobile() {

            .content {
                display: block;
                position: relative;

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

                    .general-info {
                        display: none;
                    }
                }
            }
        }
    }
</style>